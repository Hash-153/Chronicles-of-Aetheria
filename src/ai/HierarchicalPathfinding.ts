/**
 * @file HierarchicalPathfinding.ts
 * @description Hierarchical Pathfinding (HPA*) on large maps using cluster macro-nodes and gateway transitions.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { PathfinderAStar } from './PathfinderAStar.ts';

export interface ClusterGateway {
  nodeA: Vector2;
  nodeB: Vector2;
  transitionCost: number;
}

export class HierarchicalPathfinding {
  public clusterSize = 16;
  public width: number;
  public height: number;
  public clustersX: number;
  public clustersY: number;
  public gateways: ClusterGateway[] = [];
  private _localAStar: PathfinderAStar;

  constructor(width: number, height: number, clusterSize = 16) {
    this.width = width;
    this.height = height;
    this.clusterSize = clusterSize;
    this.clustersX = Math.ceil(width / clusterSize);
    this.clustersY = Math.ceil(height / clusterSize);
    this._localAStar = new PathfinderAStar(width, height);
  }

  public buildGateways(grid: Uint8Array): void {
    this.gateways = [];
    // Scan horizontal cluster boundaries
    for (let cy = 0; cy < this.clustersY - 1; cy++) {
      const y1 = (cy + 1) * this.clusterSize - 1;
      const y2 = y1 + 1;

      for (let x = 0; x < this.width; x++) {
        if (grid[y1 * this.width + x] === 0 && grid[y2 * this.width + x] === 0) {
          this.gateways.push({
            nodeA: new Vector2(x, y1),
            nodeB: new Vector2(x, y2),
            transitionCost: 1.0,
          });
        }
      }
    }
  }
}
