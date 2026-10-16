import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Scroll state read by the WebGL loop (signal.ts).
// F: one proxy per chapter that owns a formation (Bluee..Contact); their sum is the formation progress 0..5.
// D: dim contributions of the chapters without a formation.
export const state = {
  F: [] as { v: number }[],
  D: [] as (() => number)[],
  pan: null as gsap.core.Tween | null,
};

const $ = (id: string) => document.getElementById(id)!;

// principles: split into words (Intl.Segmenter also splits CJK) so their opacity can scrub
function splitWords() {
  if (!('Segmenter' in Intl)) return false;
  const seg = new Intl.Segmenter(document.documentElement.lang, { granularity: 'word' });
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const text = el.textContent ?? '';
    el.textContent = '';
    for (const { segment } of seg.segment(text)) {
      if (/^\s+$/.test(segment)) { el.append(segment); continue; }
      const s = document.createElement('span');
      s.className = 'w';
      s.textContent = segment;
      el.append(s);
    }
  });
  return true;
}

function setup(ctx: gsap.Context, words: boolean) {
  const { desk, wide } = ctx.conditions as { desk: boolean; wide: boolean };
  state.F = []; state.D = []; state.pan = null;

  // formation owner: scrubbed morph while its chapter enters
  const formation = (el: Element) => {
    const o = { v: 0 };
    gsap.to(o, { v: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 25%', scrub: 1 } });
    state.F.push(o);
  };
  // chapter without formation: keep the previous one, dimmed and pulled back
  const dim = (el: Element) => {
    const a = { v: 0 }, b = { v: 0 };
    gsap.to(a, { v: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 70%', end: 'top 35%', scrub: 1 } });
    gsap.to(b, { v: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'bottom 65%', end: 'bottom 30%', scrub: 1 } });
    state.D.push(() => a.v - b.v);
  };

  // DOM order matters: pins must be created before the triggers below them
  dim($('offers'));

  // selected work: sticky stack, each case shrinks away as the next one arrives
  const panels = gsap.utils.toArray<HTMLElement>('.panel');
  if (desk) {
    const last = panels[panels.length - 1];
    panels.forEach((p, i) => {
      if (i === panels.length - 1 || p.offsetHeight > innerHeight + 2) return;
      ScrollTrigger.create({ trigger: p, start: 'top top', endTrigger: last, end: 'top top', pin: true, pinSpacing: false });
      gsap.to(p, {
        scale: 0.94, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: panels[i + 1], start: 'top bottom', end: 'top top', scrub: true },
      });
    });
  }
  panels.forEach(formation);

  // path: horizontal pan on wide screens
  const path = $('path');
  formation(path);
  if (wide) {
    path.classList.add('is-pan');
    const track = path.querySelector<HTMLElement>('.path__track')!;
    const dist = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
    state.pan = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: path, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true },
    });
  }

  const how = $('how');
  dim(how);
  if (words) {
    gsap.fromTo(how.querySelectorAll('.w'), { '--w': 0 }, {
      '--w': 1, ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: how.querySelector('.principles'), start: 'top 80%', end: 'bottom 55%', scrub: true },
    });
  }

  dim($('side'));
  dim($('education'));
  formation($('contact'));

  return () => path.classList.remove('is-pan');
}

export function init() {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  const words = splitWords();
  const fine = matchMedia('(pointer: fine)').matches;

  // smooth scroll only for fine pointers: Lenis on touch devices is a known source of jitter
  let lenis: Lenis | null = null;
  if (fine) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis!.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // gsap only runs the setup while a condition matches: `motion` keeps phones in, and reverts
  // everything if reduced motion is switched on mid-visit
  gsap.matchMedia().add({
    desk: '(min-width: 900px) and (min-height: 640px)',
    wide: '(min-width: 768px)',
    motion: '(prefers-reduced-motion: no-preference)',
  }, (ctx) => setup(ctx, words));
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
  document.fonts.ready.then(() => ScrollTrigger.refresh());

  // in-page anchors go through Lenis when it is active; focus follows for keyboard users
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    const id = a?.getAttribute('href');
    const el = id && id.length > 1 ? document.querySelector<HTMLElement>(id) : null;
    if (!el) return;
    if (lenis) {
      e.preventDefault();
      lenis.scrollTo(el, { offset: id === '#top' ? 0 : -80 });
      history.replaceState(null, '', id);
    }
    if (id === '#main') el.focus({ preventScroll: !!lenis });
  });

  // CTA feedback: a light magnetic pull on fine pointers
  if (fine) {
    document.querySelectorAll<HTMLElement>('.magnet').forEach((b) => {
      const xTo = gsap.quickTo(b, 'x', { duration: 0.45, ease: 'power3' });
      const yTo = gsap.quickTo(b, 'y', { duration: 0.45, ease: 'power3' });
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.16);
        yTo((e.clientY - r.top - r.height / 2) * 0.28);
      });
      b.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
  }
}
