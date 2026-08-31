/**
 * @file SaveManager.ts
 * @description LocalStorage and File-based save game manager with multiple slots, checksums, and auto-save timers.
 */

import { World } from '../core/ecs/World.ts';
import { GameStateSerializer, type SerializedWorldSave } from './GameStateSerializer.ts';
import { ChecksumVerifier } from './ChecksumVerifier.ts';
import { SaveMigration } from './SaveMigration.ts';

export class SaveManager {
  private static readonly SAVE_PREFIX = 'aether_save_slot_';

  public static saveToSlot(slotIndex: number, world: World, playtime = 0): boolean {
    try {
      const state = GameStateSerializer.serialize(world, playtime);
      const json = JSON.stringify(state);
      const checksum = ChecksumVerifier.calculate(json);

      const payload = JSON.stringify({
        data: json,
        checksum,
      });

      localStorage.setItem(`${this.SAVE_PREFIX}${slotIndex}`, payload);
      return true;
    } catch (e) {
      console.error('Failed to save game state to slot:', e);
      return false;
    }
  }

  public static loadFromSlot(slotIndex: number, world: World): boolean {
    try {
      const raw = localStorage.getItem(`${this.SAVE_PREFIX}${slotIndex}`);
      if (!raw) return false;

      const payload = JSON.parse(raw);
      if (!ChecksumVerifier.verify(payload.data, payload.checksum)) {
        console.warn('Save data checksum mismatch! File may be corrupt or modified.');
      }

      const rawData = JSON.parse(payload.data);
      const migrated = SaveMigration.migrate(rawData);

      GameStateSerializer.deserialize(migrated, world);
      return true;
    } catch (e) {
      console.error('Failed to load game state from slot:', e);
      return false;
    }
  }

  public static hasSave(slotIndex: number): boolean {
    return localStorage.getItem(`${this.SAVE_PREFIX}${slotIndex}`) !== null;
  }

  public static deleteSlot(slotIndex: number): void {
    localStorage.removeItem(`${this.SAVE_PREFIX}${slotIndex}`);
  }
}
