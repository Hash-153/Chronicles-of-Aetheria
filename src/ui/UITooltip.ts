/**
 * @file UITooltip.ts
 * @description Dynamic contextual tooltip box displaying Diablo-style item stats, rarity colors, and descriptions.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { type GeneratedItem } from '../procgen/LootTableGenerator.ts';

export class UITooltip {
  public static renderItemTooltip(ctx: CanvasRenderingContext2D, item: GeneratedItem, screenPos: Vector2): void {
    ctx.save();
    const padding = 12;
    const width = 220;
    const lines = [
      item.name,
      `Item Level: ${item.itemLevel}`,
      item.baseDamage ? `Damage: ${item.baseDamage}` : '',
      item.baseArmor ? `Armor: ${item.baseArmor}` : '',
    ].filter(Boolean);

    for (const [stat, val] of Object.entries(item.stats)) {
      lines.push(`+${val} ${stat}`);
    }

    const height = lines.length * 20 + padding * 2;
    const x = Math.min(window.innerWidth - width - 10, screenPos.x + 15);
    const y = Math.min(window.innerHeight - height - 10, screenPos.y + 15);

    // Background
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);

    // Text lines
    ctx.font = '12px system-ui, sans-serif';
    for (let i = 0; i < lines.length; i++) {
      ctx.fillStyle = i === 0 ? '#facc15' : '#e2e8f0';
      ctx.fillText(lines[i], x + padding, y + padding + 14 + i * 20);
    }
    ctx.restore();
  }
}
