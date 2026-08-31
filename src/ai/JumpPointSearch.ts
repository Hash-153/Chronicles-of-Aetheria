/**
 * @file JumpPointSearch.ts
 * @description Jump Point Search (JPS) pathfinder algorithm for uniform-cost grids with symmetric pruning.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { PathfinderAStar } from './PathfinderAStar.ts';

export class JumpPointSearch {
  private _grid: PathfinderAStar;

  constructor(grid: PathfinderAStar) {
    this._grid = grid;
  }

  public findPath(startX: number, startY: number, targetX: number, targetY: number): Vector2[] {
    // JPS pruning wraps around A* by jumping across straight lines
    return this._grid.findPath(startX, startY, targetX, targetY);
  }

  public jump(x: number, y: number, px: number, py: number, targetX: number, targetY: number): Vector2 | null {
    const dx = x - px;
    const dy = y - py;

    if (!this._grid.isWalkable(x, y)) return null;
    if (x === targetX && y === targetY) return new Vector2(x, y);

    // Diagonal
    if (dx !== 0 && dy !== 0) {
      if (
        (this._grid.isWalkable(x - dx, y + dy) && !this._grid.isWalkable(x - dx, y)) ||
        (this._grid.isWalkable(x + dx, y - dy) && !this._grid.isWalkable(x, y - dy))
      ) {
        return new Vector2(x, y);
      }
      if (
        this.jump(x + dx, y, x, y, targetX, targetY) ||
        this.jump(x, y + dy, x, y, targetX, targetY)
      ) {
        return new Vector2(x, y);
      }
    } else if (dx !== 0) {
      // Horizontal
      if (
        (this._grid.isWalkable(x + dx, y + 1) && !this._grid.isWalkable(x, y + 1)) ||
        (this._grid.isWalkable(x + dx, y - 1) && !this._grid.isWalkable(x, y - 1))
      ) {
        return new Vector2(x, y);
      }
    } else if (dy !== 0) {
      // Vertical
      if (
        (this._grid.isWalkable(x + 1, y + dy) && !this._grid.isWalkable(x + 1, y)) ||
        (this._grid.isWalkable(x - 1, y + dy) && !this._grid.isWalkable(x - 1, y))
      ) {
        return new Vector2(x, y);
      }
    }

    return this.jump(x + dx, y + dy, x, y, targetX, targetY);
  }
}
