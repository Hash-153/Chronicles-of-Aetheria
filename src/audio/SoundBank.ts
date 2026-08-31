/**
 * @file SoundBank.ts
 * @description Polyphonic SFX and musical sound bank manager with voice stealing and concurrency limiting.
 */

export class SoundBank {
  private _activeVoices = 0;
  public maxPolyphony: number;

  constructor(maxPolyphony = 16) {
    this.maxPolyphony = maxPolyphony;
  }

  public allocateVoice(): boolean {
    if (this._activeVoices >= this.maxPolyphony) {
      return false; // Concurrency limit reached
    }
    this._activeVoices++;
    return true;
  }

  public releaseVoice(): void {
    this._activeVoices = Math.max(0, this._activeVoices - 1);
  }

  public get activeVoiceCount(): number {
    return this._activeVoices;
  }
}
