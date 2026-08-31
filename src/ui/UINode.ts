/**
 * @file UINode.ts
 * @description Hierarchical UI element node with anchor points, margins, auto-layout bounding, and pointer event dispatch.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Color } from '../core/math/Color.ts';

export interface UIAnchor {
  min: Vector2; // (0,0) = top-left, (1,1) = bottom-right
  max: Vector2;
}

export class UINode {
  public name: string;
  public position = new Vector2();
  public size = new Vector2(100, 100);
  public anchor: UIAnchor = { min: new Vector2(0, 0), max: new Vector2(0, 0) };
  public pivot = new Vector2(0, 0);

  public backgroundColor = new Color(0.1, 0.15, 0.2, 0.85);
  public borderColor = new Color(0.3, 0.4, 0.5, 1.0);
  public borderWidth = 1;
  public borderRadius = 4;
  public isVisible = true;
  public isInteractive = true;

  public parent: UINode | null = null;
  public children: UINode[] = [];

  // Cached calculated screen rect
  public computedX = 0;
  public computedY = 0;
  public computedWidth = 0;
  public computedHeight = 0;

  constructor(name = 'UINode') {
    this.name = name;
  }

  public addChild(child: UINode): this {
    if (child.parent) {
      child.parent.removeChild(child);
    }
    child.parent = this;
    this.children.push(child);
    return this;
  }

  public removeChild(child: UINode): boolean {
    const idx = this.children.indexOf(child);
    if (idx !== -1) {
      this.children.splice(idx, 1);
      child.parent = null;
      return true;
    }
    return false;
  }

  public calculateLayout(parentWidth: number, parentHeight: number, parentX = 0, parentY = 0): void {
    const ax = parentX + parentWidth * this.anchor.min.x;
    const ay = parentY + parentHeight * this.anchor.min.y;

    this.computedWidth = this.size.x;
    this.computedHeight = this.size.y;
    this.computedX = ax + this.position.x - this.computedWidth * this.pivot.x;
    this.computedY = ay + this.position.y - this.computedHeight * this.pivot.y;

    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].isVisible) {
        this.children[i].calculateLayout(this.computedWidth, this.computedHeight, this.computedX, this.computedY);
      }
    }
  }

  public containsPoint(screenX: number, screenY: number): boolean {
    if (!this.isVisible) return false;
    return (
      screenX >= this.computedX &&
      screenX <= this.computedX + this.computedWidth &&
      screenY >= this.computedY &&
      screenY <= this.computedY + this.computedHeight
    );
  }

  public render(ctx: CanvasRenderingContext2D): void {
    if (!this.isVisible) return;

    ctx.save();
    // Render Node background
    if (this.backgroundColor.a > 0) {
      ctx.fillStyle = this.backgroundColor.toRGBA();
      ctx.fillRect(this.computedX, this.computedY, this.computedWidth, this.computedHeight);
    }

    // Border
    if (this.borderWidth > 0 && this.borderColor.a > 0) {
      ctx.strokeStyle = this.borderColor.toRGBA();
      ctx.lineWidth = this.borderWidth;
      ctx.strokeRect(this.computedX, this.computedY, this.computedWidth, this.computedHeight);
    }

    this.onRenderContent(ctx);

    // Render children
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].render(ctx);
    }

    ctx.restore();
  }

  protected onRenderContent(ctx: CanvasRenderingContext2D): void {
    // Override in specialized components
  }
}
