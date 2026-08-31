/**
 * @file ArchetypeGraph.ts
 * @description State transition graph linking archetypes via component addition and removal edges.
 */

import { type ComponentTypeId } from './Types.ts';
import { Archetype } from './Archetype.ts';
import { BitSet } from '../collections/BitSet.ts';

export interface ArchetypeEdge {
  add: Map<ComponentTypeId, Archetype>;
  remove: Map<ComponentTypeId, Archetype>;
}

export class ArchetypeGraph {
  public root: Archetype;
  private _archetypes: Archetype[] = [];
  private _edges: Map<Archetype, ArchetypeEdge> = new Map();
  private _nextArchetypeId = 0;

  constructor() {
    const emptyMask = new BitSet();
    this.root = this._createArchetype(emptyMask, []);
  }

  public get allArchetypes(): readonly Archetype[] {
    return this._archetypes;
  }

  public getTransitionAdd(source: Archetype, typeId: ComponentTypeId): Archetype {
    const edge = this._edges.get(source)!;
    let target = edge.add.get(typeId);

    if (!target) {
      const newMask = source.mask.clone().set(typeId, true);
      const newTypes = [...source.componentTypes, typeId];
      target = this._findOrCreateArchetype(newMask, newTypes);

      edge.add.set(typeId, target);
      this._edges.get(target)!.remove.set(typeId, source);
    }

    return target;
  }

  public getTransitionRemove(source: Archetype, typeId: ComponentTypeId): Archetype {
    const edge = this._edges.get(source)!;
    let target = edge.remove.get(typeId);

    if (!target) {
      const newMask = source.mask.clone().set(typeId, false);
      const newTypes = source.componentTypes.filter(t => t !== typeId);
      target = this._findOrCreateArchetype(newMask, newTypes);

      edge.remove.set(typeId, target);
      this._edges.get(target)!.add.set(typeId, source);
    }

    return target;
  }

  private _findOrCreateArchetype(mask: BitSet, types: ComponentTypeId[]): Archetype {
    for (let i = 0; i < this._archetypes.length; i++) {
      const a = this._archetypes[i];
      if (a.mask.containsAll(mask) && mask.containsAll(a.mask)) {
        return a;
      }
    }
    return this._createArchetype(mask, types);
  }

  private _createArchetype(mask: BitSet, types: ComponentTypeId[]): Archetype {
    const a = new Archetype(this._nextArchetypeId++, mask, types);
    this._archetypes.push(a);
    this._edges.set(a, {
      add: new Map(),
      remove: new Map(),
    });
    return a;
  }
}
