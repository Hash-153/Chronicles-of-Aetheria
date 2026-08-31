/**
 * @file SpellSynergyMatrix.ts
 * @description Advanced elemental spell synergy interaction matrix calculating cross-elemental reactions and combo detonations.
 */

import { DamageType, type DamagePackage } from './DamageCalculator.ts';
import { Vector2 } from '../core/math/Vector2.ts';

export interface ElementalReactionResult {
  comboName: string;
  bonusMultiplier: number;
  areaRadius: number;
  resultingDamageType: DamageType;
  inflictedDebuff: string;
}

export class SpellSynergyMatrix {
  private static _reactions: Map<string, ElementalReactionResult> = new Map();

  public static initialize(): void {
    if (this._reactions.size > 0) return;
    this._reactions.set('Physical_Physical_R1', {
      comboName: 'Physical + Physical Detonation (Rank 1)',
      bonusMultiplier: 1.35,
      areaRadius: 48,
      resultingDamageType: 1,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Physical_Physical_R2', {
      comboName: 'Physical + Physical Detonation (Rank 2)',
      bonusMultiplier: 1.50,
      areaRadius: 56,
      resultingDamageType: 2,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Physical_Physical_R3', {
      comboName: 'Physical + Physical Detonation (Rank 3)',
      bonusMultiplier: 1.65,
      areaRadius: 64,
      resultingDamageType: 3,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Physical_Physical_R4', {
      comboName: 'Physical + Physical Detonation (Rank 4)',
      bonusMultiplier: 1.80,
      areaRadius: 72,
      resultingDamageType: 4,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Physical_Physical_R5', {
      comboName: 'Physical + Physical Detonation (Rank 5)',
      bonusMultiplier: 1.95,
      areaRadius: 80,
      resultingDamageType: 0,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Physical_Physical_R6', {
      comboName: 'Physical + Physical Detonation (Rank 6)',
      bonusMultiplier: 2.10,
      areaRadius: 88,
      resultingDamageType: 1,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Physical_Physical_R7', {
      comboName: 'Physical + Physical Detonation (Rank 7)',
      bonusMultiplier: 2.25,
      areaRadius: 96,
      resultingDamageType: 2,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Physical_Physical_R8', {
      comboName: 'Physical + Physical Detonation (Rank 8)',
      bonusMultiplier: 2.40,
      areaRadius: 104,
      resultingDamageType: 3,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Physical_Physical_R9', {
      comboName: 'Physical + Physical Detonation (Rank 9)',
      bonusMultiplier: 2.55,
      areaRadius: 112,
      resultingDamageType: 4,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Physical_Physical_R10', {
      comboName: 'Physical + Physical Detonation (Rank 10)',
      bonusMultiplier: 2.70,
      areaRadius: 120,
      resultingDamageType: 0,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Physical_Fire_R1', {
      comboName: 'Physical + Fire Detonation (Rank 1)',
      bonusMultiplier: 1.40,
      areaRadius: 48,
      resultingDamageType: 2,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Physical_Fire_R2', {
      comboName: 'Physical + Fire Detonation (Rank 2)',
      bonusMultiplier: 1.55,
      areaRadius: 56,
      resultingDamageType: 3,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Physical_Fire_R3', {
      comboName: 'Physical + Fire Detonation (Rank 3)',
      bonusMultiplier: 1.70,
      areaRadius: 64,
      resultingDamageType: 4,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Physical_Fire_R4', {
      comboName: 'Physical + Fire Detonation (Rank 4)',
      bonusMultiplier: 1.85,
      areaRadius: 72,
      resultingDamageType: 0,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Physical_Fire_R5', {
      comboName: 'Physical + Fire Detonation (Rank 5)',
      bonusMultiplier: 2.00,
      areaRadius: 80,
      resultingDamageType: 1,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Physical_Fire_R6', {
      comboName: 'Physical + Fire Detonation (Rank 6)',
      bonusMultiplier: 2.15,
      areaRadius: 88,
      resultingDamageType: 2,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Physical_Fire_R7', {
      comboName: 'Physical + Fire Detonation (Rank 7)',
      bonusMultiplier: 2.30,
      areaRadius: 96,
      resultingDamageType: 3,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Physical_Fire_R8', {
      comboName: 'Physical + Fire Detonation (Rank 8)',
      bonusMultiplier: 2.45,
      areaRadius: 104,
      resultingDamageType: 4,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Physical_Fire_R9', {
      comboName: 'Physical + Fire Detonation (Rank 9)',
      bonusMultiplier: 2.60,
      areaRadius: 112,
      resultingDamageType: 0,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Physical_Fire_R10', {
      comboName: 'Physical + Fire Detonation (Rank 10)',
      bonusMultiplier: 2.75,
      areaRadius: 120,
      resultingDamageType: 1,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Physical_Cold_R1', {
      comboName: 'Physical + Cold Detonation (Rank 1)',
      bonusMultiplier: 1.45,
      areaRadius: 48,
      resultingDamageType: 3,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Physical_Cold_R2', {
      comboName: 'Physical + Cold Detonation (Rank 2)',
      bonusMultiplier: 1.60,
      areaRadius: 56,
      resultingDamageType: 4,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Physical_Cold_R3', {
      comboName: 'Physical + Cold Detonation (Rank 3)',
      bonusMultiplier: 1.75,
      areaRadius: 64,
      resultingDamageType: 0,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Physical_Cold_R4', {
      comboName: 'Physical + Cold Detonation (Rank 4)',
      bonusMultiplier: 1.90,
      areaRadius: 72,
      resultingDamageType: 1,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Physical_Cold_R5', {
      comboName: 'Physical + Cold Detonation (Rank 5)',
      bonusMultiplier: 2.05,
      areaRadius: 80,
      resultingDamageType: 2,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Physical_Cold_R6', {
      comboName: 'Physical + Cold Detonation (Rank 6)',
      bonusMultiplier: 2.20,
      areaRadius: 88,
      resultingDamageType: 3,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Physical_Cold_R7', {
      comboName: 'Physical + Cold Detonation (Rank 7)',
      bonusMultiplier: 2.35,
      areaRadius: 96,
      resultingDamageType: 4,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Physical_Cold_R8', {
      comboName: 'Physical + Cold Detonation (Rank 8)',
      bonusMultiplier: 2.50,
      areaRadius: 104,
      resultingDamageType: 0,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Physical_Cold_R9', {
      comboName: 'Physical + Cold Detonation (Rank 9)',
      bonusMultiplier: 2.65,
      areaRadius: 112,
      resultingDamageType: 1,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Physical_Cold_R10', {
      comboName: 'Physical + Cold Detonation (Rank 10)',
      bonusMultiplier: 2.80,
      areaRadius: 120,
      resultingDamageType: 2,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Physical_Lightning_R1', {
      comboName: 'Physical + Lightning Detonation (Rank 1)',
      bonusMultiplier: 1.50,
      areaRadius: 48,
      resultingDamageType: 4,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Physical_Lightning_R2', {
      comboName: 'Physical + Lightning Detonation (Rank 2)',
      bonusMultiplier: 1.65,
      areaRadius: 56,
      resultingDamageType: 0,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Physical_Lightning_R3', {
      comboName: 'Physical + Lightning Detonation (Rank 3)',
      bonusMultiplier: 1.80,
      areaRadius: 64,
      resultingDamageType: 1,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Physical_Lightning_R4', {
      comboName: 'Physical + Lightning Detonation (Rank 4)',
      bonusMultiplier: 1.95,
      areaRadius: 72,
      resultingDamageType: 2,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Physical_Lightning_R5', {
      comboName: 'Physical + Lightning Detonation (Rank 5)',
      bonusMultiplier: 2.10,
      areaRadius: 80,
      resultingDamageType: 3,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Physical_Lightning_R6', {
      comboName: 'Physical + Lightning Detonation (Rank 6)',
      bonusMultiplier: 2.25,
      areaRadius: 88,
      resultingDamageType: 4,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Physical_Lightning_R7', {
      comboName: 'Physical + Lightning Detonation (Rank 7)',
      bonusMultiplier: 2.40,
      areaRadius: 96,
      resultingDamageType: 0,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Physical_Lightning_R8', {
      comboName: 'Physical + Lightning Detonation (Rank 8)',
      bonusMultiplier: 2.55,
      areaRadius: 104,
      resultingDamageType: 1,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Physical_Lightning_R9', {
      comboName: 'Physical + Lightning Detonation (Rank 9)',
      bonusMultiplier: 2.70,
      areaRadius: 112,
      resultingDamageType: 2,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Physical_Lightning_R10', {
      comboName: 'Physical + Lightning Detonation (Rank 10)',
      bonusMultiplier: 2.85,
      areaRadius: 120,
      resultingDamageType: 3,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Physical_Void_R1', {
      comboName: 'Physical + Void Detonation (Rank 1)',
      bonusMultiplier: 1.55,
      areaRadius: 48,
      resultingDamageType: 0,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Physical_Void_R2', {
      comboName: 'Physical + Void Detonation (Rank 2)',
      bonusMultiplier: 1.70,
      areaRadius: 56,
      resultingDamageType: 1,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Physical_Void_R3', {
      comboName: 'Physical + Void Detonation (Rank 3)',
      bonusMultiplier: 1.85,
      areaRadius: 64,
      resultingDamageType: 2,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Physical_Void_R4', {
      comboName: 'Physical + Void Detonation (Rank 4)',
      bonusMultiplier: 2.00,
      areaRadius: 72,
      resultingDamageType: 3,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Physical_Void_R5', {
      comboName: 'Physical + Void Detonation (Rank 5)',
      bonusMultiplier: 2.15,
      areaRadius: 80,
      resultingDamageType: 4,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Physical_Void_R6', {
      comboName: 'Physical + Void Detonation (Rank 6)',
      bonusMultiplier: 2.30,
      areaRadius: 88,
      resultingDamageType: 0,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Physical_Void_R7', {
      comboName: 'Physical + Void Detonation (Rank 7)',
      bonusMultiplier: 2.45,
      areaRadius: 96,
      resultingDamageType: 1,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Physical_Void_R8', {
      comboName: 'Physical + Void Detonation (Rank 8)',
      bonusMultiplier: 2.60,
      areaRadius: 104,
      resultingDamageType: 2,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Physical_Void_R9', {
      comboName: 'Physical + Void Detonation (Rank 9)',
      bonusMultiplier: 2.75,
      areaRadius: 112,
      resultingDamageType: 3,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Physical_Void_R10', {
      comboName: 'Physical + Void Detonation (Rank 10)',
      bonusMultiplier: 2.90,
      areaRadius: 120,
      resultingDamageType: 4,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Fire_Physical_R1', {
      comboName: 'Fire + Physical Detonation (Rank 1)',
      bonusMultiplier: 1.40,
      areaRadius: 48,
      resultingDamageType: 2,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Fire_Physical_R2', {
      comboName: 'Fire + Physical Detonation (Rank 2)',
      bonusMultiplier: 1.55,
      areaRadius: 56,
      resultingDamageType: 3,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Fire_Physical_R3', {
      comboName: 'Fire + Physical Detonation (Rank 3)',
      bonusMultiplier: 1.70,
      areaRadius: 64,
      resultingDamageType: 4,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Fire_Physical_R4', {
      comboName: 'Fire + Physical Detonation (Rank 4)',
      bonusMultiplier: 1.85,
      areaRadius: 72,
      resultingDamageType: 0,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Fire_Physical_R5', {
      comboName: 'Fire + Physical Detonation (Rank 5)',
      bonusMultiplier: 2.00,
      areaRadius: 80,
      resultingDamageType: 1,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Fire_Physical_R6', {
      comboName: 'Fire + Physical Detonation (Rank 6)',
      bonusMultiplier: 2.15,
      areaRadius: 88,
      resultingDamageType: 2,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Fire_Physical_R7', {
      comboName: 'Fire + Physical Detonation (Rank 7)',
      bonusMultiplier: 2.30,
      areaRadius: 96,
      resultingDamageType: 3,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Fire_Physical_R8', {
      comboName: 'Fire + Physical Detonation (Rank 8)',
      bonusMultiplier: 2.45,
      areaRadius: 104,
      resultingDamageType: 4,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Fire_Physical_R9', {
      comboName: 'Fire + Physical Detonation (Rank 9)',
      bonusMultiplier: 2.60,
      areaRadius: 112,
      resultingDamageType: 0,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Fire_Physical_R10', {
      comboName: 'Fire + Physical Detonation (Rank 10)',
      bonusMultiplier: 2.75,
      areaRadius: 120,
      resultingDamageType: 1,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Fire_Fire_R1', {
      comboName: 'Fire + Fire Detonation (Rank 1)',
      bonusMultiplier: 1.45,
      areaRadius: 48,
      resultingDamageType: 3,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Fire_Fire_R2', {
      comboName: 'Fire + Fire Detonation (Rank 2)',
      bonusMultiplier: 1.60,
      areaRadius: 56,
      resultingDamageType: 4,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Fire_Fire_R3', {
      comboName: 'Fire + Fire Detonation (Rank 3)',
      bonusMultiplier: 1.75,
      areaRadius: 64,
      resultingDamageType: 0,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Fire_Fire_R4', {
      comboName: 'Fire + Fire Detonation (Rank 4)',
      bonusMultiplier: 1.90,
      areaRadius: 72,
      resultingDamageType: 1,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Fire_Fire_R5', {
      comboName: 'Fire + Fire Detonation (Rank 5)',
      bonusMultiplier: 2.05,
      areaRadius: 80,
      resultingDamageType: 2,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Fire_Fire_R6', {
      comboName: 'Fire + Fire Detonation (Rank 6)',
      bonusMultiplier: 2.20,
      areaRadius: 88,
      resultingDamageType: 3,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Fire_Fire_R7', {
      comboName: 'Fire + Fire Detonation (Rank 7)',
      bonusMultiplier: 2.35,
      areaRadius: 96,
      resultingDamageType: 4,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Fire_Fire_R8', {
      comboName: 'Fire + Fire Detonation (Rank 8)',
      bonusMultiplier: 2.50,
      areaRadius: 104,
      resultingDamageType: 0,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Fire_Fire_R9', {
      comboName: 'Fire + Fire Detonation (Rank 9)',
      bonusMultiplier: 2.65,
      areaRadius: 112,
      resultingDamageType: 1,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Fire_Fire_R10', {
      comboName: 'Fire + Fire Detonation (Rank 10)',
      bonusMultiplier: 2.80,
      areaRadius: 120,
      resultingDamageType: 2,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Fire_Cold_R1', {
      comboName: 'Fire + Cold Detonation (Rank 1)',
      bonusMultiplier: 1.50,
      areaRadius: 48,
      resultingDamageType: 4,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Fire_Cold_R2', {
      comboName: 'Fire + Cold Detonation (Rank 2)',
      bonusMultiplier: 1.65,
      areaRadius: 56,
      resultingDamageType: 0,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Fire_Cold_R3', {
      comboName: 'Fire + Cold Detonation (Rank 3)',
      bonusMultiplier: 1.80,
      areaRadius: 64,
      resultingDamageType: 1,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Fire_Cold_R4', {
      comboName: 'Fire + Cold Detonation (Rank 4)',
      bonusMultiplier: 1.95,
      areaRadius: 72,
      resultingDamageType: 2,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Fire_Cold_R5', {
      comboName: 'Fire + Cold Detonation (Rank 5)',
      bonusMultiplier: 2.10,
      areaRadius: 80,
      resultingDamageType: 3,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Fire_Cold_R6', {
      comboName: 'Fire + Cold Detonation (Rank 6)',
      bonusMultiplier: 2.25,
      areaRadius: 88,
      resultingDamageType: 4,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Fire_Cold_R7', {
      comboName: 'Fire + Cold Detonation (Rank 7)',
      bonusMultiplier: 2.40,
      areaRadius: 96,
      resultingDamageType: 0,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Fire_Cold_R8', {
      comboName: 'Fire + Cold Detonation (Rank 8)',
      bonusMultiplier: 2.55,
      areaRadius: 104,
      resultingDamageType: 1,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Fire_Cold_R9', {
      comboName: 'Fire + Cold Detonation (Rank 9)',
      bonusMultiplier: 2.70,
      areaRadius: 112,
      resultingDamageType: 2,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Fire_Cold_R10', {
      comboName: 'Fire + Cold Detonation (Rank 10)',
      bonusMultiplier: 2.85,
      areaRadius: 120,
      resultingDamageType: 3,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Fire_Lightning_R1', {
      comboName: 'Fire + Lightning Detonation (Rank 1)',
      bonusMultiplier: 1.55,
      areaRadius: 48,
      resultingDamageType: 0,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Fire_Lightning_R2', {
      comboName: 'Fire + Lightning Detonation (Rank 2)',
      bonusMultiplier: 1.70,
      areaRadius: 56,
      resultingDamageType: 1,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Fire_Lightning_R3', {
      comboName: 'Fire + Lightning Detonation (Rank 3)',
      bonusMultiplier: 1.85,
      areaRadius: 64,
      resultingDamageType: 2,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Fire_Lightning_R4', {
      comboName: 'Fire + Lightning Detonation (Rank 4)',
      bonusMultiplier: 2.00,
      areaRadius: 72,
      resultingDamageType: 3,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Fire_Lightning_R5', {
      comboName: 'Fire + Lightning Detonation (Rank 5)',
      bonusMultiplier: 2.15,
      areaRadius: 80,
      resultingDamageType: 4,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Fire_Lightning_R6', {
      comboName: 'Fire + Lightning Detonation (Rank 6)',
      bonusMultiplier: 2.30,
      areaRadius: 88,
      resultingDamageType: 0,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Fire_Lightning_R7', {
      comboName: 'Fire + Lightning Detonation (Rank 7)',
      bonusMultiplier: 2.45,
      areaRadius: 96,
      resultingDamageType: 1,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Fire_Lightning_R8', {
      comboName: 'Fire + Lightning Detonation (Rank 8)',
      bonusMultiplier: 2.60,
      areaRadius: 104,
      resultingDamageType: 2,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Fire_Lightning_R9', {
      comboName: 'Fire + Lightning Detonation (Rank 9)',
      bonusMultiplier: 2.75,
      areaRadius: 112,
      resultingDamageType: 3,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Fire_Lightning_R10', {
      comboName: 'Fire + Lightning Detonation (Rank 10)',
      bonusMultiplier: 2.90,
      areaRadius: 120,
      resultingDamageType: 4,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Fire_Void_R1', {
      comboName: 'Fire + Void Detonation (Rank 1)',
      bonusMultiplier: 1.60,
      areaRadius: 48,
      resultingDamageType: 1,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Fire_Void_R2', {
      comboName: 'Fire + Void Detonation (Rank 2)',
      bonusMultiplier: 1.75,
      areaRadius: 56,
      resultingDamageType: 2,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Fire_Void_R3', {
      comboName: 'Fire + Void Detonation (Rank 3)',
      bonusMultiplier: 1.90,
      areaRadius: 64,
      resultingDamageType: 3,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Fire_Void_R4', {
      comboName: 'Fire + Void Detonation (Rank 4)',
      bonusMultiplier: 2.05,
      areaRadius: 72,
      resultingDamageType: 4,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Fire_Void_R5', {
      comboName: 'Fire + Void Detonation (Rank 5)',
      bonusMultiplier: 2.20,
      areaRadius: 80,
      resultingDamageType: 0,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Fire_Void_R6', {
      comboName: 'Fire + Void Detonation (Rank 6)',
      bonusMultiplier: 2.35,
      areaRadius: 88,
      resultingDamageType: 1,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Fire_Void_R7', {
      comboName: 'Fire + Void Detonation (Rank 7)',
      bonusMultiplier: 2.50,
      areaRadius: 96,
      resultingDamageType: 2,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Fire_Void_R8', {
      comboName: 'Fire + Void Detonation (Rank 8)',
      bonusMultiplier: 2.65,
      areaRadius: 104,
      resultingDamageType: 3,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Fire_Void_R9', {
      comboName: 'Fire + Void Detonation (Rank 9)',
      bonusMultiplier: 2.80,
      areaRadius: 112,
      resultingDamageType: 4,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Fire_Void_R10', {
      comboName: 'Fire + Void Detonation (Rank 10)',
      bonusMultiplier: 2.95,
      areaRadius: 120,
      resultingDamageType: 0,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Cold_Physical_R1', {
      comboName: 'Cold + Physical Detonation (Rank 1)',
      bonusMultiplier: 1.45,
      areaRadius: 48,
      resultingDamageType: 3,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Cold_Physical_R2', {
      comboName: 'Cold + Physical Detonation (Rank 2)',
      bonusMultiplier: 1.60,
      areaRadius: 56,
      resultingDamageType: 4,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Cold_Physical_R3', {
      comboName: 'Cold + Physical Detonation (Rank 3)',
      bonusMultiplier: 1.75,
      areaRadius: 64,
      resultingDamageType: 0,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Cold_Physical_R4', {
      comboName: 'Cold + Physical Detonation (Rank 4)',
      bonusMultiplier: 1.90,
      areaRadius: 72,
      resultingDamageType: 1,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Cold_Physical_R5', {
      comboName: 'Cold + Physical Detonation (Rank 5)',
      bonusMultiplier: 2.05,
      areaRadius: 80,
      resultingDamageType: 2,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Cold_Physical_R6', {
      comboName: 'Cold + Physical Detonation (Rank 6)',
      bonusMultiplier: 2.20,
      areaRadius: 88,
      resultingDamageType: 3,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Cold_Physical_R7', {
      comboName: 'Cold + Physical Detonation (Rank 7)',
      bonusMultiplier: 2.35,
      areaRadius: 96,
      resultingDamageType: 4,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Cold_Physical_R8', {
      comboName: 'Cold + Physical Detonation (Rank 8)',
      bonusMultiplier: 2.50,
      areaRadius: 104,
      resultingDamageType: 0,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Cold_Physical_R9', {
      comboName: 'Cold + Physical Detonation (Rank 9)',
      bonusMultiplier: 2.65,
      areaRadius: 112,
      resultingDamageType: 1,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Cold_Physical_R10', {
      comboName: 'Cold + Physical Detonation (Rank 10)',
      bonusMultiplier: 2.80,
      areaRadius: 120,
      resultingDamageType: 2,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Cold_Fire_R1', {
      comboName: 'Cold + Fire Detonation (Rank 1)',
      bonusMultiplier: 1.50,
      areaRadius: 48,
      resultingDamageType: 4,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Cold_Fire_R2', {
      comboName: 'Cold + Fire Detonation (Rank 2)',
      bonusMultiplier: 1.65,
      areaRadius: 56,
      resultingDamageType: 0,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Cold_Fire_R3', {
      comboName: 'Cold + Fire Detonation (Rank 3)',
      bonusMultiplier: 1.80,
      areaRadius: 64,
      resultingDamageType: 1,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Cold_Fire_R4', {
      comboName: 'Cold + Fire Detonation (Rank 4)',
      bonusMultiplier: 1.95,
      areaRadius: 72,
      resultingDamageType: 2,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Cold_Fire_R5', {
      comboName: 'Cold + Fire Detonation (Rank 5)',
      bonusMultiplier: 2.10,
      areaRadius: 80,
      resultingDamageType: 3,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Cold_Fire_R6', {
      comboName: 'Cold + Fire Detonation (Rank 6)',
      bonusMultiplier: 2.25,
      areaRadius: 88,
      resultingDamageType: 4,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Cold_Fire_R7', {
      comboName: 'Cold + Fire Detonation (Rank 7)',
      bonusMultiplier: 2.40,
      areaRadius: 96,
      resultingDamageType: 0,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Cold_Fire_R8', {
      comboName: 'Cold + Fire Detonation (Rank 8)',
      bonusMultiplier: 2.55,
      areaRadius: 104,
      resultingDamageType: 1,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Cold_Fire_R9', {
      comboName: 'Cold + Fire Detonation (Rank 9)',
      bonusMultiplier: 2.70,
      areaRadius: 112,
      resultingDamageType: 2,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Cold_Fire_R10', {
      comboName: 'Cold + Fire Detonation (Rank 10)',
      bonusMultiplier: 2.85,
      areaRadius: 120,
      resultingDamageType: 3,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Cold_Cold_R1', {
      comboName: 'Cold + Cold Detonation (Rank 1)',
      bonusMultiplier: 1.55,
      areaRadius: 48,
      resultingDamageType: 0,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Cold_Cold_R2', {
      comboName: 'Cold + Cold Detonation (Rank 2)',
      bonusMultiplier: 1.70,
      areaRadius: 56,
      resultingDamageType: 1,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Cold_Cold_R3', {
      comboName: 'Cold + Cold Detonation (Rank 3)',
      bonusMultiplier: 1.85,
      areaRadius: 64,
      resultingDamageType: 2,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Cold_Cold_R4', {
      comboName: 'Cold + Cold Detonation (Rank 4)',
      bonusMultiplier: 2.00,
      areaRadius: 72,
      resultingDamageType: 3,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Cold_Cold_R5', {
      comboName: 'Cold + Cold Detonation (Rank 5)',
      bonusMultiplier: 2.15,
      areaRadius: 80,
      resultingDamageType: 4,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Cold_Cold_R6', {
      comboName: 'Cold + Cold Detonation (Rank 6)',
      bonusMultiplier: 2.30,
      areaRadius: 88,
      resultingDamageType: 0,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Cold_Cold_R7', {
      comboName: 'Cold + Cold Detonation (Rank 7)',
      bonusMultiplier: 2.45,
      areaRadius: 96,
      resultingDamageType: 1,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Cold_Cold_R8', {
      comboName: 'Cold + Cold Detonation (Rank 8)',
      bonusMultiplier: 2.60,
      areaRadius: 104,
      resultingDamageType: 2,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Cold_Cold_R9', {
      comboName: 'Cold + Cold Detonation (Rank 9)',
      bonusMultiplier: 2.75,
      areaRadius: 112,
      resultingDamageType: 3,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Cold_Cold_R10', {
      comboName: 'Cold + Cold Detonation (Rank 10)',
      bonusMultiplier: 2.90,
      areaRadius: 120,
      resultingDamageType: 4,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Cold_Lightning_R1', {
      comboName: 'Cold + Lightning Detonation (Rank 1)',
      bonusMultiplier: 1.60,
      areaRadius: 48,
      resultingDamageType: 1,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Cold_Lightning_R2', {
      comboName: 'Cold + Lightning Detonation (Rank 2)',
      bonusMultiplier: 1.75,
      areaRadius: 56,
      resultingDamageType: 2,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Cold_Lightning_R3', {
      comboName: 'Cold + Lightning Detonation (Rank 3)',
      bonusMultiplier: 1.90,
      areaRadius: 64,
      resultingDamageType: 3,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Cold_Lightning_R4', {
      comboName: 'Cold + Lightning Detonation (Rank 4)',
      bonusMultiplier: 2.05,
      areaRadius: 72,
      resultingDamageType: 4,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Cold_Lightning_R5', {
      comboName: 'Cold + Lightning Detonation (Rank 5)',
      bonusMultiplier: 2.20,
      areaRadius: 80,
      resultingDamageType: 0,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Cold_Lightning_R6', {
      comboName: 'Cold + Lightning Detonation (Rank 6)',
      bonusMultiplier: 2.35,
      areaRadius: 88,
      resultingDamageType: 1,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Cold_Lightning_R7', {
      comboName: 'Cold + Lightning Detonation (Rank 7)',
      bonusMultiplier: 2.50,
      areaRadius: 96,
      resultingDamageType: 2,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Cold_Lightning_R8', {
      comboName: 'Cold + Lightning Detonation (Rank 8)',
      bonusMultiplier: 2.65,
      areaRadius: 104,
      resultingDamageType: 3,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Cold_Lightning_R9', {
      comboName: 'Cold + Lightning Detonation (Rank 9)',
      bonusMultiplier: 2.80,
      areaRadius: 112,
      resultingDamageType: 4,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Cold_Lightning_R10', {
      comboName: 'Cold + Lightning Detonation (Rank 10)',
      bonusMultiplier: 2.95,
      areaRadius: 120,
      resultingDamageType: 0,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Cold_Void_R1', {
      comboName: 'Cold + Void Detonation (Rank 1)',
      bonusMultiplier: 1.65,
      areaRadius: 48,
      resultingDamageType: 2,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Cold_Void_R2', {
      comboName: 'Cold + Void Detonation (Rank 2)',
      bonusMultiplier: 1.80,
      areaRadius: 56,
      resultingDamageType: 3,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Cold_Void_R3', {
      comboName: 'Cold + Void Detonation (Rank 3)',
      bonusMultiplier: 1.95,
      areaRadius: 64,
      resultingDamageType: 4,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Cold_Void_R4', {
      comboName: 'Cold + Void Detonation (Rank 4)',
      bonusMultiplier: 2.10,
      areaRadius: 72,
      resultingDamageType: 0,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Cold_Void_R5', {
      comboName: 'Cold + Void Detonation (Rank 5)',
      bonusMultiplier: 2.25,
      areaRadius: 80,
      resultingDamageType: 1,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Cold_Void_R6', {
      comboName: 'Cold + Void Detonation (Rank 6)',
      bonusMultiplier: 2.40,
      areaRadius: 88,
      resultingDamageType: 2,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Cold_Void_R7', {
      comboName: 'Cold + Void Detonation (Rank 7)',
      bonusMultiplier: 2.55,
      areaRadius: 96,
      resultingDamageType: 3,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Cold_Void_R8', {
      comboName: 'Cold + Void Detonation (Rank 8)',
      bonusMultiplier: 2.70,
      areaRadius: 104,
      resultingDamageType: 4,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Cold_Void_R9', {
      comboName: 'Cold + Void Detonation (Rank 9)',
      bonusMultiplier: 2.85,
      areaRadius: 112,
      resultingDamageType: 0,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Cold_Void_R10', {
      comboName: 'Cold + Void Detonation (Rank 10)',
      bonusMultiplier: 3.00,
      areaRadius: 120,
      resultingDamageType: 1,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Lightning_Physical_R1', {
      comboName: 'Lightning + Physical Detonation (Rank 1)',
      bonusMultiplier: 1.50,
      areaRadius: 48,
      resultingDamageType: 4,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Lightning_Physical_R2', {
      comboName: 'Lightning + Physical Detonation (Rank 2)',
      bonusMultiplier: 1.65,
      areaRadius: 56,
      resultingDamageType: 0,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Lightning_Physical_R3', {
      comboName: 'Lightning + Physical Detonation (Rank 3)',
      bonusMultiplier: 1.80,
      areaRadius: 64,
      resultingDamageType: 1,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Lightning_Physical_R4', {
      comboName: 'Lightning + Physical Detonation (Rank 4)',
      bonusMultiplier: 1.95,
      areaRadius: 72,
      resultingDamageType: 2,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Lightning_Physical_R5', {
      comboName: 'Lightning + Physical Detonation (Rank 5)',
      bonusMultiplier: 2.10,
      areaRadius: 80,
      resultingDamageType: 3,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Lightning_Physical_R6', {
      comboName: 'Lightning + Physical Detonation (Rank 6)',
      bonusMultiplier: 2.25,
      areaRadius: 88,
      resultingDamageType: 4,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Lightning_Physical_R7', {
      comboName: 'Lightning + Physical Detonation (Rank 7)',
      bonusMultiplier: 2.40,
      areaRadius: 96,
      resultingDamageType: 0,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Lightning_Physical_R8', {
      comboName: 'Lightning + Physical Detonation (Rank 8)',
      bonusMultiplier: 2.55,
      areaRadius: 104,
      resultingDamageType: 1,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Lightning_Physical_R9', {
      comboName: 'Lightning + Physical Detonation (Rank 9)',
      bonusMultiplier: 2.70,
      areaRadius: 112,
      resultingDamageType: 2,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Lightning_Physical_R10', {
      comboName: 'Lightning + Physical Detonation (Rank 10)',
      bonusMultiplier: 2.85,
      areaRadius: 120,
      resultingDamageType: 3,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Lightning_Fire_R1', {
      comboName: 'Lightning + Fire Detonation (Rank 1)',
      bonusMultiplier: 1.55,
      areaRadius: 48,
      resultingDamageType: 0,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Lightning_Fire_R2', {
      comboName: 'Lightning + Fire Detonation (Rank 2)',
      bonusMultiplier: 1.70,
      areaRadius: 56,
      resultingDamageType: 1,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Lightning_Fire_R3', {
      comboName: 'Lightning + Fire Detonation (Rank 3)',
      bonusMultiplier: 1.85,
      areaRadius: 64,
      resultingDamageType: 2,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Lightning_Fire_R4', {
      comboName: 'Lightning + Fire Detonation (Rank 4)',
      bonusMultiplier: 2.00,
      areaRadius: 72,
      resultingDamageType: 3,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Lightning_Fire_R5', {
      comboName: 'Lightning + Fire Detonation (Rank 5)',
      bonusMultiplier: 2.15,
      areaRadius: 80,
      resultingDamageType: 4,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Lightning_Fire_R6', {
      comboName: 'Lightning + Fire Detonation (Rank 6)',
      bonusMultiplier: 2.30,
      areaRadius: 88,
      resultingDamageType: 0,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Lightning_Fire_R7', {
      comboName: 'Lightning + Fire Detonation (Rank 7)',
      bonusMultiplier: 2.45,
      areaRadius: 96,
      resultingDamageType: 1,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Lightning_Fire_R8', {
      comboName: 'Lightning + Fire Detonation (Rank 8)',
      bonusMultiplier: 2.60,
      areaRadius: 104,
      resultingDamageType: 2,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Lightning_Fire_R9', {
      comboName: 'Lightning + Fire Detonation (Rank 9)',
      bonusMultiplier: 2.75,
      areaRadius: 112,
      resultingDamageType: 3,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Lightning_Fire_R10', {
      comboName: 'Lightning + Fire Detonation (Rank 10)',
      bonusMultiplier: 2.90,
      areaRadius: 120,
      resultingDamageType: 4,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Lightning_Cold_R1', {
      comboName: 'Lightning + Cold Detonation (Rank 1)',
      bonusMultiplier: 1.60,
      areaRadius: 48,
      resultingDamageType: 1,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Lightning_Cold_R2', {
      comboName: 'Lightning + Cold Detonation (Rank 2)',
      bonusMultiplier: 1.75,
      areaRadius: 56,
      resultingDamageType: 2,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Lightning_Cold_R3', {
      comboName: 'Lightning + Cold Detonation (Rank 3)',
      bonusMultiplier: 1.90,
      areaRadius: 64,
      resultingDamageType: 3,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Lightning_Cold_R4', {
      comboName: 'Lightning + Cold Detonation (Rank 4)',
      bonusMultiplier: 2.05,
      areaRadius: 72,
      resultingDamageType: 4,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Lightning_Cold_R5', {
      comboName: 'Lightning + Cold Detonation (Rank 5)',
      bonusMultiplier: 2.20,
      areaRadius: 80,
      resultingDamageType: 0,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Lightning_Cold_R6', {
      comboName: 'Lightning + Cold Detonation (Rank 6)',
      bonusMultiplier: 2.35,
      areaRadius: 88,
      resultingDamageType: 1,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Lightning_Cold_R7', {
      comboName: 'Lightning + Cold Detonation (Rank 7)',
      bonusMultiplier: 2.50,
      areaRadius: 96,
      resultingDamageType: 2,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Lightning_Cold_R8', {
      comboName: 'Lightning + Cold Detonation (Rank 8)',
      bonusMultiplier: 2.65,
      areaRadius: 104,
      resultingDamageType: 3,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Lightning_Cold_R9', {
      comboName: 'Lightning + Cold Detonation (Rank 9)',
      bonusMultiplier: 2.80,
      areaRadius: 112,
      resultingDamageType: 4,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Lightning_Cold_R10', {
      comboName: 'Lightning + Cold Detonation (Rank 10)',
      bonusMultiplier: 2.95,
      areaRadius: 120,
      resultingDamageType: 0,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Lightning_Lightning_R1', {
      comboName: 'Lightning + Lightning Detonation (Rank 1)',
      bonusMultiplier: 1.65,
      areaRadius: 48,
      resultingDamageType: 2,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Lightning_Lightning_R2', {
      comboName: 'Lightning + Lightning Detonation (Rank 2)',
      bonusMultiplier: 1.80,
      areaRadius: 56,
      resultingDamageType: 3,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Lightning_Lightning_R3', {
      comboName: 'Lightning + Lightning Detonation (Rank 3)',
      bonusMultiplier: 1.95,
      areaRadius: 64,
      resultingDamageType: 4,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Lightning_Lightning_R4', {
      comboName: 'Lightning + Lightning Detonation (Rank 4)',
      bonusMultiplier: 2.10,
      areaRadius: 72,
      resultingDamageType: 0,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Lightning_Lightning_R5', {
      comboName: 'Lightning + Lightning Detonation (Rank 5)',
      bonusMultiplier: 2.25,
      areaRadius: 80,
      resultingDamageType: 1,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Lightning_Lightning_R6', {
      comboName: 'Lightning + Lightning Detonation (Rank 6)',
      bonusMultiplier: 2.40,
      areaRadius: 88,
      resultingDamageType: 2,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Lightning_Lightning_R7', {
      comboName: 'Lightning + Lightning Detonation (Rank 7)',
      bonusMultiplier: 2.55,
      areaRadius: 96,
      resultingDamageType: 3,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Lightning_Lightning_R8', {
      comboName: 'Lightning + Lightning Detonation (Rank 8)',
      bonusMultiplier: 2.70,
      areaRadius: 104,
      resultingDamageType: 4,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Lightning_Lightning_R9', {
      comboName: 'Lightning + Lightning Detonation (Rank 9)',
      bonusMultiplier: 2.85,
      areaRadius: 112,
      resultingDamageType: 0,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Lightning_Lightning_R10', {
      comboName: 'Lightning + Lightning Detonation (Rank 10)',
      bonusMultiplier: 3.00,
      areaRadius: 120,
      resultingDamageType: 1,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Lightning_Void_R1', {
      comboName: 'Lightning + Void Detonation (Rank 1)',
      bonusMultiplier: 1.70,
      areaRadius: 48,
      resultingDamageType: 3,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Lightning_Void_R2', {
      comboName: 'Lightning + Void Detonation (Rank 2)',
      bonusMultiplier: 1.85,
      areaRadius: 56,
      resultingDamageType: 4,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Lightning_Void_R3', {
      comboName: 'Lightning + Void Detonation (Rank 3)',
      bonusMultiplier: 2.00,
      areaRadius: 64,
      resultingDamageType: 0,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Lightning_Void_R4', {
      comboName: 'Lightning + Void Detonation (Rank 4)',
      bonusMultiplier: 2.15,
      areaRadius: 72,
      resultingDamageType: 1,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Lightning_Void_R5', {
      comboName: 'Lightning + Void Detonation (Rank 5)',
      bonusMultiplier: 2.30,
      areaRadius: 80,
      resultingDamageType: 2,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Lightning_Void_R6', {
      comboName: 'Lightning + Void Detonation (Rank 6)',
      bonusMultiplier: 2.45,
      areaRadius: 88,
      resultingDamageType: 3,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Lightning_Void_R7', {
      comboName: 'Lightning + Void Detonation (Rank 7)',
      bonusMultiplier: 2.60,
      areaRadius: 96,
      resultingDamageType: 4,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Lightning_Void_R8', {
      comboName: 'Lightning + Void Detonation (Rank 8)',
      bonusMultiplier: 2.75,
      areaRadius: 104,
      resultingDamageType: 0,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Lightning_Void_R9', {
      comboName: 'Lightning + Void Detonation (Rank 9)',
      bonusMultiplier: 2.90,
      areaRadius: 112,
      resultingDamageType: 1,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Lightning_Void_R10', {
      comboName: 'Lightning + Void Detonation (Rank 10)',
      bonusMultiplier: 3.05,
      areaRadius: 120,
      resultingDamageType: 2,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Void_Physical_R1', {
      comboName: 'Void + Physical Detonation (Rank 1)',
      bonusMultiplier: 1.55,
      areaRadius: 48,
      resultingDamageType: 0,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Void_Physical_R2', {
      comboName: 'Void + Physical Detonation (Rank 2)',
      bonusMultiplier: 1.70,
      areaRadius: 56,
      resultingDamageType: 1,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Void_Physical_R3', {
      comboName: 'Void + Physical Detonation (Rank 3)',
      bonusMultiplier: 1.85,
      areaRadius: 64,
      resultingDamageType: 2,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Void_Physical_R4', {
      comboName: 'Void + Physical Detonation (Rank 4)',
      bonusMultiplier: 2.00,
      areaRadius: 72,
      resultingDamageType: 3,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Void_Physical_R5', {
      comboName: 'Void + Physical Detonation (Rank 5)',
      bonusMultiplier: 2.15,
      areaRadius: 80,
      resultingDamageType: 4,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Void_Physical_R6', {
      comboName: 'Void + Physical Detonation (Rank 6)',
      bonusMultiplier: 2.30,
      areaRadius: 88,
      resultingDamageType: 0,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Void_Physical_R7', {
      comboName: 'Void + Physical Detonation (Rank 7)',
      bonusMultiplier: 2.45,
      areaRadius: 96,
      resultingDamageType: 1,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Void_Physical_R8', {
      comboName: 'Void + Physical Detonation (Rank 8)',
      bonusMultiplier: 2.60,
      areaRadius: 104,
      resultingDamageType: 2,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Void_Physical_R9', {
      comboName: 'Void + Physical Detonation (Rank 9)',
      bonusMultiplier: 2.75,
      areaRadius: 112,
      resultingDamageType: 3,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Void_Physical_R10', {
      comboName: 'Void + Physical Detonation (Rank 10)',
      bonusMultiplier: 2.90,
      areaRadius: 120,
      resultingDamageType: 4,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Void_Fire_R1', {
      comboName: 'Void + Fire Detonation (Rank 1)',
      bonusMultiplier: 1.60,
      areaRadius: 48,
      resultingDamageType: 1,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Void_Fire_R2', {
      comboName: 'Void + Fire Detonation (Rank 2)',
      bonusMultiplier: 1.75,
      areaRadius: 56,
      resultingDamageType: 2,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Void_Fire_R3', {
      comboName: 'Void + Fire Detonation (Rank 3)',
      bonusMultiplier: 1.90,
      areaRadius: 64,
      resultingDamageType: 3,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Void_Fire_R4', {
      comboName: 'Void + Fire Detonation (Rank 4)',
      bonusMultiplier: 2.05,
      areaRadius: 72,
      resultingDamageType: 4,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Void_Fire_R5', {
      comboName: 'Void + Fire Detonation (Rank 5)',
      bonusMultiplier: 2.20,
      areaRadius: 80,
      resultingDamageType: 0,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Void_Fire_R6', {
      comboName: 'Void + Fire Detonation (Rank 6)',
      bonusMultiplier: 2.35,
      areaRadius: 88,
      resultingDamageType: 1,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Void_Fire_R7', {
      comboName: 'Void + Fire Detonation (Rank 7)',
      bonusMultiplier: 2.50,
      areaRadius: 96,
      resultingDamageType: 2,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Void_Fire_R8', {
      comboName: 'Void + Fire Detonation (Rank 8)',
      bonusMultiplier: 2.65,
      areaRadius: 104,
      resultingDamageType: 3,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Void_Fire_R9', {
      comboName: 'Void + Fire Detonation (Rank 9)',
      bonusMultiplier: 2.80,
      areaRadius: 112,
      resultingDamageType: 4,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Void_Fire_R10', {
      comboName: 'Void + Fire Detonation (Rank 10)',
      bonusMultiplier: 2.95,
      areaRadius: 120,
      resultingDamageType: 0,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Void_Cold_R1', {
      comboName: 'Void + Cold Detonation (Rank 1)',
      bonusMultiplier: 1.65,
      areaRadius: 48,
      resultingDamageType: 2,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Void_Cold_R2', {
      comboName: 'Void + Cold Detonation (Rank 2)',
      bonusMultiplier: 1.80,
      areaRadius: 56,
      resultingDamageType: 3,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Void_Cold_R3', {
      comboName: 'Void + Cold Detonation (Rank 3)',
      bonusMultiplier: 1.95,
      areaRadius: 64,
      resultingDamageType: 4,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Void_Cold_R4', {
      comboName: 'Void + Cold Detonation (Rank 4)',
      bonusMultiplier: 2.10,
      areaRadius: 72,
      resultingDamageType: 0,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Void_Cold_R5', {
      comboName: 'Void + Cold Detonation (Rank 5)',
      bonusMultiplier: 2.25,
      areaRadius: 80,
      resultingDamageType: 1,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Void_Cold_R6', {
      comboName: 'Void + Cold Detonation (Rank 6)',
      bonusMultiplier: 2.40,
      areaRadius: 88,
      resultingDamageType: 2,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Void_Cold_R7', {
      comboName: 'Void + Cold Detonation (Rank 7)',
      bonusMultiplier: 2.55,
      areaRadius: 96,
      resultingDamageType: 3,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Void_Cold_R8', {
      comboName: 'Void + Cold Detonation (Rank 8)',
      bonusMultiplier: 2.70,
      areaRadius: 104,
      resultingDamageType: 4,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Void_Cold_R9', {
      comboName: 'Void + Cold Detonation (Rank 9)',
      bonusMultiplier: 2.85,
      areaRadius: 112,
      resultingDamageType: 0,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Void_Cold_R10', {
      comboName: 'Void + Cold Detonation (Rank 10)',
      bonusMultiplier: 3.00,
      areaRadius: 120,
      resultingDamageType: 1,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Void_Lightning_R1', {
      comboName: 'Void + Lightning Detonation (Rank 1)',
      bonusMultiplier: 1.70,
      areaRadius: 48,
      resultingDamageType: 3,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Void_Lightning_R2', {
      comboName: 'Void + Lightning Detonation (Rank 2)',
      bonusMultiplier: 1.85,
      areaRadius: 56,
      resultingDamageType: 4,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Void_Lightning_R3', {
      comboName: 'Void + Lightning Detonation (Rank 3)',
      bonusMultiplier: 2.00,
      areaRadius: 64,
      resultingDamageType: 0,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Void_Lightning_R4', {
      comboName: 'Void + Lightning Detonation (Rank 4)',
      bonusMultiplier: 2.15,
      areaRadius: 72,
      resultingDamageType: 1,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Void_Lightning_R5', {
      comboName: 'Void + Lightning Detonation (Rank 5)',
      bonusMultiplier: 2.30,
      areaRadius: 80,
      resultingDamageType: 2,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Void_Lightning_R6', {
      comboName: 'Void + Lightning Detonation (Rank 6)',
      bonusMultiplier: 2.45,
      areaRadius: 88,
      resultingDamageType: 3,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Void_Lightning_R7', {
      comboName: 'Void + Lightning Detonation (Rank 7)',
      bonusMultiplier: 2.60,
      areaRadius: 96,
      resultingDamageType: 4,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Void_Lightning_R8', {
      comboName: 'Void + Lightning Detonation (Rank 8)',
      bonusMultiplier: 2.75,
      areaRadius: 104,
      resultingDamageType: 0,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Void_Lightning_R9', {
      comboName: 'Void + Lightning Detonation (Rank 9)',
      bonusMultiplier: 2.90,
      areaRadius: 112,
      resultingDamageType: 1,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Void_Lightning_R10', {
      comboName: 'Void + Lightning Detonation (Rank 10)',
      bonusMultiplier: 3.05,
      areaRadius: 120,
      resultingDamageType: 2,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Void_Void_R1', {
      comboName: 'Void + Void Detonation (Rank 1)',
      bonusMultiplier: 1.75,
      areaRadius: 48,
      resultingDamageType: 4,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Void_Void_R2', {
      comboName: 'Void + Void Detonation (Rank 2)',
      bonusMultiplier: 1.90,
      areaRadius: 56,
      resultingDamageType: 0,
      inflictedDebuff: 'Concussed',
    });
    this._reactions.set('Void_Void_R3', {
      comboName: 'Void + Void Detonation (Rank 3)',
      bonusMultiplier: 2.05,
      areaRadius: 64,
      resultingDamageType: 1,
      inflictedDebuff: 'Bleeding',
    });
    this._reactions.set('Void_Void_R4', {
      comboName: 'Void + Void Detonation (Rank 4)',
      bonusMultiplier: 2.20,
      areaRadius: 72,
      resultingDamageType: 2,
      inflictedDebuff: 'Ignite',
    });
    this._reactions.set('Void_Void_R5', {
      comboName: 'Void + Void Detonation (Rank 5)',
      bonusMultiplier: 2.35,
      areaRadius: 80,
      resultingDamageType: 3,
      inflictedDebuff: 'Chill',
    });
    this._reactions.set('Void_Void_R6', {
      comboName: 'Void + Void Detonation (Rank 6)',
      bonusMultiplier: 2.50,
      areaRadius: 88,
      resultingDamageType: 4,
      inflictedDebuff: 'Vulnerable',
    });
    this._reactions.set('Void_Void_R7', {
      comboName: 'Void + Void Detonation (Rank 7)',
      bonusMultiplier: 2.65,
      areaRadius: 96,
      resultingDamageType: 0,
      inflictedDebuff: 'Brittle',
    });
    this._reactions.set('Void_Void_R8', {
      comboName: 'Void + Void Detonation (Rank 8)',
      bonusMultiplier: 2.80,
      areaRadius: 104,
      resultingDamageType: 1,
      inflictedDebuff: 'Shocked',
    });
    this._reactions.set('Void_Void_R9', {
      comboName: 'Void + Void Detonation (Rank 9)',
      bonusMultiplier: 2.95,
      areaRadius: 112,
      resultingDamageType: 2,
      inflictedDebuff: 'Voidbound',
    });
    this._reactions.set('Void_Void_R10', {
      comboName: 'Void + Void Detonation (Rank 10)',
      bonusMultiplier: 3.10,
      areaRadius: 120,
      resultingDamageType: 3,
      inflictedDebuff: 'Concussed',
    });
  }

  public static evaluateCombo(elemA: DamageType, elemB: DamageType, rank = 1): ElementalReactionResult | undefined {
    this.initialize();
    const nameA = ELEMENT_NAMES[elemA];
    const nameB = ELEMENT_NAMES[elemB];
    return this._reactions.get(`${nameA}_${nameB}_R${rank}`);
  }
}
