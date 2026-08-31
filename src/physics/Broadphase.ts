/**
 * @file Broadphase.ts
 * @description Dynamic AABB Tree broadphase collision detector generating candidate overlap pairs with deduplication.
 */

import { type EntityId } from '../core/ecs/Types.ts';
import { Collider2D } from './Collider2D.ts';
import { BVHTree, BVHNode } from '../core/collections/BVHTree.ts';

export interface BroadphasePair {
  entityA: EntityId;
  entityB: EntityId;
}

export interface BroadphaseProxy {
  entityId: EntityId;
  collider: Collider2D;
  bvhNode?: BVHNode<BroadphaseProxy>;
}

export class Broadphase {
  private _bvh: BVHTree<BroadphaseProxy>;
  private _proxies: Map<EntityId, BroadphaseProxy> = new Map();

  constructor(fatMargin = 4.0) {
    this._bvh = new BVHTree<BroadphaseProxy>(fatMargin);
  }

  public register(entityId: EntityId, collider: Collider2D): void {
    const proxy: BroadphaseProxy = {
      entityId,
      collider,
    };
    proxy.bvhNode = this._bvh.insert(proxy, collider.worldAABB);
    this._proxies.set(entityId, proxy);
  }

  public unregister(entityId: EntityId): void {
    const proxy = this._proxies.get(entityId);
    if (!proxy) return;

    if (proxy.bvhNode) {
      this._bvh.remove(proxy.bvhNode);
    }
    this._proxies.delete(entityId);
  }

  public updateProxy(entityId: EntityId): void {
    const proxy = this._proxies.get(entityId);
    if (!proxy || !proxy.bvhNode) return;

    // Check if fat AABB still encloses current tight AABB
    if (!proxy.bvhNode.aabb.containsAABB(proxy.collider.worldAABB)) {
      this._bvh.remove(proxy.bvhNode);
      proxy.bvhNode = this._bvh.insert(proxy, proxy.collider.worldAABB);
    }
  }

  public computePairs(): BroadphasePair[] {
    const pairs: BroadphasePair[] = [];
    const testedPairs = new Set<string>();

    for (const proxy of this._proxies.values()) {
      const candidates: BroadphaseProxy[] = [];
      this._bvh.queryAABB(proxy.collider.worldAABB, candidates);

      for (let i = 0; i < candidates.length; i++) {
        const other = candidates[i];
        if (proxy.entityId === other.entityId) continue;

        // Ensure canonical ID ordering
        const minId = Math.min(proxy.entityId, other.entityId);
        const maxId = Math.max(proxy.entityId, other.entityId);
        const pairKey = `${minId}:${maxId}`;

        if (testedPairs.has(pairKey)) continue;
        testedPairs.add(pairKey);

        if (proxy.collider.canCollideWith(other.collider)) {
          pairs.push({
            entityA: minId,
            entityB: maxId,
          });
        }
      }
    }

    return pairs;
  }

  public clear(): void {
    this._bvh.clear();
    this._proxies.clear();
  }
}
