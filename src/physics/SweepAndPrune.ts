/**
 * @file SweepAndPrune.ts
 * @description 1D Sweep-and-Prune (SAP) axis-sorted broadphase collision detector.
 */

import { type EntityId } from '../core/ecs/Types.ts';
import { Collider2D } from './Collider2D.ts';
import { type BroadphasePair } from './Broadphase.ts';

interface SAPEndpoint {
  entityId: EntityId;
  value: number;
  isMin: boolean;
  collider: Collider2D;
}

export class SweepAndPrune {
  private _endpoints: SAPEndpoint[] = [];

  public updateEndpoints(entities: { id: EntityId; collider: Collider2D }[]): void {
    this._endpoints = [];
    for (let i = 0; i < entities.length; i++) {
      const { id, collider } = entities[i];
      this._endpoints.push({
        entityId: id,
        value: collider.worldAABB.min.x,
        isMin: true,
        collider,
      });
      this._endpoints.push({
        entityId: id,
        value: collider.worldAABB.max.x,
        isMin: false,
        collider,
      });
    }
  }

  public computePairs(): BroadphasePair[] {
    // Insertion sort on X axis (almost sorted between frames)
    this._endpoints.sort((a, b) => a.value - b.value);

    const activeList: SAPEndpoint[] = [];
    const pairs: BroadphasePair[] = [];

    for (let i = 0; i < this._endpoints.length; i++) {
      const ep = this._endpoints[i];

      if (ep.isMin) {
        // Test against all currently active intervals
        for (let j = 0; j < activeList.length; j++) {
          const other = activeList[j];
          if (ep.entityId === other.entityId) continue;

          // Check Y overlap
          if (ep.collider.worldAABB.intersectsAABB(other.collider.worldAABB)) {
            pairs.push({
              entityA: Math.min(ep.entityId, other.entityId),
              entityB: Math.max(ep.entityId, other.entityId),
            });
          }
        }
        activeList.push(ep);
      } else {
        // Remove from active list
        const idx = activeList.findIndex(a => a.entityId === ep.entityId);
        if (idx !== -1) {
          activeList.splice(idx, 1);
        }
      }
    }

    return pairs;
  }
}
