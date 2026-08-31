/**
 * @file procgen.test.ts
 * @description Unit tests for BSP dungeon partitioning, cellular automata caves, and Diablo-style loot generation.
 */

import { assert, runSuite } from './run_all_tests.ts';
import { BSPDungeonGenerator } from '../src/procgen/BSPDungeonGenerator.ts';
import { CellularAutomata } from '../src/procgen/CellularAutomata.ts';
import { LootTableGenerator, ItemRarity } from '../src/procgen/LootTableGenerator.ts';

export function runProcGenTests(): void {
  runSuite('ProcGen / BSP Dungeon Rooms & Corridors', () => {
    const dungeon = new BSPDungeonGenerator(50, 50);
    dungeon.generate(15, 6, 4);

    assert(dungeon.rooms.length >= 2, 'BSP must generate multiple distinct rooms');

    let floorCount = 0;
    for (let i = 0; i < dungeon.grid.length; i++) {
      if (dungeon.grid[i] === 0) floorCount++;
    }
    assert(floorCount > 50, 'BSP dungeon must carve floor space for gameplay');
  });

  runSuite('ProcGen / Cellular Automata Cave Generation', () => {
    const cave = new CellularAutomata(40, 40);
    cave.generate(0.45, 4);
    cave.ensureConnectivity();

    let openCells = 0;
    for (let i = 0; i < cave.grid.length; i++) {
      if (cave.grid[i] === 0) openCells++;
    }
    assert(openCells > 0, 'Cellular automata must produce traversable cave spaces');
  });

  runSuite('ProcGen / Loot Affix & Rarity Table Rolls', () => {
    const item = LootTableGenerator.rollItem(20, 10);
    assert(typeof item.name === 'string' && item.name.length > 0, 'Generated item must have a valid name');
    assert(item.itemLevel === 20, 'Item level must match roll input');
  });
}
