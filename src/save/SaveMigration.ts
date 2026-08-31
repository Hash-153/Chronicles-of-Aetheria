/**
 * @file SaveMigration.ts
 * @description Version migration pipeline upgrading legacy save data to the latest engine schemas.
 */

import { type SerializedWorldSave } from './GameStateSerializer.ts';

export type MigrationStep = (saveData: any) => any;

export class SaveMigration {
  private static _migrations: Map<string, MigrationStep> = new Map();

  public static registerMigration(fromVersion: string, step: MigrationStep): void {
    this._migrations.set(fromVersion, step);
  }

  public static migrate(data: any, targetVersion = '1.0.0'): SerializedWorldSave {
    let currentData = data;
    while (currentData.version !== targetVersion) {
      const step = this._migrations.get(currentData.version);
      if (!step) {
        break; // No migration available, use as is
      }
      currentData = step(currentData);
    }
    return currentData as SerializedWorldSave;
  }
}
