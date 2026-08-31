/**
 * @file NarrowphaseSAT.ts
 * @description Separating Axis Theorem (SAT) narrowphase collision detection and contact manifold generation.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Polygon } from '../core/math/Polygon.ts';
import { Collider2D, ColliderShapeType } from './Collider2D.ts';
import { RigidBody2D } from './RigidBody2D.ts';
import { CollisionManifold, type ContactPoint } from './CollisionManifold.ts';
import { type EntityId } from '../core/ecs/Types.ts';

export class NarrowphaseSAT {
  public static testCollision(
    entityA: EntityId,
    entityB: EntityId,
    posA: Vector2,
    rotA: number,
    posB: Vector2,
    rotB: number,
    bodyA: RigidBody2D,
    bodyB: RigidBody2D,
    colliderA: Collider2D,
    colliderB: Collider2D
  ): CollisionManifold | null {
    // Circle vs Circle
    if (
      colliderA.shapeType === ColliderShapeType.Circle &&
      colliderB.shapeType === ColliderShapeType.Circle
    ) {
      return this._testCircleCircle(
        entityA, entityB, posA, posB, bodyA, bodyB, colliderA, colliderB
      );
    }

    // Circle vs Box/Polygon
    if (
      colliderA.shapeType === ColliderShapeType.Circle &&
      (colliderB.shapeType === ColliderShapeType.Box || colliderB.shapeType === ColliderShapeType.Polygon)
    ) {
      return this._testCirclePolygon(
        entityA, entityB, posA, posB, rotB, bodyA, bodyB, colliderA, colliderB
      );
    }

    // Box/Polygon vs Circle
    if (
      (colliderA.shapeType === ColliderShapeType.Box || colliderA.shapeType === ColliderShapeType.Polygon) &&
      colliderB.shapeType === ColliderShapeType.Circle
    ) {
      const manifold = this._testCirclePolygon(
        entityB, entityA, posB, posA, rotA, bodyB, bodyA, colliderB, colliderA
      );
      if (manifold) {
        // Invert normal because A and B were swapped
        manifold.normal.scaleSelf(-1);
        manifold.entityA = entityA;
        manifold.entityB = entityB;
        manifold.bodyA = bodyA;
        manifold.bodyB = bodyB;
        manifold.colliderA = colliderA;
        manifold.colliderB = colliderB;
        manifold.computeTangent();
      }
      return manifold;
    }

    // Polygon/Box vs Polygon/Box
    return this._testPolygonPolygon(
      entityA, entityB, posA, rotA, posB, rotB, bodyA, bodyB, colliderA, colliderB
    );
  }

  private static _testCircleCircle(
    entityA: EntityId,
    entityB: EntityId,
    posA: Vector2,
    posB: Vector2,
    bodyA: RigidBody2D,
    bodyB: RigidBody2D,
    colliderA: Collider2D,
    colliderB: Collider2D
  ): CollisionManifold | null {
    const cA = posA.add(colliderA.offset);
    const cB = posB.add(colliderB.offset);
    const delta = cB.subtract(cA);
    const distSq = delta.lengthSquared();
    const rA = colliderA.circleRadius || 16;
    const rB = colliderB.circleRadius || 16;
    const totalRadius = rA + rB;

    if (distSq > totalRadius * totalRadius) {
      return null;
    }

    const dist = Math.sqrt(distSq);
    const manifold = new CollisionManifold(entityA, entityB, bodyA, bodyB, colliderA, colliderB);

    if (dist === 0) {
      manifold.normal.set(0, -1);
    } else {
      manifold.normal.copy(delta.scale(1 / dist));
    }
    manifold.computeTangent();

    const penetration = totalRadius - dist;
    const contactPos = cA.add(manifold.normal.scale(rA - penetration * 0.5));

    const contact: ContactPoint = {
      position: contactPos,
      penetration,
      normalImpulse: 0,
      tangentImpulse: 0,
      rA: contactPos.subtract(posA),
      rB: contactPos.subtract(posB),
    };

    manifold.contacts.push(contact);
    return manifold;
  }

  private static _testCirclePolygon(
    circleEntity: EntityId,
    polyEntity: EntityId,
    circlePos: Vector2,
    polyPos: Vector2,
    polyRot: number,
    circleBody: RigidBody2D,
    polyBody: RigidBody2D,
    circleCollider: Collider2D,
    polyCollider: Collider2D
  ): CollisionManifold | null {
    const cCenter = circlePos.add(circleCollider.offset);
    const cRadius = circleCollider.circleRadius || 16;

    const polyVerts = this._getTransformedVertices(polyCollider, polyPos, polyRot);
    let minOverlap = Infinity;
    let smallestAxis = new Vector2();

    // Test polygon edge normals
    for (let i = 0; i < polyVerts.length; i++) {
      const p1 = polyVerts[i];
      const p2 = polyVerts[(i + 1) % polyVerts.length];
      const edge = p2.subtract(p1);
      const axis = new Vector2(-edge.y, edge.x).normalize();

      const [minP, maxP] = this._projectVertices(polyVerts, axis);
      const cProj = cCenter.dot(axis);
      const minC = cProj - cRadius;
      const maxC = cProj + cRadius;

      if (maxP < minC || maxC < minP) return null;

      const overlap = Math.min(maxP, maxC) - Math.max(minP, minC);
      if (overlap < minOverlap) {
        minOverlap = overlap;
        smallestAxis.copy(axis);
      }
    }

    // Test closest vertex axis
    let closestVert = polyVerts[0];
    let minDistSq = cCenter.distanceToSquared(closestVert);
    for (let i = 1; i < polyVerts.length; i++) {
      const dSq = cCenter.distanceToSquared(polyVerts[i]);
      if (dSq < minDistSq) {
        minDistSq = dSq;
        closestVert = polyVerts[i];
      }
    }

    const vertAxis = closestVert.subtract(cCenter).normalize();
    if (vertAxis.lengthSquared() > 0) {
      const [minP, maxP] = this._projectVertices(polyVerts, vertAxis);
      const cProj = cCenter.dot(vertAxis);
      const minC = cProj - cRadius;
      const maxC = cProj + cRadius;

      if (maxP < minC || maxC < minP) return null;

      const overlap = Math.min(maxP, maxC) - Math.max(minP, minC);
      if (overlap < minOverlap) {
        minOverlap = overlap;
        smallestAxis.copy(vertAxis);
      }
    }

    // Ensure normal points from Circle to Poly
    const centerDir = polyPos.subtract(circlePos);
    if (smallestAxis.dot(centerDir) < 0) {
      smallestAxis.scaleSelf(-1);
    }

    const manifold = new CollisionManifold(
      circleEntity, polyEntity, circleBody, polyBody, circleCollider, polyCollider
    );
    manifold.normal.copy(smallestAxis);
    manifold.computeTangent();

    const contactPos = cCenter.add(manifold.normal.scale(cRadius));
    manifold.contacts.push({
      position: contactPos,
      penetration: minOverlap,
      normalImpulse: 0,
      tangentImpulse: 0,
      rA: contactPos.subtract(circlePos),
      rB: contactPos.subtract(polyPos),
    });

    return manifold;
  }

  private static _testPolygonPolygon(
    entityA: EntityId,
    entityB: EntityId,
    posA: Vector2,
    rotA: number,
    posB: Vector2,
    rotB: number,
    bodyA: RigidBody2D,
    bodyB: RigidBody2D,
    colliderA: Collider2D,
    colliderB: Collider2D
  ): CollisionManifold | null {
    const vertsA = this._getTransformedVertices(colliderA, posA, rotA);
    const vertsB = this._getTransformedVertices(colliderB, posB, rotB);

    let minOverlap = Infinity;
    let smallestAxis = new Vector2();

    const axes = [...this._getPolygonNormals(vertsA), ...this._getPolygonNormals(vertsB)];

    for (let i = 0; i < axes.length; i++) {
      const axis = axes[i];
      const [minA, maxA] = this._projectVertices(vertsA, axis);
      const [minB, maxB] = this._projectVertices(vertsB, axis);

      if (maxA < minB || maxB < minA) {
        return null; // Separating axis
      }

      const overlap = Math.min(maxA, maxB) - Math.max(minA, minB);
      if (overlap < minOverlap) {
        minOverlap = overlap;
        smallestAxis.copy(axis);
      }
    }

    // Orient normal from A to B
    const dir = posB.subtract(posA);
    if (smallestAxis.dot(dir) < 0) {
      smallestAxis.scaleSelf(-1);
    }

    const manifold = new CollisionManifold(
      entityA, entityB, bodyA, bodyB, colliderA, colliderB
    );
    manifold.normal.copy(smallestAxis);
    manifold.computeTangent();

    // Clip incident edge against reference edge
    const contactPos = posA.add(posB).scale(0.5);
    manifold.contacts.push({
      position: contactPos,
      penetration: minOverlap,
      normalImpulse: 0,
      tangentImpulse: 0,
      rA: contactPos.subtract(posA),
      rB: contactPos.subtract(posB),
    });

    return manifold;
  }

  private static _getTransformedVertices(collider: Collider2D, pos: Vector2, rot: number): Vector2[] {
    const center = pos.add(collider.offset.rotate(rot));

    if (collider.shapeType === ColliderShapeType.Box) {
      const ext = collider.boxExtents || new Vector2(16, 16);
      const hw = ext.x;
      const hh = ext.y;
      return [
        new Vector2(-hw, -hh).rotate(rot).add(center),
        new Vector2(hw, -hh).rotate(rot).add(center),
        new Vector2(hw, hh).rotate(rot).add(center),
        new Vector2(-hw, hh).rotate(rot).add(center),
      ];
    } else if (collider.polygon) {
      return collider.polygon.vertices.map(v => v.rotate(rot).add(center));
    }
    return [center];
  }

  private static _getPolygonNormals(verts: Vector2[]): Vector2[] {
    const normals: Vector2[] = [];
    for (let i = 0; i < verts.length; i++) {
      const p1 = verts[i];
      const p2 = verts[(i + 1) % verts.length];
      const edge = p2.subtract(p1);
      normals.push(new Vector2(-edge.y, edge.x).normalize());
    }
    return normals;
  }

  private static _projectVertices(verts: Vector2[], axis: Vector2): [number, number] {
    let min = verts[0].dot(axis);
    let max = min;
    for (let i = 1; i < verts.length; i++) {
      const p = verts[i].dot(axis);
      if (p < min) min = p;
      if (p > max) max = p;
    }
    return [min, max];
  }
}
