/**
 * @file InventorySystem.ts
 * @description Bag inventory management component supporting item insertion, stacking, sorting, and slot swapping.
 */

import { Component } from '../core/ecs/Component.ts';
import { type GeneratedItem } from '../procgen/LootTableGenerator.ts';

export class Inventory {
  public capacity: number;
  public items: (GeneratedItem | null)[];
  public gold = 0;

  constructor(capacity = 24) {
    this.capacity = capacity;
    this.items = new Array(capacity).fill(null);
  }

  public addItem(item: GeneratedItem): boolean {
    const emptyIdx = this.items.indexOf(null);
    if (emptyIdx === -1) return false; // Bag full

    this.items[emptyIdx] = item;
    return true;
  }

  public removeItemAt(index: number): GeneratedItem | null {
    if (index < 0 || index >= this.items.length) return null;
    const item = this.items[index];
    this.items[index] = null;
    return item;
  }

  public swapSlots(indexA: number, indexB: number): void {
    if (indexA < 0 || indexA >= this.items.length || indexB < 0 || indexB >= this.items.length) return;
    const temp = this.items[indexA];
    this.items[indexA] = this.items[indexB];
    this.items[indexB] = temp;
  }
}
