/**
 * @file ContinuousCollision.ts
 * @description Time-of-Impact (TOI) Continuous Collision Detection (CCD) for fast-moving bullets and projectiles to prevent tunneling through thin colliders.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Ray2D, type RaycastHit2D } from '../core/math/Ray2D.ts';
import { Collider2D } from './Collider2D.ts';
import { AABB } from '../core/math/AABB.ts';

export interface TOIResult {
  hit: boolean;
  timeOfImpact: number; // 0 to 1
  point: Vector2;
  normal: Vector2;
}

export class ContinuousCollision {
  public static calculateTOI(
    startPos: Vector2,
    displacement: Vector2,
    targetCollider: Collider2D,
    targetPos: Vector2,
    targetRot = 0
  ): TOIResult {
    const rayLength = displacement.length();
    if (rayLength < 1e-5) {
      return { hit: false, timeOfImpact: 1, point: startPos.clone(), normal: new Vector2(0, -1) };
    }

    const ray = new Ray2D(startPos, displacement.normalize(), rayLength);
    const targetAABB = targetCollider.computeWorldAABB(targetPos, targetRot);

    const hit = ray.intersectAABB(targetAABB);
    if (hit && hit.distance <= rayLength) {
      return {
        hit: true,
        timeOfImpact: hit.distance / rayLength,
        point: hit.point,
        normal: hit.normal,
      };
    }

    return { hit: false, timeOfImpact: 1, point: startPos.clone(), normal: new Vector2(0, -1) };
  }
}
