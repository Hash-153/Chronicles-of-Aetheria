/**
 * @file FluidDynamics2D.ts
 * @description Simulates buoyancy, fluid drag, water surface tension, and air currents for submerged bodies.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { AABB } from '../core/math/AABB.ts';
import { RigidBody2D } from './RigidBody2D.ts';
import { Collider2D } from './Collider2D.ts';

export class FluidVolume2D {
  public bounds: AABB;
  public density: number; // Density of liquid (e.g. 1.0 for water, 3.0 for lava)
  public linearDrag: number;
  public angularDrag: number;
  public flowVelocity: Vector2;

  constructor(bounds: AABB, density = 1.0, linearDrag = 2.0, angularDrag = 1.5, flow = new Vector2()) {
    this.bounds = bounds.clone();
    this.density = density;
    this.linearDrag = linearDrag;
    this.angularDrag = angularDrag;
    this.flowVelocity = flow.clone();
  }

  public applyFluidForces(body: RigidBody2D, collider: Collider2D, bodyPos: Vector2, gravity: Vector2): void {
    const bodyAABB = collider.computeWorldAABB(bodyPos);
    if (!this.bounds.intersectsAABB(bodyAABB)) return;

    const overlap = this.bounds.getOverlap(bodyAABB);
    const submergedArea = overlap.x * overlap.y;
    if (submergedArea <= 0) return;

    // 1. Buoyancy: F_buoyancy = -density * submergedArea * gravity
    const displacedMass = this.density * submergedArea * 0.001;
    const buoyancyForce = gravity.scale(-displacedMass);
    body.applyForce(buoyancyForce);

    // 2. Relative Fluid Velocity & Drag
    const relVel = body.velocity.subtract(this.flowVelocity);
    const dragMag = relVel.length();
    if (dragMag > 0) {
      const dragForce = relVel.scale(-0.5 * this.density * this.linearDrag * dragMag * 0.01);
      body.applyForce(dragForce);
    }

    // 3. Angular Drag
    body.angularVelocity *= Math.max(0, 1 - this.angularDrag * 0.05);
  }
}
