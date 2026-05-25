
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
        { title: "Proxy Browser", desc: "Private browsing tool for fast web access.", badge: "APP", emoji: "🛠️" },
        { title: "Nebula Gateway", desc: "A clean proxy launcher built for quick sessions.", badge: "FAST", emoji: "🌐" },
        { title: "Mirror Link", desc: "Backup access point for supported web apps.", badge: "ALT", emoji: "🔗" },
        { title: "Cloud Route", desc: "Lightweight browsing path with a minimal interface.", badge: "NEW", emoji: "☁️" }
      ],
      tools: [
        { title: "File Hub", desc: "Cloud file launcher.", badge: "NEW", emoji: "📁" },
        { title: "Quick Notes", desc: "Simple scratchpad for browser sessions.", badge: "TOOLS", emoji: "📝" },
        { title: "Tab Vault", desc: "Save and relaunch useful web destinations.", badge: "SAVE", emoji: "🧭" },
        { title: "Link Cleaner", desc: "Trim messy links into cleaner shareable URLs.", badge: "UTILITY", emoji: "✨" }
      ]
    };

    const gameIndex = Object.fromEntries(sectionData.games.map(game => [game.id, game]));

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
      sectionSearch: true
    };

    const settings = { ...defaultSettings };

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

    function buildGamesHTML(section, query = '') {
      const titles = {
        games: "Games",
        proxies: "Proxies",
        tools: "Tools"
      };

      const source = sectionData[section] || [];
      const items = source.filter(i => i.title.toLowerCase().includes(query.toLowerCase()));

      const cards = items.map(item => {
        const playableAttrs = item.url
          ? `role="button" tabindex="0" onclick="openGame('${item.id}')" onkeydown="handleCardKey(event, '${item.id}')"`
          : '';

        return `
          <div class="game-card" ${playableAttrs}>
            <div class="game-thumb">${buildThumb(item)}</div>
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.desc)}</p>
          </div>
        `;
      }).join('');

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
                <button class="icon-btn" data-tooltip="Fullscreen" onclick="fullscreenGame()" aria-label="Fullscreen">
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
                </button>
                <button class="icon-btn" data-tooltip="Open in New Tab" onclick="openGameTab('${game.id}')" aria-label="Open in new tab">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 3h7v7"></path>
                    <path d="M10 14L21 3"></path>
                    <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"></path>
                  </svg>
                </button>
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
                    <h4>Proxy Access</h4>
                    <p>Clean entry points for browsing tools and alternate access routes.</p>
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
              ${options.map(opt => `<button class="${settings[id] === opt.value ? 'active' : ''}" onclick="setOption('${id}', '${opt.value}')">${opt.label}</button>`).join('')}
            </div>
          </div>
        </div>
      `;

      return `
        <div class="settings-page">
          <h2>Settings</h2>
          <p class="settings-desc">Customize your Voltra experience.</p>

          <div class="settings-group">
            <div class="settings-group-label">Audio</div>
            ${toggleRow('music', 'Background Music', 'Play atmospheric music while you browse.', settings.music)}
            ${rangeRow('musicVolume', 'Music Volume', 'Set the background music level.', 0, 50, 1)}
            ${toggleRow('sfx', 'Sound Effects', 'Play hover and interaction sounds.', settings.sfx)}
            ${rangeRow('sfxVolume', 'Sound Effect Volume', 'Adjust hover and interaction sound volume.', 0, 50, 1)}
          </div>

          <div class="settings-group">
            <div class="settings-group-label">Visuals</div>
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
            ${toggleRow('reducedMotion', 'Reduce Motion', 'Minimize animations across the interface.', settings.reducedMotion)}
            ${toggleRow('highContrast', 'High Contrast', 'Increase text and panel contrast for easier scanning.', settings.highContrast)}
          </div>

          <div class="settings-group">
            <div class="settings-group-label">Layout</div>
            ${toggleRow('compactCards', 'Compact Cards', 'Show smaller cards for denser browsing pages.', settings.compactCards)}
            ${toggleRow('sectionSearch', 'Section Search Bars', 'Show search fields at the top of Games, Proxies, and Tools.', settings.sectionSearch)}
            <button class="settings-reset" onclick="resetSettings()">Reset Customization</button>
          </div>

          <div class="version-tag">VOLTRA v1.0.0 — Early Access</div>
        </div>
      `;
    }

    function render(section, query = '') {
      currentSection = section;

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
      requestAnimationFrame(syncLayout);
    }

    function loadSection(section) {
      render(section);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function openGame(id) {
      const game = gameIndex[id];
      if (!game) return;

      currentSection = 'game';
      heroSection.style.display = 'none';
      mainContent.innerHTML = buildGamePage(id);
      setActiveNav('games');
      attachHoverSFX();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      requestAnimationFrame(syncLayout);
    }

    function handleCardKey(event, id) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openGame(id);
      }
    }

    function fullscreenGame() {
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

      if (match && match.url) {
        openGame(match.id);
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
      if (currentSection && currentSection !== 'settings' && currentSection !== 'info' && currentSection !== 'game') {
        const grid = document.getElementById('gamesGrid');
        if (!grid) return;
        const items = (sectionData[currentSection] || [])
          .filter(i => i.title.toLowerCase().includes(query.toLowerCase()));
        grid.innerHTML = items.map(item => `
          <div class="game-card" ${item.url ? `role="button" tabindex="0" onclick="openGame('${item.id}')" onkeydown="handleCardKey(event, '${item.id}')"` : ''}>
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

      visualMotionReduced = settings.reducedMotion;
      music.volume = settings.musicVolume / 100;
      music.muted = muted || !settings.music;
      window.__voltraSfxVolume = settings.sfx ? settings.sfxVolume / 100 : 0;

      canvas.style.opacity = settings.particles ? (settings.highContrast ? '0.68' : '0.9') : '0';

      while (particles.length < targetParticles) particles.push(new Particle());
      if (particles.length > targetParticles) particles.length = targetParticles;
    }

    function onToggle(id, val) {
      settings[id] = val;

      if (id === 'music') {
        muted = !val;
        muteBtn.innerText = muted ? '🔇' : '🔊';
      }

      applySettings();
    }

    function onRange(id, val) {
      settings[id] = Number(val);
      const output = document.getElementById(`${id}-value`);
      if (output) output.textContent = formatSettingValue(id);
      applySettings();
    }

    function onSelect(id, val) {
      settings[id] = val;
      applySettings();
    }

    function setOption(id, val) {
      settings[id] = val;
      applySettings();
      if (currentSection === 'settings') render('settings');
    }

    function resetSettings() {
      Object.assign(settings, defaultSettings);
      muted = false;
      muteBtn.innerText = '🔊';
      applySettings();
      render('settings');
    }

    function attachHoverSFX() {
      document.querySelectorAll('.game-card, .info-panel, .info-feature, .settings-reset, .home-search-item, .suggestion-card, .icon-btn').forEach(el => {
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

    muteBtn.addEventListener('click', () => {
      muted = !muted;
      settings.music = !muted;
      muteBtn.innerText = muted ? '🔇' : '🔊';
      applySettings();

      const t = document.getElementById('setting-music');
      if (t) t.checked = !muted;
    });

    applySettings();
  