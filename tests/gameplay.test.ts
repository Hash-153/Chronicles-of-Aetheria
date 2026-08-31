/**
 * @file gameplay.test.ts
 * @description Unit tests for RPG combat formulas, attribute derivations, level up XP curves, and inventory management.
 */

import { assert, runSuite } from './run_all_tests.ts';
import { Attributes } from '../src/gameplay/Attributes.ts';
import { DamageCalculator, DamageType } from '../src/gameplay/DamageCalculator.ts';
import { LevelProgression } from '../src/gameplay/LevelProgression.ts';
import { Inventory } from '../src/gameplay/InventorySystem.ts';
import { LootTableGenerator } from '../src/procgen/LootTableGenerator.ts';

export function runGameplayTests(): void {
  runSuite('Gameplay / Attributes & Secondary Stats Derivations', () => {
    const attrs = new Attributes({
      vitality: 20,
      strength: 15,
      agility: 10,
    });

    assert(attrs.maxHealth === 50 + 20 * 10, 'Health derivation formula incorrect');
    assert(attrs.attackPower === 15 * 2 + 10, 'Attack power derivation formula incorrect');
  });

  runSuite('Gameplay / Damage Mitigation & Critical Strikes', () => {
    const attacker = new Attributes({ strength: 20, agility: 20 });
    const defender = new Attributes({ armor: 200, fireResistance: 50 });

    const physResult = DamageCalculator.calculate({
      baseAmount: 100,
      type: DamageType.Physical,
      attackerStats: attacker,
      canCrit: false,
    }, defender);

    // Armor 200 => 200 / (200 + 200) = 50% mitigation
    assert(physResult.mitigatedAmount > 0, 'Armor must mitigate physical damage');

    const fireResult = DamageCalculator.calculate({
      baseAmount: 100,
      type: DamageType.Fire,
      attackerStats: attacker,
      canCrit: false,
    }, defender);

    assert(fireResult.mitigatedAmount > 0, 'Fire resistance must reduce fire damage');
  });

  runSuite('Gameplay / Level Progression Scaling', () => {
    const attrs = new Attributes();
    const level = new LevelProgression();

    const leveledUp = level.addXP(150, attrs);
    assert(leveledUp, '150 XP must trigger level up from initial 100 max XP');
    assert(level.currentLevel === 2, 'Player level must be 2');
    assert(level.unallocatedStatPoints === 5, 'Level up must award 5 stat points');
  });

  runSuite('Gameplay / Inventory Slot Swapping & Full Bag Detection', () => {
    const inv = new Inventory(2);
    const item1 = LootTableGenerator.rollItem(1);
    const item2 = LootTableGenerator.rollItem(1);
    const item3 = LootTableGenerator.rollItem(1);

    assert(inv.addItem(item1), 'First item must fit in bag');
    assert(inv.addItem(item2), 'Second item must fit in bag');
    assert(!inv.addItem(item3), 'Third item must fail when bag capacity is 2');

    inv.swapSlots(0, 1);
    assert(inv.items[0] === item2 && inv.items[1] === item1, 'Item slots should be swapped');
  });
}
