import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  publicDir: 'static', // Default location for static files
  base: '/final209working/',  // Add this line to specify the base path for GitHub Pages
  
});
