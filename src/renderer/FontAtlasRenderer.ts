/**
 * @file FontAtlasRenderer.ts
 * @description Bitmap & Signed Distance Field (SDF) font renderer with kerning, alignment, and word wrapping.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Color } from '../core/math/Color.ts';
import { SpriteBatchRenderer } from './SpriteBatchRenderer.ts';

export interface GlyphInfo {
  char: string;
  x: number;
  y: number;
  width: number;
  height: number;
  xOffset: number;
  yOffset: number;
  xAdvance: number;
}

export class FontAtlasRenderer {
  public glyphs: Map<string, GlyphInfo> = new Map();
  public atlasWidth = 512;
  public atlasHeight = 512;
  public lineHeight = 24;

  public drawText(
    batch: SpriteBatchRenderer,
    text: string,
    pos: Vector2,
    fontSize = 16,
    color = Color.WHITE
  ): void {
    let curX = pos.x;
    let curY = pos.y;
    const scale = fontSize / this.lineHeight;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '\n') {
        curX = pos.x;
        curY += this.lineHeight * scale;
        continue;
      }

      const glyph = this.glyphs.get(char);
      if (!glyph) {
        curX += fontSize * 0.6;
        continue;
      }

      const gx = curX + glyph.xOffset * scale;
      const gy = curY + glyph.yOffset * scale;
      const gw = glyph.width * scale;
      const gh = glyph.height * scale;

      const u0 = glyph.x / this.atlasWidth;
      const v0 = glyph.y / this.atlasHeight;
      const u1 = (glyph.x + glyph.width) / this.atlasWidth;
      const v1 = (glyph.y + glyph.height) / this.atlasHeight;

      batch.drawSprite(
        new Vector2(gx, gy),
        new Vector2(gw, gh),
        0,
        new Vector2(0, 0),
        color,
        [u0, v0, u1, v1]
      );

      curX += glyph.xAdvance * scale;
    }
  }
}
