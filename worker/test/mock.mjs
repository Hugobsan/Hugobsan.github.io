// Mock OpenAI-compatible Chat Completions (streaming) + the site's llms-full.txt, for `wrangler dev` tests.
// Run: npm run mock (from worker/, after `npm run build` at the root). Listens on 127.0.0.1:8790
// Behaviour is keyed by markers in the CURRENT question (the text after "Visitor's question:"), never the history.
// GET /stats -> {calls, last: {url, auth, body}}, GET /reset clears them.
import http from 'node:http';
import fs from 'node:fs';
const PROFILE = process.argv[2];
let calls = 0, last = null;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ANSWERS = {
  'Brazilian Portuguese': 'Sou Tech Lead na Greenn, uma plataforma brasileira de pagamentos e cursos online. Trabalho remoto do Brasil.',
  Spanish: 'Soy Tech Lead en Greenn, una plataforma brasileña de pagos y cursos en línea.',
  'Simplified Chinese': '我是 Greenn 的技术负责人。我在巴西远程工作。',
  English: "I'm a Tech Lead at Greenn, a Brazilian payments and online courses platform. I work remotely from Brazil (UTC-3).",
};
http.createServer(async (req, res) => {
  if (req.url === '/llms-full.txt') return res.end(fs.readFileSync(PROFILE));
  if (req.url === '/stats') return res.end(JSON.stringify({ calls, last }));
  if (req.url === '/reset') { calls = 0; last = null; return res.end('ok'); }
  let body = '';
  for await (const c of req) body += c;
  calls++;
  last = { url: req.url, auth: req.headers.authorization, body: JSON.parse(body) };
  const msgs = last.body.messages;
  const content = msgs.at(-1).content;
  const q = content.slice(content.lastIndexOf("Visitor's question:"));
  const lang = Object.keys(ANSWERS).find((l) => msgs[0].content.includes(`Answer in ${l}`)) ?? 'English';
  for (const code of [401, 402, 429, 500]) if (q.includes(`MOCK${code}`)) { res.writeHead(code, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ error: { message: 'secret upstream detail sk-ant-xyz', type: 'x' } })); }
  if (q.includes('MOCKSLOW')) return; // never answers: the Worker's timeout
  res.writeHead(200, { 'Content-Type': 'text/event-stream' });
  const text = q.includes('MOCKNOTFOUND') ? 'NOT_FOUND' :
    q.includes('MOCKOFFTOPIC') ? 'OFF_TOPIC' :
    q.includes('MOCKNUMBER') ? 'I saved R$999,999 per month at Greenn.' :
    q.includes('MOCKLONG') ? 'One. Two. Three. Four. Five. Six.' :
    q.includes('MOCKLISTCUT') ? 'Some projects:\n- Bluee, an AI course platform.\n- Greenn Club certificates\n- PR Review Pan' :
    q.includes('MOCKLENGTH') ? 'I lead the Greenn Club team. I built verifiable certificates and a fair dispatch for the queu' :
    q.includes('MOCKECHO') ? `You asked ${msgs.length} messages deep.` : ANSWERS[lang];
  const cutoff = q.includes('MOCKLENGTH') || q.includes('MOCKLISTCUT');
  const parts = /MOCK(NOTFOUND|OFFTOPIC)/.test(q) ? text.match(/.{1,3}/g) : text.match(/\S+\s*/g);
  for (const p of parts) {
    res.write(`data: ${JSON.stringify({ choices: [{ index: 0, delta: { content: p } }] })}\n\n`);
    await sleep(q.includes('MOCKDRIP') ? 400 : 30);
    if (q.includes('MOCKSTREAMERR')) { res.write(`data: ${JSON.stringify({ error: { message: 'overloaded' } })}\n\n`); return res.end(); }
    if (res.destroyed) return;
  }
  // the last chunk carries finish_reason, as OpenAI-compatible APIs send it
  res.write(`data: ${JSON.stringify({ choices: [{ index: 0, delta: {}, finish_reason: cutoff ? 'length' : 'stop' }] })}\n\n`);
  res.write('data: [DONE]\n\n');
  res.end();
}).listen(8790, '127.0.0.1', () => console.log('mock on 8790'));
