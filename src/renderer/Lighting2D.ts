/**
 * @file Lighting2D.ts
 * @description Dynamic 2D Lighting engine with Point Lights, Spot Lights, Ambient Light, and smooth radial attenuation.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Color } from '../core/math/Color.ts';
import { Component } from '../core/ecs/Component.ts';

export const LightType = {
  Point: 0,
  Spot: 1,
  Directional: 2,
} as const;
export type LightType = typeof LightType[keyof typeof LightType];

export class Light2D {
  public type: LightType;
  public color: Color;
  public intensity: number;
  public radius: number;
  public innerRadius: number;

  // Spot light properties
  public direction: Vector2;
  public spotAngle: number; // in radians

  // Shadows
  public castShadows: boolean;
  public shadowSoftness: number;

  // Dynamic animation
  public isFlickering: boolean;
  public flickerSpeed: number;
  public flickerIntensity: number;
  private _flickerTime = 0;

  constructor(options: {
    type?: LightType;
    color?: Color;
    intensity?: number;
    radius?: number;
    innerRadius?: number;
    direction?: Vector2;
    spotAngle?: number;
    castShadows?: boolean;
    flickering?: boolean;
  } = {}) {
    this.type = options.type ?? LightType.Point;
    this.color = options.color ? options.color.clone() : new Color(1, 0.9, 0.7, 1);
    this.intensity = options.intensity ?? 1.0;
    this.radius = options.radius ?? 250;
    this.innerRadius = options.innerRadius ?? 0;
    this.direction = options.direction ? options.direction.clone() : new Vector2(0, 1);
    this.spotAngle = options.spotAngle ?? Math.PI * 0.25;
    this.castShadows = options.castShadows ?? true;
    this.shadowSoftness = 0.5;

    this.isFlickering = options.flickering ?? false;
    this.flickerSpeed = 10.0;
    this.flickerIntensity = 0.15;
  }

  public getEffectiveIntensity(dt = 0): number {
    if (!this.isFlickering) return this.intensity;
    this._flickerTime += dt * this.flickerSpeed;
    const noise = Math.sin(this._flickerTime) * Math.cos(this._flickerTime * 2.3);
    return Math.max(0, this.intensity + noise * this.flickerIntensity);
  }
}
