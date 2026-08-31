/**
 * @file SteeringBehaviors.ts
 * @description Autonomous agent steering behaviors: Seek, Flee, Arrive, Wander, Pursuit, Evade, and Flocking.
 */

import { Vector2 } from '../core/math/Vector2.ts';

export class SteeringBehaviors {
  public static seek(position: Vector2, velocity: Vector2, target: Vector2, maxSpeed: number, maxForce: number): Vector2 {
    const desired = target.subtract(position).normalize().scale(maxSpeed);
    const steer = desired.subtract(velocity);
    return steer.clampLength(0, maxForce);
  }

  public static flee(position: Vector2, velocity: Vector2, target: Vector2, maxSpeed: number, maxForce: number): Vector2 {
    const desired = position.subtract(target).normalize().scale(maxSpeed);
    const steer = desired.subtract(velocity);
    return steer.clampLength(0, maxForce);
  }

  public static arrive(
    position: Vector2,
    velocity: Vector2,
    target: Vector2,
    maxSpeed: number,
    maxForce: number,
    slowingRadius = 100
  ): Vector2 {
    const offset = target.subtract(position);
    const distance = offset.length();
    if (distance === 0) return new Vector2(0, 0);

    const rampedSpeed = maxSpeed * (distance / slowingRadius);
    const clippedSpeed = Math.min(rampedSpeed, maxSpeed);
    const desired = offset.scale(clippedSpeed / distance);

    const steer = desired.subtract(velocity);
    return steer.clampLength(0, maxForce);
  }

  public static wander(
    velocity: Vector2,
    circleDistance = 50,
    circleRadius = 30,
    wanderAngle = 0,
    angleChange = 0.5,
    maxForce = 50
  ): { force: Vector2; newAngle: number } {
    const circleCenter = velocity.lengthSquared() > 0 ? velocity.clone().normalize().scale(circleDistance) : new Vector2(circleDistance, 0);
    const newAngle = wanderAngle + (Math.random() * 2 - 1) * angleChange;

    const displacement = new Vector2(Math.cos(newAngle) * circleRadius, Math.sin(newAngle) * circleRadius);
    const force = circleCenter.add(displacement).clampLength(0, maxForce);

    return { force, newAngle };
  }

  public static separation(position: Vector2, neighbors: Vector2[], separationRadius = 40, maxForce = 100): Vector2 {
    let steer = new Vector2();
    let count = 0;

    for (let i = 0; i < neighbors.length; i++) {
      const other = neighbors[i];
      const d = position.distanceTo(other);
      if (d > 0 && d < separationRadius) {
        const diff = position.subtract(other).normalize().scale(1 / d);
        steer.addSelf(diff);
        count++;
      }
    }

    if (count > 0) {
      steer.scaleSelf(1 / count);
      steer.clampLength(0, maxForce);
    }

    return steer;
  }
}
