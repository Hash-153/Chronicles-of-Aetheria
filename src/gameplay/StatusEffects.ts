/**
 * @file StatusEffects.ts
 * @description Buff and Debuff system managing Bleed, Burn, Freeze, Shock, Poison, Stun, Shield, and Haste ticks.
 */

import { Component } from '../core/ecs/Component.ts';
import { Attributes } from './Attributes.ts';

export const StatusEffectType = {
  Bleed: 0,
  Burn: 1,
  Freeze: 2,
  Shock: 3,
  Poison: 4,
  Stun: 5,
  Shield: 6,
  Haste: 7,
} as const;
export type StatusEffectType = typeof StatusEffectType[keyof typeof StatusEffectType];

export interface ActiveStatusEffect {
  type: StatusEffectType;
  duration: number;
  remainingTime: number;
  tickInterval: number;
  tickTimer: number;
  magnitude: number;
  sourceEntityId?: number;
}

export class StatusEffects {
  public activeEffects: ActiveStatusEffect[] = [];

  public applyEffect(
    type: StatusEffectType,
    duration: number,
    magnitude: number,
    tickInterval = 1.0,
    sourceEntityId?: number
  ): void {
    // Check existing
    const existing = this.activeEffects.find(e => e.type === type);
    if (existing) {
      existing.remainingTime = Math.max(existing.remainingTime, duration);
      existing.magnitude = Math.max(existing.magnitude, magnitude);
      return;
    }

    this.activeEffects.push({
      type,
      duration,
      remainingTime: duration,
      tickInterval,
      tickTimer: 0,
      magnitude,
      sourceEntityId,
    });
  }

  public hasEffect(type: StatusEffectType): boolean {
    return this.activeEffects.some(e => e.type === type);
  }

  public update(dt: number, attributes: Attributes, onTickDamage?: (amount: number, type: StatusEffectType) => void): void {
    for (let i = this.activeEffects.length - 1; i >= 0; i--) {
      const effect = this.activeEffects[i];
      effect.remainingTime -= dt;
      effect.tickTimer += dt;

      if (effect.tickTimer >= effect.tickInterval) {
        effect.tickTimer = 0;
        // Process periodic tick damage
        if (
          effect.type === StatusEffectType.Bleed ||
          effect.type === StatusEffectType.Burn ||
          effect.type === StatusEffectType.Poison
        ) {
          attributes.currentHealth = Math.max(0, attributes.currentHealth - effect.magnitude);
          if (onTickDamage) {
            onTickDamage(effect.magnitude, effect.type);
          }
        }
      }

      if (effect.remainingTime <= 0) {
        this.activeEffects.splice(i, 1);
      }
    }
  }
}
