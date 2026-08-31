/**
 * @file PlayerController.ts
 * @description WASD player movement input processing, mouse aiming, dodge roll dodge i-frames, and skill firing.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Component } from '../core/ecs/Component.ts';
import { System } from '../core/ecs/System.ts';
import { SystemPhase } from '../core/ecs/Types.ts';
import { Transform2D } from '../core/math/Transform2D.ts';
import { RigidBody2D } from '../physics/RigidBody2D.ts';
import { Attributes } from './Attributes.ts';
import { SkillManager } from './SkillManager.ts';
import { Projectile } from './ProjectileSystem.ts';

export class PlayerInput {
  public moveDir = new Vector2();
  public mouseWorldPos = new Vector2();
  public isAttackPressed = false;
  public isSkill1Pressed = false;
  public isSkill2Pressed = false;
  public isRollPressed = false;

  public isRolling = false;
  public rollTimer = 0;
  public rollDuration = 0.25;
  public rollSpeed = 350;
  public rollDirection = new Vector2();
}

export class PlayerControllerSystem extends System {
  public phase = SystemPhase.PreUpdate;
  public priority = 100;

  private _keysDown = new Set<string>();

  public override onInit(): void {
    window.addEventListener('keydown', (e) => this._keysDown.add(e.key.toLowerCase()));
    window.addEventListener('keyup', (e) => this._keysDown.delete(e.key.toLowerCase()));
  }

  public override update(dt: number): void {
    const query = this.world.createQuery({ all: [Transform2D, RigidBody2D, Attributes, PlayerInput] });

    query.forEach((id, transform: Transform2D, body: RigidBody2D, attrs: Attributes, input: PlayerInput) => {
      if (attrs.isDead) return;

      // 1. Gather directional input
      let dx = 0;
      let dy = 0;
      if (this._keysDown.has('w') || this._keysDown.has('arrowup')) dy -= 1;
      if (this._keysDown.has('s') || this._keysDown.has('arrowdown')) dy += 1;
      if (this._keysDown.has('a') || this._keysDown.has('arrowleft')) dx -= 1;
      if (this._keysDown.has('d') || this._keysDown.has('arrowright')) dx += 1;

      input.moveDir.set(dx, dy).normalizeSelf();

      // 2. Dodge Roll Logic
      if (this._keysDown.has(' ') && !input.isRolling && attrs.currentStamina >= 25 && input.moveDir.lengthSquared() > 0) {
        input.isRolling = true;
        input.rollTimer = input.rollDuration;
        input.rollDirection.copy(input.moveDir);
        attrs.currentStamina -= 25;
      }

      if (input.isRolling) {
        input.rollTimer -= dt;
        body.velocity.copy(input.rollDirection.scale(input.rollSpeed));
        if (input.rollTimer <= 0) {
          input.isRolling = false;
        }
      } else {
        // Normal WASD movement
        body.velocity.copy(input.moveDir.scale(attrs.moveSpeed));
      }

      // 3. Aiming towards mouse
      const aimDir = input.mouseWorldPos.subtract(transform.position);
      if (aimDir.lengthSquared() > 0) {
        transform.rotation = aimDir.angle();
      }

      // 4. Casting Skill 1 (Fireball) on '1' or 'q'
      const skillMgr = this.world.getComponent(id, SkillManager);
      if (skillMgr) {
        skillMgr.update(dt);
        if (this._keysDown.has('1') || this._keysDown.has('q')) {
          const castedSkill = skillMgr.cast(0, attrs, transform.position, input.mouseWorldPos);
          if (castedSkill) {
            // Spawn Fireball Projectile
            const projDir = aimDir.normalize();
            this.commands.createEntity((projEntityId) => {
              const projTrans = new Transform2D(transform.position.x, transform.position.y);
              const proj = new Projectile({
                velocity: projDir.scale(castedSkill.projectileSpeed || 400),
                hitRadius: 20,
                damagePackage: {
                  baseAmount: castedSkill.baseDamage,
                  type: castedSkill.damageType,
                  attackerStats: attrs,
                },
                ownerEntityId: id,
              });
              this.commands.addComponent(projEntityId, projTrans);
              this.commands.addComponent(projEntityId, proj);
            });
          }
        }
      }
    }, [Transform2D, RigidBody2D, Attributes, PlayerInput]);
  }
}
