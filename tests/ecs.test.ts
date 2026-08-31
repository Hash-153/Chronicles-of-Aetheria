/**
 * @file ecs.test.ts
 * @description Unit and stress tests for the Archetype & Sparse-Set ECS Engine.
 */

import { assert, runSuite } from './run_all_tests.ts';
import { World } from '../src/core/ecs/World.ts';
import { Component } from '../src/core/ecs/Component.ts';
import { Transform2D } from '../src/core/math/Transform2D.ts';
import { System } from '../src/core/ecs/System.ts';
import { SystemPhase } from '../src/core/ecs/Types.ts';

class TestHealth {
  public hp = 100;
}

class TestVelocity {
  public vx = 5;
  public vy = 10;
}

class TestMovementSystem extends System {
  public phase = SystemPhase.Update;
  public updateCount = 0;

  public override update(dt: number): void {
    const query = this.world.createQuery({ all: [Transform2D, TestVelocity] });
    query.forEach((id, trans: Transform2D, vel: TestVelocity) => {
      trans.position.x += vel.vx * dt;
      trans.position.y += vel.vy * dt;
      this.updateCount++;
    }, [Transform2D, TestVelocity]);
  }
}

export function runECSTests(): void {
  runSuite('ECS / Entity Creation & Lifecycle', () => {
    const world = new World(100);
    const e1 = world.createEntity();
    const e2 = world.createEntity();

    assert(e1.id === 0, 'First entity ID must be 0');
    assert(e2.id === 1, 'Second entity ID must be 1');
    assert(e1.isValid && e2.isValid, 'Entities must be valid upon creation');

    world.destroyEntity(e1.id);
    assert(!e1.isValid, 'Destroyed entity must be marked invalid');

    const e3 = world.createEntity();
    assert(e3.id === 0, 'Recycled entity should reuse slot 0');
  });

  runSuite('ECS / Archetype Transitions & Component Columns', () => {
    const world = new World(100);
    const entity = world.createEntity();

    entity.add(new Transform2D(10, 20));
    assert(entity.has(Transform2D), 'Entity must report having Transform2D');

    const trans = entity.get(Transform2D)!;
    assert(trans.position.x === 10 && trans.position.y === 20, 'Component data must match');

    entity.add(new TestHealth());
    assert(entity.has(TestHealth) && entity.has(Transform2D), 'Entity must support multi-component archetypes');

    entity.remove(Transform2D);
    assert(!entity.has(Transform2D) && entity.has(TestHealth), 'Removed component must be detached from archetype');
  });

  runSuite('ECS / Query Matching & Systems Scheduling', () => {
    const world = new World(100);
    const sys = new TestMovementSystem();
    world.addSystem(sys);

    for (let i = 0; i < 5; i++) {
      const e = world.createEntity();
      e.add(new Transform2D(0, 0));
      e.add(new TestVelocity());
    }

    world.update(1.0);
    assert(sys.updateCount === 5, 'Movement system should have updated exactly 5 entities');
  });
}
