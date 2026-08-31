/**
 * @file UIButton.ts
 * @description Interactive UI Button with hover, pressed, and disabled visual states.
 */

import { UINode } from './UINode.ts';
import { Color } from '../core/math/Color.ts';
import { SoundFXGenerator } from '../audio/SoundFXGenerator.ts';

export class UIButton extends UINode {
  public text: string;
  public textColor = new Color(1, 1, 1, 1);
  public font = 'bold 14px Segoe UI, sans-serif';

  public normalColor = new Color(0.18, 0.24, 0.35, 0.9);
  public hoverColor = new Color(0.25, 0.35, 0.5, 0.95);
  public pressedColor = new Color(0.12, 0.18, 0.28, 1.0);

  public isHovered = false;
  public isPressed = false;
  public isEnabled = true;

  public onClick?: () => void;

  constructor(text = 'Button', onClick?: () => void) {
    super('UIButton');
    this.text = text;
    this.onClick = onClick;
    this.size.set(120, 36);
  }

  public onPointerEnter(): void {
    if (!this.isEnabled) return;
    this.isHovered = true;
  }

  public onPointerLeave(): void {
    this.isHovered = false;
    this.isPressed = false;
  }

  public onPointerDown(): void {
    if (!this.isEnabled) return;
    this.isPressed = true;
  }

  public onPointerUp(): void {
    if (!this.isEnabled) return;
    if (this.isPressed) {
      this.isPressed = false;
      SoundFXGenerator.playCoinPickup();
      if (this.onClick) {
        this.onClick();
      }
    }
  }

  protected override onRenderContent(ctx: CanvasRenderingContext2D): void {
    // Determine dynamic state color
    let bg = this.normalColor;
    if (this.isPressed) bg = this.pressedColor;
    else if (this.isHovered) bg = this.hoverColor;

    ctx.fillStyle = bg.toRGBA();
    ctx.fillRect(this.computedX, this.computedY, this.computedWidth, this.computedHeight);

    // Render Text
    ctx.font = this.font;
    ctx.fillStyle = this.textColor.toRGBA();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      this.text,
      this.computedX + this.computedWidth * 0.5,
      this.computedY + this.computedHeight * 0.5
    );
  }
}
