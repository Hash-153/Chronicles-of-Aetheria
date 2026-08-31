/**
 * @file SpatialAudioListener.ts
 * @description 2D Spatial audio listener calculating distance attenuation and stereo panning across camera and player locations.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { AudioContextManager } from './AudioContextManager.ts';

export class SpatialAudioListener {
  public listenerPosition = new Vector2();
  public maxDistance = 600;
  private _manager: AudioContextManager;

  constructor() {
    this._manager = AudioContextManager.getInstance();
  }

  public createSpatialPanner(sourcePos: Vector2): { panner: StereoPannerNode; gain: GainNode } {
    const ctx = this._manager.ctx;
    const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : (ctx as any).createPanner();
    const gain = ctx.createGain();

    this.updateSpatialPanner(sourcePos, panner, gain);
    return { panner, gain };
  }

  public updateSpatialPanner(sourcePos: Vector2, panner: StereoPannerNode, gain: GainNode): void {
    const delta = sourcePos.subtract(this.listenerPosition);
    const dist = delta.length();

    // Distance attenuation (linear falloff with clamping)
    const atten = Math.max(0, Math.min(1, 1 - dist / this.maxDistance));
    gain.gain.setValueAtTime(atten * atten, this._manager.ctx.currentTime);

    // Stereo pan (-1.0 to 1.0)
    if (panner.pan) {
      const pan = Math.max(-1, Math.min(1, delta.x / (this.maxDistance * 0.5)));
      panner.pan.setValueAtTime(pan, this._manager.ctx.currentTime);
    }
  }
}
