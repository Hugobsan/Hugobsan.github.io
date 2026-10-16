import en from '../i18n/en';
import { LOCALES, LANGS } from '../i18n';
import { SITE, EMAIL, LINKEDIN, GITHUB, CLUB, LINKS } from '../facts';

// Curated index for LLM tools (llmstxt.org). The full profile lives in /llms-full.txt.
export function GET() {
  const body = `# Hugo Barbosa

> ${en.meta.description}

Hugo Barbosa Santos (Hugobsan). ${en.hero.sub}

## Profile

- [Full profile in markdown](${SITE}/llms-full.txt): work, research, publications, education, skills and contact
${LANGS.map((l) => `- [Website (${LOCALES[l].html})](${SITE}${LOCALES[l].path})`).join('\n')}

## Selected work

- [${en.work.club.name}](${CLUB}): ${en.work.club.lede}

## Research

- [Research and publications](${SITE}/llms-full.txt): LLM agents for software bug localization (UNIMONTES, 2024 to now), with MRR results, plus research projects and papers

## Contact

- [Email](mailto:${EMAIL})
- [LinkedIn](${LINKEDIN})
- [GitHub](${GITHUB})

## Optional

${Object.entries(en.side.featured)
  .filter(([id]) => LINKS[id])
  .map(([id, p]) => `- [${p.name}](${LINKS[id]!.at(-1)!.href}): ${p.text}`)
  .join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
