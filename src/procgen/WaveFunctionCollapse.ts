/**
 * @file WaveFunctionCollapse.ts
 * @description 2D Overlapping Model Wave Function Collapse (WFC) with lowest-entropy selection and constraint propagation.
 */

export interface WFCTile {
  id: number;
  weight: number;
  upSockets: number[];
  downSockets: number[];
  leftSockets: number[];
  rightSockets: number[];
}

export class WaveFunctionCollapse {
  public width: number;
  public height: number;
  public tiles: WFCTile[];
  public wave: Set<number>[]; // Set of possible tile IDs per cell
  public collapsed: Int32Array;

  constructor(width = 32, height = 32, tiles: WFCTile[] = []) {
    this.width = width;
    this.height = height;
    this.tiles = tiles;
    this.wave = new Array(width * height);
    this.collapsed = new Int32Array(width * height).fill(-1);

    this.reset();
  }

  public reset(): void {
    const allIds = new Set(this.tiles.map(t => t.id));
    for (let i = 0; i < this.width * this.height; i++) {
      this.wave[i] = new Set(allIds);
      this.collapsed[i] = -1;
    }
  }

  public solve(maxSteps = 5000): boolean {
    let step = 0;
    while (step < maxSteps) {
      step++;
      const lowestIdx = this._findLowestEntropyCell();
      if (lowestIdx === -1) {
        return true; // All cells collapsed!
      }

      const cellPossibilities = Array.from(this.wave[lowestIdx]);
      if (cellPossibilities.length === 0) {
        return false; // Contradiction encountered
      }

      // Collapse cell by choosing weighted random tile
      const chosenTileId = cellPossibilities[Math.floor(Math.random() * cellPossibilities.length)];
      this.wave[lowestIdx] = new Set([chosenTileId]);
      this.collapsed[lowestIdx] = chosenTileId;

      // Propagate constraints
      this._propagate(lowestIdx);
    }
    return false;
  }

  private _findLowestEntropyCell(): number {
    let lowestEntropy = Infinity;
    let lowestIdx = -1;

    for (let i = 0; i < this.wave.length; i++) {
      if (this.collapsed[i] !== -1) continue;

      const count = this.wave[i].size;
      if (count === 1) {
        this.collapsed[i] = Array.from(this.wave[i])[0];
        continue;
      }

      if (count < lowestEntropy) {
        lowestEntropy = count;
        lowestIdx = i;
      }
    }

    return lowestIdx;
  }

  private _propagate(startIdx: number): void {
    const stack = [startIdx];

    while (stack.length > 0) {
      const idx = stack.pop()!;
      const cx = idx % this.width;
      const cy = Math.floor(idx / this.width);

      const neighbors = [
        { x: cx, y: cy - 1, dir: 'up' },
        { x: cx, y: cy + 1, dir: 'down' },
        { x: cx - 1, y: cy, dir: 'left' },
        { x: cx + 1, y: cy, dir: 'right' },
      ];

      for (let n = 0; n < neighbors.length; n++) {
        const { x, y, dir } = neighbors[n];
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) continue;

        const nIdx = y * this.width + x;
        if (this.collapsed[nIdx] !== -1) continue;

        const originalSize = this.wave[nIdx].size;
        this._filterPossibilities(nIdx, idx, dir);

        if (this.wave[nIdx].size < originalSize) {
          stack.push(nIdx);
        }
      }
    }
  }

  private _filterPossibilities(targetIdx: number, sourceIdx: number, dir: string): void {
    const sourcePossible = this.wave[sourceIdx];
    const targetPossible = this.wave[targetIdx];

    for (const targetTileId of targetPossible) {
      const targetTile = this.tiles.find(t => t.id === targetTileId);
      if (!targetTile) continue;

      let compatible = false;
      for (const sourceTileId of sourcePossible) {
        const sourceTile = this.tiles.find(t => t.id === sourceTileId);
        if (!sourceTile) continue;

        if (dir === 'up' && this._matchesSockets(sourceTile.upSockets, targetTile.downSockets)) compatible = true;
        if (dir === 'down' && this._matchesSockets(sourceTile.downSockets, targetTile.upSockets)) compatible = true;
        if (dir === 'left' && this._matchesSockets(sourceTile.leftSockets, targetTile.rightSockets)) compatible = true;
        if (dir === 'right' && this._matchesSockets(sourceTile.rightSockets, targetTile.leftSockets)) compatible = true;
      }

      if (!compatible) {
        targetPossible.delete(targetTileId);
      }
    }
  }

  private _matchesSockets(a: number[], b: number[]): boolean {
    return a.some(socket => b.includes(socket));
  }
}
