/**
 * @file Entity.ts
 * @description Lightweight entity reference struct with generation checking to prevent stale entity access.
 */

import { type EntityId } from './Types.ts';
import { World } from './World.ts';
import { type ComponentConstructor } from './Types.ts';

export class Entity {
  public readonly id: EntityId;
  public readonly generation: number;
  private _world: World;

  constructor(id: EntityId, generation: number, world: World) {
    this.id = id;
    this.generation = generation;
    this._world = world;
  }

  public get isValid(): boolean {
    return this._world.entityManager.isAlive(this.id, this.generation);
  }

  public add<T>(component: T): this {
    this._world.addComponent(this.id, component);
    return this;
  }

  public get<T>(type: ComponentConstructor<T>): T | undefined {
    return this._world.getComponent(this.id, type);
  }

  public require<T>(type: ComponentConstructor<T>): T {
    const comp = this.get(type);
    if (!comp) {
      throw new Error(`Entity ${this.id} missing required component: ${type.name}`);
    }
    return comp;
  }

  public has<T>(type: ComponentConstructor<T>): boolean {
    return this._world.hasComponent(this.id, type);
  }

  public remove<T>(type: ComponentConstructor<T>): this {
    this._world.removeComponent(this.id, type);
    return this;
  }

  public destroy(): void {
    this._world.destroyEntity(this.id);
  }
}
