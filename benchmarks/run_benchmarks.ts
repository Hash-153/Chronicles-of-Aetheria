/**
 * @file run_benchmarks.ts
 * @description Stress testing performance benchmark simulating 10,000 active entities across physics and ECS ticks.
 */

import { World } from '../src/core/ecs/World.ts';
import { Transform2D } from '../src/core/math/Transform2D.ts';
import { Vector2 } from '../src/core/math/Vector2.ts';
import { RigidBody2D, BodyType } from '../src/physics/RigidBody2D.ts';
import { Collider2D, ColliderShapeType } from '../src/physics/Collider2D.ts';
import { PhysicsWorld } from '../src/physics/PhysicsWorld.ts';

export function runSimulationBenchmark(entityCount = 10000, steps = 100): void {
  console.log('\n========================================');
  console.log(`   AETHER ENGINE - BENCHMARK (${entityCount.toLocaleString()} ENTITIES)  `);
  console.log('========================================\n');

  const world = new World(entityCount + 100);
  const physics = new PhysicsWorld();
  world.addSystem(physics);

  console.log(`Spawning ${entityCount.toLocaleString()} dynamic physics bodies...`);
  const spawnStart = performance.now();

  for (let i = 0; i < entityCount; i++) {
    const e = world.createEntity();
    const x = (Math.random() * 2000) - 1000;
    const y = (Math.random() * 2000) - 1000;

    e.add(new Transform2D(x, y));
    e.add(new RigidBody2D({
      type: BodyType.Dynamic,
      mass: 1.0,
      linearDamping: 0.05,
    }));
    e.add(new Collider2D(ColliderShapeType.Circle, { circleRadius: 8 }));
    physics.broadphase.register(e.id, e.get(Collider2D)!);
  }

  const spawnTime = (performance.now() - spawnStart).toFixed(2);
  console.log(`\x1b[32m✔\x1b[0m Spawned in ${spawnTime}ms\n`);

  console.log(`Running ${steps} simulation steps...`);
  const simStart = performance.now();

  for (let s = 0; s < steps; s++) {
    world.update(0.016);
  }

  const simTotal = performance.now() - simStart;
  const avgStepMs = (simTotal / steps).toFixed(2);
  const simulatedFps = (1000 / (simTotal / steps)).toFixed(1);

  console.log(`\x1b[32m✔\x1b[0m Total time for ${steps} frames: ${simTotal.toFixed(2)}ms`);
  console.log(`\x1b[32m✔\x1b[0m Average step duration: ${avgStepMs}ms`);
  console.log(`\x1b[32m✔\x1b[0m Simulated Throughput: ${simulatedFps} FPS\n`);
}

runSimulationBenchmark(10000, 50);
