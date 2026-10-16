# Copy deck (fonte de verdade do texto)

Inglês é o idioma mestre; ES e ZH serão traduzidos a partir dele. Regras: nada de em-dash, frases curtas, só números verificados. Itens marcados com `[confirmar]` dependem do Hugo.

---

## EN

### Meta
- title: `Hugo Barbosa · Tech Lead, AI and Software Engineering`
- description: `Tech Lead at Greenn. I build AI products that hold up in production: LLM pipelines, RAG, resilient queues and agentic engineering. Open to remote roles and consulting.`

### Nav
Services · Work · Path · Contact · Language

### Hero
- H1: **I build AI products that hold up in production.**
- Sub: Tech Lead at Greenn. LLM pipelines, resilient queues and agentic engineering, from the first prompt to the GPU worker.
- CTA primary: **Work with me** (to contact)
- CTA secondary: **See the work** (to work)

### Offers
Heading: **Three ways to work together**
1. **Join your team.** Remote Tech Lead or Senior Engineer. I set standards, review every change and keep delivery predictable.
2. **Consulting.** AI integration, architecture reviews and cloud cost audits. Clear findings your team can act on in the next sprint.
3. **Build it for you.** Software delivered as a service, from scoping to production, with tests, documentation and a clean handover.

Proof strip:
- **6** developers on the teams I lead
- **R$20k+** saved per month on video storage
- **Up to 50%** infrastructure savings mapped in cost reviews
- **Thousands** of users on the products I lead

### Selected work
Heading: **Selected work**

**Bluee** (discontinued product, no link)
- An AI platform that turned a topic into a complete online course, with lessons, narration and an avatar presenter.
- Role: Back-end engineer, then Tech Lead. 2025 to 2026.
- LLM layer on OpenRouter with streaming, fallbacks and long-document summarization.
- Agentic chat with parallel tool calls and resumable streams.
- RAG over user documents: sandboxed extraction, batched embeddings, pgvector search.
- Avatar video pipeline: ComfyUI lip-sync and image-to-video, ElevenLabs voice cloning, Remotion rendering.
- RabbitMQ jobs with backoff retries, idempotency checks and delayed queues.
- GPU workers on RunPod packed from 3 to 8 tasks per pod.
- Stack: Laravel 12, PHP 8.4, Python, React, RabbitMQ, Redis, PostgreSQL, pgvector, OpenRouter, ComfyUI, ElevenLabs, Remotion, AWS

**Greenn Club** (link: https://greenn.com.br/club/)
- The members area where course creators host and deliver their courses to thousands of students.
- Role: Tech Lead. 2026.
- Verifiable certificates signed with ECDSA, a public key set and QR validation anyone can check.
- Fair dispatch: per-tenant scheduling so one large creator never starves the queue for everyone else.
- Subtitle pipeline moved from polling to webhooks, hardened against concurrent deliveries.
- Video storage optimization saving more than R$20k per month.
- Legacy webhooks moved into the domain layer behind characterization tests.
- Stack: Laravel 11, Vue 3, Redis, RabbitMQ, MySQL, S3, PandaVideo

**PR Review Panel** (internal tool, no public link)
- My own tool for reviewing pull requests in depth: six phases run by Claude Code agents, in parallel, on every PR. Built for a review load of 260+ pull requests in 2026.
- Role: Creator. 2026.
- Quality, code, coupling, over-engineering, tests and team standards, each phase returning findings in a strict JSON schema.
- An adversarial agent tries to refute every blocking finding before it reaches the author.
- Triage by Jev, a decision model on OpenRouter, calibrated against labeled findings.
- Agents navigate the code through a Graphify knowledge graph before falling back to text search.
- Guardrails: closed tool lists, read-only agents, no MCP access, isolated git worktrees.
- Every design choice is measured. One variant was dropped for costing 132% more.
- Stack: Next.js, TypeScript, SQLite FTS5, Claude Code, OpenRouter, Graphify, GitHub CLI

### Path
Heading: **How I got here**
- **2017** IT technician course at IFNMG.
- **2019** First website shipped, for a solar energy company, plus field work on photovoltaic installs.
- **2020** First system in production: an offline point of sale for a butcher shop that reads a commercial scale and prints receipts.
- **2021** Information Systems at UNIMONTES and my first research grant.
- **2022** Rebuilt the university's extension management system. Mentored an intern and taught a Laravel workshop.
- **2024** Full-stack engineer at Betabit. Led an AI chat module with Gemini, RAG and WhatsApp agents.
- **2025** Joined Greenn as a back-end engineer on Bluee.
- **2026** Tech Lead at Greenn. Postgraduate studies in Software Engineering for Applied AI.

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
Featured (bento, 4 cells):
- **anthrya.** Health app built AI-first: Bluetooth body scale, diet, glucose, workouts and body measurements, all reachable by AI through an MCP server. Raw readings stay separate from estimates, so history can be recalculated. 100+ ADRs. Expo, Supabase, Hono. In development, private.
- **Chronicle RPG.** Solo tabletop RPG with an AI game master and five specialized agents, each on the model that fits its cost. Character sheets change only through tools, never through narration. Next.js, pgvector, OpenRouter. (https://github.com/Hugobsan/rpg)
- **KM Topografia.** HR document and fleet management for a land surveying company, in production. Expiry alerts by email and WhatsApp, S3 with a local cache, audited roles. I designed the architecture and the infrastructure. Laravel 12, PostgreSQL, Docker. Private.
- **Timesheet Transcriber AI.** Free, open-source timesheet transcription with Gemini. Bring your own key, crop pages, export to CSV or XLSX. Open version of my former SaaS, Scanlex. (https://timesheet-transcriber-ai.vercel.app, https://github.com/Hugobsan/Timesheet-Transcriber-Ai)

More (compact list):
- **BERT sentiment.** Fine-tuned BERTimbau on 21,600 Play Store reviews from 9 delivery apps. 0.89 accuracy and macro F1. (https://gist.github.com/Hugobsan/b507b76c7b5fc470d77b3a924211430d)
- **LibroVault.** Semantic search over your own PDFs: a Laravel queue pipeline plus a Python embeddings microservice. (https://github.com/Hugobsan/LibroVault)
- **Mia** (2025). WhatsApp receptionist for health clinics: leads, scheduling and reminders. Ran in production at two clinics. N8N, Gemini, Evolution API.
- **Scanlex** (2025). SaaS that digitized timesheets and payslips for payroll specialists, with paying subscribers. Laravel, Vue, Gemini.
- **MCP Servers Hub** (2025). Index of MCP servers for developers adding AI to legacy systems. I built the back end, tests and deploy.
- **Full-stack roadmap.** A 4-month study plan for junior developers, with a guided technical test. (https://hugobsan.com.br/roadmap-full-stack/)

### Education
- Postgraduate specialization in Software Engineering for Applied AI (360 hours). UniPDS, 2026 to 2027.
- B.Sc. Information Systems. UNIMONTES, 2021 to 2025. Thesis on BERT models for bug localization.
- IT Technician. IFNMG, 2017 to 2019.

Languages: Portuguese (native), English (professional), Spanish (elementary).

Research: LLM agents for software bug localization (UNIMONTES, 2024 to now). The hybrid approach I built reaches 0.40 MRR, 75% above the best embedding model.

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
- Email: contato@hugobsan.com.br (button: **Copy email**, after click: **Copied**)
- Links: LinkedIn (https://www.linkedin.com/in/hugobsan/), GitHub (https://github.com/Hugobsan)
- Footer: © 2026 Hugo Barbosa. Built with Astro and Three.js.

---

## PT (pt-BR)

### Meta
- title: `Hugo Barbosa · Tech Lead, IA e Engenharia de Software`
- description: `Tech Lead na Greenn. Construo produtos de IA que aguentam produção: pipelines de LLM, RAG, filas resilientes e engenharia agêntica. Aberto a vagas remotas e consultoria.`

### Nav
Serviços · Trabalho · Trajetória · Contato · Idioma

### Hero
- H1: **Construo produtos de IA que aguentam produção.**
- Sub: Tech Lead na Greenn. Pipelines de LLM, filas resilientes e engenharia agêntica, do primeiro prompt ao worker de GPU.
- CTA principal: **Fale comigo**
- CTA secundário: **Ver projetos**

### Ofertas
Título: **Três formas de trabalharmos juntos**
1. **No seu time.** Tech Lead ou Engenheiro Sênior remoto. Defino padrões, reviso cada mudança e mantenho a entrega previsível.
2. **Consultoria.** Integração de IA, revisão de arquitetura e auditoria de custo de nuvem. Achados claros que o time aplica na próxima sprint.
3. **Construo para você.** Software entregue como serviço, do escopo à produção, com testes, documentação e passagem de bastão limpa.

Faixa de provas:
- **6** desenvolvedores nos times que lidero
- **R$20 mil+** economizados por mês em armazenamento de vídeo
- **Até 50%** de economia de infraestrutura mapeada em revisões de custo
- **Milhares** de usuários nos produtos que lidero

### Trabalho selecionado
Título: **Trabalho selecionado**

**Bluee**
- Plataforma de IA que transformava um tema num curso online completo, com aulas, narração e um avatar apresentador.
- Papel: Engenheiro back-end, depois Tech Lead. 2025 a 2026.
- Camada de LLM sobre o OpenRouter com streaming, fallbacks e resumo de documentos longos.
- Chat agêntico com tool calls em paralelo e streams que retomam de onde pararam.
- RAG sobre documentos do usuário: extração em sandbox, embeddings em lote, busca com pgvector.
- Pipeline de vídeo com avatar: lip-sync e imagem para vídeo no ComfyUI, clonagem de voz com ElevenLabs, renderização com Remotion.
- Jobs no RabbitMQ com retry com backoff, checagem de idempotência e filas com atraso.
- Workers de GPU no RunPod passando de 3 para 8 tarefas por pod.

**Greenn Club**
- A área de membros onde criadores hospedam e entregam seus cursos para milhares de alunos.
- Papel: Tech Lead. 2026.
- Certificados verificáveis assinados com ECDSA, chaves públicas abertas e validação por QR que qualquer pessoa confere.
- Fair dispatch: agendamento por cliente para que um criador grande nunca trave a fila dos outros.
- Pipeline de legendas trocado de polling para webhooks, protegido contra entregas concorrentes.
- Otimização de armazenamento de vídeo que economiza mais de R$20 mil por mês.
- Webhooks legados levados para a camada de domínio, protegidos por testes de caracterização.

**Painel de Review de PRs**
- Minha ferramenta para revisar pull requests a fundo: seis fases executadas por agentes do Claude Code, em paralelo, em cada PR. Feita para uma carga de mais de 260 PRs revisados em 2026.
- Papel: Criador. 2026.
- Qualidade, código, acoplamento, excesso de engenharia, testes e padrões do time, cada fase devolvendo achados num schema JSON estrito.
- Um agente adversário tenta derrubar cada achado bloqueante antes de ele chegar ao autor.
- Triagem pelo Jev, um modelo de decisão no OpenRouter, calibrado com achados rotulados.
- Os agentes navegam pelo código com um grafo de conhecimento do Graphify antes de recorrer à busca textual.
- Guardrails: lista fechada de ferramentas, agentes somente leitura, sem acesso a MCP, git worktrees isolados.
- Cada escolha de design é medida. Uma variante foi descartada por custar 132% a mais.

### Trajetória
Título: **Como cheguei aqui**
- **2017** Curso técnico em Informática no IFNMG.
- **2019** Primeiro site entregue, para uma empresa de energia solar, além de trabalho de campo em instalações fotovoltaicas.
- **2020** Primeiro sistema em produção: um PDV offline para um açougue, que lê a balança comercial e imprime o cupom.
- **2021** Sistemas de Informação na UNIMONTES e minha primeira bolsa de pesquisa.
- **2022** Reconstruí o sistema de gestão da extensão da universidade. Mentorei um estagiário e dei um minicurso de Laravel.
- **2024** Full-stack na Betabit. Liderei um módulo de chat com IA usando Gemini, RAG e agentes no WhatsApp.
- **2025** Entrei na Greenn como engenheiro back-end na Bluee.
- **2026** Tech Lead na Greenn. Pós-graduação em Engenharia de Software em IA Aplicada.

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
Destaques (bento, 4 células):
- **anthrya.** App de saúde feito com IA desde o início: balança de bioimpedância via Bluetooth, dieta, glicemia, treinos e medidas corporais, tudo acessível por IA através de um servidor MCP. Leituras brutas ficam separadas das estimativas, então o histórico pode ser recalculado. Mais de 100 ADRs. Expo, Supabase, Hono. Em desenvolvimento, privado.
- **Chronicle RPG.** RPG de mesa solo com um mestre de IA e cinco agentes especializados, cada um no modelo que compensa o custo. A ficha do personagem só muda por ferramentas, nunca pela narração. Next.js, pgvector, OpenRouter.
- **KM Topografia.** Gestão de documentos de RH e de frota para uma empresa de topografia, em produção. Alertas de vencimento por e-mail e WhatsApp, S3 com cache local, papéis auditados. Desenhei a arquitetura e a infraestrutura. Laravel 12, PostgreSQL, Docker. Privado.
- **Timesheet Transcriber AI.** Transcrição de cartões de ponto com Gemini, gratuita e open-source. Use sua própria chave, recorte páginas, exporte para CSV ou XLSX. Versão aberta do meu antigo SaaS, o Scanlex.

Mais (lista compacta):
- **Sentimento com BERT.** BERTimbau ajustado em 21.600 avaliações da Play Store de 9 apps de delivery. 0,89 de acurácia e de F1 macro.
- **LibroVault.** Busca semântica nos seus próprios PDFs: pipeline com filas no Laravel e um microsserviço de embeddings em Python.
- **Mia** (2025). Recepcionista no WhatsApp para clínicas: leads, agendamento e lembretes. Rodou em produção em duas clínicas. N8N, Gemini, Evolution API.
- **Scanlex** (2025). SaaS que digitalizava cartões de ponto e holerites para calculistas, com assinantes pagantes. Laravel, Vue, Gemini.
- **MCP Servers Hub** (2025). Índice de servidores MCP para devs que levam IA a sistemas legados. Fiz o back-end, os testes e o deploy.
- **Roadmap full-stack.** Plano de estudos de 4 meses para devs júnior, com um teste técnico guiado.

### Formação
- Especialização em Engenharia de Software em IA Aplicada (360 horas). UniPDS, 2026 a 2027.
- Bacharelado em Sistemas de Informação. UNIMONTES, 2021 a 2025. TCC sobre modelos BERT para localização de bugs.
- Técnico em Informática. IFNMG, 2017 a 2019.

Idiomas: português (nativo), inglês (profissional), espanhol (básico).

Pesquisa: agentes LLM para localização de bugs de software (UNIMONTES, 2024 até hoje). A abordagem híbrida que desenvolvi chega a 0,40 de MRR, 75% acima do melhor modelo de embeddings.

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
- E-mail: contato@hugobsan.com.br (botão: **Copiar e-mail**, depois do clique: **Copiado**)
- Links: LinkedIn, GitHub
- Rodapé: © 2026 Hugo Barbosa. Feito com Astro e Three.js.
