/**
 * @file Flowfield2D.ts
 * @description Vector Flowfield pathfinder computing integration distance fields and directional flow vectors for 1000+ units.
 */

import { Vector2 } from '../core/math/Vector2.ts';

export class Flowfield2D {
  public width: number;
  public height: number;
  public costField: Uint8Array; // 1 = normal, 255 = unwalkable wall
  public integrationField: Uint16Array;
  public flowVectors: Float32Array; // 2 floats (dx, dy) per cell

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.costField = new Uint8Array(width * height).fill(1);
    this.integrationField = new Uint16Array(width * height).fill(65535);
    this.flowVectors = new Float32Array(width * height * 2);
  }

  public setObstacle(x: number, y: number, isObstacle: boolean): void {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
    this.costField[y * this.width + x] = isObstacle ? 255 : 1;
  }

  public generate(targetX: number, targetY: number): void {
    if (targetX < 0 || targetX >= this.width || targetY < 0 || targetY >= this.height) return;

    // 1. Reset integration field
    this.integrationField.fill(65535);
    const targetIdx = targetY * this.width + targetX;
    this.integrationField[targetIdx] = 0;

    // 2. Wavefront BFS Dijkstra integration
    const queue: [number, number][] = [[targetX, targetY]];
    const dirs = [
      { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 },
      { x: 1, y: -1 }, { x: 1, y: 1 }, { x: -1, y: 1 }, { x: -1, y: -1 }
    ];

    while (queue.length > 0) {
      const [cx, cy] = queue.shift()!;
      const currentCost = this.integrationField[cy * this.width + cx];

      for (let i = 0; i < dirs.length; i++) {
        const nx = cx + dirs[i].x;
        const ny = cy + dirs[i].y;
        if (nx < 0 || nx >= this.width || ny < 0 || ny >= this.height) continue;

        const cellCost = this.costField[ny * this.width + nx];
        if (cellCost === 255) continue; // Blocked wall

        const moveWeight = dirs[i].x !== 0 && dirs[i].y !== 0 ? 14 : 10;
        const newCost = currentCost + cellCost * moveWeight;

        const nIdx = ny * this.width + nx;
        if (newCost < this.integrationField[nIdx]) {
          this.integrationField[nIdx] = newCost;
          queue.push([nx, ny]);
        }
      }
    }

    // 3. Compute vector gradients
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = y * this.width + x;
        if (this.costField[idx] === 255) {
          this.flowVectors[idx * 2 + 0] = 0;
          this.flowVectors[idx * 2 + 1] = 0;
          continue;
        }

        let lowestCost = this.integrationField[idx];
        let bestDir = new Vector2(0, 0);

        for (let i = 0; i < dirs.length; i++) {
          const nx = x + dirs[i].x;
          const ny = y + dirs[i].y;
          if (nx < 0 || nx >= this.width || ny < 0 || ny >= this.height) continue;

          const neighborCost = this.integrationField[ny * this.width + nx];
          if (neighborCost < lowestCost) {
            lowestCost = neighborCost;
            bestDir.set(dirs[i].x, dirs[i].y);
          }
        }

        bestDir.normalizeSelf();
        this.flowVectors[idx * 2 + 0] = bestDir.x;
        this.flowVectors[idx * 2 + 1] = bestDir.y;
      }
    }
  }

  public getFlowVector(worldX: number, worldY: number, out = new Vector2()): Vector2 {
    const gx = Math.floor(worldX);
    const gy = Math.floor(worldY);
    if (gx < 0 || gx >= this.width || gy < 0 || gy >= this.height) {
      return out.set(0, 0);
    }
    const idx = (gy * this.width + gx) * 2;
    return out.set(this.flowVectors[idx], this.flowVectors[idx + 1]);
  }
}
