/**
 * @file SoundFXGenerator.ts
 * @description Procedural sound effect synthesizer producing laser blasts, explosions, coin pickups, sword swings, and hit impacts without audio files.
 */

import { AudioContextManager } from './AudioContextManager.ts';
import { ProceduralSynth } from './ProceduralSynth.ts';
import { ADSREnvelope } from './ADSRGainEnvelope.ts';
import { FilterGraph } from './FilterGraph.ts';

export class SoundFXGenerator {
  private static _synth = new ProceduralSynth();

  public static playLaser(): void {
    const manager = AudioContextManager.getInstance();
    const ctx = manager.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(gain);
    gain.connect(manager.sfxGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  public static playExplosion(): void {
    this._synth.playNoise(
      0.6,
      400,
      new ADSREnvelope({ attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.3, peakLevel: 1.0 })
    );
  }

  public static playCoinPickup(): void {
    const manager = AudioContextManager.getInstance();
    const ctx = manager.ctx;
    const now = ctx.currentTime;

    // Arpeggio note 1 (B5 - 987.77 Hz)
    this._synth.playTone(987.77, 0.08, 'sine', new ADSREnvelope({ attack: 0.005, decay: 0.04, sustain: 0.2, release: 0.02 }));

    // Arpeggio note 2 (E6 - 1318.51 Hz) after 80ms
    setTimeout(() => {
      this._synth.playTone(1318.51, 0.15, 'sine', new ADSREnvelope({ attack: 0.005, decay: 0.05, sustain: 0.3, release: 0.05 }));
    }, 70);
  }

  public static playSwordSwing(): void {
    const manager = AudioContextManager.getInstance();
    const ctx = manager.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = new FilterGraph(ctx, 'bandpass', 1500, 3.0);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(filter.filterNode);
    filter.filterNode.connect(gain);
    gain.connect(manager.sfxGain);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  public static playHitImpact(): void {
    const manager = AudioContextManager.getInstance();
    const ctx = manager.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);

    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(manager.sfxGain);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  public static playLevelUp(): void {
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this._synth.playTone(freq, 0.12, 'square', new ADSREnvelope({ attack: 0.01, decay: 0.06, sustain: 0.3, release: 0.05 }));
      }, idx * 90);
    });
  }
}
