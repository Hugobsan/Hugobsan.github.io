# hugobsan-ask: the Worker behind `/ask`

`POST https://hugobsan.com.br/api/ask` with `{ q, lang, history }` answers a question about Hugo, as Hugo, from
<https://hugobsan.com.br/llms-full.txt> (fetched and cached for an hour), through any OpenAI-compatible Chat
Completions API. The terminal (`src/scripts/ask.ts`) is its only client. The browser only sees normalized events
(`{"t"}`, `{"done"}`, `{"error"}`), never the provider's data. Questions and answers are never logged or stored. The
daily limits keep a salted hash of the IP and the day, in a Durable Object, and delete earlier days at UTC midnight.

The route sits on the site's own origin (`hugobsan.com.br/api/ask`), so there is no CORS. GitHub Pages serves
everything else as before.

## Deploy

The secrets `AI_API_KEY` and `VISITOR_SALT` are already set on `hugobsan-ask`.

```sh
cd worker
npm ci
npx wrangler deploy
```

Then check it from the live site: open the terminal, run `/ask where do you work?`. From a shell (no Origin header):

```sh
curl -N https://hugobsan.com.br/api/ask -H 'Content-Type: application/json' -d '{"q":"where do you work?","lang":"en"}'
```

The first deploy creates the route and the `Limits` Durable Object (migration `v1`). This needs the `hugobsan.com.br`
zone on Cloudflare with the apex record proxied (orange cloud), which it already is. If a WAF rule, Bot Fight Mode
or a challenge covers `/api/*`, exempt `/api/ask`: a challenge page breaks a `fetch` POST.

Rotate a secret with `npx wrangler secret put AI_API_KEY` (or `VISITOR_SALT`). A new salt only changes the hashes,
so today's per-visitor counts start again.

Spending: set a monthly limit on the provider side too (Anthropic Console, workspace of the key). The Worker caps
requests (`DAILY_GLOBAL`) and output tokens (`MAX_OUTPUT_TOKENS`), not dollars.

## Limits and settings

Everything is a `[vars]` entry in `wrangler.toml`. Change it and deploy again. Edits made in the Cloudflare dashboard
are overwritten by the next `wrangler deploy`.

| Var | Default | What it does |
| --- | --- | --- |
| `DAILY_PER_VISITOR` | `20` | Questions per visitor (salted hash of `CF-Connecting-IP`) per UTC day |
| `DAILY_GLOBAL` | `1000` | Questions for the whole site per UTC day |
| `MAX_QUESTION_CHARS` | `500` | Characters (code points) of the current question only; the rules, examples, profile and history are not counted |
| `MAX_OUTPUT_TOKENS` | `2000` | `max_tokens` sent to the provider. If the answer is cut, the browser keeps only its whole sentences |
| `MAX_HISTORY_TURNS` | `5` | Earlier question and answer pairs a request may carry; older ones are dropped. Past answers are cut to 1,200 characters, past questions to `MAX_QUESTION_CHARS` |
| `AI_BASE_URL`, `AI_MODEL`, `AI_EXTRA` | Anthropic | The provider (next section) |
| `SITE_ORIGIN` | `https://hugobsan.com.br` | The only `Origin` accepted (a request with no `Origin`, like curl, is accepted too) |
| `PROFILE_URL` | `.../llms-full.txt` | The grounding |
| `ALLOW_LOCALHOST` | `"false"` | `"true"` only for local runs: accepts `http://localhost` and `127.0.0.1` origins |

The body is capped at 48 KB (a full history in Chinese fits). Rejected requests (too long, malformed, wrong origin)
do not count against the limits; a provider failure does.

## Providers

The Worker calls `{AI_BASE_URL}/chat/completions` with `Authorization: Bearer {AI_API_KEY}`, `stream: true`,
`max_tokens` and the JSON in `AI_EXTRA` merged into the body. No `temperature` or `top_p`.

### Anthropic (current)

```toml
AI_BASE_URL = "https://api.anthropic.com/v1"
AI_MODEL = "claude-haiku-5-5"
AI_EXTRA = '{"thinking":{"type":"disabled"}}'
```

- Claude Haiku 5.5 thinks by default; `{"type":"disabled"}` is accepted at its default effort (`medium`) and keeps
  `max_tokens` for the answer.
- Use a workspace API key (the default kind in the Console). A key that is not scoped to a workspace also needs an
  `anthropic-workspace-id` header, which this Worker does not send.
- Anthropic describes this compatibility layer as meant for testing and comparison, not as a long-term production
  path; prompt caching is not available through it.
- Sources: <https://platform.claude.com/docs/en/api/openai-sdk>, model ids and thinking rules from the Claude API
  reference.

### Gemini (when the Anthropic credits run out)

```toml
AI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai"
AI_MODEL = "gemini-3.5-flash-lite"
AI_EXTRA = '{"reasoning_effort":"minimal"}'
```

Then `npx wrangler secret put AI_API_KEY` with a Gemini API key, and deploy.

- `gemini-3.5-flash-lite` is stable, thinks at `minimal` by default and costs $0.30 / $2.50 per million input /
  output tokens. `gemini-3.1-flash-lite` is cheaper ($0.25 / $1.50). For `gemini-3.8-flash` ($0.75 / $3.75 until
  2026-12-31, then $1.50 / $7.50), `minimal` does not exist: use `{"reasoning_effort":"low"}`.
- Gemini 3 models cannot turn thinking off. Thinking tokens count inside `max_tokens` and are billed as output, so
  if answers come back cut, raise `MAX_OUTPUT_TOKENS` a little.
- Do not keep the Anthropic `thinking` field in `AI_EXTRA`. `reasoning_effort` and `extra_body.google.thinking_config`
  cannot be sent together.
- Use a key from a project with billing on: on the free tier Google may use prompts to improve its products, which
  the privacy line in the terminal does not cover.
- Google does not document the `finish_reason` it streams for a token cut. The Worker treats anything other than
  `stop` as a cut and trims to the last whole sentence; check one long answer after switching.
- Sources: <https://ai.google.dev/gemini-api/docs/openai>, <https://ai.google.dev/gemini-api/docs/thinking>,
  <https://ai.google.dev/gemini-api/docs/models>, <https://ai.google.dev/gemini-api/docs/pricing>.

## Local development with the mock

No real key needed: `test/mock.mjs` is an OpenAI-compatible streaming endpoint (and serves the profile), and
`npm run dev:mock` runs the Worker against it with the built site as static assets, so the page and `/api/ask`
share one origin, exactly as in production. Nothing about this ships.

```sh
npm run build                   # at the repo root: dist/, including dist/llms-full.txt
cd worker
npm run mock                    # terminal 1: http://127.0.0.1:8790
npm run dev:mock                # terminal 2: the site and the Worker on http://127.0.0.1:8787
npm test                        # terminal 3: the Worker checks
```

Open <http://127.0.0.1:8787/> and use the terminal. The mock reads markers in the question: `MOCKNOTFOUND`,
`MOCKOFFTOPIC`, `MOCKNUMBER`, `MOCKLENGTH` and `MOCKLISTCUT` (cut by the token cap), `MOCKDRIP` (slow, to try Esc),
`MOCK401` / `MOCK402` / `MOCK429` / `MOCK500`, `MOCKSTREAMERR`, `MOCKSLOW` (never answers: the 25 s timeout).

Extra vars go after `--`, for example the global cap check:

```sh
npm run dev:mock -- --var DAILY_GLOBAL:5        # then: node test/worker-test.mjs global
npm run dev:mock -- --var DAILY_PER_VISITOR:200 # then: node test/browser-test.mjs (headless Chrome on port 9333)
```

`npm run check` type-checks the Worker. `npm run dev` (plain `wrangler dev`) uses the real provider: it needs the
secrets in a local `.dev.vars` file, which is git-ignored.
