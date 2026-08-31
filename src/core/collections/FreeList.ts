/**
 * @file FreeList.ts
 * @description Lock-free index and entity slot allocator for reusable ID generation.
 */

export class FreeList {
  private _freeIndices: number[];
  private _nextAvailableIndex = 0;

  constructor(initialCapacity = 256) {
    this._freeIndices = [];
    this._freeIndices.length = 0;
  }

  public get count(): number {
    return this._nextAvailableIndex - this._freeIndices.length;
  }

  public allocate(): number {
    if (this._freeIndices.length > 0) {
      return this._freeIndices.pop()!;
    }
    const id = this._nextAvailableIndex;
    this._nextAvailableIndex++;
    return id;
  }

  public free(id: number): void {
    if (id < 0 || id >= this._nextAvailableIndex) {
      throw new Error(`Invalid free id: ${id}`);
    }
    this._freeIndices.push(id);
  }

  public clear(): void {
    this._freeIndices.length = 0;
    this._nextAvailableIndex = 0;
  }
}
