/**
 * @file Matrix2.ts
 * @description 2x2 Matrix for 2D linear transformations, rotations, shear, and eigenvalues.
 */

import { Vector2 } from './Vector2.ts';

export class Matrix2 {
  public m00: number;
  public m01: number;
  public m10: number;
  public m11: number;

  constructor(m00 = 1, m01 = 0, m10 = 0, m11 = 1) {
    this.m00 = m00;
    this.m01 = m01;
    this.m10 = m10;
    this.m11 = m11;
  }

  public identity(): this {
    this.m00 = 1; this.m01 = 0;
    this.m10 = 0; this.m11 = 1;
    return this;
  }

  public set(m00: number, m01: number, m10: number, m11: number): this {
    this.m00 = m00; this.m01 = m01;
    this.m10 = m10; this.m11 = m11;
    return this;
  }

  public copy(other: Matrix2): this {
    this.m00 = other.m00; this.m01 = other.m01;
    this.m10 = other.m10; this.m11 = other.m11;
    return this;
  }

  public clone(): Matrix2 {
    return new Matrix2(this.m00, this.m01, this.m10, this.m11);
  }

  public makeRotation(radians: number): this {
    const c = Math.cos(radians);
    const s = Math.sin(radians);
    this.m00 = c;  this.m01 = -s;
    this.m10 = s;  this.m11 = c;
    return this;
  }

  public makeScale(sx: number, sy: number): this {
    this.m00 = sx; this.m01 = 0;
    this.m10 = 0;  this.m11 = sy;
    return this;
  }

  public multiply(other: Matrix2): Matrix2 {
    return new Matrix2(
      this.m00 * other.m00 + this.m01 * other.m10,
      this.m00 * other.m01 + this.m01 * other.m11,
      this.m10 * other.m00 + this.m11 * other.m10,
      this.m10 * other.m01 + this.m11 * other.m11
    );
  }

  public multiplySelf(other: Matrix2): this {
    const a00 = this.m00, a01 = this.m01, a10 = this.m10, a11 = this.m11;
    this.m00 = a00 * other.m00 + a01 * other.m10;
    this.m01 = a00 * other.m01 + a01 * other.m11;
    this.m10 = a10 * other.m00 + a11 * other.m10;
    this.m11 = a10 * other.m01 + a11 * other.m11;
    return this;
  }

  public transform(v: Vector2, out = new Vector2()): Vector2 {
    const x = this.m00 * v.x + this.m01 * v.y;
    const y = this.m10 * v.x + this.m11 * v.y;
    return out.set(x, y);
  }

  public determinant(): number {
    return this.m00 * this.m11 - this.m01 * this.m10;
  }

  public invert(): this {
    const det = this.determinant();
    if (Math.abs(det) < 1e-8) {
      this.identity();
      return this;
    }
    const invDet = 1 / det;
    const a00 = this.m00;
    this.m00 = this.m11 * invDet;
    this.m01 = -this.m01 * invDet;
    this.m10 = -this.m10 * invDet;
    this.m11 = a00 * invDet;
    return this;
  }

  public transpose(): this {
    const temp = this.m01;
    this.m01 = this.m10;
    this.m10 = temp;
    return this;
  }

  public computeEigenvalues(): [number, number] {
    const trace = this.m00 + this.m11;
    const det = this.determinant();
    const discr = Math.sqrt(Math.max(0, trace * trace - 4 * det));
    return [(trace + discr) * 0.5, (trace - discr) * 0.5];
  }
}
