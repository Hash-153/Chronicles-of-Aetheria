/**
 * @file Component.ts
 * @description Base component interface and metadata decorator for registering ECS components.
 */

import { type ComponentTypeId, type ComponentConstructor } from './Types.ts';
import { ComponentRegistry } from './ComponentRegistry.ts';

export interface IComponent {
  // Marker interface for type safety
}

/**
 * Decorator to automatically register a class as a high-performance ECS Component.
 */
export function Component(name?: string) {
  return function <T extends ComponentConstructor>(constructor: T): T {
    ComponentRegistry.register(constructor, name || constructor.name);
    return constructor;
  };
}
