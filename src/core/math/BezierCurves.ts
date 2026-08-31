/**
 * @file BezierCurves.ts
 * @description Quadratic, Cubic, and N-degree Composite Bezier Curves with Arc-Length Parameterization and curvature.
 */

import { Vector2 } from './Vector2.ts';

export class QuadraticBezier2D {
  public p0: Vector2;
  public p1: Vector2;
  public p2: Vector2;

  constructor(p0: Vector2, p1: Vector2, p2: Vector2) {
    this.p0 = p0.clone();
    this.p1 = p1.clone();
    this.p2 = p2.clone();
  }

  public getPoint(t: number, out = new Vector2()): Vector2 {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const x = uu * this.p0.x + 2 * u * t * this.p1.x + tt * this.p2.x;
    const y = uu * this.p0.y + 2 * u * t * this.p1.y + tt * this.p2.y;
    return out.set(x, y);
  }

  public getTangent(t: number, out = new Vector2()): Vector2 {
    const u = 1 - t;
    const x = 2 * u * (this.p1.x - this.p0.x) + 2 * t * (this.p2.x - this.p1.x);
    const y = 2 * u * (this.p1.y - this.p0.y) + 2 * t * (this.p2.y - this.p1.y);
    return out.set(x, y).normalizeSelf();
  }

  public getNormal(t: number, out = new Vector2()): Vector2 {
    const tan = this.getTangent(t, out);
    return out.set(-tan.y, tan.x);
  }

  public approximateLength(samples = 32): number {
    let length = 0;
    let prev = this.getPoint(0);
    const curr = new Vector2();
    for (let i = 1; i <= samples; i++) {
      this.getPoint(i / samples, curr);
      length += prev.distanceTo(curr);
      prev.copy(curr);
    }
    return length;
  }
}

export class CubicBezier2D {
  public p0: Vector2;
  public p1: Vector2;
  public p2: Vector2;
  public p3: Vector2;

  private _arcLengths: Float32Array;
  private _sampleCount: number;

  constructor(p0: Vector2, p1: Vector2, p2: Vector2, p3: Vector2, sampleCount = 64) {
    this.p0 = p0.clone();
    this.p1 = p1.clone();
    this.p2 = p2.clone();
    this.p3 = p3.clone();
    this._sampleCount = sampleCount;
    this._arcLengths = new Float32Array(sampleCount + 1);
    this.recomputeArcLengths();
  }

  public recomputeArcLengths(): void {
    this._arcLengths[0] = 0;
    let prev = this.getPoint(0);
    const curr = new Vector2();
    let total = 0;

    for (let i = 1; i <= this._sampleCount; i++) {
      const t = i / this._sampleCount;
      this.getPoint(t, curr);
      total += prev.distanceTo(curr);
      this._arcLengths[i] = total;
      prev.copy(curr);
    }
  }

  public get totalLength(): number {
    return this._arcLengths[this._sampleCount];
  }

  public getPoint(t: number, out = new Vector2()): Vector2 {
    const u = 1 - t;
    const tt = t * t;
    const ttt = tt * t;
    const uu = u * u;
    const uuu = uu * u;

    const x = uuu * this.p0.x + 3 * uu * t * this.p1.x + 3 * u * tt * this.p2.x + ttt * this.p3.x;
    const y = uuu * this.p0.y + 3 * uu * t * this.p1.y + 3 * u * tt * this.p2.y + ttt * this.p3.y;
    return out.set(x, y);
  }

  public getTangent(t: number, out = new Vector2()): Vector2 {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;

    const x = 3 * uu * (this.p1.x - this.p0.x) + 6 * u * t * (this.p2.x - this.p1.x) + 3 * tt * (this.p3.x - this.p2.x);
    const y = 3 * uu * (this.p1.y - this.p0.y) + 6 * u * t * (this.p2.y - this.p1.y) + 3 * tt * (this.p3.y - this.p2.y);
    return out.set(x, y).normalizeSelf();
  }

  public getPointAtDistance(distance: number, out = new Vector2()): Vector2 {
    const targetLength = Math.max(0, Math.min(this.totalLength, distance));
    // Binary search arc length table
    let low = 0;
    let high = this._sampleCount;
    let index = 0;

    while (low <= high) {
      index = Math.floor((low + high) / 2);
      if (this._arcLengths[index] < targetLength) {
        low = index + 1;
      } else if (this._arcLengths[index] > targetLength) {
        high = index - 1;
      } else {
        break;
      }
    }

    if (this._arcLengths[index] > targetLength && index > 0) {
      index--;
    }

    const lengthBefore = this._arcLengths[index];
    const segmentLength = this._arcLengths[index + 1] - lengthBefore;
    const segmentFraction = segmentLength > 0 ? (targetLength - lengthBefore) / segmentLength : 0;
    const t = (index + segmentFraction) / this._sampleCount;

    return this.getPoint(t, out);
  }
}
