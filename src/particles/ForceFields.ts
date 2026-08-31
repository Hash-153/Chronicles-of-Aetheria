/**
 * @file ForceFields.ts
 * @description Force fields affecting particle dynamics (Attractor, Repulsor, Vortex, Turbulence noise field).
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Particle } from './Particle.ts';
import { Noise } from '../core/math/Noise.ts';

export const ForceFieldType = {
  PointAttractor: 0,
  PointRepulsor: 1,
  Vortex: 2,
  Turbulence: 3,
} as const;
export type ForceFieldType = typeof ForceFieldType[keyof typeof ForceFieldType];

export class ForceField {
  public type: ForceFieldType;
  public position: Vector2;
  public strength: number;
  public radius: number;
  private _noise: Noise;

  constructor(type = ForceFieldType.PointAttractor, pos = new Vector2(), strength = 100, radius = 200) {
    this.type = type;
    this.position = pos.clone();
    this.strength = strength;
    this.radius = radius;
    this._noise = new Noise(42);
  }

  public applyTo(particle: Particle, dt: number): void {
    const delta = this.position.subtract(particle.position);
    const distSq = delta.lengthSquared();
    const radSq = this.radius * this.radius;

    if (distSq > radSq || distSq < 1e-4) return;

    const dist = Math.sqrt(distSq);
    const falloff = 1 - dist / this.radius;

    switch (this.type) {
      case ForceFieldType.PointAttractor: {
        const dir = delta.scale(1 / dist);
        particle.velocity.addSelf(dir.scale(this.strength * falloff * dt));
        break;
      }
      case ForceFieldType.PointRepulsor: {
        const dir = delta.scale(-1 / dist);
        particle.velocity.addSelf(dir.scale(this.strength * falloff * dt));
        break;
      }
      case ForceFieldType.Vortex: {
        const tangent = new Vector2(-delta.y, delta.x).normalize();
        particle.velocity.addSelf(tangent.scale(this.strength * falloff * dt));
        break;
      }
      case ForceFieldType.Turbulence: {
        const nx = this._noise.perlin2D(particle.position.x * 0.01, particle.position.y * 0.01);
        const ny = this._noise.perlin2D(particle.position.x * 0.01 + 100, particle.position.y * 0.01 + 100);
        particle.velocity.addSelf(new Vector2(nx, ny).scale(this.strength * falloff * dt));
        break;
      }
    }
  }
}
