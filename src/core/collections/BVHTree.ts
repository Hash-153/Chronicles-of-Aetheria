/**
 * @file BVHTree.ts
 * @description Dynamic Bounding Volume Hierarchy (BVH) tree with surface area heuristic (SAH) and raycast traversal.
 */

import { AABB } from '../math/AABB.ts';
import { Ray2D, type RaycastHit2D } from '../math/Ray2D.ts';

export class BVHNode<T> {
  public aabb: AABB;
  public item?: T;
  public left?: BVHNode<T>;
  public right?: BVHNode<T>;
  public parent?: BVHNode<T>;
  public height = 0;

  constructor(aabb: AABB, item?: T) {
    this.aabb = aabb.clone();
    this.item = item;
  }

  public get isLeaf(): boolean {
    return this.left === undefined;
  }
}

export class BVHTree<T> {
  private _root?: BVHNode<T>;
  private _margin: number;

  constructor(fatMargin = 2.0) {
    this._margin = fatMargin;
  }

  public get root(): BVHNode<T> | undefined {
    return this._root;
  }

  public insert(item: T, tightAABB: AABB): BVHNode<T> {
    const fatAABB = tightAABB.clone().fatten(this._margin);
    const leaf = new BVHNode<T>(fatAABB, item);

    if (!this._root) {
      this._root = leaf;
      return leaf;
    }

    // Find best sibling using surface area heuristic
    let bestSibling = this._root;
    let bestCost = this._computeMergedArea(this._root.aabb, fatAABB);

    const queue: BVHNode<T>[] = [this._root];
    while (queue.length > 0) {
      const current = queue.shift()!;
      const directCost = this._computeMergedArea(current.aabb, fatAABB);
      if (directCost < bestCost) {
        bestCost = directCost;
        bestSibling = current;
      }

      if (!current.isLeaf) {
        queue.push(current.left!);
        queue.push(current.right!);
      }
    }

    // Create new parent
    const oldParent = bestSibling.parent;
    const newParent = new BVHNode<T>(bestSibling.aabb.clone().expandToAABB(fatAABB));
    newParent.parent = oldParent;
    newParent.height = bestSibling.height + 1;

    if (oldParent) {
      if (oldParent.left === bestSibling) {
        oldParent.left = newParent;
      } else {
        oldParent.right = newParent;
      }
    } else {
      this._root = newParent;
    }

    newParent.left = bestSibling;
    newParent.right = leaf;
    bestSibling.parent = newParent;
    leaf.parent = newParent;

    // Refit ancestors
    this._refit(leaf.parent);

    return leaf;
  }

  public remove(leaf: BVHNode<T>): void {
    if (leaf === this._root) {
      this._root = undefined;
      return;
    }

    const parent = leaf.parent!;
    const grandParent = parent.parent;
    const sibling = parent.left === leaf ? parent.right! : parent.left!;

    if (grandParent) {
      if (grandParent.left === parent) {
        grandParent.left = sibling;
      } else {
        grandParent.right = sibling;
      }
      sibling.parent = grandParent;
      this._refit(grandParent);
    } else {
      this._root = sibling;
      sibling.parent = undefined;
    }
  }

  public queryAABB(range: AABB, results: T[] = []): T[] {
    if (!this._root) return results;

    const stack: BVHNode<T>[] = [this._root];
    while (stack.length > 0) {
      const node = stack.pop()!;
      if (node.aabb.intersectsAABB(range)) {
        if (node.isLeaf) {
          if (node.item !== undefined) {
            results.push(node.item);
          }
        } else {
          if (node.left) stack.push(node.left);
          if (node.right) stack.push(node.right);
        }
      }
    }

    return results;
  }

  public raycast(ray: Ray2D, testItemCallback?: (item: T, ray: Ray2D) => RaycastHit2D | null): { item: T; hit: RaycastHit2D } | null {
    if (!this._root) return null;

    let closestHit: { item: T; hit: RaycastHit2D } | null = null;
    let minDistance = ray.length;

    const stack: BVHNode<T>[] = [this._root];
    while (stack.length > 0) {
      const node = stack.pop()!;
      const hit = ray.intersectAABB(node.aabb);
      if (!hit || hit.distance > minDistance) continue;

      if (node.isLeaf) {
        if (node.item !== undefined) {
          if (testItemCallback) {
            const itemHit = testItemCallback(node.item, ray);
            if (itemHit && itemHit.distance < minDistance) {
              minDistance = itemHit.distance;
              closestHit = { item: node.item, hit: itemHit };
            }
          } else {
            minDistance = hit.distance;
            closestHit = { item: node.item, hit };
          }
        }
      } else {
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
      }
    }

    return closestHit;
  }

  private _computeMergedArea(a: AABB, b: AABB): number {
    const minX = Math.min(a.min.x, b.min.x);
    const minY = Math.min(a.min.y, b.min.y);
    const maxX = Math.max(a.max.x, b.max.x);
    const maxY = Math.max(a.max.y, b.max.y);
    return (maxX - minX) * (maxY - minY);
  }

  private _refit(node?: BVHNode<T>): void {
    while (node) {
      const left = node.left!;
      const right = node.right!;

      node.aabb.copy(left.aabb).expandToAABB(right.aabb);
      node.height = 1 + Math.max(left.height, right.height);

      node = node.parent;
    }
  }

  public clear(): void {
    this._root = undefined;
  }
}
