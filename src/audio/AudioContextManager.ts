/**
 * @file AudioContextManager.ts
 * @description Central Web Audio API coordinator managing audio context state, user gesture unlocking, master, music, and SFX bus gain nodes.
 */

class MockAudioParam {
  public value = 1;
  setValueAtTime() {}
  linearRampToValueAtTime() {}
  exponentialRampToValueAtTime() {}
  cancelScheduledValues() {}
}

class MockGainNode {
  public gain = new MockAudioParam();
  connect() {}
  disconnect() {}
}

class MockAudioContext {
  public state = 'running';
  public currentTime = 0;
  public sampleRate = 44100;
  public destination = {};
  createGain() { return new MockGainNode() as unknown as GainNode; }
  createOscillator() {
    return {
      type: 'sine',
      frequency: new MockAudioParam(),
      connect() {},
      disconnect() {},
      start() {},
      stop() {},
      onended: null,
    } as unknown as OscillatorNode;
  }
  createBuffer(channels: number, length: number, sampleRate: number) {
    return {
      getChannelData: () => new Float32Array(length),
    } as unknown as AudioBuffer;
  }
  createBufferSource() {
    return {
      buffer: null,
      connect() {},
      disconnect() {},
      start() {},
      stop() {},
      onended: null,
    } as unknown as AudioBufferSourceNode;
  }
  createBiquadFilter() {
    return {
      type: 'lowpass',
      frequency: new MockAudioParam(),
      Q: new MockAudioParam(),
      connect() {},
      disconnect() {},
    } as unknown as BiquadFilterNode;
  }
  async resume() {}
}

export class AudioContextManager {
  private static _instance?: AudioContextManager;
  public ctx: AudioContext;
  public masterGain: GainNode;
  public musicGain: GainNode;
  public sfxGain: GainNode;

  public isUnlocked = false;

  private constructor() {
    const hasWindow = typeof window !== 'undefined';
    const AudioCtx = hasWindow ? (window.AudioContext || (window as any).webkitAudioContext) : MockAudioContext;
    this.ctx = new AudioCtx();

    this.masterGain = this.ctx.createGain();
    this.musicGain = this.ctx.createGain();
    this.sfxGain = this.ctx.createGain();

    this.musicGain.connect(this.masterGain);
    this.sfxGain.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    this.setMasterVolume(0.8);
    this.setMusicVolume(0.6);
    this.setSFXVolume(0.9);

    if (hasWindow) {
      this._setupUnlockListener();
    } else {
      this.isUnlocked = true;
    }
  }

  public static getInstance(): AudioContextManager {
    if (!this._instance) {
      this._instance = new AudioContextManager();
    }
    return this._instance;
  }

  public setMasterVolume(val: number): void {
    this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
  }

  public setMusicVolume(val: number): void {
    this.musicGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
  }

  public setSFXVolume(val: number): void {
    this.sfxGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
  }

  public unlock(): void {
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        this.isUnlocked = true;
      });
    } else {
      this.isUnlocked = true;
    }
  }

  private _setupUnlockListener(): void {
    const unlockHandler = () => {
      this.unlock();
      window.removeEventListener('click', unlockHandler);
      window.removeEventListener('keydown', unlockHandler);
      window.removeEventListener('touchstart', unlockHandler);
    };

    window.addEventListener('click', unlockHandler, { once: true });
    window.addEventListener('keydown', unlockHandler, { once: true });
    window.addEventListener('touchstart', unlockHandler, { once: true });
  }
}
