/**
 * @file NormalMapGenerator.ts
 * @description Procedural 2D Normal Map generation using Sobel filtering for dynamic surface bump lighting.
 */

export class NormalMapGenerator {
  public static generateFromHeightmap(heights: Float32Array, width: number, height: number, strength = 2.0): Uint8Array {
    const normalData = new Uint8Array(width * height * 4);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const x0 = Math.max(0, x - 1);
        const x1 = Math.min(width - 1, x + 1);
        const y0 = Math.max(0, y - 1);
        const y1 = Math.min(height - 1, y + 1);

        // Sobel filter gradients
        const dx = (heights[y * width + x1] - heights[y * width + x0]) * strength;
        const dy = (heights[y1 * width + x] - heights[y0 * width + x]) * strength;
        const dz = 1.0;

        const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const nx = (-dx / len) * 0.5 + 0.5;
        const ny = (-dy / len) * 0.5 + 0.5;
        const nz = (dz / len) * 0.5 + 0.5;

        const idx = (y * width + x) * 4;
        normalData[idx + 0] = Math.floor(nx * 255);
        normalData[idx + 1] = Math.floor(ny * 255);
        normalData[idx + 2] = Math.floor(nz * 255);
        normalData[idx + 3] = 255;
      }
    }

    return normalData;
  }
}
