/**
 * @file GOAPPlanner.ts
 * @description Goal-Oriented Action Planning (GOAP) A* state-space planner creating dynamic tactical action sequences.
 */

export interface WorldState {
  [key: string]: boolean | number;
}

export interface GOAPAction {
  name: string;
  cost: number;
  preconditions: WorldState;
  effects: WorldState;
  execute?: (entityId: number) => boolean;
}

export class GOAPPlanner {
  public plan(currentState: WorldState, goalState: WorldState, actions: GOAPAction[]): GOAPAction[] {
    // Check if goal is already met
    if (this._matchesState(currentState, goalState)) {
      return [];
    }

    interface PlanNode {
      state: WorldState;
      action?: GOAPAction;
      parent?: PlanNode;
      cost: number;
    }

    const openList: PlanNode[] = [{ state: { ...currentState }, cost: 0 }];
    const closedList: PlanNode[] = [];

    while (openList.length > 0) {
      openList.sort((a, b) => a.cost - b.cost);
      const current = openList.shift()!;

      if (this._matchesState(current.state, goalState)) {
        // Reconstruct plan
        const plan: GOAPAction[] = [];
        let curr: PlanNode | undefined = current;
        while (curr && curr.action) {
          plan.push(curr.action);
          curr = curr.parent;
        }
        return plan.reverse();
      }

      closedList.push(current);

      for (let i = 0; i < actions.length; i++) {
        const action = actions[i];
        if (this._matchesState(current.state, action.preconditions)) {
          const nextState = this._applyEffects(current.state, action.effects);

          if (!closedList.some(n => this._areStatesEqual(n.state, nextState))) {
            openList.push({
              state: nextState,
              action,
              parent: current,
              cost: current.cost + action.cost,
            });
          }
        }
      }
    }

    return []; // No valid plan found
  }

  private _matchesState(current: WorldState, target: WorldState): boolean {
    for (const key in target) {
      if (current[key] !== target[key]) return false;
    }
    return true;
  }

  private _applyEffects(current: WorldState, effects: WorldState): WorldState {
    return { ...current, ...effects };
  }

  private _areStatesEqual(a: WorldState, b: WorldState): boolean {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const k of keysA) {
      if (a[k] !== b[k]) return false;
    }
    return true;
  }
}
