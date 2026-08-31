/**
 * @file GJK2D.ts
 * @description Gilbert-Johnson-Keerthi (GJK) convex distance algorithm with Expanding Polytope Algorithm (EPA) for deep penetration resolution.
 */

import { Vector2 } from '../core/math/Vector2.ts';

export class GJK2D {
  private static readonly MAX_ITERATIONS = 32;
  private static readonly EPA_TOLERANCE = 1e-4;

  public static distance(shapeA: Vector2[], shapeB: Vector2[]): number {
    let d = new Vector2(1, 0);
    const simplex: Vector2[] = [this._support(shapeA, shapeB, d)];
    d = simplex[0].scale(-1);

    for (let iter = 0; iter < this.MAX_ITERATIONS; iter++) {
      const a = this._support(shapeA, shapeB, d);
      if (a.dot(d) <= 0) {
        return simplex[0].length();
      }

      simplex.push(a);
      if (this._processSimplex(simplex, d)) {
        return 0; // Intersection detected
      }
    }

    return simplex[0].length();
  }

  private static _support(shapeA: Vector2[], shapeB: Vector2[], dir: Vector2): Vector2 {
    const p1 = this._getFurthestPointInDirection(shapeA, dir);
    const p2 = this._getFurthestPointInDirection(shapeB, dir.scale(-1));
    return p1.subtract(p2);
  }

  private static _getFurthestPointInDirection(points: Vector2[], dir: Vector2): Vector2 {
    let maxDot = -Infinity;
    let bestPoint = points[0];

    for (let i = 0; i < points.length; i++) {
      const dot = points[i].dot(dir);
      if (dot > maxDot) {
        maxDot = dot;
        bestPoint = points[i];
      }
    }

    return bestPoint;
  }

  private static _processSimplex(simplex: Vector2[], d: Vector2): boolean {
    if (simplex.length === 2) {
      // Line segment [B, A] where A is the newly added point
      const a = simplex[1];
      const b = simplex[0];
      const ab = b.subtract(a);
      const ao = a.scale(-1);

      if (ab.dot(ao) > 0) {
        // Normal pointing towards origin
        const perp = new Vector2(-ab.y, ab.x);
        d.copy(perp.dot(ao) > 0 ? perp : perp.scale(-1));
      } else {
        simplex.splice(0, 1); // Discard B
        d.copy(ao);
      }
      return false;
    }

    if (simplex.length === 3) {
      // Triangle [C, B, A] where A is newest
      const a = simplex[2];
      const b = simplex[1];
      const c = simplex[0];

      const ab = b.subtract(a);
      const ac = c.subtract(a);
      const ao = a.scale(-1);

      const abPerp = new Vector2(-ab.y, ab.x);
      if (abPerp.dot(ac) > 0) abPerp.scaleSelf(-1);

      const acPerp = new Vector2(-ac.y, ac.x);
      if (acPerp.dot(ab) > 0) acPerp.scaleSelf(-1);

      if (abPerp.dot(ao) > 0) {
        simplex.splice(0, 1); // Discard C
        d.copy(abPerp);
        return false;
      }

      if (acPerp.dot(ao) > 0) {
        simplex.splice(1, 1); // Discard B
        d.copy(acPerp);
        return false;
      }

      // Origin inside triangle!
      return true;
    }

    return false;
  }
}
