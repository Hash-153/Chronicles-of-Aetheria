/**
 * @file EditorState.ts
 * @description State container for in-engine Level Editor, selected entities, active tools, and edit modes.
 */

export const EditorMode = {
  Play: 0,
  Edit: 1,
  Pause: 2,
} as const;
export type EditorMode = typeof EditorMode[keyof typeof EditorMode];

export const EditorTool = {
  Select: 0,
  Translate: 1,
  Rotate: 2,
  PaintTiles: 3,
  EraseTiles: 4,
} as const;
export type EditorTool = typeof EditorTool[keyof typeof EditorTool];

export class EditorState {
  public mode = EditorMode.Play;
  public activeTool = EditorTool.Select;
  public selectedEntityId: number | null = null;
  public activeTileId = 1;
  public brushSize = 1;
  public showGizmos = true;
  public showPhysicsBounds = false;
  public showProfiler = true;
}
