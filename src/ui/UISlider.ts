/**
 * @file UISlider.ts
 * @description Interactive range slider control for audio volume, visual brightness, and numerical tweaking.
 */

import { UINode } from './UINode.ts';
import { Vector2 } from '../core/math/Vector2.ts';
import { Color } from '../core/math/Color.ts';

export class UISlider extends UINode {
  public minValue: number;
  public maxValue: number;
  public value: number;
  public isDragging = false;
  public onChange?: (val: number) => void;

  constructor(min = 0, max = 100, initial = 50, width = 160, height = 18) {
    super();
    this.minValue = min;
    this.maxValue = max;
    this.value = initial;
    this.size.set(width, height);
  }

  public override render(ctx: CanvasRenderingContext2D, parentPos = new Vector2(0, 0)): void {
    if (!this.isVisible) return;
    const gx = parentPos.x + this.position.x;
    const gy = parentPos.y + this.position.y;

    ctx.save();
    // Track background
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(gx, gy + this.size.y * 0.5 - 3, this.size.x, 6);

    // Filled progress track
    const pct = (this.value - this.minValue) / (this.maxValue - this.minValue);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(gx, gy + this.size.y * 0.5 - 3, this.size.x * pct, 6);

    // Handle
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(gx + this.size.x * pct, gy + this.size.y * 0.5, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
