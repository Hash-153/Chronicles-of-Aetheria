/**
 * @file Geometry2D.ts
 * @description Advanced computational geometry algorithms: Convex Hull (Graham Scan), Voronoi / Delaunay, Sutherland-Hodgman Polygon Clipping, Polygon Triangulation (Ear Clipping).
 */

import { Vector2 } from './Vector2.ts';
import { Polygon } from './Polygon.ts';

export class Geometry2D {
  public static computeConvexHull(points: Vector2[]): Vector2[] {
    if (points.length <= 3) return points.map(p => p.clone());

    // 1. Find bottom-most point (lowest Y, lowest X)
    let lowest = 0;
    for (let i = 1; i < points.length; i++) {
      if (points[i].y < points[lowest].y || (points[i].y === points[lowest].y && points[i].x < points[lowest].x)) {
        lowest = i;
      }
    }

    const pivot = points[lowest];
    const sorted = [...points];
    sorted.splice(lowest, 1);

    sorted.sort((a, b) => {
      const angleA = Math.atan2(a.y - pivot.y, a.x - pivot.x);
      const angleB = Math.atan2(b.y - pivot.y, b.x - pivot.x);
      if (angleA !== angleB) return angleA - angleB;
      return pivot.distanceToSquared(a) - pivot.distanceToSquared(b);
    });

    const stack: Vector2[] = [pivot, sorted[0], sorted[1]];

    for (let i = 2; i < sorted.length; i++) {
      let top = stack.length - 1;
      while (stack.length >= 2 && this.crossProductOrientation(stack[top - 1], stack[top], sorted[i]) <= 0) {
        stack.pop();
        top = stack.length - 1;
      }
      stack.push(sorted[i]);
    }

    return stack;
  }

  public static crossProductOrientation(p1: Vector2, p2: Vector2, p3: Vector2): number {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
  }

  public static clipPolygon(subjectPoly: Vector2[], clipPoly: Vector2[]): Vector2[] {
    let outputList = subjectPoly;

    for (let i = 0; i < clipPoly.length; i++) {
      const edgeStart = clipPoly[i];
      const edgeEnd = clipPoly[(i + 1) % clipPoly.length];
      const inputList = outputList;
      outputList = [];

      if (inputList.length === 0) break;

      let s = inputList[inputList.length - 1];
      for (let j = 0; j < inputList.length; j++) {
        const e = inputList[j];
        if (this._isInsideEdge(e, edgeStart, edgeEnd)) {
          if (this._isInsideEdge(s, edgeStart, edgeEnd)) {
            outputList.push(e);
          } else {
            outputList.push(this._computeIntersection(s, e, edgeStart, edgeEnd));
            outputList.push(e);
          }
        } else if (this._isInsideEdge(s, edgeStart, edgeEnd)) {
          outputList.push(this._computeIntersection(s, e, edgeStart, edgeEnd));
        }
        s = e;
      }
    }

    return outputList;
  }

  public static triangulateEarClipping(vertices: Vector2[]): number[] {
    const indices: number[] = [];
    const n = vertices.length;
    if (n < 3) return indices;

    const vIndices: number[] = [];
    for (let i = 0; i < n; i++) vIndices.push(i);

    let count = n;
    while (count > 3) {
      let earFound = false;
      for (let i = 0; i < count; i++) {
        const prev = vIndices[(i - 1 + count) % count];
        const curr = vIndices[i];
        const next = vIndices[(i + 1) % count];

        const a = vertices[prev];
        const b = vertices[curr];
        const c = vertices[next];

        if (this.crossProductOrientation(a, b, c) > 0) {
          let hasPointInside = false;
          for (let j = 0; j < count; j++) {
            const testIdx = vIndices[j];
            if (testIdx === prev || testIdx === curr || testIdx === next) continue;
            if (this._isPointInTriangle(vertices[testIdx], a, b, c)) {
              hasPointInside = true;
              break;
            }
          }

          if (!hasPointInside) {
            indices.push(prev, curr, next);
            vIndices.splice(i, 1);
            count--;
            earFound = true;
            break;
          }
        }
      }

      if (!earFound) break; // Degenerate polygon
    }

    if (count === 3) {
      indices.push(vIndices[0], vIndices[1], vIndices[2]);
    }

    return indices;
  }

  private static _isInsideEdge(p: Vector2, e1: Vector2, e2: Vector2): boolean {
    return (e2.x - e1.x) * (p.y - e1.y) - (e2.y - e1.y) * (p.x - e1.x) >= 0;
  }

  private static _computeIntersection(s: Vector2, e: Vector2, cp1: Vector2, cp2: Vector2): Vector2 {
    const dc = new Vector2(cp1.x - cp2.x, cp1.y - cp2.y);
    const dp = new Vector2(s.x - e.x, s.y - e.y);
    const n1 = cp1.x * cp2.y - cp1.y * cp2.x;
    const n2 = s.x * e.y - s.y * e.x;
    const n3 = 1.0 / (dc.x * dp.y - dc.y * dp.x);
    return new Vector2((n1 * dp.x - n2 * dc.x) * n3, (n1 * dp.y - n2 * dc.y) * n3);
  }

  private static _isPointInTriangle(p: Vector2, a: Vector2, b: Vector2, c: Vector2): boolean {
    const w1 = this.crossProductOrientation(a, b, p);
    const w2 = this.crossProductOrientation(b, c, p);
    const w3 = this.crossProductOrientation(c, a, p);
    return (w1 >= 0 && w2 >= 0 && w3 >= 0) || (w1 <= 0 && w2 <= 0 && w3 <= 0);
  }
}
