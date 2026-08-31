/**
 * @file Signal.ts
 * @description Lightweight type-safe Signal slot dispatcher without string event lookups.
 */

export type SignalListener<T> = (value: T) => void;

export class Signal<T = void> {
  private _listeners: SignalListener<T>[] = [];

  public connect(listener: SignalListener<T>): () => void {
    this._listeners.push(listener);
    return () => this.disconnect(listener);
  }

  public disconnect(listener: SignalListener<T>): boolean {
    const idx = this._listeners.indexOf(listener);
    if (idx !== -1) {
      this._listeners.splice(idx, 1);
      return true;
    }
    return false;
  }

  public emit(value: T): void {
    const len = this._listeners.length;
    for (let i = 0; i < len; i++) {
      this._listeners[i](value);
    }
  }

  public clear(): void {
    this._listeners.length = 0;
  }
}
