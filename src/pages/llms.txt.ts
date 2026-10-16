import en from '../i18n/en';
import { LOCALES, LANGS } from '../i18n';
import { SITE, EMAIL, LINKEDIN, GITHUB, CLUB, LINKS } from '../facts';

// Curated index for LLM tools (llmstxt.org). The full profile lives in /llms-full.txt.
export function GET() {
  const body = `# Hugo Barbosa

> ${en.meta.description}

Hugo Barbosa Santos (Hugobsan), based in Brazil (UTC-3). ${en.hero.sub}

## Profile

- [Full profile in markdown](${SITE}/llms-full.txt): work, research, publications, education, skills and contact
${LANGS.map((l) => `- [Website (${LOCALES[l].html})](${SITE}${LOCALES[l].path})`).join('\n')}

## Selected work

- [${en.work.club.name}](${CLUB}): ${en.work.club.lede}

## Research

- [Bug localization results and publications](${SITE}/llms-full.txt): ${en.edu.research}

## Contact

- [Email](mailto:${EMAIL})
- [LinkedIn](${LINKEDIN})
- [GitHub](${GITHUB})

## Optional

${Object.entries({ ...en.side.featured, ...en.side.more })
  .filter(([id]) => LINKS[id])
  .map(([id, p]) => `- [${p.name}](${LINKS[id]!.at(-1)!.href}): ${p.text}`)
  .join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
