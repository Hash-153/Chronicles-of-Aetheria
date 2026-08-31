/**
 * @file BiomeGenerator.ts
 * @description Multi-octave Perlin elevation & moisture biome classifier generating diverse wilderness zones.
 */

import { Noise } from '../core/math/Noise.ts';

export const BiomeType = {
  AetherialHighlands: 0,
  EnchantedForest: 1,
  VolcanicCaldera: 2,
  AncientCatacombs: 3,
  CrystalPlains: 4,
} as const;
export type BiomeType = typeof BiomeType[keyof typeof BiomeType];

export interface BiomeInfo {
  type: BiomeType;
  name: string;
  tileTheme: string;
  ambientLight: [number, number, number];
  monsterLevelRange: [number, number];
}

export class BiomeGenerator {
  private _elevationNoise: Noise;
  private _moistureNoise: Noise;

  constructor(seed = 42) {
    this._elevationNoise = new Noise(seed);
    this._moistureNoise = new Noise(seed + 100);
  }

  public getBiome(x: number, y: number, scale = 0.005): BiomeInfo {
    const elevation = this._elevationNoise.fractalNoise2D(x * scale, y * scale, 4, 2.0, 0.5);
    const moisture = this._moistureNoise.fractalNoise2D(x * scale, y * scale, 4, 2.0, 0.5);

    if (elevation > 0.3) {
      if (moisture > 0.1) {
        return {
          type: BiomeType.AetherialHighlands,
          name: 'Aetherial Highlands',
          tileTheme: 'highlands',
          ambientLight: [0.8, 0.85, 1.0],
          monsterLevelRange: [15, 25],
        };
      } else {
        return {
          type: BiomeType.VolcanicCaldera,
          name: 'Volcanic Caldera',
          tileTheme: 'volcanic',
          ambientLight: [1.0, 0.5, 0.3],
          monsterLevelRange: [30, 45],
        };
      }
    } else if (elevation > -0.2) {
      if (moisture > 0.0) {
        return {
          type: BiomeType.EnchantedForest,
          name: 'Enchanted Forest',
          tileTheme: 'forest',
          ambientLight: [0.4, 0.7, 0.5],
          monsterLevelRange: [1, 15],
        };
      } else {
        return {
          type: BiomeType.CrystalPlains,
          name: 'Crystal Plains',
          tileTheme: 'crystal',
          ambientLight: [0.7, 0.9, 1.0],
          monsterLevelRange: [10, 20],
        };
      }
    } else {
      return {
        type: BiomeType.AncientCatacombs,
        name: 'Ancient Catacombs',
        tileTheme: 'catacombs',
        ambientLight: [0.2, 0.2, 0.3],
        monsterLevelRange: [20, 35],
      };
    }
  }
}
