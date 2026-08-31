/**
 * @file QuadTree.ts
 * @description Hierarchical 2D Quadtree with subdivision, containment heuristics, and fast range queries.
 */

import { Vector2 } from '../math/Vector2.ts';
import { AABB } from '../math/AABB.ts';

export interface IQuadTreeItem<T> {
  item: T;
  bounds: AABB;
}

export class QuadTree<T> {
  private _boundary: AABB;
  private _capacity: number;
  private _maxDepth: number;
  private _depth: number;
  private _items: IQuadTreeItem<T>[] = [];
  private _divided = false;

  private _northWest?: QuadTree<T>;
  private _northEast?: QuadTree<T>;
  private _southWest?: QuadTree<T>;
  private _southEast?: QuadTree<T>;

  constructor(boundary: AABB, capacity = 8, maxDepth = 6, depth = 0) {
    this._boundary = boundary.clone();
    this._capacity = capacity;
    this._maxDepth = maxDepth;
    this._depth = depth;
  }

  public get boundary(): AABB {
    return this._boundary;
  }

  public insert(item: T, bounds: AABB): boolean {
    if (!this._boundary.intersectsAABB(bounds)) {
      return false;
    }

    if (this._items.length < this._capacity || this._depth >= this._maxDepth) {
      this._items.push({ item, bounds: bounds.clone() });
      return true;
    }

    if (!this._divided) {
      this._subdivide();
    }

    let inserted = false;
    if (this._northWest!.insert(item, bounds)) inserted = true;
    if (this._northEast!.insert(item, bounds)) inserted = true;
    if (this._southWest!.insert(item, bounds)) inserted = true;
    if (this._southEast!.insert(item, bounds)) inserted = true;

    return inserted;
  }

  public queryAABB(range: AABB, found: Set<T> = new Set<T>()): Set<T> {
    if (!this._boundary.intersectsAABB(range)) {
      return found;
    }

    for (let i = 0; i < this._items.length; i++) {
      if (this._items[i].bounds.intersectsAABB(range)) {
        found.add(this._items[i].item);
      }
    }

    if (this._divided) {
      this._northWest!.queryAABB(range, found);
      this._northEast!.queryAABB(range, found);
      this._southWest!.queryAABB(range, found);
      this._southEast!.queryAABB(range, found);
    }

    return found;
  }

  public clear(): void {
    this._items.length = 0;
    if (this._divided) {
      this._northWest!.clear();
      this._northEast!.clear();
      this._southWest!.clear();
      this._southEast!.clear();
      this._divided = false;
    }
  }

  private _subdivide(): void {
    const min = this._boundary.min;
    const max = this._boundary.max;
    const midX = (min.x + max.x) * 0.5;
    const midY = (min.y + max.y) * 0.5;

    const nwBounds = new AABB(min.x, min.y, midX, midY);
    const neBounds = new AABB(midX, min.y, max.x, midY);
    const swBounds = new AABB(min.x, midY, midX, max.y);
    const seBounds = new AABB(midX, midY, max.x, max.y);

    const nextDepth = this._depth + 1;
    this._northWest = new QuadTree<T>(nwBounds, this._capacity, this._maxDepth, nextDepth);
    this._northEast = new QuadTree<T>(neBounds, this._capacity, this._maxDepth, nextDepth);
    this._southWest = new QuadTree<T>(swBounds, this._capacity, this._maxDepth, nextDepth);
    this._southEast = new QuadTree<T>(seBounds, this._capacity, this._maxDepth, nextDepth);

    this._divided = true;

    // Distribute existing items if appropriate
    const oldItems = this._items;
    this._items = [];
    for (let i = 0; i < oldItems.length; i++) {
      this.insert(oldItems[i].item, oldItems[i].bounds);
    }
  }
}
