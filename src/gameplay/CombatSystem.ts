/**
 * @file CombatSystem.ts
 * @description Central ECS combat system processing damage resolution, hit sounds, floating text, and entity deaths.
 */

import { System } from '../core/ecs/System.ts';
import { SystemPhase } from '../core/ecs/Types.ts';
import { Attributes } from './Attributes.ts';
import { StatusEffects } from './StatusEffects.ts';
import { SoundFXGenerator } from '../audio/SoundFXGenerator.ts';
import { DamageCalculator, type DamagePackage, type DamageResult } from './DamageCalculator.ts';
import { Transform2D } from '../core/math/Transform2D.ts';
import { Vector2 } from '../core/math/Vector2.ts';
import { UIFloatingTextManager } from '../ui/UIFloatingText.ts';

export interface CombatEvent {
  targetEntityId: number;
  attackerEntityId?: number;
  damagePackage: DamagePackage;
  hitPosition: Vector2;
}

export class CombatSystem extends System {
  public phase = SystemPhase.Combat;
  public priority = 100;

  private _pendingHits: CombatEvent[] = [];
  public floatingTextManager?: UIFloatingTextManager;

  public queueHit(event: CombatEvent): void {
    this._pendingHits.push(event);
  }

  public override update(dt: number): void {
    // 1. Process queued hits
    while (this._pendingHits.length > 0) {
      const hit = this._pendingHits.shift()!;
      this._processHit(hit);
    }

    // 2. Process status effects & regeneration
    const query = this.world.createQuery({ all: [Attributes] });
    query.forEach((id, attributes: Attributes) => {
      attributes.updateRegen(dt);

      const effects = this.world.getComponent(id, StatusEffects);
      if (effects) {
        effects.update(dt, attributes, (tickDamage) => {
          const transform = this.world.getComponent(id, Transform2D);
          if (transform && this.floatingTextManager) {
            this.floatingTextManager.spawnDamage(transform.position, tickDamage, '#fb923c');
          }
        });
      }

      // Check death
      if (attributes.currentHealth <= 0 && !attributes.isDead) {
        attributes.isDead = true;
        SoundFXGenerator.playExplosion();
        // Defer entity destruction
        this.commands.defer((w) => {
          w.destroyEntity(id);
        });
      }
    }, [Attributes]);
  }

  private _processHit(event: CombatEvent): void {
    const targetAttrs = this.world.getComponent(event.targetEntityId, Attributes);
    if (!targetAttrs || targetAttrs.isDead) return;

    const result = DamageCalculator.calculate(event.damagePackage, targetAttrs);
    targetAttrs.currentHealth = Math.max(0, targetAttrs.currentHealth - result.finalDamage);

    SoundFXGenerator.playHitImpact();

    if (this.floatingTextManager) {
      const color = result.isCritical ? '#facc15' : '#ef4444';
      this.floatingTextManager.spawnDamage(event.hitPosition, result.finalDamage, color, result.isCritical);
    }

    // Life Steal
    if (event.damagePackage.attackerStats && event.damagePackage.attackerStats.lifeSteal > 0) {
      const healed = result.finalDamage * (event.damagePackage.attackerStats.lifeSteal / 100);
      event.damagePackage.attackerStats.currentHealth = Math.min(
        event.damagePackage.attackerStats.maxHealth,
        event.damagePackage.attackerStats.currentHealth + healed
      );
    }
  }
}
