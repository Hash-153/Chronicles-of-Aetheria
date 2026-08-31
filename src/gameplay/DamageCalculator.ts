/**
 * @file DamageCalculator.ts
 * @description Damage resolution formula computing physical armor mitigation, elemental resistances, critical strikes, and damage variance.
 */

import { Attributes } from './Attributes.ts';

export const DamageType = {
  Physical: 0,
  Fire: 1,
  Cold: 2,
  Lightning: 3,
  Void: 4,
} as const;
export type DamageType = typeof DamageType[keyof typeof DamageType];

export interface DamagePackage {
  baseAmount: number;
  type: DamageType;
  attackerStats?: Attributes;
  canCrit?: boolean;
}

export interface DamageResult {
  finalDamage: number;
  isCritical: boolean;
  mitigatedAmount: number;
  type: DamageType;
}

export class DamageCalculator {
  public static calculate(pkg: DamagePackage, defender: Attributes): DamageResult {
    let rawDamage = pkg.baseAmount;

    // 1. Add attacker power scaling
    if (pkg.attackerStats) {
      if (pkg.type === DamageType.Physical) {
        rawDamage += pkg.attackerStats.attackPower * 0.5;
      } else {
        rawDamage += pkg.attackerStats.spellPower * 0.5;
      }
    }

    // 2. Critical Strike roll
    let isCritical = false;
    if (pkg.canCrit !== false && pkg.attackerStats) {
      if (Math.random() < pkg.attackerStats.critChance) {
        isCritical = true;
        rawDamage *= pkg.attackerStats.critMultiplier;
      }
    }

    // 3. Defensive Mitigation
    let mitigationPercent = 0;

    if (pkg.type === DamageType.Physical) {
      // Armor formula: Armor / (Armor + 200)
      mitigationPercent = defender.armor / (defender.armor + 200);
    } else if (pkg.type === DamageType.Fire) {
      mitigationPercent = defender.fireResistance / 100;
    } else if (pkg.type === DamageType.Cold) {
      mitigationPercent = defender.coldResistance / 100;
    } else if (pkg.type === DamageType.Lightning) {
      mitigationPercent = defender.lightningResistance / 100;
    } else if (pkg.type === DamageType.Void) {
      mitigationPercent = defender.voidResistance / 100;
    }

    // Cap elemental resistances at 75%
    mitigationPercent = Math.min(0.75, Math.max(0, mitigationPercent));

    const finalDamage = Math.max(1, rawDamage * (1 - mitigationPercent));
    const mitigatedAmount = rawDamage - finalDamage;

    return {
      finalDamage,
      isCritical,
      mitigatedAmount,
      type: pkg.type,
    };
  }
}
