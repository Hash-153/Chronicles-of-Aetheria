/**
 * @file AABB.ts
 * @description 2D Axis-Aligned Bounding Box with intersection, expansion, and raycast algorithms.
 */

import { Vector2 } from './Vector2.ts';

export class AABB {
  public min: Vector2;
  public max: Vector2;

  constructor(minX = 0, minY = 0, maxX = 0, maxY = 0) {
    this.min = new Vector2(minX, minY);
    this.max = new Vector2(maxX, maxY);
  }

  public static fromCenterAndHalfExtents(center: Vector2, halfExtents: Vector2): AABB {
    return new AABB(
      center.x - halfExtents.x,
      center.y - halfExtents.y,
      center.x + halfExtents.x,
      center.y + halfExtents.y
    );
  }

  public static fromPoints(points: Vector2[]): AABB {
    if (points.length === 0) return new AABB(0, 0, 0, 0);
    let minX = points[0].x;
    let minY = points[0].y;
    let maxX = points[0].x;
    let maxY = points[0].y;

    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      if (p.x < minX) minX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
    }
    return new AABB(minX, minY, maxX, maxY);
  }

  public set(minX: number, minY: number, maxX: number, maxY: number): this {
    this.min.set(minX, minY);
    this.max.set(maxX, maxY);
    return this;
  }

  public copy(other: AABB): this {
    this.min.copy(other.min);
    this.max.copy(other.max);
    return this;
  }

  public clone(): AABB {
    return new AABB(this.min.x, this.min.y, this.max.x, this.max.y);
  }

  public get width(): number {
    return Math.max(0, this.max.x - this.min.x);
  }

  public get height(): number {
    return Math.max(0, this.max.y - this.min.y);
  }

  public get center(): Vector2 {
    return new Vector2(
      (this.min.x + this.max.x) * 0.5,
      (this.min.y + this.max.y) * 0.5
    );
  }

  public get halfExtents(): Vector2 {
    return new Vector2(
      (this.max.x - this.min.x) * 0.5,
      (this.max.y - this.min.y) * 0.5
    );
  }

  public get area(): number {
    return this.width * this.height;
  }

  public get perimeter(): number {
    return 2 * (this.width + this.height);
  }

  public containsPoint(p: Vector2): boolean {
    return (
      p.x >= this.min.x &&
      p.x <= this.max.x &&
      p.y >= this.min.y &&
      p.y <= this.max.y
    );
  }

  public containsAABB(other: AABB): boolean {
    return (
      other.min.x >= this.min.x &&
      other.max.x <= this.max.x &&
      other.min.y >= this.min.y &&
      other.max.y <= this.max.y
    );
  }

  public intersectsAABB(other: AABB): boolean {
    if (this.max.x < other.min.x || this.min.x > other.max.x) return false;
    if (this.max.y < other.min.y || this.min.y > other.max.y) return false;
    return true;
  }

  public expandToPoint(p: Vector2): this {
    this.min.x = Math.min(this.min.x, p.x);
    this.min.y = Math.min(this.min.y, p.y);
    this.max.x = Math.max(this.max.x, p.x);
    this.max.y = Math.max(this.max.y, p.y);
    return this;
  }

  public expandToAABB(other: AABB): this {
    this.min.x = Math.min(this.min.x, other.min.x);
    this.min.y = Math.min(this.min.y, other.min.y);
    this.max.x = Math.max(this.max.x, other.max.x);
    this.max.y = Math.max(this.max.y, other.max.y);
    return this;
  }

  public fatten(margin: number): this {
    this.min.x -= margin;
    this.min.y -= margin;
    this.max.x += margin;
    this.max.y += margin;
    return this;
  }

  public translate(delta: Vector2): this {
    this.min.addSelf(delta);
    this.max.addSelf(delta);
    return this;
  }

  public getOverlap(other: AABB): Vector2 {
    const ox = Math.min(this.max.x, other.max.x) - Math.max(this.min.x, other.min.x);
    const oy = Math.min(this.max.y, other.max.y) - Math.max(this.min.y, other.min.y);
    return new Vector2(Math.max(0, ox), Math.max(0, oy));
  }
}
