/**
 * @file EnchantmentEngine.ts
 * @description Advanced item modification, socket fusing, divine orb re-rolling, and corruption mechanics.
 */

import { ItemRarity, ItemSlot, type GeneratedItem } from '../procgen/LootTableGenerator.ts';

export interface EnchantmentFormula {
  id: string;
  name: string;
  targetSlot: ItemSlot;
  requiredLevel: number;
  statBonus: Record<string, number>;
  glowColor: string;
}

export const ENCHANTMENT_REGISTRY: EnchantmentFormula[] = [
  {
    id: 'ench_1',
    name: 'Lesser Fire Infusion',
    targetSlot: 0,
    requiredLevel: 5,
    statBonus: {
      fireDamage: 8,
    },
    glowColor: '#0084c7',
  },
  {
    id: 'ench_2',
    name: 'Lesser Fire Infusion',
    targetSlot: 1,
    requiredLevel: 5,
    statBonus: {
      fireDamage: 8,
    },
    glowColor: '#0084c7',
  },
  {
    id: 'ench_3',
    name: 'Lesser Fire Infusion',
    targetSlot: 2,
    requiredLevel: 5,
    statBonus: {
      fireDamage: 8,
    },
    glowColor: '#0084c7',
  },
  {
    id: 'ench_4',
    name: 'Lesser Fire Infusion',
    targetSlot: 3,
    requiredLevel: 5,
    statBonus: {
      fireDamage: 8,
    },
    glowColor: '#0084c7',
  },
  {
    id: 'ench_5',
    name: 'Lesser Fire Infusion',
    targetSlot: 4,
    requiredLevel: 5,
    statBonus: {
      fireDamage: 8,
    },
    glowColor: '#0084c7',
  },
  {
    id: 'ench_6',
    name: 'Lesser Fire Infusion',
    targetSlot: 5,
    requiredLevel: 5,
    statBonus: {
      fireDamage: 8,
    },
    glowColor: '#0084c7',
  },
  {
    id: 'ench_7',
    name: 'Lesser Frost Ward',
    targetSlot: 0,
    requiredLevel: 5,
    statBonus: {
      coldResistance: 10,
    },
    glowColor: '#1484c7',
  },
  {
    id: 'ench_8',
    name: 'Lesser Frost Ward',
    targetSlot: 1,
    requiredLevel: 5,
    statBonus: {
      coldResistance: 10,
    },
    glowColor: '#1484c7',
  },
  {
    id: 'ench_9',
    name: 'Lesser Frost Ward',
    targetSlot: 2,
    requiredLevel: 5,
    statBonus: {
      coldResistance: 10,
    },
    glowColor: '#1484c7',
  },
  {
    id: 'ench_10',
    name: 'Lesser Frost Ward',
    targetSlot: 3,
    requiredLevel: 5,
    statBonus: {
      coldResistance: 10,
    },
    glowColor: '#1484c7',
  },
  {
    id: 'ench_11',
    name: 'Lesser Frost Ward',
    targetSlot: 4,
    requiredLevel: 5,
    statBonus: {
      coldResistance: 10,
    },
    glowColor: '#1484c7',
  },
  {
    id: 'ench_12',
    name: 'Lesser Frost Ward',
    targetSlot: 5,
    requiredLevel: 5,
    statBonus: {
      coldResistance: 10,
    },
    glowColor: '#1484c7',
  },
  {
    id: 'ench_13',
    name: 'Lesser Lightning Strike',
    targetSlot: 0,
    requiredLevel: 5,
    statBonus: {
      lightningDamage: 12,
    },
    glowColor: '#2884c7',
  },
  {
    id: 'ench_14',
    name: 'Lesser Lightning Strike',
    targetSlot: 1,
    requiredLevel: 5,
    statBonus: {
      lightningDamage: 12,
    },
    glowColor: '#2884c7',
  },
  {
    id: 'ench_15',
    name: 'Lesser Lightning Strike',
    targetSlot: 2,
    requiredLevel: 5,
    statBonus: {
      lightningDamage: 12,
    },
    glowColor: '#2884c7',
  },
  {
    id: 'ench_16',
    name: 'Lesser Lightning Strike',
    targetSlot: 3,
    requiredLevel: 5,
    statBonus: {
      lightningDamage: 12,
    },
    glowColor: '#2884c7',
  },
  {
    id: 'ench_17',
    name: 'Lesser Lightning Strike',
    targetSlot: 4,
    requiredLevel: 5,
    statBonus: {
      lightningDamage: 12,
    },
    glowColor: '#2884c7',
  },
  {
    id: 'ench_18',
    name: 'Lesser Lightning Strike',
    targetSlot: 5,
    requiredLevel: 5,
    statBonus: {
      lightningDamage: 12,
    },
    glowColor: '#2884c7',
  },
  {
    id: 'ench_19',
    name: 'Lesser Void Veil',
    targetSlot: 0,
    requiredLevel: 5,
    statBonus: {
      voidResistance: 14,
    },
    glowColor: '#3c84c7',
  },
  {
    id: 'ench_20',
    name: 'Lesser Void Veil',
    targetSlot: 1,
    requiredLevel: 5,
    statBonus: {
      voidResistance: 14,
    },
    glowColor: '#3c84c7',
  },
  {
    id: 'ench_21',
    name: 'Lesser Void Veil',
    targetSlot: 2,
    requiredLevel: 5,
    statBonus: {
      voidResistance: 14,
    },
    glowColor: '#3c84c7',
  },
  {
    id: 'ench_22',
    name: 'Lesser Void Veil',
    targetSlot: 3,
    requiredLevel: 5,
    statBonus: {
      voidResistance: 14,
    },
    glowColor: '#3c84c7',
  },
  {
    id: 'ench_23',
    name: 'Lesser Void Veil',
    targetSlot: 4,
    requiredLevel: 5,
    statBonus: {
      voidResistance: 14,
    },
    glowColor: '#3c84c7',
  },
  {
    id: 'ench_24',
    name: 'Lesser Void Veil',
    targetSlot: 5,
    requiredLevel: 5,
    statBonus: {
      voidResistance: 14,
    },
    glowColor: '#3c84c7',
  },
  {
    id: 'ench_25',
    name: 'Lesser Ironhide',
    targetSlot: 0,
    requiredLevel: 5,
    statBonus: {
      armor: 16,
    },
    glowColor: '#5084c7',
  },
  {
    id: 'ench_26',
    name: 'Lesser Ironhide',
    targetSlot: 1,
    requiredLevel: 5,
    statBonus: {
      armor: 16,
    },
    glowColor: '#5084c7',
  },
  {
    id: 'ench_27',
    name: 'Lesser Ironhide',
    targetSlot: 2,
    requiredLevel: 5,
    statBonus: {
      armor: 16,
    },
    glowColor: '#5084c7',
  },
  {
    id: 'ench_28',
    name: 'Lesser Ironhide',
    targetSlot: 3,
    requiredLevel: 5,
    statBonus: {
      armor: 16,
    },
    glowColor: '#5084c7',
  },
  {
    id: 'ench_29',
    name: 'Lesser Ironhide',
    targetSlot: 4,
    requiredLevel: 5,
    statBonus: {
      armor: 16,
    },
    glowColor: '#5084c7',
  },
  {
    id: 'ench_30',
    name: 'Lesser Ironhide',
    targetSlot: 5,
    requiredLevel: 5,
    statBonus: {
      armor: 16,
    },
    glowColor: '#5084c7',
  },
  {
    id: 'ench_31',
    name: 'Lesser Windwalker',
    targetSlot: 0,
    requiredLevel: 5,
    statBonus: {
      moveSpeed: 18,
    },
    glowColor: '#6484c7',
  },
  {
    id: 'ench_32',
    name: 'Lesser Windwalker',
    targetSlot: 1,
    requiredLevel: 5,
    statBonus: {
      moveSpeed: 18,
    },
    glowColor: '#6484c7',
  },
  {
    id: 'ench_33',
    name: 'Lesser Windwalker',
    targetSlot: 2,
    requiredLevel: 5,
    statBonus: {
      moveSpeed: 18,
    },
    glowColor: '#6484c7',
  },
  {
    id: 'ench_34',
    name: 'Lesser Windwalker',
    targetSlot: 3,
    requiredLevel: 5,
    statBonus: {
      moveSpeed: 18,
    },
    glowColor: '#6484c7',
  },
  {
    id: 'ench_35',
    name: 'Lesser Windwalker',
    targetSlot: 4,
    requiredLevel: 5,
    statBonus: {
      moveSpeed: 18,
    },
    glowColor: '#6484c7',
  },
  {
    id: 'ench_36',
    name: 'Lesser Windwalker',
    targetSlot: 5,
    requiredLevel: 5,
    statBonus: {
      moveSpeed: 18,
    },
    glowColor: '#6484c7',
  },
  {
    id: 'ench_37',
    name: 'Lesser Life Essence',
    targetSlot: 0,
    requiredLevel: 5,
    statBonus: {
      vitality: 20,
    },
    glowColor: '#7884c7',
  },
  {
    id: 'ench_38',
    name: 'Lesser Life Essence',
    targetSlot: 1,
    requiredLevel: 5,
    statBonus: {
      vitality: 20,
    },
    glowColor: '#7884c7',
  },
  {
    id: 'ench_39',
    name: 'Lesser Life Essence',
    targetSlot: 2,
    requiredLevel: 5,
    statBonus: {
      vitality: 20,
    },
    glowColor: '#7884c7',
  },
  {
    id: 'ench_40',
    name: 'Lesser Life Essence',
    targetSlot: 3,
    requiredLevel: 5,
    statBonus: {
      vitality: 20,
    },
    glowColor: '#7884c7',
  },
  {
    id: 'ench_41',
    name: 'Lesser Life Essence',
    targetSlot: 4,
    requiredLevel: 5,
    statBonus: {
      vitality: 20,
    },
    glowColor: '#7884c7',
  },
  {
    id: 'ench_42',
    name: 'Lesser Life Essence',
    targetSlot: 5,
    requiredLevel: 5,
    statBonus: {
      vitality: 20,
    },
    glowColor: '#7884c7',
  },
  {
    id: 'ench_43',
    name: 'Lesser Mana Surge',
    targetSlot: 0,
    requiredLevel: 5,
    statBonus: {
      maxMana: 22,
    },
    glowColor: '#8c84c7',
  },
  {
    id: 'ench_44',
    name: 'Lesser Mana Surge',
    targetSlot: 1,
    requiredLevel: 5,
    statBonus: {
      maxMana: 22,
    },
    glowColor: '#8c84c7',
  },
  {
    id: 'ench_45',
    name: 'Lesser Mana Surge',
    targetSlot: 2,
    requiredLevel: 5,
    statBonus: {
      maxMana: 22,
    },
    glowColor: '#8c84c7',
  },
  {
    id: 'ench_46',
    name: 'Lesser Mana Surge',
    targetSlot: 3,
    requiredLevel: 5,
    statBonus: {
      maxMana: 22,
    },
    glowColor: '#8c84c7',
  },
  {
    id: 'ench_47',
    name: 'Lesser Mana Surge',
    targetSlot: 4,
    requiredLevel: 5,
    statBonus: {
      maxMana: 22,
    },
    glowColor: '#8c84c7',
  },
  {
    id: 'ench_48',
    name: 'Lesser Mana Surge',
    targetSlot: 5,
    requiredLevel: 5,
    statBonus: {
      maxMana: 22,
    },
    glowColor: '#8c84c7',
  },
  {
    id: 'ench_49',
    name: 'Lesser Critical Precision',
    targetSlot: 0,
    requiredLevel: 5,
    statBonus: {
      critRate: 24,
    },
    glowColor: '#a084c7',
  },
  {
    id: 'ench_50',
    name: 'Lesser Critical Precision',
    targetSlot: 1,
    requiredLevel: 5,
    statBonus: {
      critRate: 24,
    },
    glowColor: '#a084c7',
  },
  {
    id: 'ench_51',
    name: 'Lesser Critical Precision',
    targetSlot: 2,
    requiredLevel: 5,
    statBonus: {
      critRate: 24,
    },
    glowColor: '#a084c7',
  },
  {
    id: 'ench_52',
    name: 'Lesser Critical Precision',
    targetSlot: 3,
    requiredLevel: 5,
    statBonus: {
      critRate: 24,
    },
    glowColor: '#a084c7',
  },
  {
    id: 'ench_53',
    name: 'Lesser Critical Precision',
    targetSlot: 4,
    requiredLevel: 5,
    statBonus: {
      critRate: 24,
    },
    glowColor: '#a084c7',
  },
  {
    id: 'ench_54',
    name: 'Lesser Critical Precision',
    targetSlot: 5,
    requiredLevel: 5,
    statBonus: {
      critRate: 24,
    },
    glowColor: '#a084c7',
  },
  {
    id: 'ench_55',
    name: 'Lesser Brutal Force',
    targetSlot: 0,
    requiredLevel: 5,
    statBonus: {
      strength: 26,
    },
    glowColor: '#b484c7',
  },
  {
    id: 'ench_56',
    name: 'Lesser Brutal Force',
    targetSlot: 1,
    requiredLevel: 5,
    statBonus: {
      strength: 26,
    },
    glowColor: '#b484c7',
  },
  {
    id: 'ench_57',
    name: 'Lesser Brutal Force',
    targetSlot: 2,
    requiredLevel: 5,
    statBonus: {
      strength: 26,
    },
    glowColor: '#b484c7',
  },
  {
    id: 'ench_58',
    name: 'Lesser Brutal Force',
    targetSlot: 3,
    requiredLevel: 5,
    statBonus: {
      strength: 26,
    },
    glowColor: '#b484c7',
  },
  {
    id: 'ench_59',
    name: 'Lesser Brutal Force',
    targetSlot: 4,
    requiredLevel: 5,
    statBonus: {
      strength: 26,
    },
    glowColor: '#b484c7',
  },
  {
    id: 'ench_60',
    name: 'Lesser Brutal Force',
    targetSlot: 5,
    requiredLevel: 5,
    statBonus: {
      strength: 26,
    },
    glowColor: '#b484c7',
  },
  {
    id: 'ench_61',
    name: 'Greater Fire Infusion',
    targetSlot: 0,
    requiredLevel: 10,
    statBonus: {
      fireDamage: 16,
    },
    glowColor: '#1984c7',
  },
  {
    id: 'ench_62',
    name: 'Greater Fire Infusion',
    targetSlot: 1,
    requiredLevel: 10,
    statBonus: {
      fireDamage: 16,
    },
    glowColor: '#1984c7',
  },
  {
    id: 'ench_63',
    name: 'Greater Fire Infusion',
    targetSlot: 2,
    requiredLevel: 10,
    statBonus: {
      fireDamage: 16,
    },
    glowColor: '#1984c7',
  },
  {
    id: 'ench_64',
    name: 'Greater Fire Infusion',
    targetSlot: 3,
    requiredLevel: 10,
    statBonus: {
      fireDamage: 16,
    },
    glowColor: '#1984c7',
  },
  {
    id: 'ench_65',
    name: 'Greater Fire Infusion',
    targetSlot: 4,
    requiredLevel: 10,
    statBonus: {
      fireDamage: 16,
    },
    glowColor: '#1984c7',
  },
  {
    id: 'ench_66',
    name: 'Greater Fire Infusion',
    targetSlot: 5,
    requiredLevel: 10,
    statBonus: {
      fireDamage: 16,
    },
    glowColor: '#1984c7',
  },
  {
    id: 'ench_67',
    name: 'Greater Frost Ward',
    targetSlot: 0,
    requiredLevel: 10,
    statBonus: {
      coldResistance: 18,
    },
    glowColor: '#2d84c7',
  },
  {
    id: 'ench_68',
    name: 'Greater Frost Ward',
    targetSlot: 1,
    requiredLevel: 10,
    statBonus: {
      coldResistance: 18,
    },
    glowColor: '#2d84c7',
  },
  {
    id: 'ench_69',
    name: 'Greater Frost Ward',
    targetSlot: 2,
    requiredLevel: 10,
    statBonus: {
      coldResistance: 18,
    },
    glowColor: '#2d84c7',
  },
  {
    id: 'ench_70',
    name: 'Greater Frost Ward',
    targetSlot: 3,
    requiredLevel: 10,
    statBonus: {
      coldResistance: 18,
    },
    glowColor: '#2d84c7',
  },
  {
    id: 'ench_71',
    name: 'Greater Frost Ward',
    targetSlot: 4,
    requiredLevel: 10,
    statBonus: {
      coldResistance: 18,
    },
    glowColor: '#2d84c7',
  },
  {
    id: 'ench_72',
    name: 'Greater Frost Ward',
    targetSlot: 5,
    requiredLevel: 10,
    statBonus: {
      coldResistance: 18,
    },
    glowColor: '#2d84c7',
  },
  {
    id: 'ench_73',
    name: 'Greater Lightning Strike',
    targetSlot: 0,
    requiredLevel: 10,
    statBonus: {
      lightningDamage: 20,
    },
    glowColor: '#4184c7',
  },
  {
    id: 'ench_74',
    name: 'Greater Lightning Strike',
    targetSlot: 1,
    requiredLevel: 10,
    statBonus: {
      lightningDamage: 20,
    },
    glowColor: '#4184c7',
  },
  {
    id: 'ench_75',
    name: 'Greater Lightning Strike',
    targetSlot: 2,
    requiredLevel: 10,
    statBonus: {
      lightningDamage: 20,
    },
    glowColor: '#4184c7',
  },
  {
    id: 'ench_76',
    name: 'Greater Lightning Strike',
    targetSlot: 3,
    requiredLevel: 10,
    statBonus: {
      lightningDamage: 20,
    },
    glowColor: '#4184c7',
  },
  {
    id: 'ench_77',
    name: 'Greater Lightning Strike',
    targetSlot: 4,
    requiredLevel: 10,
    statBonus: {
      lightningDamage: 20,
    },
    glowColor: '#4184c7',
  },
  {
    id: 'ench_78',
    name: 'Greater Lightning Strike',
    targetSlot: 5,
    requiredLevel: 10,
    statBonus: {
      lightningDamage: 20,
    },
    glowColor: '#4184c7',
  },
  {
    id: 'ench_79',
    name: 'Greater Void Veil',
    targetSlot: 0,
    requiredLevel: 10,
    statBonus: {
      voidResistance: 22,
    },
    glowColor: '#5584c7',
  },
  {
    id: 'ench_80',
    name: 'Greater Void Veil',
    targetSlot: 1,
    requiredLevel: 10,
    statBonus: {
      voidResistance: 22,
    },
    glowColor: '#5584c7',
  },
  {
    id: 'ench_81',
    name: 'Greater Void Veil',
    targetSlot: 2,
    requiredLevel: 10,
    statBonus: {
      voidResistance: 22,
    },
    glowColor: '#5584c7',
  },
  {
    id: 'ench_82',
    name: 'Greater Void Veil',
    targetSlot: 3,
    requiredLevel: 10,
    statBonus: {
      voidResistance: 22,
    },
    glowColor: '#5584c7',
  },
  {
    id: 'ench_83',
    name: 'Greater Void Veil',
    targetSlot: 4,
    requiredLevel: 10,
    statBonus: {
      voidResistance: 22,
    },
    glowColor: '#5584c7',
  },
  {
    id: 'ench_84',
    name: 'Greater Void Veil',
    targetSlot: 5,
    requiredLevel: 10,
    statBonus: {
      voidResistance: 22,
    },
    glowColor: '#5584c7',
  },
  {
    id: 'ench_85',
    name: 'Greater Ironhide',
    targetSlot: 0,
    requiredLevel: 10,
    statBonus: {
      armor: 24,
    },
    glowColor: '#6984c7',
  },
  {
    id: 'ench_86',
    name: 'Greater Ironhide',
    targetSlot: 1,
    requiredLevel: 10,
    statBonus: {
      armor: 24,
    },
    glowColor: '#6984c7',
  },
  {
    id: 'ench_87',
    name: 'Greater Ironhide',
    targetSlot: 2,
    requiredLevel: 10,
    statBonus: {
      armor: 24,
    },
    glowColor: '#6984c7',
  },
  {
    id: 'ench_88',
    name: 'Greater Ironhide',
    targetSlot: 3,
    requiredLevel: 10,
    statBonus: {
      armor: 24,
    },
    glowColor: '#6984c7',
  },
  {
    id: 'ench_89',
    name: 'Greater Ironhide',
    targetSlot: 4,
    requiredLevel: 10,
    statBonus: {
      armor: 24,
    },
    glowColor: '#6984c7',
  },
  {
    id: 'ench_90',
    name: 'Greater Ironhide',
    targetSlot: 5,
    requiredLevel: 10,
    statBonus: {
      armor: 24,
    },
    glowColor: '#6984c7',
  },
  {
    id: 'ench_91',
    name: 'Greater Windwalker',
    targetSlot: 0,
    requiredLevel: 10,
    statBonus: {
      moveSpeed: 26,
    },
    glowColor: '#7d84c7',
  },
  {
    id: 'ench_92',
    name: 'Greater Windwalker',
    targetSlot: 1,
    requiredLevel: 10,
    statBonus: {
      moveSpeed: 26,
    },
    glowColor: '#7d84c7',
  },
  {
    id: 'ench_93',
    name: 'Greater Windwalker',
    targetSlot: 2,
    requiredLevel: 10,
    statBonus: {
      moveSpeed: 26,
    },
    glowColor: '#7d84c7',
  },
  {
    id: 'ench_94',
    name: 'Greater Windwalker',
    targetSlot: 3,
    requiredLevel: 10,
    statBonus: {
      moveSpeed: 26,
    },
    glowColor: '#7d84c7',
  },
  {
    id: 'ench_95',
    name: 'Greater Windwalker',
    targetSlot: 4,
    requiredLevel: 10,
    statBonus: {
      moveSpeed: 26,
    },
    glowColor: '#7d84c7',
  },
  {
    id: 'ench_96',
    name: 'Greater Windwalker',
    targetSlot: 5,
    requiredLevel: 10,
    statBonus: {
      moveSpeed: 26,
    },
    glowColor: '#7d84c7',
  },
  {
    id: 'ench_97',
    name: 'Greater Life Essence',
    targetSlot: 0,
    requiredLevel: 10,
    statBonus: {
      vitality: 28,
    },
    glowColor: '#9184c7',
  },
  {
    id: 'ench_98',
    name: 'Greater Life Essence',
    targetSlot: 1,
    requiredLevel: 10,
    statBonus: {
      vitality: 28,
    },
    glowColor: '#9184c7',
  },
  {
    id: 'ench_99',
    name: 'Greater Life Essence',
    targetSlot: 2,
    requiredLevel: 10,
    statBonus: {
      vitality: 28,
    },
    glowColor: '#9184c7',
  },
  {
    id: 'ench_100',
    name: 'Greater Life Essence',
    targetSlot: 3,
    requiredLevel: 10,
    statBonus: {
      vitality: 28,
    },
    glowColor: '#9184c7',
  },
  {
    id: 'ench_101',
    name: 'Greater Life Essence',
    targetSlot: 4,
    requiredLevel: 10,
    statBonus: {
      vitality: 28,
    },
    glowColor: '#9184c7',
  },
  {
    id: 'ench_102',
    name: 'Greater Life Essence',
    targetSlot: 5,
    requiredLevel: 10,
    statBonus: {
      vitality: 28,
    },
    glowColor: '#9184c7',
  },
  {
    id: 'ench_103',
    name: 'Greater Mana Surge',
    targetSlot: 0,
    requiredLevel: 10,
    statBonus: {
      maxMana: 30,
    },
    glowColor: '#a584c7',
  },
  {
    id: 'ench_104',
    name: 'Greater Mana Surge',
    targetSlot: 1,
    requiredLevel: 10,
    statBonus: {
      maxMana: 30,
    },
    glowColor: '#a584c7',
  },
  {
    id: 'ench_105',
    name: 'Greater Mana Surge',
    targetSlot: 2,
    requiredLevel: 10,
    statBonus: {
      maxMana: 30,
    },
    glowColor: '#a584c7',
  },
  {
    id: 'ench_106',
    name: 'Greater Mana Surge',
    targetSlot: 3,
    requiredLevel: 10,
    statBonus: {
      maxMana: 30,
    },
    glowColor: '#a584c7',
  },
  {
    id: 'ench_107',
    name: 'Greater Mana Surge',
    targetSlot: 4,
    requiredLevel: 10,
    statBonus: {
      maxMana: 30,
    },
    glowColor: '#a584c7',
  },
  {
    id: 'ench_108',
    name: 'Greater Mana Surge',
    targetSlot: 5,
    requiredLevel: 10,
    statBonus: {
      maxMana: 30,
    },
    glowColor: '#a584c7',
  },
  {
    id: 'ench_109',
    name: 'Greater Critical Precision',
    targetSlot: 0,
    requiredLevel: 10,
    statBonus: {
      critRate: 32,
    },
    glowColor: '#b984c7',
  },
  {
    id: 'ench_110',
    name: 'Greater Critical Precision',
    targetSlot: 1,
    requiredLevel: 10,
    statBonus: {
      critRate: 32,
    },
    glowColor: '#b984c7',
  },
  {
    id: 'ench_111',
    name: 'Greater Critical Precision',
    targetSlot: 2,
    requiredLevel: 10,
    statBonus: {
      critRate: 32,
    },
    glowColor: '#b984c7',
  },
  {
    id: 'ench_112',
    name: 'Greater Critical Precision',
    targetSlot: 3,
    requiredLevel: 10,
    statBonus: {
      critRate: 32,
    },
    glowColor: '#b984c7',
  },
  {
    id: 'ench_113',
    name: 'Greater Critical Precision',
    targetSlot: 4,
    requiredLevel: 10,
    statBonus: {
      critRate: 32,
    },
    glowColor: '#b984c7',
  },
  {
    id: 'ench_114',
    name: 'Greater Critical Precision',
    targetSlot: 5,
    requiredLevel: 10,
    statBonus: {
      critRate: 32,
    },
    glowColor: '#b984c7',
  },
  {
    id: 'ench_115',
    name: 'Greater Brutal Force',
    targetSlot: 0,
    requiredLevel: 10,
    statBonus: {
      strength: 34,
    },
    glowColor: '#cd84c7',
  },
  {
    id: 'ench_116',
    name: 'Greater Brutal Force',
    targetSlot: 1,
    requiredLevel: 10,
    statBonus: {
      strength: 34,
    },
    glowColor: '#cd84c7',
  },
  {
    id: 'ench_117',
    name: 'Greater Brutal Force',
    targetSlot: 2,
    requiredLevel: 10,
    statBonus: {
      strength: 34,
    },
    glowColor: '#cd84c7',
  },
  {
    id: 'ench_118',
    name: 'Greater Brutal Force',
    targetSlot: 3,
    requiredLevel: 10,
    statBonus: {
      strength: 34,
    },
    glowColor: '#cd84c7',
  },
  {
    id: 'ench_119',
    name: 'Greater Brutal Force',
    targetSlot: 4,
    requiredLevel: 10,
    statBonus: {
      strength: 34,
    },
    glowColor: '#cd84c7',
  },
  {
    id: 'ench_120',
    name: 'Greater Brutal Force',
    targetSlot: 5,
    requiredLevel: 10,
    statBonus: {
      strength: 34,
    },
    glowColor: '#cd84c7',
  },
  {
    id: 'ench_121',
    name: 'Grand Fire Infusion',
    targetSlot: 0,
    requiredLevel: 15,
    statBonus: {
      fireDamage: 24,
    },
    glowColor: '#3284c7',
  },
  {
    id: 'ench_122',
    name: 'Grand Fire Infusion',
    targetSlot: 1,
    requiredLevel: 15,
    statBonus: {
      fireDamage: 24,
    },
    glowColor: '#3284c7',
  },
  {
    id: 'ench_123',
    name: 'Grand Fire Infusion',
    targetSlot: 2,
    requiredLevel: 15,
    statBonus: {
      fireDamage: 24,
    },
    glowColor: '#3284c7',
  },
  {
    id: 'ench_124',
    name: 'Grand Fire Infusion',
    targetSlot: 3,
    requiredLevel: 15,
    statBonus: {
      fireDamage: 24,
    },
    glowColor: '#3284c7',
  },
  {
    id: 'ench_125',
    name: 'Grand Fire Infusion',
    targetSlot: 4,
    requiredLevel: 15,
    statBonus: {
      fireDamage: 24,
    },
    glowColor: '#3284c7',
  },
  {
    id: 'ench_126',
    name: 'Grand Fire Infusion',
    targetSlot: 5,
    requiredLevel: 15,
    statBonus: {
      fireDamage: 24,
    },
    glowColor: '#3284c7',
  },
  {
    id: 'ench_127',
    name: 'Grand Frost Ward',
    targetSlot: 0,
    requiredLevel: 15,
    statBonus: {
      coldResistance: 26,
    },
    glowColor: '#4684c7',
  },
  {
    id: 'ench_128',
    name: 'Grand Frost Ward',
    targetSlot: 1,
    requiredLevel: 15,
    statBonus: {
      coldResistance: 26,
    },
    glowColor: '#4684c7',
  },
  {
    id: 'ench_129',
    name: 'Grand Frost Ward',
    targetSlot: 2,
    requiredLevel: 15,
    statBonus: {
      coldResistance: 26,
    },
    glowColor: '#4684c7',
  },
  {
    id: 'ench_130',
    name: 'Grand Frost Ward',
    targetSlot: 3,
    requiredLevel: 15,
    statBonus: {
      coldResistance: 26,
    },
    glowColor: '#4684c7',
  },
  {
    id: 'ench_131',
    name: 'Grand Frost Ward',
    targetSlot: 4,
    requiredLevel: 15,
    statBonus: {
      coldResistance: 26,
    },
    glowColor: '#4684c7',
  },
  {
    id: 'ench_132',
    name: 'Grand Frost Ward',
    targetSlot: 5,
    requiredLevel: 15,
    statBonus: {
      coldResistance: 26,
    },
    glowColor: '#4684c7',
  },
  {
    id: 'ench_133',
    name: 'Grand Lightning Strike',
    targetSlot: 0,
    requiredLevel: 15,
    statBonus: {
      lightningDamage: 28,
    },
    glowColor: '#5a84c7',
  },
  {
    id: 'ench_134',
    name: 'Grand Lightning Strike',
    targetSlot: 1,
    requiredLevel: 15,
    statBonus: {
      lightningDamage: 28,
    },
    glowColor: '#5a84c7',
  },
  {
    id: 'ench_135',
    name: 'Grand Lightning Strike',
    targetSlot: 2,
    requiredLevel: 15,
    statBonus: {
      lightningDamage: 28,
    },
    glowColor: '#5a84c7',
  },
  {
    id: 'ench_136',
    name: 'Grand Lightning Strike',
    targetSlot: 3,
    requiredLevel: 15,
    statBonus: {
      lightningDamage: 28,
    },
    glowColor: '#5a84c7',
  },
  {
    id: 'ench_137',
    name: 'Grand Lightning Strike',
    targetSlot: 4,
    requiredLevel: 15,
    statBonus: {
      lightningDamage: 28,
    },
    glowColor: '#5a84c7',
  },
  {
    id: 'ench_138',
    name: 'Grand Lightning Strike',
    targetSlot: 5,
    requiredLevel: 15,
    statBonus: {
      lightningDamage: 28,
    },
    glowColor: '#5a84c7',
  },
  {
    id: 'ench_139',
    name: 'Grand Void Veil',
    targetSlot: 0,
    requiredLevel: 15,
    statBonus: {
      voidResistance: 30,
    },
    glowColor: '#6e84c7',
  },
  {
    id: 'ench_140',
    name: 'Grand Void Veil',
    targetSlot: 1,
    requiredLevel: 15,
    statBonus: {
      voidResistance: 30,
    },
    glowColor: '#6e84c7',
  },
  {
    id: 'ench_141',
    name: 'Grand Void Veil',
    targetSlot: 2,
    requiredLevel: 15,
    statBonus: {
      voidResistance: 30,
    },
    glowColor: '#6e84c7',
  },
  {
    id: 'ench_142',
    name: 'Grand Void Veil',
    targetSlot: 3,
    requiredLevel: 15,
    statBonus: {
      voidResistance: 30,
    },
    glowColor: '#6e84c7',
  },
  {
    id: 'ench_143',
    name: 'Grand Void Veil',
    targetSlot: 4,
    requiredLevel: 15,
    statBonus: {
      voidResistance: 30,
    },
    glowColor: '#6e84c7',
  },
  {
    id: 'ench_144',
    name: 'Grand Void Veil',
    targetSlot: 5,
    requiredLevel: 15,
    statBonus: {
      voidResistance: 30,
    },
    glowColor: '#6e84c7',
  },
  {
    id: 'ench_145',
    name: 'Grand Ironhide',
    targetSlot: 0,
    requiredLevel: 15,
    statBonus: {
      armor: 32,
    },
    glowColor: '#8284c7',
  },
  {
    id: 'ench_146',
    name: 'Grand Ironhide',
    targetSlot: 1,
    requiredLevel: 15,
    statBonus: {
      armor: 32,
    },
    glowColor: '#8284c7',
  },
  {
    id: 'ench_147',
    name: 'Grand Ironhide',
    targetSlot: 2,
    requiredLevel: 15,
    statBonus: {
      armor: 32,
    },
    glowColor: '#8284c7',
  },
  {
    id: 'ench_148',
    name: 'Grand Ironhide',
    targetSlot: 3,
    requiredLevel: 15,
    statBonus: {
      armor: 32,
    },
    glowColor: '#8284c7',
  },
  {
    id: 'ench_149',
    name: 'Grand Ironhide',
    targetSlot: 4,
    requiredLevel: 15,
    statBonus: {
      armor: 32,
    },
    glowColor: '#8284c7',
  },
  {
    id: 'ench_150',
    name: 'Grand Ironhide',
    targetSlot: 5,
    requiredLevel: 15,
    statBonus: {
      armor: 32,
    },
    glowColor: '#8284c7',
  },
  {
    id: 'ench_151',
    name: 'Grand Windwalker',
    targetSlot: 0,
    requiredLevel: 15,
    statBonus: {
      moveSpeed: 34,
    },
    glowColor: '#9684c7',
  },
  {
    id: 'ench_152',
    name: 'Grand Windwalker',
    targetSlot: 1,
    requiredLevel: 15,
    statBonus: {
      moveSpeed: 34,
    },
    glowColor: '#9684c7',
  },
  {
    id: 'ench_153',
    name: 'Grand Windwalker',
    targetSlot: 2,
    requiredLevel: 15,
    statBonus: {
      moveSpeed: 34,
    },
    glowColor: '#9684c7',
  },
  {
    id: 'ench_154',
    name: 'Grand Windwalker',
    targetSlot: 3,
    requiredLevel: 15,
    statBonus: {
      moveSpeed: 34,
    },
    glowColor: '#9684c7',
  },
  {
    id: 'ench_155',
    name: 'Grand Windwalker',
    targetSlot: 4,
    requiredLevel: 15,
    statBonus: {
      moveSpeed: 34,
    },
    glowColor: '#9684c7',
  },
  {
    id: 'ench_156',
    name: 'Grand Windwalker',
    targetSlot: 5,
    requiredLevel: 15,
    statBonus: {
      moveSpeed: 34,
    },
    glowColor: '#9684c7',
  },
  {
    id: 'ench_157',
    name: 'Grand Life Essence',
    targetSlot: 0,
    requiredLevel: 15,
    statBonus: {
      vitality: 36,
    },
    glowColor: '#aa84c7',
  },
  {
    id: 'ench_158',
    name: 'Grand Life Essence',
    targetSlot: 1,
    requiredLevel: 15,
    statBonus: {
      vitality: 36,
    },
    glowColor: '#aa84c7',
  },
  {
    id: 'ench_159',
    name: 'Grand Life Essence',
    targetSlot: 2,
    requiredLevel: 15,
    statBonus: {
      vitality: 36,
    },
    glowColor: '#aa84c7',
  },
  {
    id: 'ench_160',
    name: 'Grand Life Essence',
    targetSlot: 3,
    requiredLevel: 15,
    statBonus: {
      vitality: 36,
    },
    glowColor: '#aa84c7',
  },
  {
    id: 'ench_161',
    name: 'Grand Life Essence',
    targetSlot: 4,
    requiredLevel: 15,
    statBonus: {
      vitality: 36,
    },
    glowColor: '#aa84c7',
  },
  {
    id: 'ench_162',
    name: 'Grand Life Essence',
    targetSlot: 5,
    requiredLevel: 15,
    statBonus: {
      vitality: 36,
    },
    glowColor: '#aa84c7',
  },
  {
    id: 'ench_163',
    name: 'Grand Mana Surge',
    targetSlot: 0,
    requiredLevel: 15,
    statBonus: {
      maxMana: 38,
    },
    glowColor: '#be84c7',
  },
  {
    id: 'ench_164',
    name: 'Grand Mana Surge',
    targetSlot: 1,
    requiredLevel: 15,
    statBonus: {
      maxMana: 38,
    },
    glowColor: '#be84c7',
  },
  {
    id: 'ench_165',
    name: 'Grand Mana Surge',
    targetSlot: 2,
    requiredLevel: 15,
    statBonus: {
      maxMana: 38,
    },
    glowColor: '#be84c7',
  },
  {
    id: 'ench_166',
    name: 'Grand Mana Surge',
    targetSlot: 3,
    requiredLevel: 15,
    statBonus: {
      maxMana: 38,
    },
    glowColor: '#be84c7',
  },
  {
    id: 'ench_167',
    name: 'Grand Mana Surge',
    targetSlot: 4,
    requiredLevel: 15,
    statBonus: {
      maxMana: 38,
    },
    glowColor: '#be84c7',
  },
  {
    id: 'ench_168',
    name: 'Grand Mana Surge',
    targetSlot: 5,
    requiredLevel: 15,
    statBonus: {
      maxMana: 38,
    },
    glowColor: '#be84c7',
  },
  {
    id: 'ench_169',
    name: 'Grand Critical Precision',
    targetSlot: 0,
    requiredLevel: 15,
    statBonus: {
      critRate: 40,
    },
    glowColor: '#d284c7',
  },
  {
    id: 'ench_170',
    name: 'Grand Critical Precision',
    targetSlot: 1,
    requiredLevel: 15,
    statBonus: {
      critRate: 40,
    },
    glowColor: '#d284c7',
  },
  {
    id: 'ench_171',
    name: 'Grand Critical Precision',
    targetSlot: 2,
    requiredLevel: 15,
    statBonus: {
      critRate: 40,
    },
    glowColor: '#d284c7',
  },
  {
    id: 'ench_172',
    name: 'Grand Critical Precision',
    targetSlot: 3,
    requiredLevel: 15,
    statBonus: {
      critRate: 40,
    },
    glowColor: '#d284c7',
  },
  {
    id: 'ench_173',
    name: 'Grand Critical Precision',
    targetSlot: 4,
    requiredLevel: 15,
    statBonus: {
      critRate: 40,
    },
    glowColor: '#d284c7',
  },
  {
    id: 'ench_174',
    name: 'Grand Critical Precision',
    targetSlot: 5,
    requiredLevel: 15,
    statBonus: {
      critRate: 40,
    },
    glowColor: '#d284c7',
  },
  {
    id: 'ench_175',
    name: 'Grand Brutal Force',
    targetSlot: 0,
    requiredLevel: 15,
    statBonus: {
      strength: 42,
    },
    glowColor: '#e684c7',
  },
  {
    id: 'ench_176',
    name: 'Grand Brutal Force',
    targetSlot: 1,
    requiredLevel: 15,
    statBonus: {
      strength: 42,
    },
    glowColor: '#e684c7',
  },
  {
    id: 'ench_177',
    name: 'Grand Brutal Force',
    targetSlot: 2,
    requiredLevel: 15,
    statBonus: {
      strength: 42,
    },
    glowColor: '#e684c7',
  },
  {
    id: 'ench_178',
    name: 'Grand Brutal Force',
    targetSlot: 3,
    requiredLevel: 15,
    statBonus: {
      strength: 42,
    },
    glowColor: '#e684c7',
  },
  {
    id: 'ench_179',
    name: 'Grand Brutal Force',
    targetSlot: 4,
    requiredLevel: 15,
    statBonus: {
      strength: 42,
    },
    glowColor: '#e684c7',
  },
  {
    id: 'ench_180',
    name: 'Grand Brutal Force',
    targetSlot: 5,
    requiredLevel: 15,
    statBonus: {
      strength: 42,
    },
    glowColor: '#e684c7',
  },
  {
    id: 'ench_181',
    name: 'Flawless Fire Infusion',
    targetSlot: 0,
    requiredLevel: 20,
    statBonus: {
      fireDamage: 32,
    },
    glowColor: '#4b84c7',
  },
  {
    id: 'ench_182',
    name: 'Flawless Fire Infusion',
    targetSlot: 1,
    requiredLevel: 20,
    statBonus: {
      fireDamage: 32,
    },
    glowColor: '#4b84c7',
  },
  {
    id: 'ench_183',
    name: 'Flawless Fire Infusion',
    targetSlot: 2,
    requiredLevel: 20,
    statBonus: {
      fireDamage: 32,
    },
    glowColor: '#4b84c7',
  },
  {
    id: 'ench_184',
    name: 'Flawless Fire Infusion',
    targetSlot: 3,
    requiredLevel: 20,
    statBonus: {
      fireDamage: 32,
    },
    glowColor: '#4b84c7',
  },
  {
    id: 'ench_185',
    name: 'Flawless Fire Infusion',
    targetSlot: 4,
    requiredLevel: 20,
    statBonus: {
      fireDamage: 32,
    },
    glowColor: '#4b84c7',
  },
  {
    id: 'ench_186',
    name: 'Flawless Fire Infusion',
    targetSlot: 5,
    requiredLevel: 20,
    statBonus: {
      fireDamage: 32,
    },
    glowColor: '#4b84c7',
  },
  {
    id: 'ench_187',
    name: 'Flawless Frost Ward',
    targetSlot: 0,
    requiredLevel: 20,
    statBonus: {
      coldResistance: 34,
    },
    glowColor: '#5f84c7',
  },
  {
    id: 'ench_188',
    name: 'Flawless Frost Ward',
    targetSlot: 1,
    requiredLevel: 20,
    statBonus: {
      coldResistance: 34,
    },
    glowColor: '#5f84c7',
  },
  {
    id: 'ench_189',
    name: 'Flawless Frost Ward',
    targetSlot: 2,
    requiredLevel: 20,
    statBonus: {
      coldResistance: 34,
    },
    glowColor: '#5f84c7',
  },
  {
    id: 'ench_190',
    name: 'Flawless Frost Ward',
    targetSlot: 3,
    requiredLevel: 20,
    statBonus: {
      coldResistance: 34,
    },
    glowColor: '#5f84c7',
  },
  {
    id: 'ench_191',
    name: 'Flawless Frost Ward',
    targetSlot: 4,
    requiredLevel: 20,
    statBonus: {
      coldResistance: 34,
    },
    glowColor: '#5f84c7',
  },
  {
    id: 'ench_192',
    name: 'Flawless Frost Ward',
    targetSlot: 5,
    requiredLevel: 20,
    statBonus: {
      coldResistance: 34,
    },
    glowColor: '#5f84c7',
  },
  {
    id: 'ench_193',
    name: 'Flawless Lightning Strike',
    targetSlot: 0,
    requiredLevel: 20,
    statBonus: {
      lightningDamage: 36,
    },
    glowColor: '#7384c7',
  },
  {
    id: 'ench_194',
    name: 'Flawless Lightning Strike',
    targetSlot: 1,
    requiredLevel: 20,
    statBonus: {
      lightningDamage: 36,
    },
    glowColor: '#7384c7',
  },
  {
    id: 'ench_195',
    name: 'Flawless Lightning Strike',
    targetSlot: 2,
    requiredLevel: 20,
    statBonus: {
      lightningDamage: 36,
    },
    glowColor: '#7384c7',
  },
  {
    id: 'ench_196',
    name: 'Flawless Lightning Strike',
    targetSlot: 3,
    requiredLevel: 20,
    statBonus: {
      lightningDamage: 36,
    },
    glowColor: '#7384c7',
  },
  {
    id: 'ench_197',
    name: 'Flawless Lightning Strike',
    targetSlot: 4,
    requiredLevel: 20,
    statBonus: {
      lightningDamage: 36,
    },
    glowColor: '#7384c7',
  },
  {
    id: 'ench_198',
    name: 'Flawless Lightning Strike',
    targetSlot: 5,
    requiredLevel: 20,
    statBonus: {
      lightningDamage: 36,
    },
    glowColor: '#7384c7',
  },
  {
    id: 'ench_199',
    name: 'Flawless Void Veil',
    targetSlot: 0,
    requiredLevel: 20,
    statBonus: {
      voidResistance: 38,
    },
    glowColor: '#8784c7',
  },
  {
    id: 'ench_200',
    name: 'Flawless Void Veil',
    targetSlot: 1,
    requiredLevel: 20,
    statBonus: {
      voidResistance: 38,
    },
    glowColor: '#8784c7',
  },
  {
    id: 'ench_201',
    name: 'Flawless Void Veil',
    targetSlot: 2,
    requiredLevel: 20,
    statBonus: {
      voidResistance: 38,
    },
    glowColor: '#8784c7',
  },
  {
    id: 'ench_202',
    name: 'Flawless Void Veil',
    targetSlot: 3,
    requiredLevel: 20,
    statBonus: {
      voidResistance: 38,
    },
    glowColor: '#8784c7',
  },
  {
    id: 'ench_203',
    name: 'Flawless Void Veil',
    targetSlot: 4,
    requiredLevel: 20,
    statBonus: {
      voidResistance: 38,
    },
    glowColor: '#8784c7',
  },
  {
    id: 'ench_204',
    name: 'Flawless Void Veil',
    targetSlot: 5,
    requiredLevel: 20,
    statBonus: {
      voidResistance: 38,
    },
    glowColor: '#8784c7',
  },
  {
    id: 'ench_205',
    name: 'Flawless Ironhide',
    targetSlot: 0,
    requiredLevel: 20,
    statBonus: {
      armor: 40,
    },
    glowColor: '#9b84c7',
  },
  {
    id: 'ench_206',
    name: 'Flawless Ironhide',
    targetSlot: 1,
    requiredLevel: 20,
    statBonus: {
      armor: 40,
    },
    glowColor: '#9b84c7',
  },
  {
    id: 'ench_207',
    name: 'Flawless Ironhide',
    targetSlot: 2,
    requiredLevel: 20,
    statBonus: {
      armor: 40,
    },
    glowColor: '#9b84c7',
  },
  {
    id: 'ench_208',
    name: 'Flawless Ironhide',
    targetSlot: 3,
    requiredLevel: 20,
    statBonus: {
      armor: 40,
    },
    glowColor: '#9b84c7',
  },
  {
    id: 'ench_209',
    name: 'Flawless Ironhide',
    targetSlot: 4,
    requiredLevel: 20,
    statBonus: {
      armor: 40,
    },
    glowColor: '#9b84c7',
  },
  {
    id: 'ench_210',
    name: 'Flawless Ironhide',
    targetSlot: 5,
    requiredLevel: 20,
    statBonus: {
      armor: 40,
    },
    glowColor: '#9b84c7',
  },
  {
    id: 'ench_211',
    name: 'Flawless Windwalker',
    targetSlot: 0,
    requiredLevel: 20,
    statBonus: {
      moveSpeed: 42,
    },
    glowColor: '#af84c7',
  },
  {
    id: 'ench_212',
    name: 'Flawless Windwalker',
    targetSlot: 1,
    requiredLevel: 20,
    statBonus: {
      moveSpeed: 42,
    },
    glowColor: '#af84c7',
  },
  {
    id: 'ench_213',
    name: 'Flawless Windwalker',
    targetSlot: 2,
    requiredLevel: 20,
    statBonus: {
      moveSpeed: 42,
    },
    glowColor: '#af84c7',
  },
  {
    id: 'ench_214',
    name: 'Flawless Windwalker',
    targetSlot: 3,
    requiredLevel: 20,
    statBonus: {
      moveSpeed: 42,
    },
    glowColor: '#af84c7',
  },
  {
    id: 'ench_215',
    name: 'Flawless Windwalker',
    targetSlot: 4,
    requiredLevel: 20,
    statBonus: {
      moveSpeed: 42,
    },
    glowColor: '#af84c7',
  },
  {
    id: 'ench_216',
    name: 'Flawless Windwalker',
    targetSlot: 5,
    requiredLevel: 20,
    statBonus: {
      moveSpeed: 42,
    },
    glowColor: '#af84c7',
  },
  {
    id: 'ench_217',
    name: 'Flawless Life Essence',
    targetSlot: 0,
    requiredLevel: 20,
    statBonus: {
      vitality: 44,
    },
    glowColor: '#c384c7',
  },
  {
    id: 'ench_218',
    name: 'Flawless Life Essence',
    targetSlot: 1,
    requiredLevel: 20,
    statBonus: {
      vitality: 44,
    },
    glowColor: '#c384c7',
  },
  {
    id: 'ench_219',
    name: 'Flawless Life Essence',
    targetSlot: 2,
    requiredLevel: 20,
    statBonus: {
      vitality: 44,
    },
    glowColor: '#c384c7',
  },
  {
    id: 'ench_220',
    name: 'Flawless Life Essence',
    targetSlot: 3,
    requiredLevel: 20,
    statBonus: {
      vitality: 44,
    },
    glowColor: '#c384c7',
  },
  {
    id: 'ench_221',
    name: 'Flawless Life Essence',
    targetSlot: 4,
    requiredLevel: 20,
    statBonus: {
      vitality: 44,
    },
    glowColor: '#c384c7',
  },
  {
    id: 'ench_222',
    name: 'Flawless Life Essence',
    targetSlot: 5,
    requiredLevel: 20,
    statBonus: {
      vitality: 44,
    },
    glowColor: '#c384c7',
  },
  {
    id: 'ench_223',
    name: 'Flawless Mana Surge',
    targetSlot: 0,
    requiredLevel: 20,
    statBonus: {
      maxMana: 46,
    },
    glowColor: '#d784c7',
  },
  {
    id: 'ench_224',
    name: 'Flawless Mana Surge',
    targetSlot: 1,
    requiredLevel: 20,
    statBonus: {
      maxMana: 46,
    },
    glowColor: '#d784c7',
  },
  {
    id: 'ench_225',
    name: 'Flawless Mana Surge',
    targetSlot: 2,
    requiredLevel: 20,
    statBonus: {
      maxMana: 46,
    },
    glowColor: '#d784c7',
  },
  {
    id: 'ench_226',
    name: 'Flawless Mana Surge',
    targetSlot: 3,
    requiredLevel: 20,
    statBonus: {
      maxMana: 46,
    },
    glowColor: '#d784c7',
  },
  {
    id: 'ench_227',
    name: 'Flawless Mana Surge',
    targetSlot: 4,
    requiredLevel: 20,
    statBonus: {
      maxMana: 46,
    },
    glowColor: '#d784c7',
  },
  {
    id: 'ench_228',
    name: 'Flawless Mana Surge',
    targetSlot: 5,
    requiredLevel: 20,
    statBonus: {
      maxMana: 46,
    },
    glowColor: '#d784c7',
  },
  {
    id: 'ench_229',
    name: 'Flawless Critical Precision',
    targetSlot: 0,
    requiredLevel: 20,
    statBonus: {
      critRate: 48,
    },
    glowColor: '#eb84c7',
  },
  {
    id: 'ench_230',
    name: 'Flawless Critical Precision',
    targetSlot: 1,
    requiredLevel: 20,
    statBonus: {
      critRate: 48,
    },
    glowColor: '#eb84c7',
  },
  {
    id: 'ench_231',
    name: 'Flawless Critical Precision',
    targetSlot: 2,
    requiredLevel: 20,
    statBonus: {
      critRate: 48,
    },
    glowColor: '#eb84c7',
  },
  {
    id: 'ench_232',
    name: 'Flawless Critical Precision',
    targetSlot: 3,
    requiredLevel: 20,
    statBonus: {
      critRate: 48,
    },
    glowColor: '#eb84c7',
  },
  {
    id: 'ench_233',
    name: 'Flawless Critical Precision',
    targetSlot: 4,
    requiredLevel: 20,
    statBonus: {
      critRate: 48,
    },
    glowColor: '#eb84c7',
  },
  {
    id: 'ench_234',
    name: 'Flawless Critical Precision',
    targetSlot: 5,
    requiredLevel: 20,
    statBonus: {
      critRate: 48,
    },
    glowColor: '#eb84c7',
  },
  {
    id: 'ench_235',
    name: 'Flawless Brutal Force',
    targetSlot: 0,
    requiredLevel: 20,
    statBonus: {
      strength: 50,
    },
    glowColor: '#0084c7',
  },
  {
    id: 'ench_236',
    name: 'Flawless Brutal Force',
    targetSlot: 1,
    requiredLevel: 20,
    statBonus: {
      strength: 50,
    },
    glowColor: '#0084c7',
  },
  {
    id: 'ench_237',
    name: 'Flawless Brutal Force',
    targetSlot: 2,
    requiredLevel: 20,
    statBonus: {
      strength: 50,
    },
    glowColor: '#0084c7',
  },
  {
    id: 'ench_238',
    name: 'Flawless Brutal Force',
    targetSlot: 3,
    requiredLevel: 20,
    statBonus: {
      strength: 50,
    },
    glowColor: '#0084c7',
  },
  {
    id: 'ench_239',
    name: 'Flawless Brutal Force',
    targetSlot: 4,
    requiredLevel: 20,
    statBonus: {
      strength: 50,
    },
    glowColor: '#0084c7',
  },
  {
    id: 'ench_240',
    name: 'Flawless Brutal Force',
    targetSlot: 5,
    requiredLevel: 20,
    statBonus: {
      strength: 50,
    },
    glowColor: '#0084c7',
  },
  {
    id: 'ench_241',
    name: 'Ancestral Fire Infusion',
    targetSlot: 0,
    requiredLevel: 25,
    statBonus: {
      fireDamage: 40,
    },
    glowColor: '#6484c7',
  },
  {
    id: 'ench_242',
    name: 'Ancestral Fire Infusion',
    targetSlot: 1,
    requiredLevel: 25,
    statBonus: {
      fireDamage: 40,
    },
    glowColor: '#6484c7',
  },
  {
    id: 'ench_243',
    name: 'Ancestral Fire Infusion',
    targetSlot: 2,
    requiredLevel: 25,
    statBonus: {
      fireDamage: 40,
    },
    glowColor: '#6484c7',
  },
  {
    id: 'ench_244',
    name: 'Ancestral Fire Infusion',
    targetSlot: 3,
    requiredLevel: 25,
    statBonus: {
      fireDamage: 40,
    },
    glowColor: '#6484c7',
  },
  {
    id: 'ench_245',
    name: 'Ancestral Fire Infusion',
    targetSlot: 4,
    requiredLevel: 25,
    statBonus: {
      fireDamage: 40,
    },
    glowColor: '#6484c7',
  },
  {
    id: 'ench_246',
    name: 'Ancestral Fire Infusion',
    targetSlot: 5,
    requiredLevel: 25,
    statBonus: {
      fireDamage: 40,
    },
    glowColor: '#6484c7',
  },
  {
    id: 'ench_247',
    name: 'Ancestral Frost Ward',
    targetSlot: 0,
    requiredLevel: 25,
    statBonus: {
      coldResistance: 42,
    },
    glowColor: '#7884c7',
  },
  {
    id: 'ench_248',
    name: 'Ancestral Frost Ward',
    targetSlot: 1,
    requiredLevel: 25,
    statBonus: {
      coldResistance: 42,
    },
    glowColor: '#7884c7',
  },
  {
    id: 'ench_249',
    name: 'Ancestral Frost Ward',
    targetSlot: 2,
    requiredLevel: 25,
    statBonus: {
      coldResistance: 42,
    },
    glowColor: '#7884c7',
  },
  {
    id: 'ench_250',
    name: 'Ancestral Frost Ward',
    targetSlot: 3,
    requiredLevel: 25,
    statBonus: {
      coldResistance: 42,
    },
    glowColor: '#7884c7',
  },
  {
    id: 'ench_251',
    name: 'Ancestral Frost Ward',
    targetSlot: 4,
    requiredLevel: 25,
    statBonus: {
      coldResistance: 42,
    },
    glowColor: '#7884c7',
  },
  {
    id: 'ench_252',
    name: 'Ancestral Frost Ward',
    targetSlot: 5,
    requiredLevel: 25,
    statBonus: {
      coldResistance: 42,
    },
    glowColor: '#7884c7',
  },
  {
    id: 'ench_253',
    name: 'Ancestral Lightning Strike',
    targetSlot: 0,
    requiredLevel: 25,
    statBonus: {
      lightningDamage: 44,
    },
    glowColor: '#8c84c7',
  },
  {
    id: 'ench_254',
    name: 'Ancestral Lightning Strike',
    targetSlot: 1,
    requiredLevel: 25,
    statBonus: {
      lightningDamage: 44,
    },
    glowColor: '#8c84c7',
  },
  {
    id: 'ench_255',
    name: 'Ancestral Lightning Strike',
    targetSlot: 2,
    requiredLevel: 25,
    statBonus: {
      lightningDamage: 44,
    },
    glowColor: '#8c84c7',
  },
  {
    id: 'ench_256',
    name: 'Ancestral Lightning Strike',
    targetSlot: 3,
    requiredLevel: 25,
    statBonus: {
      lightningDamage: 44,
    },
    glowColor: '#8c84c7',
  },
  {
    id: 'ench_257',
    name: 'Ancestral Lightning Strike',
    targetSlot: 4,
    requiredLevel: 25,
    statBonus: {
      lightningDamage: 44,
    },
    glowColor: '#8c84c7',
  },
  {
    id: 'ench_258',
    name: 'Ancestral Lightning Strike',
    targetSlot: 5,
    requiredLevel: 25,
    statBonus: {
      lightningDamage: 44,
    },
    glowColor: '#8c84c7',
  },
  {
    id: 'ench_259',
    name: 'Ancestral Void Veil',
    targetSlot: 0,
    requiredLevel: 25,
    statBonus: {
      voidResistance: 46,
    },
    glowColor: '#a084c7',
  },
  {
    id: 'ench_260',
    name: 'Ancestral Void Veil',
    targetSlot: 1,
    requiredLevel: 25,
    statBonus: {
      voidResistance: 46,
    },
    glowColor: '#a084c7',
  },
  {
    id: 'ench_261',
    name: 'Ancestral Void Veil',
    targetSlot: 2,
    requiredLevel: 25,
    statBonus: {
      voidResistance: 46,
    },
    glowColor: '#a084c7',
  },
  {
    id: 'ench_262',
    name: 'Ancestral Void Veil',
    targetSlot: 3,
    requiredLevel: 25,
    statBonus: {
      voidResistance: 46,
    },
    glowColor: '#a084c7',
  },
  {
    id: 'ench_263',
    name: 'Ancestral Void Veil',
    targetSlot: 4,
    requiredLevel: 25,
    statBonus: {
      voidResistance: 46,
    },
    glowColor: '#a084c7',
  },
  {
    id: 'ench_264',
    name: 'Ancestral Void Veil',
    targetSlot: 5,
    requiredLevel: 25,
    statBonus: {
      voidResistance: 46,
    },
    glowColor: '#a084c7',
  },
  {
    id: 'ench_265',
    name: 'Ancestral Ironhide',
    targetSlot: 0,
    requiredLevel: 25,
    statBonus: {
      armor: 48,
    },
    glowColor: '#b484c7',
  },
  {
    id: 'ench_266',
    name: 'Ancestral Ironhide',
    targetSlot: 1,
    requiredLevel: 25,
    statBonus: {
      armor: 48,
    },
    glowColor: '#b484c7',
  },
  {
    id: 'ench_267',
    name: 'Ancestral Ironhide',
    targetSlot: 2,
    requiredLevel: 25,
    statBonus: {
      armor: 48,
    },
    glowColor: '#b484c7',
  },
  {
    id: 'ench_268',
    name: 'Ancestral Ironhide',
    targetSlot: 3,
    requiredLevel: 25,
    statBonus: {
      armor: 48,
    },
    glowColor: '#b484c7',
  },
  {
    id: 'ench_269',
    name: 'Ancestral Ironhide',
    targetSlot: 4,
    requiredLevel: 25,
    statBonus: {
      armor: 48,
    },
    glowColor: '#b484c7',
  },
  {
    id: 'ench_270',
    name: 'Ancestral Ironhide',
    targetSlot: 5,
    requiredLevel: 25,
    statBonus: {
      armor: 48,
    },
    glowColor: '#b484c7',
  },
  {
    id: 'ench_271',
    name: 'Ancestral Windwalker',
    targetSlot: 0,
    requiredLevel: 25,
    statBonus: {
      moveSpeed: 50,
    },
    glowColor: '#c884c7',
  },
  {
    id: 'ench_272',
    name: 'Ancestral Windwalker',
    targetSlot: 1,
    requiredLevel: 25,
    statBonus: {
      moveSpeed: 50,
    },
    glowColor: '#c884c7',
  },
  {
    id: 'ench_273',
    name: 'Ancestral Windwalker',
    targetSlot: 2,
    requiredLevel: 25,
    statBonus: {
      moveSpeed: 50,
    },
    glowColor: '#c884c7',
  },
  {
    id: 'ench_274',
    name: 'Ancestral Windwalker',
    targetSlot: 3,
    requiredLevel: 25,
    statBonus: {
      moveSpeed: 50,
    },
    glowColor: '#c884c7',
  },
  {
    id: 'ench_275',
    name: 'Ancestral Windwalker',
    targetSlot: 4,
    requiredLevel: 25,
    statBonus: {
      moveSpeed: 50,
    },
    glowColor: '#c884c7',
  },
  {
    id: 'ench_276',
    name: 'Ancestral Windwalker',
    targetSlot: 5,
    requiredLevel: 25,
    statBonus: {
      moveSpeed: 50,
    },
    glowColor: '#c884c7',
  },
  {
    id: 'ench_277',
    name: 'Ancestral Life Essence',
    targetSlot: 0,
    requiredLevel: 25,
    statBonus: {
      vitality: 52,
    },
    glowColor: '#dc84c7',
  },
  {
    id: 'ench_278',
    name: 'Ancestral Life Essence',
    targetSlot: 1,
    requiredLevel: 25,
    statBonus: {
      vitality: 52,
    },
    glowColor: '#dc84c7',
  },
  {
    id: 'ench_279',
    name: 'Ancestral Life Essence',
    targetSlot: 2,
    requiredLevel: 25,
    statBonus: {
      vitality: 52,
    },
    glowColor: '#dc84c7',
  },
  {
    id: 'ench_280',
    name: 'Ancestral Life Essence',
    targetSlot: 3,
    requiredLevel: 25,
    statBonus: {
      vitality: 52,
    },
    glowColor: '#dc84c7',
  },
  {
    id: 'ench_281',
    name: 'Ancestral Life Essence',
    targetSlot: 4,
    requiredLevel: 25,
    statBonus: {
      vitality: 52,
    },
    glowColor: '#dc84c7',
  },
  {
    id: 'ench_282',
    name: 'Ancestral Life Essence',
    targetSlot: 5,
    requiredLevel: 25,
    statBonus: {
      vitality: 52,
    },
    glowColor: '#dc84c7',
  },
  {
    id: 'ench_283',
    name: 'Ancestral Mana Surge',
    targetSlot: 0,
    requiredLevel: 25,
    statBonus: {
      maxMana: 54,
    },
    glowColor: '#f084c7',
  },
  {
    id: 'ench_284',
    name: 'Ancestral Mana Surge',
    targetSlot: 1,
    requiredLevel: 25,
    statBonus: {
      maxMana: 54,
    },
    glowColor: '#f084c7',
  },
  {
    id: 'ench_285',
    name: 'Ancestral Mana Surge',
    targetSlot: 2,
    requiredLevel: 25,
    statBonus: {
      maxMana: 54,
    },
    glowColor: '#f084c7',
  },
  {
    id: 'ench_286',
    name: 'Ancestral Mana Surge',
    targetSlot: 3,
    requiredLevel: 25,
    statBonus: {
      maxMana: 54,
    },
    glowColor: '#f084c7',
  },
  {
    id: 'ench_287',
    name: 'Ancestral Mana Surge',
    targetSlot: 4,
    requiredLevel: 25,
    statBonus: {
      maxMana: 54,
    },
    glowColor: '#f084c7',
  },
  {
    id: 'ench_288',
    name: 'Ancestral Mana Surge',
    targetSlot: 5,
    requiredLevel: 25,
    statBonus: {
      maxMana: 54,
    },
    glowColor: '#f084c7',
  },
  {
    id: 'ench_289',
    name: 'Ancestral Critical Precision',
    targetSlot: 0,
    requiredLevel: 25,
    statBonus: {
      critRate: 56,
    },
    glowColor: '#0584c7',
  },
  {
    id: 'ench_290',
    name: 'Ancestral Critical Precision',
    targetSlot: 1,
    requiredLevel: 25,
    statBonus: {
      critRate: 56,
    },
    glowColor: '#0584c7',
  },
  {
    id: 'ench_291',
    name: 'Ancestral Critical Precision',
    targetSlot: 2,
    requiredLevel: 25,
    statBonus: {
      critRate: 56,
    },
    glowColor: '#0584c7',
  },
  {
    id: 'ench_292',
    name: 'Ancestral Critical Precision',
    targetSlot: 3,
    requiredLevel: 25,
    statBonus: {
      critRate: 56,
    },
    glowColor: '#0584c7',
  },
  {
    id: 'ench_293',
    name: 'Ancestral Critical Precision',
    targetSlot: 4,
    requiredLevel: 25,
    statBonus: {
      critRate: 56,
    },
    glowColor: '#0584c7',
  },
  {
    id: 'ench_294',
    name: 'Ancestral Critical Precision',
    targetSlot: 5,
    requiredLevel: 25,
    statBonus: {
      critRate: 56,
    },
    glowColor: '#0584c7',
  },
  {
    id: 'ench_295',
    name: 'Ancestral Brutal Force',
    targetSlot: 0,
    requiredLevel: 25,
    statBonus: {
      strength: 58,
    },
    glowColor: '#1984c7',
  },
  {
    id: 'ench_296',
    name: 'Ancestral Brutal Force',
    targetSlot: 1,
    requiredLevel: 25,
    statBonus: {
      strength: 58,
    },
    glowColor: '#1984c7',
  },
  {
    id: 'ench_297',
    name: 'Ancestral Brutal Force',
    targetSlot: 2,
    requiredLevel: 25,
    statBonus: {
      strength: 58,
    },
    glowColor: '#1984c7',
  },
  {
    id: 'ench_298',
    name: 'Ancestral Brutal Force',
    targetSlot: 3,
    requiredLevel: 25,
    statBonus: {
      strength: 58,
    },
    glowColor: '#1984c7',
  },
  {
    id: 'ench_299',
    name: 'Ancestral Brutal Force',
    targetSlot: 4,
    requiredLevel: 25,
    statBonus: {
      strength: 58,
    },
    glowColor: '#1984c7',
  },
  {
    id: 'ench_300',
    name: 'Ancestral Brutal Force',
    targetSlot: 5,
    requiredLevel: 25,
    statBonus: {
      strength: 58,
    },
    glowColor: '#1984c7',
  },
  {
    id: 'ench_301',
    name: 'Mythic Fire Infusion',
    targetSlot: 0,
    requiredLevel: 30,
    statBonus: {
      fireDamage: 48,
    },
    glowColor: '#7d84c7',
  },
  {
    id: 'ench_302',
    name: 'Mythic Fire Infusion',
    targetSlot: 1,
    requiredLevel: 30,
    statBonus: {
      fireDamage: 48,
    },
    glowColor: '#7d84c7',
  },
  {
    id: 'ench_303',
    name: 'Mythic Fire Infusion',
    targetSlot: 2,
    requiredLevel: 30,
    statBonus: {
      fireDamage: 48,
    },
    glowColor: '#7d84c7',
  },
  {
    id: 'ench_304',
    name: 'Mythic Fire Infusion',
    targetSlot: 3,
    requiredLevel: 30,
    statBonus: {
      fireDamage: 48,
    },
    glowColor: '#7d84c7',
  },
  {
    id: 'ench_305',
    name: 'Mythic Fire Infusion',
    targetSlot: 4,
    requiredLevel: 30,
    statBonus: {
      fireDamage: 48,
    },
    glowColor: '#7d84c7',
  },
  {
    id: 'ench_306',
    name: 'Mythic Fire Infusion',
    targetSlot: 5,
    requiredLevel: 30,
    statBonus: {
      fireDamage: 48,
    },
    glowColor: '#7d84c7',
  },
  {
    id: 'ench_307',
    name: 'Mythic Frost Ward',
    targetSlot: 0,
    requiredLevel: 30,
    statBonus: {
      coldResistance: 50,
    },
    glowColor: '#9184c7',
  },
  {
    id: 'ench_308',
    name: 'Mythic Frost Ward',
    targetSlot: 1,
    requiredLevel: 30,
    statBonus: {
      coldResistance: 50,
    },
    glowColor: '#9184c7',
  },
  {
    id: 'ench_309',
    name: 'Mythic Frost Ward',
    targetSlot: 2,
    requiredLevel: 30,
    statBonus: {
      coldResistance: 50,
    },
    glowColor: '#9184c7',
  },
  {
    id: 'ench_310',
    name: 'Mythic Frost Ward',
    targetSlot: 3,
    requiredLevel: 30,
    statBonus: {
      coldResistance: 50,
    },
    glowColor: '#9184c7',
  },
  {
    id: 'ench_311',
    name: 'Mythic Frost Ward',
    targetSlot: 4,
    requiredLevel: 30,
    statBonus: {
      coldResistance: 50,
    },
    glowColor: '#9184c7',
  },
  {
    id: 'ench_312',
    name: 'Mythic Frost Ward',
    targetSlot: 5,
    requiredLevel: 30,
    statBonus: {
      coldResistance: 50,
    },
    glowColor: '#9184c7',
  },
  {
    id: 'ench_313',
    name: 'Mythic Lightning Strike',
    targetSlot: 0,
    requiredLevel: 30,
    statBonus: {
      lightningDamage: 52,
    },
    glowColor: '#a584c7',
  },
  {
    id: 'ench_314',
    name: 'Mythic Lightning Strike',
    targetSlot: 1,
    requiredLevel: 30,
    statBonus: {
      lightningDamage: 52,
    },
    glowColor: '#a584c7',
  },
  {
    id: 'ench_315',
    name: 'Mythic Lightning Strike',
    targetSlot: 2,
    requiredLevel: 30,
    statBonus: {
      lightningDamage: 52,
    },
    glowColor: '#a584c7',
  },
  {
    id: 'ench_316',
    name: 'Mythic Lightning Strike',
    targetSlot: 3,
    requiredLevel: 30,
    statBonus: {
      lightningDamage: 52,
    },
    glowColor: '#a584c7',
  },
  {
    id: 'ench_317',
    name: 'Mythic Lightning Strike',
    targetSlot: 4,
    requiredLevel: 30,
    statBonus: {
      lightningDamage: 52,
    },
    glowColor: '#a584c7',
  },
  {
    id: 'ench_318',
    name: 'Mythic Lightning Strike',
    targetSlot: 5,
    requiredLevel: 30,
    statBonus: {
      lightningDamage: 52,
    },
    glowColor: '#a584c7',
  },
  {
    id: 'ench_319',
    name: 'Mythic Void Veil',
    targetSlot: 0,
    requiredLevel: 30,
    statBonus: {
      voidResistance: 54,
    },
    glowColor: '#b984c7',
  },
  {
    id: 'ench_320',
    name: 'Mythic Void Veil',
    targetSlot: 1,
    requiredLevel: 30,
    statBonus: {
      voidResistance: 54,
    },
    glowColor: '#b984c7',
  },
  {
    id: 'ench_321',
    name: 'Mythic Void Veil',
    targetSlot: 2,
    requiredLevel: 30,
    statBonus: {
      voidResistance: 54,
    },
    glowColor: '#b984c7',
  },
  {
    id: 'ench_322',
    name: 'Mythic Void Veil',
    targetSlot: 3,
    requiredLevel: 30,
    statBonus: {
      voidResistance: 54,
    },
    glowColor: '#b984c7',
  },
  {
    id: 'ench_323',
    name: 'Mythic Void Veil',
    targetSlot: 4,
    requiredLevel: 30,
    statBonus: {
      voidResistance: 54,
    },
    glowColor: '#b984c7',
  },
  {
    id: 'ench_324',
    name: 'Mythic Void Veil',
    targetSlot: 5,
    requiredLevel: 30,
    statBonus: {
      voidResistance: 54,
    },
    glowColor: '#b984c7',
  },
  {
    id: 'ench_325',
    name: 'Mythic Ironhide',
    targetSlot: 0,
    requiredLevel: 30,
    statBonus: {
      armor: 56,
    },
    glowColor: '#cd84c7',
  },
  {
    id: 'ench_326',
    name: 'Mythic Ironhide',
    targetSlot: 1,
    requiredLevel: 30,
    statBonus: {
      armor: 56,
    },
    glowColor: '#cd84c7',
  },
  {
    id: 'ench_327',
    name: 'Mythic Ironhide',
    targetSlot: 2,
    requiredLevel: 30,
    statBonus: {
      armor: 56,
    },
    glowColor: '#cd84c7',
  },
  {
    id: 'ench_328',
    name: 'Mythic Ironhide',
    targetSlot: 3,
    requiredLevel: 30,
    statBonus: {
      armor: 56,
    },
    glowColor: '#cd84c7',
  },
  {
    id: 'ench_329',
    name: 'Mythic Ironhide',
    targetSlot: 4,
    requiredLevel: 30,
    statBonus: {
      armor: 56,
    },
    glowColor: '#cd84c7',
  },
  {
    id: 'ench_330',
    name: 'Mythic Ironhide',
    targetSlot: 5,
    requiredLevel: 30,
    statBonus: {
      armor: 56,
    },
    glowColor: '#cd84c7',
  },
  {
    id: 'ench_331',
    name: 'Mythic Windwalker',
    targetSlot: 0,
    requiredLevel: 30,
    statBonus: {
      moveSpeed: 58,
    },
    glowColor: '#e184c7',
  },
  {
    id: 'ench_332',
    name: 'Mythic Windwalker',
    targetSlot: 1,
    requiredLevel: 30,
    statBonus: {
      moveSpeed: 58,
    },
    glowColor: '#e184c7',
  },
  {
    id: 'ench_333',
    name: 'Mythic Windwalker',
    targetSlot: 2,
    requiredLevel: 30,
    statBonus: {
      moveSpeed: 58,
    },
    glowColor: '#e184c7',
  },
  {
    id: 'ench_334',
    name: 'Mythic Windwalker',
    targetSlot: 3,
    requiredLevel: 30,
    statBonus: {
      moveSpeed: 58,
    },
    glowColor: '#e184c7',
  },
  {
    id: 'ench_335',
    name: 'Mythic Windwalker',
    targetSlot: 4,
    requiredLevel: 30,
    statBonus: {
      moveSpeed: 58,
    },
    glowColor: '#e184c7',
  },
  {
    id: 'ench_336',
    name: 'Mythic Windwalker',
    targetSlot: 5,
    requiredLevel: 30,
    statBonus: {
      moveSpeed: 58,
    },
    glowColor: '#e184c7',
  },
  {
    id: 'ench_337',
    name: 'Mythic Life Essence',
    targetSlot: 0,
    requiredLevel: 30,
    statBonus: {
      vitality: 60,
    },
    glowColor: '#f584c7',
  },
  {
    id: 'ench_338',
    name: 'Mythic Life Essence',
    targetSlot: 1,
    requiredLevel: 30,
    statBonus: {
      vitality: 60,
    },
    glowColor: '#f584c7',
  },
  {
    id: 'ench_339',
    name: 'Mythic Life Essence',
    targetSlot: 2,
    requiredLevel: 30,
    statBonus: {
      vitality: 60,
    },
    glowColor: '#f584c7',
  },
  {
    id: 'ench_340',
    name: 'Mythic Life Essence',
    targetSlot: 3,
    requiredLevel: 30,
    statBonus: {
      vitality: 60,
    },
    glowColor: '#f584c7',
  },
  {
    id: 'ench_341',
    name: 'Mythic Life Essence',
    targetSlot: 4,
    requiredLevel: 30,
    statBonus: {
      vitality: 60,
    },
    glowColor: '#f584c7',
  },
  {
    id: 'ench_342',
    name: 'Mythic Life Essence',
    targetSlot: 5,
    requiredLevel: 30,
    statBonus: {
      vitality: 60,
    },
    glowColor: '#f584c7',
  },
  {
    id: 'ench_343',
    name: 'Mythic Mana Surge',
    targetSlot: 0,
    requiredLevel: 30,
    statBonus: {
      maxMana: 62,
    },
    glowColor: '#0a84c7',
  },
  {
    id: 'ench_344',
    name: 'Mythic Mana Surge',
    targetSlot: 1,
    requiredLevel: 30,
    statBonus: {
      maxMana: 62,
    },
    glowColor: '#0a84c7',
  },
  {
    id: 'ench_345',
    name: 'Mythic Mana Surge',
    targetSlot: 2,
    requiredLevel: 30,
    statBonus: {
      maxMana: 62,
    },
    glowColor: '#0a84c7',
  },
  {
    id: 'ench_346',
    name: 'Mythic Mana Surge',
    targetSlot: 3,
    requiredLevel: 30,
    statBonus: {
      maxMana: 62,
    },
    glowColor: '#0a84c7',
  },
  {
    id: 'ench_347',
    name: 'Mythic Mana Surge',
    targetSlot: 4,
    requiredLevel: 30,
    statBonus: {
      maxMana: 62,
    },
    glowColor: '#0a84c7',
  },
  {
    id: 'ench_348',
    name: 'Mythic Mana Surge',
    targetSlot: 5,
    requiredLevel: 30,
    statBonus: {
      maxMana: 62,
    },
    glowColor: '#0a84c7',
  },
  {
    id: 'ench_349',
    name: 'Mythic Critical Precision',
    targetSlot: 0,
    requiredLevel: 30,
    statBonus: {
      critRate: 64,
    },
    glowColor: '#1e84c7',
  },
  {
    id: 'ench_350',
    name: 'Mythic Critical Precision',
    targetSlot: 1,
    requiredLevel: 30,
    statBonus: {
      critRate: 64,
    },
    glowColor: '#1e84c7',
  },
  {
    id: 'ench_351',
    name: 'Mythic Critical Precision',
    targetSlot: 2,
    requiredLevel: 30,
    statBonus: {
      critRate: 64,
    },
    glowColor: '#1e84c7',
  },
  {
    id: 'ench_352',
    name: 'Mythic Critical Precision',
    targetSlot: 3,
    requiredLevel: 30,
    statBonus: {
      critRate: 64,
    },
    glowColor: '#1e84c7',
  },
  {
    id: 'ench_353',
    name: 'Mythic Critical Precision',
    targetSlot: 4,
    requiredLevel: 30,
    statBonus: {
      critRate: 64,
    },
    glowColor: '#1e84c7',
  },
  {
    id: 'ench_354',
    name: 'Mythic Critical Precision',
    targetSlot: 5,
    requiredLevel: 30,
    statBonus: {
      critRate: 64,
    },
    glowColor: '#1e84c7',
  },
  {
    id: 'ench_355',
    name: 'Mythic Brutal Force',
    targetSlot: 0,
    requiredLevel: 30,
    statBonus: {
      strength: 66,
    },
    glowColor: '#3284c7',
  },
  {
    id: 'ench_356',
    name: 'Mythic Brutal Force',
    targetSlot: 1,
    requiredLevel: 30,
    statBonus: {
      strength: 66,
    },
    glowColor: '#3284c7',
  },
  {
    id: 'ench_357',
    name: 'Mythic Brutal Force',
    targetSlot: 2,
    requiredLevel: 30,
    statBonus: {
      strength: 66,
    },
    glowColor: '#3284c7',
  },
  {
    id: 'ench_358',
    name: 'Mythic Brutal Force',
    targetSlot: 3,
    requiredLevel: 30,
    statBonus: {
      strength: 66,
    },
    glowColor: '#3284c7',
  },
  {
    id: 'ench_359',
    name: 'Mythic Brutal Force',
    targetSlot: 4,
    requiredLevel: 30,
    statBonus: {
      strength: 66,
    },
    glowColor: '#3284c7',
  },
  {
    id: 'ench_360',
    name: 'Mythic Brutal Force',
    targetSlot: 5,
    requiredLevel: 30,
    statBonus: {
      strength: 66,
    },
    glowColor: '#3284c7',
  },
  {
    id: 'ench_361',
    name: 'Eternal Fire Infusion',
    targetSlot: 0,
    requiredLevel: 35,
    statBonus: {
      fireDamage: 56,
    },
    glowColor: '#9684c7',
  },
  {
    id: 'ench_362',
    name: 'Eternal Fire Infusion',
    targetSlot: 1,
    requiredLevel: 35,
    statBonus: {
      fireDamage: 56,
    },
    glowColor: '#9684c7',
  },
  {
    id: 'ench_363',
    name: 'Eternal Fire Infusion',
    targetSlot: 2,
    requiredLevel: 35,
    statBonus: {
      fireDamage: 56,
    },
    glowColor: '#9684c7',
  },
  {
    id: 'ench_364',
    name: 'Eternal Fire Infusion',
    targetSlot: 3,
    requiredLevel: 35,
    statBonus: {
      fireDamage: 56,
    },
    glowColor: '#9684c7',
  },
  {
    id: 'ench_365',
    name: 'Eternal Fire Infusion',
    targetSlot: 4,
    requiredLevel: 35,
    statBonus: {
      fireDamage: 56,
    },
    glowColor: '#9684c7',
  },
  {
    id: 'ench_366',
    name: 'Eternal Fire Infusion',
    targetSlot: 5,
    requiredLevel: 35,
    statBonus: {
      fireDamage: 56,
    },
    glowColor: '#9684c7',
  },
  {
    id: 'ench_367',
    name: 'Eternal Frost Ward',
    targetSlot: 0,
    requiredLevel: 35,
    statBonus: {
      coldResistance: 58,
    },
    glowColor: '#aa84c7',
  },
  {
    id: 'ench_368',
    name: 'Eternal Frost Ward',
    targetSlot: 1,
    requiredLevel: 35,
    statBonus: {
      coldResistance: 58,
    },
    glowColor: '#aa84c7',
  },
  {
    id: 'ench_369',
    name: 'Eternal Frost Ward',
    targetSlot: 2,
    requiredLevel: 35,
    statBonus: {
      coldResistance: 58,
    },
    glowColor: '#aa84c7',
  },
  {
    id: 'ench_370',
    name: 'Eternal Frost Ward',
    targetSlot: 3,
    requiredLevel: 35,
    statBonus: {
      coldResistance: 58,
    },
    glowColor: '#aa84c7',
  },
  {
    id: 'ench_371',
    name: 'Eternal Frost Ward',
    targetSlot: 4,
    requiredLevel: 35,
    statBonus: {
      coldResistance: 58,
    },
    glowColor: '#aa84c7',
  },
  {
    id: 'ench_372',
    name: 'Eternal Frost Ward',
    targetSlot: 5,
    requiredLevel: 35,
    statBonus: {
      coldResistance: 58,
    },
    glowColor: '#aa84c7',
  },
  {
    id: 'ench_373',
    name: 'Eternal Lightning Strike',
    targetSlot: 0,
    requiredLevel: 35,
    statBonus: {
      lightningDamage: 60,
    },
    glowColor: '#be84c7',
  },
  {
    id: 'ench_374',
    name: 'Eternal Lightning Strike',
    targetSlot: 1,
    requiredLevel: 35,
    statBonus: {
      lightningDamage: 60,
    },
    glowColor: '#be84c7',
  },
  {
    id: 'ench_375',
    name: 'Eternal Lightning Strike',
    targetSlot: 2,
    requiredLevel: 35,
    statBonus: {
      lightningDamage: 60,
    },
    glowColor: '#be84c7',
  },
  {
    id: 'ench_376',
    name: 'Eternal Lightning Strike',
    targetSlot: 3,
    requiredLevel: 35,
    statBonus: {
      lightningDamage: 60,
    },
    glowColor: '#be84c7',
  },
  {
    id: 'ench_377',
    name: 'Eternal Lightning Strike',
    targetSlot: 4,
    requiredLevel: 35,
    statBonus: {
      lightningDamage: 60,
    },
    glowColor: '#be84c7',
  },
  {
    id: 'ench_378',
    name: 'Eternal Lightning Strike',
    targetSlot: 5,
    requiredLevel: 35,
    statBonus: {
      lightningDamage: 60,
    },
    glowColor: '#be84c7',
  },
  {
    id: 'ench_379',
    name: 'Eternal Void Veil',
    targetSlot: 0,
    requiredLevel: 35,
    statBonus: {
      voidResistance: 62,
    },
    glowColor: '#d284c7',
  },
  {
    id: 'ench_380',
    name: 'Eternal Void Veil',
    targetSlot: 1,
    requiredLevel: 35,
    statBonus: {
      voidResistance: 62,
    },
    glowColor: '#d284c7',
  },
  {
    id: 'ench_381',
    name: 'Eternal Void Veil',
    targetSlot: 2,
    requiredLevel: 35,
    statBonus: {
      voidResistance: 62,
    },
    glowColor: '#d284c7',
  },
  {
    id: 'ench_382',
    name: 'Eternal Void Veil',
    targetSlot: 3,
    requiredLevel: 35,
    statBonus: {
      voidResistance: 62,
    },
    glowColor: '#d284c7',
  },
  {
    id: 'ench_383',
    name: 'Eternal Void Veil',
    targetSlot: 4,
    requiredLevel: 35,
    statBonus: {
      voidResistance: 62,
    },
    glowColor: '#d284c7',
  },
  {
    id: 'ench_384',
    name: 'Eternal Void Veil',
    targetSlot: 5,
    requiredLevel: 35,
    statBonus: {
      voidResistance: 62,
    },
    glowColor: '#d284c7',
  },
  {
    id: 'ench_385',
    name: 'Eternal Ironhide',
    targetSlot: 0,
    requiredLevel: 35,
    statBonus: {
      armor: 64,
    },
    glowColor: '#e684c7',
  },
  {
    id: 'ench_386',
    name: 'Eternal Ironhide',
    targetSlot: 1,
    requiredLevel: 35,
    statBonus: {
      armor: 64,
    },
    glowColor: '#e684c7',
  },
  {
    id: 'ench_387',
    name: 'Eternal Ironhide',
    targetSlot: 2,
    requiredLevel: 35,
    statBonus: {
      armor: 64,
    },
    glowColor: '#e684c7',
  },
  {
    id: 'ench_388',
    name: 'Eternal Ironhide',
    targetSlot: 3,
    requiredLevel: 35,
    statBonus: {
      armor: 64,
    },
    glowColor: '#e684c7',
  },
  {
    id: 'ench_389',
    name: 'Eternal Ironhide',
    targetSlot: 4,
    requiredLevel: 35,
    statBonus: {
      armor: 64,
    },
    glowColor: '#e684c7',
  },
  {
    id: 'ench_390',
    name: 'Eternal Ironhide',
    targetSlot: 5,
    requiredLevel: 35,
    statBonus: {
      armor: 64,
    },
    glowColor: '#e684c7',
  },
  {
    id: 'ench_391',
    name: 'Eternal Windwalker',
    targetSlot: 0,
    requiredLevel: 35,
    statBonus: {
      moveSpeed: 66,
    },
    glowColor: '#fa84c7',
  },
  {
    id: 'ench_392',
    name: 'Eternal Windwalker',
    targetSlot: 1,
    requiredLevel: 35,
    statBonus: {
      moveSpeed: 66,
    },
    glowColor: '#fa84c7',
  },
  {
    id: 'ench_393',
    name: 'Eternal Windwalker',
    targetSlot: 2,
    requiredLevel: 35,
    statBonus: {
      moveSpeed: 66,
    },
    glowColor: '#fa84c7',
  },
  {
    id: 'ench_394',
    name: 'Eternal Windwalker',
    targetSlot: 3,
    requiredLevel: 35,
    statBonus: {
      moveSpeed: 66,
    },
    glowColor: '#fa84c7',
  },
  {
    id: 'ench_395',
    name: 'Eternal Windwalker',
    targetSlot: 4,
    requiredLevel: 35,
    statBonus: {
      moveSpeed: 66,
    },
    glowColor: '#fa84c7',
  },
  {
    id: 'ench_396',
    name: 'Eternal Windwalker',
    targetSlot: 5,
    requiredLevel: 35,
    statBonus: {
      moveSpeed: 66,
    },
    glowColor: '#fa84c7',
  },
  {
    id: 'ench_397',
    name: 'Eternal Life Essence',
    targetSlot: 0,
    requiredLevel: 35,
    statBonus: {
      vitality: 68,
    },
    glowColor: '#0f84c7',
  },
  {
    id: 'ench_398',
    name: 'Eternal Life Essence',
    targetSlot: 1,
    requiredLevel: 35,
    statBonus: {
      vitality: 68,
    },
    glowColor: '#0f84c7',
  },
  {
    id: 'ench_399',
    name: 'Eternal Life Essence',
    targetSlot: 2,
    requiredLevel: 35,
    statBonus: {
      vitality: 68,
    },
    glowColor: '#0f84c7',
  },
  {
    id: 'ench_400',
    name: 'Eternal Life Essence',
    targetSlot: 3,
    requiredLevel: 35,
    statBonus: {
      vitality: 68,
    },
    glowColor: '#0f84c7',
  },
  {
    id: 'ench_401',
    name: 'Eternal Life Essence',
    targetSlot: 4,
    requiredLevel: 35,
    statBonus: {
      vitality: 68,
    },
    glowColor: '#0f84c7',
  },
  {
    id: 'ench_402',
    name: 'Eternal Life Essence',
    targetSlot: 5,
    requiredLevel: 35,
    statBonus: {
      vitality: 68,
    },
    glowColor: '#0f84c7',
  },
  {
    id: 'ench_403',
    name: 'Eternal Mana Surge',
    targetSlot: 0,
    requiredLevel: 35,
    statBonus: {
      maxMana: 70,
    },
    glowColor: '#2384c7',
  },
  {
    id: 'ench_404',
    name: 'Eternal Mana Surge',
    targetSlot: 1,
    requiredLevel: 35,
    statBonus: {
      maxMana: 70,
    },
    glowColor: '#2384c7',
  },
  {
    id: 'ench_405',
    name: 'Eternal Mana Surge',
    targetSlot: 2,
    requiredLevel: 35,
    statBonus: {
      maxMana: 70,
    },
    glowColor: '#2384c7',
  },
  {
    id: 'ench_406',
    name: 'Eternal Mana Surge',
    targetSlot: 3,
    requiredLevel: 35,
    statBonus: {
      maxMana: 70,
    },
    glowColor: '#2384c7',
  },
  {
    id: 'ench_407',
    name: 'Eternal Mana Surge',
    targetSlot: 4,
    requiredLevel: 35,
    statBonus: {
      maxMana: 70,
    },
    glowColor: '#2384c7',
  },
  {
    id: 'ench_408',
    name: 'Eternal Mana Surge',
    targetSlot: 5,
    requiredLevel: 35,
    statBonus: {
      maxMana: 70,
    },
    glowColor: '#2384c7',
  },
  {
    id: 'ench_409',
    name: 'Eternal Critical Precision',
    targetSlot: 0,
    requiredLevel: 35,
    statBonus: {
      critRate: 72,
    },
    glowColor: '#3784c7',
  },
  {
    id: 'ench_410',
    name: 'Eternal Critical Precision',
    targetSlot: 1,
    requiredLevel: 35,
    statBonus: {
      critRate: 72,
    },
    glowColor: '#3784c7',
  },
  {
    id: 'ench_411',
    name: 'Eternal Critical Precision',
    targetSlot: 2,
    requiredLevel: 35,
    statBonus: {
      critRate: 72,
    },
    glowColor: '#3784c7',
  },
  {
    id: 'ench_412',
    name: 'Eternal Critical Precision',
    targetSlot: 3,
    requiredLevel: 35,
    statBonus: {
      critRate: 72,
    },
    glowColor: '#3784c7',
  },
  {
    id: 'ench_413',
    name: 'Eternal Critical Precision',
    targetSlot: 4,
    requiredLevel: 35,
    statBonus: {
      critRate: 72,
    },
    glowColor: '#3784c7',
  },
  {
    id: 'ench_414',
    name: 'Eternal Critical Precision',
    targetSlot: 5,
    requiredLevel: 35,
    statBonus: {
      critRate: 72,
    },
    glowColor: '#3784c7',
  },
  {
    id: 'ench_415',
    name: 'Eternal Brutal Force',
    targetSlot: 0,
    requiredLevel: 35,
    statBonus: {
      strength: 74,
    },
    glowColor: '#4b84c7',
  },
  {
    id: 'ench_416',
    name: 'Eternal Brutal Force',
    targetSlot: 1,
    requiredLevel: 35,
    statBonus: {
      strength: 74,
    },
    glowColor: '#4b84c7',
  },
  {
    id: 'ench_417',
    name: 'Eternal Brutal Force',
    targetSlot: 2,
    requiredLevel: 35,
    statBonus: {
      strength: 74,
    },
    glowColor: '#4b84c7',
  },
  {
    id: 'ench_418',
    name: 'Eternal Brutal Force',
    targetSlot: 3,
    requiredLevel: 35,
    statBonus: {
      strength: 74,
    },
    glowColor: '#4b84c7',
  },
  {
    id: 'ench_419',
    name: 'Eternal Brutal Force',
    targetSlot: 4,
    requiredLevel: 35,
    statBonus: {
      strength: 74,
    },
    glowColor: '#4b84c7',
  },
  {
    id: 'ench_420',
    name: 'Eternal Brutal Force',
    targetSlot: 5,
    requiredLevel: 35,
    statBonus: {
      strength: 74,
    },
    glowColor: '#4b84c7',
  },
  {
    id: 'ench_421',
    name: 'Primordial Fire Infusion',
    targetSlot: 0,
    requiredLevel: 40,
    statBonus: {
      fireDamage: 64,
    },
    glowColor: '#af84c7',
  },
  {
    id: 'ench_422',
    name: 'Primordial Fire Infusion',
    targetSlot: 1,
    requiredLevel: 40,
    statBonus: {
      fireDamage: 64,
    },
    glowColor: '#af84c7',
  },
  {
    id: 'ench_423',
    name: 'Primordial Fire Infusion',
    targetSlot: 2,
    requiredLevel: 40,
    statBonus: {
      fireDamage: 64,
    },
    glowColor: '#af84c7',
  },
  {
    id: 'ench_424',
    name: 'Primordial Fire Infusion',
    targetSlot: 3,
    requiredLevel: 40,
    statBonus: {
      fireDamage: 64,
    },
    glowColor: '#af84c7',
  },
  {
    id: 'ench_425',
    name: 'Primordial Fire Infusion',
    targetSlot: 4,
    requiredLevel: 40,
    statBonus: {
      fireDamage: 64,
    },
    glowColor: '#af84c7',
  },
  {
    id: 'ench_426',
    name: 'Primordial Fire Infusion',
    targetSlot: 5,
    requiredLevel: 40,
    statBonus: {
      fireDamage: 64,
    },
    glowColor: '#af84c7',
  },
  {
    id: 'ench_427',
    name: 'Primordial Frost Ward',
    targetSlot: 0,
    requiredLevel: 40,
    statBonus: {
      coldResistance: 66,
    },
    glowColor: '#c384c7',
  },
  {
    id: 'ench_428',
    name: 'Primordial Frost Ward',
    targetSlot: 1,
    requiredLevel: 40,
    statBonus: {
      coldResistance: 66,
    },
    glowColor: '#c384c7',
  },
  {
    id: 'ench_429',
    name: 'Primordial Frost Ward',
    targetSlot: 2,
    requiredLevel: 40,
    statBonus: {
      coldResistance: 66,
    },
    glowColor: '#c384c7',
  },
  {
    id: 'ench_430',
    name: 'Primordial Frost Ward',
    targetSlot: 3,
    requiredLevel: 40,
    statBonus: {
      coldResistance: 66,
    },
    glowColor: '#c384c7',
  },
  {
    id: 'ench_431',
    name: 'Primordial Frost Ward',
    targetSlot: 4,
    requiredLevel: 40,
    statBonus: {
      coldResistance: 66,
    },
    glowColor: '#c384c7',
  },
  {
    id: 'ench_432',
    name: 'Primordial Frost Ward',
    targetSlot: 5,
    requiredLevel: 40,
    statBonus: {
      coldResistance: 66,
    },
    glowColor: '#c384c7',
  },
  {
    id: 'ench_433',
    name: 'Primordial Lightning Strike',
    targetSlot: 0,
    requiredLevel: 40,
    statBonus: {
      lightningDamage: 68,
    },
    glowColor: '#d784c7',
  },
  {
    id: 'ench_434',
    name: 'Primordial Lightning Strike',
    targetSlot: 1,
    requiredLevel: 40,
    statBonus: {
      lightningDamage: 68,
    },
    glowColor: '#d784c7',
  },
  {
    id: 'ench_435',
    name: 'Primordial Lightning Strike',
    targetSlot: 2,
    requiredLevel: 40,
    statBonus: {
      lightningDamage: 68,
    },
    glowColor: '#d784c7',
  },
  {
    id: 'ench_436',
    name: 'Primordial Lightning Strike',
    targetSlot: 3,
    requiredLevel: 40,
    statBonus: {
      lightningDamage: 68,
    },
    glowColor: '#d784c7',
  },
  {
    id: 'ench_437',
    name: 'Primordial Lightning Strike',
    targetSlot: 4,
    requiredLevel: 40,
    statBonus: {
      lightningDamage: 68,
    },
    glowColor: '#d784c7',
  },
  {
    id: 'ench_438',
    name: 'Primordial Lightning Strike',
    targetSlot: 5,
    requiredLevel: 40,
    statBonus: {
      lightningDamage: 68,
    },
    glowColor: '#d784c7',
  },
  {
    id: 'ench_439',
    name: 'Primordial Void Veil',
    targetSlot: 0,
    requiredLevel: 40,
    statBonus: {
      voidResistance: 70,
    },
    glowColor: '#eb84c7',
  },
  {
    id: 'ench_440',
    name: 'Primordial Void Veil',
    targetSlot: 1,
    requiredLevel: 40,
    statBonus: {
      voidResistance: 70,
    },
    glowColor: '#eb84c7',
  },
  {
    id: 'ench_441',
    name: 'Primordial Void Veil',
    targetSlot: 2,
    requiredLevel: 40,
    statBonus: {
      voidResistance: 70,
    },
    glowColor: '#eb84c7',
  },
  {
    id: 'ench_442',
    name: 'Primordial Void Veil',
    targetSlot: 3,
    requiredLevel: 40,
    statBonus: {
      voidResistance: 70,
    },
    glowColor: '#eb84c7',
  },
  {
    id: 'ench_443',
    name: 'Primordial Void Veil',
    targetSlot: 4,
    requiredLevel: 40,
    statBonus: {
      voidResistance: 70,
    },
    glowColor: '#eb84c7',
  },
  {
    id: 'ench_444',
    name: 'Primordial Void Veil',
    targetSlot: 5,
    requiredLevel: 40,
    statBonus: {
      voidResistance: 70,
    },
    glowColor: '#eb84c7',
  },
  {
    id: 'ench_445',
    name: 'Primordial Ironhide',
    targetSlot: 0,
    requiredLevel: 40,
    statBonus: {
      armor: 72,
    },
    glowColor: '#0084c7',
  },
  {
    id: 'ench_446',
    name: 'Primordial Ironhide',
    targetSlot: 1,
    requiredLevel: 40,
    statBonus: {
      armor: 72,
    },
    glowColor: '#0084c7',
  },
  {
    id: 'ench_447',
    name: 'Primordial Ironhide',
    targetSlot: 2,
    requiredLevel: 40,
    statBonus: {
      armor: 72,
    },
    glowColor: '#0084c7',
  },
  {
    id: 'ench_448',
    name: 'Primordial Ironhide',
    targetSlot: 3,
    requiredLevel: 40,
    statBonus: {
      armor: 72,
    },
    glowColor: '#0084c7',
  },
  {
    id: 'ench_449',
    name: 'Primordial Ironhide',
    targetSlot: 4,
    requiredLevel: 40,
    statBonus: {
      armor: 72,
    },
    glowColor: '#0084c7',
  },
  {
    id: 'ench_450',
    name: 'Primordial Ironhide',
    targetSlot: 5,
    requiredLevel: 40,
    statBonus: {
      armor: 72,
    },
    glowColor: '#0084c7',
  },
  {
    id: 'ench_451',
    name: 'Primordial Windwalker',
    targetSlot: 0,
    requiredLevel: 40,
    statBonus: {
      moveSpeed: 74,
    },
    glowColor: '#1484c7',
  },
  {
    id: 'ench_452',
    name: 'Primordial Windwalker',
    targetSlot: 1,
    requiredLevel: 40,
    statBonus: {
      moveSpeed: 74,
    },
    glowColor: '#1484c7',
  },
  {
    id: 'ench_453',
    name: 'Primordial Windwalker',
    targetSlot: 2,
    requiredLevel: 40,
    statBonus: {
      moveSpeed: 74,
    },
    glowColor: '#1484c7',
  },
  {
    id: 'ench_454',
    name: 'Primordial Windwalker',
    targetSlot: 3,
    requiredLevel: 40,
    statBonus: {
      moveSpeed: 74,
    },
    glowColor: '#1484c7',
  },
  {
    id: 'ench_455',
    name: 'Primordial Windwalker',
    targetSlot: 4,
    requiredLevel: 40,
    statBonus: {
      moveSpeed: 74,
    },
    glowColor: '#1484c7',
  },
  {
    id: 'ench_456',
    name: 'Primordial Windwalker',
    targetSlot: 5,
    requiredLevel: 40,
    statBonus: {
      moveSpeed: 74,
    },
    glowColor: '#1484c7',
  },
  {
    id: 'ench_457',
    name: 'Primordial Life Essence',
    targetSlot: 0,
    requiredLevel: 40,
    statBonus: {
      vitality: 76,
    },
    glowColor: '#2884c7',
  },
  {
    id: 'ench_458',
    name: 'Primordial Life Essence',
    targetSlot: 1,
    requiredLevel: 40,
    statBonus: {
      vitality: 76,
    },
    glowColor: '#2884c7',
  },
  {
    id: 'ench_459',
    name: 'Primordial Life Essence',
    targetSlot: 2,
    requiredLevel: 40,
    statBonus: {
      vitality: 76,
    },
    glowColor: '#2884c7',
  },
  {
    id: 'ench_460',
    name: 'Primordial Life Essence',
    targetSlot: 3,
    requiredLevel: 40,
    statBonus: {
      vitality: 76,
    },
    glowColor: '#2884c7',
  },
  {
    id: 'ench_461',
    name: 'Primordial Life Essence',
    targetSlot: 4,
    requiredLevel: 40,
    statBonus: {
      vitality: 76,
    },
    glowColor: '#2884c7',
  },
  {
    id: 'ench_462',
    name: 'Primordial Life Essence',
    targetSlot: 5,
    requiredLevel: 40,
    statBonus: {
      vitality: 76,
    },
    glowColor: '#2884c7',
  },
  {
    id: 'ench_463',
    name: 'Primordial Mana Surge',
    targetSlot: 0,
    requiredLevel: 40,
    statBonus: {
      maxMana: 78,
    },
    glowColor: '#3c84c7',
  },
  {
    id: 'ench_464',
    name: 'Primordial Mana Surge',
    targetSlot: 1,
    requiredLevel: 40,
    statBonus: {
      maxMana: 78,
    },
    glowColor: '#3c84c7',
  },
  {
    id: 'ench_465',
    name: 'Primordial Mana Surge',
    targetSlot: 2,
    requiredLevel: 40,
    statBonus: {
      maxMana: 78,
    },
    glowColor: '#3c84c7',
  },
  {
    id: 'ench_466',
    name: 'Primordial Mana Surge',
    targetSlot: 3,
    requiredLevel: 40,
    statBonus: {
      maxMana: 78,
    },
    glowColor: '#3c84c7',
  },
  {
    id: 'ench_467',
    name: 'Primordial Mana Surge',
    targetSlot: 4,
    requiredLevel: 40,
    statBonus: {
      maxMana: 78,
    },
    glowColor: '#3c84c7',
  },
  {
    id: 'ench_468',
    name: 'Primordial Mana Surge',
    targetSlot: 5,
    requiredLevel: 40,
    statBonus: {
      maxMana: 78,
    },
    glowColor: '#3c84c7',
  },
  {
    id: 'ench_469',
    name: 'Primordial Critical Precision',
    targetSlot: 0,
    requiredLevel: 40,
    statBonus: {
      critRate: 80,
    },
    glowColor: '#5084c7',
  },
  {
    id: 'ench_470',
    name: 'Primordial Critical Precision',
    targetSlot: 1,
    requiredLevel: 40,
    statBonus: {
      critRate: 80,
    },
    glowColor: '#5084c7',
  },
  {
    id: 'ench_471',
    name: 'Primordial Critical Precision',
    targetSlot: 2,
    requiredLevel: 40,
    statBonus: {
      critRate: 80,
    },
    glowColor: '#5084c7',
  },
  {
    id: 'ench_472',
    name: 'Primordial Critical Precision',
    targetSlot: 3,
    requiredLevel: 40,
    statBonus: {
      critRate: 80,
    },
    glowColor: '#5084c7',
  },
  {
    id: 'ench_473',
    name: 'Primordial Critical Precision',
    targetSlot: 4,
    requiredLevel: 40,
    statBonus: {
      critRate: 80,
    },
    glowColor: '#5084c7',
  },
  {
    id: 'ench_474',
    name: 'Primordial Critical Precision',
    targetSlot: 5,
    requiredLevel: 40,
    statBonus: {
      critRate: 80,
    },
    glowColor: '#5084c7',
  },
  {
    id: 'ench_475',
    name: 'Primordial Brutal Force',
    targetSlot: 0,
    requiredLevel: 40,
    statBonus: {
      strength: 82,
    },
    glowColor: '#6484c7',
  },
  {
    id: 'ench_476',
    name: 'Primordial Brutal Force',
    targetSlot: 1,
    requiredLevel: 40,
    statBonus: {
      strength: 82,
    },
    glowColor: '#6484c7',
  },
  {
    id: 'ench_477',
    name: 'Primordial Brutal Force',
    targetSlot: 2,
    requiredLevel: 40,
    statBonus: {
      strength: 82,
    },
    glowColor: '#6484c7',
  },
  {
    id: 'ench_478',
    name: 'Primordial Brutal Force',
    targetSlot: 3,
    requiredLevel: 40,
    statBonus: {
      strength: 82,
    },
    glowColor: '#6484c7',
  },
  {
    id: 'ench_479',
    name: 'Primordial Brutal Force',
    targetSlot: 4,
    requiredLevel: 40,
    statBonus: {
      strength: 82,
    },
    glowColor: '#6484c7',
  },
  {
    id: 'ench_480',
    name: 'Primordial Brutal Force',
    targetSlot: 5,
    requiredLevel: 40,
    statBonus: {
      strength: 82,
    },
    glowColor: '#6484c7',
  },
  {
    id: 'ench_481',
    name: 'Cataclysmic Fire Infusion',
    targetSlot: 0,
    requiredLevel: 45,
    statBonus: {
      fireDamage: 72,
    },
    glowColor: '#c884c7',
  },
  {
    id: 'ench_482',
    name: 'Cataclysmic Fire Infusion',
    targetSlot: 1,
    requiredLevel: 45,
    statBonus: {
      fireDamage: 72,
    },
    glowColor: '#c884c7',
  },
  {
    id: 'ench_483',
    name: 'Cataclysmic Fire Infusion',
    targetSlot: 2,
    requiredLevel: 45,
    statBonus: {
      fireDamage: 72,
    },
    glowColor: '#c884c7',
  },
  {
    id: 'ench_484',
    name: 'Cataclysmic Fire Infusion',
    targetSlot: 3,
    requiredLevel: 45,
    statBonus: {
      fireDamage: 72,
    },
    glowColor: '#c884c7',
  },
  {
    id: 'ench_485',
    name: 'Cataclysmic Fire Infusion',
    targetSlot: 4,
    requiredLevel: 45,
    statBonus: {
      fireDamage: 72,
    },
    glowColor: '#c884c7',
  },
  {
    id: 'ench_486',
    name: 'Cataclysmic Fire Infusion',
    targetSlot: 5,
    requiredLevel: 45,
    statBonus: {
      fireDamage: 72,
    },
    glowColor: '#c884c7',
  },
  {
    id: 'ench_487',
    name: 'Cataclysmic Frost Ward',
    targetSlot: 0,
    requiredLevel: 45,
    statBonus: {
      coldResistance: 74,
    },
    glowColor: '#dc84c7',
  },
  {
    id: 'ench_488',
    name: 'Cataclysmic Frost Ward',
    targetSlot: 1,
    requiredLevel: 45,
    statBonus: {
      coldResistance: 74,
    },
    glowColor: '#dc84c7',
  },
  {
    id: 'ench_489',
    name: 'Cataclysmic Frost Ward',
    targetSlot: 2,
    requiredLevel: 45,
    statBonus: {
      coldResistance: 74,
    },
    glowColor: '#dc84c7',
  },
  {
    id: 'ench_490',
    name: 'Cataclysmic Frost Ward',
    targetSlot: 3,
    requiredLevel: 45,
    statBonus: {
      coldResistance: 74,
    },
    glowColor: '#dc84c7',
  },
  {
    id: 'ench_491',
    name: 'Cataclysmic Frost Ward',
    targetSlot: 4,
    requiredLevel: 45,
    statBonus: {
      coldResistance: 74,
    },
    glowColor: '#dc84c7',
  },
  {
    id: 'ench_492',
    name: 'Cataclysmic Frost Ward',
    targetSlot: 5,
    requiredLevel: 45,
    statBonus: {
      coldResistance: 74,
    },
    glowColor: '#dc84c7',
  },
  {
    id: 'ench_493',
    name: 'Cataclysmic Lightning Strike',
    targetSlot: 0,
    requiredLevel: 45,
    statBonus: {
      lightningDamage: 76,
    },
    glowColor: '#f084c7',
  },
  {
    id: 'ench_494',
    name: 'Cataclysmic Lightning Strike',
    targetSlot: 1,
    requiredLevel: 45,
    statBonus: {
      lightningDamage: 76,
    },
    glowColor: '#f084c7',
  },
  {
    id: 'ench_495',
    name: 'Cataclysmic Lightning Strike',
    targetSlot: 2,
    requiredLevel: 45,
    statBonus: {
      lightningDamage: 76,
    },
    glowColor: '#f084c7',
  },
  {
    id: 'ench_496',
    name: 'Cataclysmic Lightning Strike',
    targetSlot: 3,
    requiredLevel: 45,
    statBonus: {
      lightningDamage: 76,
    },
    glowColor: '#f084c7',
  },
  {
    id: 'ench_497',
    name: 'Cataclysmic Lightning Strike',
    targetSlot: 4,
    requiredLevel: 45,
    statBonus: {
      lightningDamage: 76,
    },
    glowColor: '#f084c7',
  },
  {
    id: 'ench_498',
    name: 'Cataclysmic Lightning Strike',
    targetSlot: 5,
    requiredLevel: 45,
    statBonus: {
      lightningDamage: 76,
    },
    glowColor: '#f084c7',
  },
  {
    id: 'ench_499',
    name: 'Cataclysmic Void Veil',
    targetSlot: 0,
    requiredLevel: 45,
    statBonus: {
      voidResistance: 78,
    },
    glowColor: '#0584c7',
  },
  {
    id: 'ench_500',
    name: 'Cataclysmic Void Veil',
    targetSlot: 1,
    requiredLevel: 45,
    statBonus: {
      voidResistance: 78,
    },
    glowColor: '#0584c7',
  },
  {
    id: 'ench_501',
    name: 'Cataclysmic Void Veil',
    targetSlot: 2,
    requiredLevel: 45,
    statBonus: {
      voidResistance: 78,
    },
    glowColor: '#0584c7',
  },
  {
    id: 'ench_502',
    name: 'Cataclysmic Void Veil',
    targetSlot: 3,
    requiredLevel: 45,
    statBonus: {
      voidResistance: 78,
    },
    glowColor: '#0584c7',
  },
  {
    id: 'ench_503',
    name: 'Cataclysmic Void Veil',
    targetSlot: 4,
    requiredLevel: 45,
    statBonus: {
      voidResistance: 78,
    },
    glowColor: '#0584c7',
  },
  {
    id: 'ench_504',
    name: 'Cataclysmic Void Veil',
    targetSlot: 5,
    requiredLevel: 45,
    statBonus: {
      voidResistance: 78,
    },
    glowColor: '#0584c7',
  },
  {
    id: 'ench_505',
    name: 'Cataclysmic Ironhide',
    targetSlot: 0,
    requiredLevel: 45,
    statBonus: {
      armor: 80,
    },
    glowColor: '#1984c7',
  },
  {
    id: 'ench_506',
    name: 'Cataclysmic Ironhide',
    targetSlot: 1,
    requiredLevel: 45,
    statBonus: {
      armor: 80,
    },
    glowColor: '#1984c7',
  },
  {
    id: 'ench_507',
    name: 'Cataclysmic Ironhide',
    targetSlot: 2,
    requiredLevel: 45,
    statBonus: {
      armor: 80,
    },
    glowColor: '#1984c7',
  },
  {
    id: 'ench_508',
    name: 'Cataclysmic Ironhide',
    targetSlot: 3,
    requiredLevel: 45,
    statBonus: {
      armor: 80,
    },
    glowColor: '#1984c7',
  },
  {
    id: 'ench_509',
    name: 'Cataclysmic Ironhide',
    targetSlot: 4,
    requiredLevel: 45,
    statBonus: {
      armor: 80,
    },
    glowColor: '#1984c7',
  },
  {
    id: 'ench_510',
    name: 'Cataclysmic Ironhide',
    targetSlot: 5,
    requiredLevel: 45,
    statBonus: {
      armor: 80,
    },
    glowColor: '#1984c7',
  },
  {
    id: 'ench_511',
    name: 'Cataclysmic Windwalker',
    targetSlot: 0,
    requiredLevel: 45,
    statBonus: {
      moveSpeed: 82,
    },
    glowColor: '#2d84c7',
  },
  {
    id: 'ench_512',
    name: 'Cataclysmic Windwalker',
    targetSlot: 1,
    requiredLevel: 45,
    statBonus: {
      moveSpeed: 82,
    },
    glowColor: '#2d84c7',
  },
  {
    id: 'ench_513',
    name: 'Cataclysmic Windwalker',
    targetSlot: 2,
    requiredLevel: 45,
    statBonus: {
      moveSpeed: 82,
    },
    glowColor: '#2d84c7',
  },
  {
    id: 'ench_514',
    name: 'Cataclysmic Windwalker',
    targetSlot: 3,
    requiredLevel: 45,
    statBonus: {
      moveSpeed: 82,
    },
    glowColor: '#2d84c7',
  },
  {
    id: 'ench_515',
    name: 'Cataclysmic Windwalker',
    targetSlot: 4,
    requiredLevel: 45,
    statBonus: {
      moveSpeed: 82,
    },
    glowColor: '#2d84c7',
  },
  {
    id: 'ench_516',
    name: 'Cataclysmic Windwalker',
    targetSlot: 5,
    requiredLevel: 45,
    statBonus: {
      moveSpeed: 82,
    },
    glowColor: '#2d84c7',
  },
  {
    id: 'ench_517',
    name: 'Cataclysmic Life Essence',
    targetSlot: 0,
    requiredLevel: 45,
    statBonus: {
      vitality: 84,
    },
    glowColor: '#4184c7',
  },
  {
    id: 'ench_518',
    name: 'Cataclysmic Life Essence',
    targetSlot: 1,
    requiredLevel: 45,
    statBonus: {
      vitality: 84,
    },
    glowColor: '#4184c7',
  },
  {
    id: 'ench_519',
    name: 'Cataclysmic Life Essence',
    targetSlot: 2,
    requiredLevel: 45,
    statBonus: {
      vitality: 84,
    },
    glowColor: '#4184c7',
  },
  {
    id: 'ench_520',
    name: 'Cataclysmic Life Essence',
    targetSlot: 3,
    requiredLevel: 45,
    statBonus: {
      vitality: 84,
    },
    glowColor: '#4184c7',
  },
  {
    id: 'ench_521',
    name: 'Cataclysmic Life Essence',
    targetSlot: 4,
    requiredLevel: 45,
    statBonus: {
      vitality: 84,
    },
    glowColor: '#4184c7',
  },
  {
    id: 'ench_522',
    name: 'Cataclysmic Life Essence',
    targetSlot: 5,
    requiredLevel: 45,
    statBonus: {
      vitality: 84,
    },
    glowColor: '#4184c7',
  },
  {
    id: 'ench_523',
    name: 'Cataclysmic Mana Surge',
    targetSlot: 0,
    requiredLevel: 45,
    statBonus: {
      maxMana: 86,
    },
    glowColor: '#5584c7',
  },
  {
    id: 'ench_524',
    name: 'Cataclysmic Mana Surge',
    targetSlot: 1,
    requiredLevel: 45,
    statBonus: {
      maxMana: 86,
    },
    glowColor: '#5584c7',
  },
  {
    id: 'ench_525',
    name: 'Cataclysmic Mana Surge',
    targetSlot: 2,
    requiredLevel: 45,
    statBonus: {
      maxMana: 86,
    },
    glowColor: '#5584c7',
  },
  {
    id: 'ench_526',
    name: 'Cataclysmic Mana Surge',
    targetSlot: 3,
    requiredLevel: 45,
    statBonus: {
      maxMana: 86,
    },
    glowColor: '#5584c7',
  },
  {
    id: 'ench_527',
    name: 'Cataclysmic Mana Surge',
    targetSlot: 4,
    requiredLevel: 45,
    statBonus: {
      maxMana: 86,
    },
    glowColor: '#5584c7',
  },
  {
    id: 'ench_528',
    name: 'Cataclysmic Mana Surge',
    targetSlot: 5,
    requiredLevel: 45,
    statBonus: {
      maxMana: 86,
    },
    glowColor: '#5584c7',
  },
  {
    id: 'ench_529',
    name: 'Cataclysmic Critical Precision',
    targetSlot: 0,
    requiredLevel: 45,
    statBonus: {
      critRate: 88,
    },
    glowColor: '#6984c7',
  },
  {
    id: 'ench_530',
    name: 'Cataclysmic Critical Precision',
    targetSlot: 1,
    requiredLevel: 45,
    statBonus: {
      critRate: 88,
    },
    glowColor: '#6984c7',
  },
  {
    id: 'ench_531',
    name: 'Cataclysmic Critical Precision',
    targetSlot: 2,
    requiredLevel: 45,
    statBonus: {
      critRate: 88,
    },
    glowColor: '#6984c7',
  },
  {
    id: 'ench_532',
    name: 'Cataclysmic Critical Precision',
    targetSlot: 3,
    requiredLevel: 45,
    statBonus: {
      critRate: 88,
    },
    glowColor: '#6984c7',
  },
  {
    id: 'ench_533',
    name: 'Cataclysmic Critical Precision',
    targetSlot: 4,
    requiredLevel: 45,
    statBonus: {
      critRate: 88,
    },
    glowColor: '#6984c7',
  },
  {
    id: 'ench_534',
    name: 'Cataclysmic Critical Precision',
    targetSlot: 5,
    requiredLevel: 45,
    statBonus: {
      critRate: 88,
    },
    glowColor: '#6984c7',
  },
  {
    id: 'ench_535',
    name: 'Cataclysmic Brutal Force',
    targetSlot: 0,
    requiredLevel: 45,
    statBonus: {
      strength: 90,
    },
    glowColor: '#7d84c7',
  },
  {
    id: 'ench_536',
    name: 'Cataclysmic Brutal Force',
    targetSlot: 1,
    requiredLevel: 45,
    statBonus: {
      strength: 90,
    },
    glowColor: '#7d84c7',
  },
  {
    id: 'ench_537',
    name: 'Cataclysmic Brutal Force',
    targetSlot: 2,
    requiredLevel: 45,
    statBonus: {
      strength: 90,
    },
    glowColor: '#7d84c7',
  },
  {
    id: 'ench_538',
    name: 'Cataclysmic Brutal Force',
    targetSlot: 3,
    requiredLevel: 45,
    statBonus: {
      strength: 90,
    },
    glowColor: '#7d84c7',
  },
  {
    id: 'ench_539',
    name: 'Cataclysmic Brutal Force',
    targetSlot: 4,
    requiredLevel: 45,
    statBonus: {
      strength: 90,
    },
    glowColor: '#7d84c7',
  },
  {
    id: 'ench_540',
    name: 'Cataclysmic Brutal Force',
    targetSlot: 5,
    requiredLevel: 45,
    statBonus: {
      strength: 90,
    },
    glowColor: '#7d84c7',
  },
  {
    id: 'ench_541',
    name: 'Godslayer Fire Infusion',
    targetSlot: 0,
    requiredLevel: 50,
    statBonus: {
      fireDamage: 80,
    },
    glowColor: '#e184c7',
  },
  {
    id: 'ench_542',
    name: 'Godslayer Fire Infusion',
    targetSlot: 1,
    requiredLevel: 50,
    statBonus: {
      fireDamage: 80,
    },
    glowColor: '#e184c7',
  },
  {
    id: 'ench_543',
    name: 'Godslayer Fire Infusion',
    targetSlot: 2,
    requiredLevel: 50,
    statBonus: {
      fireDamage: 80,
    },
    glowColor: '#e184c7',
  },
  {
    id: 'ench_544',
    name: 'Godslayer Fire Infusion',
    targetSlot: 3,
    requiredLevel: 50,
    statBonus: {
      fireDamage: 80,
    },
    glowColor: '#e184c7',
  },
  {
    id: 'ench_545',
    name: 'Godslayer Fire Infusion',
    targetSlot: 4,
    requiredLevel: 50,
    statBonus: {
      fireDamage: 80,
    },
    glowColor: '#e184c7',
  },
  {
    id: 'ench_546',
    name: 'Godslayer Fire Infusion',
    targetSlot: 5,
    requiredLevel: 50,
    statBonus: {
      fireDamage: 80,
    },
    glowColor: '#e184c7',
  },
  {
    id: 'ench_547',
    name: 'Godslayer Frost Ward',
    targetSlot: 0,
    requiredLevel: 50,
    statBonus: {
      coldResistance: 82,
    },
    glowColor: '#f584c7',
  },
  {
    id: 'ench_548',
    name: 'Godslayer Frost Ward',
    targetSlot: 1,
    requiredLevel: 50,
    statBonus: {
      coldResistance: 82,
    },
    glowColor: '#f584c7',
  },
  {
    id: 'ench_549',
    name: 'Godslayer Frost Ward',
    targetSlot: 2,
    requiredLevel: 50,
    statBonus: {
      coldResistance: 82,
    },
    glowColor: '#f584c7',
  },
  {
    id: 'ench_550',
    name: 'Godslayer Frost Ward',
    targetSlot: 3,
    requiredLevel: 50,
    statBonus: {
      coldResistance: 82,
    },
    glowColor: '#f584c7',
  },
  {
    id: 'ench_551',
    name: 'Godslayer Frost Ward',
    targetSlot: 4,
    requiredLevel: 50,
    statBonus: {
      coldResistance: 82,
    },
    glowColor: '#f584c7',
  },
  {
    id: 'ench_552',
    name: 'Godslayer Frost Ward',
    targetSlot: 5,
    requiredLevel: 50,
    statBonus: {
      coldResistance: 82,
    },
    glowColor: '#f584c7',
  },
  {
    id: 'ench_553',
    name: 'Godslayer Lightning Strike',
    targetSlot: 0,
    requiredLevel: 50,
    statBonus: {
      lightningDamage: 84,
    },
    glowColor: '#0a84c7',
  },
  {
    id: 'ench_554',
    name: 'Godslayer Lightning Strike',
    targetSlot: 1,
    requiredLevel: 50,
    statBonus: {
      lightningDamage: 84,
    },
    glowColor: '#0a84c7',
  },
  {
    id: 'ench_555',
    name: 'Godslayer Lightning Strike',
    targetSlot: 2,
    requiredLevel: 50,
    statBonus: {
      lightningDamage: 84,
    },
    glowColor: '#0a84c7',
  },
  {
    id: 'ench_556',
    name: 'Godslayer Lightning Strike',
    targetSlot: 3,
    requiredLevel: 50,
    statBonus: {
      lightningDamage: 84,
    },
    glowColor: '#0a84c7',
  },
  {
    id: 'ench_557',
    name: 'Godslayer Lightning Strike',
    targetSlot: 4,
    requiredLevel: 50,
    statBonus: {
      lightningDamage: 84,
    },
    glowColor: '#0a84c7',
  },
  {
    id: 'ench_558',
    name: 'Godslayer Lightning Strike',
    targetSlot: 5,
    requiredLevel: 50,
    statBonus: {
      lightningDamage: 84,
    },
    glowColor: '#0a84c7',
  },
  {
    id: 'ench_559',
    name: 'Godslayer Void Veil',
    targetSlot: 0,
    requiredLevel: 50,
    statBonus: {
      voidResistance: 86,
    },
    glowColor: '#1e84c7',
  },
  {
    id: 'ench_560',
    name: 'Godslayer Void Veil',
    targetSlot: 1,
    requiredLevel: 50,
    statBonus: {
      voidResistance: 86,
    },
    glowColor: '#1e84c7',
  },
  {
    id: 'ench_561',
    name: 'Godslayer Void Veil',
    targetSlot: 2,
    requiredLevel: 50,
    statBonus: {
      voidResistance: 86,
    },
    glowColor: '#1e84c7',
  },
  {
    id: 'ench_562',
    name: 'Godslayer Void Veil',
    targetSlot: 3,
    requiredLevel: 50,
    statBonus: {
      voidResistance: 86,
    },
    glowColor: '#1e84c7',
  },
  {
    id: 'ench_563',
    name: 'Godslayer Void Veil',
    targetSlot: 4,
    requiredLevel: 50,
    statBonus: {
      voidResistance: 86,
    },
    glowColor: '#1e84c7',
  },
  {
    id: 'ench_564',
    name: 'Godslayer Void Veil',
    targetSlot: 5,
    requiredLevel: 50,
    statBonus: {
      voidResistance: 86,
    },
    glowColor: '#1e84c7',
  },
  {
    id: 'ench_565',
    name: 'Godslayer Ironhide',
    targetSlot: 0,
    requiredLevel: 50,
    statBonus: {
      armor: 88,
    },
    glowColor: '#3284c7',
  },
  {
    id: 'ench_566',
    name: 'Godslayer Ironhide',
    targetSlot: 1,
    requiredLevel: 50,
    statBonus: {
      armor: 88,
    },
    glowColor: '#3284c7',
  },
  {
    id: 'ench_567',
    name: 'Godslayer Ironhide',
    targetSlot: 2,
    requiredLevel: 50,
    statBonus: {
      armor: 88,
    },
    glowColor: '#3284c7',
  },
  {
    id: 'ench_568',
    name: 'Godslayer Ironhide',
    targetSlot: 3,
    requiredLevel: 50,
    statBonus: {
      armor: 88,
    },
    glowColor: '#3284c7',
  },
  {
    id: 'ench_569',
    name: 'Godslayer Ironhide',
    targetSlot: 4,
    requiredLevel: 50,
    statBonus: {
      armor: 88,
    },
    glowColor: '#3284c7',
  },
  {
    id: 'ench_570',
    name: 'Godslayer Ironhide',
    targetSlot: 5,
    requiredLevel: 50,
    statBonus: {
      armor: 88,
    },
    glowColor: '#3284c7',
  },
  {
    id: 'ench_571',
    name: 'Godslayer Windwalker',
    targetSlot: 0,
    requiredLevel: 50,
    statBonus: {
      moveSpeed: 90,
    },
    glowColor: '#4684c7',
  },
  {
    id: 'ench_572',
    name: 'Godslayer Windwalker',
    targetSlot: 1,
    requiredLevel: 50,
    statBonus: {
      moveSpeed: 90,
    },
    glowColor: '#4684c7',
  },
  {
    id: 'ench_573',
    name: 'Godslayer Windwalker',
    targetSlot: 2,
    requiredLevel: 50,
    statBonus: {
      moveSpeed: 90,
    },
    glowColor: '#4684c7',
  },
  {
    id: 'ench_574',
    name: 'Godslayer Windwalker',
    targetSlot: 3,
    requiredLevel: 50,
    statBonus: {
      moveSpeed: 90,
    },
    glowColor: '#4684c7',
  },
  {
    id: 'ench_575',
    name: 'Godslayer Windwalker',
    targetSlot: 4,
    requiredLevel: 50,
    statBonus: {
      moveSpeed: 90,
    },
    glowColor: '#4684c7',
  },
  {
    id: 'ench_576',
    name: 'Godslayer Windwalker',
    targetSlot: 5,
    requiredLevel: 50,
    statBonus: {
      moveSpeed: 90,
    },
    glowColor: '#4684c7',
  },
  {
    id: 'ench_577',
    name: 'Godslayer Life Essence',
    targetSlot: 0,
    requiredLevel: 50,
    statBonus: {
      vitality: 92,
    },
    glowColor: '#5a84c7',
  },
  {
    id: 'ench_578',
    name: 'Godslayer Life Essence',
    targetSlot: 1,
    requiredLevel: 50,
    statBonus: {
      vitality: 92,
    },
    glowColor: '#5a84c7',
  },
  {
    id: 'ench_579',
    name: 'Godslayer Life Essence',
    targetSlot: 2,
    requiredLevel: 50,
    statBonus: {
      vitality: 92,
    },
    glowColor: '#5a84c7',
  },
  {
    id: 'ench_580',
    name: 'Godslayer Life Essence',
    targetSlot: 3,
    requiredLevel: 50,
    statBonus: {
      vitality: 92,
    },
    glowColor: '#5a84c7',
  },
  {
    id: 'ench_581',
    name: 'Godslayer Life Essence',
    targetSlot: 4,
    requiredLevel: 50,
    statBonus: {
      vitality: 92,
    },
    glowColor: '#5a84c7',
  },
  {
    id: 'ench_582',
    name: 'Godslayer Life Essence',
    targetSlot: 5,
    requiredLevel: 50,
    statBonus: {
      vitality: 92,
    },
    glowColor: '#5a84c7',
  },
  {
    id: 'ench_583',
    name: 'Godslayer Mana Surge',
    targetSlot: 0,
    requiredLevel: 50,
    statBonus: {
      maxMana: 94,
    },
    glowColor: '#6e84c7',
  },
  {
    id: 'ench_584',
    name: 'Godslayer Mana Surge',
    targetSlot: 1,
    requiredLevel: 50,
    statBonus: {
      maxMana: 94,
    },
    glowColor: '#6e84c7',
  },
  {
    id: 'ench_585',
    name: 'Godslayer Mana Surge',
    targetSlot: 2,
    requiredLevel: 50,
    statBonus: {
      maxMana: 94,
    },
    glowColor: '#6e84c7',
  },
  {
    id: 'ench_586',
    name: 'Godslayer Mana Surge',
    targetSlot: 3,
    requiredLevel: 50,
    statBonus: {
      maxMana: 94,
    },
    glowColor: '#6e84c7',
  },
  {
    id: 'ench_587',
    name: 'Godslayer Mana Surge',
    targetSlot: 4,
    requiredLevel: 50,
    statBonus: {
      maxMana: 94,
    },
    glowColor: '#6e84c7',
  },
  {
    id: 'ench_588',
    name: 'Godslayer Mana Surge',
    targetSlot: 5,
    requiredLevel: 50,
    statBonus: {
      maxMana: 94,
    },
    glowColor: '#6e84c7',
  },
  {
    id: 'ench_589',
    name: 'Godslayer Critical Precision',
    targetSlot: 0,
    requiredLevel: 50,
    statBonus: {
      critRate: 96,
    },
    glowColor: '#8284c7',
  },
  {
    id: 'ench_590',
    name: 'Godslayer Critical Precision',
    targetSlot: 1,
    requiredLevel: 50,
    statBonus: {
      critRate: 96,
    },
    glowColor: '#8284c7',
  },
  {
    id: 'ench_591',
    name: 'Godslayer Critical Precision',
    targetSlot: 2,
    requiredLevel: 50,
    statBonus: {
      critRate: 96,
    },
    glowColor: '#8284c7',
  },
  {
    id: 'ench_592',
    name: 'Godslayer Critical Precision',
    targetSlot: 3,
    requiredLevel: 50,
    statBonus: {
      critRate: 96,
    },
    glowColor: '#8284c7',
  },
  {
    id: 'ench_593',
    name: 'Godslayer Critical Precision',
    targetSlot: 4,
    requiredLevel: 50,
    statBonus: {
      critRate: 96,
    },
    glowColor: '#8284c7',
  },
  {
    id: 'ench_594',
    name: 'Godslayer Critical Precision',
    targetSlot: 5,
    requiredLevel: 50,
    statBonus: {
      critRate: 96,
    },
    glowColor: '#8284c7',
  },
  {
    id: 'ench_595',
    name: 'Godslayer Brutal Force',
    targetSlot: 0,
    requiredLevel: 50,
    statBonus: {
      strength: 98,
    },
    glowColor: '#9684c7',
  },
  {
    id: 'ench_596',
    name: 'Godslayer Brutal Force',
    targetSlot: 1,
    requiredLevel: 50,
    statBonus: {
      strength: 98,
    },
    glowColor: '#9684c7',
  },
  {
    id: 'ench_597',
    name: 'Godslayer Brutal Force',
    targetSlot: 2,
    requiredLevel: 50,
    statBonus: {
      strength: 98,
    },
    glowColor: '#9684c7',
  },
  {
    id: 'ench_598',
    name: 'Godslayer Brutal Force',
    targetSlot: 3,
    requiredLevel: 50,
    statBonus: {
      strength: 98,
    },
    glowColor: '#9684c7',
  },
  {
    id: 'ench_599',
    name: 'Godslayer Brutal Force',
    targetSlot: 4,
    requiredLevel: 50,
    statBonus: {
      strength: 98,
    },
    glowColor: '#9684c7',
  },
  {
    id: 'ench_600',
    name: 'Godslayer Brutal Force',
    targetSlot: 5,
    requiredLevel: 50,
    statBonus: {
      strength: 98,
    },
    glowColor: '#9684c7',
  },
];

export class EnchantmentEngine {
  public static applyEnchantment(item: GeneratedItem, enchant: EnchantmentFormula): boolean {
    if (item.slot !== enchant.targetSlot || item.itemLevel < enchant.requiredLevel) {
      return false;
    }
    for (const [k, v] of Object.entries(enchant.statBonus)) {
      item.stats[k] = (item.stats[k] || 0) + v;
    }
    return true;
  }
}
