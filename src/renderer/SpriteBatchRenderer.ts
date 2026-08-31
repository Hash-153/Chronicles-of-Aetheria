/**
 * @file SpriteBatchRenderer.ts
 * @description Dynamic high-performance Sprite Batch Renderer executing up to 10,000 sprites per draw call with instanced vertex arrays.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Color } from '../core/math/Color.ts';
import { Matrix4 } from '../core/math/Matrix4.ts';
import { Shader } from './Shader.ts';
import { BufferGeometry } from './BufferGeometry.ts';
import { Texture2D } from './Texture2D.ts';

const VERTEX_SHADER_SRC = `#version 300 es
precision highp float;

layout(location = 0) in vec2 a_position;
layout(location = 1) in vec2 a_texCoord;
layout(location = 2) in vec4 a_color;

uniform mat4 u_projectionMatrix;
uniform mat4 u_viewMatrix;

out vec2 v_texCoord;
out vec4 v_color;

void main() {
    v_texCoord = a_texCoord;
    v_color = a_color;
    gl_Position = u_projectionMatrix * u_viewMatrix * vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `#version 300 es
precision highp float;

in vec2 v_texCoord;
in vec4 v_color;

uniform sampler2D u_texture;

out vec4 fragColor;

void main() {
    vec4 texColor = texture(u_texture, v_texCoord);
    fragColor = texColor * v_color;
}
`;

export class SpriteBatchRenderer {
  public static readonly MAX_SPRITES = 10000;
  public static readonly VERTICES_PER_SPRITE = 4;
  public static readonly INDICES_PER_SPRITE = 6;
  public static readonly FLOATS_PER_VERTEX = 8; // x, y, u, v, r, g, b, a

  private _gl: WebGL2RenderingContext;
  private _shader: Shader;
  private _geometry: BufferGeometry;
  private _vertexData: Float32Array;
  private _spriteCount = 0;
  private _currentTexture?: Texture2D;
  private _whiteTexture: Texture2D;
  public drawCalls = 0;

  constructor(gl: WebGL2RenderingContext) {
    this._gl = gl;
    this._shader = new Shader(gl, VERTEX_SHADER_SRC, FRAGMENT_SHADER_SRC);
    this._geometry = new BufferGeometry(gl);
    this._whiteTexture = Texture2D.createSolidColor(gl, Color.WHITE);

    const totalFloats = SpriteBatchRenderer.MAX_SPRITES * SpriteBatchRenderer.VERTICES_PER_SPRITE * SpriteBatchRenderer.FLOATS_PER_VERTEX;
    this._vertexData = new Float32Array(totalFloats);

    // Pre-build index buffer: [0, 1, 2, 2, 3, 0] quad pattern
    const totalIndices = SpriteBatchRenderer.MAX_SPRITES * SpriteBatchRenderer.INDICES_PER_SPRITE;
    const indices = new Uint32Array(totalIndices);
    for (let i = 0, v = 0; i < totalIndices; i += 6, v += 4) {
      indices[i + 0] = v + 0;
      indices[i + 1] = v + 1;
      indices[i + 2] = v + 2;
      indices[i + 3] = v + 2;
      indices[i + 4] = v + 3;
      indices[i + 5] = v + 0;
    }

    this._geometry.setVertices(this._vertexData, gl.DYNAMIC_DRAW);
    this._geometry.setIndices(indices, gl.STATIC_DRAW);

    // Set vertex attributes
    const stride = SpriteBatchRenderer.FLOATS_PER_VERTEX * 4; // 32 bytes
    this._geometry.setAttributes([
      { location: 0, size: 2, type: gl.FLOAT, normalized: false, stride, offset: 0 },
      { location: 1, size: 2, type: gl.FLOAT, normalized: false, stride, offset: 8 },
      { location: 2, size: 4, type: gl.FLOAT, normalized: false, stride, offset: 16 },
    ]);
  }

  public begin(viewMatrix: Matrix4, projMatrix: Matrix4): void {
    this._shader.bind();
    this._shader.setMat4('u_viewMatrix', viewMatrix.elements);
    this._shader.setMat4('u_projectionMatrix', projMatrix.elements);
    this._shader.setInt('u_texture', 0);

    this._spriteCount = 0;
    this.drawCalls = 0;
    this._currentTexture = undefined;
  }

  public drawSprite(
    pos: Vector2,
    size: Vector2,
    rotation = 0,
    origin = new Vector2(0.5, 0.5),
    color = Color.WHITE,
    uvs: [number, number, number, number] = [0, 0, 1, 1], // u0, v0, u1, v1
    texture?: Texture2D
  ): void {
    const tex = texture || this._whiteTexture;

    if (this._currentTexture && this._currentTexture !== tex) {
      this.flush();
    }
    this._currentTexture = tex;

    if (this._spriteCount >= SpriteBatchRenderer.MAX_SPRITES) {
      this.flush();
    }

    // Compute quad corner positions
    const w = size.x;
    const h = size.y;
    const ox = origin.x * w;
    const oy = origin.y * h;

    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);

    const x0 = -ox, y0 = -oy;
    const x1 = w - ox, y1 = -oy;
    const x2 = w - ox, y2 = h - oy;
    const x3 = -ox, y3 = h - oy;

    const p0x = pos.x + (x0 * cos - y0 * sin);
    const p0y = pos.y + (x0 * sin + y0 * cos);

    const p1x = pos.x + (x1 * cos - y1 * sin);
    const p1y = pos.y + (x1 * sin + y1 * cos);

    const p2x = pos.x + (x2 * cos - y2 * sin);
    const p2y = pos.y + (x2 * sin + y2 * cos);

    const p3x = pos.x + (x3 * cos - y3 * sin);
    const p3y = pos.y + (x3 * sin + y3 * cos);

    const u0 = uvs[0], v0 = uvs[1], u1 = uvs[2], v1 = uvs[3];
    const r = color.r, g = color.g, b = color.b, a = color.a;

    let offset = this._spriteCount * SpriteBatchRenderer.VERTICES_PER_SPRITE * SpriteBatchRenderer.FLOATS_PER_VERTEX;
    const vd = this._vertexData;

    // V0
    vd[offset++] = p0x; vd[offset++] = p0y; vd[offset++] = u0; vd[offset++] = v0;
    vd[offset++] = r;   vd[offset++] = g;   vd[offset++] = b;  vd[offset++] = a;

    // V1
    vd[offset++] = p1x; vd[offset++] = p1y; vd[offset++] = u1; vd[offset++] = v0;
    vd[offset++] = r;   vd[offset++] = g;   vd[offset++] = b;  vd[offset++] = a;

    // V2
    vd[offset++] = p2x; vd[offset++] = p2y; vd[offset++] = u1; vd[offset++] = v1;
    vd[offset++] = r;   vd[offset++] = g;   vd[offset++] = b;  vd[offset++] = a;

    // V3
    vd[offset++] = p3x; vd[offset++] = p3y; vd[offset++] = u0; vd[offset++] = v1;
    vd[offset++] = r;   vd[offset++] = g;   vd[offset++] = b;  vd[offset++] = a;

    this._spriteCount++;
  }

  public flush(): void {
    if (this._spriteCount === 0) return;

    const tex = this._currentTexture || this._whiteTexture;
    tex.bind(0);

    const countFloats = this._spriteCount * SpriteBatchRenderer.VERTICES_PER_SPRITE * SpriteBatchRenderer.FLOATS_PER_VERTEX;
    const subArray = this._vertexData.subarray(0, countFloats);

    this._geometry.setSubData(0, subArray);
    this._geometry.bind();

    const indexCount = this._spriteCount * SpriteBatchRenderer.INDICES_PER_SPRITE;
    this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_INT, 0);

    this._geometry.unbind();
    this.drawCalls++;
    this._spriteCount = 0;
  }

  public end(): void {
    this.flush();
  }

  public dispose(): void {
    this._geometry.dispose();
    this._shader.dispose();
    this._whiteTexture.dispose();
  }
}
