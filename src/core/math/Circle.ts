/**
 * @file Circle.ts
 * @description 2D Circle geometric primitive with bounding boxes and intersections.
 */

import { Vector2 } from './Vector2.ts';
import { AABB } from './AABB.ts';

export class Circle {
  public center: Vector2;
  public radius: number;

  constructor(center = new Vector2(), radius = 1) {
    this.center = center;
    this.radius = Math.max(0, radius);
  }

  public set(x: number, y: number, radius: number): this {
    this.center.set(x, y);
    this.radius = Math.max(0, radius);
    return this;
  }

  public clone(): Circle {
    return new Circle(this.center.clone(), this.radius);
  }

  public copy(other: Circle): this {
    this.center.copy(other.center);
    this.radius = other.radius;
    return this;
  }

  public get area(): number {
    return Math.PI * this.radius * this.radius;
  }

  public get circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  public computeAABB(): AABB {
    return new AABB(
      this.center.x - this.radius,
      this.center.y - this.radius,
      this.center.x + this.radius,
      this.center.y + this.radius
    );
  }

  public containsPoint(point: Vector2): boolean {
    return this.center.distanceToSquared(point) <= this.radius * this.radius;
  }

  public intersectsCircle(other: Circle): boolean {
    const rSum = this.radius + other.radius;
    return this.center.distanceToSquared(other.center) <= rSum * rSum;
  }

  public intersectsAABB(aabb: AABB): boolean {
    // Find closest point on AABB to circle center
    const closestX = Math.max(aabb.min.x, Math.min(this.center.x, aabb.max.x));
    const closestY = Math.max(aabb.min.y, Math.min(this.center.y, aabb.max.y));

    const dx = this.center.x - closestX;
    const dy = this.center.y - closestY;

    return dx * dx + dy * dy <= this.radius * this.radius;
  }
}
