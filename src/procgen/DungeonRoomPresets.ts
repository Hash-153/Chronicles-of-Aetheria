/**
 * @file DungeonRoomPresets.ts
 * @description Handcrafted room templates, puzzle chambers, and boss arena layouts for procedural BSP insertion.
 */

export interface RoomPreset {
  id: string;
  name: string;
  width: number;
  height: number;
  layout: number[];
  spawnPoints: { x: number; y: number; type: string }[];
}

export const ROOM_PRESETS: RoomPreset[] = [
  {
    id: 'arena_boss_01',
    name: 'Sanctum of the Lich King',
    width: 14,
    height: 14,
    layout: new Array(14 * 14).fill(0),
    spawnPoints: [
      { x: 7, y: 7, type: 'Boss' },
      { x: 3, y: 3, type: 'Torch' },
      { x: 10, y: 3, type: 'Torch' },
      { x: 3, y: 10, type: 'Torch' },
      { x: 10, y: 10, type: 'Torch' },
    ],
  },
];
