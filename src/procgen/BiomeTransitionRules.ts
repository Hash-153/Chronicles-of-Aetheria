/**
 * @file BiomeTransitionRules.ts
 * @description Procedural edge smoothing rules and blending transitions between adjacent dungeon biomes.
 */

export interface BiomeTransitionMatrix {
  sourceBiome: string;
  targetBiome: string;
  blendingDistance: number;
  transitionTileIndices: number[];
  ambientColorBlend: string;
}

export const BIOME_TRANSITIONS: BiomeTransitionMatrix[] = [
  {
    sourceBiome: 'Crypt',
    targetBiome: 'MagmaChamber',
    blendingDistance: 8,
    transitionTileIndices: [12, 13, 14, 15],
    ambientColorBlend: '#451a03',
  },
  {
    sourceBiome: 'MagmaChamber',
    targetBiome: 'SunkenTemple',
    blendingDistance: 10,
    transitionTileIndices: [20, 21, 22, 23],
    ambientColorBlend: '#0c4a6e',
  },
  {
    sourceBiome: 'SunkenTemple',
    targetBiome: 'CelestialSpire',
    blendingDistance: 12,
    transitionTileIndices: [28, 29, 30, 31],
    ambientColorBlend: '#581c87',
  },
];
