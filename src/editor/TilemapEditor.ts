/**
 * @file TilemapEditor.ts
 * @description In-engine tile painting, eraser, and bucket fill tools for editing live levels.
 */

import { TilemapRenderer } from '../renderer/TilemapRenderer.ts';

export class TilemapEditor {
  private _tilemap: TilemapRenderer;

  constructor(tilemap: TilemapRenderer) {
    this._tilemap = tilemap;
  }

  public paintTile(layerIndex: number, tileX: number, tileY: number, tileId: number, brushSize = 1): void {
    const half = Math.floor(brushSize / 2);
    for (let dy = -half; dy <= half; dy++) {
      for (let dx = -half; dx <= half; dx++) {
        this._tilemap.setTile(layerIndex, tileX + dx, tileY + dy, tileId);
      }
    }
  }

  public floodFill(layerIndex: number, startX: number, startY: number, newTileId: number): void {
    const targetTile = this._tilemap.getTile(layerIndex, startX, startY);
    if (targetTile === newTileId || targetTile === -1) return;

    const queue: [number, number][] = [[startX, startY]];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const [cx, cy] = queue.shift()!;
      const key = `${cx}:${cy}`;
      if (visited.has(key)) continue;
      visited.add(key);

      if (this._tilemap.getTile(layerIndex, cx, cy) === targetTile) {
        this._tilemap.setTile(layerIndex, cx, cy, newTileId);

        if (cx > 0) queue.push([cx - 1, cy]);
        if (cx < this._tilemap.width - 1) queue.push([cx + 1, cy]);
        if (cy > 0) queue.push([cx, cy - 1]);
        if (cy < this._tilemap.height - 1) queue.push([cx, cy + 1]);
      }
    }
  }
}
