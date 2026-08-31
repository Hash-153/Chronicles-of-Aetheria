/**
 * @file WeatherSystem.ts
 * @description Dynamic climate simulation controlling rain, thunderstorms, snow, fog, and environmental particle effects.
 */

import { ParticleEmitter } from '../particles/ParticleEmitter.ts';
import { Color } from '../core/math/Color.ts';

export const WeatherType = {
  Clear: 0,
  Rain: 1,
  Thunderstorm: 2,
  Blizzard: 3,
  Fog: 4,
} as const;
export type WeatherType = typeof WeatherType[keyof typeof WeatherType];

export class WeatherSystem {
  public currentWeather = WeatherType.Clear;
  public weatherTimer = 0;
  public weatherDuration = 180; // 3 minutes per cycle
  public rainIntensity = 0.0;
  public fogDensity = 0.0;

  public update(dt: number): void {
    this.weatherTimer += dt;
    if (this.weatherTimer >= this.weatherDuration) {
      this.weatherTimer = 0;
      this.cycleWeather();
    }

    // Smooth intensity transitions
    if (this.currentWeather === WeatherType.Rain || this.currentWeather === WeatherType.Thunderstorm) {
      this.rainIntensity = Math.min(1.0, this.rainIntensity + dt * 0.2);
    } else {
      this.rainIntensity = Math.max(0.0, this.rainIntensity - dt * 0.2);
    }
  }

  public cycleWeather(): void {
    const types = [WeatherType.Clear, WeatherType.Rain, WeatherType.Thunderstorm, WeatherType.Fog];
    this.currentWeather = types[Math.floor(Math.random() * types.length)];
  }
}
