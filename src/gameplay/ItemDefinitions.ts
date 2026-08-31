/**
 * @file ItemDefinitions.ts
 * @description Catalog of consumable potions, socketable gems, and crafting runes.
 */

export interface ConsumableItem {
  id: string;
  name: string;
  restoreHealth: number;
  restoreMana: number;
  cooldown: number;
}

export interface SocketGem {
  id: string;
  name: string;
  tier: number; // 1-5 (Chipped, Flawed, Regular, Flawless, Perfect)
  weaponBonus: { stat: string; value: number };
  armorBonus: { stat: string; value: number };
}

export const RUBY_GEM: SocketGem = {
  id: 'ruby',
  name: 'Ruby',
  tier: 3,
  weaponBonus: { stat: 'fireDamage', value: 15 },
  armorBonus: { stat: 'maxHealth', value: 30 },
};

export const SAPPHIRE_GEM: SocketGem = {
  id: 'sapphire',
  name: 'Sapphire',
  tier: 3,
  weaponBonus: { stat: 'coldDamage', value: 15 },
  armorBonus: { stat: 'maxMana', value: 25 },
};

export const TOPAZ_GEM: SocketGem = {
  id: 'topaz',
  name: 'Topaz',
  tier: 3,
  weaponBonus: { stat: 'lightningDamage', value: 20 },
  armorBonus: { stat: 'magicFind', value: 10 },
};

export const HEALTH_POTION: ConsumableItem = {
  id: 'health_potion',
  name: 'Greater Healing Potion',
  restoreHealth: 50,
  restoreMana: 0,
  cooldown: 5.0,
};

export const MANA_POTION: ConsumableItem = {
  id: 'mana_potion',
  name: 'Greater Mana Potion',
  restoreHealth: 0,
  restoreMana: 40,
  cooldown: 5.0,
};
