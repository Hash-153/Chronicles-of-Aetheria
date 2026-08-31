/**
 * @file FixedPointMath.ts
 * @description Q16.16 Deterministic Fixed-Point Arithmetic for multiplayer lockstep replication and anti-desync.
 */

export class Fixed32 {
  public raw: number;
  public static readonly SHIFT = 16;
  public static readonly ONE = 1 << 16;
  public static readonly HALF = 1 << 15;
  public static readonly PI = 205887; // 3.14159 * 65536
  public static readonly TWO_PI = 411774;

  constructor(raw = 0) {
    this.raw = raw | 0;
  }

  public static fromNumber(value: number): Fixed32 {
    return new Fixed32(Math.round(value * Fixed32.ONE));
  }

  public static fromInt(value: number): Fixed32 {
    return new Fixed32(value << Fixed32.SHIFT);
  }

  public toNumber(): number {
    return this.raw / Fixed32.ONE;
  }

  public toInt(): number {
    return this.raw >> Fixed32.SHIFT;
  }

  public add(other: Fixed32): Fixed32 {
    return new Fixed32((this.raw + other.raw) | 0);
  }

  public subtract(other: Fixed32): Fixed32 {
    return new Fixed32((this.raw - other.raw) | 0);
  }

  public multiply(other: Fixed32): Fixed32 {
    const product = BigInt(this.raw) * BigInt(other.raw);
    return new Fixed32(Number(product >> 16n) | 0);
  }

  public divide(other: Fixed32): Fixed32 {
    if (other.raw === 0) return new Fixed32(0);
    const dividend = BigInt(this.raw) << 16n;
    return new Fixed32(Number(dividend / BigInt(other.raw)) | 0);
  }

  public sqrt(): Fixed32 {
    if (this.raw <= 0) return new Fixed32(0);
    let val = this.raw;
    let res = 0;
    let bit = 1 << 30;

    while (bit > val) {
      bit >>= 2;
    }

    while (bit !== 0) {
      if (val >= res + bit) {
        val -= res + bit;
        res = (res >> 1) + bit;
      } else {
        res >>= 1;
      }
      bit >>= 2;
    }

    return new Fixed32(res << 8);
  }
}
