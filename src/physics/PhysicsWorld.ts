/**
 * @file PhysicsWorld.ts
 * @description Master 2D physics simulation coordinator executing integration, broadphase, SAT narrowphase, solver iterations, and joint constraints.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { World } from '../core/ecs/World.ts';
import { Transform2D } from '../core/math/Transform2D.ts';
import { RigidBody2D, BodyType } from './RigidBody2D.ts';
import { Collider2D } from './Collider2D.ts';
import { Broadphase } from './Broadphase.ts';
import { NarrowphaseSAT } from './NarrowphaseSAT.ts';
import { ContactSolver } from './ContactSolver.ts';
import { CollisionManifold } from './CollisionManifold.ts';
import { JointConstraint } from './JointConstraints.ts';
import { System } from '../core/ecs/System.ts';
import { SystemPhase } from '../core/ecs/Types.ts';

export class PhysicsWorld extends System {
  public phase = SystemPhase.Physics;
  public priority = 100;

  public gravity: Vector2;
  public velocityIterations = 8;
  public positionIterations = 3;
  public broadphase: Broadphase;

  private _manifolds: CollisionManifold[] = [];
  private _joints: JointConstraint[] = [];

  constructor(gravity = new Vector2(0, 0)) {
    super();
    this.gravity = gravity;
    this.broadphase = new Broadphase(4.0);
  }

  public addJoint(joint: JointConstraint): void {
    this._joints.push(joint);
  }

  public removeJoint(joint: JointConstraint): void {
    const idx = this._joints.indexOf(joint);
    if (idx !== -1) {
      this._joints.splice(idx, 1);
    }
  }

  public get activeManifolds(): readonly CollisionManifold[] {
    return this._manifolds;
  }

  public override update(dt: number): void {
    if (dt <= 0) return;
    const clampedDt = Math.min(dt, 0.033); // Clamp maximum physics step to 33ms to avoid spiral of death

    const bodyQuery = this.world.createQuery({ all: [Transform2D, RigidBody2D] });
    const colliderQuery = this.world.createQuery({ all: [Transform2D, Collider2D] });

    // --- 1. Integrate Forces & Update World AABBs ---
    bodyQuery.forEach((id, transform: Transform2D, body: RigidBody2D) => {
      if (body.type === BodyType.Dynamic && !body.isSleeping) {
        // Integrate gravity and forces: v += (g * scale + force * invMass) * dt
        const totalAccel = this.gravity.scale(body.gravityScale).add(body.force.scale(body.invMass));
        body.velocity.addSelf(totalAccel.scale(clampedDt));

        // Linear damping: v *= 1 / (1 + dt * damping)
        body.velocity.scaleSelf(1 / (1 + clampedDt * body.linearDamping));

        // Integrate torque: w += torque * invInertia * dt
        if (!body.isFixedRotation) {
          body.angularVelocity += body.torque * body.invInertia * clampedDt;
          body.angularVelocity *= 1 / (1 + clampedDt * body.angularDamping);
        }

        body.clearForces();
      }
    }, [Transform2D, RigidBody2D]);

    // Update Broadphase Proxies
    colliderQuery.forEach((id, transform: Transform2D, collider: Collider2D) => {
      collider.computeWorldAABB(transform.position, transform.rotation);
      this.broadphase.updateProxy(id);
    }, [Transform2D, Collider2D]);

    // --- 2. Broadphase Collision Pairs ---
    const candidatePairs = this.broadphase.computePairs();
    this._manifolds = [];

    // --- 3. Narrowphase SAT ---
    for (let i = 0; i < candidatePairs.length; i++) {
      const pair = candidatePairs[i];
      const transformA = this.world.getComponent(pair.entityA, Transform2D);
      const transformB = this.world.getComponent(pair.entityB, Transform2D);
      const bodyA = this.world.getComponent(pair.entityA, RigidBody2D) || new RigidBody2D({ type: BodyType.Static });
      const bodyB = this.world.getComponent(pair.entityB, RigidBody2D) || new RigidBody2D({ type: BodyType.Static });
      const colliderA = this.world.getComponent(pair.entityA, Collider2D)!;
      const colliderB = this.world.getComponent(pair.entityB, Collider2D)!;

      if (!transformA || !transformB) continue;

      const manifold = NarrowphaseSAT.testCollision(
        pair.entityA,
        pair.entityB,
        transformA.position,
        transformA.rotation,
        transformB.position,
        transformB.rotation,
        bodyA,
        bodyB,
        colliderA,
        colliderB
      );

      if (manifold && manifold.contacts.length > 0) {
        this._manifolds.push(manifold);
      }
    }

    // --- 4. Pre-Solve Velocity & Warm Starting ---
    for (let m = 0; m < this._manifolds.length; m++) {
      ContactSolver.preSolve(this._manifolds[m], clampedDt);
    }

    for (let j = 0; j < this._joints.length; j++) {
      const joint = this._joints[j];
      const tA = this.world.getComponent(joint.entityA, Transform2D);
      const tB = this.world.getComponent(joint.entityB, Transform2D);
      if (tA && tB && joint.isEnabled) {
        joint.preSolve(tA.position, tA.rotation, tB.position, tB.rotation, clampedDt);
      }
    }

    // --- 5. Velocity Iterations ---
    for (let iter = 0; iter < this.velocityIterations; iter++) {
      for (let j = 0; j < this._joints.length; j++) {
        if (this._joints[j].isEnabled) {
          this._joints[j].solveVelocity();
        }
      }
      for (let m = 0; m < this._manifolds.length; m++) {
        ContactSolver.solveVelocity(this._manifolds[m]);
      }
    }

    // --- 6. Integrate Positions ---
    bodyQuery.forEach((id, transform: Transform2D, body: RigidBody2D) => {
      if (body.type === BodyType.Dynamic && !body.isSleeping) {
        transform.position.addSelf(body.velocity.scale(clampedDt));
        if (!body.isFixedRotation) {
          transform.rotation += body.angularVelocity * clampedDt;
        }
        transform.markDirty();
      } else if (body.type === BodyType.Kinematic) {
        transform.position.addSelf(body.velocity.scale(clampedDt));
        transform.rotation += body.angularVelocity * clampedDt;
        transform.markDirty();
      }
    }, [Transform2D, RigidBody2D]);

    // --- 7. Position Correction (Baumgarte stabilization) ---
    for (let iter = 0; iter < this.positionIterations; iter++) {
      let contactsSolved = true;
      for (let m = 0; m < this._manifolds.length; m++) {
        const man = this._manifolds[m];
        const tA = this.world.getComponent(man.entityA, Transform2D);
        const tB = this.world.getComponent(man.entityB, Transform2D);
        if (tA && tB) {
          const ok = ContactSolver.solvePosition(tA.position, tB.position, man);
          if (!ok) contactsSolved = false;
        }
      }
      if (contactsSolved) break;
    }
  }
}
