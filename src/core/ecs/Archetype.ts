/**
 * @file Archetype.ts
 * @description Archetype table storing contiguous column arrays for cache-aligned component iteration.
 */

import { type EntityId, type ComponentTypeId } from './Types.ts';
import { BitSet } from '../collections/BitSet.ts';
import { FastArray } from '../collections/FastArray.ts';

export class Archetype {
  public readonly id: number;
  public readonly mask: BitSet;
  public readonly componentTypes: ComponentTypeId[];
  public entities: FastArray<EntityId>;
  public componentColumns: Map<ComponentTypeId, any[]>;
  public entityIndexMap: Map<EntityId, number>;

  constructor(id: number, mask: BitSet, componentTypes: ComponentTypeId[]) {
    this.id = id;
    this.mask = mask;
    this.componentTypes = [...componentTypes].sort((a, b) => a - b);
    this.entities = new FastArray<EntityId>(32);
    this.componentColumns = new Map();
    this.entityIndexMap = new Map();

    for (let i = 0; i < this.componentTypes.length; i++) {
      this.componentColumns.set(this.componentTypes[i], []);
    }
  }

  public get entityCount(): number {
    return this.entities.length;
  }

  public addEntity(entityId: EntityId, components: Map<ComponentTypeId, any>): number {
    const row = this.entities.length;
    this.entities.push(entityId);
    this.entityIndexMap.set(entityId, row);

    for (let i = 0; i < this.componentTypes.length; i++) {
      const typeId = this.componentTypes[i];
      const column = this.componentColumns.get(typeId)!;
      const comp = components.get(typeId);
      column[row] = comp;
    }

    return row;
  }

  public removeEntity(entityId: EntityId): void {
    const row = this.entityIndexMap.get(entityId);
    if (row === undefined) return;

    const lastRow = this.entities.length - 1;
    const lastEntity = this.entities.get(lastRow)!;

    // Swap and pop
    if (row !== lastRow) {
      this.entities.set(row, lastEntity);
      this.entityIndexMap.set(lastEntity, row);

      for (let i = 0; i < this.componentTypes.length; i++) {
        const typeId = this.componentTypes[i];
        const column = this.componentColumns.get(typeId)!;
        column[row] = column[lastRow];
      }
    }

    this.entities.pop();
    for (let i = 0; i < this.componentTypes.length; i++) {
      const typeId = this.componentTypes[i];
      const column = this.componentColumns.get(typeId)!;
      column.pop();
    }

    this.entityIndexMap.delete(entityId);
  }

  public getComponent<T>(entityId: EntityId, typeId: ComponentTypeId): T | undefined {
    const row = this.entityIndexMap.get(entityId);
    if (row === undefined) return undefined;
    const column = this.componentColumns.get(typeId);
    return column ? column[row] : undefined;
  }

  public getColumn<T>(typeId: ComponentTypeId): T[] | undefined {
    return this.componentColumns.get(typeId);
  }
}
