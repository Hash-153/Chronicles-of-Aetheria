/**
 * @file LevelProgression.ts
 * @description Experience points progression, level scaling curves, and attribute point awards.
 */

import { Component } from '../core/ecs/Component.ts';
import { Attributes } from './Attributes.ts';
import { SoundFXGenerator } from '../audio/SoundFXGenerator.ts';

export class LevelProgression {
  public currentLevel = 1;
  public currentXP = 0;
  public maxXP = 100;
  public unallocatedStatPoints = 0;
  public unallocatedSkillPoints = 0;

  public addXP(amount: number, attributes: Attributes): boolean {
    this.currentXP += amount;
    let didLevelUp = false;

    while (this.currentXP >= this.maxXP) {
      this.currentXP -= this.maxXP;
      this.currentLevel++;
      this.maxXP = Math.floor(this.maxXP * 1.35 + 50);

      this.unallocatedStatPoints += 5;
      this.unallocatedSkillPoints += 1;

      // Restore health & mana on level up
      attributes.currentHealth = attributes.maxHealth;
      attributes.currentMana = attributes.maxMana;

      SoundFXGenerator.playLevelUp();
      didLevelUp = true;
    }

    return didLevelUp;
  }
}
