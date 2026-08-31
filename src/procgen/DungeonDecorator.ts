/**
 * @file DungeonDecorator.ts
 * @description Decorates generated dungeon rooms with interactive props (Chests, Torches, Destructible Barrels, Altars, Spikes).
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { type RoomRect } from './BSPDungeonGenerator.ts';

export const PropType = {
  Chest: 0,
  Torch: 1,
  Barrel: 2,
  Altar: 3,
  SpikeTrap: 4,
} as const;
export type PropType = typeof PropType[keyof typeof PropType];

export interface PlacedProp {
  type: PropType;
  position: Vector2;
}

export class DungeonDecorator {
  public static decorateRooms(rooms: RoomRect[], tileSize = 32): PlacedProp[] {
    const props: PlacedProp[] = [];

    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      const cx = (room.x + room.width * 0.5) * tileSize;
      const cy = (room.y + room.height * 0.5) * tileSize;

      // 1. Place corner wall torches
      props.push({ type: PropType.Torch, position: new Vector2((room.x + 1) * tileSize, (room.y + 1) * tileSize) });
      props.push({ type: PropType.Torch, position: new Vector2((room.x + room.width - 2) * tileSize, (room.y + 1) * tileSize) });

      // 2. Random Chests in rooms
      if (Math.random() < 0.4) {
        props.push({ type: PropType.Chest, position: new Vector2(cx, cy) });
      }

      // 3. Destructible barrels
      const barrelCount = Math.floor(Math.random() * 4);
      for (let b = 0; b < barrelCount; b++) {
        const bx = (room.x + 1 + Math.random() * (room.width - 2)) * tileSize;
        const by = (room.y + 1 + Math.random() * (room.height - 2)) * tileSize;
        props.push({ type: PropType.Barrel, position: new Vector2(bx, by) });
      }
    }

    return props;
  }
}
