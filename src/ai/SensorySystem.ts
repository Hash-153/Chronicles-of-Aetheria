/**
 * @file SensorySystem.ts
 * @description Multi-modal AI perception engine simulating Vision cones, Hearing radii, Smell trails, and Alert propagation.
 */

import { Vector2 } from '../core/math/Vector2.ts';

export interface SensoryStimulus {
  position: Vector2;
  intensity: number;
  sourceEntityId: number;
  type: 'sight' | 'sound' | 'scent';
}

export class SensorySystem {
  public visualRange = 250;
  public visualFOV = Math.PI * 0.6; // 108 degrees
  public hearingRadius = 350;
  public alertLevel = 0.0; // 0 to 1

  public canSee(eyePos: Vector2, facingAngle: number, targetPos: Vector2): boolean {
    const toTarget = targetPos.subtract(eyePos);
    const dist = toTarget.length();
    if (dist > this.visualRange) return false;

    const angleToTarget = toTarget.angle();
    let diff = Math.abs(angleToTarget - facingAngle);
    while (diff > Math.PI) diff = Math.abs(diff - Math.PI * 2);

    return diff <= this.visualFOV * 0.5;
  }

  public canHear(earPos: Vector2, soundOrigin: Vector2, soundLoudness: number): boolean {
    const dist = earPos.distanceTo(soundOrigin);
    return dist <= this.hearingRadius * (soundLoudness / 100);
  }

  public update(dt: number): void {
    if (this.alertLevel > 0) {
      this.alertLevel = Math.max(0, this.alertLevel - dt * 0.1);
    }
  }
}
