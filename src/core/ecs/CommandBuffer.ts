/**
 * @file CommandBuffer.ts
 * @description Queues deferred mutations (entity creation/destruction, component additions/removals) to execute safely at phase boundaries.
 */

import { type EntityId, type ComponentConstructor } from './Types.ts';
import { World } from './World.ts';

type Command =
  | { type: 'createEntity'; callback?: (id: EntityId) => void }
  | { type: 'destroyEntity'; entityId: EntityId }
  | { type: 'addComponent'; entityId: EntityId; component: any }
  | { type: 'removeComponent'; entityId: EntityId; componentType: ComponentConstructor }
  | { type: 'custom'; fn: (world: World) => void };

export class CommandBuffer {
  private _commands: Command[] = [];

  public createEntity(callback?: (id: EntityId) => void): this {
    this._commands.push({ type: 'createEntity', callback });
    return this;
  }

  public destroyEntity(entityId: EntityId): this {
    this._commands.push({ type: 'destroyEntity', entityId });
    return this;
  }

  public addComponent<T>(entityId: EntityId, component: T): this {
    this._commands.push({ type: 'addComponent', entityId, component });
    return this;
  }

  public removeComponent<T>(entityId: EntityId, componentType: ComponentConstructor<T>): this {
    this._commands.push({ type: 'removeComponent', entityId, componentType });
    return this;
  }

  public defer(fn: (world: World) => void): this {
    this._commands.push({ type: 'custom', fn });
    return this;
  }

  public flush(world: World): void {
    if (this._commands.length === 0) return;

    for (let i = 0; i < this._commands.length; i++) {
      const cmd = this._commands[i];
      switch (cmd.type) {
        case 'createEntity': {
          const entity = world.createEntity();
          if (cmd.callback) cmd.callback(entity.id);
          break;
        }
        case 'destroyEntity':
          world.destroyEntity(cmd.entityId);
          break;
        case 'addComponent':
          world.addComponent(cmd.entityId, cmd.component);
          break;
        case 'removeComponent':
          world.removeComponent(cmd.entityId, cmd.componentType);
          break;
        case 'custom':
          cmd.fn(world);
          break;
      }
    }

    this._commands.length = 0;
  }

  public clear(): void {
    this._commands.length = 0;
  }
}
