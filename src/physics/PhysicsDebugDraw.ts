/**
 * @file PhysicsDebugDraw.ts
 * @description Debug wireframe visualizer for colliders, contact points, normals, and velocity vectors.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Collider2D, ColliderShapeType } from './Collider2D.ts';
import { CollisionManifold } from './CollisionManifold.ts';

export class PhysicsDebugDraw {
  public drawColliders = true;
  public drawContacts = true;
  public drawAABBs = false;
  public drawVelocities = false;

  public render(
    ctx: CanvasRenderingContext2D,
    colliders: { collider: Collider2D; pos: Vector2; rot: number }[],
    manifolds: CollisionManifold[]
  ): void {
    ctx.save();

    // 1. Draw Colliders
    if (this.drawColliders) {
      for (let i = 0; i < colliders.length; i++) {
        const { collider, pos, rot } = colliders[i];
        ctx.save();
        ctx.translate(pos.x + collider.offset.x, pos.y + collider.offset.y);
        ctx.rotate(rot);

        ctx.strokeStyle = collider.isSensor ? 'rgba(56, 189, 248, 0.7)' : 'rgba(74, 222, 128, 0.8)';
        ctx.lineWidth = 1.5;

        switch (collider.shapeType) {
          case ColliderShapeType.Circle: {
            const r = collider.circleRadius || 16;
            ctx.beginPath();
            ctx.arc(0, 0, r, 0, Math.PI * 2);
            ctx.stroke();
            // Draw orientation radius line
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(r, 0);
            ctx.stroke();
            break;
          }
          case ColliderShapeType.Box: {
            const ext = collider.boxExtents || new Vector2(16, 16);
            ctx.strokeRect(-ext.x, -ext.y, ext.x * 2, ext.y * 2);
            break;
          }
          case ColliderShapeType.Polygon: {
            if (collider.polygon && collider.polygon.vertices.length > 0) {
              const verts = collider.polygon.vertices;
              ctx.beginPath();
              ctx.moveTo(verts[0].x, verts[0].y);
              for (let v = 1; v < verts.length; v++) {
                ctx.lineTo(verts[v].x, verts[v].y);
              }
              ctx.closePath();
              ctx.stroke();
            }
            break;
          }
        }
        ctx.restore();
      }
    }

    // 2. Draw Contacts & Normals
    if (this.drawContacts) {
      for (let m = 0; m < manifolds.length; m++) {
        const man = manifolds[m];
        for (let c = 0; c < man.contacts.length; c++) {
          const pt = man.contacts[c].position;

          // Contact Point
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
          ctx.fill();

          // Normal vector
          ctx.strokeStyle = '#facc15';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
          ctx.lineTo(pt.x + man.normal.x * 12, pt.y + man.normal.y * 12);
          ctx.stroke();
        }
      }
    }

    ctx.restore();
  }
}
