import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hugobsan.com.br',
  trailingSlash: 'always',
  // one page per locale: inlining the stylesheet removes the only render-blocking request
  build: { inlineStylesheets: 'always' },
  // the three.js chunk is ~540 KB raw (~135 KB gzip) and only loads on idle with a hardware GPU
  vite: { build: { chunkSizeWarningLimit: 600 } },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: { defaultLocale: 'en', locales: { en: 'en', pt: 'pt-BR', es: 'es', zh: 'zh-Hans' } },
    }),
  ],
});
