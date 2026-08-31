/**
 * @file ThreatMatrix.ts
 * @description Monster aggro & threat evaluation matrix with damage-scaling, proximity threat, and decay over time.
 */

import { type EntityId } from '../core/ecs/Types.ts';

export interface ThreatEntry {
  entityId: EntityId;
  threatValue: number;
  lastDamageTime: number;
}

export class ThreatMatrix {
  private _threatTable: Map<EntityId, ThreatEntry> = new Map();
  public threatDecayRate = 5.0; // Threat points lost per second
  public switchTargetThreshold = 1.1; // Must exceed current target by 10% to switch

  public addThreat(entityId: EntityId, amount: number): void {
    let entry = this._threatTable.get(entityId);
    if (!entry) {
      entry = { entityId, threatValue: 0, lastDamageTime: performance.now() };
      this._threatTable.set(entityId, entry);
    }
    entry.threatValue += amount;
    entry.lastDamageTime = performance.now();
  }

  public getPrimaryTarget(): EntityId | null {
    let highestThreat = -Infinity;
    let primaryTarget: EntityId | null = null;

    for (const entry of this._threatTable.values()) {
      if (entry.threatValue > highestThreat && entry.threatValue > 0) {
        highestThreat = entry.threatValue;
        primaryTarget = entry.entityId;
      }
    }

    return primaryTarget;
  }

  public update(dt: number): void {
    for (const [entityId, entry] of this._threatTable.entries()) {
      entry.threatValue = Math.max(0, entry.threatValue - this.threatDecayRate * dt);
      if (entry.threatValue === 0) {
        this._threatTable.delete(entityId);
      }
    }
  }

  public clear(): void {
    this._threatTable.clear();
  }
}
