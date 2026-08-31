/**
 * @file FilterGraph.ts
 * @description Bi-quad audio filter graph supporting lowpass, highpass, bandpass, notch, peaking with Q resonance modulation.
 */

export class FilterGraph {
  public filterNode: BiquadFilterNode;
  private _ctx: AudioContext;

  constructor(ctx: AudioContext, type: BiquadFilterType = 'lowpass', cutoff = 2000, q = 1.0) {
    this._ctx = ctx;
    this.filterNode = ctx.createBiquadFilter();
    this.filterNode.type = type;
    this.filterNode.frequency.setValueAtTime(cutoff, ctx.currentTime);
    this.filterNode.Q.setValueAtTime(q, ctx.currentTime);
  }

  public setCutoff(freq: number, rampTime = 0.05): void {
    const t = this._ctx.currentTime;
    this.filterNode.frequency.cancelScheduledValues(t);
    this.filterNode.frequency.exponentialRampToValueAtTime(Math.max(20, Math.min(20000, freq)), t + rampTime);
  }

  public setResonance(q: number): void {
    this.filterNode.Q.setValueAtTime(Math.max(0.1, q), this._ctx.currentTime);
  }

  public sweep(startFreq: number, endFreq: number, duration: number): void {
    const t = this._ctx.currentTime;
    this.filterNode.frequency.setValueAtTime(Math.max(20, startFreq), t);
    this.filterNode.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), t + duration);
  }
}
