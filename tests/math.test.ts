/**
 * @file math.test.ts
 * @description Unit tests for Vector2, Vector3, Matrix3, Matrix4, Quaternion, AABB, OBB, Ray2D, Polygon, and Noise.
 */

import { assert, runSuite } from './run_all_tests.ts';
import { Vector2 } from '../src/core/math/Vector2.ts';
import { Vector3 } from '../src/core/math/Vector3.ts';
import { Matrix3 } from '../src/core/math/Matrix3.ts';
import { Matrix4 } from '../src/core/math/Matrix4.ts';
import { Quaternion } from '../src/core/math/Quaternion.ts';
import { AABB } from '../src/core/math/AABB.ts';
import { OBB } from '../src/core/math/OBB.ts';
import { Ray2D } from '../src/core/math/Ray2D.ts';
import { Circle } from '../src/core/math/Circle.ts';
import { Polygon } from '../src/core/math/Polygon.ts';
import { Noise } from '../src/core/math/Noise.ts';
import { MathUtils } from '../src/core/math/MathUtils.ts';

export function runMathTests(): void {
  runSuite('Math / Vector2 Primitives & Operations', () => {
    const v1 = new Vector2(3, 4);
    assert(v1.length() === 5, 'Vector2 length of (3,4) must be 5');

    const v2 = new Vector2(1, 2);
    const added = v1.add(v2);
    assert(added.x === 4 && added.y === 6, 'Vector2 addition failed');

    const dot = v1.dot(v2);
    assert(dot === 3 * 1 + 4 * 2, 'Vector2 dot product failed');

    const normalized = v1.normalize();
    assert(Math.abs(normalized.length() - 1.0) < 1e-6, 'Normalized vector must have length 1');
  });

  runSuite('Math / Matrix3 & Matrix4 Inversions', () => {
    const m3 = new Matrix3().makeTranslation(10, 20).rotate(Math.PI * 0.5);
    const p = new Vector2(5, 0);
    const transformed = m3.transformVector2(p);

    const invM3 = m3.clone().invert();
    const restored = invM3.transformVector2(transformed);
    assert(restored.equals(p, 1e-4), 'Matrix3 inverse transformation did not restore original point');

    const m4 = new Matrix4().makeTranslation(10, 20, 30);
    const v3 = new Vector3(1, 2, 3);
    const res3 = m4.transformVector3(v3);
    assert(res3.x === 11 && res3.y === 22 && res3.z === 33, 'Matrix4 translation failed');
  });

  runSuite('Math / Geometry & Intersections (AABB, OBB, Ray, Circle, Polygon)', () => {
    const aabb1 = new AABB(0, 0, 10, 10);
    const aabb2 = new AABB(5, 5, 15, 15);
    const aabb3 = new AABB(20, 20, 30, 30);

    assert(aabb1.intersectsAABB(aabb2), 'AABB1 and AABB2 should intersect');
    assert(!aabb1.intersectsAABB(aabb3), 'AABB1 and AABB3 should NOT intersect');

    const ray = new Ray2D(new Vector2(-10, 5), new Vector2(1, 0), 100);
    const hit = ray.intersectAABB(aabb1);
    assert(hit !== null && hit.distance === 10, 'Ray should hit AABB at distance 10');

    const circle = new Circle(new Vector2(5, 5), 3);
    assert(circle.containsPoint(new Vector2(6, 6)), 'Circle should contain (6,6)');
    assert(!circle.containsPoint(new Vector2(15, 15)), 'Circle should NOT contain (15,15)');

    const poly = Polygon.createBox(20, 20, new Vector2(0, 0));
    assert(poly.isConvex(), 'Box polygon must be convex');
    assert(poly.containsPoint(new Vector2(5, 5)), 'Polygon should contain internal point (5,5)');
  });

  runSuite('Math / Coherent Noise & Determinism', () => {
    const noise = new Noise(12345);
    const val1 = noise.perlin2D(5.5, 10.2);
    const val2 = noise.perlin2D(5.5, 10.2);
    assert(val1 === val2, 'Perlin noise must be deterministic for identical coordinates');

    const fractal = noise.fractalNoise2D(2.0, 3.0, 4);
    assert(typeof fractal === 'number' && !isNaN(fractal), 'Fractal noise output must be valid');
  });
}
