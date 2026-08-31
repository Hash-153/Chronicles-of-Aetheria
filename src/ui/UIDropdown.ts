/**
 * @file UIDropdown.ts
 * @description Selectable dropdown menu list control with scrollable items.
 */

import { UINode } from './UINode.ts';
import { Vector2 } from '../core/math/Vector2.ts';

export class UIDropdown extends UINode {
  public options: string[];
  public selectedIndex = 0;
  public isOpen = false;
  public onSelect?: (idx: number, opt: string) => void;

  constructor(options: string[], width = 160, height = 26) {
    super();
    this.options = options;
    this.size.set(width, height);
  }

  public override render(ctx: CanvasRenderingContext2D, parentPos = new Vector2(0, 0)): void {
    if (!this.isVisible) return;
    const gx = parentPos.x + this.position.x;
    const gy = parentPos.y + this.position.y;

    ctx.save();
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#475569';
    ctx.fillRect(gx, gy, this.size.x, this.size.y);
    ctx.strokeRect(gx, gy, this.size.x, this.size.y);

    ctx.fillStyle = '#f8fafc';
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText(this.options[this.selectedIndex] || 'Select...', gx + 8, gy + 17);

    // Arrow
    ctx.fillText('▼', gx + this.size.x - 18, gy + 17);

    if (this.isOpen) {
      for (let i = 0; i < this.options.length; i++) {
        const itemY = gy + this.size.y + i * this.size.y;
        ctx.fillStyle = i === this.selectedIndex ? '#0284c7' : '#0f172a';
        ctx.fillRect(gx, itemY, this.size.x, this.size.y);
        ctx.strokeRect(gx, itemY, this.size.x, this.size.y);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.options[i], gx + 8, itemY + 17);
      }
    }

    ctx.restore();
  }
}
