/**
 * @file MathUtils.ts
 * @description Core mathematical helper functions, interpolation curves, clamp, remap, and pseudo-random generators.
 */

export class MathUtils {
  public static readonly DEG2RAD = Math.PI / 180;
  public static readonly RAD2DEG = 180 / Math.PI;
  public static readonly EPSILON = 1e-6;
  public static readonly TWO_PI = Math.PI * 2;
  public static readonly HALF_PI = Math.PI * 0.5;

  public static clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  public static clamp01(value: number): number {
    return Math.max(0, Math.min(1, value));
  }

  public static lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
  }

  public static inverseLerp(start: number, end: number, value: number): number {
    if (Math.abs(end - start) < this.EPSILON) return 0;
    return (value - start) / (end - start);
  }

  public static remap(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ): number {
    const t = this.inverseLerp(inMin, inMax, value);
    return this.lerp(outMin, outMax, t);
  }

  public static smoothstep(min: number, max: number, value: number): number {
    const x = this.clamp01((value - min) / (max - min));
    return x * x * (3 - 2 * x);
  }

  public static smootherstep(min: number, max: number, value: number): number {
    const x = this.clamp01((value - min) / (max - min));
    return x * x * x * (x * (x * 6 - 15) + 10);
  }

  public static damp(source: number, target: number, smoothing: number, dt: number): number {
    return this.lerp(source, target, 1 - Math.exp(-smoothing * dt));
  }

  public static moveTowards(current: number, target: number, maxDelta: number): number {
    if (Math.abs(target - current) <= maxDelta) {
      return target;
    }
    return current + Math.sign(target - current) * maxDelta;
  }

  public static moveTowardsAngle(current: number, target: number, maxDelta: number): number {
    const delta = this.deltaAngle(current, target);
    if (-maxDelta < delta && delta < maxDelta) {
      return target;
    }
    target = current + delta;
    return this.moveTowards(current, target, maxDelta);
  }

  public static deltaAngle(current: number, target: number): number {
    let delta = this.repeat(target - current, this.TWO_PI);
    if (delta > Math.PI) {
      delta -= this.TWO_PI;
    }
    return delta;
  }

  public static repeat(t: number, length: number): number {
    return this.clamp(t - Math.floor(t / length) * length, 0, length);
  }

  public static pingPong(t: number, length: number): number {
    t = this.repeat(t, length * 2);
    return length - Math.abs(t - length);
  }

  public static radToDeg(radians: number): number {
    return radians * this.RAD2DEG;
  }

  public static degToRad(degrees: number): number {
    return degrees * this.DEG2RAD;
  }

  public static approxEquals(a: number, b: number, tolerance = 1e-6): boolean {
    return Math.abs(a - b) <= tolerance;
  }

  /**
   * Fast seedable pseudo-random number generator (Mulberry32)
   */
  public static createRNG(seed: number): () => number {
    let s = seed | 0;
    return () => {
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
}
