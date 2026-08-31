/**
 * @file Query.ts
 * @description High-speed entity query matching archetypes using bitmasks and fast column chunk iterations.
 */

import { type ComponentConstructor, type EntityId } from './Types.ts';
import { ComponentRegistry } from './ComponentRegistry.ts';
import { Archetype } from './Archetype.ts';
import { BitSet } from '../collections/BitSet.ts';
import { World } from './World.ts';

export class Query {
  private _allMask: BitSet;
  private _anyMask?: BitSet;
  private _noneMask: BitSet;
  private _world: World;
  private _matchingArchetypes: Archetype[] = [];

  constructor(
    world: World,
    allTypes: ComponentConstructor[] = [],
    anyTypes: ComponentConstructor[] = [],
    noneTypes: ComponentConstructor[] = []
  ) {
    this._world = world;
    this._allMask = ComponentRegistry.createBitSet(allTypes);
    this._noneMask = ComponentRegistry.createBitSet(noneTypes);

    if (anyTypes.length > 0) {
      this._anyMask = ComponentRegistry.createBitSet(anyTypes);
    }

    this.rebuild();
  }

  public rebuild(): void {
    this._matchingArchetypes = [];
    const all = this._world.archetypeGraph.allArchetypes;

    for (let i = 0; i < all.length; i++) {
      const arch = all[i];
      if (this.matches(arch)) {
        this._matchingArchetypes.push(arch);
      }
    }
  }

  public matches(archetype: Archetype): boolean {
    if (!archetype.mask.containsAll(this._allMask)) {
      return false;
    }
    if (this._noneMask.intersects(archetype.mask)) {
      return false;
    }
    if (this._anyMask && !this._anyMask.intersects(archetype.mask)) {
      return false;
    }
    return true;
  }

  public get matchingArchetypes(): readonly Archetype[] {
    return this._matchingArchetypes;
  }

  public forEach(callback: (entityId: EntityId, ...components: any[]) => void, componentTypes: ComponentConstructor[]): void {
    const typeIds = componentTypes.map(t => ComponentRegistry.getTypeId(t));

    for (let a = 0; a < this._matchingArchetypes.length; a++) {
      const arch = this._matchingArchetypes[a];
      const count = arch.entityCount;
      if (count === 0) continue;

      const columns = typeIds.map(tid => arch.getColumn(tid)!);
      const entities = arch.entities;

      for (let i = 0; i < count; i++) {
        const entityId = entities.get(i)!;
        const comps = columns.map(col => col[i]);
        callback(entityId, ...comps);
      }
    }
  }

  public count(): number {
    let total = 0;
    for (let i = 0; i < this._matchingArchetypes.length; i++) {
      total += this._matchingArchetypes[i].entityCount;
    }
    return total;
  }
}
