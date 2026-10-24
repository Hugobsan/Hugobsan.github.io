// Master copy (docs/COPY.md). Every other locale must satisfy this shape.
const en = {
  meta: {
    title: 'Hugo Barbosa · Tech Lead, AI and Software Engineering',
    description: 'Tech Lead at Greenn. I build AI products that hold up in production: LLM pipelines, RAG, resilient queues and agentic engineering.',
  },
  skip: 'Skip to content',
  cjk: false, // true where headings need word-level line breaks (Chinese)
  nav: { label: 'Primary', services: 'About', work: 'Work', experience: 'Experience', contact: 'Contact', lang: 'Language' },
  hero: {
    eyebrow: 'Hugo Barbosa · Tech Lead',
    h1: 'I build AI products that hold up in production.',
    sub: 'Tech Lead at Greenn, a Brazilian payments and online courses platform, working remotely from Brazil (UTC-3). LLM pipelines, resilient queues and agentic engineering.',
    primary: 'Get in touch',
    secondary: 'See the work',
  },
  offers: {
    h: 'What I bring',
    proof: [
      { t: 'Technical leadership.', d: 'From architecture to delivery, with teams that decide well even when I am not in the room.' },
      { t: 'AI in production.', d: 'LLMs, RAG, voice and video pipelines serving real users.' },
      { t: 'Cost under control.', d: 'Architecture and infrastructure reviews that mapped up to 50% in savings.' },
      { t: 'Since 2018.', d: 'Shipping software to production, from freelance systems to SaaS.' },
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
        'LLM layer with streaming and provider fallbacks, plus an agentic chat with parallel tool calls.',
        'RAG over the user\'s own documents.',
        'Avatar video pipeline: lip-sync, image-to-video and cloned voice, orchestrated through queues.',
        'Resilient jobs with backoff retries, idempotency checks and delayed queues.',
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
      highlight: { n: '260+', l: 'pull requests reviewed with the panel in 2026' },
      bullets: [
        'Six phases (quality, code, coupling, over-engineering, tests and team standards), each returning findings in a strict JSON schema.',
        'An adversarial agent tries to refute every blocking finding, and Jev, a decision model on OpenRouter, triages the rest.',
        'Agents navigate the code through a Graphify knowledge graph, with closed tool lists, read-only access and isolated git worktrees.',
        'Every design choice is measured.',
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
          'I set the architecture and code standards.',
          'Cost reviews that mapped up to 50% infrastructure savings.',
          'Security issues caught in review before they reached production.',
        ],
      },
      {
        period: '2025', role: 'Back-end Developer', org: 'Greenn',
        bullets: [
          'Back-end engineer on the AI features of Bluee and the reliability of its job queues.',
        ],
      },
      {
        period: '2024 to 2025', role: 'Full-stack Developer', org: 'Betabit',
        bullets: [
          'Led the AI chat of a real-estate CRM used by 15 agencies and hundreds of brokers: as early as 2024, agents queried the system and took actions by text and voice, on web, mobile and WhatsApp. Gemini, RAG with PGVector and a Redis cache answering in under 100 ms, for about 3,000 requests a day.',
          'Led the AI insights module of a real-time marketing dashboard, built with Laravel Reverb and a Python ETL service.',
          'TDD with Pest, code review on every PR and weekly deploys. Docker and GitHub Actions cut developer onboarding from hours to minutes.',
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
    tool: 'Claude Code, Codex and Cursor every day, with prompt engineering, harnesses and guardrails. Jev (a decision model), Graphify (a knowledge graph of the code) and Ponytail (a guard against over-engineering) for defensive automated review.',
    learnH: 'Learning',
    learn: 'TechLead de Impacto mentorship with Alexandro Hervis. Postgraduate in Software Engineering for Applied AI at UniPDS, with professors such as Erick Wendel. Reading: Clean Code, The Clean Coder, The Pragmatic Programmer, Tidy First?, Software Architecture: The Hard Parts.',
    skillsH: 'Skills',
    drag: 'Drag',
    hint: 'Drag to spin. Click a number to open its principle.',
    cats: { ai: 'AI', back: 'Back-end', front: 'Front-end', infra: 'Infrastructure', craft: 'Engineering practices' },
  },
  side: {
    h: 'Independent projects',
    featured: {
      scanlex: { tag: 'Own SaaS', name: 'Scanlex and Timesheet Transcriber AI (2025)', text: 'A SaaS that digitized timesheets and payslips for payroll specialists, with paying subscribers, and its free open-source version: bring your own Gemini key, crop pages, export to CSV or XLSX. Laravel, Vue, React, Gemini.' },
      km: { tag: 'For a client', name: 'KM Topografia', text: 'HR document and fleet management for a land surveying company, in production. Expiry alerts by email and WhatsApp, S3 with a local cache, audited roles. I designed the architecture and the infrastructure. Laravel 12, PostgreSQL, Docker. Private repository.' },
      mia: { tag: 'For a client', name: 'Mia (2025)', text: 'WhatsApp receptionist for health clinics: leads, scheduling and reminders. Ran in production at two clinics. N8N, Gemini, Evolution API.' },
      anthrya: { tag: 'Personal', name: 'anthrya', text: 'Health app built AI-first: Bluetooth body scale, diet, glucose, workouts and body measurements, all reachable by AI through an MCP server. Raw readings stay separate from estimates, so history can be recalculated. Expo, Supabase, Hono. In development, private.' },
    },
  },
  edu: {
    h: 'Education',
    items: [
      { t: 'Lato sensu postgraduate program in Software Engineering for Applied AI.', m: 'UniPDS, 2026 to 2027.' },
      { t: 'B.Sc. Information Systems.', m: 'UNIMONTES, 2021 to 2025. Thesis on BERT models for bug localization.' },
      { t: 'IT Technician.', m: 'IFNMG, 2017 to 2019.' },
    ],
    projectsH: 'Research projects',
    projects: [
      { t: 'Improving the accuracy of traceability recovery between software artifacts with generative AI.', m: 'UNIMONTES, 2024 to 2026.' },
      { t: 'Undergraduate research (PIBIC/FAPEMIG): a system for managing selection processes at UNIMONTES.', m: '2021 to 2022.' },
      { t: 'Volunteer undergraduate research (ICV): residential installations with solar micro-generation.', m: '2020 to 2021.' },
    ],
    pubH: 'Publications',
    pubNote: 'Titles translated; papers in Portuguese.',
    pubMore: 'All 7 publications',
    pubs: [
      { t: 'Exploratory analysis of BERT-based models for software bug localization.', v: 'ENMC 2025' },
      { t: 'Performance of pre-trained embedding models for bug localization on ArgoUML.', v: 'CIEI 2025' },
      { t: 'SBERT for software bug localization.', v: 'CIEI 2024' },
      { t: 'Micro-certification module for a university extension management system.', v: 'CIEI 2024' },
      { t: 'Impact of the Internet of Things on quality of life at home.', v: 'CBICT 2022, honorable mention' },
      { t: 'A web application for graduate admissions.', v: 'FEPEG 2022' },
      { t: 'Performance of a photovoltaic plant from automatically collected data.', v: 'FEPEG 2020' },
    ],
    manuscript: { t: 'Comparative analysis of proprietary embedding models for bug localization.', v: 'Manuscript (unpublished), 2025' },
  },
  contact: {
    h: 'Want to talk about AI, architecture or leadership?',
    langH: 'Languages',
    langs: [
      { name: 'Portuguese', level: 'native' },
      { name: 'English', level: 'intermediate' },
      { name: 'Spanish', level: 'intermediate' },
      { name: 'French', level: 'beginner' },
    ],
    send: 'Send email',
    copy: 'Copy email',
    copied: 'Copied',
  },
  term: {
    open: 'Open the terminal',
    close: 'Close the terminal',
    input: 'Command',
    welcome: 'Type a command, or pick one below.',
    notFound: 'Command not found: {cmd}. Type /help to see what is available.',
    goTo: 'Go to the section',
    langNow: 'Current language: {lang}.',
    langUsage: 'Usage: /language en | pt | es | zh',
    langSwitch: 'Switching to {lang}...',
    cmds: {
      help: 'List the commands',
      experience: 'Roles and companies',
      work: 'Selected work',
      skills: 'Languages, frameworks and tools',
      education: 'Degrees, research and languages',
      contact: 'How to reach me',
      language: 'Switch the site language',
      clear: 'Clear the screen',
      exit: 'Close the terminal',
    },
  },
  footer: '© 2026 Hugo Barbosa. Built with Astro and Three.js.',
  notFound: {
    title: 'Page not found',
    home: 'Back to home',
  },
};

export default en;
export type Dict = typeof en;
