/**
 * @file UICombatLog.ts
 * @description Scrolling combat activity log displaying damage numbers, status ticks, experience gains, and loot notifications.
 */

import { UINode } from './UINode.ts';
import { Vector2 } from '../core/math/Vector2.ts';
import { RingBuffer } from '../core/collections/RingBuffer.ts';

export interface CombatLogEntry {
  text: string;
  color: string;
  timestamp: number;
}

export class UICombatLog extends UINode {
  private _logs = new RingBuffer<CombatLogEntry>(100);
  public lineHeight = 18;

  constructor(width = 300, height = 150) {
    super();
    this.size.set(width, height);
  }

  public addEntry(text: string, color = '#e2e8f0'): void {
    this._logs.push({
      text,
      color,
      timestamp: Date.now(),
    });
  }

  public override render(ctx: CanvasRenderingContext2D, parentPos = new Vector2(0, 0)): void {
    if (!this.isVisible) return;
    const gx = parentPos.x + this.position.x;
    const gy = parentPos.y + this.position.y;

    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(gx, gy, this.size.x, this.size.y);
    ctx.strokeStyle = '#334155';
    ctx.strokeRect(gx, gy, this.size.x, this.size.y);

    ctx.font = '11px system-ui, sans-serif';
    const visibleCount = Math.floor(this.size.y / this.lineHeight);
    const startIdx = Math.max(0, this._logs.size - visibleCount);

    for (let i = startIdx; i < this._logs.size; i++) {
      const entry = this._logs.get(i);
      if (!entry) continue;

      const yOffset = (i - startIdx) * this.lineHeight + 14;
      ctx.fillStyle = entry.color;
      ctx.fillText(entry.text, gx + 8, gy + yOffset);
    }

    ctx.restore();
  }
}
