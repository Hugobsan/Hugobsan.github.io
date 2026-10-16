# hugobsan.com.br, plano de reconstrução

Status: proposta para aprovação (2026-10-15). Texto do site em [COPY.md](COPY.md).

## 1. Objetivo e público

O site precisa fazer três coisas, nesta ordem:

1. **Contratação remota:** recrutadores e CTOs (Brasil, exterior e empresas chinesas) avaliando um Tech Lead / Senior AI Engineer.
2. **Consultoria e liderança:** empresas que querem colocar IA em produção, revisar arquitetura ou cortar custo de nuvem.
3. **Desenvolvimento como serviço:** clientes que precisam de um produto entregue de ponta a ponta.

Um único CTA de contato ("Work with me" / "Fale comigo") cobre os três. Contato: `contato@hugobsan.com.br`, LinkedIn e GitHub. Sem telefone, sem Lattes, sem CV para download.

## 2. Conceito criativo: "Signal"

Um único sistema de partículas 3D atravessa a página inteira e muda de forma a cada capítulo. Cada forma representa um tipo de trabalho real do Hugo. A cor de destaque (âmbar) marca sempre **o que o sistema escolheu**: o vizinho mais próximo no RAG, o job da vez na fila justa, o achado que sobreviveu ao revisor adversário, o método certo no ranking de bugs.

| Capítulo | Formação das partículas | O que ela conta |
|---|---|---|
| Hero | Nuvem esférica de espaço latente, girando devagar, reage ao mouse | Embeddings, IA |
| Bluee | Clusters de embeddings + um ponto de consulta que acende os top-k | RAG, LLMs |
| Greenn Club | Quatro faixas de jobs convergindo num funil, intercaladas em round-robin | Filas justas, confiabilidade |
| Painel de review | Grafo de 6 fases com um nó adversário | Engenharia agêntica com guardrails |
| Trajetória | Um caminho em fita com marcos de 2017 a 2026 | História |
| Contato | As partículas montam o avatar em pixel art do Hugo (cores do `profile.png`) | Assinatura pessoal |

Leitura de design: portfólio de dev para recrutadores e clientes técnicos, linguagem experimental de scroll 3D com tom de engenharia sério. Dials: variance 8, motion 8, density 4.

### Sistema visual

- **Tema:** escuro primeiro (as partículas leem melhor), com tema claro completo via `prefers-color-scheme`. As cores das partículas vêm dos tokens CSS.
- **Paleta:** grafite azulado (`#0B0E13`), superfícies `#121720`, texto off-white frio, partículas em aço frio, um único acento âmbar "sinal". No claro: fundo `#EEF0F3`, texto `#10141A`, âmbar escurecido.
- **Tipografia:** Bricolage Grotesque (display, larguras condensadas), Geist (texto), Geist Mono (números e dados). Todas OFL e auto-hospedadas. Chinês usa a fonte do sistema (PingFang SC, Microsoft YaHei, Noto Sans SC).
- **Forma:** containers com raio 2px, interativos (botões, seletor de idioma) em pílula. Sem cards em todo lugar.
- **Movimento motivado:** a morfologia das partículas é o único momento "uau". Fora dela: revelação de texto por scrub numa seção (princípios), um sticky-stack (projetos), um pan horizontal (trajetória), hover com física leve nos CTAs. `prefers-reduced-motion` congela tudo em formações estáticas.
- **Proibidos:** em-dash no texto visível, eyebrows em toda seção, números de seção decorativos, cursor customizado, gradiente roxo, fake screenshots feitos de div.

## 3. Arquitetura técnica

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | **Astro** (estável mais recente), saída 100% estática | HTML pronto por idioma, quase zero JS por padrão, melhor TBT que Next.js em sites estáticos |
| 3D | **Three.js puro** (sem React), 1 `THREE.Points` com `ShaderMaterial` | 1 draw call; transição entre formações na GPU |
| Scroll | **GSAP + ScrollTrigger** (gratuito), **Lenis** só no desktop | Padrão de mercado; Lenis no mobile é fonte conhecida de jitter |
| Estilo | CSS com tokens (custom properties), sem framework CSS | O site é pequeno; tokens resolvem tema e consistência |
| Ícones | Phosphor, importado no build | Biblioteca permitida, sem SVG feito à mão |
| Deploy | GitHub Actions → GitHub Pages, Cloudflare na frente (já existe) | Mantém o domínio e o proxy atuais |
| Analytics | Cloudflare Web Analytics ativado no painel da Cloudflare | Sem cookie, sem banner, zero código |

### Motor 3D

- Cada formação é um `Float32Array` pré-calculado; até 7 atributos de posição + cor do avatar + semente aleatória por partícula.
- Um uniform `uProgress` (0 a 6), dirigido pelo ScrollTrigger, mistura a formação atual com a próxima. Cada partícula tem um atraso próprio, e um ruído de curl dá um movimento orgânico.
- Quantidade por dispositivo: ~20k no desktop, ~7k no mobile, ~3k em aparelho fraco (`hardwareConcurrency`, `deviceMemory`, `saveData`). DPR limitado a 1.5.
- Carregado com `import()` dinâmico depois do primeiro paint, em idle. O canvas é `aria-hidden`; renderização pausada fora da tela ou com a aba oculta.
- Fallback: sem WebGL, com reduced-motion ou com save-data, fica um gradiente estático em CSS e as formações viram ilustrações estáticas.

### Idiomas (sua pergunta 2)

O comportamento que você pediu será o que o visitante vê: **o site abre no idioma do navegador, com inglês como padrão, e a escolha manual fica salva no localStorage.**

Por baixo, cada idioma continua tendo sua própria URL (`/`, `/pt/`, `/es/`, `/zh/`). O motivo é que Google, Baidu e os crawlers de LLM não guardam localStorage nem mandam idioma do navegador, então só indexam o que está numa URL. Sem URL por idioma, o site só existe em inglês para buscadores e para o ChatGPT/Claude/Perplexity, e o perfil em chinês nunca é encontrado. É também a recomendação do Google (hreflang entre URLs distintas, sem trocar idioma por cookie ou por configuração do navegador).

Fluxo:

1. Um script inline de ~500 bytes no `<head>` da raiz `/` lê `localStorage.lang`. Se não houver, compara `navigator.languages` com pt/es/zh e faz `location.replace` para o idioma certo. Bots ficam no inglês.
2. O seletor de idioma grava `localStorage.lang` e navega para a rota equivalente.
3. URLs de idioma acessadas direto (link compartilhado) são respeitadas.
4. Cada página declara `hreflang` para as 4 versões + `x-default` (inglês). `<html lang>`: `en`, `pt-BR`, `es`, `zh-Hans`.

Chinês: **simplificado (zh-Hans)**, o padrão corporativo da China continental.

Conteúdo: um arquivo tipado por idioma (`src/i18n/en.ts`, `pt.ts`, `es.ts`, `zh.ts`), todos checados contra o tipo do inglês. Chave faltando quebra o build.

### Rotas reservadas

Outros repositórios seus publicam no mesmo domínio via GitHub Pages: `/roadmap-full-stack/`, `/Calculadora/`, `/Calculadora_AjusteLinear_RK4/`, `/rain_alert/`, `/Tutor_Gestao-de-Treino/`, `/SPA-IMC/`, `/Tabela-Frequencia/` e `/vHack-Calc/`. O site novo não pode criar rotas com esses nomes.

### Acesso a partir da China

Nenhuma requisição externa no carregamento: fontes, scripts e imagens servidos pelo próprio domínio. Nada de Google Fonts, Google Analytics ou CDNs de terceiros. O GitHub Pages atrás da Cloudflare abre na China, mas pode ser lento; hospedagem dentro da China exige licença ICP e fica fora do escopo.

## 4. SEO e SEO para LLMs

- Por idioma: `title`, `description`, canonical, `hreflang`, Open Graph e Twitter card com imagem própria do idioma (1200×630, gerada no build).
- JSON-LD: `Person` (nome, cargo, `worksFor` Greenn, `alumniOf` UNIMONTES, `knowsAbout`, `sameAs` LinkedIn/GitHub, e-mail), `ProfilePage`, `WebSite` e `ScholarlyArticle` para as publicações.
- `sitemap.xml` com `xhtml:link` alternates, e `robots.txt` liberando todos os bots, incluindo GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended e Baiduspider.
- `llms.txt` (índice curado) e `llms-full.txt` (perfil completo em markdown, em inglês, com fatos e números verificáveis). O ganho em busca por IA ainda não está comprovado, mas o custo é baixo e ferramentas de código já leem esses arquivos.
- Todo texto é HTML real. Nada de conteúdo dentro do canvas.
- Consistência de entidade: mesmo nome, cargo e links no site, LinkedIn e GitHub. **Ação sua:** trocar `hugobsan.tech` por `hugobsan.com.br` na bio do GitHub.

## 5. Orçamento de performance (barrado no CI)

Lighthouse CI roda a cada push nas 4 rotas, perfil mobile:

| Métrica | Meta |
|---|---|
| Performance | ≥ 95 |
| SEO, Best Practices | 100 |
| Acessibilidade | ≥ 95 |
| LCP | ≤ 2.0 s (o LCP é o H1 em HTML, nunca o canvas) |
| CLS | ≤ 0.05 |
| TBT | ≤ 150 ms |
| JS inicial antes do 3D | ≤ 40 KB gzip |
| Chunk 3D (three + cena + gsap) | ≤ 220 KB gzip, carregado sob demanda |
| Fontes | ≤ 3 arquivos woff2 com subset latin, display pré-carregada |

## 6. Estrutura da página (uma página longa por idioma)

1. **Nav:** "Hugo Barbosa" + Serviços, Trabalho, Trajetória, Contato + seletor de idioma.
2. **Hero:** H1, subtítulo de até 20 palavras, 2 CTAs.
3. **Como posso ajudar:** 3 ofertas num acordeão horizontal (não 3 cards iguais) + faixa de provas com 4 números reais.
4. **Trabalho selecionado:** sticky-stack com 3 cases (Bluee, Greenn Club, Painel de review), cada um com a sua formação 3D. A pesquisa saiu daqui (decisão do Hugo, pela ótica de quem lê): virou uma linha em Formação e continua completa no JSON-LD e no `llms-full.txt`.
5. **Trajetória:** pan horizontal de 2017 a 2026.
6. **Como eu trabalho:** 6 princípios com revelação de texto por scrub + leituras e formação contínua.
7. **Projetos pessoais:** grade assimétrica com os melhores projetos do GitHub.
8. **Formação e publicações:** compacto, com os 3 destaques e o resto recolhido.
9. **Contato:** e-mail grande com botão de copiar, LinkedIn, GitHub; as partículas montam o avatar.

Páginas de case por projeto (`/work/<slug>`) ficam para uma fase 2. O `llms-full.txt` cobre a profundidade enquanto isso.

## 7. Execução (delegada a sub-agentes)

| Fase | Quem | Entrega |
|---|---|---|
| 0 | Sessão principal | Este plano + COPY.md |
| 1 | Sub-agente | Protótipo navegável (artifact) com 3D, scroll, EN/PT e tema claro/escuro |
| 2 | Hugo | Aprovação ou ajustes do protótipo |
| 3a | Sub-agente | Branch `rebuild`: remove o site antigo, monta o Astro, i18n, layout, tokens, fontes, SEO, CI e deploy |
| 3b | Sub-agente (paralelo) | Motor 3D como módulo isolado, com página de teste |
| 3c | Sub-agente (paralelo) | Traduções ES e ZH a partir do EN, com glossário técnico |
| 4 | Sub-agente | Seções + coreografia GSAP + integração do 3D |
| 5 | Sub-agentes | QA: Lighthouse nas 4 rotas, screenshots mobile/desktop, reduced-motion, sem WebGL, code review e ponytail-review |
| 6 | Hugo | Revisão do PR `rebuild` → `main`; trocar a fonte do Pages para "GitHub Actions" nas configurações do repositório |

A sessão principal guarda contexto e decisões, escreve os briefs e revisa cada entrega.

## 8. Decisões confirmadas pelo Hugo (2026-10-15)

1. "3 → 8 tarefas por pod de GPU" pode ser usado.
2. "260+ PRs revisados em 2026" pode ser usado.
3. Liderou Bluee e Club. A Bluee foi descontinuada: texto no passado e sem link.
4. O avatar em pixel art fica por enquanto; trocar por foto ou avatar novo depois da implementação.
5. Espanhol: tradução por IA, revisão do Hugo. Chinês: tradução por IA revisada por um segundo agente.
