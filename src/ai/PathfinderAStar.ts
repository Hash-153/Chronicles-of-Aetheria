/**
 * @file PathfinderAStar.ts
 * @description 2D Grid A* pathfinder with 8-directional movement, diagonal weightings, and smoothing.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { PriorityQueue } from '../core/collections/PriorityQueue.ts';

export interface PathNode {
  x: number;
  y: number;
  g: number;
  h: number;
  f: number;
  parent?: PathNode;
}

export class PathfinderAStar {
  public width: number;
  public height: number;
  public grid: Uint8Array; // 0 = walkable, 1 = solid/blocked

  constructor(width: number, height: number, grid?: Uint8Array) {
    this.width = width;
    this.height = height;
    this.grid = grid || new Uint8Array(width * height);
  }

  public isWalkable(x: number, y: number): boolean {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return false;
    return this.grid[y * this.width + x] === 0;
  }

  public setWalkable(x: number, y: number, walkable: boolean): void {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
    this.grid[y * this.width + x] = walkable ? 0 : 1;
  }

  public findPath(startX: number, startY: number, targetX: number, targetY: number): Vector2[] {
    if (!this.isWalkable(targetX, targetY) || !this.isWalkable(startX, startY)) {
      return [];
    }

    const openQueue = new PriorityQueue<PathNode>((a, b) => a.f - b.f);
    const nodeMap = new Map<string, PathNode>();
    const closedSet = new Set<string>();

    const startNode: PathNode = {
      x: startX,
      y: startY,
      g: 0,
      h: this._heuristic(startX, startY, targetX, targetY),
      f: 0,
    };
    startNode.f = startNode.g + startNode.h;

    openQueue.enqueue(startNode);
    nodeMap.set(`${startX}:${startY}`, startNode);

    // 8 Directions (Orthogonal & Diagonal)
    const dirs = [
      { x: 0, y: -1, cost: 1.0 },
      { x: 1, y: 0, cost: 1.0 },
      { x: 0, y: 1, cost: 1.0 },
      { x: -1, y: 0, cost: 1.0 },
      { x: 1, y: -1, cost: 1.414 },
      { x: 1, y: 1, cost: 1.414 },
      { x: -1, y: 1, cost: 1.414 },
      { x: -1, y: -1, cost: 1.414 },
    ];

    while (!openQueue.isEmpty) {
      const current = openQueue.dequeue()!;
      const key = `${current.x}:${current.y}`;

      if (current.x === targetX && current.y === targetY) {
        return this._reconstructPath(current);
      }

      closedSet.add(key);

      for (let i = 0; i < dirs.length; i++) {
        const d = dirs[i];
        const nx = current.x + d.x;
        const ny = current.y + d.y;
        const nKey = `${nx}:${ny}`;

        if (!this.isWalkable(nx, ny) || closedSet.has(nKey)) continue;

        // Prevent cutting corners through adjacent walls on diagonals
        if (d.x !== 0 && d.y !== 0) {
          if (!this.isWalkable(current.x + d.x, current.y) || !this.isWalkable(current.x, current.y + d.y)) {
            continue;
          }
        }

        const gScore = current.g + d.cost;
        let neighbor = nodeMap.get(nKey);

        if (!neighbor) {
          neighbor = {
            x: nx,
            y: ny,
            g: gScore,
            h: this._heuristic(nx, ny, targetX, targetY),
            f: 0,
            parent: current,
          };
          neighbor.f = neighbor.g + neighbor.h;
          nodeMap.set(nKey, neighbor);
          openQueue.enqueue(neighbor);
        } else if (gScore < neighbor.g) {
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
          openQueue.enqueue(neighbor);
        }
      }
    }

    return [];
  }

  private _heuristic(x1: number, y1: number, x2: number, y2: number): number {
    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);
    // Octile distance
    return 1.0 * (dx + dy) + (1.414 - 2.0 * 1.0) * Math.min(dx, dy);
  }

  private _reconstructPath(endNode: PathNode): Vector2[] {
    const path: Vector2[] = [];
    let curr: PathNode | undefined = endNode;
    while (curr) {
      path.push(new Vector2(curr.x, curr.y));
      curr = curr.parent;
    }
    return path.reverse();
  }
}
