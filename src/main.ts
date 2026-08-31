/**
 * @file main.ts
 * @description Main web entrypoint mounting AetherEngine and launching Chronicles of Aetheria.
 */

import { GameApp } from './GameApp.ts';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas-render-target') as HTMLCanvasElement;
  const uiContainer = document.getElementById('ui-root') as HTMLElement;

  if (!canvas || !uiContainer) {
    console.error('Failed to locate canvas or UI root element');
    return;
  }

  const app = new GameApp(canvas, uiContainer);
  app.init();

  console.log('%c AetherEngine v1.0.0 Initialized Successfully ', 'background: #0284c7; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
});
