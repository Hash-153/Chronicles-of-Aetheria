/**
 * @file Vector3.ts
 * @description 3D Vector mathematical implementation for spatial coordinates, lighting, and isometric calculations.
 */

export class Vector3 {
  public x: number;
  public y: number;
  public z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public static get ZERO(): Vector3 {
    return new Vector3(0, 0, 0);
  }

  public static get ONE(): Vector3 {
    return new Vector3(1, 1, 1);
  }

  public static get UP(): Vector3 {
    return new Vector3(0, 1, 0);
  }

  public static get FORWARD(): Vector3 {
    return new Vector3(0, 0, 1);
  }

  public static get RIGHT(): Vector3 {
    return new Vector3(1, 0, 0);
  }

  public set(x: number, y: number, z: number): this {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  public copy(other: Vector3): this {
    this.x = other.x;
    this.y = other.y;
    this.z = other.z;
    return this;
  }

  public clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  public add(other: Vector3): Vector3 {
    return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  public addSelf(other: Vector3): this {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
    return this;
  }

  public subtract(other: Vector3): Vector3 {
    return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  public subtractSelf(other: Vector3): this {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
    return this;
  }

  public scale(scalar: number): Vector3 {
    return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  public scaleSelf(scalar: number): this {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }

  public multiply(other: Vector3): Vector3 {
    return new Vector3(this.x * other.x, this.y * other.y, this.z * other.z);
  }

  public multiplySelf(other: Vector3): this {
    this.x *= other.x;
    this.y *= other.y;
    this.z *= other.z;
    return this;
  }

  public dot(other: Vector3): number {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  public cross(other: Vector3): Vector3 {
    return new Vector3(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    );
  }

  public crossSelf(other: Vector3): this {
    const cx = this.y * other.z - this.z * other.y;
    const cy = this.z * other.x - this.x * other.z;
    const cz = this.x * other.y - this.y * other.x;
    this.x = cx;
    this.y = cy;
    this.z = cz;
    return this;
  }

  public lengthSquared(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  public length(): number {
    return Math.sqrt(this.lengthSquared());
  }

  public normalize(): Vector3 {
    const len = this.length();
    if (len === 0) return new Vector3(0, 0, 0);
    const inv = 1 / len;
    return new Vector3(this.x * inv, this.y * inv, this.z * inv);
  }

  public normalizeSelf(): this {
    const len = this.length();
    if (len === 0) return this;
    const inv = 1 / len;
    this.x *= inv;
    this.y *= inv;
    this.z *= inv;
    return this;
  }

  public distanceTo(other: Vector3): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const dz = this.z - other.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  public lerp(target: Vector3, alpha: number): Vector3 {
    return new Vector3(
      this.x + (target.x - this.x) * alpha,
      this.y + (target.y - this.y) * alpha,
      this.z + (target.z - this.z) * alpha
    );
  }

  public lerpSelf(target: Vector3, alpha: number): this {
    this.x += (target.x - this.x) * alpha;
    this.y += (target.y - this.y) * alpha;
    this.z += (target.z - this.z) * alpha;
    return this;
  }

  public equals(other: Vector3, tolerance = 1e-6): boolean {
    return (
      Math.abs(this.x - other.x) <= tolerance &&
      Math.abs(this.y - other.y) <= tolerance &&
      Math.abs(this.z - other.z) <= tolerance
    );
  }

  public toArray(): [number, number, number] {
    return [this.x, this.y, this.z];
  }
}
