<!-- reviewed -->
<!--
Glossary (ZH, zh-Hans, mainland business register, polite 您):
- Tech Lead: 技术负责人. Written as 技术负责人（Tech Lead） once in the meta description and once in the hero sub (meta is read standalone in search results), 技术负责人 everywhere else.
- First-use glosses: RAG（检索增强生成）, MCP（模型上下文协议）, ADR（架构决策记录）, PR（代码合并请求）, Mean Reciprocal Rank（MRR，平均倒数排名）, 巴西蒙特斯克拉鲁斯州立大学 UNIMONTES. RAG is glossed once in the meta and once at its first use on the page. LLM is not glossed (widely known as 大模型).
- "hold up in production": 经得起生产环境考验. Resilient queues: 高可靠队列. Agentic engineering: 智能体工程. Agent: 智能体 (never 代理). Job: 任务.
- Guardrails: 护栏. Closed tool lists: 工具白名单. Findings: 评审意见. Blocking finding: 阻断级意见. Triage: 分级. Over-engineering: 过度设计. Characterization tests: 特征测试. Idempotency: 幂等.
- Embeddings: 向量化 (batched embeddings 批量向量化, embeddings microservice 向量化微服务); embedding model: 嵌入模型. Proprietary: 闭源. Image-to-video: 图生视频. Avatar presenter: 数字人讲师. GPU worker: GPU 工作节点. Sprint: 迭代.
- Bug localization: 缺陷定位. University extension: 社会服务. Timesheets: 考勤表. Payslips: 工资单. Game master: 主持人（GM）. Solo tabletop RPG: 单人跑团游戏. AI-first: AI 原生. Bluetooth body scale: 蓝牙体脂秤.
- Postgraduate (UniPDS, Brazilian lato sensu specialization, non-degree, 360 h): 研究生进修课程（非学位）, modelled on China's 研究生课程进修班. Never 硕士 or 攻读. 360 学时 appears only in Education.
- B.Sc. Information Systems: 信息系统学士 (Path 2021: 信息系统本科). IT Technician: 计算机技术员（中职学历）, a secondary-level technical diploma (Path 2017: 计算机技术中职课程).
- Money: R$20k written as R$20,000. Numbers otherwise as in EN.
- Books: 《代码整洁之道》《代码整洁之道：程序员的职业素养》《程序员修炼之道》 are the published Chinese titles; Tidy First? and Software Architecture: The Hard Parts stay in English.
- Bold ends before 。 or ： (e.g. **加入您的团队**。) so CommonMark closes the emphasis correctly next to CJK text.
- Structural labels (title, Heading, Sub, CTA, Proof strip, Chart, Caption, Featured, More, Email, Links, Footer) and notes in parentheses stay in English so each line maps to its EN key. Visible lead-ins (角色, 工具箱, 持续学习, 语言) are translated.
Reviewer changes (second pass, native mainland recruiter/editor):
- Ambiguities: postgraduate now 研究生进修课程（非学位） in Path 2026, Learning and Education (Education adds 专业进修 and 360 学时); 攻读 dropped for it. IT technician now 中职. Path 2021 says 信息系统本科. "Every job can run twice" now **任何任务跑两遍也不出错** (idempotency explicit). AI 优先 → AI 原生.
- Accuracy: Bluee intro marked past with 曾. Greenn Club 证书 → 课程证书 so it is not read as TLS certificates. Hero sub reordered to follow EN (areas first, then "from prompt to GPU worker").
- Terminology: 评审发现 → 评审意见, 阻断级问题 → 阻断级意见, 封闭的工具列表 → 工具白名单, 向量嵌入 → 向量化 (嵌入模型 kept), pull request → PR, 土地测量公司 → 测绘公司, 配送类应用 → 外卖配送应用, 禁止访问 MCP → 禁用 MCP, 潜在客户 → 客户线索, 人事档案 → 人事证件.
- Naturalness: H1, meta closing line, offers, proof strip (6 developers, users), Bluee chat/avatar/GPU lines, Greenn Club intro, fair dispatch, QR line, PR panel sentences, research question, Path 2019/2020/2022/2024, How I work 1/3/5/6, toolbox, Chronicle, KM, Timesheet, BERT, LibroVault, Mia, Scanlex, contact heading.
- Format: removed nested parentheses in the research heading; chart labels use （） instead of comma lists.
Reviewer changes (pass 2):
- Accuracy: proof strip keeps "experience" (带过), drops added 持续 on cost, freelance is 自由职业 (not 外包); PR panel no longer adds 护栏; How I work 7 bold is 持续学习的团队 (EN "a team that keeps learning"), pair is 结对工作; Research Scholar drops added 本科生; onboarding is 入职配置; "presented at" is 发表于.
- Glossary: RAG gloss moved to the proof strip (now its first use on the page); How I work 1 uses 工具白名单; sole proprietor is 个体户; starvation phrased as 独占队列、让其他人一直等待.
- Naturalness: hero sub UTC-3 sits next to 巴西; Bluee 曾可 to 曾能, LLM line without double 支持; certificate line (公开的公钥集, 二维码校验); Jev gloss inline; Experience verbs 主导架构设计, 拦截, 加固, 主导……开发, 卡死, 沿用, 首批上线; cost line uses 降本空间; How I work 3 bold 取舍摆上台面, 5 uses "完成"的定义; Scanlex split into 前者/后者; KM and Mia wording.
- KM Topografia: 未公开 → 代码未公开 (the repository is private, not the system), link added.
-->

## ZH (zh-Hans)

### Meta
- title: `Hugo Barbosa · 技术负责人，AI 与软件工程`
- description: `Greenn 技术负责人（Tech Lead），专注 AI 工程。我打造经得起生产环境考验的 AI 产品：LLM 流水线、RAG（检索增强生成）、高可靠队列与智能体工程。欢迎洽谈远程职位与咨询合作。`

### Nav
服务 · 项目 · 工作经历 · 联系 · 语言

### Hero
- H1: **我打造的 AI 产品，经得起生产环境考验。**
- Sub: Greenn 技术负责人（Tech Lead），常驻巴西（UTC-3），远程办公。LLM 流水线、高可靠队列与智能体工程。
- CTA primary: **与我合作** (to contact)
- CTA secondary: **查看项目** (to work)

### Offers
Heading: **三种合作方式**
1. **加入您的团队**。远程担任技术负责人或高级工程师。我制定规范、评审每一项变更，让交付稳定可预期。
2. **技术咨询**。AI 集成、架构评审与云成本审计。结论清晰，您的团队下一个迭代就能落地。
3. **为您开发**。以服务形式交付软件，从需求梳理到生产上线，配齐测试与文档，交接干净利落。

Proof strip:
- **精干团队**。带过小型团队，从架构设计到交付上线。
- **AI 落地生产**。LLM、RAG（检索增强生成）以及语音和视频流水线，服务真实用户。
- **成本可控**。通过架构与基础设施评审，削减经常性支出。
- **2019 年起**。持续把软件交付上线，从自由职业项目到 SaaS 产品。

### Selected work
Heading: **代表项目**

**Bluee** (discontinued product, no link)
- 一款 AI 平台，曾能根据一个主题生成一门完整的在线课程，包含课时、旁白和数字人讲师。
- 角色：先任后端工程师，后任技术负责人。2025 至 2026 年。
- Highlight: **3 → 8** RunPod 上单个 GPU pod 承载的任务数
- 基于 OpenRouter 的 LLM 层，具备流式输出和回退机制；另有支持并行工具调用的智能体对话。
- 基于用户文档的 RAG：沙箱内提取内容、批量向量化、pgvector 向量检索。
- 数字人视频流水线：ComfyUI 实现口型同步和图生视频，ElevenLabs 实现声音克隆，Remotion 负责渲染。
- RabbitMQ 任务：退避重试、幂等校验和延迟队列。
- Stack: Laravel 12, PHP 8.4, Python, React, RabbitMQ, Redis, PostgreSQL, pgvector, OpenRouter, ComfyUI, ElevenLabs, Remotion, AWS

**Greenn Club** (link: https://greenn.com.br/club/)
- 会员专区平台：课程创作者在这里托管课程，并交付给数千名学员。
- 角色：技术负责人。2026 年。
- Highlight: **R$20,000+** 每月节省的视频存储成本
- 可验证的课程证书：ECDSA 签名、公开的公钥集与二维码校验，任何人都能自行核验。
- 公平分发：按租户调度，单个大型创作者不会独占队列、让其他人一直等待。
- 字幕流水线从轮询改为 webhook，并针对并发投递做了加固。
- 遗留 webhook 迁入领域层，由特征测试兜底。
- Stack: Laravel 11, Vue 3, Redis, RabbitMQ, MySQL, S3, PandaVideo

**PR 评审面板** (internal tool, no public link)
- 我自己开发的 PR（代码合并请求）深度评审工具：每个 PR 都由 Claude Code 智能体并行跑完六个评审阶段。
- 角色：创建者。2026 年。
- Highlight: **260+** 我在 2026 年评审的 PR 数量
- 质量、代码、耦合、过度设计、测试和团队规范六个阶段，各自按严格的 JSON schema 输出评审意见。
- 对抗智能体会尝试推翻每条阻断级意见，其余意见则交给 OpenRouter 上的决策模型 Jev 分级。
- 智能体通过 Graphify 知识图谱浏览代码，同时采用工具白名单、只读权限和隔离的 git worktree。
- 每个设计决策都经过实测。曾有一个方案因成本高出 132% 而被放弃。
- Stack: Next.js, TypeScript, SQLite FTS5, Claude Code, OpenRouter, Graphify, GitHub CLI

### Experience
Heading: **工作经历**

**2026 年至今 · 技术负责人 · Greenn**
- 带领 Bluee 与 Greenn Club 的开发团队，规模最多 6 人。
- 主导架构设计并制定代码规范，2026 年评审 PR 超过 260 个。
- 通过成本评审，视频存储每月节省超过 R$20,000，并梳理出最高 50% 的基础设施降本空间。
- 在代码评审中拦截安全问题，避免其进入生产环境。

**2025 年 · 后端开发工程师 · Greenn**
- 搭建 Bluee 的 AI 核心：LLM 层、智能体对话、RAG 和数字人视频流水线。
- 通过退避重试、幂等控制和延迟队列加固 RabbitMQ 任务。

**2024 至 2025 年 · 全栈开发工程师 · Betabit**
- 主导一套房地产 CRM 的 AI 聊天模块开发：Gemini、基于 PGVector 的 RAG 和 WhatsApp 智能体，每天约 3,000 次请求，响应时间低于 100 毫秒。
- 基于 Laravel Reverb 和 Python ETL 服务搭建实时营销数据看板。
- 借助 Docker 和 GitHub Actions，新开发者入职配置从数小时缩短到几分钟。

**2022 至 2024 年 · Web 开发工程师 · UNIMONTES**
- 重建巴西蒙特斯克拉鲁斯州立大学（UNIMONTES）的社会服务管理系统，所有社会服务部门均已重新启用。
- 重构报名高峰期卡死系统的查询，并开发微认证模块，相关成果发表于 CIEI 2024。
- 推行 Git Flow 和 PR 规范，指导一名实习生，并主讲一期 Laravel 工作坊。

**2021 至 2022 年 · 科研助理 · UNIMONTES**
- 与各研究生项目共同设计新的研究生招生系统：需求、数据模型与架构。
- 留下一份后续科研助理沿用的交接指南，并在 FEPEG 2022 发表论文。

**2017 至 2021 年 · 起步阶段**
- 在 IFNMG 完成计算机技术中职课程，之后以个体户身份自由接单，从事网站开发和电脑维修。
- 首批上线的系统：一家太阳能公司的网站，以及一家本地商店的离线收银系统。

### How I work
Heading: **我的工作方式**
1. **先有护栏，再谈自主**。AI 智能体配有工具白名单、严格的输出 schema，以及一个会唱反调的评审者。
2. **为生产而建，成本随规模可控**。架构扛得住真实负载，云账单的增长不会快过用户增长。
3. **取舍摆上台面**。每个技术决策都写进 ADR（架构决策记录）：放弃了哪些方案、各自成本多少、可能出什么问题。
4. **先消除不确定性**。先做技术预研、原型和真实数据验证，再做承诺，让估算不再靠猜。
5. **安全与质量从第一个提交开始**。威胁检查、测试和代码评审都在“完成”的定义之内。
6. **最简单的可行方案**。把奥卡姆剃刀用在软件上：活动部件越少，故障越少，规模化后的成本也越低。
7. **持续学习的团队**。我借评审带人，把决策记录下来，和同事结对工作，让团队在我不在场时也能做出好决策。

工具箱：每天使用 Claude Code、Codex 和 Cursor，配合提示词工程、harness 和护栏。用 Jev、Graphify 和 Ponytail 做防御式自动化代码评审。

持续学习：参加 Alexandro Hervis 的 TechLead de Impacto 导师计划。在 UniPDS 修读应用 AI 软件工程研究生进修课程（非学位），授课教师包括 Erick Wendel 等。阅读：《代码整洁之道》《代码整洁之道：程序员的职业素养》《程序员修炼之道》《Tidy First?》《Software Architecture: The Hard Parts》。

### Side projects
Heading: **个人项目**
Featured (bento, exactly 4 cells, first one large):
- **Scanlex 与 Timesheet Transcriber AI**（2025）：前者是一款面向薪资核算专员的 SaaS 产品，可将考勤表和工资单数字化，曾拥有付费订阅用户；后者是它的免费开源版本，自带 Gemini 密钥即可使用，支持裁剪页面，导出为 CSV 或 XLSX。Laravel、Vue、React、Gemini。（https://timesheet-transcriber-ai.vercel.app，https://github.com/Hugobsan/Timesheet-Transcriber-Ai）
- **KM Topografia**：为一家测绘公司开发的人事证件与车队管理系统，已投入生产。到期提醒经邮件和 WhatsApp 发送，S3 配合本地缓存，角色权限可审计。我负责架构与基础设施设计。Laravel 12、PostgreSQL、Docker。代码未公开。（https://s.kmtopografia.com.br）
- **Mia**（2025）：面向医疗诊所的 WhatsApp 前台接待助手，处理客户线索、预约和提醒。曾在两家诊所上线运行。N8N、Gemini、Evolution API。
- **anthrya**：AI 原生的健康应用。蓝牙体脂秤、饮食、血糖、训练和身体围度数据，全部可由 AI 通过 MCP（模型上下文协议）服务器访问。原始读数与估算值分开存储，因此历史数据可以重新计算。超过 100 份 ADR。Expo、Supabase、Hono。开发中，未公开。

### Education
- 应用 AI 软件工程研究生进修课程（专业进修，非学位，360 学时）。UniPDS，2026 至 2027 年。
- 信息系统学士。UNIMONTES，2021 至 2025 年。毕业论文研究 BERT 模型在缺陷定位中的应用。
- 计算机技术员（中职学历）。IFNMG，2017 至 2019 年。

语言：葡萄牙语（母语）、英语（工作语言）、西班牙语（初级）。

研究：用 LLM 智能体做软件缺陷定位（UNIMONTES，2024 年至今）。我提出的混合方案 MRR（平均倒数排名）达到 0.40，比最佳嵌入模型高出 75%。

### Publications (titles translated; papers in Portuguese)
- 基于 BERT 的模型在软件缺陷定位中的探索性分析（葡萄牙语）。ENMC 2025。
- 闭源嵌入模型在缺陷定位中的对比分析（葡萄牙语）。手稿，2025 年。
- 预训练嵌入模型在 ArgoUML 缺陷定位中的性能（葡萄牙语）。CIEI 2025。
- 用于软件缺陷定位的 SBERT（葡萄牙语）。CIEI 2024。
- 大学社会服务管理系统的微认证模块（葡萄牙语）。CIEI 2024。
- 物联网对家居生活质量的影响（葡萄牙语）。CBICT 2022，荣誉提名。
- 面向研究生招生的 Web 应用（葡萄牙语）。FEPEG 2022。
- 基于自动采集数据的光伏电站性能分析（葡萄牙语）。FEPEG 2020。

### Contact
- Heading: **有团队要带，或有系统要修？**
- Sub: 远程职位、技术咨询与产品开发。
- Email: contato@hugobsan.com.br (button: **复制邮箱**, after click: **已复制**)
- Links: LinkedIn（https://www.linkedin.com/in/hugobsan/），GitHub（https://github.com/Hugobsan）
- Footer: © 2026 Hugo Barbosa。使用 Astro 与 Three.js 构建。

### UI strings
- Skip to content: 跳到主要内容
- Main navigation (aria label): 主导航
- Language: 语言
- Internal tool, no public link: 内部工具，无公开链接
- All 8 publications: 全部 8 篇论文
- Copy email: 复制邮箱
- Copied: 已复制
- Page not found: 页面不存在
- Back to home: 返回首页
