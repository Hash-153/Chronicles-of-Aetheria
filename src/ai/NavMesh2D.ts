/**
 * @file NavMesh2D.ts
 * @description 2D Convex Polygon Navigation Mesh with Funnel String Pulling for continuous smooth agent navigation.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Polygon } from '../core/math/Polygon.ts';

export interface NavPolygon {
  id: number;
  polygon: Polygon;
  neighbors: number[]; // Adjacent NavPolygon IDs
  center: Vector2;
}

export class NavMesh2D {
  public polygons: NavPolygon[] = [];

  public addPolygon(id: number, vertices: Vector2[], neighbors: number[] = []): void {
    const poly = new Polygon(vertices);
    this.polygons.push({
      id,
      polygon: poly,
      neighbors,
      center: poly.computeCentroid(),
    });
  }

  public findPolygonContaining(point: Vector2): NavPolygon | null {
    for (let i = 0; i < this.polygons.length; i++) {
      if (this.polygons[i].polygon.containsPoint(point)) {
        return this.polygons[i];
      }
    }
    return null;
  }

  public stringPull(portals: { left: Vector2; right: Vector2 }[], start: Vector2, goal: Vector2): Vector2[] {
    const path: Vector2[] = [start.clone()];
    let apex = start.clone();
    let leftIndex = 0;
    let rightIndex = 0;

    let portalApex = start.clone();
    let portalLeft = portals[0]?.left || start;
    let portalRight = portals[0]?.right || start;

    for (let i = 1; i < portals.length; i++) {
      const left = portals[i].left;
      const right = portals[i].right;

      // Update right
      if (this._triArea2(portalApex, portalRight, right) <= 0) {
        if (portalApex.equals(portalRight) || this._triArea2(portalApex, portalLeft, right) > 0) {
          portalRight = right;
          rightIndex = i;
        } else {
          path.push(portalLeft.clone());
          portalApex = portalLeft.clone();
          portalRight = portalApex;
          portalLeft = portalApex;
          i = leftIndex;
          continue;
        }
      }

      // Update left
      if (this._triArea2(portalApex, portalLeft, left) >= 0) {
        if (portalApex.equals(portalLeft) || this._triArea2(portalApex, portalRight, left) < 0) {
          portalLeft = left;
          leftIndex = i;
        } else {
          path.push(portalRight.clone());
          portalApex = portalRight.clone();
          portalLeft = portalApex;
          portalRight = portalApex;
          i = rightIndex;
          continue;
        }
      }
    }

    path.push(goal.clone());
    return path;
  }

  private _triArea2(a: Vector2, b: Vector2, c: Vector2): number {
    return (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
  }
}
