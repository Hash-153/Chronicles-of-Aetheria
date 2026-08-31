/**
 * @file EditorKeyboardShortcuts.ts
 * @description In-engine hotkey map and keybinding registry for level editing tools.
 */

export const EDITOR_KEYBINDINGS: Record<string, string> = {
  'Ctrl+Z': 'Undo',
  'Ctrl+Y': 'Redo',
  'Ctrl+S': 'SaveDungeon',
  'B': 'PaintBrush',
  'E': 'Eraser',
  'G': 'ToggleGrid',
  'L': 'ToggleLighting',
};
