/**
 * @file LineOfSight.ts
 * @description Vision cone Line-of-Sight (LOS) and obstruction testing for AI stealth and perception.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Raycaster2D } from '../physics/Raycaster2D.ts';

export class LineOfSight {
  public static canSee(
    observerPos: Vector2,
    observerForward: Vector2,
    targetPos: Vector2,
    viewDistance = 300,
    fovAngleRadians = Math.PI * 0.6,
    raycaster?: Raycaster2D
  ): boolean {
    const delta = targetPos.subtract(observerPos);
    const distSq = delta.lengthSquared();

    if (distSq > viewDistance * viewDistance) return false;

    const dirToTarget = delta.normalize();
    const forward = observerForward.normalize();

    // Check angle within FOV
    const dot = forward.dot(dirToTarget);
    const minDot = Math.cos(fovAngleRadians * 0.5);

    if (dot < minDot) return false;

    // Raycast obstruction test
    if (raycaster) {
      const hit = raycaster.castRay(observerPos, dirToTarget, Math.sqrt(distSq));
      if (hit && hit.hit.distance < Math.sqrt(distSq) - 4) {
        return false; // Vision blocked by wall or obstacle
      }
    }

    return true;
  }
}
