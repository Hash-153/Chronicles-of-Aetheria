/**
 * @file BehaviorTree.ts
 * @description Behavior Tree execution coordinator and node base definitions.
 */

import { Blackboard } from './Blackboard.ts';

export const NodeStatus = {
  Success: 0,
  Failure: 1,
  Running: 2,
} as const;
export type NodeStatus = typeof NodeStatus[keyof typeof NodeStatus];

export interface TreeContext {
  dt: number;
  blackboard: Blackboard;
  entityId: number;
}

export abstract class BTNode {
  public abstract tick(context: TreeContext): NodeStatus;
  public reset(): void {
    // Optional node state reset
  }
}

export class BehaviorTree {
  public root: BTNode;
  public blackboard: Blackboard;

  constructor(root: BTNode, blackboard = new Blackboard()) {
    this.root = root;
    this.blackboard = blackboard;
  }

  public tick(dt: number, entityId: number): NodeStatus {
    const context: TreeContext = {
      dt,
      blackboard: this.blackboard,
      entityId,
    };
    return this.root.tick(context);
  }

  public reset(): void {
    this.root.reset();
  }
}
