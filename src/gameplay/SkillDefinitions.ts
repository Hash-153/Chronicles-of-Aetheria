/**
 * @file SkillDefinitions.ts
 * @description Catalog of active and passive RPG spells: Fireball, Frost Nova, Lightning Chain, Whirlwind, Dash, Meteor.
 */

import { DamageType } from './DamageCalculator.ts';

export interface SkillDefinition {
  id: string;
  name: string;
  description: string;
  manaCost: number;
  cooldown: number; // in seconds
  damageType: DamageType;
  baseDamage: number;
  range: number;
  radius?: number;
  projectileSpeed?: number;
  iconIndex: number;
}

export const SKILL_FIREBALL: SkillDefinition = {
  id: 'fireball',
  name: 'Aetherial Fireball',
  description: 'Hurls a fiery orb that explodes on impact dealing Fire damage.',
  manaCost: 15,
  cooldown: 0.5,
  damageType: DamageType.Fire,
  baseDamage: 40,
  range: 500,
  radius: 40,
  projectileSpeed: 450,
  iconIndex: 0,
};

export const SKILL_FROST_NOVA: SkillDefinition = {
  id: 'frost_nova',
  name: 'Frost Nova',
  description: 'Emits a freezing blast around the caster freezing nearby foes.',
  manaCost: 25,
  cooldown: 4.0,
  damageType: DamageType.Cold,
  baseDamage: 30,
  range: 0,
  radius: 120,
  iconIndex: 1,
};

export const SKILL_LIGHTNING_CHAIN: SkillDefinition = {
  id: 'lightning_chain',
  name: 'Chain Lightning',
  description: 'Discharges an electric bolt bouncing across up to 4 enemies.',
  manaCost: 20,
  cooldown: 1.2,
  damageType: DamageType.Lightning,
  baseDamage: 35,
  range: 400,
  iconIndex: 2,
};

export const SKILL_WHIRLWIND: SkillDefinition = {
  id: 'whirlwind',
  name: 'Whirlwind',
  description: 'Spins weapon dealing continuous physical damage to all adjacent enemies.',
  manaCost: 10,
  cooldown: 0.1,
  damageType: DamageType.Physical,
  baseDamage: 25,
  range: 0,
  radius: 60,
  iconIndex: 3,
};
