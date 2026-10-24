window.PORTFOLIO["lake-domain"]={
  "id": "lake-domain",
  "name": "Lake Domain",
  "tag": "在湖区探索，以自己的方式迎接守护者。",
  "summary": "Unity 单人动作冒险：三维探索、双试炼与日蚀挑战。",
  "facts": [
    "Unity · 游戏设计与开发",
    "界面 · HLSL Shader · 玩家研究"
  ],
  "insights": [],
  "slides": [],
  "process": [],
  "frames": [
    {
      "type": "video",
      "src": "https://www.youtube.com/embed/NqJliy-I8mo"
    }
  ],
  "presentation": "lake",
  "research": {
    "heading": "从一片湖区，构建通向守护者的旅程。",
    "intro": "Lake Domain 的核心问题是：玩家要做多少准备，才愿意面对最后的挑战？我们把三维探索、平台格斗和像素跑酷连接成一个可以自主选择路线的世界；我参与界面设计、自定义 Shader 与玩家研究，让视觉表达、操作反馈和探索动机彼此衔接。",
    "metrics": [
      [
        "Unity",
        "三维场景与交互开发"
      ],
      [
        "HLSL",
        "程序化传送门效果"
      ],
      [
        "玩家研究",
        "观察 · 访谈 · 问卷 · 眼动资料"
      ]
    ],
    "sections": [
      [
        "概念与世界",
        0
      ],
      [
        "玩法与成长",
        2
      ],
      [
        "界面与 Shader",
        4
      ],
      [
        "研究与迭代",
        6
      ],
      [
        "制作与呈现",
        9
      ]
    ],
    "steps": [
      [
        "把“150 年后的未来”藏进自然幻想世界",
        "故事从脑机接口进入虚拟世界 Domain 开始。湖泊、花园、遗迹和试炼构成表面的自然秩序，几何光缝与传送门则暗示世界由系统维持。Guardian 既是最终挑战，也连接着世界边界与责任的叙事；返回现实或留下守护，是我们进一步发展的结局构想。"
      ],
      [
        "从灰盒走向有高差、有方向的湖区",
        "早期先在有限地图内确定营地、湖岛、遗迹、试炼入口和最终目的地，再逐步替换灰盒与调整路线。当前场景用低处入口、中层罗盘广场、下方湖泊和更高的终点形成高差关系；石阶、岸线、房屋和蓝金色地标帮助玩家判断自己在哪里。"
      ],
      [
        "三种玩法，围绕同一个准备循环",
        "主世界负责探索、游泳、攀爬、线索与宝箱；Trial A 以伤害百分比、击退和出界考验对战判断；Trial B 用平台、陷阱、敌人与难度选择考验移动时机。两个试炼保留各自玩法，返回后与主世界成长连接。拿到练习剑便可前往最终挑战，额外准备由玩家决定。"
      ],
      [
        "让奖励改变准备方式，而不是强迫清空地图",
        "试炼和隐藏宝箱提供装备与成长奖励，失败仍保留永久进度。Trial B 的最高完成难度对应不同的生命和体力增益，重复通关不叠加发奖。我们把“完成”“可领奖”“已经领取”区分开，让奖励既能支持下一次尝试，也避免玩家靠反复领奖破坏成长节奏。"
      ],
      [
        "我的 UI 设计：把信息放回玩家的行动里",
        "我整理了对话框、带动画的暂停界面、交互提示、道具获得、背包、生命与能量条、死亡及地图等界面，并绘制练习剑、护甲、护符与攀爬手套等早期道具图标。随着项目推进，旅程之书把任务、地图、装备和存档连接起来；当前地图支持选择目的地并开启方向引导。"
      ],
      [
        "我的 Shader：让虚拟边界逐渐显形",
        "Domain Portal / Virtual Seam 使用 ShaderLab 与手写 HLSL，通过 UV 和数学函数生成拱形轮廓、网格、流动能量带和扫描边缘。角色接近时，Reveal 由下向上展开；离开时反向收起。低能量青色与高能量红色的参数对照，展示亮度、网格密度与流速如何改变入口的情绪。这组早期实验用于探索边界的视觉语言。"
      ],
      [
        "先设计研究，再判断“好不好玩”",
        "我参与编写评估计划，把结构化观察、任务后回顾、半结构式访谈和独立问卷结合起来。现场先让玩家自然探索，不预先告知路线；获得控制权十分钟后记录发现了什么，而非要求十分钟通关。观察表同时记录卡点、求助程度、试炼进入与返回、奖励理解和 Boss 体验。"
      ],
      [
        "把“玩家说懂了”与“实际会走”放在一起看",
        "在我整理的试玩记录里，有玩家能说出“打败 Boss”的长期目标，却常常不知道下一步；有经验玩家觉得整体偏容易，又在普通小怪或 Trial B 连续受挫。因此我们把问题拆成目标理解、即时导航、分场景难度和命中反馈，而不只看一项总分。"
      ],
      [
        "用眼动资料补充观察，而不是替玩家下结论",
        "眼动热图显示注意力更多集中在角色与画面中央，外围提示和小地图较少获得持续关注。这与现场迷路、反复寻找下一步的行为一起，提示我们调整信息层级、减少中央信息竞争。总体热图用于识别关注区域，具体卡点仍回到相应操作与访谈记录判断。"
      ],
      [
        "把测试发现转成可追踪的设计回应",
        "反馈推动了地图点击引导、任务状态更新、奖励说明、输入一致性和难度分场景调整等方向。当前版本已有书本地图、金色目标引导、锁敌与视角回正；仍保留不同模式的局部键位差异。我们把后续提案与当前实现对照，逐项检查提示、代码和实际操作是否一致。"
      ],
      [
        "在浏览器限制下，控制世界的制作范围",
        "团队使用 Unity、C#、HLSL、GitHub 和 Confluence 协作。早期美术计划围绕模块复用、共享材质、贴图尺度和分区域检查控制 WebGL 体积与运行负担。跨世界切换还要处理输入、镜头、音频、进度与返回位置，让独立玩法能组成连续旅程。"
      ],
      [
        "用宣传片压缩一次旅程，而不是堆功能清单",
        "分镜从湖区与向导开始，经过野外交锋、游泳、攀爬、地图、双试炼，再收束到 Guardian。环境远景交代世界，近景突出交互与奖励，战斗段通过闪避、收招与再进攻呈现节奏。上方宣传片保留游戏实际画面，让观众先感受到空间和行动，再阅读背后的设计。"
      ]
    ],
    "assets": [
      {
        "src": "assets/lake-domain/lake-clean.webp",
        "title": "当前主世界：湖泊、岛屿与岸边聚落"
      },
      {
        "src": "assets/lake-domain/prototype-overview.png",
        "title": "早期灰盒：先确认空间与功能关系"
      },
      {
        "src": "assets/lake-domain/arrival-clean.webp",
        "title": "低处入口与层层上升的路径"
      },
      {
        "src": "assets/lake-domain/hub-clean.webp",
        "title": "罗盘广场：方向选择与向导"
      },
      {
        "src": "assets/lake-domain/upper-route-clean.webp",
        "title": "从台阶与平台建立上升节奏"
      },
      {
        "src": "assets/lake-domain/side-a-stage2.jpg",
        "title": "Trial A：Twilight Ruins 平台对战"
      },
      {
        "src": "assets/lake-domain/side-b.jpg",
        "title": "Trial B：像素平台、陷阱与收集"
      },
      {
        "src": "assets/lake-domain/journal.jpg",
        "title": "旅程之书：任务与进度"
      },
      {
        "src": "assets/lake-domain/map.jpg",
        "title": "书本地图：选择目的地与方向引导"
      },
      {
        "src": "assets/lake-domain/title-clean.webp",
        "title": "Cloud Gate 标题界面"
      },
      {
        "src": "assets/lake-domain/portal-1.gif",
        "title": "Shader 参数对照：低能量青色"
      },
      {
        "src": "assets/lake-domain/portal-2.gif",
        "title": "Shader 参数对照：高能量红色"
      },
      {
        "src": "assets/lake-domain/hero-combat.jpg",
        "title": "当前战斗界面与角色攻击"
      },
      {
        "src": "assets/lake-domain/black-sun.jpg",
        "title": "Black Sun：蓄力与范围压力"
      },
      {
        "src": "assets/lake-domain/summit-clean.webp",
        "title": "日蚀状态下的终点庭院"
      },
      {
        "src": "assets/lake-domain/research-method.svg",
        "title": "研究方法整理：观察、进度快照、访谈与问卷"
      },
      {
        "src": "assets/lake-domain/research-findings.svg",
        "title": "根据试玩记录整理的四类设计问题"
      },
      {
        "src": "assets/lake-ui/ui-01.gif",
        "title": "对话框 · 初稿"
      },
      {
        "src": "assets/lake-ui/ui-02.gif",
        "title": "对话框 · 透明动效"
      },
      {
        "src": "assets/lake-ui/ui-03.gif",
        "title": "对话框 · 主世界预览"
      },
      {
        "src": "assets/lake-ui/ui-04.png",
        "title": "对话框 · P5R 风格探索"
      },
      {
        "src": "assets/lake-ui/ui-05.gif",
        "title": "暂停界面 · 第一版"
      },
      {
        "src": "assets/lake-ui/ui-06.gif",
        "title": "暂停界面 · 第二版"
      },
      {
        "src": "assets/lake-ui/ui-07.png",
        "title": "场景互动按钮"
      },
      {
        "src": "assets/lake-ui/ui-08.gif",
        "title": "道具获得 · 第一版"
      },
      {
        "src": "assets/lake-ui/ui-09.gif",
        "title": "道具获得 · 透明动效"
      },
      {
        "src": "assets/lake-ui/ui-10.gif",
        "title": "道具获得 · 主世界预览"
      },
      {
        "src": "assets/lake-ui/ui-11.png",
        "title": "背包 · 整体布局"
      },
      {
        "src": "assets/lake-ui/ui-12.gif",
        "title": "装备栏 · 动效细节"
      },
      {
        "src": "assets/lake-ui/ui-13.gif",
        "title": "装备栏 · 主世界预览"
      },
      {
        "src": "assets/lake-ui/ui-14.gif",
        "title": "Practice Sword"
      },
      {
        "src": "assets/lake-ui/ui-15.gif",
        "title": "Reinforced Sword"
      },
      {
        "src": "assets/lake-ui/ui-16.gif",
        "title": "Ruin Armour"
      },
      {
        "src": "assets/lake-ui/ui-17.gif",
        "title": "Lake Charm"
      },
      {
        "src": "assets/lake-ui/ui-18.gif",
        "title": "Health Pendant"
      },
      {
        "src": "assets/lake-ui/ui-19.gif",
        "title": "Climbing Gloves"
      },
      {
        "src": "assets/lake-ui/ui-20.gif",
        "title": "生命、能量与死亡状态"
      },
      {
        "src": "assets/lake-ui/ui-21.png",
        "title": "地图 · 视觉方案"
      },
      {
        "src": "assets/lake-ui/ui-22.png",
        "title": "小地图 · 界面框架"
      }
    ],
    "groups": [
      [
        0
      ],
      [
        1,
        2,
        3,
        4
      ],
      [
        5,
        6
      ],
      [
        7
      ],
      [
        21,
        18,
        25,
        28,
        36
      ],
      [
        10,
        11
      ],
      [
        15
      ],
      [
        16
      ],
      [],
      [
        8,
        12
      ],
      [
        1,
        4
      ],
      [
        14,
        13
      ]
    ],
    "iterationLabel": "从试玩到下一轮设计",
    "iterationHeading": "我们怎样回应具体的问题？",
    "changeLabel": "设计回应与当前进展",
    "iterations": [
      [
        "导航｜知道终点，仍不知道下一步",
        "观察到新手常需额外提示；任务完成后仍保留追踪线，也会误导后续行动。",
        "设计上把长期目标和当前步骤分开，并要求完成后更新追踪状态。当前书本地图可点选目的地，金色引导承担世界内方向提示；继续核对停止追踪、完成反馈与地图状态。"
      ],
      [
        "反馈｜做完了，却不清楚得到什么",
        "试玩者完成试炼后不清楚具体增益；有人无法判断攻击是否命中或自己是否受击。",
        "把结果、奖励和领取状态写清楚，结合命中、受击、音效与状态变化强化反馈。当前成长系统区分永久奖励与难度增益，后续继续检验玩家是否能准确理解。"
      ],
      [
        "难度｜不能用一个“太容易”概括所有场景",
        "经验玩家可能轻松避开 Boss，却在高伤害小怪区域或 Trial B 多次失败；完全新手又会在转向和命中上受挫。",
        "按场景检查伤害、密度、攻击预警、容错和操作响应。当前加入锁敌、镜头回正及 Trial B 难度选择，避免只加 Boss 血量或统一提高难度。"
      ],
      [
        "一致性｜每换一个世界，不应重新猜按键",
        "记录中出现小游戏攻击方式不同、Final Room 的空格行为出乎预期，以及暂停键影响全屏等问题。",
        "团队提出统一“移动、攻击、互动、帮助、返回”的输入意图，并同步检查教程、场景文字与输入代码。当前探索空格跳跃、竞技场空格闪避仍有差异，需要清楚提示与后续验证。"
      ]
    ],
    "iterationGroups": [
      [
        8
      ],
      [
        7
      ],
      [
        12,
        6
      ],
      []
    ]
  },
  "url": "project-lake-domain.html"
};
