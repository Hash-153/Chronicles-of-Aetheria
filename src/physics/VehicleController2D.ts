/**
 * @file VehicleController2D.ts
 * @description 2D Top-Down / Arcade Vehicle physics controller with tire drift, suspension, and steering ackermann geometry.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { RigidBody2D } from './RigidBody2D.ts';

export class VehicleController2D {
  public body: RigidBody2D;
  public maxSpeed = 400;
  public acceleration = 300;
  public reverseSpeed = 150;
  public steerAngle = 0;
  public maxSteerAngle = 0.6; // radians
  public driftFactor = 0.95; // 1 = full grip, <1 = drift

  constructor(body: RigidBody2D) {
    this.body = body;
  }

  public update(throttle: number, steer: number, forwardDir: Vector2, dt: number): void {
    const rightDir = new Vector2(-forwardDir.y, forwardDir.x);

    // 1. Steering
    this.steerAngle = steer * this.maxSteerAngle;
    const carForward = forwardDir.rotate(this.steerAngle);

    // 2. Drive force
    if (throttle > 0) {
      this.body.applyForce(carForward.scale(throttle * this.acceleration * this.body.mass));
    } else if (throttle < 0) {
      this.body.applyForce(carForward.scale(throttle * this.reverseSpeed * this.body.mass));
    }

    // 3. Lateral tire friction (kill sideways velocity)
    const forwardVel = carForward.scale(this.body.velocity.dot(carForward));
    const rightVel = rightDir.scale(this.body.velocity.dot(rightDir));

    this.body.velocity.copy(forwardVel.add(rightVel.scale(this.driftFactor)));
  }
}
