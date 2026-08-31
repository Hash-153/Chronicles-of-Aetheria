/**
 * @file ShadowCaster2D.ts
 * @description Dynamic 2D shadow volume geometry generator projecting occluder silhouette edges away from light sources.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Component } from '../core/ecs/Component.ts';
import { AABB } from '../core/math/AABB.ts';

export interface ShadowEdge {
  p1: Vector2;
  p2: Vector2;
}

export class ShadowCaster2D {
  public edges: ShadowEdge[] = [];
  public isEnabled = true;

  constructor(edges: ShadowEdge[] = []) {
    this.edges = edges;
  }

  public static createBoxCaster(width: number, height: number): ShadowCaster2D {
    const hw = width * 0.5;
    const hh = height * 0.5;

    const p0 = new Vector2(-hw, -hh);
    const p1 = new Vector2(hw, -hh);
    const p2 = new Vector2(hw, hh);
    const p3 = new Vector2(-hw, hh);

    return new ShadowCaster2D([
      { p1: p0, p2: p1 },
      { p1: p1, p2: p2 },
      { p1: p2, p2: p3 },
      { p1: p3, p2: p0 },
    ]);
  }

  public getTransformedEdges(worldPos: Vector2, rotation = 0): ShadowEdge[] {
    return this.edges.map(edge => ({
      p1: edge.p1.rotate(rotation).add(worldPos),
      p2: edge.p2.rotate(rotation).add(worldPos),
    }));
  }

  public projectShadowGeometry(
    lightPos: Vector2,
    lightRadius: number,
    worldPos: Vector2,
    rotation = 0
  ): Vector2[][] {
    const worldEdges = this.getTransformedEdges(worldPos, rotation);
    const shadowPolygons: Vector2[][] = [];

    for (let i = 0; i < worldEdges.length; i++) {
      const edge = worldEdges[i];
      const edgeDir = edge.p2.subtract(edge.p1);
      const edgeNormal = new Vector2(-edgeDir.y, edgeDir.x);

      // Back-face culling relative to light position
      const lightToEdge = edge.p1.subtract(lightPos);
      if (edgeNormal.dot(lightToEdge) >= 0) {
        // Front-facing edge to light, cast shadow volume
        const dir1 = edge.p1.subtract(lightPos).normalize();
        const dir2 = edge.p2.subtract(lightPos).normalize();

        const p1Far = edge.p1.add(dir1.scale(lightRadius * 2));
        const p2Far = edge.p2.add(dir2.scale(lightRadius * 2));

        // Quad shadow fin [p1, p2, p2Far, p1Far]
        shadowPolygons.push([edge.p1, edge.p2, p2Far, p1Far]);
      }
    }

    return shadowPolygons;
  }
}
