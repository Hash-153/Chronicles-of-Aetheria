/**
 * @file ColorRamp.ts
 * @description Multi-stop color and alpha gradient evaluator for particle life color interpolation.
 */

import { Color } from '../core/math/Color.ts';
import { MathUtils } from '../core/math/MathUtils.ts';

export interface ColorStop {
  position: number; // 0.0 to 1.0
  color: Color;
}

export class ColorRamp {
  public stops: ColorStop[];

  constructor(stops: ColorStop[] = []) {
    if (stops.length === 0) {
      this.stops = [
        { position: 0, color: new Color(1, 1, 1, 1) },
        { position: 1, color: new Color(1, 1, 1, 0) },
      ];
    } else {
      this.stops = [...stops].sort((a, b) => a.position - b.position);
    }
  }

  public evaluate(t: number, out = new Color()): Color {
    const clampedT = MathUtils.clamp01(t);

    if (clampedT <= this.stops[0].position) {
      return out.copy(this.stops[0].color);
    }

    if (clampedT >= this.stops[this.stops.length - 1].position) {
      return out.copy(this.stops[this.stops.length - 1].color);
    }

    for (let i = 0; i < this.stops.length - 1; i++) {
      const s0 = this.stops[i];
      const s1 = this.stops[i + 1];

      if (clampedT >= s0.position && clampedT <= s1.position) {
        const span = s1.position - s0.position;
        const localT = span > 0 ? (clampedT - s0.position) / span : 0;
        return out.copy(s0.color).lerpSelf(s1.color, localT);
      }
    }

    return out.copy(this.stops[0].color);
  }
}
