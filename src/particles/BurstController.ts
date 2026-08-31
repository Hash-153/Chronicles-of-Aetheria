/**
 * @file BurstController.ts
 * @description Schedules explosive particle bursts, cycle repeats, and timed triggers for spells and explosions.
 */

export interface ParticleBurst {
  time: number; // in seconds relative to emitter start
  count: number;
  repeatInterval?: number;
  cyclesRemaining?: number;
}

export class BurstController {
  public bursts: ParticleBurst[] = [];
  private _currentTime = 0;

  constructor(bursts: ParticleBurst[] = []) {
    this.bursts = bursts.map(b => ({ ...b, cyclesRemaining: b.cyclesRemaining ?? 1 }));
  }

  public update(dt: number, emitCallback: (count: number) => void): void {
    const prevTime = this._currentTime;
    this._currentTime += dt;

    for (let i = 0; i < this.bursts.length; i++) {
      const burst = this.bursts[i];
      if (burst.cyclesRemaining === undefined || burst.cyclesRemaining <= 0) continue;

      if (prevTime < burst.time && this._currentTime >= burst.time) {
        emitCallback(burst.count);
        burst.cyclesRemaining--;

        if (burst.repeatInterval && burst.cyclesRemaining > 0) {
          burst.time += burst.repeatInterval;
        }
      }
    }
  }

  public reset(): void {
    this._currentTime = 0;
  }
}
