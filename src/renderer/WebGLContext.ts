/**
 * @file WebGLContext.ts
 * @description WebGL2 context manager, capabilities detector, blend state tracker, and framebuffer manager.
 */

export class WebGLContext {
  public gl: WebGL2RenderingContext;
  public canvas: HTMLCanvasElement;
  public width = 0;
  public height = 0;
  public dpr = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: true,
      stencil: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    });

    if (!gl) {
      throw new Error('WebGL2 is not supported on this device/browser');
    }

    this.gl = gl;
    this.resize();
  }

  public resize(): boolean {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = Math.floor(this.canvas.clientWidth * this.dpr);
    const displayHeight = Math.floor(this.canvas.clientHeight * this.dpr);

    if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
      this.canvas.width = displayWidth;
      this.canvas.height = displayHeight;
      this.width = displayWidth;
      this.height = displayHeight;
      this.gl.viewport(0, 0, displayWidth, displayHeight);
      return true;
    }
    return false;
  }

  public setClearColor(r: number, g: number, b: number, a = 1): void {
    this.gl.clearColor(r, g, b, a);
  }

  public clear(): void {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  public setBlendMode(mode: 'normal' | 'additive' | 'multiply' | 'none'): void {
    const gl = this.gl;
    if (mode === 'none') {
      gl.disable(gl.BLEND);
      return;
    }

    gl.enable(gl.BLEND);
    switch (mode) {
      case 'normal':
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        break;
      case 'additive':
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        break;
      case 'multiply':
        gl.blendFunc(gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA);
        break;
    }
  }
}
