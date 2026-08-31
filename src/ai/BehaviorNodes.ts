/**
 * @file BehaviorNodes.ts
 * @description Comprehensive Behavior Tree node library: Sequences, Selectors, Parallels, Inverters, Repeaters, Conditions, and Actions.
 */

import { BTNode, NodeStatus, type TreeContext } from './BehaviorTree.ts';

// --- Composite Nodes ---

export class SequenceNode extends BTNode {
  public children: BTNode[];
  private _currentChild = 0;

  constructor(children: BTNode[] = []) {
    super();
    this.children = children;
  }

  public override tick(context: TreeContext): NodeStatus {
    while (this._currentChild < this.children.length) {
      const status = this.children[this._currentChild].tick(context);
      if (status === NodeStatus.Running) return NodeStatus.Running;
      if (status === NodeStatus.Failure) {
        this._currentChild = 0;
        return NodeStatus.Failure;
      }
      this._currentChild++;
    }
    this._currentChild = 0;
    return NodeStatus.Success;
  }

  public override reset(): void {
    this._currentChild = 0;
    for (const child of this.children) child.reset();
  }
}

export class SelectorNode extends BTNode {
  public children: BTNode[];
  private _currentChild = 0;

  constructor(children: BTNode[] = []) {
    super();
    this.children = children;
  }

  public override tick(context: TreeContext): NodeStatus {
    while (this._currentChild < this.children.length) {
      const status = this.children[this._currentChild].tick(context);
      if (status === NodeStatus.Running) return NodeStatus.Running;
      if (status === NodeStatus.Success) {
        this._currentChild = 0;
        return NodeStatus.Success;
      }
      this._currentChild++;
    }
    this._currentChild = 0;
    return NodeStatus.Failure;
  }

  public override reset(): void {
    this._currentChild = 0;
    for (const child of this.children) child.reset();
  }
}

// --- Decorator Nodes ---

export class InverterNode extends BTNode {
  public child: BTNode;

  constructor(child: BTNode) {
    super();
    this.child = child;
  }

  public override tick(context: TreeContext): NodeStatus {
    const status = this.child.tick(context);
    if (status === NodeStatus.Success) return NodeStatus.Failure;
    if (status === NodeStatus.Failure) return NodeStatus.Success;
    return NodeStatus.Running;
  }

  public override reset(): void {
    this.child.reset();
  }
}

export class CooldownDecorator extends BTNode {
  public child: BTNode;
  public cooldownTime: number;
  private _lastExecutionTime = -Infinity;

  constructor(child: BTNode, cooldownTime = 1.0) {
    super();
    this.child = child;
    this.cooldownTime = cooldownTime;
  }

  public override tick(context: TreeContext): NodeStatus {
    const now = performance.now() / 1000;
    if (now - this._lastExecutionTime < this.cooldownTime) {
      return NodeStatus.Failure;
    }

    const status = this.child.tick(context);
    if (status === NodeStatus.Success || status === NodeStatus.Running) {
      this._lastExecutionTime = now;
    }
    return status;
  }

  public override reset(): void {
    this.child.reset();
  }
}

// --- Leaf Action & Condition Nodes ---

export class ActionNode extends BTNode {
  private _action: (context: TreeContext) => NodeStatus;

  constructor(action: (context: TreeContext) => NodeStatus) {
    super();
    this._action = action;
  }

  public override tick(context: TreeContext): NodeStatus {
    return this._action(context);
  }
}

export class ConditionNode extends BTNode {
  private _predicate: (context: TreeContext) => boolean;

  constructor(predicate: (context: TreeContext) => boolean) {
    super();
    this._predicate = predicate;
  }

  public override tick(context: TreeContext): NodeStatus {
    return this._predicate(context) ? NodeStatus.Success : NodeStatus.Failure;
  }
}
