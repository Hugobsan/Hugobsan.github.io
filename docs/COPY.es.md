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
- description: `Tech Lead en Greenn e ingeniero de IA. Construyo productos que resisten en producción: pipelines de LLM, RAG, colas resilientes e ingeniería agéntica. Disponible para trabajo remoto y consultoría.`

### Nav
Proyectos · Trayectoria · Investigación · Contacto · Idioma

### Hero
- H1: **Construyo productos de IA que resisten en producción.**
- Sub: Tech Lead en Greenn. Pipelines de LLM, colas resilientes e ingeniería agéntica, desde el primer prompt hasta el worker de GPU.
- CTA primary: **Trabaja conmigo** (to contact)
- CTA secondary: **Ver proyectos** (to work)

### Offers
Heading: **Tres formas de trabajar juntos**
1. **Me sumo a tu equipo.** Tech Lead o ingeniero sénior en remoto. Defino estándares, reviso cada cambio y mantengo las entregas predecibles.
2. **Consultoría.** Integración de IA, revisiones de arquitectura y auditorías de costos en la nube. Hallazgos claros que tu equipo puede aplicar en el próximo sprint.
3. **Lo construyo por ti.** Software entregado como servicio, desde la definición del alcance hasta producción, con pruebas, documentación y un traspaso limpio.

Proof strip:
- **6** desarrolladores en los equipos que lidero
- **Más de R$20 mil** ahorrados al mes en almacenamiento de video
- **Hasta un 50%** de ahorro en infraestructura identificado en revisiones de costos
- **Miles** de usuarios en los productos que lidero

### Selected work
Heading: **Proyectos destacados**

**Bluee** (discontinued product, no link)
- Una plataforma de IA que convertía un tema en un curso en línea completo, con lecciones, narración y un avatar presentador.
- Rol: Ingeniero back-end, luego Tech Lead. 2025 a 2026.
- Capa de LLM sobre OpenRouter con streaming, fallbacks y resumen de documentos largos.
- Chat agéntico con llamadas a herramientas en paralelo y streams reanudables.
- RAG sobre documentos del usuario: extracción en sandbox, embeddings por lotes, búsqueda con pgvector.
- Pipeline de video con avatar: lip-sync e imagen a video con ComfyUI, clonación de voz con ElevenLabs, renderizado con Remotion.
- Jobs en RabbitMQ con reintentos con backoff, verificaciones de idempotencia y colas diferidas.
- Workers de GPU en RunPod que pasaron de 3 a 8 tareas por pod.
- Stack: Laravel 12, PHP 8.4, Python, React, RabbitMQ, Redis, PostgreSQL, pgvector, OpenRouter, ComfyUI, ElevenLabs, Remotion, AWS

**Greenn Club** (link: https://greenn.com.br/club/)
- El área de miembros donde los creadores de cursos alojan e imparten sus cursos a miles de estudiantes.
- Rol: Tech Lead. 2026.
- Certificados verificables firmados con ECDSA, un conjunto de claves públicas y validación por QR que cualquiera puede comprobar.
- Despacho equitativo: planificación por cliente para que un creador grande nunca acapare la cola del resto.
- Pipeline de subtítulos migrado de polling a webhooks, protegido contra entregas concurrentes.
- Optimización del almacenamiento de video que ahorra más de R$20 mil al mes.
- Webhooks heredados llevados a la capa de dominio, protegidos por pruebas de caracterización.
- Stack: Laravel 11, Vue 3, Redis, RabbitMQ, MySQL, S3, PandaVideo

**Panel de revisión de PR** (internal tool, no public link)
- Mi propia herramienta para revisar pull requests a fondo: seis fases ejecutadas por agentes de Claude Code, en paralelo, en cada PR. Hecha para una carga de revisión de más de 260 pull requests en 2026.
- Rol: Creador. 2026.
- Calidad, código, acoplamiento, sobreingeniería, pruebas y estándares del equipo; cada fase devuelve hallazgos en un esquema JSON estricto.
- Un agente adversario intenta refutar cada hallazgo bloqueante antes de que llegue al autor.
- Triaje con Jev, un modelo de decisión en OpenRouter, calibrado con hallazgos etiquetados.
- Los agentes navegan el código con un grafo de conocimiento de Graphify antes de recurrir a la búsqueda de texto.
- Guardrails: listas cerradas de herramientas, agentes de solo lectura, sin acceso a MCP, git worktrees aislados.
- Cada decisión de diseño se mide. Una variante se descartó por costar un 132% más.
- Stack: Next.js, TypeScript, SQLite FTS5, Claude Code, OpenRouter, Graphify, GitHub CLI

**Investigación en localización de bugs** (UNIMONTES, 2024 hasta hoy)
- Dado un reporte de bug, ¿qué método del código está fallando? Mido cada enfoque con el Mean Reciprocal Rank en ArgoUML 0.22.
- Chart (to scale):
  - Bi-encoders BERT, mejor resultado: 0.0705
  - Doc2Vec, línea base: 0.1975
  - Embeddings de código propietarios (voyage-4-large): 0.2314
  - Agente LLM con herramientas de búsqueda: 0.3782
  - Híbrido, agente más ranking semántico: **0.4048**
- Caption: El enfoque híbrido supera en un 75% al mejor modelo de embeddings y duplica la línea base clásica.

### Path
Heading: **Cómo llegué hasta aquí**
- **2017** Curso de técnico en informática en el IFNMG.
- **2019** Primer sitio web publicado, para una empresa de energía solar, además de trabajo de campo en instalaciones fotovoltaicas.
- **2020** Primer sistema en producción: un punto de venta sin conexión para una carnicería, que lee una báscula comercial e imprime recibos.
- **2021** Sistemas de Información en la UNIMONTES y mi primera beca de investigación.
- **2022** Reconstruí el sistema de gestión de extensión universitaria. Fui mentor de un estudiante en prácticas y di un taller de Laravel.
- **2024** Ingeniero full-stack en Betabit. Lideré un módulo de chat con IA basado en Gemini, RAG y agentes en WhatsApp.
- **2025** Me uní a Greenn como ingeniero back-end en Bluee.
- **2026** Tech Lead en Greenn. Especialización de posgrado en Ingeniería de Software en IA Aplicada.

### How I work
Heading: **Cómo trabajo**
1. **Guardrails antes que autonomía.** Los agentes de IA reciben listas cerradas de herramientas, esquemas de salida estrictos y un revisor que les lleva la contraria.
2. **Cualquier job puede ejecutarse dos veces sin riesgo.** La idempotencia y los reintentos con backoff son la norma, no el parche después de un incidente.
3. **Colas justas.** Ningún cliente espera porque otro sea más grande.
4. **Decisiones por escrito.** ADR y estándares compartidos, para que personas y agentes lleguen a la misma respuesta.
5. **Cambios pequeños y revisables.** Primero ordenar, luego cambiar. PR apilados en lugar de PR gigantes.
6. **El costo es una funcionalidad.** Leo la factura de la nube como leo un profiler.

Herramientas: Claude Code, Codex y Cursor a diario, con ingeniería de prompts, harnesses y guardrails. Jev, Graphify y Ponytail para revisión automatizada defensiva.

Formación continua: Mentoría TechLead de Impacto con Alexandro Hervis. Especialización de posgrado en Ingeniería de Software en IA Aplicada (UniPDS), con profesores como Erick Wendel. Lecturas: Código limpio, The Clean Coder, El programador pragmático, Tidy First?, Software Architecture: The Hard Parts.

### Side projects
Heading: **Proyectos personales**
Featured (bento, 4 cells):
- **anthrya.** App de salud diseñada desde el inicio para la IA: báscula corporal Bluetooth, dieta, glucosa, entrenamientos y medidas corporales, todo accesible para la IA a través de un servidor MCP. Las lecturas en bruto se guardan separadas de las estimaciones, así el historial se puede recalcular. Más de 100 ADR. Expo, Supabase, Hono. En desarrollo, privado.
- **Chronicle RPG.** Juego de rol de mesa en solitario con un director de juego de IA y cinco agentes especializados, cada uno en el modelo que se ajusta a su costo. Las fichas de personaje solo cambian mediante herramientas, nunca mediante la narración. Next.js, pgvector, OpenRouter. (https://github.com/Hugobsan/rpg)
- **KM Topografia.** Gestión de documentos de recursos humanos y de flota para una empresa de topografía, en producción. Alertas de vencimiento por correo y WhatsApp, S3 con caché local, roles auditados. Diseñé la arquitectura y la infraestructura. Laravel 12, PostgreSQL, Docker. Privado.
- **Timesheet Transcriber AI.** Transcripción de hojas de horas con Gemini, gratuita y de código abierto. Usa tu propia clave, recorta páginas, exporta a CSV o XLSX. Versión abierta de mi antiguo SaaS, Scanlex. (https://timesheet-transcriber-ai.vercel.app, https://github.com/Hugobsan/Timesheet-Transcriber-Ai)

More (compact list):
- **Sentimiento con BERT.** BERTimbau ajustado con 21 600 reseñas de Play Store de 9 apps de entrega a domicilio. 0.89 de exactitud y de F1 macro. (https://gist.github.com/Hugobsan/b507b76c7b5fc470d77b3a924211430d)
- **LibroVault.** Búsqueda semántica en tus propios PDF: un pipeline de colas en Laravel más un microservicio de embeddings en Python. (https://github.com/Hugobsan/LibroVault)
- **Mia** (2025). Recepcionista en WhatsApp para clínicas de salud: leads, agenda de citas y recordatorios. Estuvo en producción en dos clínicas. N8N, Gemini, Evolution API.
- **Scanlex** (2025). SaaS que digitalizaba hojas de horas y recibos de sueldo para especialistas en nómina, con suscriptores de pago. Laravel, Vue, Gemini.
- **MCP Servers Hub** (2025). Índice de servidores MCP para desarrolladores que llevan IA a sistemas heredados. Hice el back-end, las pruebas y el despliegue.
- **Roadmap full-stack.** Un plan de estudio de 4 meses para desarrolladores junior, con una prueba técnica guiada. (https://hugobsan.com.br/roadmap-full-stack/)

### Education
- Especialización de posgrado en Ingeniería de Software en IA Aplicada (360 horas). UniPDS, 2026 a 2027.
- Licenciatura en Sistemas de Información. UNIMONTES, 2021 a 2025. Tesis sobre modelos BERT para localización de bugs.
- Técnico en Informática. IFNMG, 2017 a 2019.

Idiomas: portugués (nativo), inglés (profesional), español (básico).

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
- Heading: **¿Tienes un equipo que liderar o un sistema que arreglar?**
- Sub: Puestos remotos, consultoría y desarrollo de productos.
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
