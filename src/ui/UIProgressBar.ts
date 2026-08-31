/**
 * @file UIProgressBar.ts
 * @description Health, Mana, Stamina, and Experience resource bar component with smooth easing and textual labels.
 */

import { UINode } from './UINode.ts';
import { Color } from '../core/math/Color.ts';
import { MathUtils } from '../core/math/MathUtils.ts';

export class UIProgressBar extends UINode {
  public currentValue = 100;
  public maxValue = 100;
  public fillColor = new Color(0.85, 0.2, 0.2, 1.0); // Default Red for HP
  public showText = true;
  public labelPrefix = '';

  private _displayedValue = 100;

  constructor(current = 100, max = 100, fillColor = new Color(0.85, 0.2, 0.2, 1.0)) {
    super('UIProgressBar');
    this.currentValue = current;
    this.maxValue = max;
    this._displayedValue = current;
    this.fillColor = fillColor;
    this.size.set(200, 20);
  }

  public update(dt: number): void {
    // Smoothly catch up displayed bar to target value
    this._displayedValue = MathUtils.damp(this._displayedValue, this.currentValue, 10, dt);
  }

  protected override onRenderContent(ctx: CanvasRenderingContext2D): void {
    const fraction = Math.max(0, Math.min(1, this.maxValue > 0 ? this._displayedValue / this.maxValue : 0));
    const fillWidth = (this.computedWidth - 2) * fraction;

    // Fill bar
    if (fillWidth > 0) {
      ctx.fillStyle = this.fillColor.toRGBA();
      ctx.fillRect(this.computedX + 1, this.computedY + 1, fillWidth, this.computedHeight - 2);
    }

    // Text Label Overlay
    if (this.showText) {
      ctx.font = 'bold 11px Segoe UI, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const label = `${this.labelPrefix}${Math.round(this.currentValue)} / ${Math.round(this.maxValue)}`;
      ctx.fillText(
        label,
        this.computedX + this.computedWidth * 0.5,
        this.computedY + this.computedHeight * 0.5
      );
    }
  }
}
