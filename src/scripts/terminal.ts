import { state } from './state';
// ?inline: kept out of the page's inline styles (see fx.ts), in place before the dialog is built
import css from '../styles/terminal.css?inline';
document.head.append(Object.assign(document.createElement('style'), { textContent: css }));

// Interactive terminal. Terminal.astro ships only the button and loads this module with /terminal/{lang}.json
// (src/pages/terminal), which holds everything the commands print; this file builds the dialog on first open,
// renders lines, parses input and handles /language.
// A line is a list of [text, class, href] segments.
type Line = [text: string, cls?: string, href?: string][];
type Data = {
  out: Record<string, Line[]>; // command -> output; also the chips
  intro: Line[];
  lang: string;
  langs: Record<string, [name: string, path: string]>;
  close: string; input: string;
  notFound: string; langNow: string; langSwitch: string; langUsage: string;
};

const fab = document.querySelector<HTMLButtonElement>('.term-fab')!;
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const hist: string[] = [];
let at = 0;
let typing = false;
// set by build() on first open
let d: Data;
let dlg: HTMLDialogElement;
let log: HTMLElement;
let input: HTMLInputElement;

const fill = (s: string, v: string) => s.replace(/\{\w+\}/, v);
const echo = (cmd: string): Line => [['hugobsan:~$ ', 'ps'], [cmd]];

const print = (lines: Line[]) => {
  const els = lines.map((segs, i) => {
    const p = document.createElement('p');
    for (const [text, cls, href] of segs) {
      const el = document.createElement(href ? 'a' : 'span');
      el.textContent = text;
      if (cls) el.className = cls;
      if (href) {
        el.setAttribute('href', href);
        if (href.startsWith('http')) Object.assign(el, { target: '_blank', rel: 'noopener' });
      }
      p.append(el);
    }
    if (!reduce.matches) p.animate({ opacity: [0, 1], transform: ['translateY(4px)', 'none'] }, { duration: 260, delay: i * 25, easing: 'ease-out', fill: 'backwards' });
    return p;
  });
  log.append(...els);
  // the browser clamps this: output that fits leaves the log at the bottom, longer output starts at its first line
  log.scrollTop = els[0]!.offsetTop;
};

const language = (code: string): Line[] => {
  if (!Object.hasOwn(d.langs, code)) return [[[d.langUsage, 'd']]];
  const [name, path] = d.langs[code]!;
  if (code === d.lang) return [[[fill(d.langNow, name)]]];
  // same as the nav switcher, plus a flag so the next page reopens the terminal
  try {
    localStorage.setItem('lang', code);
    sessionStorage.setItem('term-open', '1');
  } catch { /* storage blocked */ }
  location.assign(path + location.hash);
  return [[[fill(d.langSwitch, name), 'd']]];
};

const run = (raw: string) => {
  const line = raw.trim();
  if (line) hist.push(line);
  at = hist.length;
  const [word = '', arg] = line.split(/\s+/);
  let cmd = word.replace(/^\//, '').toLowerCase();
  if (cmd === '?' || cmd === 'ls') cmd = 'help';
  if (cmd === 'clear') return log.replaceChildren();
  const out: Line[] =
    !line || cmd === 'exit' ? [] :
    cmd === 'language' && arg ? language(arg.toLowerCase()) :
    Object.hasOwn(d.out, cmd) ? d.out[cmd]! :
    [[[fill(d.notFound, word)]]];
  print([echo(line), ...out]);
  if (cmd === 'exit') close();
};

// sync start: a section link's click goes on to the page's handler, which scrolls with Lenis right away
const close = () => {
  dlg.close();
  state.lenis?.start();
};

const build = (data: Data) => {
  d = data;
  dlg = document.createElement('dialog');
  dlg.id = 'term';
  dlg.className = 'term';
  dlg.setAttribute('aria-labelledby', 'term-title');
  // static markup only: everything from the data goes in below through attributes and textContent
  dlg.innerHTML = '<div class="term__bar"><span class="term__dots" aria-hidden="true"><i></i><i></i><i></i></span>'
    + '<p class="term__title" id="term-title">hugobsan: ~</p><button class="term__close" type="button">'
    + '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>'
    + '<div class="term__log" role="log" aria-live="polite" data-lenis-prevent></div><div class="term__chips"></div>'
    + '<form class="term__line"><span class="term__ps" aria-hidden="true">hugobsan:~$</span>'
    + '<input type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="send"></form>';
  log = dlg.querySelector('.term__log')!;
  input = dlg.querySelector('input')!;
  dlg.querySelector('.term__close')!.setAttribute('aria-label', d.close);
  input.setAttribute('aria-label', d.input);
  dlg.querySelector('.term__chips')!.append(...Object.keys(d.out).map((c) =>
    Object.assign(document.createElement('button'), { type: 'button', textContent: `/${c}` })));
  fab.after(dlg);
  fab.setAttribute('aria-controls', dlg.id);
  const names = [...Object.keys(d.out), 'clear', 'exit'];

  dlg.addEventListener('close', () => state.lenis?.start()); // Esc

  dlg.addEventListener('click', async (e) => {
    const t = e.target as Element;
    if (t === dlg || t.closest('.term__close, a[href^="#"]')) return close(); // backdrop, close button, section link
    const chip = t.closest('.term__chips button');
    if (!chip || typing) return;
    // the chip types its command, then runs it
    typing = true;
    const cmd = chip.textContent!.trim();
    input.value = '';
    if (!reduce.matches) {
      for (const c of cmd) {
        input.value += c;
        await new Promise((r) => setTimeout(r, 25));
      }
    }
    run(cmd);
    input.value = '';
    typing = false;
  });

  dlg.querySelector('form')!.addEventListener('submit', (e) => {
    e.preventDefault();
    run(input.value);
    input.value = '';
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      at = Math.max(0, Math.min(hist.length, at + (e.key === 'ArrowUp' ? -1 : 1)));
      input.value = hist[at] ?? '';
    } else if (e.key === 'Tab' && !e.shiftKey) {
      // complete a unique prefix; otherwise Tab keeps moving focus
      const v = input.value.trim().replace(/^\//, '').toLowerCase();
      const m = names.filter((n) => n.startsWith(v));
      if (v && m.length === 1 && input.value !== `/${m[0]}`) {
        e.preventDefault();
        input.value = `/${m[0]}`;
      }
    } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      log.replaceChildren();
    }
  });
};

/** restored: reopened after a /language switch */
export const open = (data: Data, restored = false) => {
  const first = !dlg;
  if (first) build(data);
  if (dlg.open) return;
  fab.focus({ preventScroll: true }); // showModal remembers it and close() gives focus back to it
  state.lenis?.stop();
  dlg.showModal();
  log.scrollTop = log.scrollHeight; // a closed dialog loses its scroll position
  if (matchMedia('(pointer: fine)').matches) input.focus(); // phones: no keyboard over the sheet until asked
  if (!first) return;
  print([...d.intro, ...(restored
    ? [echo(`/language ${d.lang}`), [[fill(d.langNow, d.langs[d.lang]![0])]] as Line]
    : [echo('/help'), ...d.out.help!])]);
};
