/**
 * @file FormationController.ts
 * @description Squad movement and military unit formation coordinator (Wedge, Line, Column, Circle).
 */

import { Vector2 } from '../core/math/Vector2.ts';

export const FormationType = {
  Wedge: 0,
  Line: 1,
  Column: 2,
  Circle: 3,
} as const;
export type FormationType = typeof FormationType[keyof typeof FormationType];

export class FormationController {
  public static getSlotOffset(type: FormationType, slotIndex: number, spacing = 40): Vector2 {
    if (slotIndex === 0) return new Vector2(0, 0); // Leader

    switch (type) {
      case FormationType.Wedge: {
        const side = slotIndex % 2 === 1 ? -1 : 1;
        const row = Math.ceil(slotIndex / 2);
        return new Vector2(side * row * spacing, -row * spacing);
      }
      case FormationType.Line: {
        const side = slotIndex % 2 === 1 ? -1 : 1;
        const col = Math.ceil(slotIndex / 2);
        return new Vector2(side * col * spacing, 0);
      }
      case FormationType.Column: {
        return new Vector2(0, -slotIndex * spacing);
      }
      case FormationType.Circle: {
        const angle = (slotIndex / 8) * Math.PI * 2;
        return new Vector2(Math.cos(angle) * spacing * 2, Math.sin(angle) * spacing * 2);
      }
    }
  }
}
