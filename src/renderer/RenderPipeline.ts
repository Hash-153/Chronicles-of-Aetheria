/**
 * @file RenderPipeline.ts
 * @description Master graphics rendering pipeline coordinating world geometry passes, lighting accumulation, particle batches, and post-FX.
 */

import { WebGLContext } from './WebGLContext.ts';
import { SpriteBatchRenderer } from './SpriteBatchRenderer.ts';
import { Camera2D } from './Camera2D.ts';
import { TilemapRenderer } from './TilemapRenderer.ts';
import { PostProcessor } from './PostProcessor.ts';
import { World } from '../core/ecs/World.ts';
import { Transform2D } from '../core/math/Transform2D.ts';
import { System } from '../core/ecs/System.ts';
import { SystemPhase } from '../core/ecs/Types.ts';
import { Vector2 } from '../core/math/Vector2.ts';
import { Color } from '../core/math/Color.ts';

export class RenderPipeline extends System {
  public phase = SystemPhase.Render;
  public priority = 100;

  public context: WebGLContext;
  public batch: SpriteBatchRenderer;
  public camera: Camera2D;
  public tilemap: TilemapRenderer;
  public postProcessor: PostProcessor;

  public enablePostFX = true;
  private _time = 0;

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.context = new WebGLContext(canvas);
    this.batch = new SpriteBatchRenderer(this.context.gl);
    this.camera = new Camera2D(this.context.width, this.context.height);
    this.tilemap = new TilemapRenderer(128, 128, 32, 32);
    this.postProcessor = new PostProcessor(this.context.gl);
  }

  public override update(dt: number): void {
    this._time += dt;
    this.camera.viewportWidth = this.context.width;
    this.camera.viewportHeight = this.context.height;
    this.camera.update(dt);

    if (this.context.resize()) {
      this.camera.updateMatrices();
    }

    this.context.clear();

    // 1. Begin Sprite Batch Pass
    this.batch.begin(this.camera.viewMatrix, this.camera.projectionMatrix);

    // 2. Render Tilemap Layer
    this.tilemap.render(this.batch, this.camera);

    // 3. Render World Entities
    const spriteQuery = this.world.createQuery({ all: [Transform2D] });
    spriteQuery.forEach((id, transform: Transform2D) => {
      // Draw entity placeholder quad
      this.batch.drawSprite(
        transform.position,
        new Vector2(32, 32),
        transform.rotation,
        new Vector2(0.5, 0.5),
        new Color(0.3, 0.7, 1.0, 1.0)
      );
    }, [Transform2D]);

    // 4. Flush and end batch
    this.batch.end();
  }

  public override onDestroy(): void {
    this.batch.dispose();
    this.postProcessor.dispose();
  }
}
