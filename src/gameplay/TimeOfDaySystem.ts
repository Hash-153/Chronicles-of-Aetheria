/**
 * @file TimeOfDaySystem.ts
 * @description 24-minute celestial Day/Night cycle updating ambient light colors and shadow angles.
 */

import { Color } from '../core/math/Color.ts';

export class TimeOfDaySystem {
  public currentHour = 12.0; // 0.0 to 24.0
  public timeSpeed = 1.0; // 1 real sec = 1 in-game minute

  public update(dt: number): void {
    this.currentHour = (this.currentHour + (dt * this.timeSpeed) / 60) % 24;
  }

  public getAmbientColor(): Color {
    // Dawn (6), Noon (12), Dusk (18), Midnight (0/24)
    if (this.currentHour >= 5 && this.currentHour < 8) {
      // Dawn
      return new Color(0.7, 0.5, 0.6, 1.0);
    } else if (this.currentHour >= 8 && this.currentHour < 17) {
      // Noon / Day
      return new Color(0.95, 0.95, 0.9, 1.0);
    } else if (this.currentHour >= 17 && this.currentHour < 20) {
      // Dusk
      return new Color(0.6, 0.35, 0.4, 1.0);
    } else {
      // Night
      return new Color(0.12, 0.15, 0.28, 1.0);
    }
  }
}
