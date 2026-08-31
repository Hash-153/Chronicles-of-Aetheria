/**
 * @file JointConstraints.ts
 * @description Physics Joint constraints: DistanceJoint, RevoluteJoint (pin), SpringJoint, and WeldJoint.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { RigidBody2D } from './RigidBody2D.ts';
import { type EntityId } from '../core/ecs/Types.ts';

export const JointType = {
  Distance: 0,
  Revolute: 1,
  Spring: 2,
  Weld: 3,
} as const;
export type JointType = typeof JointType[keyof typeof JointType];

export abstract class JointConstraint {
  public type: JointType;
  public entityA: EntityId;
  public entityB: EntityId;
  public bodyA: RigidBody2D;
  public bodyB: RigidBody2D;
  public localAnchorA: Vector2;
  public localAnchorB: Vector2;
  public isEnabled = true;

  constructor(
    type: JointType,
    entityA: EntityId,
    entityB: EntityId,
    bodyA: RigidBody2D,
    bodyB: RigidBody2D,
    anchorA = new Vector2(),
    anchorB = new Vector2()
  ) {
    this.type = type;
    this.entityA = entityA;
    this.entityB = entityB;
    this.bodyA = bodyA;
    this.bodyB = bodyB;
    this.localAnchorA = anchorA;
    this.localAnchorB = anchorB;
  }

  public abstract preSolve(posA: Vector2, rotA: number, posB: Vector2, rotB: number, dt: number): void;
  public abstract solveVelocity(): void;
  public abstract solvePosition(posA: Vector2, rotA: number, posB: Vector2, rotB: number): boolean;
}

export class DistanceJoint extends JointConstraint {
  public targetDistance: number;
  public stiffness: number; // 0 = rigid, >0 = elastic
  public damping: number;
  private _u = new Vector2();
  private _impulse = 0;

  constructor(
    entityA: EntityId,
    entityB: EntityId,
    bodyA: RigidBody2D,
    bodyB: RigidBody2D,
    anchorA: Vector2,
    anchorB: Vector2,
    distance?: number,
    stiffness = 0,
    damping = 0
  ) {
    super(JointType.Distance, entityA, entityB, bodyA, bodyB, anchorA, anchorB);
    this.targetDistance = distance ?? 32;
    this.stiffness = stiffness;
    this.damping = damping;
  }

  public preSolve(posA: Vector2, rotA: number, posB: Vector2, rotB: number, dt: number): void {
    const worldAnchorA = posA.add(this.localAnchorA.rotate(rotA));
    const worldAnchorB = posB.add(this.localAnchorB.rotate(rotB));
    const delta = worldAnchorB.subtract(worldAnchorA);
    const len = delta.length();

    if (len > 1e-4) {
      this._u.copy(delta.scale(1 / len));
    } else {
      this._u.set(0, 0);
    }
  }

  public solveVelocity(): void {
    const vA = this.bodyA.velocity;
    const vB = this.bodyB.velocity;
    const Cdot = this._u.dot(vB.subtract(vA));

    const totalInvMass = this.bodyA.invMass + this.bodyB.invMass;
    if (totalInvMass <= 0) return;

    const impulse = -Cdot / totalInvMass;
    const P = this._u.scale(impulse);

    if (this.bodyA.invMass > 0) this.bodyA.velocity.subtractSelf(P.scale(this.bodyA.invMass));
    if (this.bodyB.invMass > 0) this.bodyB.velocity.addSelf(P.scale(this.bodyB.invMass));
  }

  public solvePosition(posA: Vector2, rotA: number, posB: Vector2, rotB: number): boolean {
    const worldAnchorA = posA.add(this.localAnchorA.rotate(rotA));
    const worldAnchorB = posB.add(this.localAnchorB.rotate(rotB));
    const delta = worldAnchorB.subtract(worldAnchorA);
    const currentLen = delta.length();
    const C = currentLen - this.targetDistance;

    if (Math.abs(C) < 0.1) return true;

    const totalInvMass = this.bodyA.invMass + this.bodyB.invMass;
    if (totalInvMass <= 0) return true;

    const impulse = (C * 0.2) / totalInvMass;
    const dir = currentLen > 0 ? delta.scale(1 / currentLen) : new Vector2(1, 0);
    const P = dir.scale(impulse);

    if (this.bodyA.invMass > 0) posA.addSelf(P.scale(this.bodyA.invMass));
    if (this.bodyB.invMass > 0) posB.subtractSelf(P.scale(this.bodyB.invMass));

    return Math.abs(C) < 0.5;
  }
}
