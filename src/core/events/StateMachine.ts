/**
 * @file StateMachine.ts
 * @description Hierarchical Finite State Machine with enter/exit callbacks, guards, transition triggers, and state timers.
 */

export interface IState<TContext = any> {
  name: string;
  onEnter?(context: TContext): void;
  onUpdate?(dt: number, context: TContext): void;
  onExit?(context: TContext): void;
}

export interface Transition<TContext = any> {
  from: string | '*';
  to: string;
  trigger?: string;
  condition?: (context: TContext) => boolean;
}

export class StateMachine<TContext = any> {
  private _states: Map<string, IState<TContext>> = new Map();
  private _transitions: Transition<TContext>[] = [];
  private _currentState?: IState<TContext>;
  private _context: TContext;
  private _timeInState = 0;

  constructor(context: TContext) {
    this._context = context;
  }

  public get currentState(): IState<TContext> | undefined {
    return this._currentState;
  }

  public get currentStateName(): string | undefined {
    return this._currentState?.name;
  }

  public get timeInState(): number {
    return this._timeInState;
  }

  public addState(state: IState<TContext>): this {
    this._states.set(state.name, state);
    return this;
  }

  public addTransition(transition: Transition<TContext>): this {
    this._transitions.push(transition);
    return this;
  }

  public start(initialStateName: string): void {
    const state = this._states.get(initialStateName);
    if (!state) {
      throw new Error(`Initial state '${initialStateName}' not found`);
    }
    this._currentState = state;
    this._timeInState = 0;
    if (state.onEnter) {
      state.onEnter(this._context);
    }
  }

  public trigger(triggerName: string): boolean {
    if (!this._currentState) return false;

    for (let i = 0; i < this._transitions.length; i++) {
      const trans = this._transitions[i];
      if (
        (trans.from === '*' || trans.from === this._currentState.name) &&
        trans.trigger === triggerName
      ) {
        if (!trans.condition || trans.condition(this._context)) {
          this.changeState(trans.to);
          return true;
        }
      }
    }
    return false;
  }

  public update(dt: number): void {
    if (!this._currentState) return;

    this._timeInState += dt;

    // Check automatic condition transitions
    for (let i = 0; i < this._transitions.length; i++) {
      const trans = this._transitions[i];
      if (
        (trans.from === '*' || trans.from === this._currentState.name) &&
        !trans.trigger &&
        trans.condition &&
        trans.condition(this._context)
      ) {
        this.changeState(trans.to);
        return;
      }
    }

    if (this._currentState.onUpdate) {
      this._currentState.onUpdate(dt, this._context);
    }
  }

  public changeState(nextStateName: string): void {
    const nextState = this._states.get(nextStateName);
    if (!nextState) {
      throw new Error(`Target state '${nextStateName}' not found`);
    }

    if (this._currentState && this._currentState.onExit) {
      this._currentState.onExit(this._context);
    }

    this._currentState = nextState;
    this._timeInState = 0;

    if (this._currentState.onEnter) {
      this._currentState.onEnter(this._context);
    }
  }
}
