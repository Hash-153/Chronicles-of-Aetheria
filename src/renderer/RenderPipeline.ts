/**
 * @file RenderPipeline.ts
 * @description Master graphics rendering pipeline coordinating world geometry passes, lighting accumulation, particle batches, and post-FX.
 */

import { WebGLContext } from './WebGLContext.ts';
import { SpriteBatchRenderer } from './SpriteBatchRenderer.ts';
import { Camera2D } from './Camera2D.ts';
import { TilemapRenderer } from './TilemapRenderer.ts';
import { PostProcessor } from './PostProcessor.ts';
import { Canvas2DFallback } from './Canvas2DFallback.ts';
import { World } from '../core/ecs/World.ts';
import { Transform2D } from '../core/math/Transform2D.ts';
import { System } from '../core/ecs/System.ts';
import { SystemPhase } from '../core/ecs/Types.ts';
import { Vector2 } from '../core/math/Vector2.ts';
import { Color } from '../core/math/Color.ts';
import { ParticleEmitter } from '../particles/ParticleEmitter.ts';
import { Light2D } from './Lighting2D.ts';
import { Attributes } from '../gameplay/Attributes.ts';
import { PlayerInput } from '../gameplay/PlayerController.ts';
import { EnemyAI } from '../gameplay/EnemyAIController.ts';
import { Projectile } from '../gameplay/ProjectileSystem.ts';
import { LootDrop } from '../gameplay/LootDropSystem.ts';

export class RenderPipeline extends System {
  public phase = SystemPhase.Render;
  public priority = 100;

  public canvas: HTMLCanvasElement;
  public camera: Camera2D;
  public tilemap: TilemapRenderer;
  public fallback2D: Canvas2DFallback;

  public batch?: SpriteBatchRenderer;
  public context?: WebGLContext;
  public postProcessor?: PostProcessor;
  public isWebGL = false;

  private _time = 0;

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.fallback2D = new Canvas2DFallback(canvas);
    this.camera = new Camera2D(canvas.width || 800, canvas.height || 600);
    this.tilemap = new TilemapRenderer(80, 80, 32, 32);

    try {
      this.context = new WebGLContext(canvas);
      this.batch = new SpriteBatchRenderer(this.context.gl);
      this.postProcessor = new PostProcessor(this.context.gl);
      this.isWebGL = true;
    } catch (e) {
      console.warn('WebGL2 hardware context unavailable, using optimized Canvas2D rendering pipeline.', e);
      this.isWebGL = false;
    }
  }

  public override update(dt: number): void {
    this._time += dt;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = Math.floor(window.innerWidth * dpr);
    const displayHeight = Math.floor(window.innerHeight * dpr);

    if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
      this.canvas.width = displayWidth;
      this.canvas.height = displayHeight;
    }

    this.camera.viewportWidth = this.canvas.width;
    this.camera.viewportHeight = this.canvas.height;
    this.camera.update(dt);

    // Canvas 2D World Render Pass
    const ctx = this.fallback2D.ctx;
    this.fallback2D.resize();
    this.fallback2D.clear('#0b0e14');

    this.fallback2D.beginCamera(this.camera);

    // 1. Draw Procedural Dungeon Tilemap
    this._renderTilemap2D(ctx);

    // 2. Draw Torches & Dynamic Lighting Auras
    this._renderLights2D(ctx);

    // 3. Draw Loot Drops
    this._renderLoot2D(ctx);

    // 4. Draw Monsters
    this._renderEnemies2D(ctx);

    // 5. Draw Player Character
    this._renderPlayer2D(ctx);

    // 6. Draw Projectiles
    this._renderProjectiles2D(ctx);

    // 7. Draw Particle Emitters
    this._renderParticles2D(ctx);

    this.fallback2D.endCamera();
  }

  private _renderTilemap2D(ctx: CanvasRenderingContext2D): void {
    const layer = this.tilemap.getLayer(0);
    if (!layer) return;

    for (let y = 0; y < layer.height; y++) {
      for (let x = 0; x < layer.width; x++) {
        const tile = layer.data[y * layer.width + x];
        const wx = x * 32;
        const wy = y * 32;

        if (tile === 1 || tile === 16) {
          // Wall tile
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(wx, wy, 32, 32);
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 1;
          ctx.strokeRect(wx, wy, 32, 32);

          ctx.fillStyle = '#0f172a';
          ctx.fillRect(wx + 4, wy + 4, 24, 24);
        } else if (tile === 0) {
          // Floor tile
          ctx.fillStyle = ((x + y) % 2 === 0) ? '#161e2e' : '#1a2234';
          ctx.fillRect(wx, wy, 32, 32);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
          ctx.strokeRect(wx, wy, 32, 32);
        }
      }
    }
  }

  private _renderLights2D(ctx: CanvasRenderingContext2D): void {
    const query = this.world.createQuery({ all: [Transform2D, Light2D] });
    query.forEach((id, transform: Transform2D, light: Light2D) => {
      const radius = light.flickering ? light.radius + Math.sin(this._time * 15) * 6 : light.radius;
      const grad = ctx.createRadialGradient(
        transform.position.x, transform.position.y, 4,
        transform.position.x, transform.position.y, radius
      );
      grad.addColorStop(0, `rgba(255, 180, 80, ${0.4 * light.intensity})`);
      grad.addColorStop(0.5, `rgba(255, 100, 30, ${0.15 * light.intensity})`);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(transform.position.x, transform.position.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }, [Transform2D, Light2D]);
  }

  private _renderPlayer2D(ctx: CanvasRenderingContext2D): void {
    const query = this.world.createQuery({ all: [Transform2D, PlayerInput, Attributes] });
    query.forEach((id, transform: Transform2D, input: PlayerInput, attrs: Attributes) => {
      const px = transform.position.x;
      const py = transform.position.y;

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(transform.rotation);

      // Hero Body
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fill();

      // Armor Outline
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Weapon Direction Indicator
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(10, -3, 14, 6);

      ctx.restore();

      // Health Bar above player head
      const hpPct = attrs.currentHealth / attrs.maxHealth;
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(px - 20, py - 28, 40, 5);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(px - 20, py - 28, 40 * hpPct, 5);
    }, [Transform2D, PlayerInput, Attributes]);
  }

  private _renderEnemies2D(ctx: CanvasRenderingContext2D): void {
    const query = this.world.createQuery({ all: [Transform2D, EnemyAI, Attributes] });
    query.forEach((id, transform: Transform2D, ai: EnemyAI, attrs: Attributes) => {
      const ex = transform.position.x;
      const ey = transform.position.y;

      ctx.save();
      ctx.translate(ex, ey);
      ctx.rotate(transform.rotation);

      // Monster Demon Body
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Horns
      ctx.fillStyle = '#450a0a';
      ctx.beginPath();
      ctx.moveTo(-6, -12);
      ctx.lineTo(-12, -22);
      ctx.lineTo(-2, -14);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(6, -12);
      ctx.lineTo(12, -22);
      ctx.lineTo(2, -14);
      ctx.fill();

      // Glowing Eyes
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(4, -5, 3, 3);
      ctx.fillRect(4, 2, 3, 3);

      ctx.restore();

      // Enemy HP Bar
      const hpPct = attrs.currentHealth / attrs.maxHealth;
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(ex - 18, ey - 26, 36, 4);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(ex - 18, ey - 26, 36 * hpPct, 4);
    }, [Transform2D, EnemyAI, Attributes]);
  }

  private _renderProjectiles2D(ctx: CanvasRenderingContext2D): void {
    const query = this.world.createQuery({ all: [Transform2D, Projectile] });
    query.forEach((id, transform: Transform2D, proj: Projectile) => {
      ctx.save();
      // Glowing Fireball Core
      const grad = ctx.createRadialGradient(
        transform.position.x, transform.position.y, 2,
        transform.position.x, transform.position.y, proj.hitRadius
      );
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.3, '#f59e0b');
      grad.addColorStop(1, 'rgba(239, 68, 68, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(transform.position.x, transform.position.y, proj.hitRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }, [Transform2D, Projectile]);
  }

  private _renderLoot2D(ctx: CanvasRenderingContext2D): void {
    const query = this.world.createQuery({ all: [Transform2D, LootDrop] });
    query.forEach((id, transform: Transform2D, loot: LootDrop) => {
      const lx = transform.position.x;
      const ly = transform.position.y + Math.sin(this._time * 4) * 3;

      ctx.save();
      // Golden Coin / Relic Diamond
      ctx.fillStyle = '#fbbf24';
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(lx, ly - 8);
      ctx.lineTo(lx + 8, ly);
      ctx.lineTo(lx, ly + 8);
      ctx.lineTo(lx - 8, ly);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }, [Transform2D, LootDrop]);
  }

  private _renderParticles2D(ctx: CanvasRenderingContext2D): void {
    const query = this.world.createQuery({ all: [Transform2D, ParticleEmitter] });
    query.forEach((id, transform: Transform2D, emitter: ParticleEmitter) => {
      for (let i = 0; i < emitter.particles.length; i++) {
        const p = emitter.particles[i];
        if (!p.active) continue;

        ctx.fillStyle = p.color.toRGBA();
        ctx.beginPath();
        ctx.arc(p.position.x, p.position.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }, [Transform2D, ParticleEmitter]);
  }
}
