/**
 * @file EntityInspector.ts
 * @description Real-time component reflection and property inspector for live debugging of ECS entities.
 */

import { World } from '../core/ecs/World.ts';
import { Transform2D } from '../core/math/Transform2D.ts';
import { Attributes } from '../gameplay/Attributes.ts';
import { RigidBody2D } from '../physics/RigidBody2D.ts';
import { Collider2D } from '../physics/Collider2D.ts';

export class EntityInspector {
  public static inspect(entityId: number, world: World): Record<string, any> | null {
    const transform = world.getComponent(entityId, Transform2D);
    const attributes = world.getComponent(entityId, Attributes);
    const body = world.getComponent(entityId, RigidBody2D);
    const collider = world.getComponent(entityId, Collider2D);

    if (!transform && !attributes && !body && !collider) return null;

    return {
      entityId,
      transform: transform ? {
        position: [transform.position.x, transform.position.y],
        rotation: transform.rotation,
        scale: [transform.scale.x, transform.scale.y],
      } : undefined,
      attributes: attributes ? {
        health: `${Math.round(attributes.currentHealth)} / ${attributes.maxHealth}`,
        mana: `${Math.round(attributes.currentMana)} / ${attributes.maxMana}`,
        level: attributes.strength,
      } : undefined,
      body: body ? {
        velocity: [body.velocity.x, body.velocity.y],
        mass: body.mass,
        type: body.type,
      } : undefined,
    };
  }
}
