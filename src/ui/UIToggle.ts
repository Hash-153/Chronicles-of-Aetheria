/**
 * @file UIToggle.ts
 * @description Boolean toggle switch widget for sound mute, debug toggles, and graphical options.
 */

import { UINode } from './UINode.ts';
import { Vector2 } from '../core/math/Vector2.ts';

export class UIToggle extends UINode {
  public isChecked: boolean;
  public label: string;
  public onToggle?: (checked: boolean) => void;

  constructor(label: string, initial = false, width = 120, height = 24) {
    super();
    this.label = label;
    this.isChecked = initial;
    this.size.set(width, height);
  }

  public override render(ctx: CanvasRenderingContext2D, parentPos = new Vector2(0, 0)): void {
    if (!this.isVisible) return;
    const gx = parentPos.x + this.position.x;
    const gy = parentPos.y + this.position.y;

    ctx.save();
    // Switch background
    ctx.fillStyle = this.isChecked ? '#0284c7' : '#334155';
    ctx.beginPath();
    ctx.roundRect(gx, gy + 2, 36, 20, 10);
    ctx.fill();

    // Switch Knob
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    const knobX = this.isChecked ? gx + 26 : gx + 10;
    ctx.arc(knobX, gy + 12, 7, 0, Math.PI * 2);
    ctx.fill();

    // Label
    ctx.fillStyle = '#f8fafc';
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText(this.label, gx + 44, gy + 16);

    ctx.restore();
  }
}
