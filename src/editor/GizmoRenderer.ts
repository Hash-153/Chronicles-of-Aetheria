/**
 * @file GizmoRenderer.ts
 * @description Translation, rotation, and scale gizmo overlay renderer for level editing.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Camera2D } from '../renderer/Camera2D.ts';

export class GizmoRenderer {
  public static renderTranslationGizmo(ctx: CanvasRenderingContext2D, worldPos: Vector2, camera: Camera2D): void {
    const screenPos = camera.worldToScreen(worldPos);

    ctx.save();
    ctx.translate(screenPos.x, screenPos.y);

    // X Axis (Red)
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(40, 0);
    ctx.stroke();

    // X Arrow
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(40, -5);
    ctx.lineTo(50, 0);
    ctx.lineTo(40, 5);
    ctx.fill();

    // Y Axis (Green)
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -40);
    ctx.stroke();

    // Y Arrow
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.moveTo(-5, -40);
    ctx.lineTo(0, -50);
    ctx.lineTo(5, -40);
    ctx.fill();

    ctx.restore();
  }
}
