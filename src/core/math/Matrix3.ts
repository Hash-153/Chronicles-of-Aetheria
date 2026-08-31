/**
 * @file Matrix3.ts
 * @description 3x3 affine transformation matrix for 2D homogeneous coordinates (transforms, rotations, scales, sheers).
 */

import { Vector2 } from './Vector2.ts';

export class Matrix3 {
  // Elements stored in column-major order:
  // [ m0 m3 m6 ]
  // [ m1 m4 m7 ]
  // [ m2 m5 m8 ]
  public elements: Float32Array;

  constructor() {
    this.elements = new Float32Array([
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ]);
  }

  public identity(): this {
    const e = this.elements;
    e[0] = 1; e[3] = 0; e[6] = 0;
    e[1] = 0; e[4] = 1; e[7] = 0;
    e[2] = 0; e[5] = 0; e[8] = 1;
    return this;
  }

  public copy(m: Matrix3): this {
    const me = m.elements;
    const te = this.elements;
    for (let i = 0; i < 9; i++) {
      te[i] = me[i];
    }
    return this;
  }

  public clone(): Matrix3 {
    const m = new Matrix3();
    m.copy(this);
    return m;
  }

  public set(
    m00: number, m01: number, m02: number,
    m10: number, m11: number, m12: number,
    m20: number, m21: number, m22: number
  ): this {
    const te = this.elements;
    te[0] = m00; te[3] = m01; te[6] = m02;
    te[1] = m10; te[4] = m11; te[7] = m12;
    te[2] = m20; te[5] = m21; te[8] = m22;
    return this;
  }

  public multiply(other: Matrix3): Matrix3 {
    return this.clone().multiplySelf(other);
  }

  public multiplySelf(other: Matrix3): this {
    const ae = this.elements;
    const be = other.elements;

    const a0 = ae[0], a1 = ae[1], a2 = ae[2];
    const a3 = ae[3], a4 = ae[4], a5 = ae[5];
    const a6 = ae[6], a7 = ae[7], a8 = ae[8];

    const b0 = be[0], b1 = be[1], b2 = be[2];
    const b3 = be[3], b4 = be[4], b5 = be[5];
    const b6 = be[6], b7 = be[7], b8 = be[8];

    ae[0] = a0 * b0 + a3 * b1 + a6 * b2;
    ae[1] = a1 * b0 + a4 * b1 + a7 * b2;
    ae[2] = a2 * b0 + a5 * b1 + a8 * b2;

    ae[3] = a0 * b3 + a3 * b4 + a6 * b5;
    ae[4] = a1 * b3 + a4 * b4 + a7 * b5;
    ae[5] = a2 * b3 + a5 * b4 + a8 * b5;

    ae[6] = a0 * b6 + a3 * b7 + a6 * b8;
    ae[7] = a1 * b6 + a4 * b7 + a7 * b8;
    ae[8] = a2 * b6 + a5 * b7 + a8 * b8;

    return this;
  }

  public makeTranslation(x: number, y: number): this {
    this.set(
      1, 0, x,
      0, 1, y,
      0, 0, 1
    );
    return this;
  }

  public makeRotation(radians: number): this {
    const c = Math.cos(radians);
    const s = Math.sin(radians);
    this.set(
      c, -s, 0,
      s,  c, 0,
      0,  0, 1
    );
    return this;
  }

  public makeScale(x: number, y: number): this {
    this.set(
      x, 0, 0,
      0, y, 0,
      0, 0, 1
    );
    return this;
  }

  public translate(x: number, y: number): this {
    const t = new Matrix3().makeTranslation(x, y);
    return this.multiplySelf(t);
  }

  public rotate(radians: number): this {
    const r = new Matrix3().makeRotation(radians);
    return this.multiplySelf(r);
  }

  public scale(x: number, y: number): this {
    const s = new Matrix3().makeScale(x, y);
    return this.multiplySelf(s);
  }

  public transformVector2(v: Vector2): Vector2 {
    const e = this.elements;
    const x = e[0] * v.x + e[3] * v.y + e[6];
    const y = e[1] * v.x + e[4] * v.y + e[7];
    return new Vector2(x, y);
  }

  public transformVector2Self(v: Vector2): Vector2 {
    const e = this.elements;
    const x = e[0] * v.x + e[3] * v.y + e[6];
    const y = e[1] * v.x + e[4] * v.y + e[7];
    v.x = x;
    v.y = y;
    return v;
  }

  public determinant(): number {
    const e = this.elements;
    return (
      e[0] * (e[4] * e[8] - e[7] * e[5]) -
      e[3] * (e[1] * e[8] - e[7] * e[2]) +
      e[6] * (e[1] * e[5] - e[4] * e[2])
    );
  }

  public invert(): this {
    const e = this.elements;
    const det = this.determinant();
    if (Math.abs(det) < 1e-8) {
      this.identity();
      return this;
    }
    const invDet = 1 / det;

    const n00 = (e[4] * e[8] - e[5] * e[7]) * invDet;
    const n01 = (e[6] * e[5] - e[3] * e[8]) * invDet;
    const n02 = (e[3] * e[7] - e[6] * e[4]) * invDet;

    const n10 = (e[7] * e[2] - e[1] * e[8]) * invDet;
    const n11 = (e[0] * e[8] - e[6] * e[2]) * invDet;
    const n12 = (e[6] * e[1] - e[0] * e[7]) * invDet;

    const n20 = (e[1] * e[5] - e[2] * e[4]) * invDet;
    const n21 = (e[2] * e[3] - e[0] * e[5]) * invDet;
    const n22 = (e[0] * e[4] - e[1] * e[3]) * invDet;

    e[0] = n00; e[3] = n01; e[6] = n02;
    e[1] = n10; e[4] = n11; e[7] = n12;
    e[2] = n20; e[5] = n21; e[8] = n22;

    return this;
  }
}
