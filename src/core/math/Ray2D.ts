/**
 * @file Ray2D.ts
 * @description 2D Ray representation with intersection algorithms against AABB, Circle, and Line Segments.
 */

import { Vector2 } from './Vector2.ts';
import { AABB } from './AABB.ts';
import { Circle } from './Circle.ts';

export interface RaycastHit2D {
  point: Vector2;
  normal: Vector2;
  distance: number;
  fraction: number;
}

export class Ray2D {
  public origin: Vector2;
  public direction: Vector2;
  public length: number;

  constructor(origin = new Vector2(), direction = new Vector2(1, 0), length = Infinity) {
    this.origin = origin;
    this.direction = direction.normalize();
    this.length = length;
  }

  public getPoint(distance: number): Vector2 {
    return this.origin.add(this.direction.scale(distance));
  }

  public intersectSegment(p1: Vector2, p2: Vector2): RaycastHit2D | null {
    const v1 = this.origin.subtract(p1);
    const v2 = p2.subtract(p1);
    const v3 = new Vector2(-this.direction.y, this.direction.x);

    const dot = v2.dot(v3);
    if (Math.abs(dot) < 1e-8) return null; // Parallel

    const t1 = v2.cross(v1) / dot;
    const t2 = v1.dot(v3) / dot;

    if (t1 >= 0 && t1 <= this.length && t2 >= 0 && t2 <= 1) {
      const hitPoint = this.getPoint(t1);
      const edgeDir = v2.normalize();
      const normal = new Vector2(-edgeDir.y, edgeDir.x);
      // Ensure normal faces against ray direction
      if (normal.dot(this.direction) > 0) {
        normal.scaleSelf(-1);
      }
      return {
        point: hitPoint,
        normal,
        distance: t1,
        fraction: this.length === Infinity ? 0 : t1 / this.length,
      };
    }
    return null;
  }

  public intersectCircle(circle: Circle): RaycastHit2D | null {
    const m = this.origin.subtract(circle.center);
    const b = m.dot(this.direction);
    const c = m.dot(m) - circle.radius * circle.radius;

    // Ray origin is outside circle and points away
    if (c > 0 && b > 0) return null;

    const discr = b * b - c;
    if (discr < 0) return null; // No intersection

    let t = -b - Math.sqrt(discr);
    if (t < 0) t = 0; // Origin inside circle
    if (t > this.length) return null;

    const point = this.getPoint(t);
    const normal = point.subtract(circle.center).normalize();

    return {
      point,
      normal,
      distance: t,
      fraction: this.length === Infinity ? 0 : t / this.length,
    };
  }

  public intersectAABB(aabb: AABB): RaycastHit2D | null {
    let tmin = 0;
    let tmax = this.length;
    let normal = new Vector2();

    // Check X slab
    if (Math.abs(this.direction.x) < 1e-8) {
      if (this.origin.x < aabb.min.x || this.origin.x > aabb.max.x) return null;
    } else {
      const invD = 1 / this.direction.x;
      let t1 = (aabb.min.x - this.origin.x) * invD;
      let t2 = (aabb.max.x - this.origin.x) * invD;
      let nx = -1;
      if (t1 > t2) {
        const tmp = t1; t1 = t2; t2 = tmp;
        nx = 1;
      }
      if (t1 > tmin) {
        tmin = t1;
        normal.set(nx, 0);
      }
      tmax = Math.min(tmax, t2);
      if (tmin > tmax) return null;
    }

    // Check Y slab
    if (Math.abs(this.direction.y) < 1e-8) {
      if (this.origin.y < aabb.min.y || this.origin.y > aabb.max.y) return null;
    } else {
      const invD = 1 / this.direction.y;
      let t1 = (aabb.min.y - this.origin.y) * invD;
      let t2 = (aabb.max.y - this.origin.y) * invD;
      let ny = -1;
      if (t1 > t2) {
        const tmp = t1; t1 = t2; t2 = tmp;
        ny = 1;
      }
      if (t1 > tmin) {
        tmin = t1;
        normal.set(0, ny);
      }
      tmax = Math.min(tmax, t2);
      if (tmin > tmax) return null;
    }

    if (tmin < 0 || tmin > this.length) return null;

    return {
      point: this.getPoint(tmin),
      normal,
      distance: tmin,
      fraction: this.length === Infinity ? 0 : tmin / this.length,
    };
  }
}
