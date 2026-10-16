import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hugobsan.com.br',
  trailingSlash: 'always',
  // one page per locale: inlining the stylesheet removes the only render-blocking request
  build: { inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', pt: 'pt-BR', es: 'es', zh: 'zh-Hans' } },
    }),
  ],
});
