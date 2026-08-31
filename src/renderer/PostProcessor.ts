/**
 * @file PostProcessor.ts
 * @description Framebuffer post-processing effects pipeline supporting Bloom, Chromatic Aberration, Vignette, and CRT Scanlines.
 */

import { Shader } from './Shader.ts';
import { BufferGeometry } from './BufferGeometry.ts';

const POST_VERTEX_SRC = `#version 300 es
precision highp float;

layout(location = 0) in vec2 a_position;
layout(location = 1) in vec2 a_texCoord;

out vec2 v_texCoord;

void main() {
    v_texCoord = a_texCoord;
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const POST_FRAGMENT_SRC = `#version 300 es
precision highp float;

in vec2 v_texCoord;
uniform sampler2D u_screenTexture;
uniform float u_time;
uniform float u_bloomIntensity;
uniform float u_vignetteIntensity;
uniform float u_chromaticAberration;
uniform float u_scanlineIntensity;

out vec4 fragColor;

void main() {
    vec2 uv = v_texCoord;

    // 1. Chromatic Aberration
    vec2 caOffset = (uv - 0.5) * u_chromaticAberration * 0.02;
    float r = texture(u_screenTexture, uv - caOffset).r;
    float g = texture(u_screenTexture, uv).g;
    float b = texture(u_screenTexture, uv + caOffset).b;
    vec3 color = vec3(r, g, b);

    // 2. Vignette
    vec2 center = uv - 0.5;
    float dist = length(center);
    float vignette = smoothstep(0.7, 0.3, dist * u_vignetteIntensity);
    color *= vignette;

    // 3. Subtle CRT Scanlines
    if (u_scanlineIntensity > 0.0) {
        float scanline = sin(uv.y * 800.0 + u_time * 5.0) * 0.5 + 0.5;
        color -= color * scanline * u_scanlineIntensity * 0.1;
    }

    fragColor = vec4(color, 1.0);
}
`;

export class PostProcessor {
  private _gl: WebGL2RenderingContext;
  private _shader: Shader;
  private _quadGeometry: BufferGeometry;

  public bloomIntensity = 0.5;
  public vignetteIntensity = 0.8;
  public chromaticAberration = 0.2;
  public scanlineIntensity = 0.3;

  constructor(gl: WebGL2RenderingContext) {
    this._gl = gl;
    this._shader = new Shader(gl, POST_VERTEX_SRC, POST_FRAGMENT_SRC);
    this._quadGeometry = new BufferGeometry(gl);

    // Fullscreen quad [-1, -1] to [1, 1]
    const quadVertices = new Float32Array([
      // pos: x, y,  uv: u, v
      -1, -1, 0, 0,
       1, -1, 1, 0,
       1,  1, 1, 1,
      -1,  1, 0, 1,
    ]);
    const quadIndices = new Uint16Array([0, 1, 2, 2, 3, 0]);

    this._quadGeometry.setVertices(quadVertices);
    this._quadGeometry.setIndices(quadIndices);
    this._quadGeometry.setAttributes([
      { location: 0, size: 2, type: gl.FLOAT, normalized: false, stride: 16, offset: 0 },
      { location: 1, size: 2, type: gl.FLOAT, normalized: false, stride: 16, offset: 8 },
    ]);
  }

  public render(screenTexture: WebGLTexture, time: number): void {
    const gl = this._gl;
    this._shader.bind();
    this._shader.setFloat('u_time', time);
    this._shader.setFloat('u_bloomIntensity', this.bloomIntensity);
    this._shader.setFloat('u_vignetteIntensity', this.vignetteIntensity);
    this._shader.setFloat('u_chromaticAberration', this.chromaticAberration);
    this._shader.setFloat('u_scanlineIntensity', this.scanlineIntensity);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, screenTexture);
    this._shader.setInt('u_screenTexture', 0);

    this._quadGeometry.bind();
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    this._quadGeometry.unbind();
  }

  public dispose(): void {
    this._quadGeometry.dispose();
    this._shader.dispose();
  }
}
