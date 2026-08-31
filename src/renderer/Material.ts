/**
 * @file Material.ts
 * @description Material definition with blend modes, depth writes, shader parameters, and texture slots.
 */

import { Color } from '../core/math/Color.ts';
import { Texture2D } from './Texture2D.ts';

export type BlendMode = 'normal' | 'additive' | 'multiply' | 'screen' | 'none';

export class Material {
  public name: string;
  public diffuseColor: Color;
  public diffuseTexture?: Texture2D;
  public blendMode: BlendMode;
  public depthWrite: boolean;
  public depthTest: boolean;
  public opacity: number;

  constructor(options: {
    name?: string;
    diffuseColor?: Color;
    diffuseTexture?: Texture2D;
    blendMode?: BlendMode;
    depthWrite?: boolean;
    depthTest?: boolean;
    opacity?: number;
  } = {}) {
    this.name = options.name ?? 'DefaultMaterial';
    this.diffuseColor = options.diffuseColor ? options.diffuseColor.clone() : Color.WHITE.clone();
    this.diffuseTexture = options.diffuseTexture;
    this.blendMode = options.blendMode ?? 'normal';
    this.depthWrite = options.depthWrite ?? false;
    this.depthTest = options.depthTest ?? false;
    this.opacity = options.opacity ?? 1.0;
  }
}
