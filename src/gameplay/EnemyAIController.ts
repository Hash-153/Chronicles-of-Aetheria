/**
 * @file EnemyAIController.ts
 * @description Monster behavior system managing Patrol, Aggro, Pathfinding chase, Melee strike cooldowns, and loot drop on death.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Component } from '../core/ecs/Component.ts';
import { System } from '../core/ecs/System.ts';
import { SystemPhase } from '../core/ecs/Types.ts';
import { Transform2D } from '../core/math/Transform2D.ts';
import { RigidBody2D } from '../physics/RigidBody2D.ts';
import { Attributes } from './Attributes.ts';
import { PlayerInput } from './PlayerController.ts';
import { SteeringBehaviors } from '../ai/SteeringBehaviors.ts';
import { ThreatMatrix } from '../ai/ThreatMatrix.ts';

export const MonsterState = {
  Idle: 0,
  Patrol: 1,
  Chase: 2,
  Attack: 3,
} as const;
export type MonsterState = typeof MonsterState[keyof typeof MonsterState];

export class EnemyAI {
  public state = MonsterState.Idle;
  public aggroRadius = 250;
  public attackRadius = 40;
  public attackCooldown = 1.0;
  public attackTimer = 0;
  public wanderAngle = 0;
  public threatMatrix = new ThreatMatrix();
}

export class EnemyAISystem extends System {
  public phase = SystemPhase.Update;
  public priority = 90;

  public override update(dt: number): void {
    const playerQuery = this.world.createQuery({ all: [Transform2D, PlayerInput] });
    let playerPos: Vector2 | null = null;
    let playerId: number | null = null;

    playerQuery.forEach((id, pTrans: Transform2D) => {
      playerPos = pTrans.position;
      playerId = id;
    }, [Transform2D, PlayerInput]);

    const enemyQuery = this.world.createQuery({ all: [Transform2D, RigidBody2D, Attributes, EnemyAI] });

    enemyQuery.forEach((eId, transform: Transform2D, body: RigidBody2D, attrs: Attributes, ai: EnemyAI) => {
      if (attrs.isDead) return;

      ai.attackTimer = Math.max(0, ai.attackTimer - dt);

      if (!playerPos) return;

      const distToPlayer = transform.position.distanceTo(playerPos);

      // State transitions
      if (distToPlayer <= ai.attackRadius) {
        ai.state = MonsterState.Attack;
      } else if (distToPlayer <= ai.aggroRadius) {
        ai.state = MonsterState.Chase;
      } else {
        ai.state = MonsterState.Patrol;
      }

      // State execution
      switch (ai.state) {
        case MonsterState.Chase: {
          const steerForce = SteeringBehaviors.seek(
            transform.position,
            body.velocity,
            playerPos,
            attrs.moveSpeed * 0.8,
            200
          );
          body.applyForce(steerForce);
          transform.rotation = playerPos.subtract(transform.position).angle();
          break;
        }
        case MonsterState.Attack: {
          body.velocity.set(0, 0);
          if (ai.attackTimer <= 0 && playerId !== null) {
            ai.attackTimer = ai.attackCooldown;
            // Execute melee hit
            const playerAttrs = this.world.getComponent(playerId, Attributes);
            if (playerAttrs) {
              playerAttrs.currentHealth = Math.max(0, playerAttrs.currentHealth - attrs.attackPower);
            }
          }
          break;
        }
        case MonsterState.Patrol: {
          const { force, newAngle } = SteeringBehaviors.wander(
            body.velocity,
            40,
            20,
            ai.wanderAngle,
            0.5,
            60
          );
          ai.wanderAngle = newAngle;
          body.applyForce(force);
          break;
        }
      }
    }, [Transform2D, RigidBody2D, Attributes, EnemyAI]);
  }
}
