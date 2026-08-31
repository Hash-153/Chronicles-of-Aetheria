/**
 * @file LootDropSystem.ts
 * @description World physical loot pickup drops with magnetic player attraction and inventory collection.
 */

import { Vector2 } from '../core/math/Vector2.ts';
import { Component } from '../core/ecs/Component.ts';
import { System } from '../core/ecs/System.ts';
import { SystemPhase } from '../core/ecs/Types.ts';
import { type GeneratedItem } from '../procgen/LootTableGenerator.ts';
import { Transform2D } from '../core/math/Transform2D.ts';
import { PlayerInput } from './PlayerController.ts';
import { Inventory } from './InventorySystem.ts';
import { SoundFXGenerator } from '../audio/SoundFXGenerator.ts';

export class LootDrop {
  public item: GeneratedItem;
  public pickupRadius = 40;
  public magnetRadius = 140;
  public magnetSpeed = 250;

  constructor(item: GeneratedItem) {
    this.item = item;
  }
}

export class LootDropSystem extends System {
  public phase = SystemPhase.Update;
  public priority = 70;

  public override update(dt: number): void {
    const playerQuery = this.world.createQuery({ all: [Transform2D, PlayerInput, Inventory] });
    let playerPos: Vector2 | null = null;
    let playerInv: Inventory | null = null;

    playerQuery.forEach((id, pTrans: Transform2D, pInput: PlayerInput, inv: Inventory) => {
      playerPos = pTrans.position;
      playerInv = inv;
    }, [Transform2D, PlayerInput, Inventory]);

    if (!playerPos || !playerInv) return;

    const lootQuery = this.world.createQuery({ all: [Transform2D, LootDrop] });

    lootQuery.forEach((lootId, transform: Transform2D, loot: LootDrop) => {
      const dist = transform.position.distanceTo(playerPos!);

      // Magnetic attraction
      if (dist <= loot.magnetRadius && dist > loot.pickupRadius) {
        const pullDir = playerPos!.subtract(transform.position).normalize();
        transform.position.addSelf(pullDir.scale(loot.magnetSpeed * dt));
      }

      // Collect item into inventory
      if (dist <= loot.pickupRadius) {
        if (playerInv!.addItem(loot.item)) {
          SoundFXGenerator.playCoinPickup();
          this.commands.destroyEntity(lootId);
        }
      }
    }, [Transform2D, LootDrop]);
  }
}
