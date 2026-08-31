/**
 * @file UIManager.ts
 * @description Master UI coordinator handling HTML5 canvas overlay events, pointer bubbling, and tree updates.
 */

import { UINode } from './UINode.ts';
import { UIButton } from './UIButton.ts';
import { UIFloatingTextManager } from './UIFloatingText.ts';
import { Camera2D } from '../renderer/Camera2D.ts';

export class UIManager {
  public root: UINode;
  public floatingText: UIFloatingTextManager;
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  private _hoveredNode: UINode | null = null;
  private _pressedNode: UINode | null = null;

  constructor(containerElement: HTMLElement) {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'ui-canvas';
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'auto';

    containerElement.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')!;

    this.root = new UINode('Root');
    this.floatingText = new UIFloatingTextManager();

    this._setupEventListeners();
    this.resize();
  }

  public resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(this.canvas.clientWidth * dpr);
    this.canvas.height = Math.floor(this.canvas.clientHeight * dpr);
    this.root.size.set(this.canvas.width, this.canvas.height);
  }

  public update(dt: number): void {
    this.floatingText.update(dt);
    this.root.calculateLayout(this.canvas.width, this.canvas.height);
  }

  public render(camera: Camera2D): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Render UI Hierarchy
    this.root.render(this.ctx);

    // 2. Render Floating Damage Numbers
    this.floatingText.render(this.ctx, camera);
  }

  private _setupEventListeners(): void {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);

      const hit = this._hitTest(this.root, x, y);
      if (hit !== this._hoveredNode) {
        if (this._hoveredNode instanceof UIButton) this._hoveredNode.onPointerLeave();
        this._hoveredNode = hit;
        if (this._hoveredNode instanceof UIButton) this._hoveredNode.onPointerEnter();
      }
    });

    this.canvas.addEventListener('mousedown', (e) => {
      if (this._hoveredNode instanceof UIButton) {
        this._pressedNode = this._hoveredNode;
        this._hoveredNode.onPointerDown();
      }
    });

    this.canvas.addEventListener('mouseup', (e) => {
      if (this._pressedNode instanceof UIButton) {
        this._pressedNode.onPointerUp();
        this._pressedNode = null;
      }
    });
  }

  private _hitTest(node: UINode, x: number, y: number): UINode | null {
    if (!node.isVisible || !node.isInteractive) return null;

    // Check children in reverse z-order
    for (let i = node.children.length - 1; i >= 0; i--) {
      const childHit = this._hitTest(node.children[i], x, y);
      if (childHit) return childHit;
    }

    if (node.containsPoint(x, y)) {
      return node;
    }

    return null;
  }
}
