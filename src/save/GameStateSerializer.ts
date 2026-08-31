/**
 * @file GameStateSerializer.ts
 * @description Encodes and decodes the entire ECS World, player attributes, inventory, quest states into structured JSON schemas.
 */

import { World } from '../core/ecs/World.ts';
import { Transform2D } from '../core/math/Transform2D.ts';
import { Attributes } from '../gameplay/Attributes.ts';
import { Inventory } from '../gameplay/InventorySystem.ts';
import { LevelProgression } from '../gameplay/LevelProgression.ts';
import { EquipmentSlots } from '../gameplay/EquipmentSlots.ts';

export interface SerializedPlayerState {
  level: number;
  xp: number;
  health: number;
  mana: number;
  stamina: number;
  stats: {
    strength: number;
    agility: number;
    intelligence: number;
    vitality: number;
  };
  inventoryItems: any[];
  equipment: any;
  gold: number;
}

export interface SerializedWorldSave {
  version: string;
  timestamp: number;
  playtimeSeconds: number;
  player: SerializedPlayerState;
}

export class GameStateSerializer {
  public static readonly CURRENT_VERSION = '1.0.0';

  public static serialize(world: World, playtime = 0): SerializedWorldSave {
    let playerState: SerializedPlayerState = {
      level: 1,
      xp: 0,
      health: 100,
      mana: 50,
      stamina: 100,
      stats: { strength: 10, agility: 10, intelligence: 10, vitality: 10 },
      inventoryItems: [],
      equipment: {},
      gold: 0,
    };

    const playerQuery = world.createQuery({ all: [Attributes, LevelProgression] });
    playerQuery.forEach((id, attrs: Attributes, level: LevelProgression) => {
      const inv = world.getComponent(id, Inventory);
      const equip = world.getComponent(id, EquipmentSlots);

      playerState = {
        level: level.currentLevel,
        xp: level.currentXP,
        health: attrs.currentHealth,
        mana: attrs.currentMana,
        stamina: attrs.currentStamina,
        stats: {
          strength: attrs.strength,
          agility: attrs.agility,
          intelligence: attrs.intelligence,
          vitality: attrs.vitality,
        },
        inventoryItems: inv ? inv.items : [],
        equipment: equip ? {
          weapon: equip.weapon,
          helm: equip.helm,
          armor: equip.armor,
          boots: equip.boots,
          amulet: equip.amulet,
          ring: equip.ring,
        } : {},
        gold: inv ? inv.gold : 0,
      };
    }, [Attributes, LevelProgression]);

    return {
      version: this.CURRENT_VERSION,
      timestamp: Date.now(),
      playtimeSeconds: playtime,
      player: playerState,
    };
  }

  public static deserialize(data: SerializedWorldSave, world: World): void {
    const playerQuery = world.createQuery({ all: [Attributes, LevelProgression] });
    playerQuery.forEach((id, attrs: Attributes, level: LevelProgression) => {
      level.currentLevel = data.player.level;
      level.currentXP = data.player.xp;
      attrs.strength = data.player.stats.strength;
      attrs.agility = data.player.stats.agility;
      attrs.intelligence = data.player.stats.intelligence;
      attrs.vitality = data.player.stats.vitality;
      attrs.recalculateDerivedStats();
      attrs.currentHealth = data.player.health;
      attrs.currentMana = data.player.mana;
      attrs.currentStamina = data.player.stamina;

      const inv = world.getComponent(id, Inventory);
      if (inv) {
        inv.items = data.player.inventoryItems;
        inv.gold = data.player.gold;
      }
    }, [Attributes, LevelProgression]);
  }
}
