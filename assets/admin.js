/* =========================================================
   Pokémon Hub · Management cockpit
   Front-end only. Operational metrics are simulated for the
   classroom demo; FY2022–FY2026 financial actuals come from
   The Pokémon Company's published settlement notices.
   ========================================================= */

(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const D = window.POKEMON_HUB;
  const F = D.FINANCE;
  const latest = F.years[F.years.length - 1];
  const prev = F.years[F.years.length - 2];
  const esc = window.PK.esc;
  const icon = window.PK.icon;
  const nf = (n, digits = 2) => Number(n).toLocaleString("zh-CN", { minimumFractionDigits: digits, maximumFractionDigits: digits });
  const int = (n) => Number(n).toLocaleString("zh-CN");
  const pct = (a, b) => ((a / b - 1) * 100);
  const positive = (n) => n >= 0;
  const toneMap = {
    blue: ["#e9efff", "#2f5fe0"], yellow: ["#fff4bd", "#a77c00"], red: ["#ffe9ea", "#d53b40"],
    green: ["#e6f7f1", "#1f9d78"], violet: ["#eee8ff", "#6a4fc0"], orange: ["#fff0dd", "#c96f22"]
  };
  const statusClass = (status) => {
    if (/低库存|待发布|沉默|预警|风险/.test(status)) return "warn";
    if (/连载|增长|新/.test(status)) return "info";
    if (/—/.test(status)) return "gray";
    return "";
  };
  const statusPill = (s) => `<span class="status-pill ${statusClass(s)}">${esc(s)}</span>`;

  /* ---------- Auth gate ---------- */
  function bootstrapAuth() {
    const s = window.PK.session();
    const gate = $("#adminGate");
    const app = $("#adminApp");
    if (!s || s.role !== "admin") {
      gate.style.display = "grid";
      app.style.display = "none";
      if (s) $("#gateMessage").textContent = `当前登录的是消费者账号「${s.name}」，没有管理者权限。请退出后使用管理者账号登录。`;
    } else {
      gate.style.display = "none";
      app.style.display = "grid";
      $("#adminSideName").textContent = s.name || "运营管理员";
      $("#adminSideAvatar").textContent = s.avatar || "管";
      $("#adminAvatar").textContent = s.avatar || "管";
      renderAll();
      bindAdmin();
    }
  }

  /* ---------- Shared UI ---------- */
  function kpiCard(k) {
    const [tint, color] = toneMap[k.tone || "blue"] || toneMap.blue;
    const bars = (k.spark || [34, 44, 39, 58, 53, 67, 63, 78]).map((h, i) => `<span style="height:${h}%;animation-delay:${i * 35}ms"></span>`).join("");
    return `<div class="admin-kpi" style="--kpi-tint:${tint};--kpi-color:${color}">
      <div class="admin-kpi-top"><span>${esc(k.label)}</span><span class="admin-kpi-icon">${icon(k.icon || "chart")}</span></div>
      <div class="kpi-val">${esc(k.value)}${k.unit ? `<small>${esc(k.unit)}</small>` : ""}</div>
      <div class="kpi-foot"><span class="delta ${positive(parseFloat(String(k.delta).replace(/[^\d.-]/g, ""))) ? "" : "down"}">${icon("trending")} ${esc(k.delta)}</span><span>${esc(k.note || "同比")}</span></div>
      <div class="kpi-spark" aria-hidden="true">${bars}</div>
    </div>`;
  }

  function lineChart(labels, series, opts = {}) {
    const W = 700, H = 248, pad = { l: 48, r: 18, t: 22, b: 30 };
    const values = series.flatMap(s => s.values);
    let max = Math.max(...values);
    const magnitude = Math.pow(10, Math.floor(Math.log10(max || 1)));
    max = Math.ceil(max / magnitude * 2) / 2 * magnitude * 1.05;
    const min = 0;
    const plotW = W - pad.l - pad.r, plotH = H - pad.t - pad.b;
    const x = (i) => pad.l + (labels.length === 1 ? plotW / 2 : i * plotW / (labels.length - 1));
    const y = (v) => pad.t + plotH - ((v - min) / (max - min)) * plotH;
    const gid = "grad" + Math.random().toString(36).slice(2, 8);
    const grid = [0, 1, 2, 3, 4].map(i => {
      const val = max * i / 4, yy = y(val);
      return `<line class="chart-gridline" x1="${pad.l}" y1="${yy}" x2="${W - pad.r}" y2="${yy}"/><text class="chart-axis-label" x="${pad.l - 8}" y="${yy + 2.5}" text-anchor="end">${val >= 1000 ? (val / 1000).toFixed(1) + "k" : Math.round(val)}</text>`;
    }).join("");
    const xlabels = labels.map((l, i) => `<text class="chart-axis-label" x="${x(i)}" y="${H - 8}" text-anchor="middle">${esc(l)}</text>`).join("");
    const paths = series.map((s, si) => {
      const points = s.values.map((v, i) => [x(i), y(v)]);
      const path = points.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
      const area = si === 0 ? `<path class="chart-area" fill="${s.color}" d="${path} L${points[points.length - 1][0]},${y(0)} L${points[0][0]},${y(0)} Z"/>` : "";
      const dots = points.map((p, i) => `<circle class="chart-point" cx="${p[0]}" cy="${p[1]}" r="3.7" fill="${s.color}"><title>${esc(labels[i])} · ${esc(s.name)}：${nf(s.values[i], 1)}${esc(opts.unit || "")}</title></circle>`).join("");
      return area + `<path class="chart-line" stroke="${s.color}" d="${path}"/>` + dots;
    }).join("");
    return `<div class="chart-wrap"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opts.label || "趋势图")}">
      <defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${series[0].color}" stop-opacity=".45"/><stop offset="1" stop-color="${series[0].color}" stop-opacity="0"/></linearGradient></defs>
      ${grid}${xlabels}${paths}
    </svg></div>`;
  }

  function donutData(data, center, sub) {
    const total = data.reduce((s, x) => s + x.value, 0);
    let cur = 0;
    const stops = data.map(x => {
      const start = cur / total * 100; cur += x.value;
      const end = cur / total * 100;
      return `${x.color} ${start}% ${end}%`;
    }).join(", ");
    return `<div class="donut-wrap"><div class="donut" style="--seg:${stops}"><div class="donut-center"><b>${esc(center)}</b><span>${esc(sub)}</span></div></div>
      <div class="donut-legend">${data.map(x => `<div><i style="--lc:${x.color}"></i><span>${esc(x.name)}</span><b>${x.value}%</b></div>`).join("")}</div></div>`;
  }

  function bars(data) {
    return `<div class="hbar-list">${data.map(x => `<div class="hbar-row"><div class="hbar-label"><span>${esc(x.name)}</span><b>${x.value}%</b></div><div class="hbar-track"><div class="hbar-fill" style="--hc:${x.color};width:${x.value}%"></div></div></div>`).join("")}</div>`;
  }

  function dataTable(columns, rows, opts = {}) {
    return `<div class="admin-table-wrap"><table class="admin-table ${opts.cls || ""}"><thead><tr>${columns.map(c => `<th${c.num ? ' class="num"' : ""}>${esc(c.label)}</th>`).join("")}</tr></thead><tbody>
      ${rows.map(r => `<tr>${columns.map(c => {
        const val = typeof c.render === "function" ? c.render(r) : r[c.key];
        return `<td${c.num ? ' class="num"' : ""}>${c.raw ? val : esc(val == null ? "—" : val)}</td>`;
      }).join("")}</tr>`).join("")}</tbody></table></div>`;
  }

  function pageHead(title, desc, actions = "", badge = "") {
    return `<div class="admin-page-head"><div><h1>${esc(title)}</h1><p>${esc(desc)}</p>${badge ? `<div class="head-meta">${badge}</div>` : ""}</div><div class="page-head-actions">${actions}</div></div>`;
  }

  function notice(text) {
    return `<div class="notice-banner">${icon("info")}<div>${text}</div></div>`;
  }

  /* ---------- Overview ---------- */
  function renderOverview() {
    const revDelta = pct(latest.revenue, prev.revenue);
    const opDelta = pct(latest.operating, prev.operating);
    const netDelta = pct(latest.net, prev.net);
    const assetDelta = pct(latest.assets, prev.assets);
    const kpis = [
      { label: "营业收入", value: nf(latest.revenue, 2), unit: "亿日元", delta: `+${nf(revDelta, 2)}%`, note: "同比 FY2025", icon: "wallet", tone: "blue", spark: [38, 46, 43, 57, 62, 71, 77, 88] },
      { label: "营业利润", value: nf(latest.operating, 2), unit: "亿日元", delta: `+${nf(opDelta, 2)}%`, note: "同比 FY2025", icon: "trending", tone: "yellow", spark: [40, 44, 52, 48, 61, 66, 74, 86] },
      { label: "当期纯利润", value: nf(latest.net, 2), unit: "亿日元", delta: `+${nf(netDelta, 2)}%`, note: "同比 FY2025", icon: "chart", tone: "red", spark: [32, 40, 45, 51, 57, 63, 72, 92] },
      { label: "总资产", value: nf(latest.assets, 2), unit: "亿日元", delta: `+${nf(assetDelta, 2)}%`, note: "同比 FY2025", icon: "database", tone: "green", spark: [36, 42, 50, 55, 61, 69, 78, 84] }
    ];
    $("#section-overview").innerHTML = `
      ${pageHead("经营驾驶舱", "把内容、商品、应用与财务放进同一个视野。", `
        <button class="admin-btn" data-print>${icon("download")} 打印 / 导出 PDF</button>
        <button class="admin-btn primary" data-refresh>${icon("refresh")} 刷新数据</button>`,
        `<span class="live-dot"></span> 数据已同步 · 财务口径 FY2026（截至 2026-02-28） · 经营指标为课堂模拟`)}
      ${notice(`财务数字来自宝可梦公司第 28 期决算公告，属于真实公开数据；订单、会员、内容播放与业务结构等经营指标为课堂演示模拟，不代表官方披露。<a href="https://prtimes.com/finance/1010401079276/settlement/457798" target="_blank" rel="noopener">查看财务来源 ${icon("external")}</a>`)}
      <div class="kpi-grid">${kpis.map(kpiCard).join("")}</div>

      <div class="admin-grid">
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>五年营收与利润</h3><p>FY2022—FY2026 · 单位：亿日元</p></div>
            <div class="segmented" id="finMode"><button class="active" data-fin-mode="revenue">营收</button><button data-fin-mode="profit">利润</button></div>
          </div>
          <div class="admin-card-body">
            <div class="chart-big"><b id="chartBig">¥5,314.28亿</b><span id="chartBigLabel">FY2026 营业收入</span><span class="delta">+29.32%</span></div>
            <div id="finChartWrap">${lineChart(F.years.map(y => y.year.replace("FY", "")), [{ name: "营业收入", color: "#2f5fe0", values: F.years.map(y => y.revenue) }], { unit: " 亿日元", label: "五年营业收入趋势" })}</div>
            <div class="chart-legend"><span><i style="--lc:#2f5fe0"></i>营业收入</span><span style="color:var(--muted-2)">数据：株式会社ポケモン 決算公告</span></div>
          </div>
        </div>
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>业务结构</h3><p>课堂演示估算 · 非官方分部披露</p></div><span class="status-pill gray">模拟</span></div>
          <div class="admin-card-body">${donutData(F.segmentMix, "100%", "业务组合")}${bars(F.regions.slice(0, 3))}</div>
        </div>
      </div>

      <div class="two-col">
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>渠道销售构成</h3><p>全渠道 GMV 占比 · 模拟</p></div><button class="admin-btn sm" data-section-jump="commerce">详情 ${icon("arrow")}</button></div>
          <div class="admin-card-body">${bars(F.channels)}</div>
        </div>
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>运营提醒</h3><p>按优先级排序</p></div><span class="status-pill warn">3 项待处理</span></div>
          <div class="admin-card-body">
            <div class="activity-list">
              <div class="activity-item"><span class="act-icon" style="background:#fff6de;color:#a27700">${icon("package")}</span><div class="act-main"><b>烈空坐模型库存仅剩 18 件</b><span>商品电商 · 建议 48 小时内补货</span></div><span class="act-time">12 分钟前</span></div>
              <div class="activity-item"><span class="act-icon" style="background:#e9efff;color:#2f5fe0">${icon("newspaper")}</span><div class="act-main"><b>宝可梦日 2027 专题稿待审核</b><span>资讯运营 · 计划 11 月 20 日发布</span></div><span class="act-time">1 小时前</span></div>
              <div class="activity-item"><span class="act-icon" style="background:#ffe9ea;color:#d53b40">${icon("cards")}</span><div class="act-main"><b>「超级进化—勇敢」补货率 87.6%</b><span>卡牌业务 · 建议追加生产</span></div><span class="act-time">2 小时前</span></div>
            </div>
          </div>
        </div>
      </div>

      <div class="admin-grid">
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>热销商品</h3><p>按本月 GMV 排序</p></div><button class="admin-btn sm" data-section-jump="commerce">全部商品 ${icon("arrow")}</button></div>
          <div class="admin-card-body" style="padding-top:8px">
            ${dataTable([
              { label: "商品", render: r => `<div class="table-product"><img src="${r.img}" alt=""><span class="t-title">${esc(r.name)}</span></div>`, raw: true },
              { label: "GMV", key: "gmv" }, { label: "库存", key: "stock" }, { label: "状态", render: r => statusPill(r.status), raw: true }
            ], [
              { name: "皮卡丘 25 周年毛绒", img: "assets/pokemon/25.webp", gmv: "¥3,642万", stock: "86", status: "在售" },
              { name: "朱&紫 补充包", img: "assets/pokemon/6.webp", gmv: "¥2,890万", stock: "999", status: "在售" },
              { name: "伊布睡姿毛绒", img: "assets/pokemon/133.webp", gmv: "¥2,214万", stock: "124", status: "在售" },
              { name: "烈空坐收藏模型", img: "assets/pokemon/384.webp", gmv: "¥1,258万", stock: "18", status: "低库存" }
            ])}
          </div>
        </div>
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>最新动态</h3><p>全平台运营事件</p></div></div>
          <div class="admin-card-body">
            <div class="activity-list">
              <div class="activity-item"><span class="act-icon">${icon("play")}</span><div class="act-main"><b>《宝可梦 地平线》第 130 话上线</b><span>动画影视 · 首日播放 286 万</span></div><span class="act-time">10:24</span></div>
              <div class="activity-item"><span class="act-icon">${icon("users")}</span><div class="act-main"><b>新增会员 28,642 人</b><span>会员增长 · 转化率 6.8%</span></div><span class="act-time">09:30</span></div>
              <div class="activity-item"><span class="act-icon">${icon("cards")}</span><div class="act-main"><b>上海城市联赛报名满员</b><span>卡牌业务 · 256 / 256 人</span></div><span class="act-time">昨天</span></div>
              <div class="activity-item"><span class="act-icon">${icon("settings")}</span><div class="act-main"><b>价格策略已发布至商城</b><span>系统设置 · 管理员 王敏</span></div><span class="act-time">昨天</span></div>
            </div>
          </div>
        </div>
      </div>`;
    bindOverview();
  }

  function bindOverview() {
    let mode = "revenue";
    const render = () => {
      const wrap = $("#finChartWrap");
      if (!wrap) return;
      if (mode === "revenue") {
        wrap.innerHTML = lineChart(F.years.map(y => y.year.replace("FY", "")), [{ name: "营业收入", color: "#2f5fe0", values: F.years.map(y => y.revenue) }], { unit: " 亿日元", label: "五年营业收入趋势" });
        $("#chartBig").textContent = "¥" + nf(latest.revenue, 2) + "亿";
        $("#chartBigLabel").textContent = "FY2026 营业收入";
      } else {
        wrap.innerHTML = lineChart(F.years.map(y => y.year.replace("FY", "")), [
          { name: "营业利润", color: "#e8ae00", values: F.years.map(y => y.operating) },
          { name: "纯利润", color: "#e5484d", values: F.years.map(y => y.net) }
        ], { unit: " 亿日元", label: "五年利润趋势" });
        $("#chartBig").textContent = "¥" + nf(latest.operating, 2) + "亿";
        $("#chartBigLabel").textContent = "FY2026 营业利润";
      }
      const legend = wrap.parentElement.querySelector(".chart-legend");
      if (legend) legend.innerHTML = mode === "revenue"
        ? `<span><i style="--lc:#2f5fe0"></i>营业收入</span><span style="color:var(--muted-2)">数据：株式会社ポケモン 決算公告</span>`
        : `<span><i style="--lc:#e8ae00"></i>营业利润</span><span><i style="--lc:#e5484d"></i>纯利润</span><span style="color:var(--muted-2)">单位：亿日元</span>`;
    };
    $$("#finMode button").forEach(b => b.addEventListener("click", () => {
      mode = b.dataset.finMode;
      $$("#finMode button").forEach(x => x.classList.toggle("active", x === b));
      render();
    }));
  }

  /* ---------- Ops sections ---------- */
  const OPS_CONFIG = {
    news: {
      title: "资讯运营", desc: "内容生产、分发与读者参与的全链路表现。", icon: "newspaper",
      kpis: D.OPS.news.kpis, table: D.OPS.news.table,
      cols: [
        { label: "内容", render: r => `<span class="t-title">${esc(r.title)}</span>`, raw: true },
        { label: "类型", key: "type" }, { label: "浏览量", key: "views" }, { label: "CTR", key: "ctr" },
        { label: "状态", render: r => statusPill(r.status), raw: true }
      ],
      trend: "内容浏览量（万）", values: [72, 78, 74, 86, 91, 88, 96, 104, 112, 108, 121, 128],
      breakdown: { title: "内容类型占比", data: [{ name: "活动", value: 31, color: "#ffcb05" }, { name: "游戏", value: 24, color: "#2f5fe0" }, { name: "动画", value: 18, color: "#e5484d" }, { name: "商品", value: 17, color: "#1f9d78" }, { name: "卡牌/应用", value: 10, color: "#7b61c9" }] },
      insights: ["世界锦标赛报道带来本月最高 CTR（9.8%），建议延续赛事专题。", "「宝可梦日 2027」专题已进入审核，预计 11 月 20 日上线。", "商品类内容订阅转化最高，可增加「发售日历」栏目。"]
    },
    anime: {
      title: "动画 / 影视", desc: "电视动画、剧场版与授权内容的观看与收入表现。", icon: "film",
      kpis: D.OPS.anime.kpis, table: D.OPS.anime.table,
      cols: [
        { label: "作品", render: r => `<span class="t-title">${esc(r.title)}</span>`, raw: true },
        { label: "类型", key: "type" }, { label: "播放量", key: "views" }, { label: "完播率", key: "finish" },
        { label: "状态", render: r => statusPill(r.status), raw: true }
      ],
      trend: "月度播放量（万）", values: [182, 196, 188, 216, 232, 228, 246, 256, 264, 271, 279, 286],
      breakdown: { title: "影视收入构成", data: [{ name: "流媒体授权", value: 42, color: "#2f5fe0" }, { name: "电视播映", value: 24, color: "#ffcb05" }, { name: "剧场/活动", value: 20, color: "#e5484d" }, { name: "海外发行", value: 14, color: "#1f9d78" }] },
      insights: ["《地平线》新章完播率提升至 76.8%，会员观看占比 61.2%。", "剧场版长尾表现稳定，周末家庭观看占比最高。", "建议将新章首播与会员积分任务联动，提升留存。"]
    },
    commerce: {
      title: "商品电商", desc: "商城 GMV、订单、转化、库存与商品表现。", icon: "bag",
      kpis: D.OPS.commerce.kpis, table: D.OPS.commerce.table,
      cols: [
        { label: "商品", render: r => `<span class="t-title">${esc(r.title)}</span><span class="t-sub">${esc(r.sku)}</span>`, raw: true },
        { label: "GMV", key: "gmv" }, { label: "库存", key: "stock" }, { label: "状态", render: r => statusPill(r.status), raw: true }
      ],
      trend: "月度 GMV（亿元）", values: [5.8, 6.1, 5.9, 6.5, 6.8, 6.6, 7.1, 7.4, 7.8, 8.0, 8.3, 8.6],
      breakdown: { title: "渠道 GMV 占比", data: F.channels },
      insights: ["官方商城贡献 34.8% GMV，移动端订单占比 72.4%。", "烈空坐模型与耿鬼摆件进入低库存区间，建议 48 小时内补货。", "优惠码活动带来 9.2% 新客转化，但退货率需持续观察。"]
    },
    apps: {
      title: "应用程式", desc: "应用矩阵的用户规模、留存与商业化表现。", icon: "phone",
      kpis: D.OPS.apps.kpis, table: D.OPS.apps.table,
      cols: [
        { label: "应用", render: r => `<span class="t-title">${esc(r.title)}</span>`, raw: true },
        { label: "MAU", key: "mau" }, { label: "应用内收入", key: "revenue" }, { label: "D30", key: "d30" },
        { label: "状态", render: r => statusPill(r.status), raw: true }
      ],
      trend: "矩阵 MAU（万）", values: [6420, 6580, 6490, 6810, 7020, 7180, 7360, 7520, 7760, 7920, 8120, 8420],
      breakdown: { title: "应用 MAU 占比", data: [{ name: "Pokémon GO", value: 37, color: "#4caf8a" }, { name: "TCG Pocket", value: 29, color: "#d95b8a" }, { name: "Sleep", value: 12, color: "#5b6fb5" }, { name: "UNITE", value: 10, color: "#3a7bd5" }, { name: "其他", value: 12, color: "#9aa3b8" }] },
      insights: ["TCG Pocket 保持最高 D30 留存（31.2%），是矩阵增长引擎。", "Pokémon GO 贡献最大收入，但新增下载增长趋缓。", "Sleep 与健康场景结合，适合做跨应用会员权益。"]
    },
    games: {
      title: "游戏业务", desc: "主机游戏的销量、活跃与平台结构。", icon: "gamepad",
      kpis: D.OPS.games.kpis, table: D.OPS.games.table,
      cols: [
        { label: "作品", render: r => `<span class="t-title">${esc(r.title)}</span>`, raw: true },
        { label: "平台", key: "platform" }, { label: "销量", key: "sales" }, { label: "活跃", key: "active" },
        { label: "状态", render: r => statusPill(r.status), raw: true }
      ],
      trend: "月度活跃玩家（万）", values: [2180, 2240, 2190, 2310, 2380, 2420, 2510, 2580, 2640, 2720, 2790, 2860],
      breakdown: { title: "平台销量结构", data: [{ name: "Nintendo Switch", value: 68, color: "#e5484d" }, { name: "Switch 2", value: 22, color: "#2f5fe0" }, { name: "数字版合计", value: 10, color: "#ffcb05" }] },
      insights: ["《传说 Z-A》首月销量 286 万份，Switch 2 版本占比提升至 22%。", "经典作品长销稳定，数字版收入占比继续上升。", "DLC 渗透率 34.2%，可通过联动活动提升至 40%。"]
    },
    cards: {
      title: "卡牌业务", desc: "扩充包销售、赛事与牌手社群运营。", icon: "cards",
      kpis: D.OPS.cards.kpis, table: D.OPS.cards.table,
      cols: [
        { label: "扩充包", render: r => `<span class="t-title">${esc(r.title)}</span><span class="t-sub">${esc(r.code)}</span>`, raw: true },
        { label: "销量", key: "sales" }, { label: "赛事", key: "events" }, { label: "状态", render: r => statusPill(r.status), raw: true }
      ],
      trend: "月度卡牌销售额（亿日元）", values: [62, 66, 64, 71, 76, 74, 81, 85, 88, 91, 94, 96.8],
      breakdown: { title: "卡牌收入结构", data: [{ name: "补充包", value: 46, color: "#e5484d" }, { name: "周边/卡套", value: 21, color: "#ffcb05" }, { name: "赛事/活动", value: 18, color: "#2f5fe0" }, { name: "数字版 TCG", value: 15, color: "#1f9d78" }] },
      insights: ["「超级进化—勇敢」售罄率 87.6%，二级市场热度持续。", "年度赛事 12,480 场，新增牌手同比 +12.7%。", "建议扩大新手道馆覆盖，降低首次参赛门槛。"]
    },
    pokedex: {
      title: "图鉴运营", desc: "图鉴查询、收藏转化与用户偏好。", icon: "pokeball",
      kpis: D.OPS.pokedex.kpis, table: D.OPS.pokedex.table,
      cols: [
        { label: "宝可梦", render: r => `<span class="t-title">${esc(r.title)}</span><span class="t-sub">${esc(r.no)}</span>`, raw: true },
        { label: "类型", key: "type" }, { label: "浏览量", key: "views" }, { label: "收藏", key: "favorite" }
      ],
      trend: "图鉴月活（万）", values: [1120, 1180, 1160, 1240, 1310, 1360, 1420, 1510, 1580, 1660, 1740, 1860],
      breakdown: { title: "热门属性", data: [{ name: "电", value: 24, color: "#e8b800" }, { name: "妖精", value: 19, color: "#dd6da8" }, { name: "幽灵", value: 17, color: "#6d64b8" }, { name: "龙", value: 14, color: "#5965d8" }, { name: "其他", value: 26, color: "#9aa3b8" }] },
      insights: ["皮卡丘仍是查询量第一，伊布与耿鬼紧随其后。", "收藏转化率 18.6%，加入收藏后 7 日回访提升 23%。", "建议增加「属性组合」与「地区形态」筛选用例。"]
    },
    members: {
      title: "会员增长", desc: "会员规模、分层、复购与生命周期价值。", icon: "users",
      kpis: D.OPS.members.kpis, table: D.OPS.members.table,
      cols: [
        { label: "会员", render: r => `<div style="display:flex;align-items:center"><span class="table-avatar">${esc(r.title.slice(-1))}</span><span class="t-title">${esc(r.title)}</span></div>`, raw: true },
        { label: "等级", key: "tier" }, { label: "订单", key: "orders" }, { label: "LTV", key: "ltv" },
        { label: "状态", render: r => statusPill(r.status), raw: true }
      ],
      trend: "会员总数（百万）", values: [96, 100, 103, 107, 110, 114, 118, 121, 123, 125, 127, 128.6],
      breakdown: { title: "会员等级分布", data: [{ name: "精灵球", value: 54, color: "#9aa3b8" }, { name: "超级球", value: 26, color: "#2f5fe0" }, { name: "高级球", value: 14, color: "#ffcb05" }, { name: "大师球", value: 6, color: "#e5484d" }] },
      insights: ["会员总数 1.286 亿，90 天复购率 42.8%。", "大师球会员仅占 6%，却贡献 18.4% GMV。", "沉默会员唤醒活动可优先覆盖 30—60 天未活跃人群。"]
    }
  };

  function renderOps(key) {
    const c = OPS_CONFIG[key];
    if (!c) return;
    const kpis = c.kpis.map(k => kpiCard({ ...k, tone: k.tone || ["blue", "yellow", "red", "green"][c.kpis.indexOf(k) % 4], spark: [35, 43, 39, 51, 56, 63, 70, 78] }));
    const chart = lineChart(["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      [{ name: c.trend, color: "#2f5fe0", values: c.values }], { unit: "", label: c.trend });
    const latestVal = c.values[c.values.length - 1];
    const table = dataTable(c.cols, c.table);
    $("#section-" + key).innerHTML = `
      ${pageHead(c.title, c.desc, `
        <button class="admin-btn" data-export-section="${key}">${icon("download")} 导出 CSV</button>
        <button class="admin-btn" data-refresh>${icon("refresh")} 刷新</button>
        <button class="admin-btn primary" data-section-jump="finance">${icon("chart")} 查看财务</button>`,
        `<span class="live-dot"></span> 本月数据 · 更新于 2026-11-13 20:30 · 经营指标为课堂模拟`)}
      ${notice(`本页经营指标为课堂演示模拟数据，用于展示「${esc(c.title)}」板块的管理视角；底部财务中心提供可核验的真实公开财务数据。`)}
      <div class="kpi-grid">${kpis.join("")}</div>
      <div class="admin-grid">
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>${esc(c.trend)}</h3><p>近 12 个月 · 课堂模拟</p></div><div class="segmented"><button class="active">月度</button><button>季度</button></div></div>
          <div class="admin-card-body">
            <div class="chart-big"><b>${nf(latestVal, 1)}</b><span>${esc(c.trend.replace(/（.*$/, ""))}</span><span class="delta">+${(key === "cards" ? "22.4" : key === "members" ? "8.4" : "12.6")}%</span></div>
            ${chart}
            <div class="chart-legend"><span><i style="--lc:#2f5fe0"></i>${esc(c.trend)}</span><span style="color:var(--muted-2)">鼠标悬停查看数值</span></div>
          </div>
        </div>
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>${esc(c.breakdown.title)}</h3><p>结构占比 · 模拟</p></div><span class="status-pill gray">演示</span></div>
          <div class="admin-card-body">${donutData(c.breakdown.data, "100%", c.breakdown.title.slice(0, 4))}</div>
        </div>
      </div>
      <div class="admin-grid">
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>明细表现</h3><p>点击表头可排序（演示）</p></div><button class="admin-btn sm" data-export-section="${key}">导出 ${icon("download")}</button></div>
          <div class="admin-card-body" style="padding-top:8px">${table}</div>
        </div>
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>运营洞察</h3><p>基于本页指标的建议</p></div><span class="status-pill info">AI 辅助</span></div>
          <div class="admin-card-body">
            <div class="mini-list">${c.insights.map((t, i) => `<div class="mini-list-item"><span class="ml-rank ${i === 0 ? "top" : ""}">${i + 1}</span><span style="flex:1;font-size:9.5px;line-height:1.6">${esc(t)}</span></div>`).join("")}</div>
            <div style="margin-top:15px;padding-top:14px;border-top:1px solid var(--line)"><div style="font-size:8px;color:var(--muted);font-weight:800;margin-bottom:8px">快捷操作</div><div class="quick-links"><button class="quick-link" data-section-jump="commerce">${icon("bag")} 商品管理</button><button class="quick-link" data-section-jump="members">${icon("users")} 会员分层</button><button class="quick-link" data-section-jump="finance">${icon("wallet")} 财务中心</button><button class="quick-link" data-print>${icon("download")} 导出简报</button></div></div>
          </div>
        </div>
      </div>`;
  }

  function exportSection(key) {
    const c = OPS_CONFIG[key];
    if (!c) return;
    const rows = [c.cols.map(x => x.label), ...c.table.map(r => c.cols.map(col => {
      if (col.key) return r[col.key];
      return String(col.render(r)).replace(/<[^>]+>/g, "").trim();
    }))];
    downloadCSV(`pokemon-${key}-operations.csv`, rows);
  }

  function downloadCSV(filename, rows) {
    const csv = rows.map(r => r.map(cell => `"${String(cell == null ? "" : cell).replace(/"/g, '""')}"`).join(",")).join("\r\n");
    downloadBlob(filename, "\uFEFF" + csv, "text/csv;charset=utf-8");
  }
  function downloadBlob(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 800);
    window.PK.toast("文件已开始下载：" + filename);
  }

  /* ---------- Finance ---------- */
  function renderFinance() {
    const equityRatio = latest.equity / latest.assets * 100;
    const opMargin = latest.operating / latest.revenue * 100;
    const netMargin = latest.net / latest.revenue * 100;
    const roe = latest.net / latest.equity * 100;
    const tableRows = [...F.years].reverse();
    $("#section-finance").innerHTML = `
      ${pageHead("财务中心", "真实公开财务数据 × 课堂经营视角。", `
        <button class="admin-btn" data-print>${icon("download")} 打印报表</button>
        <button class="admin-btn primary" data-export-finance>${icon("download")} 导出 CSV</button>`,
        `<span class="live-dot"></span> 数据来源：PR TIMES 決算情報 · 株式会社ポケモン · 更新至第 28 期（2026-02-28）`)}
      ${notice(`本页财务数据为宝可梦公司依法公开的决算公告（第 26—28 期），单位统一为「亿日元」。业务结构、渠道占比与经营看板中的非财务指标为课堂模拟，已单独标注。<a href="${F.meta.sourceUrl}" target="_blank" rel="noopener">访问原始决算公告 ${icon("external")}</a>`)}
      <div class="kpi-grid">
        ${kpiCard({ label: "营业收入", value: nf(latest.revenue, 2), unit: "亿日元", delta: "+29.32%", note: "同比 FY2025", icon: "wallet", tone: "blue", spark: [38, 46, 43, 57, 62, 71, 77, 88] })}
        ${kpiCard({ label: "营业利润", value: nf(latest.operating, 2), unit: "亿日元", delta: "+42.90%", note: "同比 FY2025", icon: "trending", tone: "yellow", spark: [40, 44, 52, 48, 61, 66, 74, 86] })}
        ${kpiCard({ label: "当期纯利润", value: nf(latest.net, 2), unit: "亿日元", delta: "+70.67%", note: "同比 FY2025", icon: "chart", tone: "red", spark: [32, 40, 45, 51, 57, 63, 72, 92] })}
        ${kpiCard({ label: "股东权益比率", value: nf(equityRatio, 2), unit: "%", delta: "+7.85pp", note: "较 FY2025", icon: "shield", tone: "green", spark: [61, 64, 66, 67, 69, 71, 74, 78] })}
      </div>
      <div class="admin-grid">
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>营收与利润 · 五年趋势</h3><p>FY2022—FY2026 · 亿日元</p></div><span class="status-pill">真实数据</span></div>
          <div class="admin-card-body">
            <div class="chart-big"><b>¥${nf(latest.revenue, 2)}亿</b><span>FY2026 营业收入</span><span class="delta">+29.32%</span></div>
            ${lineChart(F.years.map(y => y.year.replace("FY", "")), [
              { name: "营业收入", color: "#2f5fe0", values: F.years.map(y => y.revenue) },
              { name: "营业利润", color: "#e8ae00", values: F.years.map(y => y.operating) },
              { name: "纯利润", color: "#e5484d", values: F.years.map(y => y.net) }
            ], { unit: " 亿日元", label: "营收与利润" })}
            <div class="chart-legend"><span><i style="--lc:#2f5fe0"></i>营业收入</span><span><i style="--lc:#e8ae00"></i>营业利润</span><span><i style="--lc:#e5484d"></i>纯利润</span></div>
          </div>
        </div>
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>利润质量</h3><p>FY2026 关键比率</p></div></div>
          <div class="admin-card-body">
            <div class="ratio-grid" style="grid-template-columns:1fr 1fr">
              <div class="ratio-box"><span>营业利润率</span><b>${nf(opMargin, 2)}%</b><small>+1.37pp YoY</small></div>
              <div class="ratio-box"><span>净利率</span><b>${nf(netMargin, 2)}%</b><small>+7.84pp YoY</small></div>
              <div class="ratio-box"><span>ROE</span><b>${nf(roe, 2)}%</b><small>+5.08pp YoY</small></div>
              <div class="ratio-box"><span>权益比率</span><b>${nf(equityRatio, 2)}%</b><small>+7.85pp YoY</small></div>
            </div>
            <div style="margin-top:15px;padding-top:14px;border-top:1px solid var(--line)">${bars([{ name: "毛利率代理 · 营业利润率", value: Math.round(opMargin), color: "#2f5fe0" }, { name: "净利率", value: Math.round(netMargin), color: "#e5484d" }, { name: "权益比率", value: Math.round(equityRatio), color: "#1f9d78" }])}</div>
            <p style="font-size:8px;color:var(--muted);line-height:1.6;margin-top:12px">注：宝可梦公司未公开完整损益表，毛利率无法直接计算；此处以营业利润率作为经营效率参考。</p>
          </div>
        </div>
      </div>

      <div class="admin-card" style="margin-bottom:14px">
        <div class="admin-card-head"><div><h3>合并损益摘要</h3><p>第 26—28 期决算公告 · 单位：亿日元</p></div><span class="status-pill">官方公告</span></div>
        <div class="admin-card-body" style="padding-top:8px">
          ${dataTable([
            { label: "财年", render: r => `<span class="t-title">${r.year}</span><span class="t-sub">截至 ${r.end}</span>`, raw: true },
            { label: "营业收入", key: "revenue", num: true, render: r => nf(r.revenue, 2), raw: true },
            { label: "营业利润", key: "operating", num: true, render: r => nf(r.operating, 2), raw: true },
            { label: "经常利润", key: "ordinary", num: true, render: r => nf(r.ordinary, 2), raw: true },
            { label: "当期纯利润", key: "net", num: true, render: r => nf(r.net, 2), raw: true },
            { label: "营业利润率", num: true, render: r => nf(r.operating / r.revenue * 100, 2) + "%", raw: true },
            { label: "净利率", num: true, render: r => nf(r.net / r.revenue * 100, 2) + "%", raw: true }
          ], tableRows.map((r, i) => ({ ...r, end: ["2026-02-28", "2025-02-28", "2024-02-29", "2023-02-28", "2022-02-28"][i] })), { cls: "finance-table" })}
        </div>
      </div>

      <div class="admin-grid">
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>资产负债摘要</h3><p>单位：亿日元 · 决算公告</p></div></div>
          <div class="admin-card-body" style="padding-top:8px">
            ${dataTable([
              { label: "财年", render: r => `<span class="t-title">${r.year}</span>`, raw: true },
              { label: "总资产", num: true, render: r => nf(r.assets, 2), raw: true },
              { label: "股东权益", num: true, render: r => nf(r.equity, 2), raw: true },
              { label: "总负债", num: true, render: r => nf(r.liabilities, 2), raw: true },
              { label: "权益比率", num: true, render: r => nf(r.equity / r.assets * 100, 2) + "%", raw: true }
            ], tableRows, { cls: "finance-table" })}
            <p style="font-size:8px;color:var(--muted);margin-top:10px;line-height:1.6">总资产取自决算公告「総資産」。因公告口径含少数股东权益等科目，股东权益与总负债之和不完全等于总资产。</p>
          </div>
        </div>
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>业务结构（模拟）</h3><p>用于课堂讨论，非官方分部数据</p></div></div>
          <div class="admin-card-body">${donutData(F.segmentMix, "100%", "收入组合")}${bars(F.regions)}</div>
        </div>
      </div>

      <div class="two-col">
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>经营解读</h3><p>基于公开财务与模拟结构</p></div></div>
          <div class="admin-card-body">
            <div class="mini-list">
              <div class="mini-list-item"><span class="ml-rank top">1</span><span style="flex:1;font-size:9.5px;line-height:1.65"><b>营收连续五年增长。</b> FY2026 营收 5,314.28 亿日元，同比 +29.32%，在无全新正统作首发的年份仍创历史新高。</span></div>
              <div class="mini-list-item"><span class="ml-rank top">2</span><span style="flex:1;font-size:9.5px;line-height:1.65"><b>利润增速快于营收。</b> 营业利润同比 +42.90%，纯利润 +70.67%，反映授权、卡牌与数字业务的经营杠杆。</span></div>
              <div class="mini-list-item"><span class="ml-rank top">3</span><span style="flex:1;font-size:9.5px;line-height:1.65"><b>资产负债表稳健。</b> 股东权益 4,144.82 亿日元，权益比率 77.87%，为长期 IP 投资提供充足缓冲。</span></div>
            </div>
          </div>
        </div>
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>数据来源</h3><p>可核验的公开决算公告</p></div><span class="status-pill info">3 份</span></div>
          <div class="admin-card-body">
            <div class="source-list">
              <div class="source-item">${icon("external")}<div><b>第 28 期决算公告（FY2026）</b>截至 2026-02-28 · 营收 5,314.28 亿日元<br><a href="https://prtimes.com/finance/1010401079276/settlement/457798" target="_blank" rel="noopener">prtimes.com/finance/.../457798</a></div></div>
              <div class="source-item">${icon("external")}<div><b>第 27 期决算公告（FY2025）</b>截至 2025-02-28 · 营收 4,109.32 亿日元<br><a href="https://prtimes.com/finance/1010401079276/settlement/404251" target="_blank" rel="noopener">prtimes.com/finance/.../404251</a></div></div>
              <div class="source-item">${icon("external")}<div><b>第 26 期决算公告（FY2024）</b>截至 2024-02-29 · 营收 2,975.08 亿日元<br><a href="https://prtimes.com/finance/1010401079276/settlement/352473" target="_blank" rel="noopener">prtimes.com/finance/.../352473</a></div></div>
            </div>
            <p style="font-size:8px;color:var(--muted);line-height:1.6;margin-top:12px">财务数据仅用于课堂分析；不构成投资建议。宝可梦公司为非上市公司，部分业务分部数据未公开。</p>
          </div>
        </div>
      </div>`;
    $("[data-export-finance]")?.addEventListener("click", () => {
      const rows = [["财年", "决算末日", "营业收入(亿日元)", "营业利润(亿日元)", "经常利润(亿日元)", "纯利润(亿日元)", "总资产(亿日元)", "股东权益(亿日元)", "总负债(亿日元)"]];
      F.years.forEach(y => rows.push([y.year, y.year === "FY2026" ? "2026-02-28" : y.year === "FY2025" ? "2025-02-28" : y.year === "FY2024" ? "2024-02-29" : y.year === "FY2023" ? "2023-02-28" : "2022-02-28", y.revenue, y.operating, y.ordinary, y.net, y.assets, y.equity, y.liabilities]));
      downloadCSV("pokemon-company-financials-fy2022-fy2026.csv", rows);
    });
  }

  /* ---------- Settings ---------- */
  function renderSettings() {
    const s = window.PK.session();
    $("#section-settings").innerHTML = `
      ${pageHead("系统设置", "演示环境、权限与数据边界。", `
        <a class="admin-btn" href="architecture.html" target="_blank">${icon("layers")} 查看架构图</a>
        <button class="admin-btn primary" data-export-all>${icon("download")} 导出演示数据</button>`)}
      ${notice(`本站是纯前端静态网站：没有后端、数据库或真实登录服务。账号、购物车、收藏与订单均保存在浏览器 localStorage 中，仅用于课堂演示。`)}
      <div class="two-col">
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>运行环境</h3><p>当前系统边界</p></div><span class="status-pill">纯前端</span></div>
          <div class="admin-card-body">
            <div class="setting-row"><div><b>应用架构</b><span>静态 HTML / CSS / Vanilla JS</span></div><span class="status-pill info">静态托管</span></div>
            <div class="setting-row"><div><b>数据存储</b><span>localStorage（会话、购物车、收藏、订单）</span></div><span class="status-pill">浏览器</span></div>
            <div class="setting-row"><div><b>身份认证</b><span>前端硬编码演示账号，非生产级认证</span></div><span class="status-pill warn">演示</span></div>
            <div class="setting-row"><div><b>财务数据</b><span>宝可梦公司公开决算公告（只读）</span></div><span class="status-pill">已核验</span></div>
            <div class="setting-row"><div><b>经营数据</b><span>课堂模拟，不连接企业系统</span></div><span class="status-pill gray">模拟</span></div>
          </div>
        </div>
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>当前账号</h3><p>角色与权限</p></div></div>
          <div class="admin-card-body">
            <div style="display:flex;align-items:center;gap:12px;padding:4px 0 16px;border-bottom:1px solid var(--line)"><span class="topbar-avatar" style="width:46px;height:46px;font-size:17px">${esc((s && s.avatar) || "管")}</span><div><b style="font-size:14px">${esc((s && s.name) || "运营管理员")}</b><div style="font-size:9px;color:var(--muted)">${esc((s && s.email) || "admin@pokemonhub.cn")}</div></div><span class="status-pill" style="margin-left:auto">管理员</span></div>
            <div class="setting-row"><div><b>经营总览</b><span>查看全部业务指标</span></div><span class="status-pill">允许</span></div>
            <div class="setting-row"><div><b>财务中心</b><span>查看与导出公开财务数据</span></div><span class="status-pill">允许</span></div>
            <div class="setting-row"><div><b>会员隐私数据</b><span>演示环境不含真实个人信息</span></div><span class="status-pill warn">脱敏</span></div>
            <div style="display:flex;gap:8px;margin-top:15px;flex-wrap:wrap"><button class="admin-btn" onclick="window.PK.logout()">${icon("logout")} 退出管理者账号</button><a class="admin-btn" href="index.html">${icon("home")} 返回门户</a></div>
          </div>
        </div>
      </div>
      <div class="admin-grid">
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>演示账号与角色</h3><p>用于课堂演示的固定账号</p></div></div>
          <div class="admin-card-body" style="padding-top:8px">
            ${dataTable([
              { label: "角色", key: "role" }, { label: "账号", key: "account" }, { label: "密码", key: "password" }, { label: "可用范围", key: "scope" }
            ], [
              { role: "消费者", account: "trainer@pokemonhub.cn", password: "pikachu123", scope: "门户、收藏、购物车、订单" },
              { role: "管理者", account: "admin@pokemonhub.cn", password: "admin2026", scope: "全部经营看板与财务中心" }
            ])}
            <p style="font-size:8.5px;color:var(--muted);line-height:1.7;margin-top:10px">生产环境应使用 OAuth 2.0 / OIDC、服务端会话、RBAC、审计日志与多因素认证；当前实现仅为交互演示。</p>
          </div>
        </div>
        <div class="admin-card">
          <div class="admin-card-head"><div><h3>数据与重置</h3><p>本地演示数据管理</p></div></div>
          <div class="admin-card-body">
            <div style="font-size:9.5px;color:var(--muted);line-height:1.8">本设备上保存的键：<code style="font-size:8px;background:var(--bg);padding:2px 5px;border-radius:4px">pk_session</code>、<code style="font-size:8px;background:var(--bg);padding:2px 5px;border-radius:4px">pk_cart</code>、<code style="font-size:8px;background:var(--bg);padding:2px 5px;border-radius:4px">pk_orders</code>、<code style="font-size:8px;background:var(--bg);padding:2px 5px;border-radius:4px">pk_fav_*</code>。</div>
            <div style="display:grid;gap:8px;margin-top:15px">
              <button class="admin-btn" data-export-all>${icon("download")} 导出全部演示数据（JSON）</button>
              <button class="admin-btn" data-reset-demo style="color:var(--red);border-color:#f3c7c8">${icon("trash")} 清空本地演示数据</button>
            </div>
            <p style="font-size:8px;color:var(--muted);line-height:1.7;margin-top:11px">清空后，登录状态、购物车、收藏和订单将全部重置，但不会影响网站源代码。</p>
          </div>
        </div>
      </div>`;
    $("[data-reset-demo]")?.addEventListener("click", () => {
      window.PK.openModal(`<div style="padding:34px;max-width:460px;margin:0 auto;text-align:center"><div style="font-size:34px;margin-bottom:8px">⚠️</div><h2 style="font-size:21px">确认清空本地演示数据？</h2><p style="font-size:11.5px;color:var(--muted);line-height:1.8;margin-top:8px">登录状态、购物车、收藏与订单都会被删除，且无法恢复。</p><div style="display:flex;gap:8px;justify-content:center;margin-top:20px"><button class="admin-btn primary" id="confirmReset">确认清空</button><button class="admin-btn" onclick="window.PK.closeModal()">取消</button></div></div>`);
      $("#confirmReset")?.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "index.html";
      });
    });
  }

  function exportAll() {
    const snapshot = { exportedAt: new Date().toISOString(), site: "Pokémon Hub classroom demo", localStorage: {} };
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith("pk_")) snapshot.localStorage[k] = JSON.parse(localStorage.getItem(k));
    }
    snapshot.finance = F.years;
    downloadBlob("pokemon-hub-demo-data.json", JSON.stringify(snapshot, null, 2), "application/json");
  }

  /* ---------- Bind ---------- */
  function switchSection(key, push = true) {
    if (!OPS_CONFIG[key] && !["overview", "finance", "settings"].includes(key)) key = "overview";
    $$(".admin-nav button").forEach(b => b.classList.toggle("active", b.dataset.section === key));
    $$(".admin-section").forEach(s => s.classList.toggle("active", s.id === "section-" + key));
    const labels = { overview: "经营总览", finance: "财务中心", settings: "系统设置" };
    $("#adminBreadcrumb").textContent = labels[key] || (OPS_CONFIG[key] && OPS_CONFIG[key].title) || "经营总览";
    document.title = ($("#adminBreadcrumb").textContent) + " · Pokémon Hub Business OS";
    if (push) history.replaceState(null, "", "#" + key);
    window.scrollTo({ top: 0, behavior: push ? "smooth" : "auto" });
    $("#adminSidebar").classList.remove("open");
    $("#adminBackdrop").classList.remove("show");
    const q = $("#adminGlobalSearch");
    if (q) q.value = "";
    $$(".admin-section.active .admin-table tbody tr").forEach(tr => { tr.style.display = ""; });
  }

  function bindAdmin() {
    $$(".admin-nav button[data-section]").forEach(b => b.addEventListener("click", () => switchSection(b.dataset.section)));
    document.addEventListener("click", (e) => {
      const jump = e.target.closest("[data-section-jump]");
      if (jump) switchSection(jump.dataset.sectionJump);
      const exp = e.target.closest("[data-export-section]");
      if (exp) exportSection(exp.dataset.exportSection);
      if (e.target.closest("[data-export-finance]")) { /* bound in renderFinance */ }
      const all = e.target.closest("[data-export-all]");
      if (all) exportAll();
      if (e.target.closest("[data-print]")) { window.print(); window.PK.toast("已打开打印对话框，可另存为 PDF"); }
      if (e.target.closest("[data-refresh]")) {
        window.PK.toast("演示数据已刷新（本地模拟，无后端请求）");
      }
    });
    $("#adminMobileToggle")?.addEventListener("click", () => {
      $("#adminSidebar").classList.toggle("open");
      $("#adminBackdrop").classList.toggle("show");
    });
    $("#adminBackdrop")?.addEventListener("click", () => {
      $("#adminSidebar").classList.remove("open"); $("#adminBackdrop").classList.remove("show");
    });
    $("#adminNotify")?.addEventListener("click", () => {
      window.PK.openModal(`<div style="padding:30px 30px 32px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px"><h2 style="font-size:21px">运营提醒</h2><span class="status-pill warn">3 项待处理</span></div>
        <div class="activity-list">
          <div class="activity-item"><span class="act-icon" style="background:#fff6de;color:#a27700">${icon("package")}</span><div class="act-main"><b>库存预警：烈空坐 1/20 收藏模型</b><span>剩余 18 件，按当前速度预计 3 天售罄。</span></div><span class="act-time">12 分钟前</span></div>
          <div class="activity-item"><span class="act-icon" style="background:#e9efff;color:#2f5fe0">${icon("newspaper")}</span><div class="act-main"><b>待审核：宝可梦日 2027 专题</b><span>计划 11 月 20 日发布，等待品牌审核。</span></div><span class="act-time">1 小时前</span></div>
          <div class="activity-item"><span class="act-icon" style="background:#ffe9ea;color:#d53b40">${icon("cards")}</span><div class="act-main"><b>卡牌补货：超级进化—勇敢</b><span>售罄率 87.6%，建议追加生产 12 万盒。</span></div><span class="act-time">2 小时前</span></div>
          <div class="activity-item"><span class="act-icon">${icon("users")}</span><div class="act-main"><b>会员活动：沉默会员唤醒</b><span>目标人群 286 万，建议本周五发送。</span></div><span class="act-time">昨天</span></div>
        </div>
        <div style="display:flex;gap:8px;margin-top:18px"><button class="admin-btn primary" onclick="window.PK.closeModal();window.PK.toast('演示环境：提醒已标记为已读')">全部标为已读</button><button class="admin-btn" onclick="window.PK.closeModal()">关闭</button></div>
      </div>`);
    });
    $("#adminHelp")?.addEventListener("click", () => {
      window.PK.openModal(`<div style="padding:32px">
        <div style="font-size:9px;letter-spacing:.15em;color:var(--blue);font-weight:900">QUICK GUIDE</div>
        <h2 style="font-size:23px;margin-top:5px">经营驾驶舱使用说明</h2>
        <div style="display:grid;gap:12px;margin-top:16px">
          <div class="source-item">${icon("chart")}<div><b>经营总览</b>查看财务 KPI、五年趋势、业务结构与运营提醒。</div></div>
          <div class="source-item">${icon("layers")}<div><b>业务板块</b>左侧每个菜单对应门户的一个功能，展示该业务的经营指标、趋势与明细。</div></div>
          <div class="source-item">${icon("wallet")}<div><b>财务中心</b>可核验的 FY2022—FY2026 公开财务数据，可导出 CSV 或打印为 PDF。</div></div>
          <div class="source-item">${icon("download")}<div><b>导出</b>业务页导出当前明细；财务页导出完整财务表；设置页导出本地演示数据。</div></div>
        </div>
        <p style="font-size:9.5px;color:var(--muted);line-height:1.8;margin-top:16px">提示：侧边栏与内容支持键盘浏览；按 Esc 关闭弹窗。财务数据为真实公开公告，经营指标为模拟。</p>
        <button class="admin-btn primary" style="margin-top:16px" onclick="window.PK.closeModal()">开始使用</button>
      </div>`);
    });
    $("#adminAvatar")?.addEventListener("click", () => {
      const s = window.PK.session();
      window.PK.openModal(`<div style="padding:30px;max-width:420px;margin:0 auto;text-align:center">
        <span class="topbar-avatar" style="width:62px;height:62px;font-size:23px;margin:0 auto 12px">${esc((s && s.avatar) || "管")}</span>
        <h2 style="font-size:21px">${esc((s && s.name) || "运营管理员")}</h2>
        <p style="font-size:10px;color:var(--muted);margin-top:3px">${esc((s && s.email) || "admin@pokemonhub.cn")} · 超级管理员</p>
        <div style="display:grid;gap:8px;margin-top:20px"><a class="admin-btn" href="index.html">${icon("home")} 返回消费者门户</a><a class="admin-btn" href="architecture.html" target="_blank">${icon("layers")} 查看系统架构</a><button class="admin-btn" style="color:var(--red)" onclick="window.PK.logout()">${icon("logout")} 退出登录</button></div>
      </div>`);
    });
    $("#adminGlobalSearch")?.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      $$(".admin-section.active .admin-table tbody tr").forEach(tr => {
        tr.style.display = !q || tr.textContent.toLowerCase().includes(q) ? "" : "none";
      });
    });
    const initial = (location.hash || "#overview").slice(1);
    switchSection(initial, false);
  }

  function renderAll() {
    renderOverview();
    Object.keys(OPS_CONFIG).forEach(renderOps);
    renderFinance();
    renderSettings();
  }

  document.addEventListener("DOMContentLoaded", bootstrapAuth);
})();

