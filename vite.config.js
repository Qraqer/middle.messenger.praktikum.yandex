import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import path from 'path';

export default defineConfig({
  base: './',
  resolve: {
      alias: {
          '@': path.resolve(__dirname, './src'),
      }
  },
  plugins: [handlebars()],
})
