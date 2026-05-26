
    const music = new Audio("https://files.catbox.moe/vgjm1c.mp3");
    music.loop = true;
    music.volume = 0.1;
    window.music = music;

    const hoverAudio = new Audio("https://files.catbox.moe/h71sur.mp3");
    hoverAudio.preload = "auto";
    window.__voltraSfxVolume = 0.1;

    music.load();
    hoverAudio.load();

    window.playHover = function(pitch = 1) {
      const sfx = hoverAudio.cloneNode();
      sfx.volume = window.__voltraSfxVolume;
      sfx.playbackRate = pitch;
      sfx.play().catch(() => {});
    };

    const intro = document.getElementById('introScreen');

    function startExperience() {
      music.play().catch(() => {});
      const primer = hoverAudio.cloneNode();
      primer.volume = 0;
      primer.play().catch(() => {});
      intro.classList.add('exit');
      setTimeout(() => intro.remove(), 700);
    }

    intro.addEventListener('click', startExperience);
    intro.addEventListener('touchstart', startExperience);

    const canvas = document.getElementById('bg');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let visualMotionReduced = false;

    const particles = [];

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.speedY = (Math.random() - 0.5) * 0.25;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fill();
      }
    }

    for (let i = 0; i < 160; i++) particles.push(new Particle());

    function connect() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(120,180,255,${0.08 - dist / 1600})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        if (!visualMotionReduced) p.update();
        p.draw();
      });
      if (!visualMotionReduced) connect();
      requestAnimationFrame(animate);
    }
    animate();

    function syncLayout() {
      const nav = document.querySelector('.navbar');
      const heroTitle = document.querySelector('.hero h1');
      const heroSearch = document.querySelector('.hero-search-stack');

      if (nav) {
        document.documentElement.style.setProperty('--nav-height', `${Math.ceil(nav.getBoundingClientRect().height)}px`);
      }

      if (heroTitle && heroSearch) {
        const titleWidth = Math.ceil(heroTitle.getBoundingClientRect().width);

        if (titleWidth > 0) {
          const compact = window.innerWidth < 420;
          const initialCap = window.innerWidth - (compact ? 24 : 80);
          const expandedCap = window.innerWidth - (compact ? 12 : 40);
          const minInitial = Math.min(310, initialCap);
          const initialWidth = Math.min(Math.max(titleWidth, minInitial), initialCap);
          const expandedTarget = Math.max(initialWidth + (compact ? 48 : 150), titleWidth + (compact ? 58 : 180));
          const expandedWidth = Math.min(expandedTarget, expandedCap);

          heroSearch.style.setProperty('--hero-search-width', `${Math.round(initialWidth)}px`);
          heroSearch.style.setProperty('--hero-search-expanded-width', `${Math.round(Math.max(initialWidth, expandedWidth))}px`);
        }
      }
    }

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      syncLayout();
    });

    window.addEventListener('load', syncLayout);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(syncLayout);
    }
    requestAnimationFrame(syncLayout);

    const cookieIcon = "https://outred.org/g/assets/cookie-clicker/cookie1.jpeg";
    const cookieUrl = "https://script.google.com/macros/s/AKfycbxGM35J29NkO-2LYjxWj_cA9IUaaXypkUy-LqXyLRbGTz0R6lXmAEapz1STN1jlTIRavw/exec";
    const slopeIcon = "https://outred.org/g/assets/slope/slope4.jpeg";
    const slopeUrl = "https://slope-game-io.github.io/games/slope/index.html";
    const basketballStarsIcon = "https://outred.org/g/assets/basketball-stars/assets/images/basketball-stars.png";
    const basketballStarsUrl = "https://script.google.com/macros/s/AKfycbxy1zNkV2rOD3Y_MXtUDPDNAMdvJ1HgBkOTnzq4e5ZW-WJkznkIoUTr1J1fmEQ_cG4b4Q/exec";
    const clusterRushIcon = "https://outred.org/g/assets/cluster-rush/splash.png";
    const clusterRushUrl = "https://script.google.com/macros/s/AKfycbw6e8fflbfydV7kom5id09nKaM6ix0hLlXHbs3XHOnxzrndUgPtHUHENrwKomI2Hpk3/exec";
    const driftHuntersIcon = "https://outred.org/g/assets/drift-hunters/drift-hunters.png";
    const driftHuntersUrl = "https://script.google.com/macros/s/AKfycbw8iHPqdVFEzquUYbNxFVAu1Tw4Nri5SWMRLdP_c7a84vCOHVG7YUWuhjSVptg1SVHr/exec";
    const duckLifeIcon = "https://outred.org/g/assets/ducklife1/ducklife.png";
    const duckLifeUrl = "https://ducklife.gitlab.io/file/";
    const minecraftIcon = "https://outred.org/g/assets/minecraft-15/splash.jpeg";
    const minecraftUrl = "https://minecrafteaglercraft.gitlab.io/go/minecraft-1.5.2/";
    const elasticManIcon = "https://outred.org/g/assets/elasticman/elasticman.jpg";
    const elasticManUrl = "https://script.google.com/macros/s/AKfycbwWOlo7-AMuejI5XKrJqrSzDvuH9X6yfNfhgX4HSL1P-i3eAY5Qi51vMdDJM13V4MXJIQ/exec";
    const fireboyWatergirlIcon = "https://outred.org/g/assets/fireboywatergirlforesttemple/logo.jpeg";
    const fireboyWatergirlUrl = "https://script.google.com/macros/s/AKfycbw8EVdUCzgTInevqT2h0DOxeN07fjoLrB5DowKa1TlhpqFnJ1IkViYJ7uV58-8yITGztg/exec";
    const flappyBirdIcon = "https://outred.org/g/assets/flappy-bird/assets/thumb.png";
    const flappyBirdUrl = "https://scratch.mit.edu/projects/embed/17964117/";
    const fruitNinjaIcon = "https://outred.org/g/assets/fruitninja/FruitNinjaTeaser.jpg";
    const fruitNinjaUrl = "https://classroom2111.github.io/g50/class-22/";

    const sectionData = {
      games: [
        {
          id: "cookie-clicker",
          title: "Cookie Clicker",
          desc: "Build a cookie empire one click at a time, then turn upgrades, grandmas, and wild production boosts into an endless bakery machine.",
          badge: "CLASSIC",
          emoji: "🍪",
          image: cookieIcon,
          url: cookieUrl
        },
        {
          id: "slope",
          title: "Slope",
          desc: "Steer a neon ball down an endless 3D track, dodge obstacles, and chase your best run in this fast reflex arcade favorite.",
          badge: "ARCADE",
          emoji: "📐",
          image: slopeIcon,
          url: slopeUrl
        },
        {
          id: "basketball-stars",
          title: "Basketball Stars",
          desc: "Drop into fast 1v1 arcade hoops, chain flashy shots, and outplay rivals with timing, steals, and big-head streetball style.",
          badge: "SPORTS",
          emoji: "🏀",
          image: basketballStarsIcon,
          url: basketballStarsUrl
        },
        {
          id: "cluster-rush",
          title: "Cluster Rush",
          desc: "Leap across a speeding convoy of trucks in a frantic low-poly runner where one missed jump sends you tumbling off the road.",
          badge: "RUNNER",
          emoji: "🚛",
          image: clusterRushIcon,
          url: clusterRushUrl
        },
        {
          id: "drift-hunters",
          title: "Drift Hunters",
          desc: "Tune your car, hit the track, and chase perfect drifts with smoke-filled corners and upgrade-heavy street racing action.",
          badge: "RACING",
          emoji: "🏎️",
          image: driftHuntersIcon,
          url: driftHuntersUrl
        },
        {
          id: "duck-life",
          title: "Duck Life",
          desc: "Train your duck in running, flying, and swimming, then enter races and grow from a rookie hatchling into a champion.",
          badge: "ADVENTURE",
          emoji: "🦆",
          image: duckLifeIcon,
          url: duckLifeUrl
        },
        {
          id: "minecraft",
          title: "Minecraft",
          desc: "Explore, mine, and craft in a blocky sandbox where you gather resources, build shelters, and survive the night.",
          badge: "SANDBOX",
          emoji: "⛏️",
          image: minecraftIcon,
          url: minecraftUrl
        },
        {
          id: "elastic-man",
          title: "Elastic Man",
          desc: "Click and drag to stretch a rubbery 3D face with satisfying physics that wobble and snap back every time you let go.",
          badge: "CASUAL",
          emoji: "🎭",
          image: elasticManIcon,
          url: elasticManUrl
        },
        {
          id: "fireboy-and-watergirl",
          title: "Fireboy and Watergirl",
          desc: "Guide fire and water through temple levels, switch between heroes, and solve co-op puzzles using each one's unique powers.",
          badge: "PUZZLE",
          emoji: "🔥",
          image: fireboyWatergirlIcon,
          url: fireboyWatergirlUrl
        },
        {
          id: "flappy-bird",
          title: "Flappy Bird",
          desc: "Tap to stay airborne and thread a pixel bird through tight pipe gaps in this brutally simple, endlessly replayable arcade test.",
          badge: "ARCADE",
          emoji: "🐦",
          image: flappyBirdIcon,
          url: flappyBirdUrl
        },
        {
          id: "fruit-ninja",
          title: "Fruit Ninja",
          desc: "Swipe fast to slice flying fruit, chain combos, and dodge bombs in a juicy reflex arcade classic built for quick sessions.",
          badge: "ACTION",
          emoji: "🍉",
          image: fruitNinjaIcon,
          url: fruitNinjaUrl
        }
      ],
      proxies: [
        {
          id: "gust-proxy",
          title: "Gust Proxy",
          desc: "GUST is a sleek, customizable web proxy you download and run on any device—grab your build, follow the simple setup steps, and browse through your own local proxy in minutes.",
          badge: "PROXY",
          emoji: "🌬️",
          image: "https://i.ibb.co/nWvykJ1/image.png",
          url: "https://gust-browser.vercel.app"
        },
        {
          id: "daydreamx",
          title: "DayDreamX",
          desc: "A clean browser proxy with a fast, minimal interface for everyday unblocked browsing and quick access to the open web.",
          badge: "PROXY",
          emoji: "💭",
          image: "https://i.ibb.co/TBSbSVsN/image.png",
          url: "https://thinking.rymconstrucciones.cl",
          embeddable: false
        },
        {
          id: "reds-exploit-center",
          title: "Reds Exploit Center",
          desc: "A hub-style proxy that bundles games, apps, and media tools together for simple one-stop browsing sessions.",
          badge: "PROXY",
          emoji: "🔴",
          image: "https://static.thenounproject.com/png/404950-200.png",
          url: "https://55gms.com"
        },
        {
          id: "space-unblocker",
          title: "Space Unblocker",
          desc: "A lightweight space-themed web proxy built for smooth browsing, quick navigation, and reliable unblocked access.",
          badge: "PROXY",
          emoji: "🚀",
          image: "https://i.ibb.co/XxKbcnzM/image.png",
          url: "https://blog.free-dyndns.org/&"
        },
        {
          id: "petezah",
          title: "PeteZah",
          desc: "A streamlined proxy front-end with a clean layout and dependable access when you need sites unblocked fast.",
          badge: "PROXY",
          emoji: "⚡",
          image: "https://i.ibb.co/mrW4n2qm/image.png",
          url: "https://cdn.jsdelivr.net/gh/PeteZah-G/copy-2/main.svg"
        },
        {
          id: "rosin-unblocker",
          title: "Rosin Unblocker",
          desc: "A straightforward unblocker proxy focused on quick launches, simple controls, and hassle-free browsing.",
          badge: "PROXY",
          emoji: "🟣",
          image: "https://i.ibb.co/S4gbMYxH/image-2026-05-25-165712219.png",
          url: "https://sosa.centromariapolis.cl",
          embeddable: false
        }
      ],
      tools: [
        { title: "File Hub", desc: "Cloud file launcher.", badge: "NEW", emoji: "📁" },
        { title: "Quick Notes", desc: "Simple scratchpad for browser sessions.", badge: "TOOLS", emoji: "📝" },
        { title: "Tab Vault", desc: "Save and relaunch useful web destinations.", badge: "SAVE", emoji: "🧭" },
        { title: "Link Cleaner", desc: "Trim messy links into cleaner shareable URLs.", badge: "UTILITY", emoji: "✨" }
      ]
    };

    const gameIndex = Object.fromEntries(sectionData.games.map(game => [game.id, game]));
    const proxyIndex = Object.fromEntries(sectionData.proxies.map(proxy => [proxy.id, proxy]));

    const suggestionData = [
      { title: "Clicker Picks", desc: "More fast idle games and clicker loops will appear here as the library expands.", badge: "SOON", emoji: "⚡" },
      { title: "Idle Progression", desc: "A future shelf for upgrade-heavy games with satisfying long-term progress.", badge: "QUEUE", emoji: "📈" },
      { title: "Cozy Classics", desc: "Lightweight browser favorites that fit the same quick-play rhythm.", badge: "NEXT", emoji: "✨" }
    ];

    const infoSearchData = [
      { title: "About Voltra", desc: "A modern browser hub for games, tools, proxies, and web apps.", badge: "INFO", emoji: "💫" },
      { title: "Early Access", desc: "Voltra is still expanding, with more sections and launchable content planned.", badge: "SOON", emoji: "🚀" },
      { title: "Visual System", desc: "Glass panels, ambient particles, custom themes, and neon illumination.", badge: "STYLE", emoji: "✨" },
      { title: "Settings", desc: "Tune audio, visuals, motion, contrast, particles, and layout behavior.", badge: "CUSTOM", emoji: "⚙️" }
    ];

    const searchPages = {
      games: { label: "Games", items: sectionData.games },
      proxies: { label: "Proxies", items: sectionData.proxies },
      tools: { label: "Tools", items: sectionData.tools },
      info: { label: "Info", items: infoSearchData }
    };

    const SETTINGS_STORAGE_KEY = 'voltra-settings-v1';
    const BASE_PAGE_TITLE = 'Voltra Proxy';

    const defaultSettings = {
      music: true,
      sfx: true,
      particles: true,
      reducedMotion: false,
      musicVolume: 10,
      sfxVolume: 10,
      particleDensity: 'normal',
      glow: 100,
      accent: 'aurora',
      compactCards: false,
      highContrast: false,
      sectionSearch: true,
      backgroundOrbs: true,
      smoothScroll: true,
      showPlayerSuggestions: true,
      tabCloak: false,
      autoTabCloak: true,
      cloakPreset: 'google',
      cloakCustomTitle: '',
      autoExternalLaunch: false,
      autoLaunchMode: 'aboutBlank'
    };

    const settings = { ...defaultSettings };
    let settingsPanel = 'audio';

    const cloakPresets = {
      google: { title: 'Google', icon: 'https://www.google.com/favicon.ico' },
      classroom: { title: 'Google Classroom', icon: 'https://ssl.gstatic.com/classroom/favicon.png' },
      drive: { title: 'Google Drive', icon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon-2023q4.ico' },
      docs: { title: 'Google Docs', icon: 'https://docs.google.com/favicon.ico' },
      home: { title: 'Home', icon: 'https://www.google.com/favicon.ico' }
    };

    function loadStoredSettings() {
      try {
        const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
        if (!raw) return;
        const stored = JSON.parse(raw);
        Object.keys(defaultSettings).forEach(key => {
          if (stored[key] !== undefined) settings[key] = stored[key];
        });
        if (stored.settingsPanel) settingsPanel = stored.settingsPanel;
      } catch (err) {
        console.warn('Could not load saved settings.', err);
      }
    }

    function saveStoredSettings() {
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({
          ...settings,
          settingsPanel
        }));
      } catch (err) {
        console.warn('Could not save settings.', err);
      }
    }

    function setPageFavicon(href) {
      let link = document.querySelector('link[rel="icon"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = href;
    }

    function restoreTabIdentity() {
      document.title = BASE_PAGE_TITLE;
      setPageFavicon('data:,');
    }

    function applyTabCloak() {
      if (!settings.tabCloak) {
        restoreTabIdentity();
        return;
      }

      const preset = cloakPresets[settings.cloakPreset] || cloakPresets.google;
      document.title = settings.cloakCustomTitle.trim() || preset.title;
      setPageFavicon(preset.icon);
    }

    function updateTabCloakState() {
      const onPlayer = currentSection === 'game' || currentSection === 'proxy';

      if (!settings.tabCloak) {
        restoreTabIdentity();
        return;
      }

      if (settings.autoTabCloak) {
        if (onPlayer) applyTabCloak();
        else restoreTabIdentity();
        return;
      }

      applyTabCloak();
    }

    function buildEmbeddedTabHTML(url, title) {
      const src = encodeURI(url);
      const safeTitle = escapeHTML(title);
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle}</title>
  <style>
    html, body { margin: 0; width: 100%; height: 100%; overflow: hidden; background: #020409; }
    iframe { border: 0; width: 100%; height: 100%; display: block; }
  </style>
</head>
<body>
  <iframe src="${src}" title="${safeTitle}" allow="fullscreen" allowfullscreen loading="lazy"></iframe>
</body>
</html>`;
    }

    function openUrlInAboutBlank(url, title) {
      const tab = window.open('about:blank', '_blank');
      if (!tab) return null;

      tab.opener = null;
      tab.document.open();
      tab.document.write(buildEmbeddedTabHTML(url, title));
      tab.document.close();
      return tab;
    }

    function openUrlInBlobTab(url, title) {
      const html = buildEmbeddedTabHTML(url, title);
      const blob = new Blob([html], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);
      const tab = window.open(blobUrl, '_blank');

      if (tab) tab.opener = null;
      setTimeout(() => URL.revokeObjectURL(blobUrl), 120000);
      return tab;
    }

    function launchExternalTab(url, title, mode) {
      if (mode === 'blob') return openUrlInBlobTab(url, title);
      return openUrlInAboutBlank(url, title);
    }

    function maybeAutoLaunchExternal(url, title) {
      if (!settings.autoExternalLaunch || !url) return;
      launchExternalTab(url, title, settings.autoLaunchMode);
    }

    loadStoredSettings();

    const accentThemes = {
      aurora: { a: '125,211,252', b: '192,132,252', c: '0,255,170' },
      cyan: { a: '56,189,248', b: '45,212,191', c: '125,211,252' },
      violet: { a: '196,181,253', b: '168,85,247', c: '244,114,182' },
      emerald: { a: '110,231,183', b: '34,211,238', c: '52,211,153' }
    };

    const particleDensityMap = {
      low: 80,
      normal: 160,
      high: 260
    };

    let currentSection = null;
    let returnSection = 'games';
    let lastBrowseQuery = '';

    function scrollBehavior() {
      return settings.smoothScroll ? 'smooth' : 'auto';
    }

    const heroSection = document.getElementById('heroSection');
    const mainContent = document.getElementById('mainContent');
    const homeSearchStack = document.getElementById('homeSearchStack');
    const homeSearchResults = document.getElementById('homeSearchResults');
    const homeSearchInput = document.getElementById('homeSearchInput');

    const fullPageSections = ['settings', 'games', 'proxies', 'tools', 'info'];

    function escapeHTML(value) {
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function buildThumb(item) {
      if (item.image) {
        return `<img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)} icon">`;
      }
      return `<span>${item.emoji}</span>`;
    }

    function cardOpenAttrs(section, item) {
      if (!item.url || !item.id) return '';
      const opener = section === 'proxies' ? 'openProxy' : 'openGame';
      return `role="button" tabindex="0" onclick="${opener}('${item.id}')" onkeydown="handleCardKey(event, '${item.id}', '${section}')"`;
    }

    const backButtonHTML = `
      <button class="icon-btn" data-tooltip="Back" onclick="backFromPlayer()" aria-label="Back">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 12H5"></path>
          <path d="M12 19l-7-7 7-7"></path>
        </svg>
      </button>`;

    const fullscreenButtonHTML = `
      <button class="icon-btn" data-tooltip="Fullscreen" onclick="fullscreenFrame()" aria-label="Fullscreen">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 3H3v5"></path>
          <path d="M16 3h5v5"></path>
          <path d="M21 16v5h-5"></path>
          <path d="M3 16v5h5"></path>
          <path d="M3 3l6 6"></path>
          <path d="M21 3l-6 6"></path>
          <path d="M21 21l-6-6"></path>
          <path d="M3 21l6-6"></path>
        </svg>
      </button>`;

    function incognitoButtonHTML(id) {
      return `
        <button class="icon-btn" data-tooltip="Open in Incognito Tab" onclick="openProxyBlankTab('${id}')" aria-label="Open in incognito tab">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3c-3.4 0-6.3 2.1-7.5 5.1"></path>
            <path d="M12 3c3.4 0 6.3 2.1 7.5 5.1"></path>
            <path d="M4.4 9.6C5.3 14.3 8.2 18 12 18s6.7-3.7 7.6-8.4"></path>
            <circle cx="9" cy="11" r="1.1"></circle>
            <circle cx="15" cy="11" r="1.1"></circle>
          </svg>
        </button>`;
    }

    function newTabButtonHTML(id, type) {
      const handler = type === 'proxy' ? `openProxyTab('${id}')` : `openGameTab('${id}')`;
      return `
        <button class="icon-btn" data-tooltip="Open in New Tab" onclick="${handler}" aria-label="Open in new tab">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14 3h7v7"></path>
            <path d="M10 14L21 3"></path>
            <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"></path>
          </svg>
        </button>`;
    }

    function buildGamesHTML(section, query = '') {
      const titles = {
        games: "Games",
        proxies: "Proxies",
        tools: "Tools"
      };

      const source = sectionData[section] || [];
      const items = source.filter(i => i.title.toLowerCase().includes(query.toLowerCase()));

      const cards = items.map(item => `
          <div class="game-card" ${cardOpenAttrs(section, item)}>
            <div class="game-thumb">${buildThumb(item)}</div>
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.desc)}</p>
          </div>
        `).join('');

      return `
        <div class="section">
          <h2 class="section-title">${titles[section] || section}</h2>
          ${settings.sectionSearch ? `
            <div class="section-search">
              <input
                id="searchInput"
                oninput="handleSearch(this.value)"
                placeholder="Search games, tools..."
                aria-label="Search ${titles[section] || section}">
            </div>
          ` : ''}
          <div class="games-grid" id="gamesGrid">${cards}</div>
        </div>
      `;
    }

    function buildGamePage(id) {
      const game = gameIndex[id] || sectionData.games[0];

      return `
        <div class="game-page">
          <div class="game-page-wrap">
            <section class="game-detail-hero">
              <div class="game-detail-copy">
                <div class="game-detail-icon">
                  <img src="${escapeHTML(game.image)}" alt="${escapeHTML(game.title)} icon">
                </div>
                <div>
                  <h2>${escapeHTML(game.title)}</h2>
                  <p>${escapeHTML(game.desc)}</p>
                </div>
              </div>
              <div class="game-actions">
                ${backButtonHTML}
                ${fullscreenButtonHTML}
                ${newTabButtonHTML(game.id, 'game')}
              </div>
            </section>

            <section class="game-frame-card">
              <div class="game-frame-top">
                <span>Embedded Game</span>
                <span>${escapeHTML(game.title)}</span>
              </div>
              <div class="game-frame-wrap" id="gameFrameWrap">
                <iframe
                  id="gameFrame"
                  src="${escapeHTML(game.url)}"
                  title="${escapeHTML(game.title)}"
                  allow="fullscreen"
                  allowfullscreen
                  loading="lazy"></iframe>
              </div>
            </section>

            ${settings.showPlayerSuggestions ? `
            <section class="game-suggestions">
              <h3>Game Suggestions</h3>
              <div class="suggestion-grid">
                ${suggestionData.map(item => `
                  <div class="suggestion-card">
                    <span>${item.emoji}</span>
                    <h4>${escapeHTML(item.title)}</h4>
                    <p>${escapeHTML(item.desc)}</p>
                  </div>
                `).join('')}
              </div>
            </section>
            ` : ''}
          </div>
        </div>
      `;
    }

    function buildProxyFrame(proxy) {
      if (proxy.embeddable === false) {
        return `
              <div class="game-frame-wrap proxy-frame-fallback" id="gameFrameWrap">
                <div class="proxy-open-panel">
                  <button class="proxy-open-btn" type="button" onclick="openProxyTab('${proxy.id}')">Open Proxy in New Tab</button>
                </div>
              </div>`;
      }

      return `
              <div class="game-frame-wrap" id="gameFrameWrap">
                <iframe
                  id="gameFrame"
                  src="${escapeHTML(proxy.url)}"
                  title="${escapeHTML(proxy.title)}"
                  allow="fullscreen"
                  allowfullscreen
                  loading="lazy"></iframe>
              </div>`;
    }

    function buildProxyPage(id) {
      const proxy = proxyIndex[id] || sectionData.proxies[0];
      const embeddable = proxy.embeddable !== false;
      const proxyActions = embeddable
        ? `${backButtonHTML}${incognitoButtonHTML(proxy.id)}${fullscreenButtonHTML}`
        : backButtonHTML;

      return `
        <div class="game-page">
          <div class="game-page-wrap">
            <section class="game-detail-hero">
              <div class="game-detail-copy">
                <div class="game-detail-icon">
                  <img src="${escapeHTML(proxy.image)}" alt="${escapeHTML(proxy.title)} icon">
                </div>
                <div>
                  <h2>${escapeHTML(proxy.title)}</h2>
                  <p>${escapeHTML(proxy.desc)}</p>
                </div>
              </div>
              <div class="game-actions">
                ${proxyActions}
              </div>
            </section>

            <section class="game-frame-card">
              <div class="game-frame-top">
                <span>${embeddable ? 'Embedded Proxy' : 'External Proxy'}</span>
                <span>${escapeHTML(proxy.title)}</span>
              </div>
              ${buildProxyFrame(proxy)}
            </section>
          </div>
        </div>
      `;
    }

    function buildInfoHTML() {
      return `
        <div class="info-page">
          <div class="info-wrap">
            <section class="info-hero">
              <div class="info-kicker">Voltra Hub</div>
              <h2>Fast access, clean visuals, and everything in one place.</h2>
              <p>
                Voltra is designed as a modern browser launchpad for games, proxy tools, utilities, and lightweight web apps.
                The interface keeps things atmospheric without getting in the way, so switching from play to tools feels quick and natural.
              </p>
              <div class="info-stats">
                <div class="info-stat">
                  <strong>4</strong>
                  <span>Main hub categories</span>
                </div>
                <div class="info-stat">
                  <strong>11</strong>
                  <span>Featured playable games</span>
                </div>
                <div class="info-stat">
                  <strong>v1.0</strong>
                  <span>Early access foundation</span>
                </div>
              </div>
            </section>

            <div class="info-layout">
              <section class="info-panel">
                <h3>What Voltra includes</h3>
                <p>
                  The site is organized around the things people actually open often: games, proxies, tools, and general updates.
                  Each area can grow without changing the overall feel of the hub.
                </p>
                <div class="info-feature-grid">
                  <div class="info-feature">
                    <span>🍪</span>
                    <h4>Cookie Clicker</h4>
                    <p>The current featured game launches inside a themed Voltra player page.</p>
                  </div>
                  <div class="info-feature">
                    <span>🌐</span>
                    <h4>Gust Proxy</h4>
                    <p>Download and run GUST on any device, then open it here with fullscreen and private-tab controls.</p>
                  </div>
                  <div class="info-feature">
                    <span>🧰</span>
                    <h4>Useful Tools</h4>
                    <p>Lightweight utilities for notes, links, tabs, files, and small browser workflows.</p>
                  </div>
                  <div class="info-feature">
                    <span>✨</span>
                    <h4>Custom Feel</h4>
                    <p>Theme colors, glow intensity, particles, motion, layout density, and audio controls.</p>
                  </div>
                </div>
              </section>

              <aside class="info-panel">
                <h3>Project Notes</h3>
                <div class="info-list">
                  <div class="info-list-item">
                    <div class="info-dot"></div>
                    <div>
                      <strong>Early Access</strong>
                      <p>Voltra is still expanding, with more sections and launchable content planned.</p>
                    </div>
                  </div>
                  <div class="info-list-item">
                    <div class="info-dot"></div>
                    <div>
                      <strong>Visual System</strong>
                      <p>The current style uses glass panels, ambient particles, and adjustable neon illumination.</p>
                    </div>
                  </div>
                  <div class="info-list-item">
                    <div class="info-dot"></div>
                    <div>
                      <strong>Game Player</strong>
                      <p>Games open in a dedicated themed page with fullscreen and new-tab controls.</p>
                    </div>
                  </div>
                  <div class="info-list-item">
                    <div class="info-dot"></div>
                    <div>
                      <strong>Settings</strong>
                      <p>Use the cog to tune audio, visuals, motion, contrast, and page layout behavior.</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      `;
    }

    function formatSettingValue(id) {
      if (id === 'musicVolume' || id === 'sfxVolume' || id === 'glow') return `${settings[id]}%`;
      return settings[id];
    }

    function buildSettingsHTML() {
      const toggleRow = (id, title, desc, checked) => `
        <div class="settings-row">
          <div class="settings-row-left">
            <h4>${title}</h4>
            <p>${desc}</p>
          </div>
          <label class="toggle">
            <input type="checkbox" id="setting-${id}" ${checked ? 'checked' : ''} onchange="onToggle('${id}', this.checked)">
            <span class="toggle-slider"></span>
          </label>
        </div>
      `;

      const rangeRow = (id, title, desc, min, max, step) => `
        <div class="settings-row">
          <div class="settings-row-left">
            <h4>${title}</h4>
            <p>${desc}</p>
          </div>
          <div class="settings-control">
            <input class="settings-range" type="range" min="${min}" max="${max}" step="${step}" value="${settings[id]}" oninput="onRange('${id}', this.value)">
            <span class="settings-value" id="${id}-value">${formatSettingValue(id)}</span>
          </div>
        </div>
      `;

      const selectRow = (id, title, desc, options) => `
        <div class="settings-row">
          <div class="settings-row-left">
            <h4>${title}</h4>
            <p>${desc}</p>
          </div>
          <div class="settings-control">
            <select class="settings-select" onchange="onSelect('${id}', this.value)">
              ${options.map(opt => `<option value="${opt.value}" ${settings[id] === opt.value ? 'selected' : ''}>${opt.label}</option>`).join('')}
            </select>
          </div>
        </div>
      `;

      const segmentRow = (id, title, desc, options) => `
        <div class="settings-row">
          <div class="settings-row-left">
            <h4>${title}</h4>
            <p>${desc}</p>
          </div>
          <div class="settings-control">
            <div class="segmented">
              ${options.map(opt => `<button type="button" class="${settings[id] === opt.value ? 'active' : ''}" onclick="setOption('${id}', '${opt.value}')">${opt.label}</button>`).join('')}
            </div>
          </div>
        </div>
      `;

      const textRow = (id, title, desc, placeholder) => `
        <div class="settings-row">
          <div class="settings-row-left">
            <h4>${title}</h4>
            <p>${desc}</p>
          </div>
          <div class="settings-control">
            <input
              class="settings-text"
              type="text"
              id="setting-${id}"
              value="${escapeHTML(settings[id] || '')}"
              placeholder="${escapeHTML(placeholder)}"
              oninput="onTextSetting('${id}', this.value)">
          </div>
        </div>
      `;

      const panel = (id, title, desc, rows) => `
        <section class="settings-panel ${settingsPanel === id ? 'active' : ''}" data-panel="${id}">
          <header class="settings-panel-head">
            <h3>${title}</h3>
            <p>${desc}</p>
          </header>
          <div class="settings-panel-body">${rows}</div>
        </section>
      `;

      const navItem = (id, label, hint) => `
        <button
          type="button"
          class="settings-nav-item ${settingsPanel === id ? 'active' : ''}"
          data-panel="${id}"
          onclick="switchSettingsPanel('${id}')"
          aria-current="${settingsPanel === id ? 'true' : 'false'}">
          <span class="settings-nav-label">${label}</span>
          <span class="settings-nav-hint">${hint}</span>
        </button>
      `;

      const audioPanel = panel('audio', 'Audio', 'Control background music and interface sound effects.', `
        ${toggleRow('music', 'Background Music', 'Play atmospheric music while you browse.', settings.music)}
        ${rangeRow('musicVolume', 'Music Volume', 'Set the background music level.', 0, 50, 1)}
        ${toggleRow('sfx', 'Sound Effects', 'Play hover and interaction sounds.', settings.sfx)}
        ${rangeRow('sfxVolume', 'Sound Effect Volume', 'Adjust hover and interaction sound volume.', 0, 50, 1)}
      `);

      const appearancePanel = panel('appearance', 'Appearance', 'Tune colors, glow, particles, and background atmosphere.', `
        ${selectRow('accent', 'Accent Theme', 'Change the glow color system across the interface.', [
          { value: 'aurora', label: 'Aurora' },
          { value: 'cyan', label: 'Cyan' },
          { value: 'violet', label: 'Violet' },
          { value: 'emerald', label: 'Emerald' }
        ])}
        ${rangeRow('glow', 'Glow Intensity', 'Tune hover illumination and neon effects.', 40, 160, 5)}
        ${toggleRow('particles', 'Particle Animation', 'Animated star particles in the background.', settings.particles)}
        ${segmentRow('particleDensity', 'Particle Density', 'Choose how many background particles are shown.', [
          { value: 'low', label: 'Low' },
          { value: 'normal', label: 'Normal' },
          { value: 'high', label: 'High' }
        ])}
        ${toggleRow('backgroundOrbs', 'Background Glow Orbs', 'Show soft ambient color orbs behind the interface.', settings.backgroundOrbs)}
        ${toggleRow('highContrast', 'High Contrast', 'Increase text and panel contrast for easier scanning.', settings.highContrast)}
      `);

      const motionPanel = panel('motion', 'Motion', 'Adjust animation intensity and navigation feel.', `
        ${toggleRow('reducedMotion', 'Reduce Motion', 'Minimize animations across the interface.', settings.reducedMotion)}
        ${toggleRow('smoothScroll', 'Smooth Scrolling', 'Use smooth scroll when moving between pages and sections.', settings.smoothScroll)}
      `);

      const interfacePanel = panel('interface', 'Interface', 'Customize browsing layout and player page behavior.', `
        ${toggleRow('compactCards', 'Compact Cards', 'Show smaller cards for denser browsing pages.', settings.compactCards)}
        ${toggleRow('sectionSearch', 'Section Search Bars', 'Show search fields at the top of Games, Proxies, and Tools.', settings.sectionSearch)}
        ${toggleRow('showPlayerSuggestions', 'Game Suggestions', 'Show recommendation cards below the game player.', settings.showPlayerSuggestions)}
      `);

      const cloakingPanel = panel('cloaking', 'Cloaking', 'Disguise your browser tab and control how games and proxies launch externally.', `
        ${toggleRow('tabCloak', 'Tab Cloaking', 'Change the tab title and favicon to a school-safe disguise.', settings.tabCloak)}
        ${toggleRow('autoTabCloak', 'Auto Tab Cloaking', 'Only apply disguises while a game or proxy player page is open.', settings.autoTabCloak)}
        ${selectRow('cloakPreset', 'Cloak Preset', 'Choose a preset title and icon style for tab disguises.', [
          { value: 'google', label: 'Google' },
          { value: 'classroom', label: 'Classroom' },
          { value: 'drive', label: 'Drive' },
          { value: 'docs', label: 'Docs' },
          { value: 'home', label: 'Home' }
        ])}
        ${textRow('cloakCustomTitle', 'Custom Tab Title', 'Optional override for the disguised tab title. Leave blank to use the preset.', 'e.g. Google')}
        ${toggleRow('autoExternalLaunch', 'Auto External Launch', 'Automatically open games and proxies in an extra tab when you launch them.', settings.autoExternalLaunch)}
        ${segmentRow('autoLaunchMode', 'Auto Launch Mode', 'Choose how the automatic external tab is created.', [
          { value: 'aboutBlank', label: 'About:Blank' },
          { value: 'blob', label: 'Blob' }
        ])}
        <div class="settings-note">
          Auto launch and cloaking preferences are saved in your browser and restore when you return later.
        </div>
      `);

      const systemPanel = panel('system', 'System', 'Reset preferences and view hub information.', `
        <div class="settings-about-card">
          <strong>Voltra Proxy</strong>
          <p>Early access hub for games, proxies, and tools with a glass neon interface.</p>
          <div class="settings-about-meta">
            <span>11 games</span>
            <span>6 proxies</span>
            <span>v1.0.0</span>
          </div>
        </div>
        <button type="button" class="settings-reset" onclick="resetSettings()">Reset All Settings</button>
      `);

      return `
        <div class="settings-page">
          <div class="settings-window">
            <header class="settings-window-header">
              <h2>Settings</h2>
            </header>
            <div class="settings-window-body">
              <nav class="settings-sidebar" aria-label="Settings categories">
                ${navItem('audio', 'Audio', 'Music & SFX')}
                ${navItem('appearance', 'Appearance', 'Theme & FX')}
                ${navItem('motion', 'Motion', 'Animation')}
                ${navItem('interface', 'Interface', 'Layout')}
                ${navItem('cloaking', 'Cloaking', 'Tab & launch')}
                ${navItem('system', 'System', 'About & reset')}
              </nav>
              <div class="settings-panels">
                ${audioPanel}
                ${appearancePanel}
                ${motionPanel}
                ${interfacePanel}
                ${cloakingPanel}
                ${systemPanel}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function switchSettingsPanel(id) {
      settingsPanel = id;
      saveStoredSettings();
      document.querySelectorAll('.settings-nav-item').forEach(btn => {
        const active = btn.dataset.panel === id;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-current', active ? 'true' : 'false');
      });
      document.querySelectorAll('.settings-panel').forEach(panel => {
        panel.classList.toggle('active', panel.dataset.panel === id);
      });
    }

    function render(section, query = '') {
      currentSection = section;
      if (section === 'games' || section === 'proxies' || section === 'tools') {
        lastBrowseQuery = query;
      }

      const isFullPage = fullPageSections.includes(section);

      heroSection.style.display = isFullPage ? 'none' : '';

      let html = '';
      if (section === 'settings') {
        html = buildSettingsHTML();
      } else if (section === 'info') {
        html = buildInfoHTML();
      } else {
        html = buildGamesHTML(section, query);
      }

      mainContent.innerHTML = html;
      setActiveNav(section);
      attachHoverSFX();
      updateTabCloakState();
      requestAnimationFrame(syncLayout);
    }

    function loadSection(section) {
      render(section);
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
    }

    function captureBrowseState(section) {
      returnSection = section;
      const searchInput = document.getElementById('searchInput');
      lastBrowseQuery = searchInput ? searchInput.value : '';
    }

    function openGame(id) {
      const game = gameIndex[id];
      if (!game) return;

      captureBrowseState('games');
      currentSection = 'game';
      heroSection.style.display = 'none';
      mainContent.innerHTML = buildGamePage(id);
      setActiveNav('games');
      attachHoverSFX();
      updateTabCloakState();
      maybeAutoLaunchExternal(game.url, game.title);
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
      requestAnimationFrame(syncLayout);
    }

    function openProxy(id) {
      const proxy = proxyIndex[id];
      if (!proxy) return;

      captureBrowseState('proxies');
      currentSection = 'proxy';
      heroSection.style.display = 'none';
      mainContent.innerHTML = buildProxyPage(id);
      setActiveNav('proxies');
      attachHoverSFX();
      updateTabCloakState();
      if (proxy.url) maybeAutoLaunchExternal(proxy.url, proxy.title);
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
      requestAnimationFrame(syncLayout);
    }

    function backFromPlayer() {
      render(returnSection, lastBrowseQuery);
      heroSection.style.display = 'none';
      setActiveNav(returnSection);
      attachHoverSFX();
      updateTabCloakState();
      window.scrollTo({ top: 0, behavior: 'auto' });
      requestAnimationFrame(syncLayout);
    }

    function handleCardKey(event, id, section = 'games') {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (section === 'proxies') openProxy(id);
        else openGame(id);
      }
    }

    function fullscreenFrame() {
      const frameWrap = document.getElementById('gameFrameWrap');
      const frame = document.getElementById('gameFrame');
      const target = frameWrap || frame;

      if (target && target.requestFullscreen) {
        target.requestFullscreen().catch(() => {});
      }
    }

    function openGameTab(id) {
      const game = gameIndex[id];
      if (!game) return;
      window.open(game.url, '_blank', 'noopener,noreferrer');
    }

    function openProxyTab(id) {
      const proxy = proxyIndex[id];
      if (!proxy) return;
      window.open(proxy.url, '_blank', 'noopener,noreferrer');
    }

    function openProxyBlankTab(id) {
      const proxy = proxyIndex[id];
      if (!proxy) return;
      openUrlInAboutBlank(proxy.url, proxy.title);
    }

    function setActiveNav(section) {
      document.querySelectorAll('.nav-links span').forEach(el => {
        el.classList.toggle('active', el.dataset.section === section);
      });
    }

    function clearHomeSearch() {
      homeSearchInput.value = '';
      homeSearchStack.classList.remove('searching');
      homeSearchResults.classList.remove('active');
      homeSearchResults.innerHTML = '';
    }

    function handleHomeSearch(query) {
      const value = query.trim().toLowerCase();

      if (!value) {
        homeSearchStack.classList.remove('searching');
        homeSearchResults.classList.remove('active');
        homeSearchResults.innerHTML = '';
        return;
      }

      const groups = Object.entries(searchPages).map(([section, page]) => {
        const matches = page.items.filter(item => {
          const haystack = `${item.title} ${item.desc} ${item.badge} ${page.label}`.toLowerCase();
          return haystack.includes(value);
        });

        return { section, label: page.label, matches };
      }).filter(group => group.matches.length > 0);

      homeSearchStack.classList.add('searching');
      homeSearchResults.classList.add('active');

      if (!groups.length) {
        homeSearchResults.innerHTML = `
          <div class="home-search-empty">No matching games, tools, apps, or pages found.</div>
        `;
        return;
      }

      homeSearchResults.innerHTML = `
        <div class="home-search-inner">
          ${groups.map(group => `
            <div class="home-search-section">
              <div class="home-search-heading">
                <span>${escapeHTML(group.label)}</span>
                <span>${group.matches.length} result${group.matches.length === 1 ? '' : 's'}</span>
              </div>
              ${group.matches.map(item => `
                <button class="home-search-item" data-section="${escapeHTML(group.section)}" data-title="${escapeHTML(item.title)}" onclick="openSearchResult(this.dataset.section, this.dataset.title)">
                  <div class="home-search-icon">
                    ${item.image ? `<img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)} icon">` : item.emoji}
                  </div>
                  <div class="home-search-copy">
                    <strong>${escapeHTML(item.title)}</strong>
                    <p>${escapeHTML(item.desc)}</p>
                  </div>
                </button>
              `).join('')}
            </div>
          `).join('')}
        </div>
      `;

      attachHoverSFX();
    }

    function openSearchResult(section, title) {
      const match = (sectionData[section] || []).find(item => item.title === title);

      if (match && match.url && match.id) {
        if (section === 'proxies') openProxy(match.id);
        else openGame(match.id);
        return;
      }

      loadSection(section);

      requestAnimationFrame(() => {
        const searchInput = document.getElementById('searchInput');
        if (searchInput && section !== 'info') {
          searchInput.value = title;
          handleSearch(title);
        }
      });
    }

    function handleSearch(query) {
      if (currentSection && !['settings', 'info', 'game', 'proxy'].includes(currentSection)) {
        const grid = document.getElementById('gamesGrid');
        if (!grid) return;
        const items = (sectionData[currentSection] || [])
          .filter(i => i.title.toLowerCase().includes(query.toLowerCase()));
        grid.innerHTML = items.map(item => `
          <div class="game-card" ${cardOpenAttrs(currentSection, item)}>
            <div class="game-thumb">${buildThumb(item)}</div>
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.desc)}</p>
          </div>
        `).join('');
        attachHoverSFX();
      }
    }

    function goHome() {
      heroSection.style.display = '';
      mainContent.innerHTML = '';
      currentSection = null;
      setActiveNav(null);
      clearHomeSearch();
      updateTabCloakState();
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
      requestAnimationFrame(syncLayout);
    }

    function applySettings() {
      const root = document.documentElement;
      const theme = accentThemes[settings.accent] || accentThemes.aurora;
      const glowLevel = settings.glow / 100;
      const targetParticles = settings.particles ? particleDensityMap[settings.particleDensity] : 0;

      root.style.setProperty('--accent-a', theme.a);
      root.style.setProperty('--accent-b', theme.b);
      root.style.setProperty('--accent-c', theme.c);
      root.style.setProperty('--bg-glow-a', (0.15 * glowLevel).toFixed(3));
      root.style.setProperty('--bg-glow-b', (0.14 * glowLevel).toFixed(3));
      root.style.setProperty('--bg-glow-c', (0.08 * glowLevel).toFixed(3));
      root.style.setProperty('--glow-soft', (0.22 * glowLevel).toFixed(3));
      root.style.setProperty('--glow-medium', (0.16 * glowLevel).toFixed(3));
      root.style.setProperty('--glow-strong', (0.55 * glowLevel).toFixed(3));
      root.style.setProperty('--glow-outline', (0.25 * glowLevel).toFixed(3));
      root.style.setProperty('--glow-card-a', (0.16 * glowLevel).toFixed(3));
      root.style.setProperty('--glow-card-b', (0.12 * glowLevel).toFixed(3));
      root.style.setProperty('--card-radius', settings.compactCards ? '18px' : '28px');
      root.style.setProperty('--thumb-radius', settings.compactCards ? '14px' : '20px');

      document.body.classList.toggle('reduced-motion', settings.reducedMotion);
      document.body.classList.toggle('compact-cards', settings.compactCards);
      document.body.classList.toggle('high-contrast', settings.highContrast);
      document.body.classList.toggle('hide-orbs', !settings.backgroundOrbs);

      visualMotionReduced = settings.reducedMotion;
      music.volume = settings.musicVolume / 100;
      music.muted = muted || !settings.music;
      window.__voltraSfxVolume = settings.sfx ? settings.sfxVolume / 100 : 0;

      canvas.style.opacity = settings.particles ? (settings.highContrast ? '0.68' : '0.9') : '0';

      while (particles.length < targetParticles) particles.push(new Particle());
      if (particles.length > targetParticles) particles.length = targetParticles;

      updateTabCloakState();
    }

    function onToggle(id, val) {
      settings[id] = val;

      if (id === 'music') {
        muted = !val;
        updateMuteIcon(muted);
      }

      saveStoredSettings();
      applySettings();
    }

    function onRange(id, val) {
      settings[id] = Number(val);
      const output = document.getElementById(`${id}-value`);
      if (output) output.textContent = formatSettingValue(id);
      saveStoredSettings();
      applySettings();
    }

    function onSelect(id, val) {
      settings[id] = val;
      saveStoredSettings();
      applySettings();
    }

    function onTextSetting(id, val) {
      settings[id] = val;
      saveStoredSettings();
      applySettings();
    }

    function setOption(id, val) {
      settings[id] = val;
      saveStoredSettings();
      applySettings();
      if (currentSection === 'settings') render('settings');
    }

    function resetSettings() {
      Object.assign(settings, defaultSettings);
      settingsPanel = 'audio';
      muted = false;
      updateMuteIcon(false);
      try {
        localStorage.removeItem(SETTINGS_STORAGE_KEY);
      } catch (err) {
        console.warn('Could not clear saved settings.', err);
      }
      applySettings();
      render('settings');
    }

    function attachHoverSFX() {
      document.querySelectorAll('.game-card, .info-panel, .info-feature, .settings-reset, .settings-nav-item, .home-search-item, .suggestion-card, .icon-btn, .proxy-open-btn').forEach(el => {
        if (!el.dataset.sfx) {
          el.dataset.sfx = "1";
          el.addEventListener('mouseenter', () => playHover(0.92));
        }
      });
    }

    document.querySelectorAll('.nav-links span').forEach(el => {
      el.addEventListener('mouseenter', () => playHover(1));
    });

    document.querySelectorAll('.hero-search').forEach(el => {
      el.addEventListener('mouseenter', () => playHover(0.92));
    });

    document.querySelector('.settings-cog').addEventListener('mouseenter', () => playHover(1.1));

    const muteBtn = document.getElementById('muteBtn');
    let muted = false;

    function updateMuteIcon(isMuted) {
      const svg = muteBtn.querySelector('svg path');
      if (isMuted) {
        svg.setAttribute('d', 'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z');
      } else {
        svg.setAttribute('d', 'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z');
      }
    }

    muteBtn.addEventListener('click', () => {
      muted = !muted;
      settings.music = !muted;
      updateMuteIcon(muted);
      saveStoredSettings();
      applySettings();

      const t = document.getElementById('setting-music');
      if (t) t.checked = !muted;
    });

    applySettings();
  