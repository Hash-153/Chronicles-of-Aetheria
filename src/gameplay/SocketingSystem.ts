/**
 * @file SocketingSystem.ts
 * @description Logic for inserting gems into socketed weapons and armor to infuse elemental power.
 */

import { type GeneratedItem } from '../procgen/LootTableGenerator.ts';
import { type SocketGem } from './ItemDefinitions.ts';

export class SocketingSystem {
  public static insertGem(item: GeneratedItem, gem: SocketGem): boolean {
    if (item.sockets <= 0) return false;

    // Check weapon vs armor bonus
    const bonus = item.slot === 0 ? gem.weaponBonus : gem.armorBonus;
    item.stats[bonus.stat] = (item.stats[bonus.stat] || 0) + bonus.value;
    item.sockets--;

    return true;
  }
}
