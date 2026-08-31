/**
 * @file Attributes.ts
 * @description Core RPG character attributes, resource pools, resistances, and secondary stats.
 */

import { Component } from '../core/ecs/Component.ts';

export class Attributes {
  // Primary Attributes
  public strength = 10;
  public agility = 10;
  public intelligence = 10;
  public vitality = 10;

  // Resource Pools
  public maxHealth = 100;
  public currentHealth = 100;
  public healthRegen = 1.0; // HP/sec

  public maxMana = 50;
  public currentMana = 50;
  public manaRegen = 2.0; // MP/sec

  public maxStamina = 100;
  public currentStamina = 100;
  public staminaRegen = 15.0; // SP/sec

  // Defensive Stats
  public armor = 0;
  public fireResistance = 0; // % reduction (0-75)
  public coldResistance = 0;
  public lightningResistance = 0;
  public voidResistance = 0;

  // Offensive Stats
  public attackPower = 10;
  public spellPower = 10;
  public attackSpeed = 1.0; // attacks/sec
  public critChance = 0.05; // 5% base
  public critMultiplier = 1.5; // 150% damage
  public lifeSteal = 0.0; // % of damage dealt

  // Movement
  public moveSpeed = 160; // px/sec

  public isDead = false;

  constructor(options: Partial<Attributes> = {}) {
    Object.assign(this, options);
    this.recalculateDerivedStats();
    this.currentHealth = this.maxHealth;
    this.currentMana = this.maxMana;
    this.currentStamina = this.maxStamina;
  }

  public recalculateDerivedStats(): void {
    this.maxHealth = 50 + this.vitality * 10;
    this.maxMana = 20 + this.intelligence * 8;
    this.attackPower = this.strength * 2 + this.agility;
    this.spellPower = this.intelligence * 2.5;
    this.critChance = Math.min(0.75, 0.05 + this.agility * 0.002);
  }

  public updateRegen(dt: number): void {
    if (this.isDead) return;

    this.currentHealth = Math.min(this.maxHealth, this.currentHealth + this.healthRegen * dt);
    this.currentMana = Math.min(this.maxMana, this.currentMana + this.manaRegen * dt);
    this.currentStamina = Math.min(this.maxStamina, this.currentStamina + this.staminaRegen * dt);
  }
}
