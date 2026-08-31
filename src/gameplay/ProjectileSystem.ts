/**
 * @file ProjectileSystem.ts
 * @description Projectile simulation engine moving spell missiles, checking hitboxes, and exploding on impact.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Component } from '../core/ecs/Component.ts';
import { System } from '../core/ecs/System.ts';
import { SystemPhase } from '../core/ecs/Types.ts';
import { Transform2D } from '../core/math/Transform2D.ts';
import { type DamagePackage } from './DamageCalculator.ts';
import { CombatSystem } from './CombatSystem.ts';
import { Attributes } from './Attributes.ts';

export class Projectile {
  public velocity: Vector2;
  public maxDistance: number;
  public traveledDistance = 0;
  public hitRadius: number;
  public damagePackage: DamagePackage;
  public ownerEntityId: number;
  public pierceCount = 0;

  constructor(options: {
    velocity: Vector2;
    maxDistance?: number;
    hitRadius?: number;
    damagePackage: DamagePackage;
    ownerEntityId: number;
    pierceCount?: number;
  }) {
    this.velocity = options.velocity.clone();
    this.maxDistance = options.maxDistance ?? 600;
    this.hitRadius = options.hitRadius ?? 16;
    this.damagePackage = options.damagePackage;
    this.ownerEntityId = options.ownerEntityId;
    this.pierceCount = options.pierceCount ?? 0;
  }
}

export class ProjectileSystem extends System {
  public phase = SystemPhase.Update;
  public priority = 80;

  public override update(dt: number): void {
    const combatSystem = this.world.systemScheduler; // Query combat system for hit queueing
    const projQuery = this.world.createQuery({ all: [Transform2D, Projectile] });
    const targetQuery = this.world.createQuery({ all: [Transform2D, Attributes] });

    projQuery.forEach((projId, transform: Transform2D, proj: Projectile) => {
      const step = proj.velocity.scale(dt);
      transform.position.addSelf(step);
      proj.traveledDistance += step.length();

      // Check distance expiry
      if (proj.traveledDistance >= proj.maxDistance) {
        this.commands.destroyEntity(projId);
        return;
      }

      // Hit collision test against targets
      targetQuery.forEach((targetId, targetTrans: Transform2D, targetAttrs: Attributes) => {
        if (targetId === proj.ownerEntityId || targetAttrs.isDead) return;

        const distSq = transform.position.distanceToSquared(targetTrans.position);
        if (distSq <= proj.hitRadius * proj.hitRadius) {
          // Direct hit!
          const combat = this.world.systemScheduler;
          // Apply combat event
          targetAttrs.currentHealth = Math.max(0, targetAttrs.currentHealth - proj.damagePackage.baseAmount);

          if (proj.pierceCount <= 0) {
            this.commands.destroyEntity(projId);
          } else {
            proj.pierceCount--;
          }
        }
      }, [Transform2D, Attributes]);
    }, [Transform2D, Projectile]);
  }
}
