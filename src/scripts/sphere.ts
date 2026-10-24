// "How I work" as a small embedding space of skills. Each principle is a query node: choosing one lights up its
// nearest skills, the same retrieval gesture as the Bluee chapter of the 3D scene. Plain DOM and rAF.
// The tags stay in their flow positions and only move by transform, so enhancing never shifts the layout.
import { PRINCIPLE_SKILLS, type Skill } from '../facts';
// ?inline: kept out of the page's inline styles (see fx.ts), in place before anything is enhanced
import css from '../styles/sphere.css?inline';
document.head.append(Object.assign(document.createElement('style'), { textContent: css }));

type P = { x: number; y: number; z: number };

const D = 4; // camera distance, in sphere radii: the back scales to 0.6
const AUTO = 0.0016; // idle drift, radians per 60 Hz frame

export function init(how: HTMLElement) {
  const orbit = how.querySelector<HTMLElement>('.orbit')!;
  const tags = [...orbit.querySelectorAll<HTMLElement>('li')];
  const details = [...how.querySelectorAll<HTMLDetailsElement>('.principle')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const lights = (li: HTMLElement, k: number) => !!PRINCIPLE_SKILLS[k]?.includes(li.textContent as Skill);

  // fibonacci sphere (like the hero shell); each node takes the slot nearest to its place on a 7-point sphere,
  // then each node's skills the free slots nearest to it, so a query lights a neighbourhood
  const N = tags.length + details.length, ga = Math.PI * (3 - Math.sqrt(5));
  const fib = (i: number, n: number): P => {
    const y = 1 - ((i + 0.5) / n) * 2, r = Math.sqrt(1 - y * y);
    return { x: Math.cos(ga * i) * r, y, z: Math.sin(ga * i) * r };
  };
  const free = new Set(Array.from({ length: N }, (_, i) => fib(i, N)));
  const take = (q?: P) => {
    let best = free.values().next().value!, bd = Infinity;
    if (q) for (const p of free) {
      const d = (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2;
      if (d < bd) { bd = d; best = p; }
    }
    free.delete(best);
    return best;
  };
  const nodePos = details.map((_, k) => take(fib(k, details.length)));
  const pos = new Map<HTMLElement, P>();
  nodePos.forEach((q, k) => tags.forEach((li) => { if (!pos.has(li) && lights(li, k)) pos.set(li, take(q)); }));
  tags.forEach((li) => { if (!pos.has(li)) pos.set(li, take()); });

  // principle nodes: the accordion is the accessible control, these are pointer shortcuts to it
  const nodes = details.map((d, k) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'orbit__node';
    b.tabIndex = -1;
    b.setAttribute('aria-hidden', 'true');
    b.textContent = d.querySelector('.principle__n')!.textContent;
    b.dataset.t = d.querySelector('.principle__t')!.textContent!;
    b.addEventListener('click', () => { d.open = true; choose(k); });
    orbit.append(b);
    pos.set(b, nodePos[k]!);
    return b;
  });

  const rot = (a: number, b: number) => {
    const ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
    for (const p of pos.values()) {
      const x = p.x * ca + p.z * sa, z = p.z * ca - p.x * sa;
      p.x = x;
      p.z = z * cb - p.y * sb;
      p.y = p.y * cb + z * sb;
    }
  };
  // turn so p moves toward the front: yaw then pitch, f = 1 lands exactly
  const face = (p: P, f: number) => { rot(-Math.atan2(p.x, p.z) * f, 0); rot(0, -Math.atan2(p.y, p.z) * f); };

  // each element's centre in the flow layout (from the orbit centre) and half width
  let S = 0, R = 0;
  const home = new Map<HTMLElement, [number, number, number]>();
  const measure = () => {
    S = orbit.clientWidth;
    R = S * 0.55; // with D = 4 the projected x peaks at 0.775 R
    for (const el of pos.keys()) home.set(el, [el.offsetLeft + el.offsetWidth / 2 - S / 2, el.offsetTop + el.offsetHeight / 2 - S / 2, el.offsetWidth / 2]);
  };
  // opacity = a + b * depth (0 back, 1 front), set by choose() from the lit state
  const fade = new Map<HTMLElement, [number, number]>(nodes.map((b) => [b, [0.15, 0.85]]));
  // each element written to costs a style recalc, so values are rounded and only written when they change (while
  // drifting, a frame touches about a third of the tags); z-index has 5 depth bands, since each change repaints
  const done = new Map<HTMLElement, [string, string, number]>();
  const draw = () => {
    for (const [el, p] of pos) {
      const s = (D - 1) / (D - p.z), d = (p.z + 1) / 2, [hx, hy, hw] = home.get(el)!, [a, b] = fade.get(el)!;
      // long tags near the rim slide in a little rather than leave the box
      const lim = S / 2 - hw * s, x = Math.max(-lim, Math.min(lim, p.x * R * s));
      const t = `translate(${Math.round(x - hx)}px,${Math.round(p.y * R * s - hy)}px) scale(${s.toFixed(2)})`;
      const o = (a + b * d).toFixed(2), z = Math.round(d * 4);
      let w = done.get(el);
      if (!w) done.set(el, (w = ['', '', -1]));
      if (w[0] !== t) el.style.transform = w[0] = t;
      if (w[1] !== o) el.style.opacity = w[1] = o;
      if (w[2] !== z) el.style.zIndex = String((w[2] = z));
    }
    for (const b of nodes) {
      const p = pos.get(b)!;
      b.classList.toggle('is-back', p.z < 0);
      b.classList.toggle('is-r', p.x > 0);
    }
  };

  let chosen = -1, target = -1, seen = false, hover = false;
  let drag = 0, px = 0, py = 0, ax = 0, ay = 0, vx = 0, vy = 0, raf = 0, last = 0;
  const frame = (t: number) => {
    const k = last ? Math.min((t - last) / 16.7, 4) : 1;
    last = t; raf = 0;
    // drag: the fling is a running average, so a frame with no pointer event (120 Hz) doesn't zero it
    if (drag) { vx += (ax / k - vx) * 0.5; vy += (ay / k - vy) * 0.5; rot(ax, ay); ax = ay = 0; }
    else if (target >= 0) {
      const p = nodePos[target]!;
      face(p, 1 - 0.9 ** k);
      if (Math.abs(p.x) + Math.abs(p.y) < 0.004) target = -1;
    } else {
      // inertia settles into the idle drift; none of either with reduced motion or over a node
      const e = 1 - 0.95 ** k;
      vx += ((hover || reduce.matches ? 0 : AUTO) - vx) * e;
      vy -= vy * e;
      rot(vx * k, vy * k);
    }
    draw();
    if (seen && (drag || target >= 0 || Math.abs(vx) + Math.abs(vy) > 1e-5)) raf = requestAnimationFrame(frame);
    else last = 0;
  };
  const kick = () => { raf ||= requestAnimationFrame(frame); };

  const choose = (k: number, snap = reduce.matches) => {
    chosen = k;
    orbit.classList.toggle('has-lit', k >= 0);
    tags.forEach((li) => {
      const on = lights(li, k);
      li.classList.toggle('is-lit', on);
      fade.set(li, on ? [0.55, 0.45] : k >= 0 ? [0.08, 0.32] : [0.2, 0.8]); // lit, stepped back, neutral
    });
    nodes.forEach((b, i) => b.classList.toggle('is-on', i === k));
    if (k >= 0 && snap) face(nodePos[k]!, 1);
    else if (k >= 0) target = k;
    draw();
    kick();
  };
  details.forEach((d, k) => d.addEventListener('toggle', () => {
    if (d.open) { if (chosen !== k) choose(k); } else if (chosen === k) choose(-1);
  }));

  // drag spins; capture starts only past a few pixels so a plain click still reaches the node under it
  orbit.addEventListener('pointerdown', (e) => {
    if (e.button) return;
    drag = 1; px = e.clientX; py = e.clientY; ax = ay = 0;
  });
  orbit.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - px, dy = e.clientY - py;
    if (drag === 1) {
      if (Math.hypot(dx, dy) < 5) return;
      drag = 2; target = -1;
      orbit.setPointerCapture(e.pointerId);
      orbit.classList.add('is-drag');
    }
    px = e.clientX; py = e.clientY;
    ax += dx / R; ay += dy / R;
    kick();
  });
  const up = () => {
    if (drag === 2 && reduce.matches) vx = vy = 0;
    drag = 0;
    orbit.classList.remove('is-drag');
  };
  orbit.addEventListener('pointerup', up);
  orbit.addEventListener('pointercancel', up);
  orbit.addEventListener('pointerover', (e) => { hover = !!(e.target as Element).closest('.orbit__node'); kick(); });
  orbit.addEventListener('pointerleave', () => { hover = false; kick(); });

  measure();
  choose(details.findIndex((d) => d.open), true);
  how.classList.add('is-live');
  new ResizeObserver(() => { measure(); draw(); }).observe(orbit);
  new IntersectionObserver(([e]) => { seen = e!.isIntersecting; kick(); }).observe(orbit);
}
