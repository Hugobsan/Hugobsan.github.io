# Copy deck (fonte de verdade do texto)

Inglês é o idioma mestre; ES e ZH serão traduzidos a partir dele. Regras: nada de em-dash, frases curtas, só números verificados. Itens marcados com `[confirmar]` dependem do Hugo.

---

## EN

### Meta
- title: `Hugo Barbosa · Tech Lead, AI and Software Engineering`
- description: `Tech Lead at Greenn. I build AI products that hold up in production: LLM pipelines, RAG, resilient queues and agentic engineering. Open to remote roles and consulting.`

### Nav
Services · Work · Experience · Contact · Language

### Hero
- H1: **I build AI products that hold up in production.**
- Sub: Tech Lead at Greenn, working remotely from Brazil (UTC-3). LLM pipelines, resilient queues and agentic engineering.
- CTA primary: **Work with me** (to contact)
- CTA secondary: **See the work** (to work)

### Offers
Heading: **Three ways to work together**
1. **Join your team.** Remote Tech Lead or Senior Engineer. I set standards, review every change and keep delivery predictable.
2. **Consulting.** AI integration, architecture reviews and cloud cost audits. Clear findings your team can act on in the next sprint.
3. **Build it for you.** Software delivered as a service, from scoping to production, with tests, documentation and a clean handover.

Proof strip (timeless, not tied to the current job; short label + one line):
- **Lean teams.** Experience leading small teams from architecture to delivery.
- **AI in production.** LLMs, RAG, voice and video pipelines serving real users.
- **Cost under control.** Architecture and infrastructure reviews that cut recurring spend.
- **Since 2019.** Shipping software to production, from freelance systems to SaaS.

### Selected work
Heading: **Selected work**

**Bluee** (discontinued product, no link)
- An AI platform that turned a topic into a complete online course, with lessons, narration and an avatar presenter.
- Role: Back-end engineer, then Tech Lead. 2025 to 2026.
- Highlight: **1 hour** from a topic to a complete AI-generated course
- LLM layer on OpenRouter with streaming and fallbacks, plus agentic chat with parallel tool calls.
- RAG over user documents: sandboxed extraction, batched embeddings, pgvector search.
- Avatar video pipeline: ComfyUI lip-sync and image-to-video, ElevenLabs voice cloning, Remotion rendering.
- RabbitMQ jobs with backoff retries, idempotency checks and delayed queues.
- Stack: Laravel 12, PHP 8.4, Python, React, RabbitMQ, Redis, PostgreSQL, pgvector, OpenRouter, ComfyUI, ElevenLabs, Remotion, AWS

**Greenn Club** (link: https://greenn.com.br/club/)
- The members area where course creators host and deliver their courses to thousands of students.
- Role: Tech Lead. 2026.
- Highlight: **R$20k+** saved per month on video storage
- Verifiable certificates signed with ECDSA, a public key set and QR validation anyone can check.
- Fair dispatch: per-tenant scheduling so one large creator never starves the queue for everyone else.
- Subtitle pipeline moved from polling to webhooks, hardened against concurrent deliveries.
- Legacy webhooks moved into the domain layer behind characterization tests.
- Stack: Laravel 11, Vue 3, Redis, RabbitMQ, MySQL, S3, PandaVideo

**PR Review Panel** (internal tool, no public link)
- My own tool for reviewing pull requests in depth: six phases run by Claude Code agents, in parallel, on every PR.
- Role: Creator. 2026.
- Highlight: **260+** pull requests I reviewed in 2026
- Six phases (quality, code, coupling, over-engineering, tests and team standards), each returning findings in a strict JSON schema.
- An adversarial agent tries to refute every blocking finding, and Jev, a decision model on OpenRouter, triages the rest.
- Agents navigate the code through a Graphify knowledge graph, with closed tool lists, read-only access and isolated git worktrees.
- Every design choice is measured. One variant was dropped for costing 132% more.
- Stack: Next.js, TypeScript, SQLite FTS5, Claude Code, OpenRouter, Graphify, GitHub CLI

### Experience
Heading: **Experience**

**2026 to now · Tech Lead · Greenn**
- Teams of up to 6 developers across Bluee and Greenn Club.
- I set the architecture and code standards, and reviewed 260+ pull requests in 2026.
- Cost reviews that cut more than R$20k per month in video storage and mapped up to 50% infrastructure savings.
- Security issues caught in review before they reached production.

**2025 · Back-end Developer · Greenn**
- Built the AI core of Bluee: LLM layer, agentic chat, RAG and the avatar video pipeline.
- Hardened RabbitMQ jobs with backoff retries, idempotency and delayed queues.

**2024 to 2025 · Full-stack Developer · Betabit**
- Led the AI chat module of a real-estate CRM: Gemini, RAG with PGVector and WhatsApp agents, answering in under 100 ms for about 3,000 requests a day.
- Built a real-time marketing dashboard with Laravel Reverb and a Python ETL service.
- Docker and GitHub Actions cut developer onboarding from hours to minutes.

**2022 to 2024 · Web Developer · UNIMONTES**
- Rebuilt the university's extension management system, which every extension department adopted again.
- Refactored the queries that blocked the system at enrollment peaks, and built a micro-certification module presented at CIEI 2024.
- Introduced Git Flow and PR standards, mentored an intern and taught a Laravel workshop.

**2021 to 2022 · Research Scholar · UNIMONTES**
- Modeled the new graduate admissions system with the graduate programs: requirements, data model and architecture.
- Left a continuity guide used by the next scholars, and a paper at FEPEG 2022.

**2017 to 2021 · Early years**
- IT technician at IFNMG, then freelance web development and computer repair as a sole proprietor.
- First systems in production: a website for a solar energy company and an offline point of sale for a local shop.

### How I work
Heading: **How I work**
1. **Guardrails before autonomy.** AI agents get closed tool lists, strict output schemas and a reviewer that argues back.
2. **Built for production, priced for scale.** Architecture that holds real load without the cloud bill growing faster than the user base.
3. **Trade-offs in the open.** Every technical decision comes with the options I rejected, what each one costs and what could go wrong, written down as an ADR.
4. **Uncertainty first.** Spikes, prototypes and real numbers come before commitments, so estimates stop being guesses.
5. **Security and quality from the first commit.** Threat checks, tests and code review are part of done.
6. **The simplest solution that works.** Occam's razor for software: fewer moving parts break less and cost less at scale.
7. **A team that keeps learning.** I review to teach, write decisions down and pair with people, so the team decides well when I am not in the room.

Toolbox: Claude Code, Codex and Cursor every day, with prompt engineering, harnesses and guardrails. Jev, Graphify and Ponytail for defensive automated review.

Learning: TechLead de Impacto mentorship with Alexandro Hervis. Postgraduate in Software Engineering for Applied AI at UniPDS, with professors such as Erick Wendel. Reading: Clean Code, The Clean Coder, The Pragmatic Programmer, Tidy First?, Software Architecture: The Hard Parts.

### Side projects
Heading: **Side projects**
Featured (bento, exactly 4 cells, first one large; products with real users first):
- **Scanlex and Timesheet Transcriber AI** (2025). A SaaS that digitized timesheets and payslips for payroll specialists, with paying subscribers, and its free open-source version: bring your own Gemini key, crop pages, export to CSV or XLSX. Laravel, Vue, React, Gemini. (https://timesheet-transcriber-ai.vercel.app, https://github.com/Hugobsan/Timesheet-Transcriber-Ai)
- **KM Topografia.** HR document and fleet management for a land surveying company, in production. Expiry alerts by email and WhatsApp, S3 with a local cache, audited roles. I designed the architecture and the infrastructure. Laravel 12, PostgreSQL, Docker. Private repository. (https://s.kmtopografia.com.br)
- **Mia** (2025). WhatsApp receptionist for health clinics: leads, scheduling and reminders. Ran in production at two clinics. N8N, Gemini, Evolution API.
- **anthrya.** Health app built AI-first: Bluetooth body scale, diet, glucose, workouts and body measurements, all reachable by AI through an MCP server. Raw readings stay separate from estimates, so history can be recalculated. 100+ ADRs. Expo, Supabase, Hono. In development, private.

### Education
- Lato sensu postgraduate program in Software Engineering for Applied AI. UniPDS, 2026 to 2027.
- B.Sc. Information Systems. UNIMONTES, 2021 to 2025. Thesis on BERT models for bug localization.
- IT Technician. IFNMG, 2017 to 2019.

Research projects (heading **Research projects**, inside Education, title and period only):
- **Research project: improving the accuracy of traceability recovery between software artifacts with generative AI.** UNIMONTES, 2024 to 2026.
- **Undergraduate research (PIBIC/FAPEMIG): a system for managing selection processes at UNIMONTES.** 2021 to 2022.
- **Volunteer undergraduate research (ICV): residential installations with solar micro-generation.** 2020 to 2021.

### Publications (titles translated; papers in Portuguese)
- Exploratory analysis of BERT-based models for software bug localization. ENMC 2025.
- Comparative analysis of proprietary embedding models for bug localization. Manuscript, 2025.
- Performance of pre-trained embedding models for bug localization on ArgoUML. CIEI 2025.
- SBERT for software bug localization. CIEI 2024.
- Micro-certification module for a university extension management system. CIEI 2024.
- Impact of the Internet of Things on quality of life at home. CBICT 2022, honorable mention.
- A web application for graduate admissions. FEPEG 2022.
- Performance of a photovoltaic plant from automatically collected data. FEPEG 2020.

### Contact
- Heading: **Have a team to lead or a system to fix?**
- Sub: Remote roles, consulting and product builds.
- Languages (heading **Languages**, shown in the contact section): Portuguese (native), English (intermediate), Spanish (intermediate), French (beginner).
- Email: contato@hugobsan.com.br (button: **Copy email**, after click: **Copied**)
- Links: LinkedIn (https://www.linkedin.com/in/hugobsan/), GitHub (https://github.com/Hugobsan)
- Footer: © 2026 Hugo Barbosa. Built with Astro and Three.js.

---

## PT (pt-BR)

### Meta
- title: `Hugo Barbosa · Tech Lead, IA e Engenharia de Software`
- description: `Tech Lead na Greenn. Construo produtos de IA que aguentam produção: pipelines de LLM, RAG, filas resilientes e engenharia agêntica. Aberto a vagas remotas e consultoria.`

### Nav
Serviços · Trabalho · Experiência · Contato · Idioma

### Hero
- H1: **Construo produtos de IA que aguentam produção.**
- Sub: Tech Lead na Greenn, trabalhando remoto do Brasil (UTC-3). Pipelines de LLM, filas resilientes e engenharia agêntica.
- CTA principal: **Fale comigo**
- CTA secundário: **Ver projetos**

### Ofertas
Título: **Três formas de trabalharmos juntos**
1. **No seu time.** Tech Lead ou Engenheiro Sênior remoto. Defino padrões, reviso cada mudança e mantenho a entrega previsível.
2. **Consultoria.** Integração de IA, revisão de arquitetura e auditoria de custo de nuvem. Achados claros que o time aplica na próxima sprint.
3. **Construo para você.** Software entregue como serviço, do escopo à produção, com testes, documentação e passagem de bastão limpa.

Faixa de provas:
- **Times enxutos.** Experiência liderando times pequenos, da arquitetura à entrega.
- **IA em produção.** LLMs, RAG e pipelines de voz e vídeo atendendo usuários reais.
- **Custo sob controle.** Revisões de arquitetura e infraestrutura que cortam gasto recorrente.
- **Desde 2019.** Colocando software em produção, de sistemas freelance a SaaS.

### Trabalho selecionado
Título: **Trabalho selecionado**

**Bluee**
- Plataforma de IA que transformava um tema num curso online completo, com aulas, narração e um avatar apresentador.
- Papel: Engenheiro back-end, depois Tech Lead. 2025 a 2026.
- Destaque: **1 hora** de um tema a um curso completo gerado por IA
- Camada de LLM sobre o OpenRouter com streaming e fallbacks, mais um chat agêntico com tool calls em paralelo.
- RAG sobre documentos do usuário: extração em sandbox, embeddings em lote, busca com pgvector.
- Pipeline de vídeo com avatar: lip-sync e imagem para vídeo no ComfyUI, clonagem de voz com ElevenLabs, renderização com Remotion.
- Jobs no RabbitMQ com retry com backoff, checagem de idempotência e filas com atraso.

**Greenn Club**
- A área de membros onde criadores hospedam e entregam seus cursos para milhares de alunos.
- Papel: Tech Lead. 2026.
- Destaque: **R$20 mil+** economizados por mês em armazenamento de vídeo
- Certificados verificáveis assinados com ECDSA, chaves públicas abertas e validação por QR que qualquer pessoa confere.
- Fair dispatch: agendamento por cliente para que um criador grande nunca trave a fila dos outros.
- Pipeline de legendas trocado de polling para webhooks, protegido contra entregas concorrentes.
- Webhooks legados levados para a camada de domínio, protegidos por testes de caracterização.

**Painel de Review de PRs**
- Minha ferramenta para revisar pull requests a fundo: seis fases executadas por agentes do Claude Code, em paralelo, em cada PR.
- Papel: Criador. 2026.
- Destaque: **260+** pull requests revisados por mim em 2026
- Seis fases (qualidade, código, acoplamento, excesso de engenharia, testes e padrões do time), cada uma devolvendo achados num schema JSON estrito.
- Um agente adversário tenta derrubar cada achado bloqueante, e o Jev, um modelo de decisão no OpenRouter, faz a triagem do resto.
- Os agentes navegam pelo código com um grafo de conhecimento do Graphify, com lista fechada de ferramentas, acesso somente leitura e git worktrees isolados.
- Cada escolha de design é medida. Uma variante foi descartada por custar 132% a mais.

### Experiência
Título: **Experiência**

**2026 até hoje · Tech Lead · Greenn**
- Times de até 6 desenvolvedores na Bluee e no Greenn Club.
- Defino a arquitetura e os padrões de código, e revisei mais de 260 pull requests em 2026.
- Revisões de custo que cortaram mais de R$20 mil por mês em armazenamento de vídeo e mapearam até 50% de economia de infraestrutura.
- Falhas de segurança encontradas em review antes de chegarem à produção.

**2025 · Desenvolvedor Back-end · Greenn**
- Construí o núcleo de IA da Bluee: camada de LLM, chat agêntico, RAG e o pipeline de vídeo com avatar.
- Deixei os jobs do RabbitMQ mais robustos com retry com backoff, idempotência e filas com atraso.

**2024 a 2025 · Desenvolvedor Full-stack · Betabit**
- Liderei o módulo de chat com IA de um CRM imobiliário: Gemini, RAG com PGVector e agentes no WhatsApp, respondendo em menos de 100 ms para cerca de 3 mil requisições por dia.
- Construí um dashboard de marketing em tempo real com Laravel Reverb e um serviço de ETL em Python.
- Docker e GitHub Actions reduziram o onboarding de devs de horas para minutos.

**2022 a 2024 · Desenvolvedor Web · UNIMONTES**
- Reconstruí o sistema de gestão da extensão da universidade, que voltou a ser adotado por todos os departamentos.
- Refatorei as consultas que travavam o sistema no pico de matrículas e criei o módulo de micro-certificação, apresentado no CIEI 2024.
- Implantei Git Flow e padrão de PRs, mentorei um estagiário e dei um minicurso de Laravel.

**2021 a 2022 · Bolsista de Iniciação Científica · UNIMONTES**
- Modelei com os programas de pós-graduação o novo sistema de processos seletivos: requisitos, modelo de dados e arquitetura.
- Deixei um guia de continuidade usado pelos bolsistas seguintes e um artigo no FEPEG 2022.

**2017 a 2021 · Primeiros anos**
- Técnico em Informática no IFNMG, depois desenvolvimento web freelance e manutenção de computadores como MEI.
- Primeiros sistemas em produção: o site de uma empresa de energia solar e um PDV offline para um comércio local.

### Como eu trabalho
Título: **Como eu trabalho**
1. **Guardrails antes de autonomia.** Agentes de IA recebem lista fechada de ferramentas, schemas de saída estritos e um revisor que discorda.
2. **Feito para produção, com custo que escala bem.** Arquitetura que aguenta carga real sem a conta da nuvem crescer mais rápido que a base de usuários.
3. **Trade-offs às claras.** Toda decisão técnica vem com as opções que descartei, o custo de cada uma e o que pode dar errado, registrada num ADR.
4. **Incerteza primeiro.** Spikes, protótipos e números reais vêm antes dos compromissos, para que estimativa deixe de ser chute.
5. **Segurança e qualidade desde o primeiro commit.** Análise de ameaças, testes e code review fazem parte do pronto.
6. **A solução mais simples que funciona.** A navalha de Ockham aplicada a software: menos peças móveis quebram menos e custam menos em escala.
7. **Um time que aprende sempre.** Reviso para ensinar, registro decisões e pareio com as pessoas, para que o time decida bem mesmo quando eu não estou na sala.

Ferramentas: Claude Code, Codex e Cursor no dia a dia, com engenharia de prompt, harness e guardrails. Jev, Graphify e Ponytail para code review defensivo automatizado.

Formação contínua: Mentoria TechLead de Impacto com Alexandro Hervis. Pós em Engenharia de Software em IA Aplicada na UniPDS, com professores como Erick Wendel. Leituras: Código Limpo, O Codificador Limpo, O Programador Pragmático, Tidy First?, Arquitetura de Software: As Partes Difíceis.

### Projetos pessoais
Título: **Projetos pessoais**
Destaques (bento, exatamente 4 células, a primeira grande):
- **Scanlex e Timesheet Transcriber AI** (2025). SaaS que digitalizava cartões de ponto e holerites para calculistas, com assinantes pagantes, e sua versão gratuita e open-source: use sua própria chave do Gemini, recorte páginas, exporte para CSV ou XLSX. Laravel, Vue, React, Gemini.
- **KM Topografia.** Gestão de documentos de RH e de frota para uma empresa de topografia, em produção. Alertas de vencimento por e-mail e WhatsApp, S3 com cache local, papéis auditados. Desenhei a arquitetura e a infraestrutura. Laravel 12, PostgreSQL, Docker. Repositório privado. (https://s.kmtopografia.com.br)
- **Mia** (2025). Recepcionista no WhatsApp para clínicas: leads, agendamento e lembretes. Rodou em produção em duas clínicas. N8N, Gemini, Evolution API.
- **anthrya.** App de saúde feito com IA desde o início: balança de bioimpedância via Bluetooth, dieta, glicemia, treinos e medidas corporais, tudo acessível por IA através de um servidor MCP. Leituras brutas ficam separadas das estimativas, então o histórico pode ser recalculado. Mais de 100 ADRs. Expo, Supabase, Hono. Em desenvolvimento, privado.

### Formação
- Pós-graduação Lato Sensu em Engenharia de Software em IA Aplicada. UniPDS, 2026 a 2027.
- Bacharelado em Sistemas de Informação. UNIMONTES, 2021 a 2025. TCC sobre modelos BERT para localização de bugs.
- Técnico em Informática. IFNMG, 2017 a 2019.

Projetos de pesquisa (título **Projetos de pesquisa**, dentro de Formação):
- **Projeto de Pesquisa: Melhoria da acurácia do Processo de Recuperação de Rastreabilidade entre Artefatos de Software utilizando Inteligência Artificial Generativa.** UNIMONTES, 2024 a 2026.
- **IC (PIBIC/FAPEMIG): Desenvolvimento de um sistema para gestão de processos seletivos na Unimontes.** 2021 a 2022.
- **ICV: Análise de Instalações Residenciais com Micro-Geração Solar.** 2020 a 2021.

### Publicações (títulos originais)
- Uma análise exploratória da utilização de modelos baseados em BERT para localização de bugs de software. ENMC 2025.
- Uma análise comparativa de modelos proprietários de geração de embeddings para localização de bugs de software. Manuscrito, 2025.
- Análise da performance dos modelos pré-treinados all-MiniLM-L6-v2, multi-qa-mpnet-base-dot-v1 e msmarco-bert-base-dot-v5 para geração de embeddings sobre a localização de bugs do ArgoUML. CIEI 2025.
- Análise da utilização do modelo SBERT para localização de bugs de software. CIEI 2024.
- Desenvolvimento de módulo de micro certificação para o SIGEX da UNIMONTES. CIEI 2024.
- Impacto da Internet das Coisas na qualidade de vida em ambientes residenciais. CBICT 2022, menção honrosa.
- Desenvolvimento de uma aplicação web para gestão de processos seletivos. FEPEG 2022.
- Análise de desempenho de uma usina fotovoltaica a partir de dados de medição de energia coletados automaticamente. FEPEG 2020.

### Contato
- Título: **Tem um time para liderar ou um sistema para consertar?**
- Sub: Vagas remotas, consultoria e construção de produtos.
- Idiomas (título **Idiomas**, na seção de contato): português (nativo), inglês (intermediário), espanhol (intermediário), francês (iniciante).
- E-mail: contato@hugobsan.com.br (botão: **Copiar e-mail**, depois do clique: **Copiado**)
- Links: LinkedIn, GitHub
- Rodapé: © 2026 Hugo Barbosa. Feito com Astro e Three.js.
