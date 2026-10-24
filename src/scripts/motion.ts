import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { state } from './state';

const $ = (id: string) => document.getElementById(id)!;

const fine = matchMedia('(pointer: fine)').matches;

function setup(ctx: gsap.Context) {
  const { desk, pan, motion } = ctx.conditions as { desk: boolean; pan: boolean; motion: boolean };
  state.F = []; state.D = []; state.pan = null;
  if (!motion) return; // reduced motion switched on mid-visit: everything below stays reverted

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

  // experience: horizontal pan where the cards fit, vertical list elsewhere
  const xp = $('experience');
  formation(xp);
  if (pan) {
    xp.classList.add('is-pan');
    const track = xp.querySelector<HTMLElement>('.experience__track')!;
    const dist = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
    state.pan = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: xp, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true },
    });
  }

  dim($('how'));

  dim($('side'));
  dim($('education'));
  formation($('contact'));

  // smooth scroll and a magnetic pull on buttons, fine pointers only (Lenis on touch is a known source of jitter)
  const off: (() => void)[] = [];
  if (fine) {
    const lenis = new Lenis({ lerp: 0.1 });
    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf);
    state.lenis = lenis;
    off.push(() => { gsap.ticker.remove(raf); lenis.destroy(); state.lenis = null; });

    document.querySelectorAll<HTMLElement>('.btn, .magnet').forEach((b) => {
      const xTo = gsap.quickTo(b, 'x', { duration: 0.45, ease: 'power3' });
      const yTo = gsap.quickTo(b, 'y', { duration: 0.45, ease: 'power3' });
      const move = (e: PointerEvent) => {
        const r = b.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.3);
        yTo((e.clientY - r.top - r.height / 2) * 0.4);
      };
      const leave = () => { xTo(0); yTo(0); };
      b.addEventListener('pointermove', move);
      b.addEventListener('pointerleave', leave);
      off.push(() => { b.removeEventListener('pointermove', move); b.removeEventListener('pointerleave', leave); });
    });
  }

  return () => { xp.classList.remove('is-pan'); off.forEach((f) => f()); };
}

/** onAnchor: the page opened on #id; the pins added above it would push it down, so re-align once set up */
export function init(onAnchor = false) {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (fine) gsap.ticker.lagSmoothing(0); // Lenis drives the ticker on fine pointers

  // gsap runs the setup while any condition matches and reverts it on every change
  gsap.matchMedia().add({
    desk: '(min-width: 900px) and (min-height: 640px)',
    pan: '(min-width: 900px) and (min-height: 720px)',
    motion: '(prefers-reduced-motion: no-preference)',
  }, setup);
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
  document.fonts.ready.then(() => ScrollTrigger.refresh());
  // How changes height (the accordion, its text reflowing): the triggers below it re-measure once it settles
  let howH = 0, howT = 0;
  new ResizeObserver(([e]) => {
    const h = Math.round(e!.contentRect.height);
    if (howH && h !== howH) { clearTimeout(howT); howT = window.setTimeout(() => ScrollTrigger.refresh(), 150); }
    howH = h;
  }).observe($('how'));
  const anchor = onAnchor && document.getElementById(location.hash.slice(1));
  if (anchor) {
    if (state.lenis) state.lenis.scrollTo(anchor, { immediate: true });
    else anchor.scrollIntoView({ behavior: 'instant' });
  }
}
