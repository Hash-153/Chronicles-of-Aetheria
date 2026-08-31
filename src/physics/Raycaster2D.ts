/**
 * @file Raycaster2D.ts
 * @description World-space 2D raycasting engine with layer masks, sensor queries, and sorted hit results.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Ray2D, type RaycastHit2D } from '../core/math/Ray2D.ts';
import { type EntityId } from '../core/ecs/Types.ts';
import { Collider2D } from './Collider2D.ts';
import { World } from '../core/ecs/World.ts';
import { Transform2D } from '../core/math/Transform2D.ts';

export interface WorldRaycastHit {
  entityId: EntityId;
  collider: Collider2D;
  hit: RaycastHit2D;
}

export class Raycaster2D {
  private _world: World;

  constructor(world: World) {
    this._world = world;
  }

  public castRay(
    origin: Vector2,
    direction: Vector2,
    maxDistance = Infinity,
    layerMask = 0xffff
  ): WorldRaycastHit | null {
    const ray = new Ray2D(origin, direction, maxDistance);
    let closestHit: WorldRaycastHit | null = null;
    let minDistance = maxDistance;

    const query = this._world.createQuery({ all: [Transform2D, Collider2D] });
    query.forEach((entityId, transform: Transform2D, collider: Collider2D) => {
      if ((collider.collisionLayer & layerMask) === 0) return;

      const pos = transform.position;
      const rot = transform.rotation;
      const worldAABB = collider.computeWorldAABB(pos, rot);

      const aabbHit = ray.intersectAABB(worldAABB);
      if (aabbHit && aabbHit.distance < minDistance) {
        minDistance = aabbHit.distance;
        closestHit = {
          entityId,
          collider,
          hit: aabbHit,
        };
      }
    }, [Transform2D, Collider2D]);

    return closestHit;
  }

  public castRayAll(
    origin: Vector2,
    direction: Vector2,
    maxDistance = Infinity,
    layerMask = 0xffff
  ): WorldRaycastHit[] {
    const ray = new Ray2D(origin, direction, maxDistance);
    const hits: WorldRaycastHit[] = [];

    const query = this._world.createQuery({ all: [Transform2D, Collider2D] });
    query.forEach((entityId, transform: Transform2D, collider: Collider2D) => {
      if ((collider.collisionLayer & layerMask) === 0) return;

      const pos = transform.position;
      const rot = transform.rotation;
      const worldAABB = collider.computeWorldAABB(pos, rot);

      const aabbHit = ray.intersectAABB(worldAABB);
      if (aabbHit && aabbHit.distance <= maxDistance) {
        hits.push({
          entityId,
          collider,
          hit: aabbHit,
        });
      }
    }, [Transform2D, Collider2D]);

    return hits.sort((a, b) => a.hit.distance - b.hit.distance);
  }
}
