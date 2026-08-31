/**
 * @file SparseSet.ts
 * @description Sparse Set data structure providing O(1) insertion, lookup, removal and cache-friendly dense array iterations.
 */

export class SparseSet {
  private _dense: Uint32Array;
  private _sparse: Uint32Array;
  private _size = 0;
  private _capacity: number;

  constructor(maxEntities = 10000) {
    this._capacity = maxEntities;
    this._dense = new Uint32Array(maxEntities);
    this._sparse = new Uint32Array(maxEntities);
  }

  public get size(): number {
    return this._size;
  }

  public get isEmpty(): boolean {
    return this._size === 0;
  }

  public get dense(): Uint32Array {
    return this._dense.subarray(0, this._size);
  }

  public has(val: number): boolean {
    if (val >= this._capacity) return false;
    const idx = this._sparse[val];
    return idx < this._size && this._dense[idx] === val;
  }

  public add(val: number): boolean {
    if (val >= this._capacity) {
      this._grow(val + 1);
    }
    if (this.has(val)) return false;

    this._dense[this._size] = val;
    this._sparse[val] = this._size;
    this._size++;
    return true;
  }

  public remove(val: number): boolean {
    if (!this.has(val)) return false;

    const idx = this._sparse[val];
    const lastVal = this._dense[this._size - 1];

    // Swap and pop
    this._dense[idx] = lastVal;
    this._sparse[lastVal] = idx;
    this._size--;
    return true;
  }

  public getIndex(val: number): number {
    if (!this.has(val)) return -1;
    return this._sparse[val];
  }

  public getAt(denseIndex: number): number {
    if (denseIndex < 0 || denseIndex >= this._size) {
      throw new RangeError(`Index ${denseIndex} out of dense bounds [0, ${this._size})`);
    }
    return this._dense[denseIndex];
  }

  public clear(): void {
    this._size = 0;
  }

  private _grow(newCapacity: number): void {
    const nextCap = Math.max(newCapacity, this._capacity * 2);
    const newDense = new Uint32Array(nextCap);
    const newSparse = new Uint32Array(nextCap);

    newDense.set(this._dense);
    newSparse.set(this._sparse);

    this._dense = newDense;
    this._sparse = newSparse;
    this._capacity = nextCap;
  }
}
