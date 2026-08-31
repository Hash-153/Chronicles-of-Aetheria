/**
 * @file Color.ts
 * @description RGBA Color representation with hex parsing, linear interpolation, HSV/HSL conversion, and pack/unpack utilities.
 */

import { MathUtils } from './MathUtils.ts';

export class Color {
  public r: number;
  public g: number;
  public b: number;
  public a: number;

  constructor(r = 1, g = 1, b = 1, a = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  public static readonly WHITE = new Color(1, 1, 1, 1);
  public static readonly BLACK = new Color(0, 0, 0, 1);
  public static readonly RED = new Color(1, 0, 0, 1);
  public static readonly GREEN = new Color(0, 1, 0, 1);
  public static readonly BLUE = new Color(0, 0, 1, 1);
  public static readonly YELLOW = new Color(1, 1, 0, 1);
  public static readonly CYAN = new Color(0, 1, 1, 1);
  public static readonly MAGENTA = new Color(1, 0, 1, 1);
  public static readonly TRANSPARENT = new Color(0, 0, 0, 0);

  public static fromHex(hex: string): Color {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('') + 'ff';
    } else if (cleanHex.length === 6) {
      cleanHex += 'ff';
    }

    const num = parseInt(cleanHex, 16);
    const r = ((num >> 24) & 255) / 255;
    const g = ((num >> 16) & 255) / 255;
    const b = ((num >> 8) & 255) / 255;
    const a = (num & 255) / 255;

    return new Color(r, g, b, a);
  }

  public static fromHSL(h: number, s: number, l: number, a = 1): Color {
    h = MathUtils.repeat(h, 360) / 360;
    s = MathUtils.clamp01(s);
    l = MathUtils.clamp01(l);

    if (s === 0) {
      return new Color(l, l, l, a);
    }

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const r = hue2rgb(p, q, h + 1 / 3);
    const g = hue2rgb(p, q, h);
    const b = hue2rgb(p, q, h - 1 / 3);

    return new Color(r, g, b, a);
  }

  public set(r: number, g: number, b: number, a = 1): this {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    return this;
  }

  public copy(other: Color): this {
    this.r = other.r;
    this.g = other.g;
    this.b = other.b;
    this.a = other.a;
    return this;
  }

  public clone(): Color {
    return new Color(this.r, this.g, this.b, this.a);
  }

  public lerp(target: Color, t: number): Color {
    return new Color(
      MathUtils.lerp(this.r, target.r, t),
      MathUtils.lerp(this.g, target.g, t),
      MathUtils.lerp(this.b, target.b, t),
      MathUtils.lerp(this.a, target.a, t)
    );
  }

  public lerpSelf(target: Color, t: number): this {
    this.r = MathUtils.lerp(this.r, target.r, t);
    this.g = MathUtils.lerp(this.g, target.g, t);
    this.b = MathUtils.lerp(this.b, target.b, t);
    this.a = MathUtils.lerp(this.a, target.a, t);
    return this;
  }

  public toRGBA(): string {
    const ir = Math.round(MathUtils.clamp01(this.r) * 255);
    const ig = Math.round(MathUtils.clamp01(this.g) * 255);
    const ib = Math.round(MathUtils.clamp01(this.b) * 255);
    const fa = MathUtils.clamp01(this.a);
    return `rgba(${ir},${ig},${ib},${fa})`;
  }

  public toRgbaString(): string {
    return this.toRGBA();
  }

  public toHex(): string {
    const ir = Math.round(MathUtils.clamp01(this.r) * 255).toString(16).padStart(2, '0');
    const ig = Math.round(MathUtils.clamp01(this.g) * 255).toString(16).padStart(2, '0');
    const ib = Math.round(MathUtils.clamp01(this.b) * 255).toString(16).padStart(2, '0');
    return `#${ir}${ig}${ib}`;
  }

  public packRGBA(): number {
    const ir = Math.round(MathUtils.clamp01(this.r) * 255);
    const ig = Math.round(MathUtils.clamp01(this.g) * 255);
    const ib = Math.round(MathUtils.clamp01(this.b) * 255);
    const ia = Math.round(MathUtils.clamp01(this.a) * 255);
    return ((ia << 24) | (ib << 16) | (ig << 8) | ir) >>> 0;
  }

  public toFloat32Array(): Float32Array {
    return new Float32Array([this.r, this.g, this.b, this.a]);
  }
}
