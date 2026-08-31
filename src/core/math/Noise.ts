/**
 * @file Noise.ts
 * @description Coherent Perlin and Simplex noise algorithms with fractal brownian motion (fBm), octaves, and turbulence.
 */

export class Noise {
  private p: Uint8Array;
  private perm: Uint8Array;

  constructor(seed = 1337) {
    this.p = new Uint8Array(256);
    this.perm = new Uint8Array(512);
    this.reseed(seed);
  }

  public reseed(seed: number): void {
    for (let i = 0; i < 256; i++) {
      this.p[i] = i;
    }

    // Seeded Fisher-Yates shuffle
    let s = seed;
    for (let i = 255; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      const j = Math.floor((s / 233280) * (i + 1));
      const tmp = this.p[i];
      this.p[i] = this.p[j];
      this.p[j] = tmp;
    }

    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
    }
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private grad(hash: number, x: number, y: number): number {
    const h = hash & 7;
    const u = h < 4 ? x : y;
    const v = h < 4 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  public perlin2D(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;

    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);

    const u = this.fade(xf);
    const v = this.fade(yf);

    const p = this.perm;
    const aa = p[p[X] + Y];
    const ab = p[p[X] + Y + 1];
    const ba = p[p[X + 1] + Y];
    const bb = p[p[X + 1] + Y + 1];

    const gAA = this.grad(aa, xf, yf);
    const gBA = this.grad(ba, xf - 1, yf);
    const gAB = this.grad(ab, xf, yf - 1);
    const gBB = this.grad(bb, xf - 1, yf - 1);

    const lerpX1 = gAA + u * (gBA - gAA);
    const lerpX2 = gAB + u * (gBB - gAB);

    return lerpX1 + v * (lerpX2 - lerpX1);
  }

  public fractalNoise2D(
    x: number,
    y: number,
    octaves = 4,
    lacunarity = 2.0,
    persistence = 0.5
  ): number {
    let total = 0;
    let frequency = 1.0;
    let amplitude = 1.0;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      total += this.perlin2D(x * frequency, y * frequency) * amplitude;
      maxValue += amplitude;
      amplitude *= persistence;
      frequency *= lacunarity;
    }

    return total / maxValue;
  }

  public turbulence2D(
    x: number,
    y: number,
    octaves = 4,
    lacunarity = 2.0,
    persistence = 0.5
  ): number {
    let total = 0;
    let frequency = 1.0;
    let amplitude = 1.0;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      total += Math.abs(this.perlin2D(x * frequency, y * frequency)) * amplitude;
      maxValue += amplitude;
      amplitude *= persistence;
      frequency *= lacunarity;
    }

    return total / maxValue;
  }
}
