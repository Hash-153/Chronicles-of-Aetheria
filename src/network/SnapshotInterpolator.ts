/**
 * @file SnapshotInterpolator.ts
 * @description Hermite cubic spline position interpolation for remote network entity smoothing.
 */

import { Vector2 } from '../core/math/Vector2.ts';

export interface EntitySnapshot {
  timestamp: number;
  position: Vector2;
  velocity: Vector2;
}

export class SnapshotInterpolator {
  private _buffer: EntitySnapshot[] = [];
  public interpolationDelay = 0.1; // 100ms jitter buffer

  public pushSnapshot(snap: EntitySnapshot): void {
    this._buffer.push(snap);
    if (this._buffer.length > 20) {
      this._buffer.shift();
    }
  }

  public getInterpolatedPosition(renderTime: number): Vector2 {
    const targetTime = renderTime - this.interpolationDelay;
    if (this._buffer.length === 0) return new Vector2();
    if (this._buffer.length === 1) return this._buffer[0].position.clone();

    // Locate bounding snapshots
    for (let i = 0; i < this._buffer.length - 1; i++) {
      const s0 = this._buffer[i];
      const s1 = this._buffer[i + 1];

      if (targetTime >= s0.timestamp && targetTime <= s1.timestamp) {
        const duration = s1.timestamp - s0.timestamp;
        const t = duration > 0 ? (targetTime - s0.timestamp) / duration : 0;
        return s0.position.lerp(s1.position, t);
      }
    }

    return this._buffer[this._buffer.length - 1].position.clone();
  }
}
