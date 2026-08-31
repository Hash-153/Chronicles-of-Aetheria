/**
 * @file Matrix4.ts
 * @description 4x4 Transformation matrix for 3D projections, camera transformations, WebGL model-view matrices.
 */

import { Vector3 } from './Vector3.ts';

export class Matrix4 {
  public elements: Float32Array;

  constructor() {
    this.elements = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
  }

  public identity(): this {
    const e = this.elements;
    e[0] = 1; e[4] = 0; e[8] = 0; e[12] = 0;
    e[1] = 0; e[5] = 1; e[9] = 0; e[13] = 0;
    e[2] = 0; e[6] = 0; e[10] = 1; e[14] = 0;
    e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;
    return this;
  }

  public copy(m: Matrix4): this {
    const me = m.elements;
    const te = this.elements;
    for (let i = 0; i < 16; i++) {
      te[i] = me[i];
    }
    return this;
  }

  public clone(): Matrix4 {
    const m = new Matrix4();
    m.copy(this);
    return m;
  }

  public multiply(other: Matrix4): Matrix4 {
    return this.clone().multiplySelf(other);
  }

  public multiplySelf(other: Matrix4): this {
    const ae = this.elements;
    const be = other.elements;
    const r = new Float32Array(16);

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        r[col * 4 + row] =
          ae[0 * 4 + row] * be[col * 4 + 0] +
          ae[1 * 4 + row] * be[col * 4 + 1] +
          ae[2 * 4 + row] * be[col * 4 + 2] +
          ae[3 * 4 + row] * be[col * 4 + 3];
      }
    }

    for (let i = 0; i < 16; i++) {
      ae[i] = r[i];
    }
    return this;
  }

  public makeOrthographic(left: number, right: number, top: number, bottom: number, near: number, far: number): this {
    const te = this.elements;
    const w = 1.0 / (right - left);
    const h = 1.0 / (top - bottom);
    const p = 1.0 / (far - near);

    const x = (right + left) * w;
    const y = (top + bottom) * h;
    const z = (far + near) * p;

    te[0] = 2 * w;   te[4] = 0;       te[8] = 0;        te[12] = -x;
    te[1] = 0;       te[5] = 2 * h;   te[9] = 0;        te[13] = -y;
    te[2] = 0;       te[6] = 0;       te[10] = -2 * p;  te[14] = -z;
    te[3] = 0;       te[7] = 0;       te[11] = 0;       te[15] = 1;

    return this;
  }

  public makePerspective(fovRadians: number, aspect: number, near: number, far: number): this {
    const te = this.elements;
    const f = 1.0 / Math.tan(fovRadians / 2);
    const rangeInv = 1.0 / (near - far);

    te[0] = f / aspect; te[4] = 0; te[8] = 0;                       te[12] = 0;
    te[1] = 0;          te[5] = f; te[9] = 0;                       te[13] = 0;
    te[2] = 0;          te[6] = 0; te[10] = (far + near) * rangeInv; te[14] = (2 * far * near) * rangeInv;
    te[3] = 0;          te[7] = 0; te[11] = -1;                     te[15] = 0;

    return this;
  }

  public makeTranslation(x: number, y: number, z: number): this {
    this.identity();
    const e = this.elements;
    e[12] = x;
    e[13] = y;
    e[14] = z;
    return this;
  }

  public makeScale(x: number, y: number, z: number): this {
    this.identity();
    const e = this.elements;
    e[0] = x;
    e[5] = y;
    e[10] = z;
    return this;
  }

  public transformVector3(v: Vector3): Vector3 {
    const e = this.elements;
    const x = e[0] * v.x + e[4] * v.y + e[8] * v.z + e[12];
    const y = e[1] * v.x + e[5] * v.y + e[9] * v.z + e[13];
    const z = e[2] * v.x + e[6] * v.y + e[10] * v.z + e[14];
    const w = e[3] * v.x + e[7] * v.y + e[11] * v.z + e[15];

    if (w !== 1 && w !== 0) {
      return new Vector3(x / w, y / w, z / w);
    }
    return new Vector3(x, y, z);
  }
}
