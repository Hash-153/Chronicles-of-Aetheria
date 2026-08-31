/**
 * @file RoomGraph.ts
 * @description Graph topology network managing dungeon rooms, boss gates, keys, and branch depth.
 */

export const RoomType = {
  Spawn: 0,
  Normal: 1,
  Treasure: 2,
  Shop: 3,
  Boss: 4,
  Secret: 5,
} as const;
export type RoomType = typeof RoomType[keyof typeof RoomType];

export interface DungeonNode {
  id: number;
  type: RoomType;
  depth: number;
  connections: number[];
  isLocked?: boolean;
  requiredKeyId?: number;
}

export class RoomGraph {
  public nodes: Map<number, DungeonNode> = new Map();

  public addNode(id: number, type = RoomType.Normal, depth = 0): DungeonNode {
    const node: DungeonNode = {
      id,
      type,
      depth,
      connections: [],
    };
    this.nodes.set(id, node);
    return node;
  }

  public connect(idA: number, idB: number): void {
    const nodeA = this.nodes.get(idA);
    const nodeB = this.nodes.get(idB);
    if (!nodeA || !nodeB) return;

    if (!nodeA.connections.includes(idB)) nodeA.connections.push(idB);
    if (!nodeB.connections.includes(idA)) nodeB.connections.push(idA);
  }

  public getFurthestNode(startId = 0): DungeonNode | null {
    const start = this.nodes.get(startId);
    if (!start) return null;

    let furthest = start;
    let maxDist = 0;

    const visited = new Set<number>();
    const queue: [DungeonNode, number][] = [[start, 0]];
    visited.add(start.id);

    while (queue.length > 0) {
      const [curr, dist] = queue.shift()!;
      if (dist > maxDist) {
        maxDist = dist;
        furthest = curr;
      }

      for (const neighborId of curr.connections) {
        if (!visited.has(neighborId)) {
          visited.add(neighborId);
          queue.push([this.nodes.get(neighborId)!, dist + 1]);
        }
      }
    }

    return furthest;
  }
}
