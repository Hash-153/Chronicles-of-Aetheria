/**
 * @file UIInventoryGrid.ts
 * @description RPG inventory grid slot viewer with hover tooltips, rarity borders, and item drag interaction.
 */

import { UINode } from './UINode.ts';
import { Color } from '../core/math/Color.ts';
import { type GeneratedItem, ItemRarity } from '../procgen/LootTableGenerator.ts';

export class UIInventoryGrid extends UINode {
  public columns = 6;
  public rows = 4;
  public slotSize = 48;
  public slotGap = 6;
  public items: (GeneratedItem | null)[] = [];

  public hoveredSlot = -1;
  public selectedSlot = -1;

  constructor(columns = 6, rows = 4) {
    super('UIInventoryGrid');
    this.columns = columns;
    this.rows = rows;
    this.items = new Array(columns * rows).fill(null);

    const totalW = columns * this.slotSize + (columns - 1) * this.slotGap + 16;
    const totalH = rows * this.slotSize + (rows - 1) * this.slotGap + 16;
    this.size.set(totalW, totalH);
  }

  public setItem(slotIndex: number, item: GeneratedItem | null): void {
    if (slotIndex >= 0 && slotIndex < this.items.length) {
      this.items[slotIndex] = item;
    }
  }

  protected override onRenderContent(ctx: CanvasRenderingContext2D): void {
    const startX = this.computedX + 8;
    const startY = this.computedY + 8;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        const slotIdx = r * this.columns + c;
        const sx = startX + c * (this.slotSize + this.slotGap);
        const sy = startY + r * (this.slotSize + this.slotGap);

        // Draw Slot background
        ctx.fillStyle = slotIdx === this.selectedSlot ? 'rgba(56, 189, 248, 0.3)' : 'rgba(15, 23, 42, 0.9)';
        ctx.fillRect(sx, sy, this.slotSize, this.slotSize);

        // Slot Border
        ctx.strokeStyle = slotIdx === this.hoveredSlot ? '#38bdf8' : 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.strokeRect(sx, sy, this.slotSize, this.slotSize);

        // Draw Item in Slot
        const item = this.items[slotIdx];
        if (item) {
          this._renderItemIcon(ctx, item, sx, sy);
        }
      }
    }
  }

  private _renderItemIcon(ctx: CanvasRenderingContext2D, item: GeneratedItem, x: number, y: number): void {
    // Rarity border indicator
    let rarityColor = '#94a3b8'; // Common
    if (item.rarity === ItemRarity.Magic) rarityColor = '#38bdf8';
    else if (item.rarity === ItemRarity.Rare) rarityColor = '#facc15';
    else if (item.rarity === ItemRarity.Legendary) rarityColor = '#fb923c';

    ctx.strokeStyle = rarityColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 2, y + 2, this.slotSize - 4, this.slotSize - 4);

    // Placeholder icon initial
    ctx.fillStyle = rarityColor;
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(item.name[0], x + this.slotSize * 0.5, y + this.slotSize * 0.5);
  }
}
