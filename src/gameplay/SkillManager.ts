/**
 * @file SkillManager.ts
 * @description Manages equipped skill slots, cooldown timers, mana validation, and spell execution triggers.
 */

import { Component } from '../core/ecs/Component.ts';
import { type SkillDefinition, SKILL_FIREBALL, SKILL_FROST_NOVA, SKILL_LIGHTNING_CHAIN, SKILL_WHIRLWIND } from './SkillDefinitions.ts';
import { Attributes } from './Attributes.ts';
import { Vector2 } from '../core/math/Vector2.ts';
import { SoundFXGenerator } from '../audio/SoundFXGenerator.ts';

export interface EquippedSkillSlot {
  slotIndex: number;
  skill: SkillDefinition;
  currentCooldown: number;
}

export class SkillManager {
  public slots: (EquippedSkillSlot | null)[] = [
    { slotIndex: 0, skill: SKILL_FIREBALL, currentCooldown: 0 },
    { slotIndex: 1, skill: SKILL_FROST_NOVA, currentCooldown: 0 },
    { slotIndex: 2, skill: SKILL_LIGHTNING_CHAIN, currentCooldown: 0 },
    { slotIndex: 3, skill: SKILL_WHIRLWIND, currentCooldown: 0 },
  ];

  public update(dt: number): void {
    for (let i = 0; i < this.slots.length; i++) {
      const s = this.slots[i];
      if (s && s.currentCooldown > 0) {
        s.currentCooldown = Math.max(0, s.currentCooldown - dt);
      }
    }
  }

  public canCast(slotIndex: number, attributes: Attributes): boolean {
    const s = this.slots[slotIndex];
    if (!s) return false;
    return s.currentCooldown <= 0 && attributes.currentMana >= s.skill.manaCost;
  }

  public cast(slotIndex: number, attributes: Attributes, casterPos: Vector2, aimPos: Vector2): SkillDefinition | null {
    if (!this.canCast(slotIndex, attributes)) return null;

    const s = this.slots[slotIndex]!;
    attributes.currentMana -= s.skill.manaCost;
    s.currentCooldown = s.skill.cooldown;

    SoundFXGenerator.playLaser();
    return s.skill;
  }
}
