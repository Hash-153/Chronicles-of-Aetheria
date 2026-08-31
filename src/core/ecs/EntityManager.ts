/**
 * @file EntityManager.ts
 * @description Manages generational IDs and recycling pools for 100,000+ active entities.
 */

import { type EntityId } from './Types.ts';
import { FreeList } from '../collections/FreeList.ts';

export class EntityManager {
  private _generations: Uint32Array;
  private _alive: Uint8Array;
  private _freeList: FreeList;
  private _capacity: number;
  private _activeCount = 0;

  constructor(initialCapacity = 10000) {
    this._capacity = initialCapacity;
    this._generations = new Uint32Array(initialCapacity);
    this._alive = new Uint8Array(initialCapacity);
    this._freeList = new FreeList(initialCapacity);
  }

  public get count(): number {
    return this._activeCount;
  }

  public create(): { id: EntityId; generation: number } {
    const id = this._freeList.allocate();
    if (id >= this._capacity) {
      this._grow(id + 1);
    }

    this._alive[id] = 1;
    this._activeCount++;

    return {
      id,
      generation: this._generations[id],
    };
  }

  public destroy(id: EntityId): boolean {
    if (!this.isAlive(id, this._generations[id])) {
      return false;
    }

    this._alive[id] = 0;
    this._generations[id]++; // Increment generation to invalidate existing handles
    this._freeList.free(id);
    this._activeCount--;

    return true;
  }

  public isAlive(id: EntityId, generation: number): boolean {
    if (id < 0 || id >= this._capacity) return false;
    return this._alive[id] === 1 && this._generations[id] === generation;
  }

  public getGeneration(id: EntityId): number {
    return id < this._capacity ? this._generations[id] : 0;
  }

  private _grow(newCapacity: number): void {
    const nextCap = Math.max(newCapacity, this._capacity * 2);
    const nextGens = new Uint32Array(nextCap);
    const nextAlive = new Uint8Array(nextCap);

    nextGens.set(this._generations);
    nextAlive.set(this._alive);

    this._generations = nextGens;
    this._alive = nextAlive;
    this._capacity = nextCap;
  }

  public clear(): void {
    this._generations.fill(0);
    this._alive.fill(0);
    this._freeList.clear();
    this._activeCount = 0;
  }
}
