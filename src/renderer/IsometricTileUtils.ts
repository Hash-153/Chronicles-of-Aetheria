/**
 * @file IsometricTileUtils.ts
 * @description Coordinate transformation mathematics for isometric diamond, staggered, and slide maps.
 */

import { Vector2 } from '../core/math/Vector2.ts';

export class IsometricTileUtils {
  public static gridToScreen(gridX: number, gridY: number, tileWidth = 64, tileHeight = 32): Vector2 {
    const screenX = (gridX - gridY) * (tileWidth * 0.5);
    const screenY = (gridX + gridY) * (tileHeight * 0.5);
    return new Vector2(screenX, screenY);
  }

  public static screenToGrid(screenX: number, screenY: number, tileWidth = 64, tileHeight = 32): Vector2 {
    const halfW = tileWidth * 0.5;
    const halfH = tileHeight * 0.5;
    const gridX = Math.floor((screenX / halfW + screenY / halfH) * 0.5);
    const gridY = Math.floor((screenY / halfH - screenX / halfW) * 0.5);
    return new Vector2(gridX, gridY);
  }

  public static calculateDepthSort(gridX: number, gridY: number, gridZ = 0): number {
    return (gridX + gridY) * 1000 + gridZ;
  }
}
