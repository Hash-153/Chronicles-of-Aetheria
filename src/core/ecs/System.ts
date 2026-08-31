/**
 * @file System.ts
 * @description Abstract base system defining execution lifecycle, phase tagging, and dependency hooks.
 */

import { World } from './World.ts';
import { SystemPhase } from './Types.ts';
import { CommandBuffer } from './CommandBuffer.ts';

export abstract class System {
  public phase: SystemPhase = SystemPhase.Update;
  public priority = 0;
  public enabled = true;
  protected world!: World;
  protected commands!: CommandBuffer;

  public init(world: World): void {
    this.world = world;
    this.commands = world.commandBuffer;
    this.onInit();
  }

  public onInit(): void {
    // Override in derived systems
  }

  public onDestroy(): void {
    // Override in derived systems
  }

  public abstract update(dt: number): void;
}
