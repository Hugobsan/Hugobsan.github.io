import type { Dict } from './en';

export default {
  meta: {
    title: 'Hugo Barbosa · Tech Lead, IA e Engenharia de Software',
    description: 'Tech Lead na Greenn. Produtos de IA que aguentam produção: pipelines de LLM, RAG, filas resilientes e engenharia agêntica. Vagas remotas e consultoria.',
  },
  skip: 'Pular para o conteúdo',
  nav: { label: 'Principal', services: 'Serviços', work: 'Trabalho', experience: 'Experiência', contact: 'Contato', lang: 'Idioma' },
  hero: {
    h1: 'Construo produtos de IA que aguentam produção.',
    sub: 'Tech Lead na Greenn, trabalhando remoto do Brasil (UTC-3). Pipelines de LLM, filas resilientes e engenharia agêntica.',
    primary: 'Fale comigo',
    secondary: 'Ver projetos',
  },
  offers: {
    h: 'Três formas de trabalharmos juntos',
    items: [
      { t: 'No seu time.', d: 'Tech Lead ou Engenheiro Sênior remoto. Defino padrões, reviso cada mudança e mantenho a entrega previsível.' },
      { t: 'Consultoria.', d: 'Integração de IA, revisão de arquitetura e auditoria de custo de nuvem. Achados claros que o time aplica na próxima sprint.' },
      { t: 'Construo para você.', d: 'Software entregue como serviço, do escopo à produção, com testes, documentação e passagem de bastão limpa.' },
    ],
    proof: [
      { t: 'Times enxutos.', d: 'Experiência liderando times pequenos, da arquitetura à entrega.' },
      { t: 'IA em produção.', d: 'LLMs, RAG e pipelines de voz e vídeo atendendo usuários reais.' },
      { t: 'Custo sob controle.', d: 'Revisões de arquitetura e infraestrutura que cortam gasto recorrente.' },
      { t: 'Desde 2018.', d: 'Colocando software em produção, de sistemas freelance a SaaS.' },
    ],
  },
  work: {
    h: 'Trabalho selecionado',
    stack: 'Stack',
    bluee: {
      name: 'Bluee',
      lede: 'Plataforma de IA que transformava um tema num curso online completo, com aulas, narração e um avatar apresentador.',
      role: 'Papel: Engenheiro back-end, depois Tech Lead. 2025 a 2026.',
      highlight: { n: '1 hora', l: 'de um tema a um curso completo gerado por IA' },
      bullets: [
        'Camada de LLM sobre o OpenRouter com streaming e fallbacks, mais um chat agêntico com tool calls em paralelo.',
        'RAG sobre documentos do usuário: extração em sandbox, embeddings em lote, busca com pgvector.',
        'Pipeline de vídeo com avatar: lip-sync e imagem para vídeo no ComfyUI, clonagem de voz com ElevenLabs, renderização com Remotion.',
        'Jobs no RabbitMQ com retry com backoff, checagem de idempotência e filas com atraso.',
      ],
    },
    club: {
      name: 'Greenn Club',
      lede: 'A área de membros onde criadores hospedam e entregam seus cursos para milhares de alunos.',
      role: 'Papel: Tech Lead. 2026.',
      highlight: { n: 'R$20 mil+', l: 'economizados por mês em armazenamento de vídeo' },
      bullets: [
        'Certificados verificáveis assinados com ECDSA, chaves públicas abertas e validação por QR que qualquer pessoa confere.',
        'Fair dispatch: agendamento por cliente para que um criador grande nunca trave a fila dos outros.',
        'Pipeline de legendas trocado de polling para webhooks, protegido contra entregas concorrentes.',
        'Webhooks legados levados para a camada de domínio, protegidos por testes de caracterização.',
      ],
    },
    prp: {
      name: 'Painel de Review de PRs',
      note: 'Ferramenta interna, sem link público',
      lede: 'Minha ferramenta para revisar pull requests a fundo: seis fases executadas por agentes do Claude Code, em paralelo, em cada PR.',
      role: 'Papel: Criador. 2026.',
      highlight: { n: '260+', l: 'pull requests revisados por mim em 2026' },
      bullets: [
        'Seis fases (qualidade, código, acoplamento, excesso de engenharia, testes e padrões do time), cada uma devolvendo achados num schema JSON estrito.',
        'Um agente adversário tenta derrubar cada achado bloqueante, e o Jev, um modelo de decisão no OpenRouter, faz a triagem do resto.',
        'Os agentes navegam pelo código com um grafo de conhecimento do Graphify, com lista fechada de ferramentas, acesso somente leitura e git worktrees isolados.',
        'Cada escolha de design é medida. Uma variante foi descartada por custar 132% a mais.',
      ],
    },
  },
  experience: {
    h: 'Experiência',
    items: [
      {
        period: '2026 até hoje', role: 'Tech Lead', org: 'Greenn',
        bullets: [
          'Times de até 6 desenvolvedores na Bluee e no Greenn Club.',
          'Defino a arquitetura e os padrões de código, e revisei mais de 260 pull requests em 2026.',
          'Revisões de custo que cortaram mais de R$20 mil por mês em armazenamento de vídeo e mapearam até 50% de economia de infraestrutura.',
          'Falhas de segurança encontradas em review antes de chegarem à produção.',
        ],
      },
      {
        period: '2025', role: 'Desenvolvedor Back-end', org: 'Greenn',
        bullets: [
          'Construí o núcleo de IA da Bluee: camada de LLM, chat agêntico, RAG e o pipeline de vídeo com avatar.',
          'Deixei os jobs do RabbitMQ mais robustos com retry com backoff, idempotência e filas com atraso.',
        ],
      },
      {
        period: '2024 a 2025', role: 'Desenvolvedor Full-stack', org: 'Betabit',
        bullets: [
          'Liderei o chat com IA de um CRM imobiliário usado por 15 imobiliárias e centenas de corretores: já em 2024, agentes consultavam o sistema e executavam ações por texto e áudio, na web, no mobile e no WhatsApp. Gemini, RAG com PGVector e cache no Redis respondendo em menos de 100 ms, para cerca de 3 mil requisições por dia.',
          'Liderei o módulo de insights com IA de um dashboard de marketing em tempo real, com Laravel Reverb e um serviço de ETL em Python.',
          'TDD com Pest, code review em todo PR e deploys semanais. Docker e GitHub Actions reduziram o onboarding de devs de horas para minutos.',
        ],
      },
      {
        period: '2022 a 2024', role: 'Desenvolvedor Web', org: 'UNIMONTES',
        bullets: [
          'Reconstruí o sistema de gestão da extensão da universidade, que voltou a ser adotado por todos os departamentos.',
          'Refatorei as consultas que travavam o sistema no pico de matrículas e criei o módulo de micro-certificação, apresentado no CIEI 2024.',
          'Implantei Git Flow e padrão de PRs, mentorei um estagiário e dei um minicurso de Laravel.',
        ],
      },
      {
        period: '2021 a 2022', role: 'Bolsista de Iniciação Científica', org: 'UNIMONTES',
        bullets: [
          'Modelei com os programas de pós-graduação o novo sistema de processos seletivos: requisitos, modelo de dados e arquitetura.',
          'Deixei um guia de continuidade usado pelos bolsistas seguintes e um artigo no FEPEG 2022.',
        ],
      },
      {
        period: '2017 a 2021', role: 'Primeiros anos', org: '',
        bullets: [
          'Técnico em Informática no IFNMG, depois desenvolvimento web freelance e manutenção de computadores como MEI.',
          'Primeiros sistemas em produção: o site de uma empresa de energia solar e um PDV offline para um comércio local.',
        ],
      },
    ],
  },
  how: {
    h: 'Como eu trabalho',
    principles: [
      { t: 'Guardrails antes de autonomia.', d: 'Agentes de IA recebem lista fechada de ferramentas, schemas de saída estritos e um revisor que discorda.' },
      { t: 'Feito para produção, com custo que escala bem.', d: 'Arquitetura que aguenta carga real sem a conta da nuvem crescer mais rápido que a base de usuários.' },
      { t: 'Trade-offs às claras.', d: 'Toda decisão técnica vem com as opções que descartei, o custo de cada uma e o que pode dar errado, registrada num ADR.' },
      { t: 'Incerteza primeiro.', d: 'Spikes, protótipos e números reais vêm antes dos compromissos, para que estimativa deixe de ser chute.' },
      { t: 'Segurança e qualidade desde o primeiro commit.', d: 'Análise de ameaças, testes e code review fazem parte do pronto.' },
      { t: 'A solução mais simples que funciona.', d: 'A navalha de Ockham aplicada a software: menos peças móveis quebram menos e custam menos em escala.' },
      { t: 'Um time que aprende sempre.', d: 'Reviso para ensinar, registro decisões e pareio com as pessoas, para que o time decida bem mesmo quando eu não estou na sala.' },
    ],
    toolH: 'Ferramentas',
    tool: 'Claude Code, Codex e Cursor no dia a dia, com engenharia de prompt, harness e guardrails. Jev, Graphify e Ponytail para code review defensivo automatizado.',
    learnH: 'Formação contínua',
    learn: 'Mentoria TechLead de Impacto com Alexandro Hervis. Pós em Engenharia de Software em IA Aplicada na UniPDS, com professores como Erick Wendel. Leituras: Código Limpo, O Codificador Limpo, O Programador Pragmático, Tidy First?, Arquitetura de Software: As Partes Difíceis.',
  },
  side: {
    h: 'Projetos pessoais',
    featured: {
      scanlex: { name: 'Scanlex e Timesheet Transcriber AI (2025)', text: 'SaaS que digitalizava cartões de ponto e holerites para calculistas, com assinantes pagantes, e sua versão gratuita e open-source: use sua própria chave do Gemini, recorte páginas, exporte para CSV ou XLSX. Laravel, Vue, React, Gemini.' },
      km: { name: 'KM Topografia', text: 'Gestão de documentos de RH e de frota para uma empresa de topografia, em produção. Alertas de vencimento por e-mail e WhatsApp, S3 com cache local, papéis auditados. Desenhei a arquitetura e a infraestrutura. Laravel 12, PostgreSQL, Docker. Repositório privado.' },
      mia: { name: 'Mia (2025)', text: 'Recepcionista no WhatsApp para clínicas: leads, agendamento e lembretes. Rodou em produção em duas clínicas. N8N, Gemini, Evolution API.' },
      anthrya: { name: 'anthrya', text: 'App de saúde feito com IA desde o início: balança de bioimpedância via Bluetooth, dieta, glicemia, treinos e medidas corporais, tudo acessível por IA através de um servidor MCP. Leituras brutas ficam separadas das estimativas, então o histórico pode ser recalculado. Expo, Supabase, Hono. Em desenvolvimento, privado.' },
    },
  },
  edu: {
    h: 'Formação',
    items: [
      { t: 'Pós-graduação Lato Sensu em Engenharia de Software em IA Aplicada.', m: 'UniPDS, 2026 a 2027.' },
      { t: 'Bacharelado em Sistemas de Informação.', m: 'UNIMONTES, 2021 a 2025. TCC sobre modelos BERT para localização de bugs.' },
      { t: 'Técnico em Informática.', m: 'IFNMG, 2017 a 2019.' },
    ],
    projectsH: 'Projetos de pesquisa',
    projects: [
      { t: 'Melhoria da acurácia do Processo de Recuperação de Rastreabilidade entre Artefatos de Software utilizando Inteligência Artificial Generativa.', m: 'UNIMONTES, 2024 a 2026.' },
      { t: 'IC (PIBIC/FAPEMIG): Desenvolvimento de um sistema para gestão de processos seletivos na Unimontes.', m: '2021 a 2022.' },
      { t: 'ICV: Análise de Instalações Residenciais com Micro-Geração Solar.', m: '2020 a 2021.' },
    ],
    pubH: 'Publicações',
    pubNote: '',
    pubMore: 'Todas as 7 publicações',
    pubs: [
      { t: 'Uma análise exploratória da utilização de modelos baseados em BERT para localização de bugs de software.', v: 'ENMC 2025' },
      { t: 'Análise da performance dos modelos pré-treinados all-MiniLM-L6-v2, multi-qa-mpnet-base-dot-v1 e msmarco-bert-base-dot-v5 para geração de embeddings sobre a localização de bugs do ArgoUML.', v: 'CIEI 2025' },
      { t: 'Análise da utilização do modelo SBERT para localização de bugs de software.', v: 'CIEI 2024' },
      { t: 'Desenvolvimento de módulo de micro certificação para o SIGEX da UNIMONTES.', v: 'CIEI 2024' },
      { t: 'Impacto da Internet das Coisas na qualidade de vida em ambientes residenciais.', v: 'CBICT 2022, menção honrosa' },
      { t: 'Desenvolvimento de uma aplicação web para gestão de processos seletivos.', v: 'FEPEG 2022' },
      { t: 'Análise de desempenho de uma usina fotovoltaica a partir de dados de medição de energia coletados automaticamente.', v: 'FEPEG 2020' },
    ],
    manuscript: { t: 'Uma análise comparativa de modelos proprietários de geração de embeddings para localização de bugs de software.', v: 'Manuscrito (não publicado), 2025' },
  },
  contact: {
    h: 'Tem um time para liderar ou um sistema para consertar?',
    sub: 'Vagas remotas, consultoria e construção de produtos.',
    langH: 'Idiomas',
    langs: [
      { name: 'português', level: 'nativo' },
      { name: 'inglês', level: 'intermediário' },
      { name: 'espanhol', level: 'intermediário' },
      { name: 'francês', level: 'iniciante' },
    ],
    send: 'Enviar e-mail',
    copy: 'Copiar e-mail',
    copied: 'Copiado',
  },
  footer: '© 2026 Hugo Barbosa. Feito com Astro e Three.js.',
  notFound: {
    title: 'Página não encontrada',
    home: 'Voltar ao início',
  },
} satisfies Dict;
