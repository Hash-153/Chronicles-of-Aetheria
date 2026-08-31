/**
 * @file ConsoleCommands.ts
 * @description In-game developer command prompt executing cheats, telemetry toggles, and item spawners.
 */

import { World } from '../core/ecs/World.ts';
import { LootTableGenerator } from '../procgen/LootTableGenerator.ts';
import { Inventory } from '../gameplay/InventorySystem.ts';
import { LevelProgression } from '../gameplay/LevelProgression.ts';
import { Attributes } from '../gameplay/Attributes.ts';

export type CommandFunction = (args: string[], world: World) => string;

export class ConsoleCommands {
  private _commands: Map<string, CommandFunction> = new Map();

  constructor() {
    this._registerDefaultCommands();
  }

  public register(name: string, fn: CommandFunction): void {
    this._commands.set(name.toLowerCase(), fn);
  }

  public execute(commandLine: string, world: World): string {
    const tokens = commandLine.trim().split(' ');
    if (tokens.length === 0 || !tokens[0]) return '';

    const cmdName = tokens[0].toLowerCase();
    const args = tokens.slice(1);

    const cmd = this._commands.get(cmdName);
    if (!cmd) {
      return `Unknown command: '${cmdName}'. Type 'help' for available commands.`;
    }

    try {
      return cmd(args, world);
    } catch (e: any) {
      return `Error executing '${cmdName}': ${e.message}`;
    }
  }

  private _registerDefaultCommands(): void {
    this.register('help', () => {
      return `Available commands: ${Array.from(this._commands.keys()).join(', ')}`;
    });

    this.register('give_item', (args, world) => {
      const level = parseInt(args[0] || '1', 10);
      const item = LootTableGenerator.rollItem(level, 50);

      const query = world.createQuery({ all: [Inventory] });
      let added = false;
      query.forEach((id, inv: Inventory) => {
        if (inv.addItem(item)) added = true;
      }, [Inventory]);

      return added ? `Spawned item: ${item.name}` : 'Failed to add item. Inventory full?';
    });

    this.register('godmode', (args, world) => {
      const query = world.createQuery({ all: [Attributes] });
      query.forEach((id, attrs: Attributes) => {
        attrs.maxHealth = 999999;
        attrs.currentHealth = 999999;
        attrs.attackPower = 99999;
      }, [Attributes]);
      return 'Godmode enabled!';
    });
  }
}
