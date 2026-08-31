/**
 * @file Shader.ts
 * @description WebGL2 Shader compiler with error line diagnostics, uniform reflection, and binding caches.
 */

export class Shader {
  public program: WebGLProgram;
  private _gl: WebGL2RenderingContext;
  private _uniformLocations: Map<string, WebGLUniformLocation> = new Map();
  private _attribLocations: Map<string, number> = new Map();

  constructor(gl: WebGL2RenderingContext, vertexSrc: string, fragmentSrc: string) {
    this._gl = gl;
    const vShader = this._compileShader(gl.VERTEX_SHADER, vertexSrc);
    const fShader = this._compileShader(gl.FRAGMENT_SHADER, fragmentSrc);

    const program = gl.createProgram()!;
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error(`Shader Link Error:\n${info}`);
    }

    gl.deleteShader(vShader);
    gl.deleteShader(fShader);

    this.program = program;
  }

  public bind(): void {
    this._gl.useProgram(this.program);
  }

  public getUniformLocation(name: string): WebGLUniformLocation | null {
    let loc = this._uniformLocations.get(name);
    if (loc === undefined) {
      const glLoc = this._gl.getUniformLocation(this.program, name);
      if (glLoc) {
        this._uniformLocations.set(name, glLoc);
        loc = glLoc;
      }
    }
    return loc || null;
  }

  public getAttribLocation(name: string): number {
    let loc = this._attribLocations.get(name);
    if (loc === undefined) {
      loc = this._gl.getAttribLocation(this.program, name);
      this._attribLocations.set(name, loc);
    }
    return loc;
  }

  public setFloat(name: string, value: number): void {
    const loc = this.getUniformLocation(name);
    if (loc) this._gl.uniform1f(loc, value);
  }

  public setInt(name: string, value: number): void {
    const loc = this.getUniformLocation(name);
    if (loc) this._gl.uniform1i(loc, value);
  }

  public setVec2(name: string, x: number, y: number): void {
    const loc = this.getUniformLocation(name);
    if (loc) this._gl.uniform2f(loc, x, y);
  }

  public setVec3(name: string, x: number, y: number, z: number): void {
    const loc = this.getUniformLocation(name);
    if (loc) this._gl.uniform3f(loc, x, y, z);
  }

  public setVec4(name: string, x: number, y: number, z: number, w: number): void {
    const loc = this.getUniformLocation(name);
    if (loc) this._gl.uniform4f(loc, x, y, z, w);
  }

  public setMat3(name: string, matrix: Float32Array): void {
    const loc = this.getUniformLocation(name);
    if (loc) this._gl.uniformMatrix3fv(loc, false, matrix);
  }

  public setMat4(name: string, matrix: Float32Array): void {
    const loc = this.getUniformLocation(name);
    if (loc) this._gl.uniformMatrix4fv(loc, false, matrix);
  }

  public dispose(): void {
    this._gl.deleteProgram(this.program);
  }

  private _compileShader(type: number, src: string): WebGLShader {
    const gl = this._gl;
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, src.trim());
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      const typeStr = type === gl.VERTEX_SHADER ? 'Vertex' : 'Fragment';
      throw new Error(`${typeStr} Shader Compile Error:\n${info}\nSource:\n${src}`);
    }

    return shader;
  }
}
