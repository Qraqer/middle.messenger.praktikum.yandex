import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import path from 'path';
import checker from 'vite-plugin-checker';

export default defineConfig({
  base: './',
  resolve: {
      alias: {
          '@': path.resolve(__dirname, './src'),
      }
  },
  plugins: [
    handlebars(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "**/*.ts"'
      },
      stylelint: {
        lintCommand: 'npx stylelint **/*.scss'
      }
    })
  ],
})
