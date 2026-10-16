# hugobsan.com.br

Hugo Barbosa's portfolio: a static [Astro](https://astro.build) site in English, Portuguese, Spanish and Chinese
(`/`, `/pt/`, `/es/`, `/zh/`), with a Three.js particle scene that changes shape chapter by chapter.

- Copy: `docs/COPY*.md` is the source; the site text lives in `src/i18n/{en,pt,es,zh}.ts` (every locale is type-checked against `en.ts`). Fixed facts (links, numbers, email) are in `src/facts.ts`.
- 3D and scroll motion (`src/scripts/`) load on idle, only with a hardware GPU and without reduced motion. Everything else is plain HTML and CSS.
- No third-party requests at page load: fonts and scripts are self-hosted, so the site also works from mainland China.

## Develop

```sh
npm install
npm run dev       # http://localhost:4321
npm run check     # astro check (types, missing translation keys)
npm run build     # static site in dist/
npm run preview
```

Assets made once and committed: `node scripts/og.mjs` renders the Open Graph cards in `public/og/` (needs Chrome);
`python3 scripts/avatar.py 37 48` turns `src/assets/profile.png` (37x48 art pixels) into the particle avatar and the favicons (needs Pillow).

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds with `withastro/action` and publishes to GitHub Pages
(Cloudflare sits in front). Pull requests run `quality.yml`: `astro check`, build, dash and third-party checks,
JS and font budgets, and Lighthouse CI on the four locales (`lighthouserc.json`).
