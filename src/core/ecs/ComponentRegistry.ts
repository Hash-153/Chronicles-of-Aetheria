/**
 * @file ComponentRegistry.ts
 * @description Central catalog allocating contiguous 0-indexed IDs and bitmask offsets for every component type.
 */

import { type ComponentTypeId, type ComponentConstructor } from './Types.ts';
import { BitSet } from '../collections/BitSet.ts';

export class ComponentRegistry {
  private static _typeIdMap: Map<ComponentConstructor, ComponentTypeId> = new Map();
  private static _nameMap: Map<string, ComponentConstructor> = new Map();
  private static _constructors: ComponentConstructor[] = [];
  private static _nextTypeId = 0;

  public static register<T>(type: ComponentConstructor<T>, customName?: string): ComponentTypeId {
    if (this._typeIdMap.has(type)) {
      return this._typeIdMap.get(type)!;
    }

    const id = this._nextTypeId++;
    this._typeIdMap.set(type, id);
    this._constructors[id] = type;

    const name = customName || type.name;
    this._nameMap.set(name, type);

    return id;
  }

  public static getTypeId<T>(type: ComponentConstructor<T>): ComponentTypeId {
    let id = this._typeIdMap.get(type);
    if (id === undefined) {
      id = this.register(type);
    }
    return id;
  }

  public static getConstructor(id: ComponentTypeId): ComponentConstructor | undefined {
    return this._constructors[id];
  }

  public static getByName(name: string): ComponentConstructor | undefined {
    return this._nameMap.get(name);
  }

  public static createBitSet(types: ComponentConstructor[]): BitSet {
    const bitset = new BitSet();
    for (let i = 0; i < types.length; i++) {
      const typeId = this.getTypeId(types[i]);
      bitset.set(typeId, true);
    }
    return bitset;
  }

  public static get totalTypes(): number {
    return this._nextTypeId;
  }
}
