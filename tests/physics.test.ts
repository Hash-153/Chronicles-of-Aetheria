/**
 * @file physics.test.ts
 * @description Unit tests for SAT narrowphase collision, GJK distance, broadphase pairs, and physics impulse resolution.
 */

import { assert, runSuite } from './run_all_tests.ts';
import { Vector2 } from '../src/core/math/Vector2.ts';
import { RigidBody2D, BodyType } from '../src/physics/RigidBody2D.ts';
import { Collider2D, ColliderShapeType } from '../src/physics/Collider2D.ts';
import { NarrowphaseSAT } from '../src/physics/NarrowphaseSAT.ts';
import { GJK2D } from '../src/physics/GJK2D.ts';
import { Polygon } from '../src/core/math/Polygon.ts';

export function runPhysicsTests(): void {
  runSuite('Physics / SAT Circle vs Circle Collision', () => {
    const bodyA = new RigidBody2D({ type: BodyType.Dynamic });
    const bodyB = new RigidBody2D({ type: BodyType.Dynamic });
    const colA = new Collider2D(ColliderShapeType.Circle, { circleRadius: 10 });
    const colB = new Collider2D(ColliderShapeType.Circle, { circleRadius: 10 });

    const manifold = NarrowphaseSAT.testCollision(
      0, 1,
      new Vector2(0, 0), 0,
      new Vector2(15, 0), 0,
      bodyA, bodyB, colA, colB
    );

    assert(manifold !== null, 'Overlapping circles (dist 15, radius sum 20) must produce collision manifold');
    assert(manifold.contacts.length === 1, 'Circle collision must produce 1 contact point');
    assert(Math.abs(manifold.contacts[0].penetration - 5) < 1e-4, 'Penetration depth must be 5');
  });

  runSuite('Physics / SAT Box vs Box Collision', () => {
    const bodyA = new RigidBody2D({ type: BodyType.Dynamic });
    const bodyB = new RigidBody2D({ type: BodyType.Dynamic });
    const colA = new Collider2D(ColliderShapeType.Box, { boxExtents: new Vector2(10, 10) });
    const colB = new Collider2D(ColliderShapeType.Box, { boxExtents: new Vector2(10, 10) });

    const manifold = NarrowphaseSAT.testCollision(
      0, 1,
      new Vector2(0, 0), 0,
      new Vector2(16, 0), 0,
      bodyA, bodyB, colA, colB
    );

    assert(manifold !== null, 'Boxes overlapping on X axis must collide');
    assert(Math.abs(manifold.contacts[0].penetration - 4) < 1e-4, 'Overlap penetration must be 4');
  });

  runSuite('Physics / GJK Convex Distance', () => {
    const box1 = Polygon.createBox(10, 10, new Vector2(0, 0)).vertices;
    const box2 = Polygon.createBox(10, 10, new Vector2(25, 0)).vertices;

    const dist = GJK2D.distance(box1, box2);
    assert(dist > 0, 'Separated boxes must return positive distance in GJK');
  });
}
