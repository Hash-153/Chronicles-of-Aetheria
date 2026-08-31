/**
 * @file ContactSolver.ts
 * @description Sequential impulse contact solver with Baumgarte stabilization, friction cones, and velocity limits.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { CollisionManifold } from './CollisionManifold.ts';

export class ContactSolver {
  public static readonly BAUMGARTE_SLOP = 0.05;
  public static readonly BAUMGARTE_BIAS_FACTOR = 0.2;

  public static preSolve(manifold: CollisionManifold, dt: number): void {
    if (manifold.isSensor) return;

    const bodyA = manifold.bodyA;
    const bodyB = manifold.bodyB;
    const normal = manifold.normal;
    const tangent = manifold.tangent;

    for (let i = 0; i < manifold.contacts.length; i++) {
      const c = manifold.contacts[i];

      // Warm start by applying cached impulses from previous step
      const P = normal.scale(c.normalImpulse).add(tangent.scale(c.tangentImpulse));

      if (bodyA.invMass > 0) {
        bodyA.velocity.subtractSelf(P.scale(bodyA.invMass));
        bodyA.angularVelocity -= c.rA.cross(P) * bodyA.invInertia;
      }

      if (bodyB.invMass > 0) {
        bodyB.velocity.addSelf(P.scale(bodyB.invMass));
        bodyB.angularVelocity += c.rB.cross(P) * bodyB.invInertia;
      }
    }
  }

  public static solveVelocity(manifold: CollisionManifold): void {
    if (manifold.isSensor) return;

    const bodyA = manifold.bodyA;
    const bodyB = manifold.bodyB;
    const normal = manifold.normal;
    const tangent = manifold.tangent;

    for (let i = 0; i < manifold.contacts.length; i++) {
      const c = manifold.contacts[i];

      // Relative velocity at contact point
      const vA = bodyA.velocity.add(new Vector2(-bodyA.angularVelocity * c.rA.y, bodyA.angularVelocity * c.rA.x));
      const vB = bodyB.velocity.add(new Vector2(-bodyB.angularVelocity * c.rB.y, bodyB.angularVelocity * c.rB.x));
      const dv = vB.subtract(vA);

      // --- 1. Normal Impulse ---
      const vn = dv.dot(normal);

      const rAcn = c.rA.cross(normal);
      const rBcn = c.rB.cross(normal);
      const kNormal =
        bodyA.invMass + bodyB.invMass +
        rAcn * rAcn * bodyA.invInertia +
        rBcn * rBcn * bodyB.invInertia;

      if (kNormal > 0) {
        let dPn = (-vn) / kNormal;
        // Restitution bias
        if (vn < -1.0) {
          dPn += (-manifold.restitution * vn) / kNormal;
        }

        const oldImpulse = c.normalImpulse;
        c.normalImpulse = Math.max(0, oldImpulse + dPn);
        dPn = c.normalImpulse - oldImpulse;

        const Pn = normal.scale(dPn);
        if (bodyA.invMass > 0) {
          bodyA.velocity.subtractSelf(Pn.scale(bodyA.invMass));
          bodyA.angularVelocity -= c.rA.cross(Pn) * bodyA.invInertia;
        }
        if (bodyB.invMass > 0) {
          bodyB.velocity.addSelf(Pn.scale(bodyB.invMass));
          bodyB.angularVelocity += c.rB.cross(Pn) * bodyB.invInertia;
        }
      }

      // --- 2. Tangent Friction Impulse ---
      const vt = dv.dot(tangent);
      const rAct = c.rA.cross(tangent);
      const rBct = c.rB.cross(tangent);
      const kTangent =
        bodyA.invMass + bodyB.invMass +
        rAct * rAct * bodyA.invInertia +
        rBct * rBct * bodyB.invInertia;

      if (kTangent > 0) {
        let dPt = (-vt) / kTangent;
        const maxPt = manifold.friction * c.normalImpulse;

        const oldImpulse = c.tangentImpulse;
        c.tangentImpulse = Math.max(-maxPt, Math.min(maxPt, oldImpulse + dPt));
        dPt = c.tangentImpulse - oldImpulse;

        const Pt = tangent.scale(dPt);
        if (bodyA.invMass > 0) {
          bodyA.velocity.subtractSelf(Pt.scale(bodyA.invMass));
          bodyA.angularVelocity -= c.rA.cross(Pt) * bodyA.invInertia;
        }
        if (bodyB.invMass > 0) {
          bodyB.velocity.addSelf(Pt.scale(bodyB.invMass));
          bodyB.angularVelocity += c.rB.cross(Pt) * bodyB.invInertia;
        }
      }
    }
  }

  public static solvePosition(
    posA: Vector2,
    posB: Vector2,
    manifold: CollisionManifold
  ): boolean {
    if (manifold.isSensor) return true;

    const bodyA = manifold.bodyA;
    const bodyB = manifold.bodyB;
    const normal = manifold.normal;
    let minPenetration = 0;

    for (let i = 0; i < manifold.contacts.length; i++) {
      const c = manifold.contacts[i];
      const penetration = c.penetration;
      minPenetration = Math.min(minPenetration, penetration);

      const correction = Math.max(0, penetration - this.BAUMGARTE_SLOP) * this.BAUMGARTE_BIAS_FACTOR;
      const totalInvMass = bodyA.invMass + bodyB.invMass;

      if (totalInvMass > 0 && correction > 0) {
        const deltaA = normal.scale(-correction * (bodyA.invMass / totalInvMass));
        const deltaB = normal.scale(correction * (bodyB.invMass / totalInvMass));

        posA.addSelf(deltaA);
        posB.addSelf(deltaB);
      }
    }

    return minPenetration >= -this.BAUMGARTE_SLOP;
  }
}
