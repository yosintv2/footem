import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yosintv2.github.io',
  base: '/yosintv.blog',
  output: 'static',
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {},
});
