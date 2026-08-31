/**
 * @file SpatialHashGrid.ts
 * @description 2D Spatial Hashing Grid for O(1) broadphase neighbor discovery, proximity lookups, and dynamic object clustering.
 */

import { Vector2 } from '../math/Vector2.ts';
import { AABB } from '../math/AABB.ts';

export class SpatialHashGrid<T> {
  private _cellSize: number;
  private _invCellSize: number;
  private _grid: Map<string, Set<T>>;
  private _objectBounds: Map<T, AABB>;

  constructor(cellSize = 64) {
    this._cellSize = cellSize;
    this._invCellSize = 1 / cellSize;
    this._grid = new Map();
    this._objectBounds = new Map();
  }

  public get cellSize(): number {
    return this._cellSize;
  }

  public insert(item: T, bounds: AABB): void {
    if (this._objectBounds.has(item)) {
      this.remove(item);
    }
    this._objectBounds.set(item, bounds.clone());

    const minX = Math.floor(bounds.min.x * this._invCellSize);
    const minY = Math.floor(bounds.min.y * this._invCellSize);
    const maxX = Math.floor(bounds.max.x * this._invCellSize);
    const maxY = Math.floor(bounds.max.y * this._invCellSize);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        const key = `${x}:${y}`;
        let cell = this._grid.get(key);
        if (!cell) {
          cell = new Set<T>();
          this._grid.set(key, cell);
        }
        cell.add(item);
      }
    }
  }

  public remove(item: T): boolean {
    const bounds = this._objectBounds.get(item);
    if (!bounds) return false;

    const minX = Math.floor(bounds.min.x * this._invCellSize);
    const minY = Math.floor(bounds.min.y * this._invCellSize);
    const maxX = Math.floor(bounds.max.x * this._invCellSize);
    const maxY = Math.floor(bounds.max.y * this._invCellSize);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        const key = `${x}:${y}`;
        const cell = this._grid.get(key);
        if (cell) {
          cell.delete(item);
          if (cell.size === 0) {
            this._grid.delete(key);
          }
        }
      }
    }

    this._objectBounds.delete(item);
    return true;
  }

  public update(item: T, newBounds: AABB): void {
    this.insert(item, newBounds);
  }

  public queryAABB(queryBox: AABB, out: Set<T> = new Set<T>()): Set<T> {
    const minX = Math.floor(queryBox.min.x * this._invCellSize);
    const minY = Math.floor(queryBox.min.y * this._invCellSize);
    const maxX = Math.floor(queryBox.max.x * this._invCellSize);
    const maxY = Math.floor(queryBox.max.y * this._invCellSize);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        const key = `${x}:${y}`;
        const cell = this._grid.get(key);
        if (cell) {
          for (const item of cell) {
            const bounds = this._objectBounds.get(item);
            if (bounds && bounds.intersectsAABB(queryBox)) {
              out.add(item);
            }
          }
        }
      }
    }

    return out;
  }

  public queryRadius(center: Vector2, radius: number, out: Set<T> = new Set<T>()): Set<T> {
    const queryBox = new AABB(
      center.x - radius,
      center.y - radius,
      center.x + radius,
      center.y + radius
    );
    const candidates = new Set<T>();
    this.queryAABB(queryBox, candidates);

    const radSq = radius * radius;
    for (const item of candidates) {
      const bounds = this._objectBounds.get(item)!;
      // Test if center distance to AABB is within radius
      const closestX = Math.max(bounds.min.x, Math.min(center.x, bounds.max.x));
      const closestY = Math.max(bounds.min.y, Math.min(center.y, bounds.max.y));
      const dx = center.x - closestX;
      const dy = center.y - closestY;
      if (dx * dx + dy * dy <= radSq) {
        out.add(item);
      }
    }

    return out;
  }

  public clear(): void {
    this._grid.clear();
    this._objectBounds.clear();
  }
}
