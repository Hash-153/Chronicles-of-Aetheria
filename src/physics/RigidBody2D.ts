/**
 * @file RigidBody2D.ts
 * @description 2D Rigid Body component supporting Dynamic, Static, and Kinematic motion, inertia, damping, and force accumulation.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Component } from '../core/ecs/Component.ts';

export const BodyType = {
  Static: 0,
  Kinematic: 1,
  Dynamic: 2,
} as const;
export type BodyType = typeof BodyType[keyof typeof BodyType];

export class RigidBody2D {
  public type: BodyType;

  // Linear motion
  public velocity: Vector2;
  public force: Vector2;
  public linearDamping: number;

  // Angular motion
  public angularVelocity: number; // radians/sec
  public torque: number;
  public angularDamping: number;

  // Mass properties
  public mass: number;
  public invMass: number;
  public inertia: number;
  public invInertia: number;

  // Physics modifiers
  public gravityScale: number;
  public isFixedRotation: boolean;
  public isBullet: boolean; // Enables Continuous Collision Detection

  // Sleeping state
  public isSleeping = false;
  public sleepTimer = 0;

  constructor(options: {
    type?: BodyType;
    mass?: number;
    linearDamping?: number;
    angularDamping?: number;
    gravityScale?: number;
    fixedRotation?: boolean;
    bullet?: boolean;
  } = {}) {
    this.type = options.type ?? BodyType.Dynamic;
    this.velocity = new Vector2();
    this.force = new Vector2();
    this.linearDamping = options.linearDamping ?? 0.05;

    this.angularVelocity = 0;
    this.torque = 0;
    this.angularDamping = options.angularDamping ?? 0.1;

    this.mass = options.mass ?? 1.0;
    this.invMass = this.type === BodyType.Dynamic && this.mass > 0 ? 1 / this.mass : 0;

    // Approximate rotational inertia for a unit box
    this.inertia = this.mass * 32.0;
    this.invInertia = this.type === BodyType.Dynamic && this.inertia > 0 ? 1 / this.inertia : 0;

    this.gravityScale = options.gravityScale ?? 1.0;
    this.isFixedRotation = options.fixedRotation ?? false;
    this.isBullet = options.bullet ?? false;

    if (this.type !== BodyType.Dynamic) {
      this.invMass = 0;
      this.invInertia = 0;
    }
  }

  public setMass(mass: number): this {
    this.mass = Math.max(0, mass);
    this.invMass = this.type === BodyType.Dynamic && this.mass > 0 ? 1 / this.mass : 0;
    return this;
  }

  public applyForce(force: Vector2): void {
    if (this.type !== BodyType.Dynamic) return;
    this.force.addSelf(force);
    this.wakeUp();
  }

  public applyImpulse(impulse: Vector2): void {
    if (this.type !== BodyType.Dynamic) return;
    this.velocity.addSelf(impulse.scale(this.invMass));
    this.wakeUp();
  }

  public applyTorque(torque: number): void {
    if (this.type !== BodyType.Dynamic || this.isFixedRotation) return;
    this.torque += torque;
    this.wakeUp();
  }

  public applyAngularImpulse(impulse: number): void {
    if (this.type !== BodyType.Dynamic || this.isFixedRotation) return;
    this.angularVelocity += impulse * this.invInertia;
    this.wakeUp();
  }

  public wakeUp(): void {
    this.isSleeping = false;
    this.sleepTimer = 0;
  }

  public clearForces(): void {
    this.force.set(0, 0);
    this.torque = 0;
  }
}
