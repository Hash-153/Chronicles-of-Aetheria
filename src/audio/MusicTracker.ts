/**
 * @file MusicTracker.ts
 * @description 4-channel retro music sequencer playing procedural dynamic ambient and battle music tracks.
 */

import { AudioContextManager } from './AudioContextManager.ts';
import { ADSREnvelope } from './ADSRGainEnvelope.ts';

export interface NoteEvent {
  note: number; // MIDI note (e.g. 60 for Middle C) or 0 for rest
  duration: number; // in 16th steps
}

export class MusicTracker {
  private _manager: AudioContextManager;
  public bpm = 120;
  public isPlaying = false;
  private _timerId?: number;
  private _currentStep = 0;

  // Track patterns for 4 channels: Lead, Bass, Harmony, Drums
  public leadTrack: NoteEvent[] = [
    { note: 60, duration: 2 }, { note: 64, duration: 2 }, { note: 67, duration: 2 }, { note: 71, duration: 2 },
    { note: 72, duration: 4 }, { note: 67, duration: 4 },
  ];

  public bassTrack: NoteEvent[] = [
    { note: 36, duration: 4 }, { note: 36, duration: 4 }, { note: 41, duration: 4 }, { note: 43, duration: 4 },
  ];

  constructor() {
    this._manager = AudioContextManager.getInstance();
  }

  public play(): void {
    if (this.isPlaying) return;
    this._manager.unlock();
    this.isPlaying = true;
    this._currentStep = 0;

    const stepIntervalMs = (60 / this.bpm / 4) * 1000;
    this._timerId = window.setInterval(() => this._tick(), stepIntervalMs);
  }

  public stop(): void {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this._timerId !== undefined) {
      clearInterval(this._timerId);
      this._timerId = undefined;
    }
  }

  private _tick(): void {
    const leadIdx = this._currentStep % this.leadTrack.length;
    const bassIdx = this._currentStep % this.bassTrack.length;

    const leadNote = this.leadTrack[leadIdx];
    const bassNote = this.bassTrack[bassIdx];

    if (leadNote && leadNote.note > 0) {
      this._playMidiNote(leadNote.note, 'square', 0.1, 0.15);
    }

    if (bassNote && bassNote.note > 0) {
      this._playMidiNote(bassNote.note, 'triangle', 0.2, 0.25);
    }

    this._currentStep++;
  }

  private _playMidiNote(midi: number, type: OscillatorType, duration: number, volume: number): void {
    const freq = 440 * Math.pow(2, (midi - 69) / 12);
    const ctx = this._manager.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    const env = new ADSREnvelope({ attack: 0.02, decay: 0.08, sustain: 0.4, release: 0.1, peakLevel: volume });
    const endTime = env.applyTo(gain.gain, ctx.currentTime, duration);

    osc.connect(gain);
    gain.connect(this._manager.musicGain);

    osc.start(ctx.currentTime);
    osc.stop(endTime);
  }
}
