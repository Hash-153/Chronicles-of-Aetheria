/**
 * @file ai.test.ts
 * @description Unit tests for A* grid pathfinder, Flowfields, Behavior Tree nodes, and Threat matrix calculations.
 */

import { assert, runSuite } from './run_all_tests.ts';
import { PathfinderAStar } from '../src/ai/PathfinderAStar.ts';
import { Flowfield2D } from '../src/ai/Flowfield2D.ts';
import { BehaviorTree, NodeStatus } from '../src/ai/BehaviorTree.ts';
import { SequenceNode, ActionNode, ConditionNode } from '../src/ai/BehaviorNodes.ts';
import { ThreatMatrix } from '../src/ai/ThreatMatrix.ts';

export function runAITests(): void {
  runSuite('AI / A* Grid Pathfinding', () => {
    const pather = new PathfinderAStar(10, 10);
    // Add vertical wall from (5,0) to (5,7)
    for (let y = 0; y < 8; y++) {
      pather.setWalkable(5, y, false);
    }

    const path = pather.findPath(2, 2, 8, 2);
    assert(path.length > 0, 'A* must navigate around the wall obstacle');
    assert(path[path.length - 1].x === 8 && path[path.length - 1].y === 2, 'Path must terminate at target coordinate');
  });

  runSuite('AI / Flowfield 2D Wavefront Generation', () => {
    const flow = new Flowfield2D(10, 10);
    flow.generate(5, 5);

    const vec = flow.getFlowVector(2, 5);
    assert(vec.x > 0, 'Flow vector at (2,5) must point right towards target at (5,5)');
  });

  runSuite('AI / Behavior Tree Sequence & Condition Nodes', () => {
    let flag = false;
    let actionExecuted = false;

    const root = new SequenceNode([
      new ConditionNode(() => flag),
      new ActionNode(() => {
        actionExecuted = true;
        return NodeStatus.Success;
      }),
    ]);

    const bt = new BehaviorTree(root);

    // Turn 1: flag is false
    const status1 = bt.tick(0.016, 1);
    assert(status1 === NodeStatus.Failure && !actionExecuted, 'Sequence must fail when condition is false');

    // Turn 2: flag is true
    flag = true;
    const status2 = bt.tick(0.016, 1);
    assert(status2 === NodeStatus.Success && actionExecuted, 'Sequence must succeed when condition is true');
  });

  runSuite('AI / Threat Matrix Aggro Ranking', () => {
    const matrix = new ThreatMatrix();
    matrix.addThreat(101, 50);
    matrix.addThreat(102, 100);

    assert(matrix.getPrimaryTarget() === 102, 'Highest threat entity (102) must be selected as primary target');

    matrix.addThreat(101, 150);
    assert(matrix.getPrimaryTarget() === 101, 'Target must switch to entity 101 after threat exceeds current target');
  });
}
