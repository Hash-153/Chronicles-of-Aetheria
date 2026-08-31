/**
 * @file Spline.ts
 * @description Catmull-Rom and Bezier curves for smooth entity interpolation, camera paths, and projectile trajectories.
 */

import { Vector2 } from './Vector2.ts';

export class Spline2D {
  public points: Vector2[];
  public closed: boolean;

  constructor(points: Vector2[] = [], closed = false) {
    this.points = points;
    this.closed = closed;
  }

  public addPoint(point: Vector2): this {
    this.points.push(point.clone());
    return this;
  }

  public getPoint(t: number): Vector2 {
    const pts = this.points;
    if (pts.length === 0) return new Vector2(0, 0);
    if (pts.length === 1) return pts[0].clone();

    const p = (pts.length - (this.closed ? 0 : 1)) * t;
    const intPoint = Math.floor(p);
    const weight = p - intPoint;

    const idx0 = this.getPointIndex(intPoint - 1);
    const idx1 = this.getPointIndex(intPoint);
    const idx2 = this.getPointIndex(intPoint + 1);
    const idx3 = this.getPointIndex(intPoint + 2);

    return this.catmullRom(pts[idx0], pts[idx1], pts[idx2], pts[idx3], weight);
  }

  private getPointIndex(i: number): number {
    const len = this.points.length;
    if (this.closed) {
      return (i % len + len) % len;
    }
    return Math.max(0, Math.min(len - 1, i));
  }

  private catmullRom(p0: Vector2, p1: Vector2, p2: Vector2, p3: Vector2, t: number): Vector2 {
    const t2 = t * t;
    const t3 = t2 * t;

    const v0 = (p2.x - p0.x) * 0.5;
    const v1 = (p3.x - p1.x) * 0.5;
    const x = (2 * p1.x - 2 * p2.x + v0 + v1) * t3 + (-3 * p1.x + 3 * p2.x - 2 * v0 - v1) * t2 + v0 * t + p1.x;

    const w0 = (p2.y - p0.y) * 0.5;
    const w1 = (p3.y - p1.y) * 0.5;
    const y = (2 * p1.y - 2 * p2.y + w0 + w1) * t3 + (-3 * p1.y + 3 * p2.y - 2 * w0 - w1) * t2 + w0 * t + p1.y;

    return new Vector2(x, y);
  }
}
