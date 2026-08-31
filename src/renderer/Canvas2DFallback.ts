/**
 * @file Canvas2DFallback.ts
 * @description Pure HTML5 Canvas 2D fallback rendering subsystem when WebGL2 hardware context is unavailable.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Color } from '../core/math/Color.ts';
import { Camera2D } from './Camera2D.ts';

export class Canvas2DFallback {
  public ctx: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;
  public width = 0;
  public height = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas 2D context is unavailable');
    }
    this.ctx = ctx;
    this.resize();
  }

  public resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(this.canvas.clientWidth * dpr);
    this.canvas.height = Math.floor(this.canvas.clientHeight * dpr);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  public clear(color = '#0b0e14'): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  public beginCamera(camera: Camera2D): void {
    this.ctx.save();
    const hw = this.width * 0.5;
    const hh = this.height * 0.5;

    this.ctx.translate(hw, hh);
    this.ctx.scale(camera.zoom, camera.zoom);
    this.ctx.rotate(-camera.rotation);
    this.ctx.translate(-camera.position.x, -camera.position.y);
  }

  public endCamera(): void {
    this.ctx.restore();
  }

  public drawRect(pos: Vector2, size: Vector2, color: Color, rotation = 0): void {
    this.ctx.save();
    this.ctx.translate(pos.x, pos.y);
    this.ctx.rotate(rotation);
    this.ctx.fillStyle = color.toRGBA();
    this.ctx.fillRect(-size.x * 0.5, -size.y * 0.5, size.x, size.y);
    this.ctx.restore();
  }

  public drawCircle(pos: Vector2, radius: number, color: Color): void {
    this.ctx.beginPath();
    this.ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = color.toRGBA();
    this.ctx.fill();
  }
}
