import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://play.cricfoot.net',
  output: 'static',
  build: {
    format: 'directory',
  },
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {},
});
