/**
 * @file Quaternion.ts
 * @description 3D Quaternion orientation and SLERP calculations.
 */

import { Vector3 } from './Vector3.ts';

export class Quaternion {
  public x: number;
  public y: number;
  public z: number;
  public w: number;

  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  public identity(): this {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 1;
    return this;
  }

  public copy(other: Quaternion): this {
    this.x = other.x;
    this.y = other.y;
    this.z = other.z;
    this.w = other.w;
    return this;
  }

  public clone(): Quaternion {
    return new Quaternion(this.x, this.y, this.z, this.w);
  }

  public static fromAxisAngle(axis: Vector3, radians: number): Quaternion {
    const half = radians * 0.5;
    const s = Math.sin(half);
    const norm = axis.clone().normalize();
    return new Quaternion(norm.x * s, norm.y * s, norm.z * s, Math.cos(half));
  }

  public static fromEuler(xRad: number, yRad: number, zRad: number): Quaternion {
    const c1 = Math.cos(xRad / 2);
    const c2 = Math.cos(yRad / 2);
    const c3 = Math.cos(zRad / 2);
    const s1 = Math.sin(xRad / 2);
    const s2 = Math.sin(yRad / 2);
    const s3 = Math.sin(zRad / 2);

    return new Quaternion(
      s1 * c2 * c3 + c1 * s2 * s3,
      c1 * s2 * c3 - s1 * c2 * s3,
      c1 * c2 * s3 + s1 * s2 * c3,
      c1 * c2 * c3 - s1 * s2 * s3
    );
  }

  public multiply(other: Quaternion): Quaternion {
    return new Quaternion(
      this.x * other.w + this.w * other.x + this.y * other.z - this.z * other.y,
      this.y * other.w + this.w * other.y + this.z * other.x - this.x * other.z,
      this.z * other.w + this.w * other.z + this.x * other.y - this.y * other.x,
      this.w * other.w - this.x * other.x - this.y * other.y - this.z * other.z
    );
  }

  public normalize(): this {
    let l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    if (l === 0) {
      this.identity();
    } else {
      l = 1 / l;
      this.x *= l;
      this.y *= l;
      this.z *= l;
      this.w *= l;
    }
    return this;
  }

  public slerp(target: Quaternion, t: number): Quaternion {
    let cosHalfTheta = this.x * target.x + this.y * target.y + this.z * target.z + this.w * target.w;
    let targetCopy = target.clone();

    if (cosHalfTheta < 0) {
      targetCopy = new Quaternion(-target.x, -target.y, -target.z, -target.w);
      cosHalfTheta = -cosHalfTheta;
    }

    if (cosHalfTheta >= 1.0) {
      return this.clone();
    }

    const halfTheta = Math.acos(cosHalfTheta);
    const sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

    if (Math.abs(sinHalfTheta) < 0.001) {
      return new Quaternion(
        this.x * 0.5 + targetCopy.x * 0.5,
        this.y * 0.5 + targetCopy.y * 0.5,
        this.z * 0.5 + targetCopy.z * 0.5,
        this.w * 0.5 + targetCopy.w * 0.5
      ).normalize();
    }

    const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
    const ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

    return new Quaternion(
      this.x * ratioA + targetCopy.x * ratioB,
      this.y * ratioA + targetCopy.y * ratioB,
      this.z * ratioA + targetCopy.z * ratioB,
      this.w * ratioA + targetCopy.w * ratioB
    );
  }
}
