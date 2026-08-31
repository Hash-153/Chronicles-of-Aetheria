/**
 * @file CraftingSystem.ts
 * @description Blacksmith crafting and transmutation recipe registry with material requirement validation.
 */

import { type GeneratedItem, ItemRarity, ItemSlot } from '../procgen/LootTableGenerator.ts';

export interface CraftingRecipe {
  id: string;
  resultName: string;
  slot: ItemSlot;
  rarity: ItemRarity;
  requiredGold: number;
  requiredMaterials: { materialId: string; count: number }[];
  baseStats: Record<string, number>;
}

export class CraftingSystem {
  public recipes: Map<string, CraftingRecipe> = new Map();

  constructor() {
    this._registerDefaultRecipes();
  }

  public registerRecipe(recipe: CraftingRecipe): void {
    this.recipes.set(recipe.id, recipe);
  }

  public craft(recipeId: string, playerGold: number, inventoryMaterials: Map<string, number>): GeneratedItem | null {
    const recipe = this.recipes.get(recipeId);
    if (!recipe) return null;

    if (playerGold < recipe.requiredGold) return null;

    for (const req of recipe.requiredMaterials) {
      const current = inventoryMaterials.get(req.materialId) || 0;
      if (current < req.count) return null;
    }

    // Deduct materials
    for (const req of recipe.requiredMaterials) {
      inventoryMaterials.set(req.materialId, inventoryMaterials.get(req.materialId)! - req.count);
    }

    return {
      name: recipe.resultName,
      slot: recipe.slot,
      rarity: recipe.rarity,
      itemLevel: 25,
      baseDamage: recipe.baseStats.damage || 0,
      baseArmor: recipe.baseStats.armor || 0,
      stats: { ...recipe.baseStats },
      affixes: [],
      sockets: recipe.rarity >= ItemRarity.Rare ? 2 : 1,
    };
  }

  private _registerDefaultRecipes(): void {
    this.registerRecipe({
      id: 'sword_sunfire',
      resultName: 'Sunfire Greatsword',
      slot: ItemSlot.Weapon,
      rarity: ItemRarity.Epic,
      requiredGold: 500,
      requiredMaterials: [
        { materialId: 'aether_ingot', count: 4 },
        { materialId: 'fire_core', count: 2 },
      ],
      baseStats: { damage: 75, strength: 18, fireDamage: 30 },
    });

    this.registerRecipe({
      id: 'armor_astral',
      resultName: 'Astral Plate',
      slot: ItemSlot.Armor,
      rarity: ItemRarity.Legendary,
      requiredGold: 1200,
      requiredMaterials: [
        { materialId: 'celestial_shard', count: 5 },
        { materialId: 'aether_ingot', count: 8 },
      ],
      baseStats: { armor: 120, vitality: 35, maxHealth: 150 },
    });
  }
}
