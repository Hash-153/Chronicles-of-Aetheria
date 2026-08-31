/**
 * @file UIWindow.ts
 * @description Draggable, closeable, and modal window container component with titlebar and content docking.
 */

import { UINode } from './UINode.ts';
import { Vector2 } from '../core/math/Vector2.ts';
import { Color } from '../core/math/Color.ts';

export class UIWindow extends UINode {
  public title: string;
  public isDragging = false;
  public dragOffset = new Vector2();
  public headerHeight = 28;
  public backgroundColor = new Color(0.1, 0.12, 0.16, 0.95);
  public headerColor = new Color(0.18, 0.22, 0.28, 1.0);

  constructor(title: string, width = 320, height = 240) {
    super();
    this.title = title;
    this.size.set(width, height);
  }

  public override render(ctx: CanvasRenderingContext2D, parentPos = new Vector2(0, 0)): void {
    if (!this.isVisible) return;
    const globalX = parentPos.x + this.position.x;
    const globalY = parentPos.y + this.position.y;

    ctx.save();
    // Window Body
    ctx.fillStyle = this.backgroundColor.toRgbaString();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.fillRect(globalX, globalY, this.size.x, this.size.y);
    ctx.strokeRect(globalX, globalY, this.size.x, this.size.y);

    // Header Bar
    ctx.fillStyle = this.headerColor.toRgbaString();
    ctx.fillRect(globalX, globalY, this.size.x, this.headerHeight);

    // Title text
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.fillText(this.title, globalX + 10, globalY + 19);

    ctx.restore();

    // Render child controls
    super.render(ctx, new Vector2(globalX, globalY + this.headerHeight));
  }
}
