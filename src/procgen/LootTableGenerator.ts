/**
 * @file LootTableGenerator.ts
 * @description ARPG Affix and Loot drop roll system generating Common, Magic, Rare, and Legendary equipment.
 */

export const ItemRarity = {
  Common: 0,
  Magic: 1,
  Rare: 2,
  Legendary: 3,
} as const;
export type ItemRarity = typeof ItemRarity[keyof typeof ItemRarity];

export const ItemSlot = {
  Weapon: 0,
  Helm: 1,
  Armor: 2,
  Boots: 3,
  Amulet: 4,
  Ring: 5,
} as const;
export type ItemSlot = typeof ItemSlot[keyof typeof ItemSlot];

export interface ItemAffix {
  name: string;
  type: 'prefix' | 'suffix';
  stat: string;
  minValue: number;
  maxValue: number;
}

export interface GeneratedItem {
  id: string;
  name: string;
  slot: ItemSlot;
  rarity: ItemRarity;
  itemLevel: number;
  baseDamage?: number;
  baseArmor?: number;
  stats: Record<string, number>;
  sockets: number;
}

const PREFIXES: ItemAffix[] = [
  { name: 'Flaming', type: 'prefix', stat: 'fireDamage', minValue: 5, maxValue: 25 },
  { name: 'Glacial', type: 'prefix', stat: 'coldDamage', minValue: 5, maxValue: 25 },
  { name: 'Thundering', type: 'prefix', stat: 'lightningDamage', minValue: 5, maxValue: 25 },
  { name: 'Stalwart', type: 'prefix', stat: 'armor', minValue: 10, maxValue: 50 },
  { name: 'Titan’s', type: 'prefix', stat: 'strength', minValue: 3, maxValue: 15 },
];

const SUFFIXES: ItemAffix[] = [
  { name: 'of the Fox', type: 'suffix', stat: 'agility', minValue: 3, maxValue: 15 },
  { name: 'of the Owl', type: 'suffix', stat: 'intelligence', minValue: 3, maxValue: 15 },
  { name: 'of the Bear', type: 'suffix', stat: 'vitality', minValue: 5, maxValue: 20 },
  { name: 'of Carnage', type: 'suffix', stat: 'critRate', minValue: 2, maxValue: 8 },
  { name: 'of Leeching', type: 'suffix', stat: 'lifeSteal', minValue: 1, maxValue: 5 },
];

export class LootTableGenerator {
  public static rollItem(itemLevel = 1, magicFindBonus = 0): GeneratedItem {
    // 1. Determine rarity
    const roll = Math.random() * 100 - magicFindBonus;
    let rarity = ItemRarity.Common;
    if (roll < 2) rarity = ItemRarity.Legendary;
    else if (roll < 10) rarity = ItemRarity.Rare;
    else if (roll < 30) rarity = ItemRarity.Magic;

    // 2. Select slot
    const slots = [ItemSlot.Weapon, ItemSlot.Helm, ItemSlot.Armor, ItemSlot.Boots, ItemSlot.Amulet, ItemSlot.Ring];
    const slot = slots[Math.floor(Math.random() * slots.length)];

    let baseName = 'Iron Sword';
    let baseDmg: number | undefined;
    let baseArm: number | undefined;

    switch (slot) {
      case ItemSlot.Weapon:
        baseName = itemLevel > 20 ? 'Runic Greatsword' : 'Steel Broadsword';
        baseDmg = itemLevel * 4 + Math.floor(Math.random() * 10);
        break;
      case ItemSlot.Armor:
        baseName = itemLevel > 20 ? 'Aetherial Plate' : 'Chainmail Tunic';
        baseArm = itemLevel * 3 + Math.floor(Math.random() * 8);
        break;
      case ItemSlot.Helm:
        baseName = 'Iron Visor';
        baseArm = itemLevel * 2;
        break;
      case ItemSlot.Boots:
        baseName = 'Leather Greaves';
        baseArm = itemLevel * 1.5;
        break;
      case ItemSlot.Amulet:
        baseName = 'Star Pendant';
        break;
      case ItemSlot.Ring:
        baseName = 'Gold Band';
        break;
    }

    const stats: Record<string, number> = {};
    let finalName = baseName;

    // Roll affixes based on rarity
    const affixCount = rarity === ItemRarity.Magic ? 1 : rarity === ItemRarity.Rare ? 3 : rarity === ItemRarity.Legendary ? 4 : 0;

    let chosenPrefix: ItemAffix | undefined;
    let chosenSuffix: ItemAffix | undefined;

    if (affixCount >= 1) {
      chosenPrefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
      const val = Math.floor(Math.random() * (chosenPrefix.maxValue - chosenPrefix.minValue) + chosenPrefix.minValue) * (itemLevel * 0.2 + 1);
      stats[chosenPrefix.stat] = (stats[chosenPrefix.stat] || 0) + Math.round(val);
      finalName = `${chosenPrefix.name} ${finalName}`;
    }

    if (affixCount >= 2) {
      chosenSuffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
      const val = Math.floor(Math.random() * (chosenSuffix.maxValue - chosenSuffix.minValue) + chosenSuffix.minValue) * (itemLevel * 0.2 + 1);
      stats[chosenSuffix.stat] = (stats[chosenSuffix.stat] || 0) + Math.round(val);
      finalName = `${finalName} ${chosenSuffix.name}`;
    }

    // Sockets (0 to 3)
    const sockets = rarity >= ItemRarity.Rare && (slot === ItemSlot.Weapon || slot === ItemSlot.Armor) ? Math.floor(Math.random() * 3) : 0;

    return {
      id: Math.random().toString(36).substring(2, 9),
      name: finalName,
      slot,
      rarity,
      itemLevel,
      baseDamage: baseDmg,
      baseArmor: baseArm,
      stats,
      sockets,
    };
  }
}
