import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.yosintv.me',
  output: 'static',
  build: {
    format: 'directory',
  },
  integrations: [
    react(),
    sitemap({
      changefreq: 'hourly',
      lastmod: new Date(),
      serialize(item) {
        item.changefreq = 'hourly';
        return item;
      },
    }),
  ],
  vite: {},
});
