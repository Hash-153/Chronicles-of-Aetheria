/**
 * @file ProceduralSynth.ts
 * @description Multi-oscillator FM & subtractive audio synthesizer generating notes, chiptunes, and procedural sound waves.
 */

import { AudioContextManager } from './AudioContextManager.ts';
import { ADSREnvelope } from './ADSRGainEnvelope.ts';
import { FilterGraph } from './FilterGraph.ts';

export class ProceduralSynth {
  private _manager: AudioContextManager;

  constructor() {
    this._manager = AudioContextManager.getInstance();
  }

  public playTone(
    frequency: number,
    duration = 0.2,
    type: OscillatorType = 'sine',
    envelope = new ADSREnvelope({ attack: 0.01, decay: 0.05, sustain: 0.6, release: 0.1 }),
    destination: GainNode = this._manager.sfxGain
  ): void {
    const ctx = this._manager.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    const endTime = envelope.applyTo(gain.gain, ctx.currentTime, duration);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(ctx.currentTime);
    osc.stop(endTime);

    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  }

  public playNoise(
    duration = 0.3,
    filterCutoff = 1200,
    envelope = new ADSREnvelope({ attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.1 }),
    destination: GainNode = this._manager.sfxGain
  ): void {
    const ctx = this._manager.ctx;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const filter = new FilterGraph(ctx, 'lowpass', filterCutoff);
    const gain = ctx.createGain();

    const endTime = envelope.applyTo(gain.gain, ctx.currentTime, duration);

    noiseSource.connect(filter.filterNode);
    filter.filterNode.connect(gain);
    gain.connect(destination);

    noiseSource.start(ctx.currentTime);
    noiseSource.stop(endTime);

    noiseSource.onended = () => {
      noiseSource.disconnect();
      filter.filterNode.disconnect();
      gain.disconnect();
    };
  }
}
