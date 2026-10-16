// Signal: one THREE.Points, six formations morphed on the GPU.
import {
  AdditiveBlending, BufferAttribute, BufferGeometry, Color, ColorManagement, NormalBlending,
  PerspectiveCamera, Points, Scene, ShaderMaterial, Vector2, WebGLRenderer,
} from 'three';
import AVATAR from './avatar.json';
import { state } from './motion';

const AVATAR_H = 2.1;
const AVATAR_SPRITE = 1.3; // sprite size relative to one sub-cell, so neighbours overlap into a solid art pixel

function mulberry32(a: number) {
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildFormations(N: number) {
  const R = mulberry32(20261015);
  const gauss = () => { let u = 0; while (!u) u = R(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * R()); };
  const P = Array.from({ length: 6 }, () => new Float32Array(N * 3));
  const bits = new Uint8Array(N);
  const rnd = new Float32Array(N);
  const col = new Float32Array(N * 4);
  for (let i = 0; i < N; i++) rnd[i] = R();
  // each formation gets its own random particle order, so morphs read as a swarm, not a slide
  const perm = () => {
    const a = new Uint32Array(N);
    for (let i = 0; i < N; i++) a[i] = i;
    for (let i = N - 1; i > 0; i--) { const j = (R() * (i + 1)) | 0; const t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };
  const put = (f: number, i: number, x: number, y: number, z: number) => { const o = i * 3; P[f][o] = x; P[f][o + 1] = y; P[f][o + 2] = z; };

  // F0 latent space: fibonacci shell + gaussian core, a few dozen accents scattered
  {
    const pm = perm(), shell = Math.floor(N * 0.6), ga = Math.PI * (3 - Math.sqrt(5));
    for (let j = 0; j < N; j++) {
      const i = pm[j];
      if (j < shell) {
        const y = 1 - ((j + 0.5) / shell) * 2, r = Math.sqrt(1 - y * y), th = ga * j, k = 1 + gauss() * 0.012;
        put(0, i, Math.cos(th) * r * k, y * k, Math.sin(th) * r * k);
      } else put(0, i, gauss() * 0.3, gauss() * 0.3, gauss() * 0.3);
    }
    for (let k = 0; k < 36; k++) bits[pm[Math.floor(((k + 0.5) / 36) * N)]] |= 1;
  }

  // F1 RAG: ten clusters + a query point; its k nearest neighbours (3%) light up
  {
    const pm = perm(), K = 10, C: { c: number[]; s: number; w: number }[] = [];
    for (let k = 0; k < K; k++) C.push({ c: [(R() * 2 - 1) * 0.95, (R() * 2 - 1) * 0.72, (R() * 2 - 1) * 0.6], s: 0.07 + 0.1 * R(), w: 0.5 + R() });
    const qN = Math.max(6, Math.round(N * 0.004)), pts = N - qN;
    const q = C[0].c.map((v, a) => v + (C[1].c[a] - v) * 0.3);
    const wsum = C.reduce((s, c) => s + c.w, 0);
    let j = 0;
    C.forEach((c, k) => {
      const n = k === K - 1 ? pts - j : Math.round((c.w / wsum) * pts);
      for (let m = 0; m < n && j < pts; m++, j++) put(1, pm[j], c.c[0] + gauss() * c.s, c.c[1] + gauss() * c.s, c.c[2] + gauss() * c.s);
    });
    for (; j < N; j++) { put(1, pm[j], q[0] + gauss() * 0.018, q[1] + gauss() * 0.018, q[2] + gauss() * 0.018); bits[pm[j]] |= 2; }
    const d = new Float32Array(pts), idx = new Uint32Array(pts);
    for (let m = 0; m < pts; m++) {
      const o = pm[m] * 3;
      d[m] = (P[1][o] - q[0]) ** 2 + (P[1][o + 1] - q[1]) ** 2 + (P[1][o + 2] - q[2]) ** 2;
      idx[m] = m;
    }
    idx.sort((a, b) => d[a] - d[b]);
    const k = Math.round(N * 0.03);
    for (let m = 0; m < k; m++) bits[pm[idx[m]]] |= 2;
  }

  // F2 fair queues: encoded as (lane, s, jitter); the shader animates the flow.
  // lane 0 is the large tenant, lanes 1..3 small tenants, lane 4 the round-robin output
  {
    const pm = perm();
    for (let j = 0; j < N; j++) {
      const f = j / N;
      const lane = f < 0.4 ? 0 : f < 0.5 ? 1 : f < 0.6 ? 2 : f < 0.7 ? 3 : 4;
      put(2, pm[j], lane, R(), R() * 2 - 1);
    }
  }

  // F3 review graph: six phases in a ring, adversarial node in the centre, output node
  {
    const pm = perm(), nodes: number[][] = [];
    for (let k = 0; k < 6; k++) { const a = Math.PI / 2 + (k * Math.PI) / 3; nodes.push([0.92 * Math.cos(a) - 0.3, 0.92 * Math.sin(a), 0]); }
    nodes.push([-0.3, 0, 0], [1.25, 0, 0]);
    const edges = [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 7]];
    const cx = Math.cos(0.32), sx = Math.sin(0.32), cy = Math.cos(-0.3), sy = Math.sin(-0.3);
    const tilt = (x: number, y: number, z: number): [number, number, number] => {
      const y1 = y * cx - z * sx, z1 = y * sx + z * cx;
      return [x * cy + z1 * sy, y1, -x * sy + z1 * cy];
    };
    const nodeShare = [0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.12, 0.06];
    const sig = [0.065, 0.065, 0.065, 0.065, 0.065, 0.065, 0.1, 0.07];
    let j = 0;
    nodes.forEach((n, k) => {
      const cnt = Math.round(nodeShare[k] * N);
      for (let m = 0; m < cnt; m++, j++) {
        const i = pm[j];
        put(3, i, ...tilt(n[0] + gauss() * sig[k], n[1] + gauss() * sig[k], n[2] + gauss() * sig[k]));
        if (k === 6) bits[i] |= 8;
      }
    });
    const rest = N - j;
    for (let m = 0; m < rest; m++, j++) {
      const e = edges[m % edges.length], a = nodes[e[0]], b = nodes[e[1]], t = R();
      put(3, pm[j], ...tilt(a[0] + (b[0] - a[0]) * t + gauss() * 0.012, a[1] + (b[1] - a[1]) * t + gauss() * 0.012, gauss() * 0.012));
    }
  }

  // F4 experience ribbon: a twisting band with six knots, the first (current role) accented
  {
    const pm = perm();
    const curve = (u: number) => [-2.4 + 4.8 * u, 0.22 * Math.sin(u * Math.PI * 1.8 + 0.4), 0.35 * Math.cos(u * Math.PI * 1.4)];
    const knots = Array.from({ length: 6 }, (_, k) => 0.06 + (k * 0.88) / 5);
    const ribbonN = Math.round(N * 0.7);
    for (let j = 0; j < N; j++) {
      const i = pm[j];
      if (j < ribbonN) {
        const u = R(), v = R() * 2 - 1, th = u * Math.PI * 1.5, c = curve(u);
        put(4, i, c[0] + gauss() * 0.006, c[1] + Math.cos(th) * 0.13 * v, c[2] + Math.sin(th) * 0.13 * v);
      } else {
        const k = j % 6, c = curve(knots[k]);
        put(4, i, c[0] + gauss() * 0.05, c[1] + gauss() * 0.05, c[2] + gauss() * 0.05);
        if (k === 0) bits[i] |= 16;
      }
    }
  }

  // F5 avatar: each art pixel becomes a small square cluster; surplus particles form a faint halo
  const pm = perm(), cells: [number, number, number][] = [];
  for (let r = 0; r < AVATAR.h; r++) for (let c = 0; c < AVATAR.w; c++) {
    const ch = AVATAR.data[r * AVATAR.w + c];
    if (ch !== '.') cells.push([c, r, parseInt(ch, 36)]);
  }
  const rgb = AVATAR.palette.map((h) => [0, 2, 4].map((o) => parseInt(h.slice(o, o + 2), 16) / 255));
  const per = Math.max(1, Math.floor((N * 0.9) / cells.length)), cell = AVATAR_H / AVATAR.h;
  const cols = Math.ceil(Math.sqrt(per)), rows = Math.ceil(per / cols);
  let j = 0;
  for (const [c, r, p] of cells) {
    for (let q = 0; q < per && j < N; q++, j++) { // j < N: a grid bigger than the budget can't overrun the buffers
      const gy = Math.floor(q / cols), inRow = gy === rows - 1 ? per - cols * (rows - 1) : cols, gx = q - gy * cols, i = pm[j];
      put(5, i,
        (c - (AVATAR.w - 1) / 2) * cell + ((gx + 0.5) / inRow - 0.5) * cell * 0.9,
        ((AVATAR.h - 1) / 2 - r) * cell + ((gy + 0.5) / rows - 0.5) * cell * 0.9,
        (R() - 0.5) * 0.02);
      col[i * 4] = rgb[p][0]; col[i * 4 + 1] = rgb[p][1]; col[i * 4 + 2] = rgb[p][2]; col[i * 4 + 3] = 1;
    }
  }
  for (; j < N; j++) {
    const a = R() * Math.PI * 2, rad = 1.3 + Math.abs(gauss()) * 0.35;
    put(5, pm[j], Math.cos(a) * rad * 0.8, Math.sin(a) * rad, gauss() * 0.15);
  }
  const sub = Math.min(cols, rows);
  // with additive blending overlapping squares add up; scale alpha down by the expected overlap
  const overlap = per * (AVATAR_SPRITE / sub) ** 2;
  return { P, mask: Float32Array.from(bits), rnd, col, avatarSub: sub, avatarDarkAlpha: Math.min(1, 1.1 / overlap) };
}

const NOISE = /* glsl */`
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 105.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const VERT = /* glsl */`
uniform float uFrom, uTo, uMix, uTime, uPointSize, uPixelRatio, uDrift, uDark, uAlpha, uAvatarAlpha, uAvatarSize;
uniform vec3 uColorBase, uColorAccent;
uniform vec2 uMouse;
attribute vec3 position1, position2, position3, position4, position5;
attribute float aRandom;
attribute vec4 aColor;
attribute float aHighlight;
varying vec4 vColor;
varying float vSquare;
${NOISE}
const float FLOW = 0.035;
const float PACKETS = 12.0;

vec3 rotY(vec3 p, float a){ float c = cos(a), s = sin(a); return vec3(c*p.x + s*p.z, p.y, -s*p.x + c*p.z); }

// F2: four tenant lanes converge into one output lane; output moves as rigid packets, round-robin
vec4 lane(vec3 a){
  float j2 = fract(aRandom * 7.31) * 2.0 - 1.0;
  if (a.x < 3.5) {
    float u = fract(a.y + uTime * FLOW);
    float yk = 0.78 - a.x * 0.52;
    float conv = smoothstep(0.3, 1.0, u);
    float w = (a.x < 0.5 ? 0.085 : 0.03) * (1.0 - 0.75 * conv);
    return vec4(mix(-1.5, -0.04, u), yk * (1.0 - conv) + a.z * w, j2 * w, smoothstep(0.0, 0.06, u));
  }
  float k = floor(a.y * PACKETS), o = fract(a.y * PACKETS);
  float u = fract((k + 0.5 + (o - 0.5) * 0.5) / PACKETS + uTime * FLOW);
  float tenant = mod(k, 4.0);
  return vec4(mix(0.04, 1.5, u), (tenant - 1.5) * 0.03 + a.z * 0.035, j2 * 0.035, smoothstep(1.0, 0.9, u));
}
// the packet that just left the merge point is the one being dispatched
float laneHighlight(vec3 a){
  if (a.x < 3.5) return 0.0;
  float k = floor(a.y * PACKETS);
  float uc = fract((k + 0.5) / PACKETS + uTime * FLOW);
  return 1.0 - step(1.0 / PACKETS, uc);
}

vec4 formation(float i){
  if (i < 0.5) { vec3 p = rotY(position, uTime * 0.05); p.xy += uMouse * p.z * 0.08; return vec4(p, 1.0); }
  if (i < 1.5) return vec4(rotY(position1, uTime * 0.03), 1.0);
  if (i < 2.5) return lane(position2);
  if (i < 3.5) return vec4(position3, 1.0);
  if (i < 4.5) return vec4(position4, 1.0);
  return vec4(position5, 1.0);
}
float highlight(float i){
  if (i > 1.5 && i < 2.5) return laneHighlight(position2);
  return mod(floor(aHighlight / pow(2.0, floor(i + 0.5))), 2.0);
}
float driftAmp(float i){
  return i < 0.5 ? 0.04 : i < 1.5 ? 0.03 : i < 2.5 ? 0.008 : i < 3.5 ? 0.018 : i < 4.5 ? 0.02 : 0.002;
}

void main(){
  float delay = aRandom * 0.4;
  float m = smoothstep(delay, delay + 0.6, uMix);
  vec4 A = formation(uFrom);
  vec4 B = formation(uTo);
  vec3 pos = mix(A.xyz, B.xyz, m);
  float arc = sin(m * 3.14159265);
  if (arc > 0.001) pos += arc * 0.42 * vec3(snoise(pos * 1.1 + aRandom * 3.0), snoise(pos * 1.1 + 19.1), snoise(pos * 1.1 + 37.7));
  float amp = mix(driftAmp(uFrom), driftAmp(uTo), m) * uDrift;
  if (amp > 0.0) {
    float t = uTime * 0.15;
    pos += amp * vec3(snoise(pos * 0.8 + vec3(t, 0.0, 0.0)), snoise(pos * 0.8 + vec3(0.0, t, 7.3)), snoise(pos * 0.8 + vec3(5.1, 0.0, t)));
  }

  float h = mix(highlight(uFrom), highlight(uTo), m);
  float w5 = (uFrom > 4.5 ? 1.0 - m : 0.0) + (uTo > 4.5 ? m : 0.0);  // avatar weight
  bool px = aColor.a > 0.5;
  vec3 av = px ? aColor.rgb : uColorBase;
  if (uDark > 0.5) av = max(av, uColorBase * 0.42);   // lift near-black pixels so the silhouette reads on dark
  vec3 col = mix(mix(uColorBase, uColorAccent, h), av, w5);
  float a = mix(A.w, B.w, m) * mix(uAlpha * (0.6 + 0.4 * h), px ? uAvatarAlpha : uAlpha * 0.15, w5);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  float size = uPointSize * (0.7 + aRandom * 0.6) * (1.0 + 0.7 * h) * (6.0 / -mv.z);
  gl_PointSize = mix(size, px ? uAvatarSize : size, w5) * uPixelRatio;
  vColor = vec4(col, a);
  vSquare = px ? w5 : 0.0;
}`;

const FRAG = /* glsl */`
varying vec4 vColor;
varying float vSquare;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = mix(length(c), max(abs(c.x), abs(c.y)), vSquare);
  float a = smoothstep(0.5, mix(0.28, 0.44, vSquare), d);
  if (a < 0.01) discard;
  gl_FragColor = vec4(vColor.rgb, vColor.a * a);
}`;

type Layout = { x: number[]; y: number[]; s: number[]; a: number[] };
// where each formation sits: x/y as fractions of the half viewport, s as a fraction of min(halfW, halfH)
// order: hero, Bluee, Club, review panel, experience, avatar (index 5, overwritten every frame from the contact section's free space)
const LAYOUT: { desk: Layout; mob: Layout } = {
  desk: { x: [0.48, 0.5, 0.52, 0.5, 0, 0], y: [0, 0, 0, 0, 0.22, 0], s: [0.62, 0.56, 0.44, 0.5, 1.0, 0.4], a: [1, 1, 1, 1, 0.8, 1] },
  mob: { x: [0, 0, 0, 0, 0, 0], y: [0.08, 0, 0, 0, -0.1, 0], s: [0.78, 0.74, 0.66, 0.66, 0.9, 0.62], a: [0.5, 0.4, 0.4, 0.4, 0.45, 1] },
};

export function init(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) {
  const renderer = new WebGLRenderer({ canvas, context: gl });
  ColorManagement.enabled = false; // token hex values go to the shader as-is

  // device tiers: particle count and sprite size
  const coarse = matchMedia('(pointer: coarse)').matches || innerWidth < 768;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const low = (nav.hardwareConcurrency || 8) <= 4 || !!nav.connection?.saveData || (!!nav.deviceMemory && nav.deviceMemory <= 2);
  const N = low ? 3000 : coarse ? 7000 : 20000;
  const baseSize = low ? 3.4 : coarse ? 2.6 : 2.2;

  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.z = 6;
  const halfH = Math.tan((35 / 2) * Math.PI / 180) * 6;

  const { P, mask, rnd, col, avatarSub, avatarDarkAlpha } = buildFormations(N);
  const geo = new BufferGeometry();
  geo.setAttribute('position', new BufferAttribute(P[0], 3));
  for (let k = 1; k < 6; k++) geo.setAttribute('position' + k, new BufferAttribute(P[k], 3));
  geo.setAttribute('aRandom', new BufferAttribute(rnd, 1));
  geo.setAttribute('aColor', new BufferAttribute(col, 4));
  geo.setAttribute('aHighlight', new BufferAttribute(mask, 1));

  const U = {
    uFrom: { value: 0 }, uTo: { value: 1 }, uMix: { value: 0 }, uTime: { value: 0 },
    uPointSize: { value: baseSize }, uPixelRatio: { value: renderer.getPixelRatio() },
    uDrift: { value: 1 }, uDark: { value: 1 }, uAlpha: { value: 0.6 },
    uAvatarAlpha: { value: 0.6 }, uAvatarSize: { value: 3 },
    uColorBase: { value: new Color() }, uColorAccent: { value: new Color() },
    uMouse: { value: new Vector2() },
  };
  const mat = new ShaderMaterial({ uniforms: U, vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false, depthTest: false });
  const points = new Points(geo, mat);
  points.frustumCulled = false;
  scene.add(points);

  // particle colors come from the CSS tokens, so they follow the color scheme
  let dark = true;
  function readTheme() {
    const cs = getComputedStyle(document.documentElement);
    U.uColorBase.value.set(cs.getPropertyValue('--particle').trim());
    U.uColorAccent.value.set(cs.getPropertyValue('--particle-accent').trim());
    dark = cs.getPropertyValue('--scheme').trim() !== 'light';
    U.uDark.value = dark ? 1 : 0;
    mat.blending = dark ? AdditiveBlending : NormalBlending;
    mat.needsUpdate = true;
  }
  readTheme();
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', readTheme);

  let vw = 0, vh = 0;
  function resize() {
    const w = innerWidth, h = innerHeight;
    if (coarse && w === vw && Math.abs(h - vh) < 120) return; // ignore mobile toolbar show/hide
    vw = w; vh = h;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    U.uPointSize.value = baseSize * Math.min(1.35, Math.max(0.8, h / 900));
  }
  resize();
  addEventListener('resize', resize);

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', (e) => { mouse.tx = e.clientX / vw * 2 - 1; mouse.ty = -(e.clientY / vh * 2 - 1); }, { passive: true });

  const mqMobile = matchMedia('(max-width: 767px)');
  const contact = document.getElementById('contact')!;
  const contactInner = contact.querySelector('.contact__inner')!;
  // avatar slot: the band between the nav and the contact heading, following the section as it scrolls
  function avatarSlot(L: Layout, unit: number, pxPerUnit: number) {
    const sr = contact.getBoundingClientRect(), ir = contactInner.getBoundingClientRect();
    const top = Math.max(sr.top, 80), bottom = ir.top - 24;
    // fit the band when it is tall enough, never smaller than 96px (then it rises behind the nav)
    const hpx = Math.min(vh * 0.5, Math.max(96, (bottom - top) * 0.9));
    const cy = bottom - top >= hpx ? (top + bottom) / 2 : bottom - hpx / 2;
    L.y[5] = 1 - (2 * cy) / vh;
    L.s[5] = hpx / pxPerUnit / AVATAR_H / unit;
  }
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  let time = 0, last = performance.now(), dimS = 0, raf = 0, firstFrame = true;

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    let p = 0;
    for (const f of state.F) p += f.v;
    p = Math.max(0, Math.min(5, p));
    let dim = 0;
    for (const d of state.D) dim += d();
    dim = Math.max(0, Math.min(1, dim));
    dimS += (dim - dimS) * (1 - Math.exp(-dt * 4));

    const from = Math.min(Math.floor(p), 5), to = Math.min(from + 1, 5), m = p - from;
    const e = m * m * (3 - 2 * m);
    const L = mqMobile.matches ? LAYOUT.mob : LAYOUT.desk;
    const halfW = halfH * camera.aspect, unit = Math.min(halfH, halfW);
    const pxPerUnit = vh / (2 * halfH);
    if (to === 5) avatarSlot(L, unit, pxPerUnit);
    const scale = lerp(L.s[from], L.s[to], e) * unit * (1 - 0.07 * dimS);
    let x = lerp(L.x[from], L.x[to], e) * halfW;
    // the ribbon slides with the horizontal timeline (slower than the cards, so it reads as depth)
    const w4 = (from === 4 ? 1 - e : 0) + (to === 4 ? e : 0);
    if (w4 > 0) {
      const ribbon = 4.8 * L.s[4] * unit;
      const pan = state.pan ? state.pan.progress() : 0.5;
      x += w4 * (0.5 - pan) * Math.max(0, ribbon - 2 * halfW);
    }
    points.position.set(x, lerp(L.y[from], L.y[to], e) * halfH, 0);
    points.scale.setScalar(scale);

    time += dt;
    mouse.x += (mouse.tx - mouse.x) * (1 - Math.exp(-dt * 3));
    mouse.y += (mouse.ty - mouse.y) * (1 - Math.exp(-dt * 3));
    points.rotation.y = mouse.x * 0.12;
    points.rotation.x = -mouse.y * 0.08;

    U.uFrom.value = from; U.uTo.value = to; U.uMix.value = m; U.uTime.value = time;
    U.uMouse.value.set(mouse.x, mouse.y);
    U.uAlpha.value = (dark ? 0.62 : 0.78) * lerp(L.a[from], L.a[to], e) * (1 - 0.55 * dimS);
    U.uAvatarAlpha.value = dark ? avatarDarkAlpha : 1;
    U.uAvatarSize.value = (AVATAR_H / AVATAR.h) * L.s[5] * unit * pxPerUnit / avatarSub * AVATAR_SPRITE;

    renderer.render(scene, camera);
    if (firstFrame) { firstFrame = false; canvas.classList.add('is-ready'); }
  }
  raf = requestAnimationFrame(frame);

  // nothing to draw for a hidden tab
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else { last = performance.now(); raf = requestAnimationFrame(frame); }
  });
}
