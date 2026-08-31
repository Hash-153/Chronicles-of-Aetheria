/**
 * @file Collider2D.ts
 * @description 2D Collider component supporting Box, Circle, Polygon shapes, physics materials, friction, restitution, and triggers.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { AABB } from '../core/math/AABB.ts';
import { Polygon } from '../core/math/Polygon.ts';
import { Circle } from '../core/math/Circle.ts';
import { Component } from '../core/ecs/Component.ts';

export const ColliderShapeType = {
  Box: 0,
  Circle: 1,
  Polygon: 2,
} as const;
export type ColliderShapeType = typeof ColliderShapeType[keyof typeof ColliderShapeType];

export interface PhysicsMaterial {
  friction: number;
  restitution: number;
  density: number;
}

export const DEFAULT_PHYSICS_MATERIAL: PhysicsMaterial = {
  friction: 0.3,
  restitution: 0.2,
  density: 1.0,
};

export class Collider2D {
  public shapeType: ColliderShapeType;
  public offset: Vector2;
  public isSensor: boolean;
  public material: PhysicsMaterial;

  // Layer collision filtering
  public collisionLayer = 1;
  public collisionMask = 0xffff;

  // Shape definitions
  public boxExtents?: Vector2; // half-width, half-height
  public circleRadius?: number;
  public polygon?: Polygon;

  // Cached tight AABB in world coordinates
  public worldAABB: AABB;

  constructor(
    shapeType = ColliderShapeType.Box,
    options: {
      boxExtents?: Vector2;
      circleRadius?: number;
      polygon?: Polygon;
      offset?: Vector2;
      isSensor?: boolean;
      material?: Partial<PhysicsMaterial>;
      layer?: number;
      mask?: number;
    } = {}
  ) {
    this.shapeType = shapeType;
    this.offset = options.offset ? options.offset.clone() : new Vector2();
    this.isSensor = options.isSensor ?? false;
    this.material = { ...DEFAULT_PHYSICS_MATERIAL, ...options.material };
    this.boxExtents = options.boxExtents ? options.boxExtents.clone() : new Vector2(16, 16);
    this.circleRadius = options.circleRadius ?? 16;
    this.polygon = options.polygon ? options.polygon.clone() : undefined;
    this.collisionLayer = options.layer ?? 1;
    this.collisionMask = options.mask ?? 0xffff;
    this.worldAABB = new AABB();
  }

  public computeWorldAABB(bodyPosition: Vector2, bodyRotation = 0): AABB {
    const center = bodyPosition.add(this.offset.rotate(bodyRotation));

    switch (this.shapeType) {
      case ColliderShapeType.Circle: {
        const r = this.circleRadius || 16;
        this.worldAABB.set(center.x - r, center.y - r, center.x + r, center.y + r);
        break;
      }
      case ColliderShapeType.Box: {
        const ext = this.boxExtents || new Vector2(16, 16);
        if (bodyRotation === 0) {
          this.worldAABB.set(
            center.x - ext.x,
            center.y - ext.y,
            center.x + ext.x,
            center.y + ext.y
          );
        } else {
          // Rotated box
          const c = Math.abs(Math.cos(bodyRotation));
          const s = Math.abs(Math.sin(bodyRotation));
          const hx = ext.x * c + ext.y * s;
          const hy = ext.x * s + ext.y * c;
          this.worldAABB.set(center.x - hx, center.y - hy, center.x + hx, center.y + hy);
        }
        break;
      }
      case ColliderShapeType.Polygon: {
        if (this.polygon) {
          const worldVerts = this.polygon.vertices.map(v =>
            v.rotate(bodyRotation).add(center)
          );
          this.worldAABB.copy(AABB.fromPoints(worldVerts));
        }
        break;
      }
    }

    return this.worldAABB;
  }

  public canCollideWith(other: Collider2D): boolean {
    return (
      (this.collisionLayer & other.collisionMask) !== 0 &&
      (other.collisionLayer & this.collisionMask) !== 0
    );
  }
}
