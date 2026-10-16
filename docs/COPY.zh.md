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
-->

## ZH (zh-Hans)

### Meta
- title: `Hugo Barbosa · 技术负责人，AI 与软件工程`
- description: `Greenn 技术负责人（Tech Lead），专注 AI 工程。我打造经得起生产环境考验的 AI 产品：LLM 流水线、RAG（检索增强生成）、高可靠队列与智能体工程。欢迎洽谈远程职位与咨询合作。`

### Nav
项目 · 历程 · 研究 · 联系 · 语言

### Hero
- H1: **我打造的 AI 产品，经得起生产环境考验。**
- Sub: Greenn 技术负责人（Tech Lead）。LLM 流水线、高可靠队列与智能体工程，从第一条提示词一直做到 GPU 工作节点。
- CTA primary: **与我合作** (to contact)
- CTA secondary: **查看项目** (to work)

### Offers
Heading: **三种合作方式**
1. **加入您的团队**。远程担任技术负责人或高级工程师。我制定规范、评审每一项变更，让交付稳定可预期。
2. **技术咨询**。AI 集成、架构评审与云成本审计。结论清晰，您的团队下一个迭代就能落地。
3. **为您开发**。以服务形式交付软件，从需求梳理到生产上线，配齐测试与文档，交接干净利落。

Proof strip:
- **6** 名开发者由我带领
- **R$20,000+** 每月节省的视频存储成本
- **最高 50%** 成本评审中识别出的基础设施节省空间
- **数千名** 用户使用我负责的产品

### Selected work
Heading: **代表项目**

**Bluee** (discontinued product, no link)
- 一款 AI 平台，曾可根据一个主题生成一门完整的在线课程，包含课时、旁白和数字人讲师。
- 角色：先任后端工程师，后任技术负责人。2025 至 2026 年。
- 基于 OpenRouter 的 LLM 层，支持流式输出、回退机制和长文档摘要。
- 智能体对话：支持并行工具调用，流式输出断线后可恢复。
- 基于用户文档的 RAG（检索增强生成）：沙箱内提取内容、批量向量化、pgvector 向量检索。
- 数字人视频流水线：ComfyUI 实现口型同步和图生视频，ElevenLabs 实现声音克隆，Remotion 负责渲染。
- RabbitMQ 任务：退避重试、幂等校验和延迟队列。
- RunPod 上的 GPU 工作节点，单个 pod 承载的任务从 3 个提升到 8 个。
- Stack: Laravel 12, PHP 8.4, Python, React, RabbitMQ, Redis, PostgreSQL, pgvector, OpenRouter, ComfyUI, ElevenLabs, Remotion, AWS

**Greenn Club** (link: https://greenn.com.br/club/)
- 会员专区平台：课程创作者在这里托管课程，并交付给数千名学员。
- 角色：技术负责人。2026 年。
- 可验证的课程证书：ECDSA 签名，公开公钥集，任何人都可扫码核验。
- 公平分发：按租户调度，任何一个大型创作者都不会让其他人排不上队。
- 字幕流水线从轮询改为 webhook，并针对并发投递做了加固。
- 视频存储优化，每月节省超过 R$20,000。
- 遗留 webhook 迁入领域层，由特征测试兜底。
- Stack: Laravel 11, Vue 3, Redis, RabbitMQ, MySQL, S3, PandaVideo

**PR 评审面板** (internal tool, no public link)
- 我自己开发的 PR（代码合并请求）深度评审工具：每个 PR 都由 Claude Code 智能体并行跑完六个评审阶段。为 2026 年超过 260 个 PR 的评审量而打造。
- 角色：创建者。2026 年。
- 质量、代码、耦合、过度设计、测试和团队规范六个阶段，各自按严格的 JSON schema 输出评审意见。
- 每条阻断级意见送达作者之前，都会先由一个对抗智能体尝试推翻。
- 分级交给 Jev：OpenRouter 上的一个决策模型，基于已标注的评审意见校准。
- 智能体先通过 Graphify 知识图谱浏览代码，必要时才回退到文本搜索。
- 护栏：工具白名单、只读智能体、禁用 MCP（模型上下文协议）、隔离的 git worktree。
- 每个设计决策都经过实测。曾有一个方案因成本高出 132% 而被放弃。
- Stack: Next.js, TypeScript, SQLite FTS5, Claude Code, OpenRouter, Graphify, GitHub CLI

**缺陷定位研究**（巴西蒙特斯克拉鲁斯州立大学 UNIMONTES，2024 年至今）
- 拿到一份缺陷报告，代码里究竟是哪个方法出了错？我在 ArgoUML 0.22 上用 Mean Reciprocal Rank（MRR，平均倒数排名）评估每种方案。
- Chart (to scale):
  - BERT 双编码器（最佳结果）：0.0705
  - Doc2Vec 基线：0.1975
  - 闭源代码嵌入模型（voyage-4-large）：0.2314
  - 带搜索工具的 LLM 智能体：0.3782
  - 混合方案（智能体 + 语义排序）：**0.4048**
- Caption: 混合方案比最佳嵌入模型高出 75%，是经典基线的两倍。

### Path
Heading: **一路走来**
- **2017** 在 IFNMG 就读计算机技术中职课程。
- **2019** 为一家太阳能公司交付了第一个网站，同时参与光伏安装的现场工作。
- **2020** 第一个投入生产的系统：为一家肉铺开发的离线收银系统，能读取商用电子秤并打印小票。
- **2021** 进入 UNIMONTES 攻读信息系统本科，并获得第一份科研奖学金。
- **2022** 重建了学校的社会服务管理系统。指导一名实习生，并主讲了一期 Laravel 工作坊。
- **2024** 在 Betabit 任全栈工程师。主导开发了一个 AI 聊天模块，基于 Gemini、RAG 和 WhatsApp 智能体。
- **2025** 加入 Greenn，在 Bluee 担任后端工程师。
- **2026** 出任 Greenn 技术负责人。修读应用 AI 软件工程研究生进修课程（非学位）。

### How I work
Heading: **我的工作方式**
1. **先有护栏，再谈自主**。AI 智能体只能调用白名单内的工具，输出必须符合严格的 schema，还配有一个会唱反调的评审者。
2. **任何任务跑两遍也不出错**。幂等与退避重试是默认做法，而不是事故之后的补救。
3. **公平队列**。没有哪个客户会因为别人体量更大而排队等待。
4. **决策成文**。ADR（架构决策记录）和共享规范，让人和智能体得出一致的结论。
5. **小步变更，易于评审**。先整理，再改动。用堆叠式 PR 取代巨型 PR。
6. **成本也是功能**。我看云账单，就像看 profiler 一样。

工具箱：每天使用 Claude Code、Codex 和 Cursor，配合提示词工程、harness 和护栏。用 Jev、Graphify 和 Ponytail 做防御式自动化代码评审。

持续学习：参加 Alexandro Hervis 的 TechLead de Impacto 导师计划。在 UniPDS 修读应用 AI 软件工程研究生进修课程（非学位），授课教师包括 Erick Wendel 等。阅读：《代码整洁之道》《代码整洁之道：程序员的职业素养》《程序员修炼之道》《Tidy First?》《Software Architecture: The Hard Parts》。

### Side projects
Heading: **个人项目**
Featured (bento, 4 cells):
- **anthrya**：AI 原生的健康应用。蓝牙体脂秤、饮食、血糖、训练和身体围度数据，全部可由 AI 通过 MCP 服务器访问。原始读数与估算值分开存储，因此历史数据可以重新计算。超过 100 份 ADR。Expo、Supabase、Hono。开发中，未公开。
- **Chronicle RPG**：单人跑团游戏，由 AI 担任主持人（GM），另有五个专职智能体，各自按成本选用合适的模型。角色卡只能通过工具修改，绝不会因叙事而改变。Next.js、pgvector、OpenRouter。（https://github.com/Hugobsan/rpg）
- **KM Topografia**：为一家测绘公司开发的人事证件与车队管理系统，已投入生产。证件到期通过邮件和 WhatsApp 提醒，S3 配合本地缓存，角色权限可审计。我负责架构与基础设施设计。Laravel 12、PostgreSQL、Docker。未公开。
- **Timesheet Transcriber AI**：基于 Gemini 的考勤表转录工具，免费开源。自带密钥即可使用，支持裁剪页面，导出为 CSV 或 XLSX。这是我此前的 SaaS 产品 Scanlex 的开源版本。（https://timesheet-transcriber-ai.vercel.app，https://github.com/Hugobsan/Timesheet-Transcriber-Ai）

More (compact list):
- **BERT 情感分析**：基于 9 款外卖配送应用的 21,600 条 Play Store 评论微调 BERTimbau。准确率和宏平均 F1 均为 0.89。（https://gist.github.com/Hugobsan/b507b76c7b5fc470d77b3a924211430d）
- **LibroVault**：对您自己的 PDF 做语义搜索，由 Laravel 队列流水线和一个 Python 向量化微服务组成。（https://github.com/Hugobsan/LibroVault）
- **Mia**（2025）：面向医疗诊所的 WhatsApp 前台接待助手，处理客户线索、预约和提醒。曾在两家诊所投入生产使用。N8N、Gemini、Evolution API。
- **Scanlex**（2025）：一款 SaaS 产品，为薪资核算人员将考勤表和工资单数字化，曾拥有付费订阅用户。Laravel、Vue、Gemini。
- **MCP Servers Hub**（2025）：MCP 服务器索引，面向为遗留系统引入 AI 的开发者。我负责后端、测试和部署。
- **全栈学习路线图**：面向初级开发者的 4 个月学习计划，附带一套引导式技术测试。（https://hugobsan.com.br/roadmap-full-stack/）

### Education
- 应用 AI 软件工程研究生进修课程（专业进修，非学位，360 学时）。UniPDS，2026 至 2027 年。
- 信息系统学士。UNIMONTES，2021 至 2025 年。毕业论文研究 BERT 模型在缺陷定位中的应用。
- 计算机技术员（中职学历）。IFNMG，2017 至 2019 年。

语言：葡萄牙语（母语）、英语（工作语言）、西班牙语（初级）。

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
