/**
 * @file Camera2D.ts
 * @description 2D Game Camera with target tracking, deadzone smoothing, zoom, screen shake trauma, and matrix projection.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Matrix4 } from '../core/math/Matrix4.ts';
import { AABB } from '../core/math/AABB.ts';
import { MathUtils } from '../core/math/MathUtils.ts';

export class Camera2D {
  public position: Vector2;
  public target: Vector2;
  public zoom: number;
  public rotation: number;
  public viewportWidth: number;
  public viewportHeight: number;

  // Smoothing and limits
  public smoothSpeed = 8.0;
  public minZoom = 0.25;
  public maxZoom = 4.0;
  public bounds?: AABB;

  // Screen shake trauma (trauma^2 decay model)
  public trauma = 0;
  public maxShakeOffset = 24.0;
  public maxShakeAngle = 0.1; // radians
  private _shakeOffset = new Vector2();
  private _shakeRotation = 0;

  // Matrices
  public viewMatrix: Matrix4;
  public projectionMatrix: Matrix4;

  constructor(viewportWidth = 1920, viewportHeight = 1080) {
    this.position = new Vector2(0, 0);
    this.target = new Vector2(0, 0);
    this.zoom = 1.0;
    this.rotation = 0;
    this.viewportWidth = viewportWidth;
    this.viewportHeight = viewportHeight;

    this.viewMatrix = new Matrix4();
    this.projectionMatrix = new Matrix4();
    this.updateMatrices();
  }

  public addTrauma(amount: number): void {
    this.trauma = MathUtils.clamp01(this.trauma + amount);
  }

  public update(dt: number): void {
    // 1. Smoothly interpolate position towards target
    this.position.lerpSelf(this.target, 1 - Math.exp(-this.smoothSpeed * dt));

    // 2. Clamp to world bounds
    if (this.bounds) {
      const halfW = (this.viewportWidth * 0.5) / this.zoom;
      const halfH = (this.viewportHeight * 0.5) / this.zoom;
      this.position.x = MathUtils.clamp(this.position.x, this.bounds.min.x + halfW, this.bounds.max.x - halfW);
      this.position.y = MathUtils.clamp(this.position.y, this.bounds.min.y + halfH, this.bounds.max.y - halfH);
    }

    // 3. Process screen shake trauma
    if (this.trauma > 0) {
      const shakePower = this.trauma * this.trauma;
      const angle = (Math.random() * 2 - 1) * this.maxShakeAngle * shakePower;
      const offsetX = (Math.random() * 2 - 1) * this.maxShakeOffset * shakePower;
      const offsetY = (Math.random() * 2 - 1) * this.maxShakeOffset * shakePower;

      this._shakeOffset.set(offsetX, offsetY);
      this._shakeRotation = angle;

      this.trauma = Math.max(0, this.trauma - dt * 1.5);
    } else {
      this._shakeOffset.set(0, 0);
      this._shakeRotation = 0;
    }

    this.updateMatrices();
  }

  public updateMatrices(): void {
    const hw = this.viewportWidth * 0.5;
    const hh = this.viewportHeight * 0.5;

    // Orthographic projection centered at origin
    this.projectionMatrix.makeOrthographic(-hw, hw, -hh, hh, -1000, 1000);

    // View matrix: Scale(zoom) * Rot(-rot) * Trans(-pos)
    const effectivePos = this.position.add(this._shakeOffset);
    const effectiveRot = this.rotation + this._shakeRotation;

    this.viewMatrix.identity();

    const t = new Matrix4().makeTranslation(-effectivePos.x, -effectivePos.y, 0);
    const s = new Matrix4().makeScale(this.zoom, this.zoom, 1);

    // View = Scale * Trans
    this.viewMatrix.copy(s).multiplySelf(t);
  }

  public screenToWorld(screenPos: Vector2): Vector2 {
    const hw = this.viewportWidth * 0.5;
    const hh = this.viewportHeight * 0.5;

    const centeredX = (screenPos.x - hw) / this.zoom;
    const centeredY = (screenPos.y - hh) / this.zoom;

    return new Vector2(
      this.position.x + centeredX,
      this.position.y + centeredY
    );
  }

  public worldToScreen(worldPos: Vector2): Vector2 {
    const hw = this.viewportWidth * 0.5;
    const hh = this.viewportHeight * 0.5;

    const relX = (worldPos.x - this.position.x) * this.zoom;
    const relY = (worldPos.y - this.position.y) * this.zoom;

    return new Vector2(
      hw + relX,
      hh + relY
    );
  }

  public getVisibleAABB(): AABB {
    const hw = (this.viewportWidth * 0.5) / this.zoom;
    const hh = (this.viewportHeight * 0.5) / this.zoom;
    return new AABB(
      this.position.x - hw,
      this.position.y - hh,
      this.position.x + hw,
      this.position.y + hh
    );
  }
}
