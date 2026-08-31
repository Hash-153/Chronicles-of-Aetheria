import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: './',
  resolve: {
    alias: {
      '@core': resolve(__dirname, 'src/core'),
      '@physics': resolve(__dirname, 'src/physics'),
      '@renderer': resolve(__dirname, 'src/renderer'),
      '@particles': resolve(__dirname, 'src/particles'),
      '@audio': resolve(__dirname, 'src/audio'),
      '@ai': resolve(__dirname, 'src/ai'),
      '@procgen': resolve(__dirname, 'src/procgen'),
      '@ui': resolve(__dirname, 'src/ui'),
      '@gameplay': resolve(__dirname, 'src/gameplay'),
      '@save': resolve(__dirname, 'src/save'),
      '@editor': resolve(__dirname, 'src/editor'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: 'es2022',
    outDir: 'dist',
    sourcemap: true,
  },
});
