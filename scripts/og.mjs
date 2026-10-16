// Renders the per-locale Open Graph cards (1200x630) into public/og/ with headless Chrome.
// No dependencies: Node >= 22.18 (type stripping) and a local Chrome. Run from the repo root:
//   node scripts/og.mjs
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import en from '../src/i18n/en.ts';
import pt from '../src/i18n/pt.ts';
import es from '../src/i18n/es.ts';
import zh from '../src/i18n/zh.ts';

const chrome = process.env.CHROME ?? 'google-chrome';
const font = (pkg, file) => 'file://' + resolve('node_modules/@fontsource-variable', pkg, 'files', file);
const avatar = JSON.parse(readFileSync('src/scripts/avatar.json', 'utf8'));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

// the pixel avatar as one box-shadow per art pixel
const px = 9;
const shadows = [...avatar.data].flatMap((ch, i) => ch === '.' ? [] :
  [`${(i % avatar.w) * px}px ${Math.floor(i / avatar.w) * px}px #${avatar.palette[parseInt(ch, 36)]}`]).join(',');

const page = (t, lang) => `<!doctype html><html lang="${lang}"><meta charset="utf-8"><style>
@font-face{font-family:B;font-weight:200 800;font-stretch:75% 100%;src:url(${font('bricolage-grotesque', 'bricolage-grotesque-latin-standard-normal.woff2')})}
@font-face{font-family:G;font-weight:100 900;src:url(${font('geist', 'geist-latin-wght-normal.woff2')})}
@font-face{font-family:M;font-weight:100 900;src:url(${font('geist-mono', 'geist-mono-latin-wght-normal.woff2')})}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;background:#0B0E13;color:#E7EBF0;font-family:G,"Noto Sans CJK SC",sans-serif;
  background-image:radial-gradient(40% 60% at 80% 45%,#182233,transparent 72%)}
.card{position:absolute;inset:56px 64px;display:flex;flex-direction:column;justify-content:space-between;width:700px}
.mark{font:650 30px/1 B,"Noto Sans CJK SC",sans-serif;font-stretch:85%;letter-spacing:-.01em}
h1{font:650 76px/.98 B,"Noto Sans CJK SC",sans-serif;font-stretch:76%;letter-spacing:-.025em;text-wrap:balance}
:lang(zh) h1{font-size:64px;line-height:1.2;letter-spacing:0;word-break:keep-all}
p{margin-top:24px;font-size:24px;line-height:1.45;color:#A3ACB9}
.url{font:500 22px/1 M,monospace;color:#F2A93B}
.av{position:absolute;right:${116 + px}px;top:${108}px;width:${px}px;height:${px}px;box-shadow:${shadows}}
.av{transform:translateX(-${(avatar.w - 1) * px}px)}
</style><body><div class="card"><div class="mark">Hugo Barbosa</div><div><h1>${esc(t.hero.h1)}</h1><p>${esc(t.hero.sub).replace(/(UTC-\d+)/, '<span style="white-space:nowrap">$1</span>')}</p></div>
<div class="url">hugobsan.com.br</div></div><div class="av"></div></body></html>`;

const dir = mkdtempSync(join(tmpdir(), 'og-'));
mkdirSync('public/og', { recursive: true });
for (const [code, t, lang] of [['en', en, 'en'], ['pt', pt, 'pt-BR'], ['es', es, 'es'], ['zh', zh, 'zh-Hans']]) {
  const html = join(dir, `${code}.html`);
  writeFileSync(html, page(t, lang));
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--window-size=1200,630', '--virtual-time-budget=3000', `--screenshot=${resolve('public/og', code + '.png')}`, 'file://' + html], { stdio: 'ignore' });
  console.log('public/og/' + code + '.png');
}
