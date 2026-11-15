import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://conradlinusmuhirwe.netlify.app',
  trailingSlash: 'never',
  build: { format: 'file' },
});
