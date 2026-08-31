/**
 * @file CollisionManifold.ts
 * @description Contact point manifold storing penetration vectors, accumulated normal/tangent impulses, and friction coefficients.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { type EntityId } from '../core/ecs/Types.ts';
import { RigidBody2D } from './RigidBody2D.ts';
import { Collider2D } from './Collider2D.ts';

export interface ContactPoint {
  position: Vector2;
  penetration: number;
  normalImpulse: number;
  tangentImpulse: number;
  rA: Vector2; // Vector from body A center of mass to contact point
  rB: Vector2; // Vector from body B center of mass to contact point
}

export class CollisionManifold {
  public entityA: EntityId;
  public entityB: EntityId;
  public bodyA: RigidBody2D;
  public bodyB: RigidBody2D;
  public colliderA: Collider2D;
  public colliderB: Collider2D;

  public normal: Vector2; // Points from A to B
  public tangent: Vector2;
  public contacts: ContactPoint[] = [];

  public friction = 0.2;
  public restitution = 0.0;
  public isSensor = false;

  constructor(
    entityA: EntityId,
    entityB: EntityId,
    bodyA: RigidBody2D,
    bodyB: RigidBody2D,
    colliderA: Collider2D,
    colliderB: Collider2D
  ) {
    this.entityA = entityA;
    this.entityB = entityB;
    this.bodyA = bodyA;
    this.bodyB = bodyB;
    this.colliderA = colliderA;
    this.colliderB = colliderB;
    this.normal = new Vector2();
    this.tangent = new Vector2();

    // Geometric mean for friction, max for restitution
    this.friction = Math.sqrt(colliderA.material.friction * colliderB.material.friction);
    this.restitution = Math.max(colliderA.material.restitution, colliderB.material.restitution);
    this.isSensor = colliderA.isSensor || colliderB.isSensor;
  }

  public computeTangent(): void {
    this.tangent.set(-this.normal.y, this.normal.x);
  }
}
