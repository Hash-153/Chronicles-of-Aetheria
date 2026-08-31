/**
 * @file World.ts
 * @description Central ECS engine coordinating Entity lifecycle, Archetype allocation, Systems and EventBus.
 */

import { type EntityId, type ComponentConstructor, type QueryFilter } from './Types.ts';
import { EntityManager } from './EntityManager.ts';
import { ComponentRegistry } from './ComponentRegistry.ts';
import { ArchetypeGraph } from './ArchetypeGraph.ts';
import { Archetype } from './Archetype.ts';
import { Entity } from './Entity.ts';
import { Query } from './Query.ts';
import { SystemScheduler } from './SystemScheduler.ts';
import { System } from './System.ts';
import { CommandBuffer } from './CommandBuffer.ts';

export class World {
  public entityManager: EntityManager;
  public archetypeGraph: ArchetypeGraph;
  public systemScheduler: SystemScheduler;
  public commandBuffer: CommandBuffer;

  private _entityArchetypes: Map<EntityId, Archetype> = new Map();
  private _queries: Query[] = [];

  constructor(initialEntityCapacity = 10000) {
    this.entityManager = new EntityManager(initialEntityCapacity);
    this.archetypeGraph = new ArchetypeGraph();
    this.systemScheduler = new SystemScheduler();
    this.commandBuffer = new CommandBuffer();
  }

  public createEntity(): Entity {
    const { id, generation } = this.entityManager.create();
    const root = this.archetypeGraph.root;
    root.addEntity(id, new Map());
    this._entityArchetypes.set(id, root);
    this._notifyQueriesArchetypeChanged();

    return new Entity(id, generation, this);
  }

  public getEntity(id: EntityId): Entity | null {
    const gen = this.entityManager.getGeneration(id);
    if (!this.entityManager.isAlive(id, gen)) return null;
    return new Entity(id, gen, this);
  }

  public destroyEntity(id: EntityId): boolean {
    const arch = this._entityArchetypes.get(id);
    if (!arch) return false;

    arch.removeEntity(id);
    this._entityArchetypes.delete(id);
    const destroyed = this.entityManager.destroy(id);
    this._notifyQueriesArchetypeChanged();

    return destroyed;
  }

  public addComponent<T>(id: EntityId, component: T): void {
    const currentArch = this._entityArchetypes.get(id);
    if (!currentArch) return;

    const constructor = (component as any).constructor as ComponentConstructor<T>;
    const typeId = ComponentRegistry.getTypeId(constructor);

    if (currentArch.mask.get(typeId)) {
      // Component already exists in archetype, update in-place
      const row = currentArch.entityIndexMap.get(id);
      if (row !== undefined) {
        currentArch.componentColumns.get(typeId)![row] = component;
      }
      return;
    }

    // Move to target archetype
    const targetArch = this.archetypeGraph.getTransitionAdd(currentArch, typeId);

    // Extract existing components
    const row = currentArch.entityIndexMap.get(id)!;
    const comps = new Map<number, any>();
    for (const tid of currentArch.componentTypes) {
      comps.set(tid, currentArch.componentColumns.get(tid)![row]);
    }
    comps.set(typeId, component);

    currentArch.removeEntity(id);
    targetArch.addEntity(id, comps);
    this._entityArchetypes.set(id, targetArch);

    this._notifyQueriesArchetypeChanged();
  }

  public removeComponent<T>(id: EntityId, componentType: ComponentConstructor<T>): void {
    const currentArch = this._entityArchetypes.get(id);
    if (!currentArch) return;

    const typeId = ComponentRegistry.getTypeId(componentType);
    if (!currentArch.mask.get(typeId)) return;

    const targetArch = this.archetypeGraph.getTransitionRemove(currentArch, typeId);

    const row = currentArch.entityIndexMap.get(id)!;
    const comps = new Map<number, any>();
    for (const tid of currentArch.componentTypes) {
      if (tid !== typeId) {
        comps.set(tid, currentArch.componentColumns.get(tid)![row]);
      }
    }

    currentArch.removeEntity(id);
    targetArch.addEntity(id, comps);
    this._entityArchetypes.set(id, targetArch);

    this._notifyQueriesArchetypeChanged();
  }

  public getComponent<T>(id: EntityId, componentType: ComponentConstructor<T>): T | undefined {
    const arch = this._entityArchetypes.get(id);
    if (!arch) return undefined;
    const typeId = ComponentRegistry.getTypeId(componentType);
    return arch.getComponent<T>(id, typeId);
  }

  public hasComponent<T>(id: EntityId, componentType: ComponentConstructor<T>): boolean {
    const arch = this._entityArchetypes.get(id);
    if (!arch) return false;
    const typeId = ComponentRegistry.getTypeId(componentType);
    return arch.mask.get(typeId);
  }

  public createQuery(filter: QueryFilter): Query {
    const query = new Query(this, filter.all || [], filter.any || [], filter.none || []);
    this._queries.push(query);
    return query;
  }

  public addSystem(system: System): this {
    this.systemScheduler.register(system, this);
    return this;
  }

  public update(dt: number): void {
    this.systemScheduler.update(dt, this);
  }

  public clear(): void {
    this.systemScheduler.clear();
    this.entityManager.clear();
    this._entityArchetypes.clear();
    this._queries.length = 0;
  }

  private _notifyQueriesArchetypeChanged(): void {
    for (let i = 0; i < this._queries.length; i++) {
      this._queries[i].rebuild();
    }
  }
}
