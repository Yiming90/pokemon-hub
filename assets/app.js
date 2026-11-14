/* =========================================================
   Pokémon Hub · Shared application shell
   No backend: session, cart, favorites and orders are stored
   in localStorage for demonstration purposes.
   ========================================================= */

(function () {
  "use strict";

  const DATA = window.POKEMON_HUB;
  const POKEDEX = window.POKEDEX || [];
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (str) => String(str == null ? "" : str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = (n) => "¥" + Number(n).toLocaleString("zh-CN");
  const storage = {
    get(key, fallback) {
      try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
      catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
    },
    remove(key) { try { localStorage.removeItem(key); } catch (e) { /* ignore */ } }
  };

  const ICONS = {
    pokeball: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h6M15 12h6"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    arrowUpRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
    heartFill: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.2v13.6L19 12 8 5.2Z"/></svg>',
    gamepad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 7h10a5 5 0 0 1 4.9 6l-.8 3.2a3 3 0 0 1-5.1 1.3L14.5 16h-5L8 17.5a3 3 0 0 1-5.1-1.3L2.1 13A5 5 0 0 1 7 7Z"/><path d="M7 11h4M9 9v4M16 10h.01M18 12h.01"/></svg>',
    cards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="3" width="12" height="16" rx="2"/><path d="M16 21H6a2 2 0 0 1-2-2V7"/><path d="m12 7 1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4L12 7Z"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16.5H6.5A2.5 2.5 0 0 0 4 22V5.5Z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M10 18h4"/></svg>',
    package: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m12 2 9 5v10l-9 5-9-5V7l9-5Z"/><path d="m3 7 9 5 9-5M12 12v10"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5M16 5a3 3 0 0 1 0 6M18 14.5c2.2.7 3.5 2.5 3.5 5"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V7M16 16v-7M20 16v-3"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 2 4 5.5V11c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5.5L12 2Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></svg>',
    devices: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="14" height="10" rx="1.5"/><path d="M6 18h6M9 14v4"/><rect x="18" y="9" width="4" height="11" rx="1"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4.5 4.5L19 6.5"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M4 21h16"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3L5.8 21 7 14.2 2 9.3l6.9-1L12 2Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.4-.4-5a2.7 2.7 0 0 0-1.9-1.9C19 4.7 12 4.7 12 4.7s-7 0-8.7.4A2.7 2.7 0 0 0 1.4 7C1 8.6 1 12 1 12s0 3.4.4 5a2.7 2.7 0 0 0 1.9 1.9c1.7.4 8.7.4 8.7.4s7 0 8.7-.4a2.7 2.7 0 0 0 1.9-1.9c.4-1.6.4-5 .4-5ZM9.8 15.5v-7l5.8 3.5-5.8 3.5Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-3.3 0-5 2.2-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.7.3-1 1-1Z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    trending: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9Z"/></svg>',
    mailOpen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9.5 12 4l9 5.5V20H3V9.5Z"/><path d="m3 10 9 6 9-6"/></svg>',
    sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/></svg>',
    swords: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 4 6-2-2 6L7 19l-3 1 1-3L14 4ZM14 10l4 4M4 4l6 6M3 21l3-3"/></svg>',
    logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 4H5v16h5M15 8l4 4-4 4M19 12H9"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m3 10 9-7 9 7v10H3V10Z"/><path d="M9 20v-6h6v6"/></svg>',
    newspaper: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h13v16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M17 7h3v11a2 2 0 0 1-2 2M7 8h7M7 12h7M7 16h4"/></svg>',
    film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M17 9h4M3 15h4M17 15h4"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4M12 13v4M8 21h8M9 17h6"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 9h18M16 14h2"/></svg>',
    database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7v5h-5M4 17v-5h5"/><path d="M6.1 8a7 7 0 0 1 11.6-2L20 8M4 16l2.3 2a7 7 0 0 0 11.6-2"/></svg>',
    filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',
    palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a9 9 0 1 0 0 18h1.5a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h4a5 5 0 0 0 0-10h-4Z"/><circle cx="7.5" cy="10.5" r="1" fill="currentColor"/><circle cx="9.5" cy="6.5" r="1" fill="currentColor"/><circle cx="14" cy="6.5" r="1" fill="currentColor"/></svg>'
  };

  const icon = (name) => ICONS[name] || ICONS.info;

  /* ---------------- Session ---------------- */
  const ACCOUNTS = {
    consumer: { email: "trainer@pokemonhub.cn", aliases: ["trainer", "trainer@pokemonhub.cn"], pass: "pikachu123", name: "小智", role: "consumer" },
    admin: { email: "admin@pokemonhub.cn", aliases: ["admin", "admin@pokemonhub.cn"], pass: "admin2026", name: "运营管理员", role: "admin" }
  };

  function session() { return storage.get("pk_session", null); }
  function setSession(user) { storage.set("pk_session", user); }
  function logout() {
    storage.remove("pk_session");
    toast("已安全退出登录");
    setTimeout(() => { window.location.href = "index.html"; }, 450);
  }

  function login(role, account, password) {
    const acc = ACCOUNTS[role];
    const okAccount = acc.aliases.includes(String(account).trim().toLowerCase()) || String(account).trim().toLowerCase() === acc.email;
    const okPass = String(password) === acc.pass;
    if (!okAccount || !okPass) return { ok: false, message: role === "admin" ? "管理员账号或密码不正确，请使用页面下方的演示账号。" : "账号或密码不正确，请使用演示账号快速体验。" };
    const old = session();
    const user = {
      role,
      name: acc.name,
      email: acc.email,
      loginAt: new Date().toISOString(),
      avatar: role === "admin" ? "管" : "智",
      memberNo: role === "consumer" ? (old && old.memberNo) || "PK-2026-000825" : "OPS-0001"
    };
    setSession(user);
    return { ok: true, user };
  }

  /* ---------------- Toast ---------------- */
  function toast(message, type = "success") {
    let stack = $(".toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "toast-stack";
      document.body.appendChild(stack);
    }
    const el = document.createElement("div");
    el.className = "toast" + (type === "error" ? " error" : "");
    el.innerHTML = `<span class="toast-icon">${icon(type === "error" ? "x" : "check")}</span><span>${esc(message)}</span>`;
    stack.appendChild(el);
    setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 280); }, 3000);
  }

  /* ---------------- Header ---------------- */
  const NAV = [
    { key: "news", label: "资讯", href: "news.html" },
    { key: "anime", label: "电视动画/电影", href: "anime.html" },
    { key: "goods", label: "商品", href: "goods.html" },
    { key: "apps", label: "应用程式", href: "apps.html" },
    { key: "games", label: "游戏", href: "games.html" },
    { key: "cards", label: "卡牌", href: "cards.html" }
  ];

  function userSlotMarkup() {
    const s = session();
    if (!s) {
      return `<button class="login-btn" data-login>${icon("user")}<span>登录</span></button>`;
    }
    return `<a class="user-chip" href="${s.role === "admin" ? "admin.html" : "account.html"}" title="${s.role === "admin" ? "进入管理者后台" : "进入个人中心"}">
      <span class="user-avatar">${esc(s.avatar || "?")}</span><span>${esc(s.name)}</span>
    </a>`;
  }

  function renderHeader() {
    const slot = $("#siteHeader");
    if (!slot) return;
    const page = document.body.dataset.page || "home";
    slot.innerHTML = `
      <div class="topline">
        <div class="container">
          <div class="topline-left">
            <span class="topline-badge">NEW</span>
            <p>宝可梦世界博览会 · 上海站 2026.12.04 — 12.07 ｜ 早鸟票现已开放</p>
            <a class="topline-link" href="news.html">查看详情 ${icon("arrow")}</a>
          </div>
          <div class="topline-right">
            <a href="architecture.html">系统架构</a>
            <a href="about.html">关于本站</a>
            <a href="admin.html">管理者入口</a>
          </div>
        </div>
      </div>
      <header class="site-header" id="stickyHeader">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="Pokémon Hub 首页">
            <span class="brand-mark"></span>
            <span class="brand-text"><span class="brand-name">Pokémon Hub</span><span class="brand-sub">宝可梦世界 · 官方风格门户</span></span>
          </a>
          <nav class="main-nav" aria-label="主导航">
            ${NAV.map(n => `<a class="nav-link ${page === n.key ? "active" : ""}" href="${n.href}">${n.label}</a>`).join("")}
          </nav>
          <div class="header-actions">
            <button class="icon-btn" aria-label="搜索" data-open-search>${icon("search")}</button>
            <a class="icon-btn cart-trigger" href="goods.html#cart" aria-label="购物袋">${icon("bag")}<span class="badge-count" id="cartBadge" style="display:none">0</span></a>
            <a class="pokedex-pill" href="pokedex.html">${icon("pokeball")}<span>宝可梦图鉴</span></a>
            <span id="userSlot">${userSlotMarkup()}</span>
            <button class="icon-btn mobile-toggle" aria-label="打开菜单" data-mobile-open>${icon("menu")}</button>
          </div>
        </div>
      </header>
      <div class="mobile-drawer" id="mobileDrawer">
        <div class="mobile-panel">
          <div class="mobile-head">
            <a class="brand" href="index.html"><span class="brand-mark"></span><span class="brand-text"><span class="brand-name">Pokémon Hub</span><span class="brand-sub">EXPLORE THE WORLD</span></span></a>
            <button class="icon-btn" data-mobile-close aria-label="关闭菜单">${icon("x")}</button>
          </div>
          <nav class="mobile-nav">
            ${NAV.map(n => `<a class="${page === n.key ? "active" : ""}" href="${n.href}">${n.label}<span>0${NAV.indexOf(n) + 1}</span></a>`).join("")}
            <a class="${page === "pokedex" ? "active" : ""}" href="pokedex.html">宝可梦图鉴<span>POKÉDEX</span></a>
            <a class="${page === "about" ? "active" : ""}" href="about.html">关于 / 系统架构<span>ABOUT</span></a>
          </nav>
          <div class="mobile-actions">
            ${session() ? `<a class="btn btn-primary" href="${session().role === "admin" ? "admin.html" : "account.html"}">${icon("user")} ${session().role === "admin" ? "进入经营驾驶舱" : esc(session().name) + "的个人中心"}</a><button class="btn btn-ghost" data-logout>退出登录</button>` : `<button class="btn btn-yellow" data-login>${icon("user")} 登录 / 注册</button>`}
            <a class="btn btn-ghost" href="admin.html">${icon("chart")} 管理者后台</a>
          </div>
        </div>
      </div>`;
  }

  function renderFooter() {
    const slot = $("#siteFooter");
    if (!slot) return;
    slot.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-top">
            <div class="footer-brand">
              <a class="brand" href="index.html"><span class="brand-mark"></span><span class="brand-text"><span class="brand-name">Pokémon Hub</span><span class="brand-sub">EXPLORE THE WORLD</span></span></a>
              <p>一个为课堂设计的信息系统作品：把资讯、动画、商品、应用、游戏与卡牌，装进同一个可探索的世界。</p>
              <div class="footer-social">
                <a href="https://www.youtube.com/@PokemonHongKong" target="_blank" rel="noopener" aria-label="YouTube">${icon("youtube")}</a>
                <a href="https://www.instagram.com/pokemon/" target="_blank" rel="noopener" aria-label="Instagram">${icon("instagram")}</a>
                <a href="https://www.facebook.com/Pokemon.Official.HongKong/" target="_blank" rel="noopener" aria-label="Facebook">${icon("facebook")}</a>
                <a href="mailto:hello@pokemonhub.demo" aria-label="邮件">${icon("mail")}</a>
              </div>
            </div>
            <div class="footer-col">
              <h4>探索</h4>
              <a href="news.html">最新资讯</a>
              <a href="anime.html">电视动画 / 电影</a>
              <a href="goods.html">官方商品</a>
              <a href="pokedex.html">宝可梦图鉴</a>
            </div>
            <div class="footer-col">
              <h4>体验</h4>
              <a href="apps.html">应用程式</a>
              <a href="games.html">游戏世界</a>
              <a href="cards.html">集换式卡牌</a>
              <a href="account.html">会员中心</a>
            </div>
            <div class="footer-col">
              <h4>关于</h4>
              <a href="about.html">关于本站</a>
              <a href="architecture.html">系统架构图</a>
              <a href="admin.html">管理者后台</a>
              <a href="downloads/Pokemon-Hub-Website.zip" download>下载完整代码 ZIP</a>
              <a href="README.md" download>使用说明</a>
            </div>
          </div>
          <div class="footer-bottom">
            <div>© 2026 Pokémon Hub · 课堂设计演示项目，非宝可梦官方网站。</div>
            <div class="legal-links"><a href="about.html#data">数据与引用</a><a href="about.html#privacy">隐私说明</a><a href="about.html#credits">版权声明</a></div>
          </div>
          <div class="footer-disclaimer">宝可梦、Pokémon 及相关名称与图像为 Nintendo / Creatures Inc. / GAME FREAK inc. 的商标与版权财产。本站仅用于课程作业与交互设计展示，不提供真实交易、票务或会员服务。</div>
        </div>
      </footer>`;
  }

  /* ---------------- Global overlays ---------------- */
  function ensureModal() {
    let el = $("#globalModal");
    if (!el) {
      el = document.createElement("div");
      el.id = "globalModal";
      el.className = "modal-backdrop";
      el.innerHTML = `<div class="modal" role="dialog" aria-modal="true"><button class="modal-close" aria-label="关闭">${icon("x")}</button><div class="modal-body" id="globalModalBody"></div></div>`;
      document.body.appendChild(el);
      el.addEventListener("click", (e) => { if (e.target === el) closeModal(); });
      $(".modal-close", el).addEventListener("click", closeModal);
    }
    return el;
  }
  function openModal(html, cls = "") {
    const el = ensureModal();
    const box = $(".modal", el);
    box.className = "modal " + cls;
    $("#globalModalBody").innerHTML = html;
    el.classList.add("open");
    document.body.classList.add("no-scroll");
    requestAnimationFrame(() => { const first = $("button, a, input", box); if (first) first.focus({ preventScroll: true }); });
  }
  function closeModal() {
    const el = $("#globalModal");
    if (el) el.classList.remove("open");
    if (!$("#cartDrawer.open") && !$("#loginBackdrop.open")) document.body.classList.remove("no-scroll");
  }

  function ensureLogin() {
    let el = $("#loginBackdrop");
    if (el) return el;
    el = document.createElement("div");
    el.id = "loginBackdrop";
    el.className = "modal-backdrop";
    el.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-label="登录 Pokémon Hub" style="max-width:900px">
        <button class="modal-close" aria-label="关闭登录">${icon("x")}</button>
        <div class="login-layout">
          <div class="login-art">
            <div class="la-brand"><span class="brand-mark"></span><span>Pokémon Hub</span></div>
            <div class="la-copy">
              <div class="la-kicker">WELCOME BACK, TRAINER</div>
              <h3>新的冒险<br>正在等你。</h3>
              <p>登录后可同步收藏、查看订单，并以管理者身份进入经营驾驶舱。</p>
            </div>
            <img class="la-img" src="assets/pokemon/25.webp" alt="皮卡丘">
          </div>
          <div class="login-panel">
            <h2>登录你的世界</h2>
            <p class="login-sub">选择身份进入对应空间。本演示不收集真实账号信息。</p>
            <div class="login-roles" role="tablist">
              <button class="login-role active" data-role="consumer" role="tab">${icon("user")} 消费者</button>
              <button class="login-role" data-role="admin" role="tab">${icon("chart")} 管理者</button>
            </div>
            <div class="login-error" id="loginError"></div>
            <form id="loginForm" novalidate>
              <div class="login-field">
                <label for="loginAccount">账号 / 邮箱</label>
                <div class="login-input">${icon("mail")}<input id="loginAccount" autocomplete="username" placeholder="trainer@pokemonhub.cn"></div>
              </div>
              <div class="login-field">
                <label for="loginPassword">密码</label>
                <div class="login-input">${icon("lock")}<input id="loginPassword" type="password" autocomplete="current-password" placeholder="请输入密码"></div>
              </div>
              <div class="login-row">
                <label class="checkbox"><input type="checkbox" checked> 保持登录状态</label>
                <a href="about.html#privacy" onclick="event.preventDefault();window.PK.toast('演示环境不提供找回密码服务。','error')">忘记密码？</a>
              </div>
              <button class="btn btn-primary btn-submit" type="submit" id="loginSubmit">登录消费者账户 ${icon("arrow")}</button>
            </form>
            <div class="login-demo" id="loginDemo">
              <b>消费者演示账号</b><br>
              trainer@pokemonhub.cn · pikachu123
              <button type="button" data-fill-demo>一键填入</button>
            </div>
            <p class="login-legal">继续即表示你同意本站的演示使用条款。本站为课堂作业，非宝可梦官方服务。</p>
          </div>
        </div>
      </div>`;
    document.body.appendChild(el);
    el.addEventListener("click", (e) => { if (e.target === el) closeLogin(); });
    $(".modal-close", el).addEventListener("click", closeLogin);

    let role = "consumer";
    const roleButtons = $$(".login-role", el);
    roleButtons.forEach(btn => btn.addEventListener("click", () => {
      role = btn.dataset.role;
      roleButtons.forEach(b => b.classList.toggle("active", b === btn));
      $("#loginError").classList.remove("show");
      $("#loginSubmit").innerHTML = (role === "admin" ? "登录管理者后台" : "登录消费者账户") + icon("arrow");
      $("#loginAccount").placeholder = role === "admin" ? "admin@pokemonhub.cn" : "trainer@pokemonhub.cn";
      $("#loginAccount").value = "";
      $("#loginPassword").value = "";
      $("#loginDemo").innerHTML = role === "admin"
        ? `<b>管理者演示账号</b><br>admin@pokemonhub.cn · admin2026 <button type="button" data-fill-demo>一键填入</button>`
        : `<b>消费者演示账号</b><br>trainer@pokemonhub.cn · pikachu123 <button type="button" data-fill-demo>一键填入</button>`;
      bindDemo();
    }));
    function bindDemo() {
      const btn = $("[data-fill-demo]", el);
      if (btn) btn.addEventListener("click", () => {
        $("#loginAccount").value = ACCOUNTS[role].email;
        $("#loginPassword").value = ACCOUNTS[role].pass;
      });
    }
    bindDemo();
    $("#loginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const res = login(role, $("#loginAccount").value, $("#loginPassword").value);
      if (!res.ok) {
        const err = $("#loginError");
        err.textContent = res.message;
        err.classList.add("show");
        return;
      }
      closeLogin();
      if (role === "admin") {
        toast("管理员身份验证成功，正在进入经营后台…");
        setTimeout(() => { window.location.href = "admin.html"; }, 500);
      } else {
        toast(`欢迎回来，${res.user.name}！`);
        refreshUserSlot();
        if (document.body.dataset.page === "account") setTimeout(() => window.location.reload(), 350);
      }
    });
    return el;
  }

  function openLogin(role = "consumer") {
    const el = ensureLogin();
    el.classList.add("open");
    document.body.classList.add("no-scroll");
    const btn = $(`.login-role[data-role="${role}"]`, el);
    if (btn) btn.click();
    setTimeout(() => { const input = $("#loginAccount"); if (input) input.focus(); }, 200);
  }
  function closeLogin() {
    const el = $("#loginBackdrop");
    if (el) el.classList.remove("open");
    if (!$("#globalModal.open") && !$("#cartDrawer.open")) document.body.classList.remove("no-scroll");
  }
  function refreshUserSlot() {
    const slot = $("#userSlot");
    if (slot) slot.innerHTML = userSlotMarkup();
  }

  /* ---------------- Search ---------------- */
  function ensureSearch() {
    let el = $("#searchOverlay");
    if (el) return el;
    el = document.createElement("div");
    el.id = "searchOverlay";
    el.className = "search-overlay";
    el.innerHTML = `
      <div class="search-modal">
        <div class="search-input-row">${icon("search")}<input id="globalSearchInput" placeholder="搜索资讯、宝可梦、商品、游戏…" autocomplete="off"><kbd>ESC</kbd></div>
        <div class="search-results" id="searchResults"></div>
      </div>`;
    document.body.appendChild(el);
    el.addEventListener("click", (e) => { if (e.target === el) closeSearch(); });
    $("#globalSearchInput").addEventListener("input", (e) => renderSearch(e.target.value));
    renderSearch("");
    return el;
  }
  function openSearch() {
    const el = ensureSearch();
    el.classList.add("open");
    document.body.classList.add("no-scroll");
    setTimeout(() => $("#globalSearchInput").focus(), 120);
  }
  function closeSearch() {
    const el = $("#searchOverlay");
    if (el) el.classList.remove("open");
    if (!$("#globalModal.open") && !$("#loginBackdrop.open") && !$("#cartDrawer.open")) document.body.classList.remove("no-scroll");
  }
  function renderSearch(q) {
    const query = String(q || "").trim().toLowerCase();
    const wrap = $("#searchResults");
    if (!wrap) return;
    const groups = [];
    if (!query) {
      groups.push({ label: "快速前往", items: [
        { title: "宝可梦图鉴", meta: "搜索全部精选宝可梦", href: "pokedex.html", icon: "pokeball" },
        { title: "最新资讯", meta: "查看世界锦标赛报道", href: "news.html", icon: "newspaper" },
        { title: "官方商品", meta: "冬日毛绒系列上新", href: "goods.html", icon: "bag" }
      ]});
    } else {
      const news = DATA.NEWS.filter(n => (n.title + n.excerpt + n.category).toLowerCase().includes(query)).slice(0, 4);
      if (news.length) groups.push({ label: "资讯", items: news.map(n => ({ title: n.title, meta: n.category + " · " + n.date, href: "article.html?id=" + n.id, img: n.image })) });
      const mons = POKEDEX.filter(p => (p.name + p.en + p.jp + p.typeCn.join("")).toLowerCase().includes(query)).slice(0, 5);
      if (mons.length) groups.push({ label: "宝可梦图鉴", items: mons.map(p => ({ title: p.name + " " + p.en, meta: p.no + " · " + p.typeCn.join(" / "), href: "pokedex.html?id=" + p.id, img: p.image })) });
      const prods = DATA.PRODUCTS.filter(p => (p.name + p.category + (p.styles || []).join("")).toLowerCase().includes(query)).slice(0, 4);
      if (prods.length) groups.push({ label: "商品 / 卡牌", items: prods.map(p => ({ title: p.name, meta: money(p.price) + " · " + p.category, href: (p.channel === "card" ? "cards.html?product=" : "goods.html?product=") + p.id, img: p.image })) });
      const games = DATA.GAMES.filter(g => (g.name + g.genre).toLowerCase().includes(query)).slice(0, 3);
      if (games.length) groups.push({ label: "游戏", items: games.map(g => ({ title: g.name, meta: g.year + " · " + g.platform, href: "games.html?q=" + encodeURIComponent(g.name), img: g.image })) });
    }
    if (!groups.length) {
      wrap.innerHTML = `<div class="search-empty">没有找到「${esc(q)}」相关结果。<br>试试「皮卡丘」「卡牌」或「毛绒」。</div>`;
      return;
    }
    wrap.innerHTML = groups.map(g => `
      <div class="search-group-label">${esc(g.label)}</div>
      ${g.items.map(it => `<a class="search-result" href="${it.href}">
        <span class="sr-icon">${it.img ? `<img src="${it.img}" alt="">` : icon(it.icon || "search")}</span>
        <span><b>${esc(it.title)}</b><span>${esc(it.meta)}</span></span>
      </a>`).join("")}`).join("");
  }

  /* ---------------- Cart ---------------- */
  let cartPromo = false;
  const getCart = () => storage.get("pk_cart", []);
  const setCart = (cart) => { storage.set("pk_cart", cart); updateCartBadge(); renderCart(); };
  const findProduct = (id) => DATA.PRODUCTS.find(p => p.id === id);
  function cartCount() { return getCart().reduce((s, i) => s + i.qty, 0); }
  function cartTotal() {
    const total = getCart().reduce((sum, item) => {
      const p = findProduct(item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
    return cartPromo ? Math.round(total * 0.9) : total;
  }
  function updateCartBadge() {
    const badge = $("#cartBadge");
    if (!badge) return;
    const n = cartCount();
    badge.textContent = n > 99 ? "99+" : n;
    badge.style.display = n ? "flex" : "none";
  }
  function addToCart(id, qty = 1, style = "") {
    const product = findProduct(id);
    if (!product) return;
    const chosen = style || (product.styles && product.styles[0]) || "标准款";
    const cart = getCart();
    const hit = cart.find(i => i.id === id && (i.style || (product.styles && product.styles[0]) || "标准款") === chosen);
    if (hit) hit.qty = Math.min(99, hit.qty + qty); else cart.push({ id, qty, style: chosen });
    setCart(cart);
    toast(`已将「${product.name} · ${chosen}」加入购物袋`);
    const drawer = $("#cartDrawer");
    if (drawer && !drawer.classList.contains("open")) {
      const badge = $("#cartBadge");
      if (badge) { badge.animate([{ transform: "scale(1)" }, { transform: "scale(1.55)" }, { transform: "scale(1)" }], { duration: 380, easing: "ease-out" }); }
    }
  }
  function ensureCart() {
    let el = $("#cartDrawer");
    if (el) return el;
    el = document.createElement("div");
    el.id = "cartDrawer";
    el.className = "cart-drawer";
    el.innerHTML = `
      <div class="cart-panel">
        <div class="cart-head">
          <div><h3>购物袋</h3><span class="cart-count-label" id="cartHeadCount">0 件商品</span></div>
          <button class="icon-btn" data-cart-close aria-label="关闭购物袋">${icon("x")}</button>
        </div>
        <div class="cart-items" id="cartItems"></div>
        <div class="cart-foot" id="cartFoot"></div>
      </div>`;
    document.body.appendChild(el);
    el.addEventListener("click", (e) => { if (e.target === el) closeCart(); });
    $("[data-cart-close]", el).addEventListener("click", closeCart);
    el.addEventListener("click", (e) => {
      const plus = e.target.closest("[data-qty-plus]");
      const minus = e.target.closest("[data-qty-minus]");
      const remove = e.target.closest("[data-remove]");
      if (plus) changeQty(Number(plus.dataset.qtyPlus), 1);
      if (minus) changeQty(Number(minus.dataset.qtyMinus), -1);
      if (remove) removeItem(Number(remove.dataset.remove));
    });
    return el;
  }
  function openCart() {
    ensureCart();
    renderCart();
    $("#cartDrawer").classList.add("open");
    document.body.classList.add("no-scroll");
  }
  function closeCart() {
    const el = $("#cartDrawer");
    if (el) el.classList.remove("open");
    if (!$("#globalModal.open") && !$("#loginBackdrop.open")) document.body.classList.remove("no-scroll");
  }
  function changeQty(index, delta) {
    let cart = getCart();
    const item = cart[index];
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter((_, i) => i !== index);
    setCart(cart);
  }
  function removeItem(index) {
    setCart(getCart().filter((_, i) => i !== index));
    toast("已从购物袋移除");
  }
  function renderCart() {
    const items = $("#cartItems");
    if (!items) return;
    const cart = getCart();
    const head = $("#cartHeadCount");
    if (head) head.textContent = cartCount() + " 件商品";
    if (!cart.length) {
      items.innerHTML = `<div class="cart-empty"><div class="ce-icon">${icon("bag")}</div><b>购物袋还是空的</b><p>去商品页挑选一件喜欢的宝可梦周边吧。</p><a class="btn btn-primary btn-sm" style="margin-top:16px" href="goods.html">去逛逛</a></div>`;
    } else {
      items.innerHTML = cart.map((item, index) => {
        const p = findProduct(item.id);
        if (!p) return "";
        const lineStyle = item.style || (p.styles && p.styles[0]) || "标准款";
        return `<div class="cart-item">
          <div class="ci-art tint-${p.tint}"><img src="${p.image}" alt="${esc(p.name)}"></div>
          <div>
            <h4>${esc(p.name)}</h4>
            <div class="ci-style">款式：${esc(lineStyle)}</div>
            <div class="ci-price">${money(p.price)}</div>
            <div class="qty-control"><button data-qty-minus="${index}" aria-label="减少数量">−</button><span>${item.qty}</span><button data-qty-plus="${index}" aria-label="增加数量">+</button></div>
          </div>
          <button class="ci-remove" data-remove="${index}" aria-label="移除">${icon("trash")}</button>
        </div>`;
      }).join("");
    }
    const foot = $("#cartFoot");
    if (!foot) return;
    if (!cart.length) { foot.innerHTML = `<p class="cart-note-small">演示站点不产生真实交易</p>`; return; }
    const subtotal = cart.reduce((sum, i) => sum + (findProduct(i.id)?.price || 0) * i.qty, 0);
    foot.innerHTML = `
      <div class="cart-promo"><input id="promoInput" placeholder="输入优惠码 PIKA10"><button data-apply-promo>使用</button></div>
      <div class="cart-subtotal"><span>小计${cartPromo ? "（已享 9 折）" : ""}</span><strong>${money(cartTotal())}</strong></div>
      ${cartPromo ? `<div style="font-size:9px;color:var(--green);margin-top:3px">已优惠 ${money(Math.round(subtotal * 0.1))}</div>` : ""}
      <button class="btn btn-primary" data-checkout>${icon("bag")} 去结算</button>
      <p class="cart-note-small">演示站点 · 不产生真实交易 · 支持 7 天无理由退货</p>`;
    $("[data-apply-promo]", foot).addEventListener("click", () => {
      const code = ($("#promoInput").value || "").trim().toUpperCase();
      if (code === "PIKA10") { cartPromo = true; toast("优惠码已生效：全场 9 折"); renderCart(); }
      else toast("优惠码无效，试试 PIKA10", "error");
    });
    $("[data-checkout]", foot).addEventListener("click", checkout);
  }
  function checkout() {
    if (!getCart().length) return;
    const s = session();
    if (!s) {
      closeCart();
      openLogin("consumer");
      toast("登录后即可完成演示结算", "error");
      return;
    }
    if (s.role === "admin") {
      toast("管理者账号不参与消费者下单，请使用消费者账号。", "error");
      return;
    }
    const items = getCart().map(i => ({ ...i, ...findProduct(i.id) }));
    const total = cartTotal();
    const order = {
      no: "PK" + String(Date.now()).slice(-10),
      date: new Date().toISOString(),
      items: items.map(i => ({ id: i.id, name: i.name, qty: i.qty, style: i.style || "标准款", price: i.price, image: i.image, tint: i.tint })),
      total,
      status: "待发货"
    };
    const orders = storage.get("pk_orders", []);
    orders.unshift(order);
    storage.set("pk_orders", orders);
    setCart([]);
    cartPromo = false;
    closeCart();
    openModal(`
      <div style="padding:44px 38px;text-align:center;max-width:520px;margin:0 auto">
        <div style="width:64px;height:64px;border-radius:50%;background:var(--green-soft);color:var(--green);display:grid;place-items:center;margin:0 auto 16px">${icon("check")}</div>
        <h2 style="font-size:24px;letter-spacing:-.03em">订单创建成功</h2>
        <p style="font-size:12px;color:var(--muted);margin-top:7px;line-height:1.8">订单号 <b>${order.no}</b><br>这是课堂演示订单，不会产生真实支付或物流。</p>
        <div style="display:flex;gap:8px;justify-content:center;margin-top:22px"><a class="btn btn-primary btn-sm" href="account.html">查看我的订单</a><button class="btn btn-ghost btn-sm" onclick="window.PK.closeModal()">继续逛逛</button></div>
      </div>`);
    toast("演示订单已创建");
  }

  /* ---------------- Pokedex helpers ---------------- */
  const typeCnMap = { normal: "一般", fire: "火", water: "水", electric: "电", grass: "草", ice: "冰", fighting: "格斗", poison: "毒", ground: "地面", flying: "飞行", psychic: "超能力", bug: "虫", rock: "岩石", ghost: "幽灵", dragon: "龙", dark: "恶", steel: "钢", fairy: "妖精" };
  const typeBadge = (t) => `<span class="type-badge type-${t}">${typeCnMap[t] || t}</span>`;
  const getFavMons = () => storage.get("pk_fav_pokemon", []);
  const getFavProducts = () => storage.get("pk_fav_products", []);
  function toggleFavMon(id) {
    let favs = getFavMons();
    const has = favs.includes(id);
    favs = has ? favs.filter(x => x !== id) : favs.concat(id);
    storage.set("pk_fav_pokemon", favs);
    toast(has ? "已取消收藏" : "已加入收藏");
    return !has;
  }
  function openPokemon(id) {
    const p = POKEDEX.find(x => x.id === Number(id));
    if (!p) return;
    const fav = getFavMons().includes(p.id);
    const idx = POKEDEX.findIndex(x => x.id === p.id);
    const prev = POKEDEX[(idx - 1 + POKEDEX.length) % POKEDEX.length];
    const next = POKEDEX[(idx + 1) % POKEDEX.length];
    const stats = Object.entries(p.stats).map(([k, v]) => `<div class="pdx-stat"><span class="lbl">${k}</span><span class="bar"><span style="width:${Math.min(100, Math.round(v / 180 * 100))}%;background:var(--type-color)"></span></span><b>${v}</b></div>`).join("");
    openModal(`
      <div class="pdx-detail type-${p.types[0]}">
        <div class="pdx-detail-art">
          <span class="pdx-no-big">${p.no}</span>
          <img src="${p.image}" alt="${esc(p.name)}">
          <span class="pdx-gen">${p.genName} · ${p.genus}</span>
        </div>
        <div class="pdx-detail-info">
          <div class="pdx-en">${esc(p.en)} · ${esc(p.jp)}</div>
          <h2>${esc(p.name)}</h2>
          <div class="pdx-jp">全国图鉴 ${p.no} ｜ ${p.genus}</div>
          <div class="pdx-badges">${p.types.map(typeBadge).join("")}</div>
          <p class="pdx-desc">${esc(p.desc)}</p>
          <div class="pdx-facts">
            <div class="pdx-fact"><span>身高</span><b>${p.height} m</b></div>
            <div class="pdx-fact"><span>体重</span><b>${p.weight} kg</b></div>
            <div class="pdx-fact"><span>特性</span><b>${esc((p.abilitiesCn && p.abilitiesCn.length ? p.abilitiesCn : p.abilities).join(" / ") || "未知")}</b></div>
          </div>
          <div class="pdx-stats">${stats}</div>
          <div class="pdx-total"><span>种族值总和 <small style="color:var(--muted)">（基础）</small></span><b>${p.total}</b></div>
          <div class="pdx-nav">
            <button class="btn btn-ghost btn-sm" data-pdx-prev="${prev.id}">← ${esc(prev.name)}</button>
            <button class="btn ${fav ? "btn-ghost" : "btn-yellow"} btn-sm" data-pdx-fav="${p.id}">${fav ? "已收藏" : "收藏这只宝可梦"}</button>
            <button class="btn btn-ghost btn-sm" data-pdx-next="${next.id}">${esc(next.name)} →</button>
          </div>
        </div>
      </div>`);
    $("[data-pdx-prev]").addEventListener("click", (e) => openPokemon(e.currentTarget.dataset.pdxPrev));
    $("[data-pdx-next]").addEventListener("click", (e) => openPokemon(e.currentTarget.dataset.pdxNext));
    $("[data-pdx-fav]").addEventListener("click", (e) => {
      const now = toggleFavMon(p.id);
      e.currentTarget.textContent = now ? "已收藏" : "收藏这只宝可梦";
      e.currentTarget.className = "btn " + (now ? "btn-ghost" : "btn-yellow") + " btn-sm";
      try { history.replaceState(null, "", "pokedex.html?id=" + p.id); } catch (err) {}
      $$(".pc-fav[data-pokemon='" + p.id + "']").forEach(b => { b.classList.toggle("active", now); b.innerHTML = now ? icon("heartFill") : icon("heart"); });
    });
    try { history.replaceState(null, "", "pokedex.html?id=" + p.id); } catch (err) {}
  }

  function openProduct(id) {
    const p = findProduct(id);
    if (!p) return;
    const fav = getFavProducts().includes(p.id);
    let selectedStyle = (p.styles && p.styles[0]) || "标准款";
    openModal(`
      <div class="product-detail">
        <div class="pd-art tint-${p.tint}"><img src="${p.image}" alt="${esc(p.name)}"></div>
        <div class="pd-info">
          <div class="product-cat">${esc(p.category)}</div>
          <h2>${esc(p.name)}</h2>
          <div class="pd-rating"><span class="stars">★★★★★</span> ${p.rating} · 已售 ${p.sold.toLocaleString()}</div>
          <div class="pd-price">${money(p.price)} <small>${p.oldPrice ? `<span style="text-decoration:line-through;color:var(--muted-2)">${money(p.oldPrice)}</span>` : ""}</small></div>
          <p class="pd-desc">${esc(p.desc)}</p>
          <div class="style-picker"><span class="style-label">款式</span><div class="style-options">${(p.styles || ["标准款"]).map((s, i) => `<button class="style-option ${i === 0 ? "active" : ""}" data-style="${esc(s)}">${esc(s)}</button>`).join("")}</div></div>
          <div class="pd-specs"><div><b>库存</b>${p.stock} 件</div><div><b>发货</b>48 小时内</div><div><b>保障</b>7 天无理由</div></div>
          <div class="pd-actions">
            <button class="btn btn-primary" data-modal-add="${p.id}">${icon("bag")} 加入购物袋 · ${esc(selectedStyle)}</button>
            <button class="btn btn-ghost" data-modal-fav="${p.id}">${icon(fav ? "heartFill" : "heart")} ${fav ? "已收藏" : "收藏"}</button>
          </div>
        </div>
      </div>`);
    $$(".style-option").forEach(btn => btn.addEventListener("click", () => {
      selectedStyle = btn.dataset.style;
      $$(".style-option").forEach(b => b.classList.toggle("active", b === btn));
      $("[data-modal-add]").innerHTML = icon("bag") + " 加入购物袋 · " + esc(selectedStyle);
    }));
    $("[data-modal-add]").addEventListener("click", () => { addToCart(p.id, 1, selectedStyle); closeModal(); openCart(); });
    $("[data-modal-fav]").addEventListener("click", (e) => {
      let favs = getFavProducts();
      const has = favs.includes(p.id);
      favs = has ? favs.filter(x => x !== p.id) : favs.concat(p.id);
      storage.set("pk_fav_products", favs);
      toast(has ? "已取消收藏" : "已加入收藏");
      e.currentTarget.innerHTML = icon(has ? "heart" : "heartFill") + (has ? " 收藏" : " 已收藏");
    });
  }

  /* ---------------- Global listeners ---------------- */
  function bindGlobal() {
    document.addEventListener("click", (e) => {
      const loginBtn = e.target.closest("[data-login]");
      if (loginBtn) { e.preventDefault(); openLogin(loginBtn.dataset.login || "consumer"); return; }
      const openSearchBtn = e.target.closest("[data-open-search]");
      if (openSearchBtn) { e.preventDefault(); openSearch(); return; }
      const mobileOpen = e.target.closest("[data-mobile-open]");
      if (mobileOpen) { $("#mobileDrawer")?.classList.add("open"); document.body.classList.add("no-scroll"); return; }
      const mobileClose = e.target.closest("[data-mobile-close]");
      if (mobileClose) { $("#mobileDrawer")?.classList.remove("open"); document.body.classList.remove("no-scroll"); return; }
      const logoutBtn = e.target.closest("[data-logout]");
      if (logoutBtn) { e.preventDefault(); logout(); return; }
      const cartTrigger = e.target.closest(".cart-trigger");
      if (cartTrigger) {
        e.preventDefault(); openCart();
      }
      if (e.target.closest("#mobileDrawer") && e.target.id === "mobileDrawer") { $("#mobileDrawer")?.classList.remove("open"); document.body.classList.remove("no-scroll"); }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal(); closeLogin(); closeSearch();
        $("#mobileDrawer")?.classList.remove("open");
        closeCart();
        document.body.classList.remove("no-scroll");
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); openSearch();
      }
    });
    window.addEventListener("scroll", () => {
      const header = $("#stickyHeader");
      if (header) header.classList.toggle("scrolled", window.scrollY > 8);
    }, { passive: true });

    // reveal on scroll
    const io = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: .08, rootMargin: "0px 0px -30px" }) : null;
    $$(".reveal").forEach(el => io ? io.observe(el) : el.classList.add("in"));
    // Safety net: content must never stay invisible if an observer is missed.
    setTimeout(() => $$(".reveal:not(.in)").forEach(el => el.classList.add("in")), 2600);

    updateCartBadge();
    if (window.location.hash === "#cart") setTimeout(openCart, 300);
  }

  /* ---------------- Page: home ---------------- */
  function initHome() {
    const featured = DATA.NEWS.find(n => n.featured) || DATA.NEWS[0];
    const lead = $("#newsLead");
    if (lead) {
      lead.href = "article.html?id=" + featured.id;
      lead.innerHTML = `
        <div class="lead-art"><img src="${featured.image}" alt=""></div>
        <div class="lead-overlay"></div>
        <div class="lead-body">
          <div class="lead-meta"><span class="tag">${esc(featured.category)}</span><span>${featured.date.replace(/-/g, ".")}</span><span>·</span><span>${featured.read}阅读</span></div>
          <h3>${esc(featured.title)}</h3>
          <p>${esc(featured.excerpt)}</p>
          <div class="lead-footer"><span class="read-link">阅读完整报道 ${icon("arrow")}</span><span style="font-size:9px;color:rgba(255,255,255,.5)">${esc(featured.author)}</span></div>
        </div>`;
    }
    const quick = $("#newsQuick");
    if (quick) {
      quick.innerHTML = DATA.NEWS.filter(n => !n.featured).slice(0, 5).map(n => `
        <a class="news-item" href="article.html?id=${n.id}">
          <span class="thumb tint-${n.tint}"><img src="${n.image}" alt=""></span>
          <div><div class="meta"><span class="cat">${esc(n.category)}</span><span>${n.date}</span></div><h4>${esc(n.title)}</h4><p>${esc(n.excerpt)}</p></div>
        </a>`).join("");
    }
    const pdxHome = $("#pokedexHomeGrid");
    if (pdxHome) {
      const picks = [25, 133, 94, 448, 700, 1008].map(id => POKEDEX.find(p => p.id === id)).filter(Boolean);
      pdxHome.innerHTML = picks.map(p => `
        <a class="mini-poke type-${p.types[0]}" href="pokedex.html?id=${p.id}" style="background:linear-gradient(145deg,#fff,var(--type-soft))">
          <span class="mp-no">${p.no}</span><img src="${p.image}" alt="${esc(p.name)}">
          <b>${esc(p.name)}</b><span>${p.typeCn.join(" · ")}</span>
        </a>`).join("");
    }
    const prod = $("#homeProducts");
    if (prod) {
      prod.innerHTML = DATA.PRODUCTS.slice(0, 4).map(productCardHtml).join("");
      bindProductCards(prod);
    }
    const apps = $("#homeApps");
    if (apps) apps.innerHTML = DATA.APPS.slice(0, 3).map(appCardHtml).join("");
    const games = $("#homeGames");
    if (games) games.innerHTML = DATA.GAMES.slice(0, 3).map(gameCardHtml).join("");
    const counts = $$("[data-count]");
    const countIO = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target, end = Number(el.dataset.count), suffix = el.dataset.suffix || "";
        let start = 0, t0 = null;
        const tick = (t) => {
          if (!t0) t0 = t;
          const p = Math.min(1, (t - t0) / 900), ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * ease).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick); countIO.unobserve(el);
      });
    }, { threshold: .5 }) : null;
    counts.forEach(el => countIO ? countIO.observe(el) : el.textContent = Number(el.dataset.count).toLocaleString() + (el.dataset.suffix || ""));
    const newsletter = $("#newsletterForm");
    if (newsletter) newsletter.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = $("input", newsletter);
      if (!input || !input.value.trim()) return;
      toast("订阅成功！这是演示环境，不会真实发送邮件。");
      newsletter.reset();
    });
  }

  /* ---------------- Shared cards ---------------- */
  function productCardHtml(p) {
    const fav = getFavProducts().includes(p.id);
    return `<article class="product-card" data-product-card="${p.id}">
      <div class="product-art tint-${p.tint}">
        <a href="goods.html?product=${p.id}" data-product-open="${p.id}" aria-label="${esc(p.name)}"><img src="${p.image}" alt="${esc(p.name)}" loading="lazy"></a>
        ${p.tag ? `<span class="product-tag">${esc(p.tag)}</span>` : ""}
        <button class="fav-btn ${fav ? "active" : ""}" data-product-fav="${p.id}" aria-label="收藏">${icon(fav ? "heartFill" : "heart")}</button>
      </div>
      <div class="product-body">
        <div class="product-cat">${esc(p.category)}</div>
        <h3><a href="goods.html?product=${p.id}" data-product-open="${p.id}">${esc(p.name)}</a></h3>
        <div class="product-rating"><span class="stars">★★★★★</span> ${p.rating} · 已售 ${p.sold.toLocaleString()}</div>
        <div class="product-style-count">${(p.styles || ["标准款"]).length} 种款式可选</div>
        <div class="product-foot"><div class="price"><small>¥</small>${p.price}${p.oldPrice ? `<span class="old">${money(p.oldPrice)}</span>` : ""}</div><button class="add-cart" data-add-cart="${p.id}" aria-label="加入购物袋">${icon("plus")}</button></div>
      </div>
    </article>`;
  }
  function appCardHtml(a) {
    return `<a class="app-card" href="apps.html?app=${a.id}" data-app-open="${a.id}">
      <div class="app-top"><span class="app-icon" style="background:${a.color}"><img src="${a.image}" alt=""></span><div><h3>${esc(a.name)}</h3><div class="app-cat">${esc(a.category)}</div></div></div>
      <p>${esc(a.desc)}</p>
      <div class="app-meta"><span class="rating">★ ${a.rating}</span><span>${esc(a.downloads)} 下载</span><div class="app-platforms">${a.platforms.map(x => `<span>${x}</span>`).join("")}</div></div>
    </a>`;
  }
  function gameCardHtml(g) {
    return `<article class="game-card">
      <a class="game-cover tint-${g.tint}" href="games.html?game=${g.id}" data-game-open="${g.id}"><span class="year">${g.year}</span><img src="${g.image}" alt="${esc(g.name)}" loading="lazy"></a>
      <div class="game-body"><div class="platform">${esc(g.platform)}</div><h3><a href="games.html?game=${g.id}" data-game-open="${g.id}">${esc(g.name)}</a></h3><p>${esc(g.desc)}</p>
      <div class="game-bottom"><span class="genre">${esc(g.genre)}</span><span>${g.year}</span></div></div>
    </article>`;
  }
  function bindProductCards(root) {
    $$("[data-add-cart]", root).forEach(btn => btn.addEventListener("click", (e) => { e.preventDefault(); addToCart(btn.dataset.addCart); }));
    $$("[data-product-fav]", root).forEach(btn => btn.addEventListener("click", (e) => {
      e.preventDefault();
      let favs = getFavProducts(); const id = btn.dataset.productFav;
      const has = favs.includes(id); favs = has ? favs.filter(x => x !== id) : favs.concat(id);
      storage.set("pk_fav_products", favs);
      btn.classList.toggle("active", !has); btn.innerHTML = icon(!has ? "heartFill" : "heart");
      toast(has ? "已取消收藏" : "已加入收藏");
    }));
    $$("[data-product-open]", root).forEach(a => a.addEventListener("click", (e) => {
      if (["goods", "cards"].includes(document.body.dataset.page)) { e.preventDefault(); openProduct(a.dataset.productOpen); }
    }));
  }

  /* ---------------- Page: news ---------------- */
  function initNews() {
    const cats = ["全部", ...Array.from(new Set(DATA.NEWS.map(n => n.category)))];
    let active = "全部", q = "", shown = 6;
    const chips = $("#newsChips");
    if (chips) chips.innerHTML = cats.map(c => `<button class="chip ${c === "全部" ? "active" : ""}" data-cat="${c}">${c}${c === "全部" ? `<span class="count">${DATA.NEWS.length}</span>` : `<span class="count">${DATA.NEWS.filter(n => n.category === c).length}</span>`}</button>`).join("");
    const render = () => {
      let list = DATA.NEWS.filter(n => (active === "全部" || n.category === active) && (!q || (n.title + n.excerpt + n.tags.join("")).toLowerCase().includes(q.toLowerCase())));
      const grid = $("#newsGrid");
      if (!grid) return;
      grid.innerHTML = list.length ? list.slice(0, shown).map(n => `
        <a class="article-card reveal in" href="article.html?id=${n.id}">
          <div class="article-art tint-${n.tint}"><span class="cat-floating">${esc(n.category)}</span><img src="${n.image}" alt="" loading="lazy"></div>
          <div class="article-body"><div class="article-meta"><span>${n.date.replace(/-/g, ".")}</span><span class="dot"></span><span>${n.read}阅读</span></div><h3>${esc(n.title)}</h3><p>${esc(n.excerpt)}</p><div class="article-foot"><span>${esc(n.author)}</span><span class="read">阅读 ${icon("arrow")}</span></div></div>
        </a>`).join("") : `<div class="empty-state"><div class="empty-icon">🔍</div><b>没有找到相关资讯</b><p style="font-size:12px;margin-top:4px">换一个关键词或分类试试。</p></div>`;
      const count = $("#newsCount"); if (count) count.textContent = list.length;
      const more = $("#newsLoadMore");
      if (more) more.style.display = shown < list.length ? "inline-flex" : "none";
    };
    chips?.addEventListener("click", (e) => {
      const b = e.target.closest("[data-cat]"); if (!b) return;
      active = b.dataset.cat; shown = 6;
      $$(".chip", chips).forEach(c => c.classList.toggle("active", c === b));
      render();
    });
    $("#newsSearch")?.addEventListener("input", (e) => { q = e.target.value; shown = 6; render(); });
    $("#newsLoadMore")?.addEventListener("click", () => { shown += 6; render(); });
    render();
    const tab = new URLSearchParams(location.search).get("cat");
    if (tab) { const b = $(`[data-cat="${tab}"]`); if (b) b.click(); }
  }

  /* ---------------- Page: article ---------------- */
  function initArticle() {
    const id = new URLSearchParams(location.search).get("id") || DATA.NEWS[0].id;
    const n = DATA.NEWS.find(x => x.id === id) || DATA.NEWS[0];
    document.title = n.title + " · Pokémon Hub";
    const hero = $("#articleHero");
    if (hero) hero.innerHTML = `
      <div class="container">
        <div class="breadcrumb"><a href="index.html">首页</a>${icon("chevron")}<a href="news.html">资讯</a>${icon("chevron")}<span>${esc(n.category)}</span></div>
        <div class="article-cat"><span class="tag">${esc(n.category)}</span><span style="font-size:10px;color:var(--muted)">${n.date.replace(/-/g, ".")} · ${n.read}阅读</span></div>
        <h1>${esc(n.title)}</h1>
        <div class="article-byline"><span class="author"><span>${esc(n.author.slice(0, 1))}</span>${esc(n.author)}</span><span>·</span><span>${n.date}</span><span>·</span><span>${n.tags.map(t => "#" + t).join("  ")}</span></div>
      </div>`;
    const content = $("#articleContent");
    if (content) {
      content.innerHTML = `<p class="lead">${esc(n.excerpt)}</p>` + n.body.map((p, i) => `${i === 1 ? `<figure class="article-figure"><img src="${n.image}" alt=""><figcaption>图像：Pokémon Hub 视觉素材 · 仅用于课堂演示</figcaption></figure>` : ""}<p>${esc(p)}</p>`).join("") + `<blockquote>“每一次相遇，都是新的冒险。”<br><span style="font-size:11px;font-weight:600;opacity:.7">—— Pokémon Hub 编辑部</span></blockquote><div class="article-tags">${n.tags.map(t => `<a href="news.html"># ${esc(t)}</a>`).join("")}</div>`;
    }
    const related = DATA.NEWS.filter(x => x.id !== n.id && (x.category === n.category || x.tags.some(t => n.tags.includes(t)))).slice(0, 4);
    const side = $("#articleSide");
    if (side) side.innerHTML = `
      <div class="side-box"><h4>相关阅读</h4><div class="side-news">${related.concat(DATA.NEWS.filter(x => x.id !== n.id)).slice(0, 4).map(r => `<a href="article.html?id=${r.id}"><span class="sn-thumb tint-${r.tint}"><img src="${r.image}" alt=""></span><span><b>${esc(r.title)}</b><span>${r.category} · ${r.date}</span></span></a>`).join("")}</div></div>
      <div class="side-cta"><h4>打开图鉴</h4><p>查看 52 只精选宝可梦的属性、种族值与小故事。</p><a class="btn btn-yellow btn-sm" href="pokedex.html">探索图鉴 ${icon("arrow")}</a><img src="assets/pokemon/25.webp" alt=""></div>`;
  }

  /* ---------------- Page: anime ---------------- */
  function initAnime() {
    const A = DATA.ANIME;
    const hero = $("#animeHero");
    if (hero) hero.innerHTML = `
      <div class="anime-copy">
        <div class="series-label">POKÉMON HORIZONS · CURRENT SERIES</div>
        <h2>${A.current.title}</h2>
        <div class="arc">正在播出 <b>${A.current.arc}</b></div>
        <p>${A.current.description}</p>
        <div class="hook" style="margin-top:6px"></div>
        <div class="anime-meta-row"><div>首播<strong>${A.current.year}</strong></div><div>集数<strong>${A.current.episodes}</strong></div><div>更新<strong>每周五 18:00</strong></div></div>
        <div class="partner-row">${A.current.partners.map(p => `<div class="partner-pill"><img src="${p.image}" alt=""><div><b>${p.name}</b><span>搭档 · ${p.partner}</span></div></div>`).join("")}</div>
      </div>
      <div class="anime-art"><div class="glow"></div><img src="${A.current.image}" alt="宝可梦 地平线"><div class="character-tag"><b>莉可 & 新叶喵</b>踏上寻找吊坠秘密的旅程</div></div>`;
    const eps = $("#episodeList");
    if (eps) eps.innerHTML = A.episodes.map(ep => `
      <button class="episode-card" data-episode="${ep.no}">
        <span class="episode-thumb"><img src="${ep.image}" alt=""><span class="play-dot">${icon("play")}</span></span>
        <span class="episode-info"><span class="ep-no">${ep.no} · 最新</span><h4>${esc(ep.title)}</h4><p>${esc(ep.desc)}</p><span class="ep-meta"><span>${ep.date}</span><span>·</span><span>${ep.duration}</span></span></span>
        <span class="ep-arrow">${icon("chevron")}</span>
      </button>`).join("");
    const series = $("#seriesList");
    if (series) series.innerHTML = A.series.map(s => `<a class="series-row" href="anime.html" data-series="${esc(s.title)}"><span class="sr-img"><img src="${s.image}" alt=""></span><span><b>${esc(s.title)}</b><span>${s.year}</span><p>${esc(s.note)}</p></span></a>`).join("");
    const movies = $("#movieGrid");
    if (movies) movies.innerHTML = A.movies.map((m, i) => `
      <article class="movie-card">
        <div class="movie-poster"><span class="year">${m.year}</span><img src="${m.image}" alt=""><div class="poster-title">${esc(m.title)}</div></div>
        <div class="movie-body"><div class="movie-tag">${esc(m.tag)}</div><p>${esc(m.desc)}</p><button class="btn btn-ghost btn-sm" data-movie="${i}">${icon("play")} 查看详情</button></div>
      </article>`).join("");
    const showPanel = (key) => {
      $$(".anime-tab").forEach(t => t.classList.toggle("active", t.dataset.animeTab === key));
      $("#animeSeriesPanel").hidden = key !== "series";
      $("#animeMoviesPanel").hidden = key !== "movies";
    };
    $$(".anime-tab").forEach(t => t.addEventListener("click", () => showPanel(t.dataset.animeTab)));
    document.addEventListener("click", (e) => {
      const epBtn = e.target.closest("[data-episode]");
      if (epBtn) {
        const ep = A.episodes.find(x => x.no === epBtn.dataset.episode);
        openModal(`<div style="padding:32px"><div style="border-radius:14px;overflow:hidden;background:linear-gradient(145deg,#101a32,#31518e);aspect-ratio:16/9;display:grid;place-items:center;position:relative"><img src="${ep.image}" style="width:28%;filter:drop-shadow(0 15px 15px rgba(0,0,0,.3))"><button style="position:absolute;width:58px;height:58px;border-radius:50%;background:#fff;display:grid;place-items:center" onclick="window.PK.toast('演示站点未接入正版片源，请前往官方频道观看。','error')">${icon("play")}</button></div><div style="margin-top:18px"><span class="tag">${ep.no}</span><h2 style="font-size:23px;margin-top:9px">${esc(ep.title)}</h2><p style="font-size:12px;color:var(--muted);line-height:1.8;margin-top:7px">${esc(ep.desc)}</p><div style="display:flex;gap:9px;margin-top:16px"><a class="btn btn-primary btn-sm" href="https://www.youtube.com/@PokemonHongKong" target="_blank" rel="noopener">前往官方频道 ${icon("external")}</a><button class="btn btn-ghost btn-sm" onclick="window.PK.closeModal()">关闭</button></div></div></div>`);
      }
      const movieBtn = e.target.closest("[data-movie]");
      if (movieBtn) {
        const m = A.movies[Number(movieBtn.dataset.movie)];
        openModal(`<div style="display:grid;grid-template-columns:.8fr 1.2fr;min-height:360px"><div class="movie-poster" style="border-radius:24px 0 0 24px"><span class="year">${m.year}</span><img src="${m.image}" alt=""><div class="poster-title">${esc(m.title)}</div></div><div style="padding:34px"><div class="movie-tag">${esc(m.tag)}</div><h2 style="font-size:25px;line-height:1.35;margin-top:7px;letter-spacing:-.03em">${esc(m.title)}</h2><p style="font-size:12.5px;color:var(--muted);line-height:1.9;margin-top:12px">${esc(m.desc)}</p><div class="pdx-facts" style="margin-top:18px"><div class="pdx-fact"><span>上映年份</span><b>${m.year}</b></div><div class="pdx-fact"><span>类型</span><b>剧场版</b></div><div class="pdx-fact"><span>时长</span><b>约 100 分钟</b></div></div><div style="display:flex;gap:8px;margin-top:18px"><a class="btn btn-primary btn-sm" href="https://www.youtube.com/@PokemonHongKong" target="_blank" rel="noopener">官方频道 ${icon("external")}</a><button class="btn btn-ghost btn-sm" onclick="window.PK.closeModal()">关闭</button></div></div></div>`);
      }
    });
  }

  /* ---------------- Page: goods ---------------- */
  function initGoods() {
    const goodsPool = DATA.PRODUCTS.filter(p => (p.channel || "goods") === "goods");
    const cats = ["全部", ...Array.from(new Set(goodsPool.map(p => p.category)))];
    let active = "全部", q = "", sort = "default";
    const chips = $("#goodsChips");
    if (chips) chips.innerHTML = cats.map(c => `<button class="chip ${c === "全部" ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");
    const grid = $("#productGrid");
    const render = () => {
      let list = goodsPool.filter(p => (active === "全部" || p.category === active) && (!q || (p.name + p.desc + p.category).toLowerCase().includes(q.toLowerCase())));
      if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
      if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
      if (sort === "popular") list.sort((a, b) => b.sold - a.sold);
      if (grid) grid.innerHTML = list.length ? list.map(productCardHtml).join("") : `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🛍️</div><b>暂时没有匹配的商品</b></div>`;
      const count = $("#goodsCount"); if (count) count.innerHTML = `共 <b>${list.length}</b> 件商品`;
      bindProductCards(grid);
    };
    chips?.addEventListener("click", (e) => { const b = e.target.closest("[data-cat]"); if (!b) return; active = b.dataset.cat; $$(".chip", chips).forEach(c => c.classList.toggle("active", c === b)); render(); });
    $("#goodsSearch")?.addEventListener("input", (e) => { q = e.target.value; render(); });
    $("#goodsSort")?.addEventListener("change", (e) => { sort = e.target.value; render(); });
    render();
    const params = new URLSearchParams(location.search);
    if (params.get("product")) setTimeout(() => openProduct(params.get("product")), 200);
    if (params.get("q")) { const input = $("#goodsSearch"); if (input) { input.value = params.get("q"); q = params.get("q"); render(); } }
  }

  /* ---------------- Page: apps ---------------- */
  function initApps() {
    const grid = $("#appsGrid");
    if (grid) grid.innerHTML = DATA.APPS.map(appCardHtml).join("");
    document.addEventListener("click", (e) => {
      const a = e.target.closest("[data-app-open]");
      if (a && document.body.dataset.page === "apps") {
        e.preventDefault();
        const app = DATA.APPS.find(x => x.id === a.dataset.appOpen);
        openModal(`<div class="app-detail"><div class="ad-head"><span class="ad-icon" style="background:${app.color}"><img src="${app.image}" alt=""></span><div><div style="font-size:9px;font-weight:900;letter-spacing:.13em;color:var(--blue)">${esc(app.category)}</div><h2>${esc(app.name)}</h2><div style="font-size:10px;color:var(--muted);margin-top:3px">${app.platforms.join(" · ")}</div></div></div><div class="ad-meta"><div><span>评分</span><b>★ ${app.rating}</b></div><div><span>下载量</span><b>${esc(app.downloads)}</b></div><div><span>发行</span><b>免费 + 内购</b></div></div><p>${esc(app.desc)}</p><div class="ad-tags">${["官方应用","跨平台","持续更新","中文支持"].map(t => `<span>${t}</span>`).join("")}</div><div style="display:flex;gap:8px;margin-top:20px"><a class="btn btn-primary btn-sm" href="https://www.pokemon.com/" target="_blank" rel="noopener">前往官方页面 ${icon("external")}</a><button class="btn btn-ghost btn-sm" onclick="window.PK.closeModal()">关闭</button></div></div>`);
      }
    });
    const params = new URLSearchParams(location.search);
    if (params.get("app")) setTimeout(() => { const el = $(`[data-app-open="${params.get("app")}"]`); if (el) el.click(); }, 200);
  }

  /* ---------------- Page: games ---------------- */
  function initGames() {
    const f = DATA.GAMES.find(g => g.featured) || DATA.GAMES[0];
    const feature = $("#gameFeature");
    if (feature) feature.innerHTML = `
      <div class="game-feature-copy">
        <div class="gf-label">FEATURED TITLE · ${f.year}</div>
        <h3>${esc(f.name)}</h3>
        <p>${esc(f.desc)}</p>
        <div class="gf-tags"><span>${esc(f.platform)}</span><span>${esc(f.genre)}</span><span>动作 · 探索 · 超级进化</span></div>
        <div class="gf-cta"><button class="btn btn-primary" data-game-open="${f.id}">了解本作 ${icon("arrow")}</button><a class="btn btn-ghost" href="https://www.pokemon.com/" target="_blank" rel="noopener">官方页面 ${icon("external")}</a></div>
      </div>
      <div class="game-feature-art"><img src="${f.image}" alt="${esc(f.name)}"><div class="console-tag">NINTENDO SWITCH · 2025</div></div>`;
    const grid = $("#gamesGrid");
    if (grid) grid.innerHTML = DATA.GAMES.map(gameCardHtml).join("");
    document.addEventListener("click", (e) => {
      const a = e.target.closest("[data-game-open]");
      if (a && document.body.dataset.page === "games") {
        e.preventDefault();
        const g = DATA.GAMES.find(x => x.id === a.dataset.gameOpen);
        openModal(`<div class="product-detail"><div class="pd-art tint-${g.tint}"><img src="${g.image}" alt=""></div><div class="pd-info"><div class="product-cat">${esc(g.genre)} · ${g.year}</div><h2>${esc(g.name)}</h2><div class="pd-rating"><span>发行平台</span> ${esc(g.platform)}</div><p class="pd-desc">${esc(g.desc)}</p><div class="pd-specs"><div><b>类型</b>${esc(g.genre)}</div><div><b>发行</b>${g.year}</div><div><b>语言</b>简繁中文</div></div><div class="pd-actions"><a class="btn btn-primary" href="https://www.pokemon.com/" target="_blank" rel="noopener">官方页面 ${icon("external")}</a><button class="btn btn-ghost" onclick="window.PK.closeModal()">关闭</button></div></div></div>`);
      }
    });
    const params = new URLSearchParams(location.search);
    if (params.get("game")) setTimeout(() => { const el = $(`[data-game-open="${params.get("game")}"]`); if (el) el.click(); }, 200);
  }

  /* ---------------- Page: cards ---------------- */
  function initCards() {
    const fan = $("#cardFan");
    if (fan) fan.innerHTML = DATA.SHOWCASE_CARDS.map((c, i) => `
      <div class="tcg-card c${i + 1}">
        <div class="tc-inner">
          <div class="tc-top"><span>${esc(c.name)}</span><span class="hp">HP ${c.hp}</span></div>
          <div class="tc-art type-${c.type}"><img src="${c.image}" alt=""></div>
          <div class="tc-bottom"><div class="tc-name"><span>${esc(c.name.split(" ")[0])}</span><span class="rarity">${c.rarity}</span></div><div class="tc-attack"><span>${esc(c.attack)}</span><b>${c.damage}</b></div></div>
        </div>
      </div>`).join("");
    const sets = $("#cardSets");
    if (sets) sets.innerHTML = DATA.CARD_SETS.map(s => `<div class="product-card"><div class="product-art tint-${s.tint}"><img src="${s.image}" alt=""><span class="product-tag">${s.code}</span></div><div class="product-body"><div class="product-cat">${s.theme}</div><h3 style="min-height:auto">${esc(s.name)}</h3><div class="product-rating">${s.date} 发售 · ${s.cards} 张卡牌</div><div class="product-foot"><div class="price" style="font-size:14px">扩充包</div><a class="btn btn-ghost btn-sm" href="#cardShop">查看商品 ${icon("arrow")}</a></div></div></div>`).join("");
    const cardPool = DATA.PRODUCTS.filter(p => p.channel === "card");
    const cardGrid = $("#cardProducts");
    if (cardGrid) {
      cardGrid.innerHTML = cardPool.map(productCardHtml).join("");
      bindProductCards(cardGrid);
    }
    const cardCount = $("#cardProductCount");
    if (cardCount) cardCount.innerHTML = `共 <b>${cardPool.length}</b> 款卡牌商品`;
    $$("[data-accordion]").forEach(head => head.addEventListener("click", () => {
      const item = head.closest(".accordion-item");
      item.classList.toggle("open");
      const body = $(".accordion-body", item);
      if (body) body.hidden = !item.classList.contains("open");
    }));
    const params = new URLSearchParams(location.search);
    if (params.get("product")) setTimeout(() => openProduct(params.get("product")), 250);
  }

  /* ---------------- Page: pokedex ---------------- */
  function initPokedex() {
    const state = { q: "", type: "all", gen: "all", sort: "id", shown: 18 };
    const typeOrder = ["all", "grass", "fire", "water", "electric", "psychic", "ghost", "dragon", "fairy", "dark", "steel", "fighting", "normal", "poison", "ground", "flying", "rock", "bug", "ice"];
    const typeNames = { all: "全部属性" };
    const filter = $("#typeFilter");
    if (filter) filter.innerHTML = typeOrder.map(t => t === "all"
      ? `<button class="type-chip active" data-type="all"><span class="dot" style="--type-color:#69718a"></span>全部</button>`
      : `<button class="type-chip type-${t}" data-type="${t}"><span class="dot"></span>${typeCnMap[t]}</button>`).join("");
    const render = () => {
      let list = POKEDEX.filter(p => (state.type === "all" || p.types.includes(state.type)) && (state.gen === "all" || p.gen === Number(state.gen)) && (!state.q || (p.name + p.en + p.jp + p.typeCn.join("") + p.no).toLowerCase().includes(state.q.toLowerCase())));
      if (state.sort === "total") list.sort((a, b) => b.total - a.total);
      if (state.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name, "zh-Hans-CN"));
      if (state.sort === "id") list.sort((a, b) => a.id - b.id);
      const grid = $("#pokedexGrid");
      if (!grid) return;
      const visible = list.slice(0, state.shown);
      grid.innerHTML = visible.length ? visible.map(p => {
        const fav = getFavMons().includes(p.id);
        return `<article class="poke-card type-${p.types[0]}" data-poke="${p.id}">
          <div class="pc-bg"></div>
          <span class="pc-no">${p.no}</span>
          <button class="pc-fav ${fav ? "active" : ""}" data-pokemon="${p.id}" aria-label="收藏">${icon(fav ? "heartFill" : "heart")}</button>
          <div class="pc-img"><img src="${p.image}" alt="${esc(p.name)}" loading="lazy"></div>
          <h3>${esc(p.name)}</h3><div class="pc-en">${esc(p.en)}</div>
          <div class="pc-types">${p.types.map(typeBadge).join("")}</div>
        </article>`;
      }).join("") : `<div class="pdx-empty"><div style="font-size:34px;margin-bottom:6px">🔎</div><b>没有找到匹配的宝可梦</b><p style="font-size:11px;margin-top:4px">试试清除筛选条件，或搜索英文名。</p></div>`;
      if (list.length > visible.length) grid.insertAdjacentHTML("beforeend", `<div class="load-more-wrap"><button class="btn btn-ghost btn-sm" id="pdxMore">显示更多 ${list.length - visible.length} 只 ${icon("arrow")}</button></div>`);
      $("#pdxMore")?.addEventListener("click", () => { state.shown += 18; render(); });
      const count = $("#pdxCount"); if (count) count.innerHTML = `<b>${list.length}</b> 只宝可梦`;
      const showing = $("#pdxShowing"); if (showing) showing.textContent = `显示 ${visible.length} / ${list.length}`;
      $$("[data-poke]", grid).forEach(card => {
        card.addEventListener("click", (e) => {
          if (e.target.closest("[data-pokemon]")) return;
          openPokemon(card.dataset.poke);
        });
      });
      $$("[data-pokemon]", grid).forEach(btn => btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const now = toggleFavMon(Number(btn.dataset.pokemon));
        btn.classList.toggle("active", now); btn.innerHTML = icon(now ? "heartFill" : "heart");
      }));
    };
    filter?.addEventListener("click", (e) => {
      const b = e.target.closest("[data-type]"); if (!b) return;
      state.type = b.dataset.type; state.shown = 18;
      $$(".type-chip", filter).forEach(c => c.classList.toggle("active", c === b)); render();
    });
    $("#pdxSearch")?.addEventListener("input", (e) => { state.q = e.target.value.trim(); state.shown = 18; render(); });
    $("#pdxGen")?.addEventListener("change", (e) => { state.gen = e.target.value; state.shown = 18; render(); });
    $("#pdxSort")?.addEventListener("change", (e) => { state.sort = e.target.value; render(); });
    $("#pdxRandom")?.addEventListener("click", () => {
      const p = POKEDEX[Math.floor(Math.random() * POKEDEX.length)];
      openPokemon(p.id);
    });
    render();
    const params = new URLSearchParams(location.search);
    if (params.get("q")) {
      const input = $("#pdxSearch");
      if (input) { input.value = params.get("q"); state.q = params.get("q").trim(); state.shown = 18; render(); }
    }
    if (params.get("id")) setTimeout(() => openPokemon(params.get("id")), 250);
    if (params.get("type")) { const b = $(`[data-type="${params.get("type")}"]`); if (b) b.click(); }
  }

  /* ---------------- Page: account ---------------- */
  function initAccount() {
    const s = session();
    const main = $("#accountMain");
    if (!main) return;
    if (!s) {
      main.innerHTML = `<div class="account-panel" style="text-align:center;padding:60px 30px"><div style="font-size:40px;margin-bottom:10px">🎒</div><h3>登录后查看你的训练家档案</h3><p class="panel-sub" style="margin-top:6px">同步收藏、订单与会员积分。</p><button class="btn btn-primary" stack style="margin-top:20px" data-login>${icon("user")} 立即登录</button></div>`;
      return;
    }
    const orders = storage.get("pk_orders", []);
    const favProducts = getFavProducts().map(id => DATA.PRODUCTS.find(p => p.id === id)).filter(Boolean);
    const favMons = getFavMons().map(id => POKEDEX.find(p => p.id === id)).filter(Boolean);
    main.innerHTML = `
      <div class="member-card">
        <div class="mc-top"><div><div class="mc-tier">${s.role === "admin" ? "OPERATIONS ACCESS" : "MASTER BALL MEMBER"}</div><h3>${esc(s.name)} 的训练家档案</h3><div class="mc-no">${s.role === "admin" ? "ADMIN · " + s.memberNo : "MEMBER NO. " + s.memberNo}</div></div><span style="font-size:27px">${icon("pokeball")}</span></div>
        <div class="mc-bottom"><div class="mc-points"><b>${s.role === "admin" ? "OPS" : "12,860"}</b><span>${s.role === "admin" ? "管理者账号" : "可用积分"}</span></div><div class="mc-balls">●●●●●</div></div>
      </div>
      <div class="account-stats"><div class="account-stat"><b>${orders.length}</b><span>演示订单</span></div><div class="account-stat"><b>${favProducts.length + favMons.length}</b><span>我的收藏</span></div><div class="account-stat"><b>${s.role === "admin" ? "后台" : "Lv. 42"}</b><span>${s.role === "admin" ? "管理者权限" : "训练家等级"}</span></div></div>
      <div class="account-panel" id="orders"><h3>我的订单</h3><p class="panel-sub">演示订单保存在本地浏览器，不会产生真实交易。</p>
        ${orders.length ? `<div class="order-list">${orders.map(o => `<div class="order-row"><div class="or-left"><span class="or-art"><img src="${o.items[0].image}" alt=""></span><span><b>${o.items.map(i => i.name).join("、").slice(0, 34)}${o.items.length > 1 ? " 等" : ""}</b><span>${o.no} · ${new Date(o.date).toLocaleDateString("zh-CN")} · ${o.status}</span></span></div><span class="or-price">${money(o.total)}</span></div>`).join("")}</div>` : `<div class="account-empty">还没有订单。<a href="goods.html" style="color:var(--blue);font-weight:800">去挑一件周边 →</a></div>`}
      </div>
      <div class="account-panel" id="favorites"><h3>我的收藏</h3><p class="panel-sub">商品与宝可梦收藏会在本设备保留。</p>
        <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:16px">
          ${favProducts.map(p => `<a href="goods.html?product=${p.id}" style="width:88px"><span class="or-art" style="width:88px;height:88px;border-radius:12px;display:grid;place-items:center;background:var(--bg)"><img src="${p.image}" alt=""></span><span style="font-size:9px;display:block;margin-top:4px;line-height:1.4">${esc(p.name)}</span></a>`).join("")}
          ${favMons.map(p => `<a href="pokedex.html?id=${p.id}" style="width:88px"><span class="or-art" style="width:88px;height:88px;border-radius:12px;display:grid;place-items:center;background:var(--bg)"><img src="${p.image}" alt=""></span><span style="font-size:9px;display:block;margin-top:4px">${esc(p.name)}</span></a>`).join("")}
          ${!favProducts.length && !favMons.length ? `<div class="account-empty" style="width:100%">还没有收藏，去图鉴或商品页逛逛吧。</div>` : ""}
        </div>
      </div>
      <div class="account-panel" id="settings"><h3>账户设置</h3><p class="panel-sub">${esc(s.email)} · ${s.role === "admin" ? "管理者" : "消费者"}账号</p>
        <div style="display:flex;gap:9px;margin-top:16px;flex-wrap:wrap"><input id="displayName" value="${esc(s.name)}" style="height:40px;border:1px solid var(--line);border-radius:8px;padding:0 12px;font-size:12px;outline:none;min-width:220px"><button class="btn btn-primary btn-sm" id="saveName">保存昵称</button><button class="btn btn-ghost btn-sm" data-logout>${icon("logout")} 退出登录</button>${s.role === "admin" ? `<a class="btn btn-yellow btn-sm" href="admin.html">${icon("chart")} 管理者后台</a>` : ""}</div>
      </div>`;
    $("#saveName")?.addEventListener("click", () => {
      const name = $("#displayName").value.trim();
      if (!name) return toast("昵称不能为空", "error");
      const ns = { ...s, name, avatar: name.slice(0, 1) }; setSession(ns); refreshUserSlot(); toast("昵称已更新");
    });
  }

  /* ---------------- Page: architecture ---------------- */
  function initArchitecture() {
    // Static page. No additional JS needed.
  }

  /* ---------------- Init ---------------- */
  function init() {
    renderHeader();
    renderFooter();
    bindGlobal();
    const page = document.body.dataset.page || "home";
    const map = { home: initHome, news: initNews, article: initArticle, anime: initAnime, goods: initGoods, apps: initApps, games: initGames, cards: initCards, pokedex: initPokedex, account: initAccount, architecture: initArchitecture, about: () => {} };
    try { (map[page] || (() => {}))(); } catch (err) { console.error(err); }
    updateCartBadge();
  }

  window.PK = {
    openLogin, closeLogin, openSearch, closeSearch, openCart, closeCart,
    openProduct, openPokemon, addToCart, toast, closeModal, session,
    login, logout, DATA, POKEDEX, icon, money, esc
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

