/**
 * @file PriorityQueue.ts
 * @description Binary Heap priority queue with custom comparators for A* search and event prioritization.
 */

export class PriorityQueue<T> {
  private _heap: T[];
  private _comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this._heap = [];
    this._comparator = comparator;
  }

  public get size(): number {
    return this._heap.length;
  }

  public get isEmpty(): boolean {
    return this._heap.length === 0;
  }

  public enqueue(item: T): void {
    this._heap.push(item);
    this._siftUp(this._heap.length - 1);
  }

  public dequeue(): T | undefined {
    if (this.isEmpty) return undefined;
    const top = this._heap[0];
    const bottom = this._heap.pop()!;
    if (this._heap.length > 0) {
      this._heap[0] = bottom;
      this._siftDown(0);
    }
    return top;
  }

  public peek(): T | undefined {
    return this.isEmpty ? undefined : this._heap[0];
  }

  public clear(): void {
    this._heap.length = 0;
  }

  private _siftUp(index: number): void {
    let current = index;
    while (current > 0) {
      const parent = (current - 1) >>> 1;
      if (this._comparator(this._heap[current], this._heap[parent]) < 0) {
        this._swap(current, parent);
        current = parent;
      } else {
        break;
      }
    }
  }

  private _siftDown(index: number): void {
    let current = index;
    const length = this._heap.length;
    const halfLength = length >>> 1;

    while (current < halfLength) {
      const left = (current << 1) + 1;
      const right = left + 1;
      let best = current;

      if (left < length && this._comparator(this._heap[left], this._heap[best]) < 0) {
        best = left;
      }
      if (right < length && this._comparator(this._heap[right], this._heap[best]) < 0) {
        best = right;
      }

      if (best !== current) {
        this._swap(current, best);
        current = best;
      } else {
        break;
      }
    }
  }

  private _swap(i: number, j: number): void {
    const temp = this._heap[i];
    this._heap[i] = this._heap[j];
    this._heap[j] = temp;
  }
}
