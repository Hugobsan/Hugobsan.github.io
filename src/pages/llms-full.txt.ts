import en from '../i18n/en';
import pt from '../i18n/pt';
import { SITE, EMAIL, LINKEDIN, GITHUB, GREENN, CLUB, MRR, STACKS, LINKS, KNOWS_ABOUT } from '../facts';

// Complete English profile in markdown, generated from the same copy and facts as the site.
const list = (items: string[]) => items.map((i) => `- ${i}`).join('\n');
const links = (id: string) => (LINKS[id] ?? []).map((l) => `[${l.label}](${l.href})`).join(', ');
const w = en.work;

export function GET() {
  const body = `# Hugo Barbosa Santos (Hugobsan)

> ${en.meta.description}

- Role: Tech Lead at [Greenn](${GREENN})
- Location: Montes Claros, MG, Brazil (UTC-3)
- Email: ${EMAIL}
- LinkedIn: ${LINKEDIN}
- GitHub: ${GITHUB}
- Website: ${SITE}/ (also in Portuguese, Spanish and Chinese at /pt/, /es/ and /zh/)
- ${en.contact.langH}: ${en.contact.langs.map((l) => `${l.name} (${l.level})`).join(', ')}

${en.hero.h1} ${en.hero.sub}

## ${en.offers.h}

${list(en.offers.items.map((o) => `**${o.t}** ${o.d}`))}

${list(en.offers.proof.map((p) => `**${p.t}** ${p.d}`))}

## ${w.h}

### ${w.bluee.name} (discontinued, no public link)

${w.bluee.lede}

${w.bluee.role}

Highlight: **${w.bluee.highlight.n}** ${w.bluee.highlight.l}

${list(w.bluee.bullets)}

Stack: ${STACKS.bluee.join(', ')}

### ${w.club.name} (${CLUB})

${w.club.lede}

${w.club.role}

Highlight: **${w.club.highlight.n}** ${w.club.highlight.l}

${list(w.club.bullets)}

Stack: ${STACKS.club.join(', ')}

### ${w.prp.name} (${w.prp.note.toLowerCase()})

${w.prp.lede}

${w.prp.role}

Highlight: **${w.prp.highlight.n}** ${w.prp.highlight.l}

${list(w.prp.bullets)}

Stack: ${STACKS.prp.join(', ')}

## ${en.experience.h}

${en.experience.items.map((j) => `### ${[j.period, j.role, j.org].filter(Boolean).join(' · ')}\n\n${list(j.bullets)}`).join('\n\n')}

## ${en.how.h}

${en.how.principles.map((p, i) => `${i + 1}. **${p.t}** ${p.d}`).join('\n')}

${en.how.toolH}: ${en.how.tool}

${en.how.learnH}: ${en.how.learn}

## ${en.side.h}

${Object.entries(en.side.featured).map(([id, p]) => `### ${p.name}\n\n${p.text}${LINKS[id] ? `\n\nLinks: ${links(id)}` : ''}`).join('\n\n')}

## ${en.edu.h}

${list(en.edu.items.map((e) => `${e.t} ${e.m}`))}

## ${en.edu.researchH}

${en.edu.research}

Given a bug report, which method in the code is broken? Each approach is measured by Mean Reciprocal Rank on ArgoUML 0.22:

| Approach | MRR |
| --- | --- |
${MRR.map(([approach, mrr]) => `| ${approach} | ${mrr.toFixed(4)} |`).join('\n')}

The hybrid approach scores 75% above the best embedding model and doubles the classic baseline.

## ${en.edu.pubH}

${en.edu.pubNote}

${list(en.edu.pubs.map((p, i) => `${p.t} ${p.v}. Original title: "${pt.edu.pubs[i].t}"`))}

## Skills

${[...new Set([...KNOWS_ABOUT, ...STACKS.bluee, ...STACKS.club, ...STACKS.prp])].join(', ')}

## Contact

${en.contact.h} ${en.contact.sub}

- Email: ${EMAIL}
- LinkedIn: ${LINKEDIN}
- GitHub: ${GITHUB}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
