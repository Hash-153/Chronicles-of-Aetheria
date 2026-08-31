/**
 * @file BufferGeometry.ts
 * @description Vertex Array Object (VAO), Vertex Buffer (VBO) and Index Buffer (EBO) wrapper with dynamic attribute binding.
 */

export interface VertexAttribute {
  location: number;
  size: number;
  type: number;
  normalized: boolean;
  stride: number;
  offset: number;
}

export class BufferGeometry {
  public vao: WebGLVertexArrayObject;
  public vbo: WebGLBuffer;
  public ebo?: WebGLBuffer;
  private _gl: WebGL2RenderingContext;
  public indexCount = 0;
  public vertexCount = 0;

  constructor(gl: WebGL2RenderingContext) {
    this._gl = gl;
    this.vao = gl.createVertexArray()!;
    this.vbo = gl.createBuffer()!;
  }

  public setVertices(data: Float32Array, usage = this._gl.STATIC_DRAW): void {
    const gl = this._gl;
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, data, usage);
  }

  public setSubData(offset: number, data: Float32Array): void {
    const gl = this._gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, offset, data);
  }

  public setIndices(indices: Uint16Array | Uint32Array, usage = this._gl.STATIC_DRAW): void {
    const gl = this._gl;
    if (!this.ebo) {
      this.ebo = gl.createBuffer()!;
    }
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, usage);
    this.indexCount = indices.length;
  }

  public setAttributes(attributes: VertexAttribute[]): void {
    const gl = this._gl;
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);

    for (let i = 0; i < attributes.length; i++) {
      const attr = attributes[i];
      gl.enableVertexAttribArray(attr.location);
      gl.vertexAttribPointer(
        attr.location,
        attr.size,
        attr.type,
        attr.normalized,
        attr.stride,
        attr.offset
      );
    }
  }

  public bind(): void {
    this._gl.bindVertexArray(this.vao);
  }

  public unbind(): void {
    this._gl.bindVertexArray(null);
  }

  public dispose(): void {
    const gl = this._gl;
    gl.deleteBuffer(this.vbo);
    if (this.ebo) gl.deleteBuffer(this.ebo);
    gl.deleteVertexArray(this.vao);
  }
}
