/**
 * @file AudioDspEffects.ts
 * @description Real-time Web Audio DSP effects chain: Stereo Delay with feedback, Reverb Schroeder Comb filters, and Waveshaping Distortion.
 */

import { AudioContextManager } from './AudioContextManager.ts';

export class AudioDspEffects {
  public static createStereoDelay(time = 0.25, feedbackGain = 0.4): { input: GainNode; output: GainNode } {
    const mgr = AudioContextManager.getInstance();
    const ctx = mgr.ctx;

    const input = ctx.createGain();
    const output = ctx.createGain();
    const delay = (ctx as any).createDelay ? (ctx as any).createDelay(2.0) : ctx.createGain();
    const feedback = ctx.createGain();

    if (delay.delayTime) {
      delay.delayTime.setValueAtTime(time, ctx.currentTime);
    }
    feedback.gain.setValueAtTime(feedbackGain, ctx.currentTime);

    input.connect(output); // Dry
    input.connect(delay);  // Wet
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(output);

    return { input, output };
  }

  public static createDistortion(amount = 20): { input: GainNode; output: GainNode } {
    const mgr = AudioContextManager.getInstance();
    const ctx = mgr.ctx;

    const input = ctx.createGain();
    const output = ctx.createGain();
    const waveshaper = (ctx as any).createWaveShaper ? (ctx as any).createWaveShaper() : ctx.createGain();

    if (waveshaper.curve !== undefined) {
      const k = typeof amount === 'number' ? amount : 20;
      const n_samples = 44100;
      const curve = new Float32Array(n_samples);
      const deg = Math.PI / 180;
      for (let i = 0; i < n_samples; ++i) {
        const x = (i * 2) / n_samples - 1;
        curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
      }
      waveshaper.curve = curve;
      waveshaper.oversample = '4x';
    }

    input.connect(waveshaper);
    waveshaper.connect(output);

    return { input, output };
  }
}
