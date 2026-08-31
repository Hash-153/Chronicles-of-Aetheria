/**
 * @file EngineConfig.ts
 * @description Central runtime engine parameters, physics timestep, rendering resolution, and debug flags.
 */

export interface EngineConfiguration {
  targetFPS: number;
  fixedPhysicsDelta: number;
  maxSubSteps: number;
  pixelRatioLimit: number;
  enablePostProcessing: boolean;
  enableSpatialAudio: boolean;
  enableDebugWireframes: boolean;
}

export const DEFAULT_ENGINE_CONFIG: EngineConfiguration = {
  targetFPS: 60,
  fixedPhysicsDelta: 1 / 60,
  maxSubSteps: 4,
  pixelRatioLimit: 2.0,
  enablePostProcessing: true,
  enableSpatialAudio: true,
  enableDebugWireframes: false,
};
