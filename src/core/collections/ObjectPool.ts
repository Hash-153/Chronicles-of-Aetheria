/**
 * @file ObjectPool.ts
 * @description High-performance zero-allocation object pool to eliminate garbage collection pauses during gameplay loops.
 */

export interface IPoolable {
  reset(): void;
}

export class ObjectPool<T> {
  private _factory: () => T;
  private _resetFn?: (item: T) => void;
  private _freeList: T[];
  private _capacity: number;
  private _allocatedCount = 0;

  constructor(factory: () => T, initialCapacity = 64, resetFn?: (item: T) => void) {
    this._factory = factory;
    this._resetFn = resetFn;
    this._capacity = initialCapacity;
    this._freeList = new Array<T>(initialCapacity);

    for (let i = 0; i < initialCapacity; i++) {
      this._freeList[i] = this._factory();
      this._allocatedCount++;
    }
  }

  public get available(): number {
    return this._freeList.length;
  }

  public get totalAllocated(): number {
    return this._allocatedCount;
  }

  public get inUse(): number {
    return this._allocatedCount - this._freeList.length;
  }

  public acquire(): T {
    if (this._freeList.length === 0) {
      this._allocatedCount++;
      return this._factory();
    }
    return this._freeList.pop()!;
  }

  public release(item: T): void {
    if (this._resetFn) {
      this._resetFn(item);
    } else if (typeof (item as unknown as IPoolable).reset === 'function') {
      (item as unknown as IPoolable).reset();
    }
    this._freeList.push(item);
  }

  public releaseAll(items: T[]): void {
    for (let i = 0; i < items.length; i++) {
      this.release(items[i]);
    }
  }

  public prewarm(count: number): void {
    for (let i = 0; i < count; i++) {
      this._freeList.push(this._factory());
      this._allocatedCount++;
    }
  }

  public clear(): void {
    this._freeList.length = 0;
    this._allocatedCount = 0;
  }
}
