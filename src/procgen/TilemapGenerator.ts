/**
 * @file TilemapGenerator.ts
 * @description Auto-tiler converting binary wall/floor grids into 16-state/47-state connected autotiling bitmasks.
 */

export class TilemapGenerator {
  public static generateAutotileLayer(
    binaryGrid: Uint8Array,
    width: number,
    height: number,
    floorTileId = 0,
    wallBaseTileId = 16
  ): Int32Array {
    const tileLayer = new Int32Array(width * height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        if (binaryGrid[idx] === 0) {
          tileLayer[idx] = floorTileId;
        } else {
          // Compute 4-bit orthogonal neighbor bitmask
          const mask = this._compute4BitMask(binaryGrid, width, height, x, y);
          tileLayer[idx] = wallBaseTileId + mask;
        }
      }
    }

    return tileLayer;
  }

  private static _compute4BitMask(grid: Uint8Array, w: number, h: number, x: number, y: number): number {
    let mask = 0;
    // North (1), East (2), South (4), West (8)
    if (y > 0 && grid[(y - 1) * w + x] === 1) mask |= 1;
    if (x < w - 1 && grid[y * w + (x + 1)] === 1) mask |= 2;
    if (y < h - 1 && grid[(y + 1) * w + x] === 1) mask |= 4;
    if (x > 0 && grid[y * w + (x - 1)] === 1) mask |= 8;
    return mask;
  }
}
