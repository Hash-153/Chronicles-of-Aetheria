/**
 * @file UIMinimap.ts
 * @description Real-time radar/minimap rendering terrain bounds, player coordinates, enemy blips, and objectives.
 */

import { UINode } from './UINode.ts';
import { Vector2 } from '../core/math/Vector2.ts';
import { Color } from '../core/math/Color.ts';

export interface MinimapBlip {
  position: Vector2;
  color: string;
  size: number;
}

export class UIMinimap extends UINode {
  public mapWidth = 2000;
  public mapHeight = 2000;
  public playerPos = new Vector2();
  public blips: MinimapBlip[] = [];

  constructor() {
    super('UIMinimap');
    this.size.set(160, 160);
    this.backgroundColor = new Color(0.05, 0.08, 0.12, 0.85);
    this.borderColor = new Color(0.2, 0.4, 0.6, 1.0);
    this.borderWidth = 2;
  }

  protected override onRenderContent(ctx: CanvasRenderingContext2D): void {
    const scaleX = this.computedWidth / this.mapWidth;
    const scaleY = this.computedHeight / this.mapHeight;

    // 1. Draw Blips (Enemies, NPCs, Chests)
    for (let i = 0; i < this.blips.length; i++) {
      const blip = this.blips[i];
      const bx = this.computedX + (blip.position.x * scaleX);
      const by = this.computedY + (blip.position.y * scaleY);

      if (
        bx >= this.computedX && bx <= this.computedX + this.computedWidth &&
        by >= this.computedY && by <= this.computedY + this.computedHeight
      ) {
        ctx.fillStyle = blip.color;
        ctx.beginPath();
        ctx.arc(bx, by, blip.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 2. Draw Player Dot
    const px = this.computedX + (this.playerPos.x * scaleX);
    const py = this.computedY + (this.playerPos.y * scaleY);

    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}
