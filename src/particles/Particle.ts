/**
 * @file Particle.ts
 * @description Particle state struct representing an active visual FX particle.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Color } from '../core/math/Color.ts';

export class Particle {
  public position = new Vector2();
  public velocity = new Vector2();
  public acceleration = new Vector2();

  public lifetime = 1.0;
  public age = 0;

  public startSize = 8;
  public endSize = 0;
  public currentSize = 8;

  public startRotation = 0;
  public rotationSpeed = 0;
  public currentRotation = 0;

  public color = new Color();
  public isAlive = false;

  public reset(): void {
    this.position.set(0, 0);
    this.velocity.set(0, 0);
    this.acceleration.set(0, 0);
    this.lifetime = 1.0;
    this.age = 0;
    this.startSize = 8;
    this.endSize = 0;
    this.currentSize = 8;
    this.startRotation = 0;
    this.rotationSpeed = 0;
    this.currentRotation = 0;
    this.color.set(1, 1, 1, 1);
    this.isAlive = false;
  }

  public get normalizedLife(): number {
    return this.lifetime > 0 ? Math.min(1, this.age / this.lifetime) : 1;
  }
}
