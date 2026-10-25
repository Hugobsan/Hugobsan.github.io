// /ask in a real browser, over CDP, against `npm run dev:mock` (the built site and the Worker) + `npm run mock`.
// Chrome: google-chrome --headless=new --remote-debugging-port=9333 --user-data-dir=<tmp> about:blank
//   node test/browser-test.mjs          en + pt: memory, /clear, abort (Esc, Ctrl+C, close), trim, tokens, errors
//   node test/browser-test.mjs limits   with `npm run dev:mock -- --var DAILY_PER_VISITOR:2 --var DAILY_GLOBAL:3`
import assert from 'node:assert/strict';
const SITE = 'http://127.0.0.1:8787', M = 'http://127.0.0.1:8790';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const tab = await (await fetch('http://127.0.0.1:9333/json/new?about:blank', { method: 'PUT' })).json();
const ws = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pend = new Map();
const requests = [];
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id) {
    const p = pend.get(m.id);
    pend.delete(m.id);
    m.error ? p.rej(new Error(m.error.message)) : p.res(m.result);
  } else if (m.method === 'Network.requestWillBeSent') requests.push(m.params.request.url);
};
const send = (method, params = {}) => new Promise((res, rej) => {
  pend.set(++id, { res, rej });
  ws.send(JSON.stringify({ id, method, params }));
});
const ev = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(`${expression}: ${r.exceptionDetails.exception?.description}`);
  return r.result.value;
};
const until = async (expr, ms = 10000) => {
  const t = Date.now();
  for (;;) {
    const v = await ev(expr);
    if (v) return v;
    if (Date.now() - t > ms) throw new Error(`timeout: ${expr}`);
    await sleep(100);
  }
};
const key = async (k, code, vk, modifiers = 0) => {
  for (const type of ['rawKeyDown', 'keyUp']) await send('Input.dispatchKeyEvent', { type, key: k, code, windowsVirtualKeyCode: vk, modifiers });
};
const lines = () => ev(`[...document.querySelectorAll('#term .term__log p')].map((p) => p.textContent)`);
const lastLine = () => ev(`document.querySelector('#term .term__log').lastElementChild?.textContent`);
const type = (cmd) => ev(`(() => { const i = document.querySelector('#term input'); i.value = ${JSON.stringify(cmd)}; i.form.requestSubmit(); })()`);
const busy = () => ev(`document.querySelector('#term .term__log').ariaBusy`);
const idle = () => until(`document.querySelector('#term .term__log').ariaBusy === 'false'`, 30000);
const lastUser = async () => (await (await fetch(`${M}/stats`)).json()).last.body.messages.at(-1).content;
const ok = (name) => console.log('PASS', name);

const load = async (path) => {
  requests.length = 0;
  await send('Page.navigate', { url: SITE + path });
  await until(`document.readyState === 'complete' && !document.querySelector('.term-fab').hidden`);
  await sleep(1500);
};
const open = async () => {
  await ev(`document.querySelector('.term-fab').click()`);
  await until(`document.querySelector('#term')?.open && document.querySelector('#term .term__log p')`);
};
await send('Network.enable');
await send('Page.enable');

const run = async (lang, t) => {
  await load(lang === 'en' ? '/' : `/${lang}/`);
  assert.ok(!requests.some((u) => /\/ask\.|\/api\/ask|terminal/.test(u)), `nothing of /ask at page load: ${requests.filter((u) => /ask|terminal/.test(u))}`);
  await open();
  assert.ok(!requests.some((u) => /\/ask\.[\w-]+\.js/.test(u)), 'ask chunk not loaded by opening the terminal');
  assert.ok((await lines()).some((l) => l.startsWith('/ask') && l.includes(t.cmd)), '/help lists /ask');
  // the chip types "/ask " and waits
  await ev(`[...document.querySelectorAll('#term .term__chips button')].find((b) => b.textContent === '/ask').click()`);
  await until(`document.querySelector('#term input').value === '/ask '`);
  await sleep(200);
  assert.equal(await ev(`document.querySelector('#term input').value`), '/ask ');
  assert.equal(await ev(`document.activeElement === document.querySelector('#term input')`), true);
  ok(`${lang}: /ask listed in /help and the chips; chip types "/ask " and waits; nothing of /ask loads with the page or the terminal`);
  await type('/ask');
  const usage = await lines();
  assert.ok(usage.includes(t.usage) && usage.filter((l) => l.startsWith('/ask ')).length === 3, '/ask alone: usage + 3 examples');
  ok(`${lang}: /ask alone -> usage and examples`);

  // first question: privacy line once, streamed answer, then not dim
  await type('/ask who are you?');
  await until(`[...document.querySelectorAll('#term .term__log p')].some((p) => p.textContent === ${JSON.stringify(t.privacy)})`);
  assert.equal(await busy(), 'true', 'aria-busy while answering');
  await idle();
  assert.ok(requests.some((u) => /\/ask\.[\w-]+\.js/.test(u)), 'ask chunk loaded on the first question');
  assert.ok((await lastLine()).startsWith(t.answer), await lastLine());
  assert.equal(await ev(`document.querySelector('#term .term__log').lastElementChild.lastElementChild.className`), '', 'answer not dim');
  assert.ok(!(await lastUser()).includes('EARLIER'), 'first question: no history');
  // follow-up: memory sent, privacy line not repeated
  await type('/ask and your team?');
  await idle();
  let u = await lastUser();
  assert.ok(u.includes('Visitor: who are you?\nYou: ' + t.answer), 'previous turn sent as EARLIER');
  assert.ok(u.endsWith(`Visitor's question:\n"""\nand your team?\n"""`));
  assert.equal((await lines()).filter((l) => l === t.privacy).length, 1, 'privacy line once');
  ok(`${lang}: privacy line once, answer streams then turns bright, follow-up carries the previous turn`);

  // trim on finish_reason length, the tokens, the number check, errors
  await type('/ask MOCKLENGTH');
  await idle();
  assert.equal(await lastLine(), 'I lead the Greenn Club team.');
  for (const [q, want] of [['MOCKNOTFOUND x', t.notFound], ['MOCKOFFTOPIC x', t.offTopic], ['MOCKNUMBER x', t.unverified], ['MOCK500 x', t.unavailable], ['MOCKSTREAMERR x', t.unavailable], ['x'.repeat(501), t.long.replace('{n}', '500')]]) {
    await type(`/ask ${q}`);
    await idle();
    assert.equal(await lastLine(), want, q);
  }
  assert.ok(t.notFound.includes('contato@hugobsan.com.br'), 'NOT_FOUND line has the email');
  ok(`${lang}: length cut -> "I lead the Greenn Club team."; NOT_FOUND, OFF_TOPIC, number, 500, stream error, 501 chars -> our localized lines`);
  // only answered turns are remembered: 2 so far
  await type('/ask MOCKECHO');
  await idle();
  u = await lastUser();
  assert.equal(u.match(/^Visitor: /gm).length, 3, 'who are you, and your team, MOCKLENGTH');
  assert.ok(!u.includes('MOCKNOTFOUND') && !u.includes('MOCK500'), 'refusals and errors are not remembered');

  // abort: Esc keeps the terminal open, Ctrl+C, closing
  await type('/ask MOCKDRIP tell me more');
  await until(`document.querySelector('#term .term__log').lastElementChild.textContent.length > 4`);
  await ev(`document.querySelector('#term input').focus()`);
  await key('Escape', 'Escape', 27);
  await until(`document.querySelector('#term .term__log').lastElementChild.textContent === ${JSON.stringify(t.stopped)}`);
  assert.equal(await ev(`document.querySelector('#term').open`), true, 'Esc during an answer keeps the dialog open');
  await type('/ask MOCKDRIP again');
  await until(`document.querySelector('#term .term__log').lastElementChild.textContent.length > 4`);
  await key('c', 'KeyC', 67, 2);
  await until(`document.querySelector('#term .term__log').lastElementChild.textContent === ${JSON.stringify(t.stopped)}`);
  await type('/ask MOCKDRIP closing');
  await until(`document.querySelector('#term .term__log').lastElementChild.textContent.length > 4`);
  await ev(`document.querySelector('#term .term__close').click()`);
  await until(`!document.querySelector('#term').open`);
  await sleep(300);
  await open();
  assert.equal(await lastLine(), t.stopped, 'closing stopped it');
  const before = (await (await fetch(`${M}/stats`)).json()).calls;
  await key('Escape', 'Escape', 27); // nothing in flight: Esc closes
  await until(`!document.querySelector('#term').open`);
  await open();
  ok(`${lang}: Esc stops and keeps the terminal open (next Esc closes), Ctrl+C stops, closing stops`);
  // scroll follows the stream
  await type('/ask MOCKLONG');
  await idle();
  assert.ok(await ev(`(() => { const l = document.querySelector('#term .term__log'); return l.scrollHeight - l.scrollTop - l.clientHeight < 4; })()`), 'log at the bottom');

  // /clear forgets
  await type('/ask MOCKECHO');
  await idle();
  u = await lastUser();
  assert.ok(u.includes('EARLIER') && !u.includes('MOCKDRIP'), 'stopped answers are not remembered');
  assert.equal(u.match(/^Visitor: /gm).length, 5, '5 turns');
  await type('/ask MOCKECHO');
  await idle();
  u = await lastUser();
  assert.equal(u.match(/^Visitor: /gm).length, 5, 'capped at 5 turns');
  assert.ok(!u.includes('Visitor: who are you?'), 'the oldest dropped');
  await type('/clear');
  assert.deepEqual(await lines(), []);
  await type('/ask who are you?');
  await idle();
  assert.ok(!(await lastUser()).includes('EARLIER'), '/clear reset the memory');
  // and a reload too
  await type('/ask and then?');
  await idle();
  assert.ok((await lastUser()).includes('EARLIER'));
  assert.ok((await (await fetch(`${M}/stats`)).json()).calls > before);
  ok(`${lang}: stopped answers not remembered; memory capped at 5 turns; /clear resets it; scroll follows the answer`);
  await load(lang === 'en' ? '/' : `/${lang}/`);
  await open();
  await type('/ask who are you?');
  await idle();
  assert.ok(!(await lastUser()).includes('EARLIER'), 'reload reset the memory');
  assert.equal((await lines()).filter((l) => l === t.privacy).length, 1, 'privacy line again after a reload');
  ok(`${lang}: a reload resets the memory (nothing persisted)`);
};

const T = async (lang) => {
  const j = await (await fetch(`${SITE}/terminal/${lang}.json`)).json();
  return { ...j.ask, usage: j.out.ask[0][0][0], cmd: j.out.help.find((l) => l[0][0] === '/ask')[1][0] };
};
if (process.argv[2] === 'limits') {
  // DAILY_PER_VISITOR 2, DAILY_GLOBAL 3: two answers, then the visitor line; another visitor takes the last
  // global slot, then the site line, in en and pt
  for (const [lang, path] of [['en', '/'], ['pt', '/pt/']]) {
    const t = await T(lang);
    await load(path);
    await open();
    if (lang === 'en') {
      for (let i = 0; i < 2; i++) {
        await type('/ask who are you?');
        await idle();
      }
      await type('/ask who are you?');
      await idle();
      assert.equal(await lastLine(), t.visitor);
      ok(`en: 3rd question from the same visitor -> "${t.visitor}"`);
      const other = await fetch(`${SITE}/api/ask`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '10.9.9.9' }, body: '{"q":"hi"}' });
      assert.equal(other.status, 200, 'another visitor still served');
      await other.text();
    }
    await type('/ask who are you?');
    await idle();
    assert.equal(await lastLine(), t.site);
    ok(`${lang}: site cap reached -> "${t.site}"`);
  }
} else {
  const ANS = { en: "I'm a Tech Lead at Greenn", pt: 'Sou Tech Lead na Greenn' };
  for (const lang of ['en', 'pt']) await run(lang, { ...(await T(lang)), answer: ANS[lang] });
}
await fetch(`http://127.0.0.1:9333/json/close/${tab.id}`);
console.log('ALL PASS');
process.exit(0);
