// Master copy (docs/COPY.md). Every other locale must satisfy this shape.
const en = {
  meta: {
    title: 'Hugo Barbosa · Tech Lead, AI and Software Engineering',
    description: 'Tech Lead at Greenn. I build AI products that hold up in production: LLM pipelines, RAG, resilient queues and agentic engineering. Open to remote roles and consulting.',
  },
  skip: 'Skip to content',
  nav: { label: 'Primary', services: 'Services', work: 'Work', experience: 'Experience', contact: 'Contact', lang: 'Language' },
  hero: {
    h1: 'I build AI products that hold up in production.',
    sub: 'Tech Lead at Greenn, working remotely from Brazil (UTC-3). LLM pipelines, resilient queues and agentic engineering.',
    primary: 'Work with me',
    secondary: 'See the work',
  },
  offers: {
    h: 'Three ways to work together',
    items: [
      { t: 'Join your team.', d: 'Remote Tech Lead or Senior Engineer. I set standards, review every change and keep delivery predictable.' },
      { t: 'Consulting.', d: 'AI integration, architecture reviews and cloud cost audits. Clear findings your team can act on in the next sprint.' },
      { t: 'Build it for you.', d: 'Software delivered as a service, from scoping to production, with tests, documentation and a clean handover.' },
    ],
    proof: [
      { t: 'Lean teams.', d: 'Experience leading small teams from architecture to delivery.' },
      { t: 'AI in production.', d: 'LLMs, RAG, voice and video pipelines serving real users.' },
      { t: 'Cost under control.', d: 'Architecture and infrastructure reviews that cut recurring spend.' },
      { t: 'Since 2019.', d: 'Shipping software to production, from freelance systems to SaaS.' },
    ],
  },
  work: {
    h: 'Selected work',
    stack: 'Stack',
    bluee: {
      name: 'Bluee',
      lede: 'An AI platform that turned a topic into a complete online course, with lessons, narration and an avatar presenter.',
      role: 'Role: Back-end engineer, then Tech Lead. 2025 to 2026.',
      highlight: { n: '1 hour', l: 'from a topic to a complete AI-generated course' },
      bullets: [
        'LLM layer on OpenRouter with streaming and fallbacks, plus agentic chat with parallel tool calls.',
        'RAG over user documents: sandboxed extraction, batched embeddings, pgvector search.',
        'Avatar video pipeline: ComfyUI lip-sync and image-to-video, ElevenLabs voice cloning, Remotion rendering.',
        'RabbitMQ jobs with backoff retries, idempotency checks and delayed queues.',
      ],
    },
    club: {
      name: 'Greenn Club',
      lede: 'The members area where course creators host and deliver their courses to thousands of students.',
      role: 'Role: Tech Lead. 2026.',
      highlight: { n: 'R$20k+', l: 'saved per month on video storage' },
      bullets: [
        'Verifiable certificates signed with ECDSA, a public key set and QR validation anyone can check.',
        'Fair dispatch: per-tenant scheduling so one large creator never starves the queue for everyone else.',
        'Subtitle pipeline moved from polling to webhooks, hardened against concurrent deliveries.',
        'Legacy webhooks moved into the domain layer behind characterization tests.',
      ],
    },
    prp: {
      name: 'PR Review Panel',
      note: 'Internal tool, no public link',
      lede: 'My own tool for reviewing pull requests in depth: six phases run by Claude Code agents, in parallel, on every PR.',
      role: 'Role: Creator. 2026.',
      highlight: { n: '260+', l: 'pull requests I reviewed in 2026' },
      bullets: [
        'Six phases (quality, code, coupling, over-engineering, tests and team standards), each returning findings in a strict JSON schema.',
        'An adversarial agent tries to refute every blocking finding, and Jev, a decision model on OpenRouter, triages the rest.',
        'Agents navigate the code through a Graphify knowledge graph, with closed tool lists, read-only access and isolated git worktrees.',
        'Every design choice is measured. One variant was dropped for costing 132% more.',
      ],
    },
  },
  experience: {
    h: 'Experience',
    items: [
      {
        period: '2026 to now', role: 'Tech Lead', org: 'Greenn',
        bullets: [
          'Teams of up to 6 developers across Bluee and Greenn Club.',
          'I set the architecture and code standards, and reviewed 260+ pull requests in 2026.',
          'Cost reviews that cut more than R$20k per month in video storage and mapped up to 50% infrastructure savings.',
          'Security issues caught in review before they reached production.',
        ],
      },
      {
        period: '2025', role: 'Back-end Developer', org: 'Greenn',
        bullets: [
          'Built the AI core of Bluee: LLM layer, agentic chat, RAG and the avatar video pipeline.',
          'Hardened RabbitMQ jobs with backoff retries, idempotency and delayed queues.',
        ],
      },
      {
        period: '2024 to 2025', role: 'Full-stack Developer', org: 'Betabit',
        bullets: [
          'Led the AI chat module of a real-estate CRM: Gemini, RAG with PGVector and WhatsApp agents, answering in under 100 ms for about 3,000 requests a day.',
          'Built a real-time marketing dashboard with Laravel Reverb and a Python ETL service.',
          'Docker and GitHub Actions cut developer onboarding from hours to minutes.',
        ],
      },
      {
        period: '2022 to 2024', role: 'Web Developer', org: 'UNIMONTES',
        bullets: [
          'Rebuilt the university\'s extension management system, which every extension department adopted again.',
          'Refactored the queries that blocked the system at enrollment peaks, and built a micro-certification module presented at CIEI 2024.',
          'Introduced Git Flow and PR standards, mentored an intern and taught a Laravel workshop.',
        ],
      },
      {
        period: '2021 to 2022', role: 'Research Scholar', org: 'UNIMONTES',
        bullets: [
          'Modeled the new graduate admissions system with the graduate programs: requirements, data model and architecture.',
          'Left a continuity guide used by the next scholars, and a paper at FEPEG 2022.',
        ],
      },
      {
        period: '2017 to 2021', role: 'Early years', org: '',
        bullets: [
          'IT technician at IFNMG, then freelance web development and computer repair as a sole proprietor.',
          'First systems in production: a website for a solar energy company and an offline point of sale for a local shop.',
        ],
      },
    ],
  },
  how: {
    h: 'How I work',
    principles: [
      { t: 'Guardrails before autonomy.', d: 'AI agents get closed tool lists, strict output schemas and a reviewer that argues back.' },
      { t: 'Built for production, priced for scale.', d: 'Architecture that holds real load without the cloud bill growing faster than the user base.' },
      { t: 'Trade-offs in the open.', d: 'Every technical decision comes with the options I rejected, what each one costs and what could go wrong, written down as an ADR.' },
      { t: 'Uncertainty first.', d: 'Spikes, prototypes and real numbers come before commitments, so estimates stop being guesses.' },
      { t: 'Security and quality from the first commit.', d: 'Threat checks, tests and code review are part of done.' },
      { t: 'The simplest solution that works.', d: 'Occam\'s razor for software: fewer moving parts break less and cost less at scale.' },
      { t: 'A team that keeps learning.', d: 'I review to teach, write decisions down and pair with people, so the team decides well when I am not in the room.' },
    ],
    toolH: 'Toolbox',
    tool: 'Claude Code, Codex and Cursor every day, with prompt engineering, harnesses and guardrails. Jev, Graphify and Ponytail for defensive automated review.',
    learnH: 'Learning',
    learn: 'TechLead de Impacto mentorship with Alexandro Hervis. Postgraduate in Software Engineering for Applied AI at UniPDS, with professors such as Erick Wendel. Reading: Clean Code, The Clean Coder, The Pragmatic Programmer, Tidy First?, Software Architecture: The Hard Parts.',
  },
  side: {
    h: 'Side projects',
    featured: {
      scanlex: { name: 'Scanlex and Timesheet Transcriber AI (2025)', text: 'A SaaS that digitized timesheets and payslips for payroll specialists, with paying subscribers, and its free open-source version: bring your own Gemini key, crop pages, export to CSV or XLSX. Laravel, Vue, React, Gemini.' },
      km: { name: 'KM Topografia', text: 'HR document and fleet management for a land surveying company, in production. Expiry alerts by email and WhatsApp, S3 with a local cache, audited roles. I designed the architecture and the infrastructure. Laravel 12, PostgreSQL, Docker. Private repository.' },
      mia: { name: 'Mia (2025)', text: 'WhatsApp receptionist for health clinics: leads, scheduling and reminders. Ran in production at two clinics. N8N, Gemini, Evolution API.' },
      anthrya: { name: 'anthrya', text: 'Health app built AI-first: Bluetooth body scale, diet, glucose, workouts and body measurements, all reachable by AI through an MCP server. Raw readings stay separate from estimates, so history can be recalculated. 100+ ADRs. Expo, Supabase, Hono. In development, private.' },
    },
  },
  edu: {
    h: 'Education',
    items: [
      { t: 'Postgraduate specialization in Software Engineering for Applied AI (360 hours).', m: 'UniPDS, 2026 to 2027.' },
      { t: 'B.Sc. Information Systems.', m: 'UNIMONTES, 2021 to 2025. Thesis on BERT models for bug localization.' },
      { t: 'IT Technician.', m: 'IFNMG, 2017 to 2019.' },
    ],
    projectsH: 'Research projects',
    projects: [
      { t: 'Research project: improving the accuracy of traceability recovery between software artifacts with generative AI.', m: 'UNIMONTES, 2024 to now.', d: 'Language models rewrite bug and feature descriptions so search engines can find the relevant source code during software maintenance.', paper: '' },
      { t: 'Undergraduate research (PIBIC/FAPEMIG): a system for managing selection processes at UNIMONTES.', m: '2021 to 2022.', d: 'Requirements gathered with the graduate programs, data model and architecture for the new admissions system.', paper: 'Paper at FEPEG 2022.' },
      { t: 'Volunteer undergraduate research (ICV): residential installations with solar micro-generation.', m: '2020 to 2021.', d: 'Monitoring photovoltaic efficiency by combining consumption data from an Arduino three-phase meter with the inverter\'s production data.', paper: 'Paper at FEPEG 2020.' },
    ],
    pubH: 'Publications',
    pubNote: 'Titles translated; papers in Portuguese.',
    pubMore: 'All 8 publications',
    pubs: [
      { t: 'Exploratory analysis of BERT-based models for software bug localization.', v: 'ENMC 2025' },
      { t: 'Comparative analysis of proprietary embedding models for bug localization.', v: 'Manuscript, 2025' },
      { t: 'Performance of pre-trained embedding models for bug localization on ArgoUML.', v: 'CIEI 2025' },
      { t: 'SBERT for software bug localization.', v: 'CIEI 2024' },
      { t: 'Micro-certification module for a university extension management system.', v: 'CIEI 2024' },
      { t: 'Impact of the Internet of Things on quality of life at home.', v: 'CBICT 2022, honorable mention' },
      { t: 'A web application for graduate admissions.', v: 'FEPEG 2022' },
      { t: 'Performance of a photovoltaic plant from automatically collected data.', v: 'FEPEG 2020' },
    ],
  },
  contact: {
    h: 'Have a team to lead or a system to fix?',
    sub: 'Remote roles, consulting and product builds.',
    langH: 'Languages',
    langs: [
      { name: 'Portuguese', level: 'native' },
      { name: 'English', level: 'intermediate' },
      { name: 'Spanish', level: 'intermediate' },
      { name: 'French', level: 'beginner' },
    ],
    copy: 'Copy email',
    copied: 'Copied',
  },
  footer: '© 2026 Hugo Barbosa. Built with Astro and Three.js.',
  notFound: {
    title: 'Page not found',
    home: 'Back to home',
  },
};

export default en;
export type Dict = typeof en;
