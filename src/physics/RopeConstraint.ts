/**
 * @file RopeConstraint.ts
 * @description Verlet integration rope and cable physics chain with distance limit relaxation.
 */

import { Vector2 } from '../core/math/Vector2.ts';

export class RopeSegment {
  public pos: Vector2;
  public oldPos: Vector2;
  public isPinned: boolean;

  constructor(pos: Vector2, isPinned = false) {
    this.pos = pos.clone();
    this.oldPos = pos.clone();
    this.isPinned = isPinned;
  }
}

export class RopeConstraint {
  public segments: RopeSegment[] = [];
  public segmentLength: number;
  public iterations: number;

  constructor(startPos: Vector2, count = 10, segmentLength = 12, iterations = 8) {
    this.segmentLength = segmentLength;
    this.iterations = iterations;

    for (let i = 0; i < count; i++) {
      const pos = new Vector2(startPos.x, startPos.y + i * segmentLength);
      this.segments.push(new RopeSegment(pos, i === 0));
    }
  }

  public update(dt: number, gravity = new Vector2(0, 200)): void {
    // 1. Verlet Integration
    for (let i = 0; i < this.segments.length; i++) {
      const seg = this.segments[i];
      if (seg.isPinned) continue;

      const vel = seg.pos.subtract(seg.oldPos);
      seg.oldPos.copy(seg.pos);
      seg.pos.addSelf(vel).addSelf(gravity.scale(dt * dt));
    }

    // 2. Distance constraint relaxation
    for (let iter = 0; iter < this.iterations; iter++) {
      for (let i = 0; i < this.segments.length - 1; i++) {
        const segA = this.segments[i];
        const segB = this.segments[i + 1];

        const delta = segB.pos.subtract(segA.pos);
        const dist = delta.length();
        if (dist === 0) continue;

        const error = (dist - this.segmentLength) / dist;
        const change = delta.scale(error * 0.5);

        if (!segA.isPinned && !segB.isPinned) {
          segA.pos.addSelf(change);
          segB.pos.subtractSelf(change);
        } else if (!segA.isPinned) {
          segA.pos.addSelf(change.scale(2));
        } else if (!segB.isPinned) {
          segB.pos.subtractSelf(change.scale(2));
        }
      }
    }
  }
}
