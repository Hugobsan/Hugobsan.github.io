// Fixed facts: written once, shared by every locale, the JSON-LD and llms*.txt.
export const SITE = 'https://hugobsan.com.br';
export const EMAIL = 'contato@hugobsan.com.br';
export const LINKEDIN = 'https://www.linkedin.com/in/hugobsan/';
export const GITHUB = 'https://github.com/Hugobsan';
export const GREENN = 'https://greenn.com.br';
export const CLUB = 'https://greenn.com.br/club/';

// Bug localization research (Mean Reciprocal Rank on ArgoUML 0.22). Off the page, kept in full for llms-full.txt.
export const MRR: [approach: string, mrr: number][] = [
  ['BERT bi-encoders, best result', 0.0705],
  ['Doc2Vec baseline', 0.1975],
  ['Proprietary code embeddings (voyage-4-large)', 0.2314],
  ['LLM agent with search tools', 0.3782],
  ['Hybrid, agent plus semantic ranking', 0.4048],
];

export const STACKS = {
  bluee: ['Laravel 12', 'PHP 8.4', 'Python', 'React', 'RabbitMQ', 'Redis', 'PostgreSQL', 'pgvector', 'OpenRouter', 'ComfyUI', 'ElevenLabs', 'Remotion', 'AWS'],
  club: ['Laravel 11', 'Vue 3', 'Redis', 'RabbitMQ', 'MySQL', 'S3', 'PandaVideo'],
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
