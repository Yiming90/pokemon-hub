/* =========================================================
   Pokémon Hub · Demo content
   Consumer content is illustrative. Financial actuals are
   sourced from The Pokémon Company's published financial
   statements (FY2022–FY2026) and cited in the Finance view.
   ========================================================= */

window.POKEMON_HUB = (() => {
  const NEWS = [
    {
      id: "world-championship-2026",
      featured: true,
      category: "活动",
      date: "2026-11-08",
      read: "6 分钟",
      title: "2026 宝可梦世界锦标赛落幕：新王加冕，热爱同频",
      excerpt: "来自 62 个国家和地区的训练家齐聚一堂。桌面对战、电子游戏与《Pokémon GO》三大项目共同写下了今年最热血的周末。",
      image: "assets/pokemon/25.webp",
      tint: "yellow",
      author: "Pokémon Hub 编辑部",
      body: [
        "当最后一张支援者卡落下，全场安静了半秒，随后爆发出本届宝可梦世界锦标赛最热烈的掌声。为期三天的赛事在横滨国际平和会议场结束，超过一万名观众到场，线上直播覆盖 62 个国家和地区。",
        "本届赛事设置了集换式卡牌游戏、电子游戏与《Pokémon GO》三个正式项目。来自日本的选手在卡牌公开组决赛中以 2:1 取胜；电子游戏大师组冠军则由一位首次参赛的 19 岁训练家摘得。",
        "赛场之外，宝可梦中心快闪店、插画师签名会与「和宝可梦一起长大」主题展同样排起长队。主办方表示，明年的赛事将首次加入更多亚太地区城市预选赛，让更多训练家能够站上世界舞台。",
        "「胜负只是旅程的一部分，真正留下的是与宝可梦、与伙伴共同经历的瞬间。」赛事闭幕影片中的这句话，成为今年夏天最合适的注脚。"
      ],
      tags: ["世界锦标赛", "横滨", "赛事"]
    },
    {
      id: "legends-za-night",
      category: "游戏",
      date: "2026-11-05",
      read: "4 分钟",
      title: "《宝可梦传说 Z-A》夜间探索情报公开",
      excerpt: "密阿雷市的霓虹亮起后，野生宝可梦的生态会发生怎样的变化？开发团队分享了新的夜间玩法。",
      image: "assets/pokemon/448.webp",
      tint: "blue",
      author: "游戏情报组",
      body: [
        "《宝可梦传说 Z-A》将舞台设定在正在推进都市再开发的密阿雷市。白天，训练家可以在街区、屋顶与绿地进行调查；入夜后，城市会换上另一副面孔。",
        "开发团队介绍，夜间出现的宝可梦与白天存在明显差异，部分宝可梦会借助灯光与阴影展开独特的行动。玩家需要观察环境，再利用新的即时战斗机制寻找机会。",
        "此外，本作进一步扩展了超级进化的表现。与伙伴的羁绊越深，超级进化时展现出的动作与光影也会越丰富。更多情报将在下一次官方直播中公开。"
      ],
      tags: ["宝可梦传说 Z-A", "密阿雷市", "超级进化"]
    },
    {
      id: "horizons-new-arc",
      category: "动画",
      date: "2026-11-02",
      read: "3 分钟",
      title: "《宝可梦 地平线》新章开启：向着未知的天空出发",
      excerpt: "莉可、罗伊与升龙伏特攻击队将迎来新的目的地。制作团队提前透露了新章的三个关键词。",
      image: "assets/pokemon/906.webp",
      tint: "green",
      author: "动画编辑部",
      body: [
        "在最新播出的特别篇结尾，升龙伏特攻击队收到了来自远方的讯息。新的旅程将围绕「传承」「选择」与「天空」展开。",
        "莉可与新叶喵的羁绊会面对新的考验，而罗伊也在思考自己真正想成为怎样的训练家。制作团队表示，新章会继续追问「宝可梦与人类如何一起生活」这一母题。",
        "新章首播时间与主题曲信息将在官方频道公布，中文配音版也将同步跟进。"
      ],
      tags: ["宝可梦 地平线", "莉可", "罗伊"]
    },
    {
      id: "winter-plush",
      category: "商品",
      date: "2026-10-30",
      read: "2 分钟",
      title: "冬日毛绒系列登场：把温暖抱个满怀",
      excerpt: "围着围巾的皮卡丘、戴着毛线帽的伊布，还有可以当作靠垫的卡比兽，一起加入冬季限定系列。",
      image: "assets/pokemon/133.webp",
      tint: "orange",
      author: "商品情报组",
      body: [
        "宝可梦中心推出冬季限定毛绒系列，以「一起过冬」为主题，为皮卡丘、伊布、卡比兽等伙伴换上冬日装扮。",
        "系列采用短绒与仿羊羔绒拼接材质，部分款式内置可取出暖手袋。大尺寸卡比兽靠垫则使用高回弹填充，适合放在沙发或阅读角。",
        "冬季毛绒系列将在宝可梦中心门店与官方商城同步发售，数量有限，售完即止。"
      ],
      tags: ["毛绒玩偶", "冬季限定", "宝可梦中心"]
    },
    {
      id: "tcg-pocket-expansion",
      category: "卡牌",
      date: "2026-10-26",
      read: "4 分钟",
      title: "《Pokémon TCG Pocket》全新扩充包今日上线",
      excerpt: "以「羁绊的共鸣」为主题的新扩充包带来 120 张新卡，以及全新的收藏册与得卡挑战。",
      image: "assets/pokemon/151.webp",
      tint: "pink",
      author: "卡牌编辑部",
      body: [
        "《Pokémon TCG Pocket》全新主题扩充包「羁绊的共鸣」正式上线。本次扩充包收录 120 张卡牌，包含 8 张沉浸式卡面与 12 张特别插画卡。",
        "同步推出的还有「双人得卡挑战」：玩家可以与好友组队，在限定时间内共同完成收藏目标。收藏册新增动态展示页，支持将喜欢的卡牌组合成专属展柜。",
        "上线首周登录即可获得免费补充包与限定卡套，活动详情请以游戏内公告为准。"
      ],
      tags: ["TCG Pocket", "扩充包", "收藏"]
    },
    {
      id: "pokemon-day-2027",
      category: "活动",
      date: "2026-10-21",
      read: "3 分钟",
      title: "宝可梦日 2027 主题公开：与伙伴一起，去更远的地方",
      excerpt: "一年一度的宝可梦日将再次连接全球训练家。今年的主题插画与线下活动城市同步揭晓。",
      image: "assets/pokemon/384.webp",
      tint: "teal",
      author: "活动情报组",
      body: [
        "每年 2 月 27 日的宝可梦日，是全球训练家共同庆祝的日子。2027 年的主题定为「与伙伴一起，去更远的地方」。",
        "官方将陆续公开主题插画、纪念动画与线下活动城市。各地宝可梦中心也会推出限定周边与集章活动。",
        "更多活动信息将在官网与官方社交账号更新。"
      ],
      tags: ["宝可梦日", "2027", "活动"]
    },
    {
      id: "unite-meta",
      category: "游戏",
      date: "2026-10-18",
      read: "5 分钟",
      title: "《Pokémon UNITE》赛季环境观察：节奏正在变快",
      excerpt: "新赛季对野区资源与集结招式做出调整，快节奏阵容重新回到舞台中央。",
      image: "assets/pokemon/658.webp",
      tint: "indigo",
      author: "对战研究室",
      body: [
        "新赛季更新后，前期野区资源的收益提高，比赛的平均结束时间比上赛季缩短约 40 秒。",
        "以高机动性宝可梦为核心的快攻阵容重新流行，围绕第一只闪电鸟的团战成为胜负关键。",
        "本期我们邀请三位高段位玩家，分享他们对新环境的理解与上分建议。"
      ],
      tags: ["Pokémon UNITE", "赛季", "对战"]
    },
    {
      id: "sylveon-collection",
      category: "商品",
      date: "2026-10-12",
      read: "2 分钟",
      title: "仙子伊布主题收藏系列：柔软的粉色风暴",
      excerpt: "从卡套、收纳盒到居家服，仙子伊布主题系列用低饱和粉色讲述温柔的力量。",
      image: "assets/pokemon/700.webp",
      tint: "pink",
      author: "商品情报组",
      body: [
        "仙子伊布主题收藏系列以「温柔的守护」为设计概念，采用低饱和粉与奶油白配色。",
        "系列包含卡套、卡牌收纳盒、居家服、保温杯与亚克力立牌。卡套采用双层磨砂材质，兼顾收藏与对局手感。",
        "该系列将在官方商城开放预售，预计 12 月起陆续发货。"
      ],
      tags: ["仙子伊布", "收藏", "周边"]
    },
    {
      id: "pokedex-app-update",
      category: "应用",
      date: "2026-10-08",
      read: "3 分钟",
      title: "宝可梦图鉴更新：支持属性组合筛选与离线收藏",
      excerpt: "新版图鉴加入属性组合筛选、地区形态索引与离线收藏夹，让查询更顺手。",
      image: "assets/pokemon/282.webp",
      tint: "violet",
      author: "产品团队",
      body: [
        "本次更新为图鉴加入属性组合筛选，用户可以同时选择两种属性，快速定位目标宝可梦。",
        "收藏夹支持离线查看，即使在没有网络的环境中，也能查看已收藏宝可梦的基础资料。",
        "此外，地区形态与超级进化形态的索引也得到完善。"
      ],
      tags: ["图鉴", "更新", "应用"]
    },
    {
      id: "movie-retrospective",
      category: "动画",
      date: "2026-10-03",
      read: "7 分钟",
      title: "从「就决定是你了」到「可可」：剧场版里的告别与重逢",
      excerpt: "二十余部剧场版，记录了宝可梦动画对「相遇」与「告别」最温柔的想象。",
      image: "assets/pokemon/151.webp",
      tint: "sky",
      author: "动画编辑部",
      body: [
        "宝可梦剧场版一直擅长把宏大的冒险落在很小的情感上：一次告别、一个约定、一段无法重来的夏天。",
        "从《超梦的逆袭》对复制与存在的追问，到《就决定是你了！》对初心的回望，再到《皮卡丘和可可的冒险》对亲子关系的重新书写，系列始终在变化中保留柔软。",
        "本文按时间顺序梳理剧场版的关键节点，也邀请读者分享自己最难忘的那一部。"
      ],
      tags: ["剧场版", "回顾", "影评"]
    },
    {
      id: "card-art-contest",
      category: "卡牌",
      date: "2026-09-28",
      read: "3 分钟",
      title: "宝可梦卡牌插画大赛公布 30 幅入围作品",
      excerpt: "从城市日常到宇宙尽头，训练家们用画笔描绘了与宝可梦共同生活的想象。",
      image: "assets/pokemon/778.webp",
      tint: "amber",
      author: "卡牌编辑部",
      body: [
        "本届宝可梦卡牌插画大赛以「和宝可梦一起生活」为题，共收到来自 18 个国家和地区的 4,200 余幅投稿。",
        "评审团从叙事、构图、色彩与宝可梦特征四个维度选出 30 幅入围作品。最终获奖作品将有机会被制作成纪念卡牌。",
        "入围作品展将在东京、上海与台北巡回展出。"
      ],
      tags: ["插画大赛", "卡牌", "艺术"]
    },
    {
      id: "sleep-anniversary",
      category: "应用",
      date: "2026-09-22",
      read: "2 分钟",
      title: "《Pokémon Sleep》三周年：和卡比兽一起睡个好觉",
      excerpt: "三周年活动带来新的睡眠研究任务、限定睡姿与卡比兽主题营地装饰。",
      image: "assets/pokemon/143.webp",
      tint: "navy",
      author: "应用情报组",
      body: [
        "《Pokémon Sleep》迎来三周年。过去三年，玩家累计记录了超过 30 亿小时的睡眠。",
        "周年活动期间，卡比兽将换上特别装饰，新的睡眠研究任务与限定睡姿同步开放。",
        "官方同时分享了改善睡眠习惯的小贴士，鼓励玩家把游戏中的节奏带回现实生活。"
      ],
      tags: ["Pokémon Sleep", "三周年", "健康"]
    }
  ];

  const ANIME = {
    current: {
      title: "宝可梦 地平线",
      subtitle: "在新世界，写下属于我们的冒险。",
      arc: "天空继承者篇",
      year: "2023 — 连载中",
      episodes: "第 1—132 话",
      image: "assets/pokemon/906.webp",
      partners: [
        { name: "莉可", partner: "新叶喵", image: "assets/pokemon/906.webp" },
        { name: "罗伊", partner: "呆火鳄", image: "assets/pokemon/909.webp" },
        { name: "点点", partner: "润水鸭", image: "assets/pokemon/912.webp" }
      ],
      description: "少女莉可从祖母那里得到一枚神秘的吊坠，并与来自帕底亚的宝可梦新叶喵相遇。为了解开吊坠的秘密，她加入升龙伏特攻击队，踏上一段跨越天空与海洋的旅程。"
    },
    episodes: [
      { no: "第 130 话", title: "风从六英雄的方向吹来", date: "2026-11-07", duration: "24 分钟", desc: "升龙伏特攻击队抵达新的岛屿，莉可却发现吊坠对这里的磁场产生了异常反应。", image: "assets/pokemon/249.webp" },
      { no: "第 129 话", title: "在灯火熄灭之前", date: "2026-10-31", duration: "24 分钟", desc: "为了守护城镇的灯塔，罗伊与呆火鳄必须在暴风雨中完成一次不可能的合作。", image: "assets/pokemon/909.webp" },
      { no: "第 128 话", title: "两个人的宝可梦观察日记", date: "2026-10-24", duration: "24 分钟", desc: "点点决定拍摄一部关于伙伴们的纪录片，镜头却记录下了意想不到的温柔瞬间。", image: "assets/pokemon/912.webp" },
      { no: "第 127 话", title: "琥珀色的记忆", date: "2026-10-17", duration: "24 分钟", desc: "一枚古老的精灵球，让莉可看见了祖母年轻时的冒险片段。", image: "assets/pokemon/700.webp" },
      { no: "第 126 话", title: "天空没有边界", date: "2026-10-10", duration: "24 分钟", desc: "烈空坐掠过云层，新的目的地在地平线尽头显现。", image: "assets/pokemon/384.webp" },
      { no: "第 125 话", title: "给未来的一封信", date: "2026-10-03", duration: "24 分钟", desc: "伙伴们各自写下想对一年后的自己说的话。", image: "assets/pokemon/133.webp" }
    ],
    series: [
      { title: "宝可梦 旅途", year: "2019—2022", note: "小智与皮卡丘的旅程，连接所有地区。", image: "assets/pokemon/25.webp" },
      { title: "宝可梦 太阳&月亮", year: "2016—2019", note: "阿罗拉群岛的校园生活与岛屿之王。", image: "assets/pokemon/725.webp" },
      { title: "宝可梦 XY&Z", year: "2013—2016", note: "卡洛斯地区，羁绊进化与甲贺忍蛙。", image: "assets/pokemon/658.webp" },
      { title: "宝可梦 超级愿望", year: "2010—2013", note: "合众地区的全新冒险。", image: "assets/pokemon/571.webp" }
    ],
    movies: [
      { title: "宝可梦：皮卡丘和可可的冒险", year: "2020", tag: "森林 / 亲情", image: "assets/pokemon/25.webp", desc: "在奥可雅森林长大的少年可可，遇见了小智与皮卡丘，也开始寻找自己与森林之间的答案。" },
      { title: "超梦的逆袭 EVOLUTION", year: "2019", tag: "3D / 存在", image: "assets/pokemon/150.webp", desc: "以全新 3D 影像重制经典，再次追问复制与存在的意义。" },
      { title: "宝可梦：我们的故事", year: "2018", tag: "群像 / 风来城", image: "assets/pokemon/133.webp", desc: "五段看似无关的相遇，在风来城的节日里汇聚成同一个奇迹。" },
      { title: "宝可梦：就决定是你了！", year: "2017", tag: "初心 / 告别", image: "assets/pokemon/151.webp", desc: "回到一切开始的地方，重述小智与皮卡丘最初的相遇。" },
      { title: "宝可梦：破坏之茧与蒂安希", year: "2014", tag: "钻石 / 王国", image: "assets/pokemon/716.webp", desc: "钻石矿国的公主蒂安希，踏上寻找生命宝可梦哲尔尼亚斯的旅程。" },
      { title: "宝可梦：结晶塔的帝王", year: "2000", tag: "传说 / 成长", image: "assets/pokemon/249.webp", desc: "少女蜜莉的愿望唤醒了未知图腾，结晶塔在绿色原野上拔地而起。" }
    ]
  };

  const PRODUCTS = [
    {
      "id": "pikachu-plush",
      "name": "皮卡丘 25 周年纪念毛绒",
      "category": "毛绒玩偶",
      "channel": "goods",
      "price": 299,
      "oldPrice": 359,
      "image": "assets/pokemon/25.webp",
      "tint": "yellow",
      "rating": 4.9,
      "sold": 12800,
      "stock": 86,
      "tag": "人气",
      "styles": [
        "标准款",
        "25 周年礼盒",
        "XL 抱枕款"
      ],
      "desc": "柔软短绒与刺绣电气囊，附赠 25 周年纪念吊牌。高约 30cm。"
    },
    {
      "id": "eevee-plush",
      "name": "伊布睡姿毛绒抱枕",
      "category": "毛绒玩偶",
      "channel": "goods",
      "price": 259,
      "image": "assets/pokemon/133.webp",
      "tint": "orange",
      "rating": 4.8,
      "sold": 9600,
      "stock": 124,
      "tag": "新品",
      "styles": [
        "标准款",
        "加大抱枕款"
      ],
      "desc": "蜷成一团的伊布造型，适合作为午睡抱枕。可拆洗外套，高约 28cm。"
    },
    {
      "id": "gengar-lamp",
      "name": "耿鬼夜光氛围摆件",
      "category": "居家收藏",
      "channel": "goods",
      "price": 189,
      "image": "assets/pokemon/94.webp",
      "tint": "violet",
      "rating": 4.7,
      "sold": 5200,
      "stock": 34,
      "tag": "限定",
      "styles": [
        "标准紫光",
        "异色蓝光"
      ],
      "desc": "白天是耿鬼手办，夜晚亮起柔和紫光。USB-C 充电，三档亮度。"
    },
    {
      "id": "rayquaza-model",
      "name": "烈空坐 1/20 收藏模型",
      "category": "模型手办",
      "channel": "goods",
      "price": 599,
      "image": "assets/pokemon/384.webp",
      "tint": "teal",
      "rating": 4.9,
      "sold": 2100,
      "stock": 18,
      "tag": "收藏级",
      "styles": [
        "普通版",
        "透明底座限定版"
      ],
      "desc": "以云层穿越瞬间为造型的高精度模型，附专属透明底座与编号卡。"
    },
    {
      "id": "tcg-booster",
      "name": "宝可梦卡牌 朱&紫 补充包",
      "category": "卡牌周边",
      "channel": "goods",
      "price": 30,
      "image": "assets/pokemon/6.webp",
      "tint": "red",
      "rating": 4.9,
      "sold": 86400,
      "stock": 999,
      "tag": "热卖",
      "styles": [
        "单包",
        "10 包优惠装"
      ],
      "desc": "每包 5 张卡牌，随机封入闪卡。购买 10 包附赠限定卡套一包。"
    },
    {
      "id": "sylveon-sleeves",
      "name": "仙子伊布卡套 60 张装",
      "category": "卡牌周边",
      "channel": "goods",
      "price": 89,
      "image": "assets/pokemon/700.webp",
      "tint": "pink",
      "rating": 4.8,
      "sold": 15400,
      "stock": 208,
      "tag": "",
      "styles": [
        "磨砂款",
        "亮面款"
      ],
      "desc": "磨砂双层材质，适合比赛使用。60 张入，附收藏收纳盒。"
    },
    {
      "id": "pikachu-hoodie",
      "name": "皮卡丘刺绣连帽卫衣",
      "category": "服饰穿搭",
      "channel": "goods",
      "price": 399,
      "image": "assets/pokemon/25.webp",
      "tint": "yellow",
      "rating": 4.6,
      "sold": 6800,
      "stock": 56,
      "tag": "新品",
      "styles": [
        "奶油白",
        "电光黄",
        "深藏青"
      ],
      "desc": "350g 加厚棉质面料，胸前皮卡丘刺绣，宽松版型，四色可选。"
    },
    {
      "id": "trainer-bag",
      "name": "训练家机能双肩包",
      "category": "服饰穿搭",
      "channel": "goods",
      "price": 459,
      "image": "assets/pokemon/448.webp",
      "tint": "blue",
      "rating": 4.7,
      "sold": 4300,
      "stock": 42,
      "tag": "",
      "styles": [
        "蓝色标准款",
        "黑色对战款"
      ],
      "desc": "可容纳 16 英寸笔记本，内置卡牌收纳层与精灵球挂扣。"
    },
    {
      "id": "starter-stand",
      "name": "帕底亚御三家亚克力立牌",
      "category": "居家收藏",
      "channel": "goods",
      "price": 69,
      "image": "assets/pokemon/906.webp",
      "tint": "green",
      "rating": 4.8,
      "sold": 22100,
      "stock": 312,
      "tag": "三件套",
      "styles": [
        "三件套",
        "新叶喵单款",
        "呆火鳄单款",
        "润水鸭单款"
      ],
      "desc": "新叶喵、呆火鳄、润水鸭三件套，双面印刷，附防滑底座。"
    },
    {
      "id": "miraidon-deskmat",
      "name": "密勒顿主题桌垫",
      "category": "居家收藏",
      "channel": "goods",
      "price": 129,
      "image": "assets/pokemon/1008.webp",
      "tint": "indigo",
      "rating": 4.8,
      "sold": 7300,
      "stock": 95,
      "tag": "",
      "styles": [
        "900×400mm",
        "600×300mm"
      ],
      "desc": "900×400mm 细面桌垫，锁边工艺，适合游戏与办公桌面。"
    },
    {
      "id": "pokedex-notebook",
      "name": "宝可梦图鉴硬壳笔记本",
      "category": "文具杂货",
      "channel": "goods",
      "price": 59,
      "image": "assets/pokemon/282.webp",
      "tint": "cream",
      "rating": 4.7,
      "sold": 18100,
      "stock": 420,
      "tag": "",
      "styles": [
        "图鉴红",
        "精灵球黑",
        "奶油白"
      ],
      "desc": "192 页米白道林纸，封面压印图鉴编号，附属性标签贴纸。"
    },
    {
      "id": "snorlax-cushion",
      "name": "卡比兽午睡靠垫",
      "category": "毛绒玩偶",
      "channel": "goods",
      "price": 329,
      "image": "assets/pokemon/143.webp",
      "tint": "navy",
      "rating": 4.9,
      "sold": 8700,
      "stock": 63,
      "tag": "补货",
      "styles": [
        "标准款",
        "可拆洗款"
      ],
      "desc": "高回弹填充，适合沙发与阅读角。可拆洗，尺寸 55×40cm。"
    },
    {
      "id": "charizard-figure",
      "name": "超级喷火龙 X 收藏雕像",
      "category": "模型手办",
      "channel": "goods",
      "price": 699,
      "image": "assets/pokemon/6.webp",
      "tint": "red",
      "rating": 4.9,
      "sold": 1600,
      "stock": 24,
      "tag": "限定",
      "styles": [
        "标准涂装",
        "夜光限定涂装"
      ],
      "desc": "以超级进化的爆发瞬间为造型，高约 26cm，附编号收藏证书。"
    },
    {
      "id": "lucario-plush",
      "name": "路卡利欧训练家毛绒",
      "category": "毛绒玩偶",
      "channel": "goods",
      "price": 279,
      "image": "assets/pokemon/448.webp",
      "tint": "blue",
      "rating": 4.8,
      "sold": 4200,
      "stock": 71,
      "tag": "新品",
      "styles": [
        "标准款",
        "战斗姿态款"
      ],
      "desc": "站立姿态约 32cm，使用细腻短绒与刺绣波导纹样。"
    },
    {
      "id": "gardevoir-figure",
      "name": "沙奈朵优雅系列手办",
      "category": "模型手办",
      "channel": "goods",
      "price": 459,
      "image": "assets/pokemon/282.webp",
      "tint": "pink",
      "rating": 4.9,
      "sold": 2800,
      "stock": 36,
      "tag": "收藏级",
      "styles": [
        "标准色",
        "珠光限定色"
      ],
      "desc": "裙摆采用半透明渐变材质，附专属展示台，高约 24cm。"
    },
    {
      "id": "pikachu-mug",
      "name": "皮卡丘陶瓷马克杯",
      "category": "居家收藏",
      "channel": "goods",
      "price": 129,
      "image": "assets/pokemon/25.webp",
      "tint": "yellow",
      "rating": 4.7,
      "sold": 9300,
      "stock": 148,
      "tag": "",
      "styles": [
        "经典黄",
        "笑脸白",
        "电气囊款"
      ],
      "desc": "350ml 陶瓷杯，杯柄为闪电造型，可微波加热。"
    },
    {
      "id": "eevee-tote",
      "name": "伊布帆布托特包",
      "category": "服饰穿搭",
      "channel": "goods",
      "price": 159,
      "image": "assets/pokemon/133.webp",
      "tint": "orange",
      "rating": 4.6,
      "sold": 7600,
      "stock": 190,
      "tag": "",
      "styles": [
        "米白帆布",
        "焦糖棕",
        "进化家族印花"
      ],
      "desc": "12 盎司加厚帆布，内置小口袋，可容纳 A4 文件与平板。"
    },
    {
      "id": "dragapult-model",
      "name": "多龙巴鲁托飞行姿态模型",
      "category": "模型手办",
      "channel": "goods",
      "price": 389,
      "image": "assets/pokemon/887.webp",
      "tint": "violet",
      "rating": 4.8,
      "sold": 1900,
      "stock": 31,
      "tag": "限定",
      "styles": [
        "普通版",
        "透明支架版"
      ],
      "desc": "以高速飞行瞬间为造型，附透明支架，可呈现悬浮效果。"
    },
    {
      "id": "tinkaton-keychain",
      "name": "巨锻匠金属钥匙扣",
      "category": "文具杂货",
      "channel": "goods",
      "price": 49,
      "image": "assets/pokemon/959.webp",
      "tint": "pink",
      "rating": 4.7,
      "sold": 16800,
      "stock": 520,
      "tag": "",
      "styles": [
        "银色",
        "玫瑰金",
        "锤子挂饰款"
      ],
      "desc": "锌合金压铸，附可拆卸锤子挂饰，尺寸约 5cm。"
    },
    {
      "id": "zacian-pin",
      "name": "苍响珐琅徽章套装",
      "category": "收藏配件",
      "channel": "goods",
      "price": 99,
      "image": "assets/pokemon/888.webp",
      "tint": "blue",
      "rating": 4.8,
      "sold": 6100,
      "stock": 230,
      "tag": "三件套",
      "styles": [
        "三件套",
        "剑盾双人组"
      ],
      "desc": "三枚硬珐琅徽章，附绒布收藏袋与编号卡。"
    },
    {
      "id": "mimikyu-lamp",
      "name": "谜拟丘小夜灯",
      "category": "居家收藏",
      "channel": "goods",
      "price": 169,
      "image": "assets/pokemon/778.webp",
      "tint": "violet",
      "rating": 4.6,
      "sold": 4800,
      "stock": 58,
      "tag": "",
      "styles": [
        "暖光款",
        "呼吸灯款"
      ],
      "desc": "布偶造型小夜灯，轻拍切换亮度，适合床头与书桌。"
    },
    {
      "id": "lugia-windchime",
      "name": "洛奇亚风铃挂饰",
      "category": "居家收藏",
      "channel": "goods",
      "price": 139,
      "image": "assets/pokemon/249.webp",
      "tint": "teal",
      "rating": 4.7,
      "sold": 3200,
      "stock": 84,
      "tag": "",
      "styles": [
        "银蓝款",
        "海风限定色"
      ],
      "desc": "金属风铃与亚克力羽翼组合，附挂绳，适合窗边与阳台。"
    },
    {
      "id": "ceruledge-figure",
      "name": "苍炎刃鬼桌面摆件",
      "category": "居家收藏",
      "channel": "goods",
      "price": 229,
      "image": "assets/pokemon/937.webp",
      "tint": "red",
      "rating": 4.8,
      "sold": 3900,
      "stock": 47,
      "tag": "新品",
      "styles": [
        "标准款",
        "火焰发光款"
      ],
      "desc": "双剑姿态桌面摆件，剑身使用半透明火焰材质，高约 18cm。"
    },
    {
      "id": "mew-plush",
      "name": "梦幻漂浮毛绒",
      "category": "毛绒玩偶",
      "channel": "goods",
      "price": 319,
      "image": "assets/pokemon/151.webp",
      "tint": "pink",
      "rating": 4.9,
      "sold": 5400,
      "stock": 69,
      "tag": "人气",
      "styles": [
        "标准款",
        "漂浮尾巴款",
        "礼盒装"
      ],
      "desc": "轻盈长绒与卷曲尾巴，附可拆卸透明挂环，高约 26cm。"
    },
    {
      "id": "card-m1a-box",
      "name": "超级进化—勇敢 补充包 30 包盒",
      "category": "卡牌礼盒",
      "channel": "card",
      "price": 450,
      "image": "assets/pokemon/888.webp",
      "tint": "blue",
      "rating": 4.9,
      "sold": 28600,
      "stock": 96,
      "tag": "热销",
      "styles": [
        "原封原盒",
        "拆盒保真"
      ],
      "desc": "M1a 扩充包 30 包入。每包 5 张，整盒购买更容易收集超级进化主题卡。"
    },
    {
      "id": "card-m1b-box",
      "name": "超级进化—交响 补充包 30 包盒",
      "category": "卡牌礼盒",
      "channel": "card",
      "price": 450,
      "image": "assets/pokemon/700.webp",
      "tint": "pink",
      "rating": 4.9,
      "sold": 26200,
      "stock": 110,
      "tag": "热销",
      "styles": [
        "原封原盒",
        "拆盒保真"
      ],
      "desc": "M1b 扩充包 30 包入。妖精与超级进化主题，附限定收藏卡册兑换券。"
    },
    {
      "id": "card-sv10-box",
      "name": "朱&紫—黯焰支配者 补充包盒",
      "category": "卡牌礼盒",
      "channel": "card",
      "price": 180,
      "image": "assets/pokemon/937.webp",
      "tint": "orange",
      "rating": 4.8,
      "sold": 19800,
      "stock": 143,
      "tag": "",
      "styles": [
        "30 包盒",
        "10 包体验装"
      ],
      "desc": "以恶属性与火焰为主题，收录多张高稀有度插画卡。"
    },
    {
      "id": "card-sv9a-box",
      "name": "朱&紫—热风竞技场 补充包盒",
      "category": "卡牌礼盒",
      "channel": "card",
      "price": 180,
      "image": "assets/pokemon/448.webp",
      "tint": "red",
      "rating": 4.8,
      "sold": 14600,
      "stock": 168,
      "tag": "",
      "styles": [
        "30 包盒",
        "10 包体验装"
      ],
      "desc": "围绕对战与竞技场构筑，适合新牌手快速补充核心卡池。"
    },
    {
      "id": "card-charizard-set",
      "name": "超级喷火龙 X 收藏礼盒",
      "category": "卡牌礼盒",
      "channel": "card",
      "price": 299,
      "image": "assets/pokemon/6.webp",
      "tint": "red",
      "rating": 4.9,
      "sold": 12400,
      "stock": 52,
      "tag": "限定",
      "styles": [
        "标准礼盒",
        "亚克力立牌版"
      ],
      "desc": "含 8 包补充包、1 张 promo 卡、卡套与亚克力展示牌。"
    },
    {
      "id": "card-pikachu-deck",
      "name": "皮卡丘 ex 特别卡组",
      "category": "卡组套牌",
      "channel": "card",
      "price": 168,
      "image": "assets/pokemon/25.webp",
      "tint": "yellow",
      "rating": 4.9,
      "sold": 31800,
      "stock": 205,
      "tag": "新手推荐",
      "styles": [
        "标准卡组",
        "附卡套套装"
      ],
      "desc": "60 张预组卡组，含伤害指示物、状态标记与快速上手指南。"
    },
    {
      "id": "card-mew-set",
      "name": "梦幻 ex 151 收藏套装",
      "category": "卡牌礼盒",
      "channel": "card",
      "price": 329,
      "image": "assets/pokemon/151.webp",
      "tint": "pink",
      "rating": 4.9,
      "sold": 16400,
      "stock": 42,
      "tag": "收藏级",
      "styles": [
        "标准套装",
        "编号收藏版"
      ],
      "desc": "含 151 主题卡册、10 包补充包与梦幻 ex 特典卡。"
    },
    {
      "id": "card-rayquaza-tin",
      "name": "烈空坐 大师球收藏铁盒",
      "category": "卡牌礼盒",
      "channel": "card",
      "price": 399,
      "image": "assets/pokemon/384.webp",
      "tint": "teal",
      "rating": 4.8,
      "sold": 8600,
      "stock": 27,
      "tag": "限定",
      "styles": [
        "大师球铁盒",
        "普通收藏盒"
      ],
      "desc": "金属收藏铁盒内含 12 包补充包、骰子与限定卡套。"
    },
    {
      "id": "card-sylveon-sleeves",
      "name": "仙子伊布 卡套 60 张",
      "category": "卡牌周边",
      "channel": "card",
      "price": 89,
      "image": "assets/pokemon/700.webp",
      "tint": "pink",
      "rating": 4.8,
      "sold": 15600,
      "stock": 208,
      "tag": "",
      "styles": [
        "磨砂款",
        "亮面款"
      ],
      "desc": "官方插画卡套，60 张装，适合标准赛事使用。"
    },
    {
      "id": "card-gengar-box",
      "name": "耿鬼 卡牌收纳盒",
      "category": "卡牌周边",
      "channel": "card",
      "price": 129,
      "image": "assets/pokemon/94.webp",
      "tint": "violet",
      "rating": 4.7,
      "sold": 9700,
      "stock": 134,
      "tag": "",
      "styles": [
        "紫色款",
        "夜光款"
      ],
      "desc": "可收纳 120 张卡套牌，内置分区与骰子格。"
    },
    {
      "id": "card-lucario-playmat",
      "name": "路卡利欧 对战桌垫",
      "category": "卡牌周边",
      "channel": "card",
      "price": 149,
      "image": "assets/pokemon/448.webp",
      "tint": "blue",
      "rating": 4.8,
      "sold": 6800,
      "stock": 91,
      "tag": "",
      "styles": [
        "标准桌垫",
        "加长赛事款"
      ],
      "desc": "细面防滑桌垫，印刷奖赏卡与弃牌区标记。"
    },
    {
      "id": "card-miraidon-sleeves",
      "name": "密勒顿 卡牌保护套",
      "category": "卡牌周边",
      "channel": "card",
      "price": 79,
      "image": "assets/pokemon/1008.webp",
      "tint": "indigo",
      "rating": 4.7,
      "sold": 11200,
      "stock": 176,
      "tag": "",
      "styles": [
        "未来蓝",
        "银灰限定"
      ],
      "desc": "65 张装，附 5 张备用卡套，适合双层保护。"
    },
    {
      "id": "card-starter-binder",
      "name": "帕底亚御三家 九格卡册",
      "category": "卡牌周边",
      "channel": "card",
      "price": 119,
      "image": "assets/pokemon/906.webp",
      "tint": "green",
      "rating": 4.8,
      "sold": 8900,
      "stock": 120,
      "tag": "新品",
      "styles": [
        "新叶喵封面",
        "呆火鳄封面",
        "润水鸭封面"
      ],
      "desc": "360 卡位九格卡册，侧插式内页，附 20 张加厚保护页。"
    },
    {
      "id": "card-zacian-brick",
      "name": "苍响 收藏卡砖",
      "category": "卡牌周边",
      "channel": "card",
      "price": 199,
      "image": "assets/pokemon/888.webp",
      "tint": "blue",
      "rating": 4.9,
      "sold": 4300,
      "stock": 38,
      "tag": "收藏级",
      "styles": [
        "35pt 标准",
        "55pt 加厚"
      ],
      "desc": "UV 防护亚克力卡砖，附磁吸展示底座与防尘袋。"
    },
    {
      "id": "card-tinkaton-deckbox",
      "name": "巨锻匠 金属卡组盒",
      "category": "卡牌周边",
      "channel": "card",
      "price": 159,
      "image": "assets/pokemon/959.webp",
      "tint": "pink",
      "rating": 4.7,
      "sold": 5200,
      "stock": 64,
      "tag": "",
      "styles": [
        "标准金属盒",
        "锤子挂饰版"
      ],
      "desc": "可容纳 100 张卡套牌，附骰子收纳层与锤子造型挂饰。"
    },
    {
      "id": "card-dragapult-deckbox",
      "name": "多龙巴鲁托 卡组盒",
      "category": "卡牌周边",
      "channel": "card",
      "price": 139,
      "image": "assets/pokemon/887.webp",
      "tint": "violet",
      "rating": 4.8,
      "sold": 6100,
      "stock": 73,
      "tag": "",
      "styles": [
        "紫色款",
        "透明限定款"
      ],
      "desc": "磁吸翻盖卡组盒，内置分隔板，可放 100 张卡套牌。"
    },
    {
      "id": "card-lugia-album",
      "name": "洛奇亚 艺术卡册",
      "category": "卡牌周边",
      "channel": "card",
      "price": 189,
      "image": "assets/pokemon/249.webp",
      "tint": "teal",
      "rating": 4.8,
      "sold": 4700,
      "stock": 55,
      "tag": "限定",
      "styles": [
        "标准版",
        "编号收藏版"
      ],
      "desc": "布面精装卡册，240 卡位，附洛奇亚烫银书签。"
    },
    {
      "id": "card-gardevoir-playmat",
      "name": "沙奈朵 优雅对战桌垫",
      "category": "卡牌周边",
      "channel": "card",
      "price": 149,
      "image": "assets/pokemon/282.webp",
      "tint": "pink",
      "rating": 4.8,
      "sold": 7200,
      "stock": 88,
      "tag": "",
      "styles": [
        "粉色标准款",
        "蓝紫限定款"
      ],
      "desc": "超细纤维布面，橡胶防滑底，尺寸 600×350mm。"
    },
    {
      "id": "card-snorlax-bag",
      "name": "卡比兽 卡牌收纳包",
      "category": "卡牌周边",
      "channel": "card",
      "price": 169,
      "image": "assets/pokemon/143.webp",
      "tint": "navy",
      "rating": 4.7,
      "sold": 3900,
      "stock": 46,
      "tag": "",
      "styles": [
        "大容量款",
        "随身小包款"
      ],
      "desc": "可放卡组盒、骰子、指示物与备用卡套，附肩带。"
    },
    {
      "id": "card-starter-deck",
      "name": "新手训练家 起始卡组",
      "category": "卡组套牌",
      "channel": "card",
      "price": 99,
      "image": "assets/pokemon/133.webp",
      "tint": "orange",
      "rating": 4.8,
      "sold": 22400,
      "stock": 320,
      "tag": "新手推荐",
      "styles": [
        "伊布版",
        "皮卡丘版",
        "御三家版"
      ],
      "desc": "即开即玩的 60 张预组卡组，附规则手册与对战垫。"
    }
  ];

  const APPS = [
    { id: "go", name: "Pokémon GO", category: "探索冒险", rating: 4.7, downloads: "10 亿+", platforms: ["iOS", "Android"], image: "assets/pokemon/25.webp", color: "#4caf8a", desc: "走出家门，在现实世界中捕捉、对战与交换宝可梦。参加团体战、调查任务与社区日，让每一次散步都成为冒险。" },
    { id: "tcgp", name: "Pokémon TCG Pocket", category: "卡牌收藏", rating: 4.8, downloads: "1 亿+", platforms: ["iOS", "Android"], image: "assets/pokemon/151.webp", color: "#d95b8a", desc: "每天打开两包卡，收集沉浸式卡面与经典插画。轻松上手，和朋友交换卡牌、完成主题收藏。" },
    { id: "sleep", name: "Pokémon Sleep", category: "健康睡眠", rating: 4.6, downloads: "5,000 万+", platforms: ["iOS", "Android"], image: "assets/pokemon/143.webp", color: "#5b6fb5", desc: "把睡眠变成研究。记录每晚睡眠，发现不同睡姿的宝可梦，和卡比兽一起养成更规律的作息。" },
    { id: "home", name: "Pokémon HOME", category: "云端管理", rating: 4.5, downloads: "3,000 万+", platforms: ["iOS", "Android", "Switch"], image: "assets/pokemon/493.webp", color: "#78849e", desc: "把不同作品中的宝可梦带到同一个地方。云端整理、交换与完成全国图鉴，让旅程持续连接。" },
    { id: "unite", name: "Pokémon UNITE", category: "团队对战", rating: 4.4, downloads: "1 亿+", platforms: ["iOS", "Android", "Switch"], image: "assets/pokemon/658.webp", color: "#3a7bd5", desc: "5 对 5 团队策略对战。与伙伴争夺得分点，在最后两分钟逆转局势。每场约 10 分钟。" },
    { id: "masters", name: "Pokémon Masters EX", category: "训练家冒险", rating: 4.6, downloads: "5,000 万+", platforms: ["iOS", "Android"], image: "assets/pokemon/282.webp", color: "#8b6cc9", desc: "与历代训练家和搭档宝可梦组队，在帕希欧岛展开 3 对 3 对战。收集拍组，打造专属队伍。" }
  ];

  const GAMES = [
    { id: "za", name: "宝可梦传说 Z-A", year: "2025", platform: "Nintendo Switch / Switch 2", genre: "动作 RPG", image: "assets/pokemon/448.webp", tint: "blue", featured: true, desc: "故事舞台为正在进行都市再开发的密阿雷市。白天调查生态，夜晚迎战异常宝可梦，体验全新的即时战斗与超级进化。" },
    { id: "sv", name: "宝可梦 朱／紫", year: "2022", platform: "Nintendo Switch", genre: "开放世界 RPG", image: "assets/pokemon/1008.webp", tint: "violet", desc: "在帕底亚地区自由冒险，三条主线交汇于第零区。与密勒顿／故勒顿一起探索广阔世界。" },
    { id: "arceus", name: "宝可梦传说 阿尔宙斯", year: "2022", platform: "Nintendo Switch", genre: "动作 RPG", image: "assets/pokemon/493.webp", tint: "cream", desc: "回到洗翠地区，调查宝可梦生态并完成最初的图鉴。投掷精灵球与即时战斗带来全新体验。" },
    { id: "swsh", name: "宝可梦 剑／盾", year: "2019", platform: "Nintendo Switch", genre: "RPG", image: "assets/pokemon/888.webp", tint: "pink", desc: "在伽勒尔地区挑战道馆与冠军杯，极巨化让对局充满变数。" },
    { id: "bdsp", name: "宝可梦 晶灿钻石／明亮珍珠", year: "2021", platform: "Nintendo Switch", genre: "RPG", image: "assets/pokemon/445.webp", tint: "teal", desc: "以现代画面重现神奥地区的经典冒险，地下大洞窟与宝可梦跟随系统回归。" },
    { id: "letsgo", name: "宝可梦 Let's Go! 皮卡丘／伊布", year: "2018", platform: "Nintendo Switch", genre: "RPG", image: "assets/pokemon/133.webp", tint: "orange", desc: "关都地区的全新入门冒险，投掷精灵球捕捉宝可梦，与搭档一起成长。" }
  ];

  const CARD_FEATURES = [
    { title: "收藏", en: "COLLECT", desc: "从经典插画到沉浸式卡面，每一张卡都是一段被装进口袋的世界。", icon: "sparkles" },
    { title: "对战", en: "BATTLE", desc: "构建 60 张卡组，围绕奖赏卡与能量节奏展开策略博弈。", icon: "swords" },
    { title: "交流", en: "CONNECT", desc: "在道馆、赛场与线上社区遇见同好，用卡牌交换故事。", icon: "users" }
  ];

  const CARD_SETS = [
    { name: "超级进化—勇敢", code: "M1a", date: "2026-09", cards: 92, theme: "超级进化 / 钢", image: "assets/pokemon/888.webp", tint: "blue" },
    { name: "超级进化—交响", code: "M1b", date: "2026-09", cards: 94, theme: "超级进化 / 妖精", image: "assets/pokemon/700.webp", tint: "pink" },
    { name: "朱&紫—黯焰支配者", code: "SV10", date: "2026-06", cards: 108, theme: "恶 / 火", image: "assets/pokemon/937.webp", tint: "orange" },
    { name: "朱&紫—热风竞技场", code: "SV9a", date: "2026-03", cards: 98, theme: "战斗 / 竞技", image: "assets/pokemon/448.webp", tint: "red" }
  ];

  const SHOWCASE_CARDS = [
    { name: "超级喷火龙 X", hp: "330", type: "fire", image: "assets/pokemon/6.webp", rarity: "SAR", attack: "苍炎爆裂", damage: "330", set: "超级进化—勇敢" },
    { name: "皮卡丘 ex", hp: "200", type: "electric", image: "assets/pokemon/25.webp", rarity: "SAR", attack: "十万伏特", damage: "180", set: "朱&紫—明亮珍珠" },
    { name: "梦幻 ex", hp: "180", type: "psychic", image: "assets/pokemon/151.webp", rarity: "SAR", attack: "精神强念", damage: "160", set: "朱&紫—151" }
  ];

  const FINANCE = {
    years: [
      { year: "FY2022", revenue: 2042.09, operating: 598.60, ordinary: 622.41, net: 413.92, equity: 1212.34, liabilities: 573.22, assets: 1785.56 },
      { year: "FY2023", revenue: 2345.28, operating: 666.45, ordinary: 691.05, net: 488.54, equity: 1703.57, liabilities: 468.71, assets: 2172.28 },
      { year: "FY2024", revenue: 2975.08, operating: 886.92, ordinary: 908.26, net: 627.01, equity: 2240.81, liabilities: 652.94, assets: 2895.56 },
      { year: "FY2025", revenue: 4109.32, operating: 1007.49, ordinary: 1014.87, net: 703.43, equity: 2944.25, liabilities: 1121.92, assets: 4067.96 },
      { year: "FY2026", revenue: 5314.28, operating: 1439.72, ordinary: 1495.29, net: 1200.56, equity: 4144.82, liabilities: 1164.85, assets: 5322.64 }
    ],
    meta: {
      unit: "亿日元",
      latestFiscalEnd: "2026-02-28",
      sourceName: "PR TIMES 決算情報 · 株式会社ポケモン",
      sourceUrl: "https://prtimes.com/finance/1010401079276/settlement/457798",
      note: "财务数据来自宝可梦公司第 26—28 期决算公告（FY2022—FY2026），单位为亿日元。经营看板中的订单、会员、内容播放与业务结构为课堂演示模拟数据，不代表官方披露。"
    },
    segmentMix: [
      { name: "商品零售", value: 38, color: "#ffcb05" },
      { name: "游戏与应用", value: 27, color: "#3b6fe0" },
      { name: "卡牌业务", value: 22, color: "#e5484d" },
      { name: "授权与影视", value: 13, color: "#1f9d78" }
    ],
    regions: [
      { name: "美洲", value: 34, color: "#3b6fe0" },
      { name: "日本", value: 31, color: "#ffcb05" },
      { name: "欧洲", value: 20, color: "#e5484d" },
      { name: "亚洲其他", value: 15, color: "#1f9d78" }
    ],
    kpi: [
      { label: "全渠道会员", value: "1.286", unit: "亿", delta: "+8.4%", note: "同比", icon: "users", tone: "blue" },
      { label: "电商 GMV", value: "86.4", unit: "亿元", delta: "+18.2%", note: "同比", icon: "bag", tone: "yellow" },
      { label: "内容月活", value: "4,280", unit: "万", delta: "+12.6%", note: "同比", icon: "play", tone: "red" },
      { label: "会员 NPS", value: "68", unit: "", delta: "+4", note: "较上季", icon: "heart", tone: "green" }
    ],
    channels: [
      { name: "官方商城", value: 34.8, color: "#ffcb05" },
      { name: "线下宝可梦中心", value: 27.2, color: "#3b6fe0" },
      { name: "电商平台旗舰店", value: 21.6, color: "#e5484d" },
      { name: "授权零售", value: 16.4, color: "#1f9d78" }
    ]
  };

  const OPS = {
    news: {
      kpis: [
        { label: "本月发布", value: "48", unit: "篇", delta: "+12", note: "较上月" },
        { label: "内容浏览量", value: "1,284", unit: "万", delta: "+18.6%", note: "同比" },
        { label: "平均阅读时长", value: "2:48", unit: "", delta: "+11s", note: "较上月" },
        { label: "资讯订阅转化", value: "6.8", unit: "%", delta: "+0.9pp", note: "环比" }
      ],
      table: [
        { title: "2026 宝可梦世界锦标赛落幕", type: "活动", views: "182.4万", ctr: "9.8%", status: "已发布" },
        { title: "《宝可梦传说 Z-A》夜间探索情报", type: "游戏", views: "146.2万", ctr: "11.4%", status: "已发布" },
        { title: "《宝可梦 地平线》新章开启", type: "动画", views: "98.7万", ctr: "8.2%", status: "已发布" },
        { title: "冬日毛绒系列登场", type: "商品", views: "76.5万", ctr: "12.1%", status: "已发布" },
        { title: "宝可梦日 2027 主题公开", type: "活动", views: "—", ctr: "—", status: "待发布" }
      ]
    },
    anime: {
      kpis: [
        { label: "本月播放量", value: "2,860", unit: "万", delta: "+14.2%", note: "同比" },
        { label: "完播率", value: "72.4", unit: "%", delta: "+3.1pp", note: "环比" },
        { label: "影视授权收入", value: "18.6", unit: "亿日元", delta: "+9.8%", note: "同比" },
        { label: "会员观看占比", value: "61.2", unit: "%", delta: "+2.6pp", note: "环比" }
      ],
      table: [
        { title: "宝可梦 地平线", type: "电视动画", views: "1,820万", finish: "76.8%", status: "连载中" },
        { title: "宝可梦：皮卡丘和可可的冒险", type: "剧场版", views: "412万", finish: "81.2%", status: "上架" },
        { title: "宝可梦 旅途", type: "电视动画", views: "326万", finish: "64.5%", status: "全集" },
        { title: "超梦的逆袭 EVOLUTION", type: "剧场版", views: "188万", finish: "78.4%", status: "上架" }
      ]
    },
    commerce: {
      kpis: [
        { label: "商品 GMV", value: "86.4", unit: "亿元", delta: "+18.2%", note: "同比" },
        { label: "订单量", value: "412", unit: "万单", delta: "+14.7%", note: "同比" },
        { label: "客单价", value: "¥209.7", unit: "", delta: "+3.1%", note: "同比" },
        { label: "支付转化率", value: "4.82", unit: "%", delta: "+0.6pp", note: "环比" }
      ],
      table: [
        { title: "皮卡丘 25 周年纪念毛绒", sku: "PL-025", gmv: "¥3,642万", stock: 86, status: "在售" },
        { title: "宝可梦卡牌 朱&紫 补充包", sku: "TCG-SV10", gmv: "¥2,890万", stock: 999, status: "在售" },
        { title: "伊布睡姿毛绒抱枕", sku: "PL-133", gmv: "¥2,214万", stock: 124, status: "在售" },
        { title: "烈空坐 1/20 收藏模型", sku: "MD-384", gmv: "¥1,258万", stock: 18, status: "低库存" },
        { title: "耿鬼夜光氛围摆件", sku: "HM-094", gmv: "¥982万", stock: 34, status: "低库存" }
      ]
    },
    apps: {
      kpis: [
        { label: "应用矩阵 MAU", value: "8,420", unit: "万", delta: "+6.8%", note: "同比" },
        { label: "新增下载", value: "1,260", unit: "万", delta: "+11.2%", note: "同比" },
        { label: "D30 留存", value: "23.6", unit: "%", delta: "+1.4pp", note: "环比" },
        { label: "应用内收入", value: "142.8", unit: "亿日元", delta: "+16.9%", note: "同比" }
      ],
      table: [
        { title: "Pokémon GO", mau: "3,120万", revenue: "¥62.4亿", d30: "26.8%", status: "稳定" },
        { title: "Pokémon TCG Pocket", mau: "2,460万", revenue: "¥48.2亿", d30: "31.2%", status: "增长" },
        { title: "Pokémon Sleep", mau: "980万", revenue: "¥11.6亿", d30: "18.4%", status: "稳定" },
        { title: "Pokémon UNITE", mau: "860万", revenue: "¥12.4亿", d30: "21.1%", status: "稳定" },
        { title: "Pokémon HOME", mau: "620万", revenue: "¥4.8亿", d30: "42.6%", status: "稳定" }
      ]
    },
    games: {
      kpis: [
        { label: "月度活跃玩家", value: "2,860", unit: "万", delta: "+9.4%", note: "同比" },
        { label: "数字版销量", value: "486", unit: "万份", delta: "+21.8%", note: "同比" },
        { label: "DLC 渗透率", value: "34.2", unit: "%", delta: "+5.6pp", note: "环比" },
        { label: "平均游玩时长", value: "42.6", unit: "小时", delta: "+3.2h", note: "同比" }
      ],
      table: [
        { title: "宝可梦传说 Z-A", platform: "Switch / Switch 2", sales: "286万份", active: "820万", status: "热销" },
        { title: "宝可梦 朱／紫", platform: "Switch", sales: "2,486万份", active: "640万", status: "长销" },
        { title: "宝可梦传说 阿尔宙斯", platform: "Switch", sales: "1,486万份", active: "320万", status: "长销" },
        { title: "宝可梦 剑／盾", platform: "Switch", sales: "2,664万份", active: "218万", status: "长销" }
      ]
    },
    cards: {
      kpis: [
        { label: "卡牌月销售额", value: "96.8", unit: "亿日元", delta: "+22.4%", note: "同比" },
        { label: "赛事场次", value: "12,480", unit: "场", delta: "+18.2%", note: "同比" },
        { label: "活跃牌手", value: "186", unit: "万", delta: "+12.7%", note: "同比" },
        { label: "补充包售罄率", value: "87.6", unit: "%", delta: "+4.2pp", note: "环比" }
      ],
      table: [
        { title: "超级进化—勇敢", code: "M1a", sales: "28.6万盒", events: "3,240场", status: "热销" },
        { title: "超级进化—交响", code: "M1b", sales: "26.2万盒", events: "2,980场", status: "热销" },
        { title: "朱&紫—黯焰支配者", code: "SV10", sales: "19.8万盒", events: "2,140场", status: "在售" },
        { title: "朱&紫—热风竞技场", code: "SV9a", sales: "14.6万盒", events: "1,860场", status: "在售" }
      ]
    },
    pokedex: {
      kpis: [
        { label: "图鉴月活", value: "1,860", unit: "万", delta: "+15.8%", note: "同比" },
        { label: "查询次数", value: "6,420", unit: "万", delta: "+21.4%", note: "同比" },
        { label: "收藏转化", value: "18.6", unit: "%", delta: "+2.4pp", note: "环比" },
        { label: "平均停留", value: "4:26", unit: "", delta: "+28s", note: "较上月" }
      ],
      table: [
        { title: "皮卡丘", no: "#0025", views: "682万", favorite: "126万", type: "电" },
        { title: "伊布", no: "#0133", views: "486万", favorite: "98万", type: "一般" },
        { title: "耿鬼", no: "#0094", views: "382万", favorite: "76万", type: "幽灵 / 毒" },
        { title: "路卡利欧", no: "#0448", views: "346万", favorite: "72万", type: "格斗 / 钢" },
        { title: "仙子伊布", no: "#0700", views: "318万", favorite: "68万", type: "妖精" }
      ]
    },
    members: {
      kpis: [
        { label: "会员总数", value: "1.286", unit: "亿", delta: "+8.4%", note: "同比" },
        { label: "本月新增", value: "286", unit: "万", delta: "+12.6%", note: "同比" },
        { label: "90 天复购率", value: "42.8", unit: "%", delta: "+3.2pp", note: "环比" },
        { label: "会员 LTV", value: "¥1,286", unit: "", delta: "+6.8%", note: "同比" }
      ],
      table: [
        { title: "训练家 · 小智", tier: "大师球", orders: "28", ltv: "¥8,642", status: "活跃" },
        { title: "训练家 · 小遥", tier: "高级球", orders: "16", ltv: "¥4,218", status: "活跃" },
        { title: "训练家 · 小光", tier: "超级球", orders: "9", ltv: "¥2,186", status: "活跃" },
        { title: "训练家 · 小刚", tier: "精灵球", orders: "3", ltv: "¥628", status: "沉默" },
        { title: "训练家 · 莉莉艾", tier: "大师球", orders: "31", ltv: "¥9,480", status: "活跃" }
      ]
    }
  };

  const ARCHITECTURE = {
    principles: [
      { title: "全渠道一致体验", desc: "门户、图鉴、商城与会员中心共享同一套设计语言和内容模型。", icon: "devices" },
      { title: "内容与交易解耦", desc: "资讯、动画、商品、卡牌各自独立运营，又通过会员与搜索串联。", icon: "layers" },
      { title: "数据驱动经营", desc: "将内容表现、交易转化与财务结果放在同一个管理驾驶舱中。", icon: "chart" },
      { title: "安全与合规", desc: "管理端角色隔离、审计留痕；生产环境遵循数据最小化与授权规范。", icon: "shield" }
    ]
  };

  return { NEWS, ANIME, PRODUCTS, APPS, GAMES, CARD_FEATURES, CARD_SETS, SHOWCASE_CARDS, FINANCE, OPS, ARCHITECTURE };
})();
