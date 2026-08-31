/**
 * @file FastArray.ts
 * @description Contiguous fixed/dynamic memory array with fast swap-and-pop O(1) removal without memory shift.
 */

export class FastArray<T> {
  public data: (T | undefined)[];
  public length = 0;

  constructor(initialCapacity = 32) {
    this.data = new Array(initialCapacity);
  }

  public push(item: T): void {
    if (this.length >= this.data.length) {
      this._grow();
    }
    this.data[this.length] = item;
    this.length++;
  }

  public pop(): T | undefined {
    if (this.length === 0) return undefined;
    this.length--;
    const val = this.data[this.length];
    this.data[this.length] = undefined;
    return val;
  }

  public removeAtSwap(index: number): T | undefined {
    if (index < 0 || index >= this.length) return undefined;
    const removed = this.data[index];
    this.length--;
    this.data[index] = this.data[this.length];
    this.data[this.length] = undefined;
    return removed;
  }

  public get(index: number): T | undefined {
    if (index < 0 || index >= this.length) return undefined;
    return this.data[index];
  }

  public set(index: number, val: T): void {
    if (index >= this.data.length) {
      this._ensureCapacity(index + 1);
    }
    if (index >= this.length) {
      this.length = index + 1;
    }
    this.data[index] = val;
  }

  public clear(): void {
    for (let i = 0; i < this.length; i++) {
      this.data[i] = undefined;
    }
    this.length = 0;
  }

  private _grow(): void {
    const newCap = Math.max(8, this.data.length * 2);
    const nextArr = new Array(newCap);
    for (let i = 0; i < this.length; i++) {
      nextArr[i] = this.data[i];
    }
    this.data = nextArr;
  }

  private _ensureCapacity(cap: number): void {
    if (cap <= this.data.length) return;
    const nextCap = Math.max(cap, this.data.length * 2);
    const nextArr = new Array(nextCap);
    for (let i = 0; i < this.length; i++) {
      nextArr[i] = this.data[i];
    }
    this.data = nextArr;
  }
}
