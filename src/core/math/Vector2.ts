/**
 * @file Vector2.ts
 * @description High-performance 2D vector mathematics with immutable and in-place mutation methods.
 */

export class Vector2 {
  public x: number;
  public y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public static get ZERO(): Vector2 {
    return new Vector2(0, 0);
  }

  public static get ONE(): Vector2 {
    return new Vector2(1, 1);
  }

  public static get UP(): Vector2 {
    return new Vector2(0, -1);
  }

  public static get DOWN(): Vector2 {
    return new Vector2(0, 1);
  }

  public static get LEFT(): Vector2 {
    return new Vector2(-1, 0);
  }

  public static get RIGHT(): Vector2 {
    return new Vector2(1, 0);
  }

  public set(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  public copy(other: Vector2): this {
    this.x = other.x;
    this.y = other.y;
    return this;
  }

  public clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  public add(other: Vector2): Vector2 {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  public addSelf(other: Vector2): this {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  public addScalar(scalar: number): Vector2 {
    return new Vector2(this.x + scalar, this.y + scalar);
  }

  public addScalarSelf(scalar: number): this {
    this.x += scalar;
    this.y += scalar;
    return this;
  }

  public subtract(other: Vector2): Vector2 {
    return new Vector2(this.x - other.x, this.y - other.y);
  }

  public subtractSelf(other: Vector2): this {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  public multiply(other: Vector2): Vector2 {
    return new Vector2(this.x * other.x, this.y * other.y);
  }

  public multiplySelf(other: Vector2): this {
    this.x *= other.x;
    this.y *= other.y;
    return this;
  }

  public scale(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  public scaleSelf(scalar: number): this {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  public divide(other: Vector2): Vector2 {
    return new Vector2(
      other.x !== 0 ? this.x / other.x : 0,
      other.y !== 0 ? this.y / other.y : 0
    );
  }

  public divideSelf(other: Vector2): this {
    this.x = other.x !== 0 ? this.x / other.x : 0;
    this.y = other.y !== 0 ? this.y / other.y : 0;
    return this;
  }

  public divideScalar(scalar: number): Vector2 {
    if (scalar === 0) return new Vector2(0, 0);
    const inv = 1 / scalar;
    return new Vector2(this.x * inv, this.y * inv);
  }

  public divideScalarSelf(scalar: number): this {
    if (scalar === 0) {
      this.x = 0;
      this.y = 0;
      return this;
    }
    const inv = 1 / scalar;
    this.x *= inv;
    this.y *= inv;
    return this;
  }

  public dot(other: Vector2): number {
    return this.x * other.x + this.y * other.y;
  }

  public cross(other: Vector2): number {
    return this.x * other.y - this.y * other.x;
  }

  public lengthSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public normalize(): Vector2 {
    const len = this.length();
    if (len === 0) return new Vector2(0, 0);
    const inv = 1 / len;
    return new Vector2(this.x * inv, this.y * inv);
  }

  public normalizeSelf(): this {
    const len = this.length();
    if (len === 0) {
      this.x = 0;
      this.y = 0;
      return this;
    }
    const inv = 1 / len;
    this.x *= inv;
    this.y *= inv;
    return this;
  }

  public distanceTo(other: Vector2): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public distanceToSquared(other: Vector2): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return dx * dx + dy * dy;
  }

  public angle(): number {
    return Math.atan2(this.y, this.x);
  }

  public angleTo(other: Vector2): number {
    return Math.atan2(this.cross(other), this.dot(other));
  }

  public rotate(radians: number): Vector2 {
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    return new Vector2(
      this.x * cos - this.y * sin,
      this.x * sin + this.y * cos
    );
  }

  public rotateSelf(radians: number): this {
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const rx = this.x * cos - this.y * sin;
    const ry = this.x * sin + this.y * cos;
    this.x = rx;
    this.y = ry;
    return this;
  }

  public rotateAround(center: Vector2, radians: number): Vector2 {
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const dx = this.x - center.x;
    const dy = this.y - center.y;
    return new Vector2(
      center.x + (dx * cos - dy * sin),
      center.y + (dx * sin + dy * cos)
    );
  }

  public lerp(target: Vector2, alpha: number): Vector2 {
    return new Vector2(
      this.x + (target.x - this.x) * alpha,
      this.y + (target.y - this.y) * alpha
    );
  }

  public lerpSelf(target: Vector2, alpha: number): this {
    this.x += (target.x - this.x) * alpha;
    this.y += (target.y - this.y) * alpha;
    return this;
  }

  public reflect(normal: Vector2): Vector2 {
    const d = 2 * this.dot(normal);
    return new Vector2(this.x - d * normal.x, this.y - d * normal.y);
  }

  public project(onto: Vector2): Vector2 {
    const d = onto.lengthSquared();
    if (d === 0) return new Vector2(0, 0);
    const scalar = this.dot(onto) / d;
    return onto.scale(scalar);
  }

  public perpendicular(): Vector2 {
    return new Vector2(-this.y, this.x);
  }

  public clampLength(minLength: number, maxLength: number): this {
    const lenSq = this.lengthSquared();
    if (lenSq === 0) return this;
    const len = Math.sqrt(lenSq);
    if (len < minLength) {
      this.scaleSelf(minLength / len);
    } else if (len > maxLength) {
      this.scaleSelf(maxLength / len);
    }
    return this;
  }

  public equals(other: Vector2, tolerance = 1e-6): boolean {
    return (
      Math.abs(this.x - other.x) <= tolerance &&
      Math.abs(this.y - other.y) <= tolerance
    );
  }

  public toArray(): [number, number] {
    return [this.x, this.y];
  }

  public toString(precision = 2): string {
    return `(${this.x.toFixed(precision)}, ${this.y.toFixed(precision)})`;
  }
}
