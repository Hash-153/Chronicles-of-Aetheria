/**
 * @file TilemapRenderer.ts
 * @description High-speed chunked tilemap renderer supporting Orthogonal and Isometric projections with camera frustum culling.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Color } from '../core/math/Color.ts';
import { SpriteBatchRenderer } from './SpriteBatchRenderer.ts';
import { Camera2D } from './Camera2D.ts';
import { Texture2D } from './Texture2D.ts';

export const TilemapOrientation = {
  Orthogonal: 0,
  Isometric: 1,
} as const;
export type TilemapOrientation = typeof TilemapOrientation[keyof typeof TilemapOrientation];

export interface TilemapLayer {
  name: string;
  data: Int32Array; // Tile IDs (-1 = empty)
  visible: boolean;
  opacity: number;
}

export class TilemapRenderer {
  public width: number; // in tiles
  public height: number; // in tiles
  public tileWidth: number;
  public tileHeight: number;
  public orientation: TilemapOrientation;
  public layers: TilemapLayer[] = [];
  public tilesetTexture?: Texture2D;
  public tilesetColumns = 16;
  public tilesetRows = 16;

  constructor(
    width = 100,
    height = 100,
    tileWidth = 32,
    tileHeight = 32,
    orientation = TilemapOrientation.Orthogonal
  ) {
    this.width = width;
    this.height = height;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.orientation = orientation;
  }

  public addLayer(name: string): TilemapLayer {
    const layer: TilemapLayer = {
      name,
      data: new Int32Array(this.width * this.height).fill(-1),
      visible: true,
      opacity: 1.0,
    };
    this.layers.push(layer);
    return layer;
  }

  public setTile(layerIndex: number, x: number, y: number, tileId: number): void {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
    const layer = this.layers[layerIndex];
    if (layer) {
      layer.data[y * this.width + x] = tileId;
    }
  }

  public getTile(layerIndex: number, x: number, y: number): number {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return -1;
    const layer = this.layers[layerIndex];
    return layer ? layer.data[y * this.width + x] : -1;
  }

  public render(batch: SpriteBatchRenderer, camera: Camera2D): void {
    const visibleBounds = camera.getVisibleAABB();

    // Determine tile culling range
    let minTileX = 0;
    let maxTileX = this.width - 1;
    let minTileY = 0;
    let maxTileY = this.height - 1;

    if (this.orientation === TilemapOrientation.Orthogonal) {
      minTileX = Math.max(0, Math.floor(visibleBounds.min.x / this.tileWidth));
      maxTileX = Math.min(this.width - 1, Math.ceil(visibleBounds.max.x / this.tileWidth));
      minTileY = Math.max(0, Math.floor(visibleBounds.min.y / this.tileHeight));
      maxTileY = Math.min(this.height - 1, Math.ceil(visibleBounds.max.y / this.tileHeight));
    }

    const tileSize = new Vector2(this.tileWidth, this.tileHeight);
    const origin = new Vector2(0, 0);

    for (let l = 0; l < this.layers.length; l++) {
      const layer = this.layers[l];
      if (!layer.visible) continue;

      const layerColor = new Color(1, 1, 1, layer.opacity);

      for (let y = minTileY; y <= maxTileY; y++) {
        for (let x = minTileX; x <= maxTileX; x++) {
          const tileId = layer.data[y * this.width + x];
          if (tileId < 0) continue;

          let worldPos: Vector2;
          if (this.orientation === TilemapOrientation.Orthogonal) {
            worldPos = new Vector2(x * this.tileWidth, y * this.tileHeight);
          } else {
            // Isometric screen projection
            worldPos = new Vector2(
              (x - y) * (this.tileWidth * 0.5),
              (x + y) * (this.tileHeight * 0.5)
            );
          }

          // Compute UVs from tile ID
          const tu = (tileId % this.tilesetColumns) / this.tilesetColumns;
          const tv = Math.floor(tileId / this.tilesetColumns) / this.tilesetRows;
          const uStep = 1.0 / this.tilesetColumns;
          const vStep = 1.0 / this.tilesetRows;

          batch.drawSprite(
            worldPos,
            tileSize,
            0,
            origin,
            layerColor,
            [tu, tv, tu + uStep, tv + vStep],
            this.tilesetTexture
          );
        }
      }
    }
  }
}
