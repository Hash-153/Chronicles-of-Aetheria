/**
 * @file Blackboard.ts
 * @description Centralized AI memory storage for shared variables, target references, cooldown timers, and perception data.
 */

export class Blackboard {
  private _data: Map<string, any> = new Map();

  public set<T>(key: string, value: T): void {
    this._data.set(key, value);
  }

  public get<T>(key: string, defaultValue?: T): T {
    if (this._data.has(key)) {
      return this._data.get(key);
    }
    return defaultValue as T;
  }

  public has(key: string): boolean {
    return this._data.has(key);
  }

  public delete(key: string): boolean {
    return this._data.delete(key);
  }

  public clear(): void {
    this._data.clear();
  }
}
