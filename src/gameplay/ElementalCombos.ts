/**
 * @file ElementalCombos.ts
 * @description Advanced multi-element combo triggers, status escalations, and vulnerability debuff stacking.
 */

export interface ElementalComboRule {
  id: string;
  elements: string[];
  reactionName: string;
  damageMultiplier: number;
  aoeRadius: number;
  bonusEffect: string;
}

export const ELEMENTAL_COMBOS: ElementalComboRule[] = [
  {
    id: 'combo_combustion',
    elements: ['Fire', 'Oil'],
    reactionName: 'Cataclysmic Combustion',
    damageMultiplier: 2.2,
    aoeRadius: 180,
    bonusEffect: 'Applies burning debuff dealing 20% max health over 4 seconds',
  },
  {
    id: 'combo_superconduct',
    elements: ['Lightning', 'Cold'],
    reactionName: 'Superconductive Discharge',
    damageMultiplier: 1.8,
    aoeRadius: 140,
    bonusEffect: 'Reduces enemy physical armor and elemental resistances by 40%',
  },
  {
    id: 'combo_shatter',
    elements: ['Cold', 'Physical'],
    reactionName: 'Glacial Shatter',
    damageMultiplier: 2.5,
    aoeRadius: 100,
    bonusEffect: 'Instantly executes non-boss enemies below 15% health',
  },
  {
    id: 'combo_singularity',
    elements: ['Void', 'Lightning'],
    reactionName: 'Void Singularity',
    damageMultiplier: 2.0,
    aoeRadius: 220,
    bonusEffect: 'Pulls all enemies in the area toward the epicenter and stuns for 1.5s',
  },
];
