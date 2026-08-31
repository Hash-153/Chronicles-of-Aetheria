/**
 * @file Transform2D.ts
 * @description 2D Hierarchical Transform node supporting local/world matrix caching, parenting, and dirty-flag state.
 */

import { Vector2 } from './Vector2.ts';
import { Matrix3 } from './Matrix3.ts';

export class Transform2D {
  public position: Vector2;
  public scale: Vector2;
  public rotation: number; // In radians

  public localMatrix: Matrix3;
  public worldMatrix: Matrix3;

  private _isDirty = true;
  private _parent: Transform2D | null = null;
  private _children: Transform2D[] = [];

  constructor(x = 0, y = 0, rotation = 0, scaleX = 1, scaleY = 1) {
    this.position = new Vector2(x, y);
    this.scale = new Vector2(scaleX, scaleY);
    this.rotation = rotation;
    this.localMatrix = new Matrix3();
    this.worldMatrix = new Matrix3();
    this.updateMatrices();
  }

  public get parent(): Transform2D | null {
    return this._parent;
  }

  public get children(): readonly Transform2D[] {
    return this._children;
  }

  public setParent(newParent: Transform2D | null): this {
    if (this._parent === newParent) return this;

    if (this._parent) {
      const idx = this._parent._children.indexOf(this);
      if (idx !== -1) {
        this._parent._children.splice(idx, 1);
      }
    }

    this._parent = newParent;
    if (this._parent) {
      this._parent._children.push(this);
    }

    this.markDirty();
    return this;
  }

  public markDirty(): void {
    this._isDirty = true;
    for (let i = 0; i < this._children.length; i++) {
      this._children[i].markDirty();
    }
  }

  public setPosition(x: number, y: number): this {
    this.position.set(x, y);
    this.markDirty();
    return this;
  }

  public translate(dx: number, dy: number): this {
    this.position.x += dx;
    this.position.y += dy;
    this.markDirty();
    return this;
  }

  public setRotation(radians: number): this {
    this.rotation = radians;
    this.markDirty();
    return this;
  }

  public rotate(radians: number): this {
    this.rotation += radians;
    this.markDirty();
    return this;
  }

  public setScale(sx: number, sy: number): this {
    this.scale.set(sx, sy);
    this.markDirty();
    return this;
  }

  public updateMatrices(): void {
    if (!this._isDirty) return;

    // Compute local matrix: T * R * S
    const c = Math.cos(this.rotation);
    const s = Math.sin(this.rotation);
    const sx = this.scale.x;
    const sy = this.scale.y;
    const px = this.position.x;
    const py = this.position.y;

    this.localMatrix.set(
      c * sx, -s * sy, px,
      s * sx,  c * sy, py,
      0,       0,      1
    );

    if (this._parent) {
      this._parent.updateMatrices();
      this.worldMatrix.copy(this._parent.worldMatrix).multiplySelf(this.localMatrix);
    } else {
      this.worldMatrix.copy(this.localMatrix);
    }

    this._isDirty = false;
  }

  public getWorldPosition(out = new Vector2()): Vector2 {
    this.updateMatrices();
    const e = this.worldMatrix.elements;
    return out.set(e[6], e[7]);
  }

  public getWorldRotation(): number {
    this.updateMatrices();
    const e = this.worldMatrix.elements;
    return Math.atan2(e[1], e[0]);
  }

  public getWorldScale(out = new Vector2()): Vector2 {
    this.updateMatrices();
    const e = this.worldMatrix.elements;
    const sx = Math.sqrt(e[0] * e[0] + e[1] * e[1]);
    const sy = Math.sqrt(e[3] * e[3] + e[4] * e[4]);
    return out.set(sx, sy);
  }

  public transformPoint(point: Vector2, out = new Vector2()): Vector2 {
    this.updateMatrices();
    return this.worldMatrix.transformVector2Self(out.copy(point));
  }

  public inverseTransformPoint(point: Vector2, out = new Vector2()): Vector2 {
    this.updateMatrices();
    const inv = this.worldMatrix.clone().invert();
    return inv.transformVector2Self(out.copy(point));
  }
}
