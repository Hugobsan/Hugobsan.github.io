// Fixed facts: written once, shared by every locale, the JSON-LD and llms*.txt.
export const SITE = 'https://hugobsan.com.br';
export const EMAIL = 'contato@hugobsan.com.br';
export const LINKEDIN = 'https://www.linkedin.com/in/hugobsan/';
export const GITHUB = 'https://github.com/Hugobsan';
export const GREENN = 'https://greenn.com.br';
export const CLUB = 'https://greenn.com.br/club/';
export const BLUEE = 'https://greenn.com.br/bluee/';

// Bug localization research (Mean Reciprocal Rank on ArgoUML 0.22). Published results only; off the page, kept for llms-full.txt.
export const MRR: [approach: string, mrr: number][] = [
  ['Pretrained BERT bi-encoders without fine-tuning, best result', 0.0705],
  ['Doc2Vec baseline', 0.1975],
];

export const STACKS = {
  bluee: ['Laravel 12', 'PHP 8.4', 'Python', 'React', 'RabbitMQ', 'Redis', 'PostgreSQL'],
  club: ['Laravel 11', 'Vue 3', 'Redis', 'RabbitMQ', 'MySQL', 'S3'],
  prp: ['Next.js', 'TypeScript', 'SQLite FTS5', 'Claude Code', 'OpenRouter', 'Graphify', 'GitHub CLI'],
};

// side project links, keyed like side.featured in the dictionaries
export const LINKS: Record<string, { label: string; href: string }[]> = {
  km: [{ label: 's.kmtopografia.com.br', href: 'https://s.kmtopografia.com.br' }],
  scanlex: [
    { label: 'timesheet-transcriber-ai.vercel.app', href: 'https://timesheet-transcriber-ai.vercel.app' },
    { label: 'GitHub', href: 'https://github.com/Hugobsan/Timesheet-Transcriber-Ai' },
  ],
};

// BCP 47 codes, same order as contact.langs in the dictionaries
export const LANGUAGES = ['pt-BR', 'en', 'es', 'fr'];

export const KNOWS_ABOUT = [
  'Large language models', 'Retrieval-augmented generation', 'Agentic engineering', 'AI code review',
  'Software architecture', 'Message queues', 'Idempotency', 'Cloud cost optimization', 'Bug localization',
  'Laravel', 'PHP', 'Python', 'TypeScript', 'React', 'Vue', 'RabbitMQ', 'Redis', 'PostgreSQL', 'pgvector', 'AWS',
];

// "How I work" sphere and the terminal's /skills. Names read the same in every locale; the group labels are
// how.cats in the dictionaries. The first three of each group render larger on the sphere.
export const SKILLS = {
  ai: ['LLMs', 'RAG', 'Claude Code', 'Embeddings', 'pgvector', 'OpenRouter', 'Gemini', 'MCP', 'Codex', 'Cursor', 'Jev', 'Graphify', 'BERT', 'N8N'],
  back: ['Laravel', 'PHP', 'Python', 'Java', 'Spring Boot', 'RabbitMQ', 'Redis', 'PostgreSQL', 'MySQL', 'SQLite', 'Node.js', 'Laravel Octane', 'Laravel Reverb', 'SSE', 'Webhooks'],
  front: ['TypeScript', 'React', 'Vue', 'Next.js', 'Inertia', 'Quasar', 'Astro', 'Expo', 'Three.js', 'GSAP'],
  infra: ['Docker', 'AWS', 'GitHub Actions', 'Datadog', 'S3', 'Cloudflare', 'Supabase', 'Linux'],
  craft: ['TDD', 'ADR', 'Pest', 'SDD', 'DDD', 'Clean Architecture', 'SOLID', 'KISS', 'YAGNI', 'CI/CD', 'Git Flow', 'ECDSA'],
} as const;
export type Skill = (typeof SKILLS)[keyof typeof SKILLS][number];

// skills each principle lights up on the sphere, same order as how.principles
export const PRINCIPLE_SKILLS: Skill[][] = [
  ['Claude Code', 'Codex', 'Cursor', 'MCP', 'Jev', 'Graphify', 'OpenRouter', 'LLMs', 'SDD'], // guardrails before autonomy: agents work from a spec
  ['RabbitMQ', 'Redis', 'AWS', 'S3', 'Cloudflare', 'Docker', 'PostgreSQL', 'Laravel Octane', 'Datadog'], // built for production, priced for scale
  ['ADR', 'DDD', 'Clean Architecture', 'SOLID'], // trade-offs in the open
  ['Python', 'BERT', 'Embeddings', 'RAG', 'Datadog'], // uncertainty first: measure before committing
  ['TDD', 'Pest', 'ECDSA', 'CI/CD', 'GitHub Actions'], // security and quality from the first commit
  ['KISS', 'YAGNI', 'SQLite', 'Astro', 'Laravel'], // the simplest solution that works
  ['Git Flow', 'ADR', 'Pest', 'Laravel'], // a team that keeps learning
];

// /ask: the longest question the terminal sends. The Worker enforces MAX_QUESTION_CHARS (worker/wrangler.toml) on its own: keep them equal
export const ASK_MAX_CHARS = 500;
