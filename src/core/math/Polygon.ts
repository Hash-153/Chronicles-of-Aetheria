/**
 * @file Polygon.ts
 * @description Convex/Concave 2D Polygon with SAT normals, centroid calculation, triangulation, and winding order checks.
 */

import { Vector2 } from './Vector2.ts';
import { AABB } from './AABB.ts';

export class Polygon {
  public vertices: Vector2[];

  constructor(vertices: Vector2[] = []) {
    this.vertices = vertices;
  }

  public static createBox(width: number, height: number, center = new Vector2()): Polygon {
    const hw = width * 0.5;
    const hh = height * 0.5;
    return new Polygon([
      new Vector2(center.x - hw, center.y - hh),
      new Vector2(center.x + hw, center.y - hh),
      new Vector2(center.x + hw, center.y + hh),
      new Vector2(center.x - hw, center.y + hh),
    ]);
  }

  public static createRegular(sides: number, radius: number, center = new Vector2()): Polygon {
    const vertices: Vector2[] = [];
    const step = (Math.PI * 2) / Math.max(3, sides);
    for (let i = 0; i < sides; i++) {
      const angle = i * step;
      vertices.push(
        new Vector2(
          center.x + Math.cos(angle) * radius,
          center.y + Math.sin(angle) * radius
        )
      );
    }
    return new Polygon(vertices);
  }

  public clone(): Polygon {
    return new Polygon(this.vertices.map(v => v.clone()));
  }

  public get vertexCount(): number {
    return this.vertices.length;
  }

  public computeCentroid(): Vector2 {
    let cx = 0;
    let cy = 0;
    let signedArea = 0;
    const n = this.vertices.length;

    for (let i = 0; i < n; i++) {
      const p0 = this.vertices[i];
      const p1 = this.vertices[(i + 1) % n];
      const a = p0.x * p1.y - p1.x * p0.y;
      signedArea += a;
      cx += (p0.x + p1.x) * a;
      cy += (p0.y + p1.y) * a;
    }

    signedArea *= 0.5;
    if (Math.abs(signedArea) < 1e-8) {
      // Fallback to average vertex
      let sumX = 0, sumY = 0;
      for (const v of this.vertices) {
        sumX += v.x;
        sumY += v.y;
      }
      return new Vector2(sumX / n, sumY / n);
    }

    return new Vector2(cx / (6 * signedArea), cy / (6 * signedArea));
  }

  public computeArea(): number {
    let area = 0;
    const n = this.vertices.length;
    for (let i = 0; i < n; i++) {
      const p0 = this.vertices[i];
      const p1 = this.vertices[(i + 1) % n];
      area += p0.x * p1.y - p1.x * p0.y;
    }
    return Math.abs(area * 0.5);
  }

  public computeAABB(): AABB {
    return AABB.fromPoints(this.vertices);
  }

  public getNormals(): Vector2[] {
    const normals: Vector2[] = [];
    const n = this.vertices.length;
    for (let i = 0; i < n; i++) {
      const p0 = this.vertices[i];
      const p1 = this.vertices[(i + 1) % n];
      const edge = p1.subtract(p0);
      normals.push(new Vector2(-edge.y, edge.x).normalize());
    }
    return normals;
  }

  public projectOntoAxis(axis: Vector2): [number, number] {
    let min = this.vertices[0].dot(axis);
    let max = min;
    for (let i = 1; i < this.vertices.length; i++) {
      const p = this.vertices[i].dot(axis);
      if (p < min) min = p;
      if (p > max) max = p;
    }
    return [min, max];
  }

  public containsPoint(p: Vector2): boolean {
    let inside = false;
    const n = this.vertices.length;
    for (let i = 0, j = n - 1; i < n; j = i++) {
      const vi = this.vertices[i];
      const vj = this.vertices[j];
      const intersect =
        vi.y > p.y !== vj.y > p.y &&
        p.x < ((vj.x - vi.x) * (p.y - vi.y)) / (vj.y - vi.y) + vi.x;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  public isConvex(): boolean {
    const n = this.vertices.length;
    if (n < 3) return false;
    let prevCross = 0;
    for (let i = 0; i < n; i++) {
      const p0 = this.vertices[i];
      const p1 = this.vertices[(i + 1) % n];
      const p2 = this.vertices[(i + 2) % n];
      const v1 = p1.subtract(p0);
      const v2 = p2.subtract(p1);
      const cross = v1.cross(v2);
      if (cross !== 0) {
        if (prevCross === 0) {
          prevCross = cross;
        } else if ((cross > 0 && prevCross < 0) || (cross < 0 && prevCross > 0)) {
          return false;
        }
      }
    }
    return true;
  }
}
