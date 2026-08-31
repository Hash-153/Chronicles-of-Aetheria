/**
 * @file CellularAutomata.ts
 * @description Cellular Automata cave generator with smooth iterations, wall filling, and flood-fill flood reachability verification.
 */

export class CellularAutomata {
  public width: number;
  public height: number;
  public grid: Uint8Array; // 0 = floor, 1 = wall

  constructor(width = 64, height = 64) {
    this.width = width;
    this.height = height;
    this.grid = new Uint8Array(width * height);
  }

  public generate(fillProbability = 0.45, iterations = 5): void {
    // 1. Random initial seeding
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = Math.random() < fillProbability ? 1 : 0;
    }

    // Always keep boundaries solid
    for (let x = 0; x < this.width; x++) {
      this.grid[0 * this.width + x] = 1;
      this.grid[(this.height - 1) * this.width + x] = 1;
    }
    for (let y = 0; y < this.height; y++) {
      this.grid[y * this.width + 0] = 1;
      this.grid[y * this.width + (this.width - 1)] = 1;
    }

    // 2. Cellular automata rule steps (4-5 rule)
    const buffer = new Uint8Array(this.width * this.height);

    for (let iter = 0; iter < iterations; iter++) {
      for (let y = 1; y < this.height - 1; y++) {
        for (let x = 1; x < this.width - 1; x++) {
          const wallCount = this._countSurroundingWalls(x, y);
          const idx = y * this.width + x;

          if (wallCount > 4) {
            buffer[idx] = 1;
          } else if (wallCount < 4) {
            buffer[idx] = 0;
          } else {
            buffer[idx] = this.grid[idx];
          }
        }
      }
      this.grid.set(buffer);
    }
  }

  public ensureConnectivity(): void {
    // Flood fill largest cavern and carve tunnels to isolated pockets
    const visited = new Uint8Array(this.width * this.height);
    const caverns: [number, number][][] = [];

    for (let y = 1; y < this.height - 1; y++) {
      for (let x = 1; x < this.width - 1; x++) {
        const idx = y * this.width + x;
        if (this.grid[idx] === 0 && visited[idx] === 0) {
          const cavern = this._floodFill(x, y, visited);
          caverns.push(cavern);
        }
      }
    }

    if (caverns.length <= 1) return;

    // Connect smaller caverns to the largest one
    caverns.sort((a, b) => b.length - a.length);
    const mainCavern = caverns[0];

    for (let i = 1; i < caverns.length; i++) {
      const smaller = caverns[i];
      const p1 = smaller[0];
      const p2 = mainCavern[0];
      this._carveTunnel(p1[0], p1[1], p2[0], p2[1]);
    }
  }

  private _countSurroundingWalls(cx: number, cy: number): number {
    let count = 0;
    for (let y = cy - 1; y <= cy + 1; y++) {
      for (let x = cx - 1; x <= cx + 1; x++) {
        if (x === cx && y === cy) continue;
        if (x < 0 || x >= this.width || y < 0 || y >= this.height || this.grid[y * this.width + x] === 1) {
          count++;
        }
      }
    }
    return count;
  }

  private _floodFill(startX: number, startY: number, visited: Uint8Array): [number, number][] {
    const cavern: [number, number][] = [];
    const queue: [number, number][] = [[startX, startY]];
    visited[startY * this.width + startX] = 1;

    while (queue.length > 0) {
      const [cx, cy] = queue.shift()!;
      cavern.push([cx, cy]);

      const neighbors = [
        [cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]
      ];

      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
          const idx = ny * this.width + nx;
          if (this.grid[idx] === 0 && visited[idx] === 0) {
            visited[idx] = 1;
            queue.push([nx, ny]);
          }
        }
      }
    }

    return cavern;
  }

  private _carveTunnel(x1: number, y1: number, x2: number, y2: number): void {
    let cx = x1;
    let cy = y1;

    while (cx !== x2) {
      this.grid[cy * this.width + cx] = 0;
      cx += cx < x2 ? 1 : -1;
    }
    while (cy !== y2) {
      this.grid[cy * this.width + cx] = 0;
      cy += cy < y2 ? 1 : -1;
    }
  }
}
