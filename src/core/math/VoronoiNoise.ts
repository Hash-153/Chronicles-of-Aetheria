/**
 * @file VoronoiNoise.ts
 * @description Worley / Cellular Voronoi noise generating procedural biome boundaries, crystalline textures, and stone patterns.
 */

import { Vector2 } from './Vector2.ts';

export interface VoronoiResult {
  f1: number; // Distance to closest feature point
  f2: number; // Distance to second closest point
  cellId: number;
  featurePoint: Vector2;
}

export class VoronoiNoise {
  private _seed: number;

  constructor(seed = 1337) {
    this._seed = seed;
  }

  private _hash2D(x: number, y: number): Vector2 {
    let n = (x * 374761393 + y * 668265263 + this._seed) | 0;
    n = (n ^ (n >> 13)) * 1274126177;
    const h1 = (n ^ (n >> 16)) & 0xffff;
    const h2 = (n ^ (n >> 8)) & 0xffff;
    return new Vector2(h1 / 65535, h2 / 65535);
  }

  public sample(x: number, y: number): VoronoiResult {
    const ix = Math.floor(x);
    const iy = Math.floor(y);

    let minF1 = Infinity;
    let minF2 = Infinity;
    let bestCellId = 0;
    let bestPoint = new Vector2();

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const cx = ix + dx;
        const cy = iy + dy;
        const offset = this._hash2D(cx, cy);
        const ptX = cx + offset.x;
        const ptY = cy + offset.y;

        const distX = ptX - x;
        const distY = ptY - y;
        const distSq = distX * distX + distY * distY;

        if (distSq < minF1) {
          minF2 = minF1;
          minF1 = distSq;
          bestCellId = (cx * 73856093) ^ (cy * 19349663);
          bestPoint.set(ptX, ptY);
        } else if (distSq < minF2) {
          minF2 = distSq;
        }
      }
    }

    return {
      f1: Math.sqrt(minF1),
      f2: Math.sqrt(minF2),
      cellId: bestCellId,
      featurePoint: bestPoint,
    };
  }
}
