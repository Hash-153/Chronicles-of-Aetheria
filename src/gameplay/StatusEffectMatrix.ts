/**
 * @file StatusEffectMatrix.ts
 * @description Status effect escalation rules, crowd-control resistances, and immunity timers.
 */

export interface StatusImmunityRule {
  monsterArchetype: string;
  immuneEffects: string[];
  crowdControlReduction: number;
}

export const IMMUNITY_RULES: StatusImmunityRule[] = [
  {
    monsterArchetype: 'Boss',
    immuneEffects: ['Stun', 'Freeze'],
    crowdControlReduction: 0.75,
  },
  {
    monsterArchetype: 'ElementalGolem',
    immuneEffects: ['Bleed', 'Poison'],
    crowdControlReduction: 0.5,
  },
];
