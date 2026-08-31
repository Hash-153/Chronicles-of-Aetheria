/**
 * @file BenchmarkHarness.ts
 * @description Performance measurement utilities for recording draw calls, memory allocation, and frame step times.
 */

export class BenchmarkMetrics {
  public static measureMemory(): number {
    if (typeof performance !== 'undefined' && (performance as any).memory) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  }
}
