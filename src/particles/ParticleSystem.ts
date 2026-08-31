/**
 * @file ParticleSystem.ts
 * @description Central ECS particle simulation system maintaining zero-allocation object pools and updating particle physics.
 */

import { Particle } from './Particle.ts';
import { ParticleEmitter, EmitterShape } from './ParticleEmitter.ts';
import { ObjectPool } from '../core/collections/ObjectPool.ts';
import { Transform2D } from '../core/math/Transform2D.ts';
import { System } from '../core/ecs/System.ts';
import { SystemPhase } from '../core/ecs/Types.ts';
import { Vector2 } from '../core/math/Vector2.ts';
import { MathUtils } from '../core/math/MathUtils.ts';
import { SpriteBatchRenderer } from '../renderer/SpriteBatchRenderer.ts';

export class ParticleSystem extends System {
  public phase = SystemPhase.PostUpdate;
  public priority = 50;

  private _pool: ObjectPool<Particle>;
  private _activeParticles: Particle[] = [];
  public maxParticles = 5000;

  constructor() {
    super();
    this._pool = new ObjectPool<Particle>(() => new Particle(), 1024, (p) => p.reset());
  }

  public get activeParticleCount(): number {
    return this._activeParticles.length;
  }

  public override update(dt: number): void {
    const emitterQuery = this.world.createQuery({ all: [Transform2D, ParticleEmitter] });

    // 1. Process Emitters & Spawn Particles
    emitterQuery.forEach((id, transform: Transform2D, emitter: ParticleEmitter) => {
      emitter.update(dt, (count) => {
        this._spawnParticles(transform.position, transform.rotation, emitter, count);
      });
    }, [Transform2D, ParticleEmitter]);

    // 2. Update Active Particles
    for (let i = this._activeParticles.length - 1; i >= 0; i--) {
      const p = this._activeParticles[i];
      p.age += dt;

      if (p.age >= p.lifetime) {
        this._activeParticles.splice(i, 1);
        this._pool.release(p);
        continue;
      }

      // Integrate velocity and acceleration
      p.velocity.addSelf(p.acceleration.scale(dt));
      p.position.addSelf(p.velocity.scale(dt));
      p.currentRotation += p.rotationSpeed * dt;

      // Size interpolation
      const t = p.normalizedLife;
      p.currentSize = MathUtils.lerp(p.startSize, p.endSize, t);
    }
  }

  public render(batch: SpriteBatchRenderer): void {
    const origin = new Vector2(0.5, 0.5);
    const size = new Vector2();

    for (let i = 0; i < this._activeParticles.length; i++) {
      const p = this._activeParticles[i];
      size.set(p.currentSize, p.currentSize);

      batch.drawSprite(
        p.position,
        size,
        p.currentRotation,
        origin,
        p.color
      );
    }
  }

  private _spawnParticles(
    emitterPos: Vector2,
    emitterRot: number,
    emitter: ParticleEmitter,
    count: number
  ): void {
    for (let i = 0; i < count; i++) {
      if (this._activeParticles.length >= this.maxParticles) break;

      const p = this._pool.acquire();
      p.isAlive = true;
      p.age = 0;
      p.lifetime = MathUtils.lerp(emitter.minLifetime, emitter.maxLifetime, Math.random());

      // Shape emission position
      let offset = new Vector2();
      let angle = emitterRot;

      switch (emitter.shape) {
        case EmitterShape.Circle: {
          const r = Math.random() * emitter.shapeRadius;
          const a = Math.random() * Math.PI * 2;
          offset.set(Math.cos(a) * r, Math.sin(a) * r);
          angle = a;
          break;
        }
        case EmitterShape.Cone: {
          const spread = (Math.random() * 2 - 1) * emitter.coneAngle * 0.5;
          angle = emitterRot + spread;
          break;
        }
        case EmitterShape.Point:
        default:
          break;
      }

      p.position.copy(emitterPos.add(offset));

      const speed = MathUtils.lerp(emitter.minSpeed, emitter.maxSpeed, Math.random());
      p.velocity.set(Math.cos(angle) * speed, Math.sin(angle) * speed);
      p.acceleration.copy(emitter.gravity);

      p.startSize = MathUtils.lerp(emitter.minSize, emitter.maxSize, Math.random());
      p.endSize = emitter.endSize;
      p.currentSize = p.startSize;

      p.color = emitter.colorRamp.evaluate(0);

      this._activeParticles.push(p);
    }
  }
}
