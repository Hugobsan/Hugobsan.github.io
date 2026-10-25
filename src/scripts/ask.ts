import type { Dict } from '../i18n/en';
import { say, add } from './terminal';

// /ask: the question goes to /api/ask, a Cloudflare Worker on this same origin (worker/), which answers as Hugo from
// /llms-full.txt with a hosted model, in the page's language. terminal.ts loads this module on the first question.
// The Worker streams {"t": text} events, then {"done": "ok" | "notfound" | "offtopic" | "number", "trim"?: n} or
// {"error": ...}; before the stream, an error is JSON {"error": "long" | "visitor" | "site" | ..., "max"?: n}.
export type T = Omit<Dict['term']['ask'], 'usage' | 'examples'> & { max: number; email: string; linkedin: string };

/** a message into its line, with {email} and {linkedin} as links */
const show = (el: HTMLElement, s: string, t: T) => el.replaceChildren(...s.split(/(\{email\}|\{linkedin\})/).map((part) => {
  if (part !== '{email}' && part !== '{linkedin}') return part;
  const a = document.createElement('a');
  const mail = part === '{email}';
  a.textContent = mail ? t.email : 'LinkedIn';
  a.href = mail ? `mailto:${t.email}` : t.linkedin;
  if (!mail) Object.assign(a, { target: '_blank', rel: 'noopener' });
  return a;
}));

// short memory: this visit's last answered questions, sent with each new one so follow-ups make sense. Page memory
// only: /clear and a reload forget them. The Worker caps them again and never takes them as facts.
const past: { q: string; a: string }[] = [];
export const forget = () => void (past.length = 0);
let told = false; // the privacy line, once per visit

export const ask = async (q: string, lang: string, t: T, signal: AbortSignal) => {
  if (!told) say(t.privacy, 'd');
  told = true;
  const r = await fetch('/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q, lang, history: past }),
    signal,
  });
  if (!r.ok || !r.body) {
    const { error, max } = await r.json().catch(() => ({}));
    const msg: Record<string, string> = { long: t.long.replace('{n}', max), visitor: t.visitor, site: t.site };
    return void show(say('', 'd'), msg[error] ?? t.unavailable, t);
  }
  const out = say('', 'd'); // dim until the Worker's checks pass
  const instead: Record<string, string> = { notfound: t.notFound, offtopic: t.offTopic, number: t.unverified };
  const reader = r.body.pipeThrough(new TextDecoderStream()).getReader();
  let text = '';
  let buf = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += value;
    const evs = buf.split('\n\n');
    buf = evs.pop()!;
    for (const ev of evs) {
      const m = JSON.parse(ev.replace(/^data: /, ''));
      if (m.t) {
        text += m.t;
        add(out, m.t);
      } else if (m.done === 'ok') {
        // the token cap cut a sentence: back to the last whole one, so no half sentence stays on screen
        if (m.trim !== undefined) out.textContent = text = text.slice(0, m.trim);
        out.className = '';
        past.push({ q, a: text.slice(0, 1200) }); // the Worker's caps: 5 turns, 1,200 characters an answer
        if (past.length > 5) past.shift();
        return;
      } else if (instead[m.done]) return void show(out, instead[m.done]!, t);
      else break; // {"error": ...}
    }
  }
  out.textContent = t.unavailable; // an error event, or a stream that ended without its end event
};
