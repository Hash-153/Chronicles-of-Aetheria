/**
 * @file Types.ts
 * @description Type definitions for the Entity-Component-System (ECS) architecture.
 */

export type EntityId = number;

/**
 * 64-bit combined entity ID: [32-bit Generation | 32-bit Index]
 */
export type EntityHandle = bigint;

export type ComponentTypeId = number;

export type ComponentConstructor<T = any> = new (...args: any[]) => T;

export const SystemPhase = {
  PreUpdate: 0,
  Physics: 1,
  Update: 2,
  Combat: 3,
  PostUpdate: 4,
  PreRender: 5,
  Render: 6,
  PostRender: 7,
  Diagnostics: 8,
} as const;
export type SystemPhase = typeof SystemPhase[keyof typeof SystemPhase];

export interface QueryFilter {
  all?: ComponentConstructor[];
  any?: ComponentConstructor[];
  none?: ComponentConstructor[];
}
