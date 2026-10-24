<!-- ai-translated, pending Hugo's review -->
<!--
Glossary (ES, neutral international Spanish, "tú" form):
- Tech Lead: kept in English (standard in Spanish-speaking tech hiring). AI: IA.
- Acronyms LLM, RAG, MCP, ADR, PR, MRR, PDF: kept; plurals invariable per RAE (los PR, los ADR, los PDF).
- "hold up in production": "resisten en producción". Resilient queues: colas resilientes. Delayed queues: colas diferidas. Backoff retries: reintentos con backoff.
- Agentic engineering: ingeniería agéntica. Guardrails: kept in English, as in PT.
- Kept as tech loanwords: pipeline, streaming, fallbacks, embeddings, worker, job, sandbox, webhook, polling, prompt, harnesses, profiler, sprint.
- Bug localization: localización de bugs. Findings: hallazgos. Over-engineering: sobreingeniería.
- Neutral word choices: costo (not coste), video (not vídeo), correo (email), en línea (online), báscula (scale), recibos (receipts), estudiante en prácticas (intern), hojas de horas (timesheets), recibos de sueldo (payslips), tenant: cliente.
- Numbers: 21,600 written as 21 600 (RAE); decimals keep the dot as in EN; R$20k written as R$20 mil.
- Books: Código limpio and El programador pragmático are the published Spanish titles; the others stay in English.
- Structural labels (title, Heading, Sub, CTA, Proof strip, Chart, Caption, Featured, More, Email, Links, Footer) and notes in parentheses stay in English so each line maps to its EN key. Visible lead-ins (Rol, Herramientas, Formación continua, Idiomas) are translated.
-->

## ES

### Meta
- title: `Hugo Barbosa · Tech Lead, IA e ingeniería de software`
- description: `Tech Lead en Greenn. Productos de IA que resisten en producción: pipelines de LLM, RAG, colas resilientes e ingeniería agéntica.`

### Nav
Sobre mí · Proyectos · Experiencia · Contacto · Idioma

### Hero
- H1: **Construyo productos de IA que resisten en producción.**
- Sub: Tech Lead en Greenn, trabajando en remoto desde Brasil (UTC-3). Pipelines de LLM, colas resilientes e ingeniería agéntica.
- CTA primary: **Hablemos** (to contact)
- CTA secondary: **Ver proyectos** (to work)

### Offers
Heading: **Lo que aporto** (2026-10-24: neutral, the engagement cards were removed)

Proof strip:
- **Equipos compactos.** Experiencia liderando equipos pequeños, de la arquitectura a la entrega.
- **IA en producción.** LLMs, RAG y pipelines de voz y video al servicio de usuarios reales.
- **Costos bajo control.** Revisiones de arquitectura e infraestructura que recortan el gasto recurrente.
- **Desde 2019.** Llevando software a producción, de sistemas freelance a SaaS.

### Selected work
Heading: **Proyectos destacados**

**Bluee** (discontinued product, no link)
- Una plataforma de IA que convertía un tema en un curso en línea completo, con lecciones, narración y un avatar presentador.
- Rol: Ingeniero back-end, luego Tech Lead. 2025 a 2026.
- Highlight: **1 hora** de un tema a un curso completo generado con IA
- Capa de LLM sobre OpenRouter con streaming y fallbacks, más un chat agéntico con llamadas a herramientas en paralelo.
- RAG sobre documentos del usuario: extracción en sandbox, embeddings por lotes, búsqueda con pgvector.
- Pipeline de video con avatar: lip-sync e imagen a video con ComfyUI, clonación de voz con ElevenLabs, renderizado con Remotion.
- Jobs en RabbitMQ con reintentos con backoff, verificaciones de idempotencia y colas diferidas.
- Stack: Laravel 12, PHP 8.4, Python, React, RabbitMQ, Redis, PostgreSQL, pgvector, OpenRouter, ComfyUI, ElevenLabs, Remotion, AWS

**Greenn Club** (link: https://greenn.com.br/club/)
- El área de miembros donde los creadores de cursos alojan e imparten sus cursos a miles de estudiantes.
- Rol: Tech Lead. 2026.
- Highlight: **Más de R$20 mil** ahorrados al mes en almacenamiento de video
- Certificados verificables firmados con ECDSA, un conjunto de claves públicas y validación por QR que cualquiera puede comprobar.
- Despacho equitativo: planificación por cliente para que un creador grande nunca acapare la cola del resto.
- Pipeline de subtítulos migrado de polling a webhooks, protegido contra entregas concurrentes.
- Webhooks heredados llevados a la capa de dominio, protegidos por pruebas de caracterización.
- Stack: Laravel 11, Vue 3, Redis, RabbitMQ, MySQL, S3, PandaVideo

**Panel de revisión de PR** (internal tool, no public link)
- Mi propia herramienta para revisar pull requests a fondo: seis fases ejecutadas por agentes de Claude Code, en paralelo, en cada PR.
- Rol: Creador. 2026.
- Highlight: **260+** pull requests que revisé en 2026
- Seis fases (calidad, código, acoplamiento, sobreingeniería, pruebas y estándares del equipo); cada una devuelve hallazgos en un esquema JSON estricto.
- Un agente adversario intenta refutar cada hallazgo bloqueante, y Jev, un modelo de decisión en OpenRouter, clasifica el resto.
- Los agentes navegan el código con un grafo de conocimiento de Graphify, con listas cerradas de herramientas, acceso de solo lectura y git worktrees aislados.
- Cada decisión de diseño se mide. Una variante se descartó por costar un 132% más.
- Stack: Next.js, TypeScript, SQLite FTS5, Claude Code, OpenRouter, Graphify, GitHub CLI

### Experience
Heading: **Experiencia**

**2026 a hoy · Tech Lead · Greenn**
- Equipos de hasta 6 desarrolladores en Bluee y Greenn Club.
- Defino la arquitectura y los estándares de código; revisé más de 260 pull requests en 2026.
- Revisiones de costos que recortaron más de R$20 mil al mes en almacenamiento de video e identificaron hasta un 50% de ahorro en infraestructura.
- Fallas de seguridad detectadas en code review antes de llegar a producción.

**2025 · Desarrollador back-end · Greenn**
- Construí el núcleo de IA de Bluee: capa de LLM, chat agéntico, RAG y el pipeline de video con avatar.
- Hice más robustos los jobs de RabbitMQ con reintentos con backoff, idempotencia y colas diferidas.

**2024 a 2025 · Desarrollador full-stack · Betabit**
- Lideré el módulo de chat con IA de un CRM inmobiliario: Gemini, RAG con PGVector y agentes en WhatsApp, con respuestas en menos de 100 ms para unas 3000 solicitudes al día.
- Construí un dashboard de marketing en tiempo real con Laravel Reverb y un servicio de ETL en Python.
- Docker y GitHub Actions redujeron el onboarding de desarrolladores de horas a minutos.

**2022 a 2024 · Desarrollador web · UNIMONTES**
- Reconstruí el sistema de gestión de extensión de la universidad, que volvieron a adoptar todos los departamentos.
- Refactoricé las consultas que bloqueaban el sistema en los picos de inscripción y creé el módulo de microcertificación, presentado en el CIEI 2024.
- Implanté Git Flow y un estándar de PR, fui mentor de un estudiante en prácticas y di un taller de Laravel.

**2021 a 2022 · Becario de investigación · UNIMONTES**
- Modelé con los programas de posgrado el nuevo sistema de admisiones: requisitos, modelo de datos y arquitectura.
- Dejé una guía de continuidad que usaron los siguientes becarios y un artículo en el FEPEG 2022.

**2017 a 2021 · Primeros años**
- Técnico en Informática en el IFNMG, luego desarrollo web freelance y reparación de computadoras como autónomo.
- Primeros sistemas en producción: el sitio web de una empresa de energía solar y un punto de venta sin conexión para un comercio local.

### How I work
Heading: **Cómo trabajo**
1. **Guardrails antes que autonomía.** Los agentes de IA reciben listas cerradas de herramientas, esquemas de salida estrictos y un revisor que les lleva la contraria.
2. **Hecho para producción, con costos que escalan bien.** Arquitectura que aguanta carga real sin que la factura de la nube crezca más rápido que la base de usuarios.
3. **Trade-offs a la vista.** Cada decisión técnica llega con las opciones que descarté, lo que cuesta cada una y lo que puede salir mal, registrada en un ADR.
4. **Primero, la incertidumbre.** Spikes, prototipos y números reales antes de comprometerse, para que una estimación deje de ser una apuesta.
5. **Seguridad y calidad desde el primer commit.** El análisis de amenazas, las pruebas y el code review forman parte de la definición de terminado.
6. **La solución más simple que funcione.** La navaja de Ockham aplicada al software: menos piezas móviles fallan menos y cuestan menos a escala.
7. **Un equipo que aprende siempre.** Reviso para enseñar, dejo las decisiones por escrito y programo en pareja, para que el equipo decida bien aunque yo no esté en la sala.

Herramientas: Claude Code, Codex y Cursor a diario, con ingeniería de prompts, harnesses y guardrails. Jev, Graphify y Ponytail para revisión automatizada defensiva.

Formación continua: Mentoría TechLead de Impacto con Alexandro Hervis. Posgrado en Ingeniería de Software en IA Aplicada (UniPDS), con profesores como Erick Wendel. Lecturas: Código limpio, The Clean Coder, El programador pragmático, Tidy First?, Software Architecture: The Hard Parts.

### Side projects
Heading: **Proyectos personales**
Featured (bento, exactly 4 cells, first one large):
- **Scanlex y Timesheet Transcriber AI** (2025). Un SaaS que digitalizaba hojas de horas y recibos de sueldo para especialistas en nómina, con suscriptores de pago, y su versión gratuita y de código abierto: usa tu propia clave de Gemini, recorta páginas, exporta a CSV o XLSX. Laravel, Vue, React, Gemini. (https://timesheet-transcriber-ai.vercel.app, https://github.com/Hugobsan/Timesheet-Transcriber-Ai)
- **KM Topografia.** Gestión de documentos de recursos humanos y de flota para una empresa de topografía, en producción. Alertas de vencimiento por correo y WhatsApp, S3 con caché local, roles auditados. Diseñé la arquitectura y la infraestructura. Laravel 12, PostgreSQL, Docker. Repositorio privado. (https://s.kmtopografia.com.br)
- **Mia** (2025). Recepcionista en WhatsApp para clínicas de salud: leads, agenda de citas y recordatorios. Estuvo en producción en dos clínicas. N8N, Gemini, Evolution API.
- **anthrya.** App de salud diseñada desde el inicio para la IA: báscula corporal Bluetooth, dieta, glucosa, entrenamientos y medidas corporales, todo accesible para la IA a través de un servidor MCP. Las lecturas en bruto se guardan separadas de las estimaciones, así el historial se puede recalcular. Más de 100 ADR. Expo, Supabase, Hono. En desarrollo, privado.

### Education
- Posgrado lato sensu en Ingeniería de Software en IA Aplicada. UniPDS, 2026 a 2027.
- Licenciatura en Sistemas de Información. UNIMONTES, 2021 a 2025. Tesis sobre modelos BERT para localización de bugs.
- Técnico en Informática. IFNMG, 2017 a 2019.

Research projects (heading **Proyectos de investigación**):
- **Proyecto de investigación: mejora de la precisión en la recuperación de trazabilidad entre artefactos de software con inteligencia artificial generativa.** UNIMONTES, 2024 a 2026.
- **Iniciación científica (PIBIC/FAPEMIG): desarrollo de un sistema para la gestión de procesos de selección en la UNIMONTES.** 2021 a 2022.
- **Iniciación científica voluntaria (ICV): análisis de instalaciones residenciales con microgeneración solar.** 2020 a 2021.

### Publications (titles translated; papers in Portuguese)
- Análisis exploratorio de modelos basados en BERT para la localización de bugs de software (en portugués). ENMC 2025.
- Análisis comparativo de modelos de embeddings propietarios para la localización de bugs (en portugués). Manuscrito, 2025.
- Rendimiento de modelos de embeddings preentrenados para la localización de bugs en ArgoUML (en portugués). CIEI 2025.
- SBERT para la localización de bugs de software (en portugués). CIEI 2024.
- Módulo de microcertificación para un sistema de gestión de extensión universitaria (en portugués). CIEI 2024.
- Impacto del Internet de las cosas en la calidad de vida en el hogar (en portugués). CBICT 2022, mención honorífica.
- Una aplicación web para admisiones de posgrado (en portugués). FEPEG 2022.
- Rendimiento de una planta fotovoltaica a partir de datos recopilados automáticamente (en portugués). FEPEG 2020.

### Contact
- Heading: **¿Hablamos de IA, arquitectura o liderazgo?** (no sub)
- Languages (heading **Idiomas**): portugués (nativo), inglés (intermedio), español (intermedio), francés (principiante).
- Email: contato@hugobsan.com.br (button: **Copiar correo**, after click: **Copiado**)
- Links: LinkedIn (https://www.linkedin.com/in/hugobsan/), GitHub (https://github.com/Hugobsan)
- Footer: © 2026 Hugo Barbosa. Hecho con Astro y Three.js.

### UI strings
- Skip to content: Saltar al contenido
- Main navigation (aria label): Navegación principal
- Language: Idioma
- Internal tool, no public link: Herramienta interna, sin enlace público
- All 8 publications: Las 8 publicaciones
- Copy email: Copiar correo
- Copied: Copiado
- Page not found: Página no encontrada
- Back to home: Volver al inicio

### Interactive (2026-10-23)
- How sphere: label **Habilidades** · cursor **Arrastra** · hint: Arrastra para girar. Haz clic en un número para abrir su principio.
- Skill groups: IA · Back-end · Front-end · Infraestructura · Prácticas de ingeniería
- Terminal: Abrir la terminal · Cerrar la terminal · Comando (input label)
- Welcome: Escribe un comando o elige uno abajo.
- Not found: Comando no encontrado: {cmd}. Escribe /help para ver lo que hay disponible.
- Ir a la sección · Idioma actual: {lang}. · Uso: /language en | pt | es | zh · Cambiando a {lang}...
- /help Lista los comandos · /experience Cargos y empresas · /work Proyectos destacados · /skills Lenguajes, frameworks y herramientas · /education Formación, investigación e idiomas · /contact Cómo contactarme · /language Cambia el idioma del sitio · /clear Limpia la pantalla · /exit Cierra la terminal
