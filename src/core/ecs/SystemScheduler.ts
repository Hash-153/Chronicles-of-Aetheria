/**
 * @file SystemScheduler.ts
 * @description Orchestrates system execution sorted by phases and priorities with stage flushes.
 */

import { System } from './System.ts';
import { SystemPhase } from './Types.ts';
import { World } from './World.ts';

export class SystemScheduler {
  private _systemsByPhase: Map<SystemPhase, System[]> = new Map();
  private _phasesInOrder: SystemPhase[] = [
    SystemPhase.PreUpdate,
    SystemPhase.Physics,
    SystemPhase.Update,
    SystemPhase.Combat,
    SystemPhase.PostUpdate,
    SystemPhase.PreRender,
    SystemPhase.Render,
    SystemPhase.PostRender,
    SystemPhase.Diagnostics,
  ];

  constructor() {
    for (const phase of this._phasesInOrder) {
      this._systemsByPhase.set(phase, []);
    }
  }

  public register(system: System, world: World): void {
    system.init(world);
    const list = this._systemsByPhase.get(system.phase) || [];
    list.push(system);
    list.sort((a, b) => b.priority - a.priority);
    this._systemsByPhase.set(system.phase, list);
  }

  public unregister(system: System): void {
    const list = this._systemsByPhase.get(system.phase);
    if (!list) return;
    const idx = list.indexOf(system);
    if (idx !== -1) {
      system.onDestroy();
      list.splice(idx, 1);
    }
  }

  public update(dt: number, world: World): void {
    for (let p = 0; p < this._phasesInOrder.length; p++) {
      const phase = this._phasesInOrder[p];
      const systems = this._systemsByPhase.get(phase)!;

      for (let s = 0; s < systems.length; s++) {
        const sys = systems[s];
        if (sys.enabled) {
          sys.update(dt);
        }
      }

      // Flush command buffer at phase boundary to keep world state consistent
      world.commandBuffer.flush(world);
    }
  }

  public clear(): void {
    for (const systems of this._systemsByPhase.values()) {
      for (const sys of systems) {
        sys.onDestroy();
      }
      systems.length = 0;
    }
  }
}
