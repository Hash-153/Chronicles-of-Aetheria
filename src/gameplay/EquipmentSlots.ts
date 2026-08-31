/**
 * @file EquipmentSlots.ts
 * @description Equippable slots component calculating aggregate stats and gear attributes.
 */

import { Component } from '../core/ecs/Component.ts';
import { type GeneratedItem, ItemSlot } from '../procgen/LootTableGenerator.ts';
import { Attributes } from './Attributes.ts';

export class EquipmentSlots {
  public weapon: GeneratedItem | null = null;
  public helm: GeneratedItem | null = null;
  public armor: GeneratedItem | null = null;
  public boots: GeneratedItem | null = null;
  public amulet: GeneratedItem | null = null;
  public ring: GeneratedItem | null = null;

  public equip(item: GeneratedItem): GeneratedItem | null {
    let unequipped: GeneratedItem | null = null;

    switch (item.slot) {
      case ItemSlot.Weapon:
        unequipped = this.weapon;
        this.weapon = item;
        break;
      case ItemSlot.Helm:
        unequipped = this.helm;
        this.helm = item;
        break;
      case ItemSlot.Armor:
        unequipped = this.armor;
        this.armor = item;
        break;
      case ItemSlot.Boots:
        unequipped = this.boots;
        this.boots = item;
        break;
      case ItemSlot.Amulet:
        unequipped = this.amulet;
        this.amulet = item;
        break;
      case ItemSlot.Ring:
        unequipped = this.ring;
        this.ring = item;
        break;
    }

    return unequipped;
  }

  public applyStatsTo(attributes: Attributes): void {
    const equipped = [this.weapon, this.helm, this.armor, this.boots, this.amulet, this.ring];

    for (const item of equipped) {
      if (!item) continue;

      if (item.baseDamage) attributes.attackPower += item.baseDamage;
      if (item.baseArmor) attributes.armor += item.baseArmor;

      for (const [stat, val] of Object.entries(item.stats)) {
        if (stat === 'strength') attributes.strength += val;
        else if (stat === 'agility') attributes.agility += val;
        else if (stat === 'intelligence') attributes.intelligence += val;
        else if (stat === 'vitality') attributes.vitality += val;
        else if (stat === 'fireDamage') attributes.spellPower += val;
        else if (stat === 'critRate') attributes.critChance += val * 0.01;
      }
    }

    attributes.recalculateDerivedStats();
  }
}
