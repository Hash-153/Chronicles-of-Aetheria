/**
 * @file ParticleEmitter.ts
 * @description Configurable 2D Particle Emitter component for spells, sparks, smoke, explosions, and aura FX.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Color } from '../core/math/Color.ts';
import { ColorRamp } from './ColorRamp.ts';
import { BurstController } from './BurstController.ts';
import { Component } from '../core/ecs/Component.ts';

export const EmitterShape = {
  Point: 0,
  Circle: 1,
  Cone: 2,
  Box: 3,
} as const;
export type EmitterShape = typeof EmitterShape[keyof typeof EmitterShape];

export class ParticleEmitter {
  public isEmitting = true;
  public duration = 0; // 0 = infinite loop
  public emissionRate = 50; // particles per second

  public shape = EmitterShape.Circle;
  public shapeRadius = 8;
  public coneAngle = Math.PI * 0.25;

  // Particle properties
  public minLifetime = 0.5;
  public maxLifetime = 1.5;
  public minSpeed = 50;
  public maxSpeed = 150;
  public minSize = 4;
  public maxSize = 12;
  public endSize = 0;

  public gravity = new Vector2(0, 0);
  public colorRamp: ColorRamp;
  public burstController: BurstController;

  public blendMode: 'normal' | 'additive' = 'additive';

  private _emissionTimer = 0;
  private _age = 0;

  constructor(options: {
    emissionRate?: number;
    shape?: EmitterShape;
    shapeRadius?: number;
    lifetime?: [number, number];
    speed?: [number, number];
    size?: [number, number];
    colorRamp?: ColorRamp;
    blendMode?: 'normal' | 'additive';
  } = {}) {
    this.emissionRate = options.emissionRate ?? 50;
    this.shape = options.shape ?? EmitterShape.Circle;
    this.shapeRadius = options.shapeRadius ?? 8;
    this.minLifetime = options.lifetime ? options.lifetime[0] : 0.5;
    this.maxLifetime = options.lifetime ? options.lifetime[1] : 1.5;
    this.minSpeed = options.speed ? options.speed[0] : 50;
    this.maxSpeed = options.speed ? options.speed[1] : 150;
    this.minSize = options.size ? options.size[0] : 4;
    this.maxSize = options.size ? options.size[1] : 12;
    this.colorRamp = options.colorRamp ?? new ColorRamp([
      { position: 0, color: new Color(1, 0.8, 0.2, 1) },
      { position: 0.5, color: new Color(1, 0.3, 0.1, 0.8) },
      { position: 1, color: new Color(0.2, 0.1, 0.1, 0) },
    ]);
    this.burstController = new BurstController();
    this.blendMode = options.blendMode ?? 'additive';
  }

  public update(dt: number, onSpawn: (count: number) => void): void {
    this._age += dt;
    this.burstController.update(dt, onSpawn);

    if (!this.isEmitting) return;
    if (this.duration > 0 && this._age >= this.duration) {
      this.isEmitting = false;
      return;
    }

    this._emissionTimer += dt;
    const interval = 1 / this.emissionRate;
    let spawnCount = 0;

    while (this._emissionTimer >= interval) {
      spawnCount++;
      this._emissionTimer -= interval;
    }

    if (spawnCount > 0) {
      onSpawn(spawnCount);
    }
  }
}
