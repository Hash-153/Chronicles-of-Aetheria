/**
 * @file run_all_tests.ts
 * @description Comprehensive automated test harness running all unit, integration, and subsystem tests.
 */

import { runMathTests } from './math.test.ts';
import { runECSTests } from './ecs.test.ts';
import { runPhysicsTests } from './physics.test.ts';
import { runAITests } from './ai.test.ts';
import { runProcGenTests } from './procgen.test.ts';
import { runGameplayTests } from './gameplay.test.ts';

export function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`[TEST FAILED] ${message}`);
  }
}

export function runSuite(name: string, fn: () => void): void {
  const start = performance.now();
  try {
    fn();
    const duration = (performance.now() - start).toFixed(2);
    console.log(`\x1b[32m✔\x1b[0m [PASSED] ${name} (${duration}ms)`);
  } catch (e: any) {
    console.error(`\x1b[31m✖\x1b[0m [FAILED] ${name}: ${e.message}`);
    throw e;
  }
}

export function runAll(): void {
  console.log('\n========================================');
  console.log('   AETHER ENGINE - AUTOMATED TEST SUITE  ');
  console.log('========================================\n');

  runMathTests();
  runECSTests();
  runPhysicsTests();
  runAITests();
  runProcGenTests();
  runGameplayTests();

  console.log('\n\x1b[32m✔ ALL SUBSYSTEM TESTS PASSED CLEANLY!\x1b[0m\n');
}

runAll();
