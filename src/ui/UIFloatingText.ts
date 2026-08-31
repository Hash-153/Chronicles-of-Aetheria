/**
 * @file UIFloatingText.ts
 * @description World/Screen floating damage indicators and status popups with bounce easing and fadeouts.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Camera2D } from '../renderer/Camera2D.ts';

export interface FloatingNumber {
  text: string;
  worldPos: Vector2;
  velocity: Vector2;
  color: string;
  scale: number;
  alpha: number;
  lifetime: number;
  age: number;
  isCrit: boolean;
}

export class UIFloatingTextManager {
  private _items: FloatingNumber[] = [];

  public spawnDamage(worldPos: Vector2, amount: number, color = '#f87171', isCrit = false): void {
    this._items.push({
      text: `${Math.round(amount)}${isCrit ? '!' : ''}`,
      worldPos: worldPos.clone().addSelf(new Vector2((Math.random() * 2 - 1) * 8, 0)),
      velocity: new Vector2((Math.random() * 2 - 1) * 20, isCrit ? -80 : -50),
      color,
      scale: isCrit ? 1.6 : 1.0,
      alpha: 1.0,
      lifetime: 0.9,
      age: 0,
      isCrit,
    });
  }

  public update(dt: number): void {
    for (let i = this._items.length - 1; i >= 0; i--) {
      const item = this._items[i];
      item.age += dt;
      if (item.age >= item.lifetime) {
        this._items.splice(i, 1);
        continue;
      }

      // Physics integrate
      item.worldPos.addSelf(item.velocity.scale(dt));
      item.velocity.y += 60 * dt; // gravity arc

      // Fadeout
      item.alpha = Math.max(0, 1 - item.age / item.lifetime);
    }
  }

  public render(ctx: CanvasRenderingContext2D, camera: Camera2D): void {
    for (let i = 0; i < this._items.length; i++) {
      const item = this._items[i];
      const screenPos = camera.worldToScreen(item.worldPos);

      ctx.save();
      ctx.globalAlpha = item.alpha;
      ctx.font = `bold ${Math.round(16 * item.scale)}px Segoe UI, sans-serif`;
      ctx.fillStyle = item.color;
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.textAlign = 'center';

      ctx.strokeText(item.text, screenPos.x, screenPos.y);
      ctx.fillText(item.text, screenPos.x, screenPos.y);
      ctx.restore();
    }
  }
}
