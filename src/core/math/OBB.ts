/**
 * @file OBB.ts
 * @description 2D Oriented Bounding Box supporting arbitrary rotation and SAT projection.
 */

import { Vector2 } from './Vector2.ts';
import { AABB } from './AABB.ts';

export class OBB {
  public center: Vector2;
  public halfExtents: Vector2;
  public rotation: number; // in radians

  constructor(center = new Vector2(), halfExtents = new Vector2(1, 1), rotation = 0) {
    this.center = center;
    this.halfExtents = halfExtents;
    this.rotation = rotation;
  }

  public getAxes(): [Vector2, Vector2] {
    const cos = Math.cos(this.rotation);
    const sin = Math.sin(this.rotation);
    const axisX = new Vector2(cos, sin);
    const axisY = new Vector2(-sin, cos);
    return [axisX, axisY];
  }

  public getVertices(): [Vector2, Vector2, Vector2, Vector2] {
    const [axisX, axisY] = this.getAxes();
    const hx = axisX.scale(this.halfExtents.x);
    const hy = axisY.scale(this.halfExtents.y);

    return [
      this.center.subtract(hx).subtract(hy),
      this.center.add(hx).subtract(hy),
      this.center.add(hx).add(hy),
      this.center.subtract(hx).add(hy),
    ];
  }

  public computeAABB(): AABB {
    const verts = this.getVertices();
    return AABB.fromPoints(verts);
  }

  public projectOntoAxis(axis: Vector2): [number, number] {
    const [axisX, axisY] = this.getAxes();
    const centerProj = this.center.dot(axis);
    const extentProj =
      this.halfExtents.x * Math.abs(axisX.dot(axis)) +
      this.halfExtents.y * Math.abs(axisY.dot(axis));

    return [centerProj - extentProj, centerProj + extentProj];
  }

  public intersectsOBB(other: OBB): boolean {
    const [aX1, aY1] = this.getAxes();
    const [aX2, aY2] = other.getAxes();
    const testAxes = [aX1, aY1, aX2, aY2];

    for (let i = 0; i < testAxes.length; i++) {
      const axis = testAxes[i];
      const [minA, maxA] = this.projectOntoAxis(axis);
      const [minB, maxB] = other.projectOntoAxis(axis);
      if (maxA < minB || maxB < minA) {
        return false; // Separating axis found
      }
    }
    return true;
  }
}
