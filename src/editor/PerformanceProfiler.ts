/**
 * @file PerformanceProfiler.ts
 * @description Frame-time telemetry, rolling average FPS tracking, and subsystem execution metrics.
 */

import { RingBuffer } from '../core/collections/RingBuffer.ts';

export class PerformanceProfiler {
  private _frameTimes = new RingBuffer<number>(60);
  private _lastTimestamp = performance.now();

  public fps = 60;
  public frameTimeMs = 16.6;
  public totalDrawCalls = 0;
  public totalEntities = 0;
  public totalPhysicsBodies = 0;

  public beginFrame(): void {
    const now = performance.now();
    const dt = now - this._lastTimestamp;
    this._lastTimestamp = now;

    this._frameTimes.push(dt);

    // Compute rolling average
    let sum = 0;
    const count = this._frameTimes.size;
    for (let i = 0; i < count; i++) {
      sum += this._frameTimes.get(i)!;
    }

    if (count > 0) {
      this.frameTimeMs = sum / count;
      this.fps = Math.round(1000 / this.frameTimeMs);
    }
  }
}
