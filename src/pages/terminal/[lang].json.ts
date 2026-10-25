import type { APIContext } from 'astro';
import { LOCALES, LANGS, type Lang } from '../../i18n';
import { SKILLS, EMAIL, LINKEDIN, GITHUB, ASK_MAX_CHARS } from '../../facts';

// What the terminal prints, one file per locale, fetched only when a visitor reaches for the terminal
// (Terminal.astro), so none of it weighs on the page. terminal.ts renders the lines.
// A line is a list of [text, class, href] segments. Classes: a accent, d dim, c command column.
type Line = [text: string, cls?: string, href?: string][];

export const getStaticPaths = () => LANGS.map((lang) => ({ params: { lang } }));

export function GET({ params }: APIContext) {
  const lang = params.lang as Lang;
  const t = LOCALES[lang].dict;
  const { term } = t;
  const { usage, examples, ...msgs } = term.ask; // usage and examples are the output of /ask alone
  const go = (id: string): Line[] => [[], [[term.goTo, '', `#${id}`]]];
  const bare = (url: string) => url.replace(/^https:\/\/(www\.)?/, '');
  const cmds = Object.keys(term.cmds) as (keyof typeof term.cmds)[];
  // the keys are the commands, in /help order; the dialog makes a chip of each
  const out: Record<string, Line[]> = {
    help: cmds.map((c) => [[`/${c}`, 'c'], [term.cmds[c], 'd']]),
    // /ask alone; with a question it goes to /api/ask (terminal.ts, ask.ts)
    ask: [[[usage, 'd']], ...examples.map((e): Line => [['/ask ', 'a'], [e]])],
    experience: [
      ...t.experience.items.map((j): Line => [[j.period, 'd'], [` · ${[j.role, j.org].filter(Boolean).join(' · ')}`]]),
      ...go('experience'),
    ],
    work: [
      ...[t.work.bluee, t.work.club, t.work.prp].flatMap((w, i): Line[] => [
        ...(i ? [[]] : []), [[w.name, 'a']], [[`${w.highlight.n} ${w.highlight.l}`]], [[w.lede, 'd']],
      ]),
      ...go('work'),
    ],
    skills: [
      ...(Object.keys(SKILLS) as (keyof typeof SKILLS)[]).flatMap((g): Line[] => [[[t.how.cats[g], 'a']], [[SKILLS[g].join(' · ')]]]),
      ...go('how'),
    ],
    education: [
      ...t.edu.items.map((e): Line => [[e.t], [` ${e.m}`, 'd']]),
      [], [[t.edu.projectsH, 'a']],
      ...t.edu.projects.map((r): Line => [[r.t], [` ${r.m}`, 'd']]),
      [], [[`${t.edu.pubH}: `, 'a'], [String(t.edu.pubs.length)]],
      [], [[t.contact.langH, 'a']],
      ...t.contact.langs.map((l): Line => [[l.name], [` ${l.level}`, 'd']]),
      ...go('education'),
    ],
    contact: [
      [[EMAIL, '', `mailto:${EMAIL}`]], [[bare(LINKEDIN), '', LINKEDIN]], [[bare(GITHUB), '', GITHUB]],
      ...go('contact'),
    ],
    // like git branch: the current one is starred
    language: [
      ...LANGS.map((l): Line => [[`${l === lang ? '*' : ' '} ${l}`, l === lang ? 'c a' : 'c'], [LOCALES[l].name, l === lang ? '' : 'd']]),
      [], [[term.langUsage, 'd']],
    ],
  };
  const data = {
    out,
    intro: [[[t.hero.eyebrow, 'a']], [[term.welcome, 'd']], []],
    lang,
    langs: Object.fromEntries(LANGS.map((l) => [l, [LOCALES[l].name, LOCALES[l].path]])),
    close: term.close, input: term.input, tip: term.tip,
    notFound: term.notFound, langNow: term.langNow, langSwitch: term.langSwitch, langUsage: term.langUsage,
    ask: { ...msgs, max: ASK_MAX_CHARS, email: EMAIL, linkedin: LINKEDIN }, // ask.ts links {email} and {linkedin}
  };
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
