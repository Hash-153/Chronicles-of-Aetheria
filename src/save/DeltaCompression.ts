/**
 * @file DeltaCompression.ts
 * @description State diff and delta compression algorithm minimizing save game payload size and network telemetry packets.
 */

export class DeltaCompression {
  public static computeDelta<T extends Record<string, any>>(baseState: T, currentState: T): Partial<T> {
    const diff: Partial<T> = {};

    for (const key in currentState) {
      if (typeof currentState[key] === 'object' && currentState[key] !== null && !Array.isArray(currentState[key])) {
        const nestedDiff = this.computeDelta(baseState[key] || {}, currentState[key]);
        if (Object.keys(nestedDiff).length > 0) {
          (diff as any)[key] = nestedDiff;
        }
      } else if (currentState[key] !== baseState[key]) {
        diff[key] = currentState[key];
      }
    }

    return diff;
  }

  public static applyDelta<T extends Record<string, any>>(baseState: T, delta: Partial<T>): T {
    const merged = { ...baseState };

    for (const key in delta) {
      if (typeof delta[key] === 'object' && delta[key] !== null && !Array.isArray(delta[key])) {
        (merged as any)[key] = this.applyDelta((baseState as any)[key] || {}, delta[key] as any);
      } else {
        merged[key] = delta[key] as any;
      }
    }

    return merged;
  }
}
