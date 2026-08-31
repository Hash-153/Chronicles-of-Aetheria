/**
 * @file Texture2D.ts
 * @description Texture resource wrapper supporting solid color generation, procedural sprite sheets, pixel filtering, and UV coordinates.
 */

import { Color } from '../core/math/Color.ts';

export class Texture2D {
  public texture: WebGLTexture;
  public width: number;
  public height: number;
  private _gl: WebGL2RenderingContext;

  constructor(gl: WebGL2RenderingContext, width = 1, height = 1) {
    this._gl = gl;
    this.width = width;
    this.height = height;
    this.texture = gl.createTexture()!;

    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  }

  public static createSolidColor(gl: WebGL2RenderingContext, color: Color): Texture2D {
    const tex = new Texture2D(gl, 1, 1);
    const pixel = new Uint8Array([
      Math.floor(color.r * 255),
      Math.floor(color.g * 255),
      Math.floor(color.b * 255),
      Math.floor(color.a * 255),
    ]);
    gl.bindTexture(gl.TEXTURE_2D, tex.texture);
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixel
    );
    return tex;
  }

  public static createProceduralCheckerboard(
    gl: WebGL2RenderingContext,
    size = 64,
    cellSize = 8,
    color1 = new Color(0.2, 0.2, 0.2, 1),
    color2 = new Color(0.4, 0.4, 0.4, 1)
  ): Texture2D {
    const tex = new Texture2D(gl, size, size);
    const pixels = new Uint8Array(size * size * 4);

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const check = ((Math.floor(x / cellSize) + Math.floor(y / cellSize)) % 2) === 0;
        const c = check ? color1 : color2;
        const idx = (y * size + x) * 4;
        pixels[idx + 0] = Math.floor(c.r * 255);
        pixels[idx + 1] = Math.floor(c.g * 255);
        pixels[idx + 2] = Math.floor(c.b * 255);
        pixels[idx + 3] = Math.floor(c.a * 255);
      }
    }

    gl.bindTexture(gl.TEXTURE_2D, tex.texture);
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels
    );
    return tex;
  }

  public bind(unit = 0): void {
    this._gl.activeTexture(this._gl.TEXTURE0 + unit);
    this._gl.bindTexture(this._gl.TEXTURE_2D, this.texture);
  }

  public dispose(): void {
    this._gl.deleteTexture(this.texture);
  }
}
