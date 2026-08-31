/**
 * @file UIDialogueBox.ts
 * @description Typewriter dialogue box with character nameplate, text streaming, and branch choices.
 */

import { UINode } from './UINode.ts';
import { Color } from '../core/math/Color.ts';

export interface DialogueChoice {
  text: string;
  nextDialogueId: string;
}

export class UIDialogueBox extends UINode {
  public speakerName = 'Elder Valerius';
  public fullText = '';
  public displayedText = '';
  public typewriterSpeed = 40; // chars per second
  public choices: DialogueChoice[] = [];
  public onChoiceSelected?: (choice: DialogueChoice) => void;

  private _charProgress = 0;
  public isComplete = false;

  constructor() {
    super('UIDialogueBox');
    this.size.set(600, 160);
    this.backgroundColor = new Color(0.08, 0.12, 0.18, 0.95);
    this.borderColor = new Color(0.25, 0.4, 0.6, 1.0);
  }

  public setDialogue(speaker: string, text: string, choices: DialogueChoice[] = []): void {
    this.speakerName = speaker;
    this.fullText = text;
    this.displayedText = '';
    this._charProgress = 0;
    this.isComplete = false;
    this.choices = choices;
    this.isVisible = true;
  }

  public update(dt: number): void {
    if (this.isComplete) return;

    this._charProgress += dt * this.typewriterSpeed;
    const charIndex = Math.min(this.fullText.length, Math.floor(this._charProgress));
    this.displayedText = this.fullText.substring(0, charIndex);

    if (charIndex >= this.fullText.length) {
      this.isComplete = true;
    }
  }

  public completeImmediately(): void {
    this.displayedText = this.fullText;
    this.isComplete = true;
  }

  protected override onRenderContent(ctx: CanvasRenderingContext2D): void {
    // 1. Speaker Nameplate
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 16px Segoe UI, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(this.speakerName, this.computedX + 20, this.computedY + 28);

    // 2. Dialogue Text
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '14px Segoe UI, sans-serif';
    this._wrapText(ctx, this.displayedText, this.computedX + 20, this.computedY + 54, this.computedWidth - 40, 20);

    // 3. Choices
    if (this.isComplete && this.choices.length > 0) {
      ctx.fillStyle = '#facc15';
      ctx.font = 'italic 13px Segoe UI, sans-serif';
      let choiceY = this.computedY + this.computedHeight - (this.choices.length * 22 + 10);
      for (let i = 0; i < this.choices.length; i++) {
        ctx.fillText(`[${i + 1}] ${this.choices[i].text}`, this.computedX + 30, choiceY);
        choiceY += 22;
      }
    }
  }

  private _wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number): void {
    const words = text.split(' ');
    let line = '';
    let currY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, x, currY);
        line = words[n] + ' ';
        currY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currY);
  }
}
