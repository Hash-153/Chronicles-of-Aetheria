/**
 * @file ADSRGainEnvelope.ts
 * @description ADSR Envelope generator (Attack, Decay, Sustain, Release) modulating WebAudio AudioParam nodes.
 */

export interface ADSRConfig {
  attack: number;  // in seconds
  decay: number;   // in seconds
  sustain: number; // sustain level (0.0 to 1.0)
  release: number; // in seconds
  peakLevel?: number;
}

export class ADSREnvelope {
  public attack: number;
  public decay: number;
  public sustain: number;
  public release: number;
  public peakLevel: number;

  constructor(config: ADSRConfig) {
    this.attack = Math.max(0.001, config.attack);
    this.decay = Math.max(0.001, config.decay);
    this.sustain = Math.max(0, Math.min(1, config.sustain));
    this.release = Math.max(0.001, config.release);
    this.peakLevel = config.peakLevel ?? 1.0;
  }

  public applyTo(param: AudioParam, startTime: number, duration?: number): number {
    const p = param;
    const peak = this.peakLevel;
    const susLevel = peak * this.sustain;

    p.cancelScheduledValues(startTime);
    p.setValueAtTime(0.0001, startTime);

    // 1. Attack
    const attackEnd = startTime + this.attack;
    p.exponentialRampToValueAtTime(peak, attackEnd);

    // 2. Decay
    const decayEnd = attackEnd + this.decay;
    p.exponentialRampToValueAtTime(Math.max(0.0001, susLevel), decayEnd);

    if (duration !== undefined) {
      // 3. Sustain hold until release
      const releaseStart = Math.max(decayEnd, startTime + duration);
      p.setValueAtTime(Math.max(0.0001, susLevel), releaseStart);

      // 4. Release
      const releaseEnd = releaseStart + this.release;
      p.exponentialRampToValueAtTime(0.0001, releaseEnd);
      return releaseEnd;
    }

    return decayEnd;
  }
}
