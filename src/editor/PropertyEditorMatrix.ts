/**
 * @file PropertyEditorMatrix.ts
 * @description In-engine component field reflection, numeric stepper inputs, color pickers, and live attribute tweaking.
 */

export interface ComponentFieldDescriptor {
  name: string;
  type: 'number' | 'string' | 'boolean' | 'color' | 'vector2';
  min?: number;
  max?: number;
  step?: number;
}

export class PropertyEditorMatrix {
  public static getFieldDescriptors(componentName: string): ComponentFieldDescriptor[] {
    switch (componentName) {
      case 'Transform2D':
        return [
          { name: 'position', type: 'vector2' },
          { name: 'rotation', type: 'number', min: -Math.PI, max: Math.PI, step: 0.05 },
          { name: 'scale', type: 'vector2' },
        ];
      case 'Attributes':
        return [
          { name: 'maxHealth', type: 'number', min: 1, max: 999999, step: 10 },
          { name: 'currentHealth', type: 'number', min: 0, max: 999999, step: 10 },
          { name: 'attackPower', type: 'number', min: 0, max: 9999, step: 1 },
          { name: 'moveSpeed', type: 'number', min: 10, max: 1000, step: 5 },
        ];
      case 'Light2D':
        return [
          { name: 'radius', type: 'number', min: 20, max: 1000, step: 10 },
          { name: 'intensity', type: 'number', min: 0.1, max: 5.0, step: 0.1 },
          { name: 'color', type: 'color' },
          { name: 'flickering', type: 'boolean' },
        ];
      default:
        return [];
    }
  }
}
