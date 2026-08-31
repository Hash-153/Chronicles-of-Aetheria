/**
 * @file RingBuffer.ts
 * @description Fixed-capacity FIFO circular ring buffer for real-time telemetry, audio samples, and event histories.
 */

export class RingBuffer<T> {
  private _buffer: (T | undefined)[];
  private _head = 0;
  private _tail = 0;
  private _size = 0;
  private _capacity: number;

  constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error('RingBuffer capacity must be greater than zero');
    }
    this._capacity = capacity;
    this._buffer = new Array<T | undefined>(capacity);
  }

  public get capacity(): number {
    return this._capacity;
  }

  public get size(): number {
    return this._size;
  }

  public get isFull(): boolean {
    return this._size === this._capacity;
  }

  public get isEmpty(): boolean {
    return this._size === 0;
  }

  public push(item: T): boolean {
    let overwritten = false;
    if (this.isFull) {
      this._head = (this._head + 1) % this._capacity;
      this._size--;
      overwritten = true;
    }

    this._buffer[this._tail] = item;
    this._tail = (this._tail + 1) % this._capacity;
    this._size++;
    return overwritten;
  }

  public pop(): T | undefined {
    if (this.isEmpty) return undefined;

    const item = this._buffer[this._head];
    this._buffer[this._head] = undefined;
    this._head = (this._head + 1) % this._capacity;
    this._size--;
    return item;
  }

  public peek(): T | undefined {
    if (this.isEmpty) return undefined;
    return this._buffer[this._head];
  }

  public peekLast(): T | undefined {
    if (this.isEmpty) return undefined;
    const lastIdx = (this._tail - 1 + this._capacity) % this._capacity;
    return this._buffer[lastIdx];
  }

  public get(index: number): T | undefined {
    if (index < 0 || index >= this._size) return undefined;
    const actualIdx = (this._head + index) % this._capacity;
    return this._buffer[actualIdx];
  }

  public clear(): void {
    this._buffer.fill(undefined);
    this._head = 0;
    this._tail = 0;
    this._size = 0;
  }

  public toArray(): T[] {
    const result: T[] = new Array(this._size);
    for (let i = 0; i < this._size; i++) {
      result[i] = this.get(i)!;
    }
    return result;
  }
}
