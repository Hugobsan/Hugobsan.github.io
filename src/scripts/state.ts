import type Lenis from 'lenis';

// Shared by motion.ts, signal.ts and the page script; type-only imports, so nothing pulls GSAP or Lenis in.
// F: one proxy per chapter that owns a formation (Bluee..Contact); their sum is the formation progress 0..5.
// D: dim contributions of the chapters without a formation.
export const state = {
  F: [] as { v: number }[],
  D: [] as (() => number)[],
  pan: null as { progress(): number } | null,
  lenis: null as Lenis | null,
  // last click on a control, in CSS pixels and performance.now() ms: fx.ts writes it, signal.ts ripples the particles from it
  pulse: null as { x: number; y: number; t: number } | null,
};
