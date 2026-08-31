/**
 * @file TownGenerator.ts
 * @description Procedural medieval settlement generator with road networks, market plazas, and building footprints.
 */

import { Vector2 } from '../core/math/Vector2.ts';

export interface BuildingLot {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'blacksmith' | 'tavern' | 'shop' | 'house' | 'church';
}

export class TownGenerator {
  public width: number;
  public height: number;
  public buildings: BuildingLot[] = [];

  constructor(width = 60, height = 60) {
    this.width = width;
    this.height = height;
  }

  public generate(): Uint8Array {
    const grid = new Uint8Array(this.width * this.height).fill(0); // 0 = grass, 1 = road, 2 = building
    this.buildings = [];

    const centerX = Math.floor(this.width / 2);
    const centerY = Math.floor(this.height / 2);

    // 1. Carve central square
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        grid[(centerY + dy) * this.width + (centerX + dx)] = 1;
      }
    }

    // 2. Main Roads
    for (let x = 0; x < this.width; x++) {
      grid[centerY * this.width + x] = 1;
      grid[(centerY + 1) * this.width + x] = 1;
    }
    for (let y = 0; y < this.height; y++) {
      grid[y * this.width + centerX] = 1;
      grid[y * this.width + (centerX + 1)] = 1;
    }

    // 3. Place key buildings around the square
    const types: ('blacksmith' | 'tavern' | 'shop' | 'church')[] = ['blacksmith', 'tavern', 'shop', 'church'];
    const offsets = [[-8, -8], [6, -8], [-8, 6], [6, 6]];

    for (let i = 0; i < 4; i++) {
      const bx = centerX + offsets[i][0];
      const by = centerY + offsets[i][1];
      const bw = 6;
      const bh = 6;

      this.buildings.push({
        x: bx,
        y: by,
        width: bw,
        height: bh,
        type: types[i],
      });

      for (let y = by; y < by + bh; y++) {
        for (let x = bx; x < bx + bw; x++) {
          grid[y * this.width + x] = 2;
        }
      }
    }

    return grid;
  }
}
