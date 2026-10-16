// docs/COPY.es.md (AI translation, pending Hugo's review)
import type { Dict } from './en';

export default {
  meta: {
    title: 'Hugo Barbosa · Tech Lead, IA e ingeniería de software',
    description: 'Tech Lead en Greenn e ingeniero de IA. Construyo productos que resisten en producción: pipelines de LLM, RAG, colas resilientes e ingeniería agéntica. Disponible para trabajo remoto y consultoría.',
  },
  skip: 'Saltar al contenido',
  nav: { label: 'Navegación principal', services: 'Servicios', work: 'Proyectos', experience: 'Experiencia', contact: 'Contacto', lang: 'Idioma' },
  hero: {
    h1: 'Construyo productos de IA que resisten en producción.',
    sub: 'Tech Lead en Greenn, trabajando en remoto desde Brasil (UTC-3). Pipelines de LLM, colas resilientes e ingeniería agéntica.',
    primary: 'Trabaja conmigo',
    secondary: 'Ver proyectos',
  },
  offers: {
    h: 'Tres formas de trabajar juntos',
    items: [
      { t: 'Me sumo a tu equipo.', d: 'Tech Lead o ingeniero sénior en remoto. Defino estándares, reviso cada cambio y mantengo las entregas predecibles.' },
      { t: 'Consultoría.', d: 'Integración de IA, revisiones de arquitectura y auditorías de costos en la nube. Hallazgos claros que tu equipo puede aplicar en el próximo sprint.' },
      { t: 'Lo construyo por ti.', d: 'Software entregado como servicio, desde la definición del alcance hasta producción, con pruebas, documentación y un traspaso limpio.' },
    ],
    proof: [
      { t: 'Equipos compactos.', d: 'Experiencia liderando equipos pequeños, de la arquitectura a la entrega.' },
      { t: 'IA en producción.', d: 'LLMs, RAG y pipelines de voz y video al servicio de usuarios reales.' },
      { t: 'Costos bajo control.', d: 'Revisiones de arquitectura e infraestructura que recortan el gasto recurrente.' },
      { t: 'Desde 2019.', d: 'Llevando software a producción, de sistemas freelance a SaaS.' },
    ],
  },
  work: {
    h: 'Proyectos destacados',
    stack: 'Stack',
    bluee: {
      name: 'Bluee',
      lede: 'Una plataforma de IA que convertía un tema en un curso en línea completo, con lecciones, narración y un avatar presentador.',
      role: 'Rol: Ingeniero back-end, luego Tech Lead. 2025 a 2026.',
      highlight: { n: '1 hora', l: 'de un tema a un curso completo generado con IA' },
      bullets: [
        'Capa de LLM sobre OpenRouter con streaming y fallbacks, más un chat agéntico con llamadas a herramientas en paralelo.',
        'RAG sobre documentos del usuario: extracción en sandbox, embeddings por lotes, búsqueda con pgvector.',
        'Pipeline de video con avatar: lip-sync e imagen a video con ComfyUI, clonación de voz con ElevenLabs, renderizado con Remotion.',
        'Jobs en RabbitMQ con reintentos con backoff, verificaciones de idempotencia y colas diferidas.',
      ],
    },
    club: {
      name: 'Greenn Club',
      lede: 'El área de miembros donde los creadores de cursos alojan e imparten sus cursos a miles de estudiantes.',
      role: 'Rol: Tech Lead. 2026.',
      highlight: { n: 'Más de R$20 mil', l: 'ahorrados al mes en almacenamiento de video' },
      bullets: [
        'Certificados verificables firmados con ECDSA, un conjunto de claves públicas y validación por QR que cualquiera puede comprobar.',
        'Despacho equitativo: planificación por cliente para que un creador grande nunca acapare la cola del resto.',
        'Pipeline de subtítulos migrado de polling a webhooks, protegido contra entregas concurrentes.',
        'Webhooks heredados llevados a la capa de dominio, protegidos por pruebas de caracterización.',
      ],
    },
    prp: {
      name: 'Panel de revisión de PR',
      note: 'Herramienta interna, sin enlace público',
      lede: 'Mi propia herramienta para revisar pull requests a fondo: seis fases ejecutadas por agentes de Claude Code, en paralelo, en cada PR.',
      role: 'Rol: Creador. 2026.',
      highlight: { n: '260+', l: 'pull requests que revisé en 2026' },
      bullets: [
        'Seis fases (calidad, código, acoplamiento, sobreingeniería, pruebas y estándares del equipo); cada una devuelve hallazgos en un esquema JSON estricto.',
        'Un agente adversario intenta refutar cada hallazgo bloqueante, y Jev, un modelo de decisión en OpenRouter, clasifica el resto.',
        'Los agentes navegan el código con un grafo de conocimiento de Graphify, con listas cerradas de herramientas, acceso de solo lectura y git worktrees aislados.',
        'Cada decisión de diseño se mide. Una variante se descartó por costar un 132% más.',
      ],
    },
  },
  experience: {
    h: 'Experiencia',
    items: [
      {
        period: '2026 a hoy', role: 'Tech Lead', org: 'Greenn',
        bullets: [
          'Equipos de hasta 6 desarrolladores en Bluee y Greenn Club.',
          'Defino la arquitectura y los estándares de código; revisé más de 260 pull requests en 2026.',
          'Revisiones de costos que recortaron más de R$20 mil al mes en almacenamiento de video e identificaron hasta un 50% de ahorro en infraestructura.',
          'Fallas de seguridad detectadas en code review antes de llegar a producción.',
        ],
      },
      {
        period: '2025', role: 'Desarrollador back-end', org: 'Greenn',
        bullets: [
          'Construí el núcleo de IA de Bluee: capa de LLM, chat agéntico, RAG y el pipeline de video con avatar.',
          'Hice más robustos los jobs de RabbitMQ con reintentos con backoff, idempotencia y colas diferidas.',
        ],
      },
      {
        period: '2024 a 2025', role: 'Desarrollador full-stack', org: 'Betabit',
        bullets: [
          'Lideré el módulo de chat con IA de un CRM inmobiliario: Gemini, RAG con PGVector y agentes en WhatsApp, con respuestas en menos de 100 ms para unas 3000 solicitudes al día.',
          'Construí un dashboard de marketing en tiempo real con Laravel Reverb y un servicio de ETL en Python.',
          'Docker y GitHub Actions redujeron el onboarding de desarrolladores de horas a minutos.',
        ],
      },
      {
        period: '2022 a 2024', role: 'Desarrollador web', org: 'UNIMONTES',
        bullets: [
          'Reconstruí el sistema de gestión de extensión de la universidad, que volvieron a adoptar todos los departamentos.',
          'Refactoricé las consultas que bloqueaban el sistema en los picos de inscripción y creé el módulo de microcertificación, presentado en el CIEI 2024.',
          'Implanté Git Flow y un estándar de PR, fui mentor de un estudiante en prácticas y di un taller de Laravel.',
        ],
      },
      {
        period: '2021 a 2022', role: 'Becario de investigación', org: 'UNIMONTES',
        bullets: [
          'Modelé con los programas de posgrado el nuevo sistema de admisiones: requisitos, modelo de datos y arquitectura.',
          'Dejé una guía de continuidad que usaron los siguientes becarios y un artículo en el FEPEG 2022.',
        ],
      },
      {
        period: '2017 a 2021', role: 'Primeros años', org: '',
        bullets: [
          'Técnico en Informática en el IFNMG, luego desarrollo web freelance y reparación de computadoras como autónomo.',
          'Primeros sistemas en producción: el sitio web de una empresa de energía solar y un punto de venta sin conexión para un comercio local.',
        ],
      },
    ],
  },
  how: {
    h: 'Cómo trabajo',
    principles: [
      { t: 'Guardrails antes que autonomía.', d: 'Los agentes de IA reciben listas cerradas de herramientas, esquemas de salida estrictos y un revisor que les lleva la contraria.' },
      { t: 'Hecho para producción, con costos que escalan bien.', d: 'Arquitectura que aguanta carga real sin que la factura de la nube crezca más rápido que la base de usuarios.' },
      { t: 'Trade-offs a la vista.', d: 'Cada decisión técnica llega con las opciones que descarté, lo que cuesta cada una y lo que puede salir mal, registrada en un ADR.' },
      { t: 'Primero, la incertidumbre.', d: 'Spikes, prototipos y números reales antes de comprometerse, para que una estimación deje de ser una apuesta.' },
      { t: 'Seguridad y calidad desde el primer commit.', d: 'El análisis de amenazas, las pruebas y el code review forman parte de la definición de terminado.' },
      { t: 'La solución más simple que funcione.', d: 'La navaja de Ockham aplicada al software: menos piezas móviles fallan menos y cuestan menos a escala.' },
      { t: 'Un equipo que aprende siempre.', d: 'Reviso para enseñar, dejo las decisiones por escrito y programo en pareja, para que el equipo decida bien aunque yo no esté en la sala.' },
    ],
    toolH: 'Herramientas',
    tool: 'Claude Code, Codex y Cursor a diario, con ingeniería de prompts, harnesses y guardrails. Jev, Graphify y Ponytail para revisión automatizada defensiva.',
    learnH: 'Formación continua',
    learn: 'Mentoría TechLead de Impacto con Alexandro Hervis. Posgrado en Ingeniería de Software en IA Aplicada (UniPDS), con profesores como Erick Wendel. Lecturas: Código limpio, The Clean Coder, El programador pragmático, Tidy First?, Software Architecture: The Hard Parts.',
  },
  side: {
    h: 'Proyectos personales',
    featured: {
      scanlex: { name: 'Scanlex y Timesheet Transcriber AI (2025)', text: 'Un SaaS que digitalizaba hojas de horas y recibos de sueldo para especialistas en nómina, con suscriptores de pago, y su versión gratuita y de código abierto: usa tu propia clave de Gemini, recorta páginas, exporta a CSV o XLSX. Laravel, Vue, React, Gemini.' },
      km: { name: 'KM Topografia', text: 'Gestión de documentos de recursos humanos y de flota para una empresa de topografía, en producción. Alertas de vencimiento por correo y WhatsApp, S3 con caché local, roles auditados. Diseñé la arquitectura y la infraestructura. Laravel 12, PostgreSQL, Docker. Repositorio privado.' },
      mia: { name: 'Mia (2025)', text: 'Recepcionista en WhatsApp para clínicas de salud: leads, agenda de citas y recordatorios. Estuvo en producción en dos clínicas. N8N, Gemini, Evolution API.' },
      anthrya: { name: 'anthrya', text: 'App de salud diseñada desde el inicio para la IA: báscula corporal Bluetooth, dieta, glucosa, entrenamientos y medidas corporales, todo accesible para la IA a través de un servidor MCP. Las lecturas en bruto se guardan separadas de las estimaciones, así el historial se puede recalcular. Más de 100 ADR. Expo, Supabase, Hono. En desarrollo, privado.' },
    },
  },
  edu: {
    h: 'Formación',
    items: [
      { t: 'Posgrado lato sensu en Ingeniería de Software en IA Aplicada.', m: 'UniPDS, 2026 a 2027.' },
      { t: 'Licenciatura en Sistemas de Información.', m: 'UNIMONTES, 2021 a 2025. Tesis sobre modelos BERT para localización de bugs.' },
      { t: 'Técnico en Informática.', m: 'IFNMG, 2017 a 2019.' },
    ],
    projectsH: 'Proyectos de investigación',
    projects: [
      { t: 'Proyecto de investigación: mejora de la precisión en la recuperación de trazabilidad entre artefactos de software con inteligencia artificial generativa.', m: 'UNIMONTES, 2024 a 2026.' },
      { t: 'Iniciación científica (PIBIC/FAPEMIG): desarrollo de un sistema para la gestión de procesos de selección en la UNIMONTES.', m: '2021 a 2022.' },
      { t: 'Iniciación científica voluntaria (ICV): análisis de instalaciones residenciales con microgeneración solar.', m: '2020 a 2021.' },
    ],
    pubH: 'Publicaciones',
    pubNote: '',
    pubMore: 'Las 8 publicaciones',
    pubs: [
      { t: 'Análisis exploratorio de modelos basados en BERT para la localización de bugs de software (en portugués).', v: 'ENMC 2025' },
      { t: 'Análisis comparativo de modelos de embeddings propietarios para la localización de bugs (en portugués).', v: 'Manuscrito, 2025' },
      { t: 'Rendimiento de modelos de embeddings preentrenados para la localización de bugs en ArgoUML (en portugués).', v: 'CIEI 2025' },
      { t: 'SBERT para la localización de bugs de software (en portugués).', v: 'CIEI 2024' },
      { t: 'Módulo de microcertificación para un sistema de gestión de extensión universitaria (en portugués).', v: 'CIEI 2024' },
      { t: 'Impacto del Internet de las cosas en la calidad de vida en el hogar (en portugués).', v: 'CBICT 2022, mención honorífica' },
      { t: 'Una aplicación web para admisiones de posgrado (en portugués).', v: 'FEPEG 2022' },
      { t: 'Rendimiento de una planta fotovoltaica a partir de datos recopilados automáticamente (en portugués).', v: 'FEPEG 2020' },
    ],
  },
  contact: {
    h: '¿Tienes un equipo que liderar o un sistema que arreglar?',
    sub: 'Puestos remotos, consultoría y desarrollo de productos.',
    langH: 'Idiomas',
    langs: [
      { name: 'portugués', level: 'nativo' },
      { name: 'inglés', level: 'intermedio' },
      { name: 'español', level: 'intermedio' },
      { name: 'francés', level: 'principiante' },
    ],
    copy: 'Copiar correo',
    copied: 'Copiado',
  },
  footer: '© 2026 Hugo Barbosa. Hecho con Astro y Three.js.',
  notFound: {
    title: 'Página no encontrada',
    home: 'Volver al inicio',
  },
} satisfies Dict;
