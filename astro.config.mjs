import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.yosintv.net',
  output: 'static',
  build: {
    format: 'file',
  },
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {},
});
