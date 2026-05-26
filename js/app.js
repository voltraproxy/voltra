
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
      setTimeout(() => {
        intro.remove();
        typeCyclingText();
      }, 700);
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
      const heroDescription = document.querySelector('.hero p');
      const heroSearch = document.querySelector('.hero-search-stack');

      if (nav) {
        document.documentElement.style.setProperty('--nav-height', `${Math.ceil(nav.getBoundingClientRect().height)}px`);
      }

      if (heroTitle && heroSearch) {
        const titleWidth = Math.ceil(heroTitle.getBoundingClientRect().width);
        const descWidth = heroDescription ? Math.ceil(heroDescription.getBoundingClientRect().width) : 0;

        // Only compute search width once on first initialization, never recalculate
        if (!heroSearchWidthInitialized && titleWidth > 0) {
          const compact = window.innerWidth < 420;
          const initialCap = window.innerWidth - (compact ? 24 : 80);
          const expandedCap = window.innerWidth - (compact ? 12 : 40);
          const minInitial = Math.min(500, initialCap);
          const baseWidth = Math.max(titleWidth + 120, descWidth + 40, minInitial);
          const initialWidth = Math.min(Math.max(baseWidth, minInitial), initialCap);
          const expandedTarget = Math.max(initialWidth + (compact ? 48 : 150), descWidth + (compact ? 20 : 80));
          const expandedWidth = Math.min(expandedTarget, expandedCap);

          const newInitial = `${Math.round(initialWidth)}px`;
          const newExpanded = `${Math.round(Math.max(initialWidth, expandedWidth))}px`;

          heroSearch.style.setProperty('--hero-search-width', newInitial);
          heroSearch.style.setProperty('--hero-search-expanded-width', newExpanded);
          heroSearchWidthInitialized = true;
        }
      }
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        syncLayout();
      }, 150);
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
      autoLaunchMode: 'aboutBlank',
      autoLaunchOnLoad: false,
      requirePassword: false,
      websitePassword: '',
      username: '',
      autoLock: false,
      autoLockTime: '15',
      bypassKeybind: ''
    };

    const settings = { ...defaultSettings };
    let settingsPanel = 'audio';

    const cyclingPhrases = [
      "Welcome, username.",
      "Play Anything.",
      "Welcome to Voltra.",
      "Your gaming hub.",
      "Unblocked games await.",
      "Proxies at your fingertips.",
      "Tools for everything.",
      "Ready to play?",
      "Let's get started.",
      "Infinite possibilities.",
      "Your escape begins here.",
      "No limits, just fun.",
      "Browse freely.",
      "Access everything.",
      "Your playground awaits.",
      "Gaming redefined.",
      "The future of browsing.",
      "Your digital sanctuary.",
      "Unlock the web.",
      "Freedom to play.",
      "Your portal to fun.",
      "Where gaming lives.",
      "Your daily dose of fun.",
      "Entertainment unleashed.",
      "Your gaming companion.",
      "Play without limits.",
      "Your web oasis.",
      "Discover, play, enjoy.",
      "Your gaming destination.",
      "Fun awaits you.",
      "Your escape from boredom.",
      "Gaming made simple.",
      "Your personal arcade.",
      "Unlimited entertainment.",
      "Your web playground.",
      "Play, explore, repeat.",
      "Your gaming universe.",
      "Fun is just a click away.",
      "Your digital playground.",
      "Gaming without boundaries.",
      "Your entertainment hub.",
      "Where fun begins.",
      "Change your theme in Settings.",
      "Use the cog to customize audio and motion.",
      "Open games in a new tab from the cards.",
      "Adjust particles and glow from the Appearance panel.",
      "Find games, tools, and apps faster with search.",
      "Need help? Check Settings for advanced controls.",
      "Use the sidebar to switch between Games, Proxies, Tools, and Info.",
      "Save time with quick access cards and hidden features.",
      "Keep Voltra bookmarked for instant return.",
      "Your gaming sanctuary.",
      "Play freely.",
      "Your web escape.",
      "Gaming paradise.",
      "Your fun zone.",
      "Unblock your potential.",
      "Your gaming world.",
      "Entertainment at your fingertips.",
      "Your daily gaming fix.",
      "Play without restrictions.",
      "Your web gaming hub.",
      "Fun for everyone.",
      "Your gaming portal.",
      "Unlimited gaming.",
      "Your entertainment center.",
      "Where gamers gather.",
      "Your fun destination.",
      "Gaming without limits.",
      "Your web gaming world.",
      "Play anytime, anywhere.",
      "Your gaming escape.",
      "Entertainment unlimited.",
      "Your gaming oasis.",
      "Discover new games.",
      "Your gaming adventure.",
      "Play with freedom.",
      "Your web gaming paradise.",
      "Fun without boundaries.",
      "Your gaming haven.",
      "Unlock entertainment.",
      "Your gaming realm.",
      "Play your way.",
      "Your gaming universe awaits.",
      "Entertainment redefined.",
      "Your gaming journey.",
      "Play without worries.",
      "Your web gaming sanctuary.",
      "Fun for all.",
      "Your gaming experience.",
      "Unblock the fun.",
      "Your gaming destination awaits.",
      "Play with confidence.",
      "Your web gaming zone.",
      "Entertainment at its best.",
      "Your gaming paradise awaits.",
      "Discover endless fun.",
      "Your gaming adventure awaits.",
      "Play without fear.",
      "Your web gaming haven.",
      "Fun without limits.",
      "Your gaming world awaits.",
      "Unlock the gaming world.",
      "Your gaming escape awaits.",
      "Play with passion.",
      "Your web gaming destination.",
      "Entertainment for everyone.",
      "Your gaming journey awaits.",
      "Play without compromise.",
      "Your web gaming paradise awaits.",
      "Fun without restrictions.",
      "Your gaming haven awaits.",
      "Discover your gaming potential.",
      "Your gaming realm awaits.",
      "Play with style.",
      "Your web gaming world awaits.",
      "Entertainment without boundaries.",
      "Your gaming sanctuary awaits.",
      "Play with joy.",
      "Your web gaming escape awaits.",
      "Fun without compromise.",
      "Your gaming zone awaits.",
      "Unlock your gaming world.",
      "Your gaming destination awaits.",
      "Play with excitement.",
      "Your web gaming haven awaits.",
      "Entertainment without limits.",
      "Your gaming paradise awaits.",
      "Discover your gaming world.",
      "Your gaming adventure awaits.",
      "Play with enthusiasm.",
      "Your web gaming sanctuary awaits.",
      "Fun without fear.",
      "Your gaming world awaits.",
      "Unlock your gaming paradise.",
      "Your gaming escape awaits.",
      "Play with energy.",
      "Your web gaming destination awaits.",
      "Entertainment without compromise.",
      "Your gaming journey awaits.",
      "Play with creativity.",
      "Your web gaming paradise awaits.",
      "Fun without boundaries.",
      "Your gaming haven awaits.",
      "Discover your gaming sanctuary.",
      "Your gaming realm awaits.",
      "Play with imagination.",
      "Your web gaming world awaits.",
      "Entertainment without fear.",
      "Your gaming sanctuary awaits.",
      "Play with inspiration.",
      "Your web gaming escape awaits.",
      "Fun without hesitation.",
      "Your gaming zone awaits.",
      "Unlock your gaming haven.",
      "Your gaming destination awaits.",
      "Play with determination.",
      "Your web gaming haven awaits.",
      "Entertainment without hesitation.",
      "Your gaming paradise awaits.",
      "Discover your gaming haven.",
      "Your gaming adventure awaits.",
      "Play with confidence.",
      "Your web gaming sanctuary awaits.",
      "Fun without doubt.",
      "Your gaming world awaits.",
      "Unlock your gaming sanctuary.",
      "Your gaming escape awaits.",
      "Play with courage.",
      "Your web gaming destination awaits.",
      "Entertainment without doubt.",
      "Your gaming journey awaits.",
      "Play with strength.",
      "Your web gaming paradise awaits.",
      "Fun without worry.",
      "Your gaming haven awaits.",
      "Discover your gaming zone.",
      "Your gaming realm awaits.",
      "Play with power.",
      "Your web gaming world awaits.",
      "Entertainment without worry.",
      "Your gaming sanctuary awaits.",
      "Play with grace.",
      "Your web gaming escape awaits.",
      "Fun without stress.",
      "Your gaming zone awaits.",
      "Unlock your gaming zone.",
      "Your gaming destination awaits.",
      "Play with elegance.",
      "Your web gaming haven awaits.",
      "Entertainment without stress.",
      "Your gaming paradise awaits.",
      "Discover your gaming destination.",
      "Your gaming adventure awaits.",
      "Play with flair.",
      "Your web gaming sanctuary awaits.",
      "Fun without pressure.",
      "Your gaming world awaits.",
      "Unlock your gaming destination.",
      "Your gaming escape awaits.",
      "Play with charm.",
      "Your web gaming destination awaits.",
      "Entertainment without pressure.",
      "Your gaming journey awaits.",
      "Play with wit.",
      "Your web gaming paradise awaits.",
      "Fun without anxiety.",
      "Your gaming haven awaits.",
      "Discover your gaming journey.",
      "Your gaming realm awaits.",
      "Play with humor.",
      "Your web gaming world awaits.",
      "Entertainment without anxiety.",
      "Your gaming sanctuary awaits.",
      "Play with intelligence.",
      "Your web gaming escape awaits.",
      "Fun without frustration.",
      "Your gaming zone awaits.",
      "Unlock your gaming journey.",
      "Your gaming destination awaits.",
      "Play with wisdom.",
      "Your web gaming haven awaits.",
      "Entertainment without frustration.",
      "Your gaming paradise awaits.",
      "Discover your gaming wisdom.",
      "Your gaming adventure awaits.",
      "Play with knowledge.",
      "Your web gaming sanctuary awaits.",
      "Fun without confusion.",
      "Your gaming world awaits.",
      "Unlock your gaming wisdom.",
      "Your gaming escape awaits.",
      "Play with understanding.",
      "Your web gaming destination awaits.",
      "Entertainment without confusion.",
      "Your gaming journey awaits.",
      "Play with insight.",
      "Your web gaming paradise awaits.",
      "Fun without uncertainty.",
      "Your gaming haven awaits.",
      "Discover your gaming insight.",
      "Your gaming realm awaits.",
      "Play with vision.",
      "Your web gaming world awaits.",
      "Entertainment without uncertainty.",
      "Your gaming sanctuary awaits.",
      "Play with foresight.",
      "Your web gaming escape awaits.",
      "Fun without ambiguity.",
      "Your gaming zone awaits.",
      "Unlock your gaming insight.",
      "Your gaming destination awaits.",
      "Play with clarity.",
      "Your web gaming haven awaits.",
      "Entertainment without ambiguity.",
      "Your gaming paradise awaits.",
      "Discover your gaming clarity.",
      "Your gaming adventure awaits.",
      "Play with focus.",
      "Your web gaming sanctuary awaits.",
      "Fun without distraction.",
      "Your gaming world awaits.",
      "Unlock your gaming clarity.",
      "Your gaming escape awaits.",
      "Play with precision.",
      "Your web gaming destination awaits.",
      "Entertainment without distraction.",
      "Your gaming journey awaits.",
      "Play with accuracy.",
      "Your web gaming paradise awaits.",
      "Fun without error.",
      "Your gaming haven awaits.",
      "Discover your gaming precision.",
      "Your gaming realm awaits.",
      "Play with perfection.",
      "Your web gaming world awaits.",
      "Entertainment without error.",
      "Your gaming sanctuary awaits.",
      "Play with excellence.",
      "Your web gaming escape awaits.",
      "Fun without flaw.",
      "Your gaming zone awaits.",
      "Unlock your gaming precision.",
      "Your gaming destination awaits.",
      "Play with mastery.",
      "Your web gaming haven awaits.",
      "Entertainment without flaw.",
      "Your gaming paradise awaits.",
      "Discover your gaming mastery.",
      "Your gaming adventure awaits.",
      "Play with expertise.",
      "Your web gaming sanctuary awaits.",
      "Fun without mistake.",
      "Your gaming world awaits.",
      "Unlock your gaming mastery.",
      "Your gaming escape awaits.",
      "Play with skill.",
      "Your web gaming destination awaits.",
      "Entertainment without mistake.",
      "Your gaming journey awaits.",
      "Play with talent.",
      "Your web gaming paradise awaits.",
      "Fun without failure.",
      "Your gaming haven awaits.",
      "Discover your gaming talent.",
      "Your gaming realm awaits.",
      "Play with ability.",
      "Your web gaming world awaits.",
      "Entertainment without failure.",
      "Your gaming sanctuary awaits.",
      "Play with capability.",
      "Your web gaming escape awaits.",
      "Fun without weakness.",
      "Your gaming zone awaits.",
      "Unlock your gaming talent.",
      "Your gaming destination awaits.",
      "Play with competence.",
      "Your web gaming haven awaits.",
      "Entertainment without weakness.",
      "Your gaming paradise awaits.",
      "Discover your gaming competence.",
      "Your gaming adventure awaits.",
      "Play with proficiency.",
      "Your web gaming sanctuary awaits.",
      "Fun without limitation.",
      "Your gaming world awaits.",
      "Unlock your gaming competence.",
      "Your gaming escape awaits.",
      "Play with aptitude.",
      "Your web gaming destination awaits.",
      "Entertainment without limitation.",
      "Your gaming journey awaits.",
      "Play with capacity.",
      "Your web gaming paradise awaits.",
      "Fun without restriction.",
      "Your gaming haven awaits.",
      "Discover your gaming aptitude.",
      "Your gaming realm awaits.",
      "Play with potential.",
      "Your web gaming world awaits.",
      "Entertainment without restriction.",
      "Your gaming sanctuary awaits.",
      "Play with possibility.",
      "Your web gaming escape awaits.",
      "Fun without constraint.",
      "Your gaming zone awaits.",
      "Unlock your gaming potential.",
      "Your gaming destination awaits.",
      "Play with opportunity.",
      "Your web gaming haven awaits.",
      "Entertainment without constraint.",
      "Your gaming paradise awaits.",
      "Discover your gaming opportunity.",
      "Your gaming adventure awaits.",
      "Play with prospect.",
      "Your web gaming sanctuary awaits.",
      "Fun without barrier.",
      "Your gaming world awaits.",
      "Unlock your gaming opportunity.",
      "Your gaming escape awaits.",
      "Play with promise.",
      "Your web gaming destination awaits.",
      "Entertainment without barrier.",
      "Your gaming journey awaits.",
      "Play with hope.",
      "Your web gaming paradise awaits.",
      "Fun without obstacle.",
      "Your gaming haven awaits.",
      "Discover your gaming promise.",
      "Your gaming realm awaits.",
      "Play with aspiration.",
      "Your web gaming world awaits.",
      "Entertainment without obstacle.",
      "Your gaming sanctuary awaits.",
      "Play with ambition.",
      "Your web gaming escape awaits.",
      "Fun without hindrance.",
      "Your gaming zone awaits.",
      "Unlock your gaming promise.",
      "Your gaming destination awaits.",
      "Play with dream.",
      "Your web gaming haven awaits.",
      "Entertainment without hindrance.",
      "Your gaming paradise awaits.",
      "Discover your gaming dream.",
      "Your gaming adventure awaits.",
      "Play with vision.",
      "Your web gaming sanctuary awaits.",
      "Fun without impediment.",
      "Your gaming world awaits.",
      "Unlock your gaming dream.",
      "Your gaming escape awaits.",
      "Play with goal.",
      "Your web gaming destination awaits.",
      "Entertainment without impediment.",
      "Your gaming journey awaits.",
      "Play with target.",
      "Your web gaming paradise awaits.",
      "Fun without delay.",
      "Your gaming haven awaits.",
      "Discover your gaming goal.",
      "Your gaming realm awaits.",
      "Play with objective.",
      "Your web gaming world awaits.",
      "Entertainment without delay.",
      "Your gaming sanctuary awaits.",
      "Play with purpose.",
      "Your web gaming escape awaits.",
      "Fun without pause.",
      "Your gaming zone awaits.",
      "Unlock your gaming goal.",
      "Your gaming destination awaits.",
      "Play with mission.",
      "Your web gaming haven awaits.",
      "Entertainment without pause.",
      "Your gaming paradise awaits.",
      "Discover your gaming mission.",
      "Your gaming adventure awaits.",
      "Play with calling.",
      "Your web gaming sanctuary awaits.",
      "Fun without interruption.",
      "Your gaming world awaits.",
      "Unlock your gaming mission.",
      "Your gaming escape awaits.",
      "Play with destiny.",
      "Your web gaming destination awaits.",
      "Entertainment without interruption.",
      "Your gaming journey awaits.",
      "Play with fate.",
      "Your web gaming paradise awaits.",
      "Fun without break.",
      "Your gaming haven awaits.",
      "Discover your gaming destiny.",
      "Your gaming realm awaits."
    ];

    let currentPhraseIndex = undefined;
    let currentText = '';
    let isDeleting = false;
    // base typing speeds (ms) — tuned slightly slower for readability
    let baseTypingDelay = 85; // normal/quick typing (slightly slower)
    let baseDeletingDelay = 40;
    let pauseAfterTyping = 4200; // rest on full phrase longer
    let pauseAfterDeleting = 700;

    let phraseQueue = [];
    let recentPhraseHistory = [];

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    function buildPhraseQueue() {
      phraseQueue = cyclingPhrases
        .map((_, idx) => idx)
        .filter(idx => settings.username || !/username/i.test(cyclingPhrases[idx]));
      shuffleArray(phraseQueue);

      if (settings.username) {
        const usernameIndex = cyclingPhrases.findIndex(p => /username/i.test(p));
        if (usernameIndex !== -1) {
          const pos = phraseQueue.indexOf(usernameIndex);
          if (pos > -1) phraseQueue.splice(pos, 1);
          phraseQueue.unshift(usernameIndex);
        }
      }

      const avoidIndexes = [...recentPhraseHistory].slice(-4);
      for (let i = 0; i < Math.min(3, phraseQueue.length); i++) {
        if (avoidIndexes.includes(phraseQueue[i])) {
          const avoid = phraseQueue.splice(i, 1)[0];
          phraseQueue.push(avoid);
          i--; // recheck the current position after rotation
        }
      }
    }

    function getNextPhraseIndex() {
      if (!phraseQueue.length) buildPhraseQueue();
      let nextIndex = phraseQueue.shift();
      if (nextIndex === undefined) return 0;
      if (!settings.username && /username/i.test(cyclingPhrases[nextIndex])) {
        return getNextPhraseIndex();
      }
      recentPhraseHistory.push(nextIndex);
      if (recentPhraseHistory.length > 6) recentPhraseHistory.shift();
      return nextIndex;
    }

    function typeCyclingText() {
      const heroTitle = document.querySelector('.hero h1');
      if (!heroTitle) return;

      if (currentPhraseIndex === undefined) {
        currentPhraseIndex = getNextPhraseIndex();
      }

      const fullPhrase = cyclingPhrases[currentPhraseIndex] || '';

      // Handle phrases that include the token 'username' specially so typed/deleted
      // characters don't corrupt HTML and the username is always colored.
      const hasUsernameToken = /username/i.test(fullPhrase) && settings.username;
      let delay = baseTypingDelay;

      if (hasUsernameToken) {
        const tokenIndex = fullPhrase.toLowerCase().indexOf('username');
        const pre = fullPhrase.slice(0, tokenIndex);
        const post = fullPhrase.slice(tokenIndex + 8);
        const userVal = String(settings.username || '');
        const replacedFull = pre + userVal + post;

        // compute next length
        let nextLen = currentText.length;
        if (isDeleting) {
          nextLen = Math.max(0, nextLen - 1);
          delay = baseDeletingDelay;
        } else {
          nextLen = Math.min(replacedFull.length, nextLen + 1);
          delay = baseTypingDelay;
        }

        currentText = replacedFull.substring(0, nextLen);

        // build display with colored username without breaking HTML while typing
        let displayText = '';
        if (nextLen <= pre.length) {
          displayText = escapeHTML(replacedFull.slice(0, nextLen));
        } else if (nextLen <= pre.length + userVal.length) {
          const partBefore = escapeHTML(pre);
          const userPart = escapeHTML(userVal.slice(0, nextLen - pre.length));
          displayText = `${partBefore}<span class="username-highlight">${userPart}</span>`;
        } else {
          const partBefore = escapeHTML(pre);
          const userPart = escapeHTML(userVal);
          const partAfter = escapeHTML(post.slice(0, nextLen - pre.length - userVal.length));
          displayText = `${partBefore}<span class="username-highlight">${userPart}</span>${partAfter}`;
        }

        heroTitle.innerHTML = `<span class="typed-text">${displayText}</span><span class="typing-caret" aria-hidden="true"></span>`;

        if (!isDeleting && nextLen === replacedFull.length) {
          isDeleting = true;
          delay = pauseAfterTyping;
        } else if (isDeleting && nextLen === 0) {
          isDeleting = false;
          currentPhraseIndex = getNextPhraseIndex();
          delay = pauseAfterDeleting;
        }
      } else {
        // normal phrase (no username token)
        let nextLen = currentText.length;
        if (isDeleting) {
          nextLen = Math.max(0, nextLen - 1);
          delay = baseDeletingDelay;
        } else {
          nextLen = Math.min(fullPhrase.length, nextLen + 1);
          delay = baseTypingDelay;
        }

        currentText = fullPhrase.substring(0, nextLen);
        const displayText = escapeHTML(currentText);
        heroTitle.innerHTML = `<span class="typed-text">${displayText}</span><span class="typing-caret" aria-hidden="true"></span>`;

        if (!isDeleting && nextLen === fullPhrase.length) {
          isDeleting = true;
          delay = pauseAfterTyping;
        } else if (isDeleting && nextLen === 0) {
          isDeleting = false;
          currentPhraseIndex = getNextPhraseIndex();
          delay = pauseAfterDeleting;
        }
      }

      setTimeout(typeCyclingText, delay);
    }

    const cloakPresets = {
      google: { title: 'Google', icon: 'https://www.google.com/favicon.ico' },
      classroom: { title: 'Google Classroom', icon: 'https://ssl.gstatic.com/classroom/favicon.png' },
      drive: { title: 'Google Drive', icon: 'https://docs.google.com/favicon.ico' },
      docs: { title: 'Google Docs', icon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon-2023q4.ico' },
      home: { title: 'Google', icon: 'https://www.google.com/favicon.ico' }
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
      emerald: { a: '110,231,183', b: '34,211,238', c: '52,211,153' },
      sunset: { a: '251,146,60', b: '234,88,12', c: '244,63,94' },
      ocean: { a: '14,165,233', b: '59,130,246', c: '99,102,241' },
      cherry: { a: '244,114,182', b: '236,72,153', c: '219,39,119' },
      mint: { a: '52,211,153', b: '16,185,129', c: '5,150,105' },
      dracula: { a: '189,147,249', b: '139,233,253', c: '80,250,123' }
    };

    const particleDensityMap = {
      low: 80,
      normal: 160,
      high: 260
    };

    let currentSection = null;
    let returnSection = 'games';
    let lastBrowseQuery = '';
    let heroSearchWidthInitialized = false;

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
        <div class="settings-note">
          All settings are locally saved unless instructed otherwise.
        </div>
      `);

      const appearancePanel = panel('appearance', 'Appearance', 'Tune colors, glow, particles, and background atmosphere.', `
        ${selectRow('accent', 'Accent Theme', 'Change the glow color system across the interface.', [
          { value: 'aurora', label: 'Aurora' },
          { value: 'cyan', label: 'Cyan' },
          { value: 'violet', label: 'Violet' },
          { value: 'emerald', label: 'Emerald' },
          { value: 'sunset', label: 'Sunset' },
          { value: 'ocean', label: 'Ocean' },
          { value: 'cherry', label: 'Cherry' },
          { value: 'mint', label: 'Mint' },
          { value: 'dracula', label: 'Dracula' }
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
        <div class="settings-note">
          All settings are locally saved unless instructed otherwise.
        </div>
      `);

      const motionPanel = panel('motion', 'Motion', 'Adjust animation intensity and navigation feel.', `
        ${toggleRow('reducedMotion', 'Reduce Motion', 'Minimize animations across the interface.', settings.reducedMotion)}
        ${toggleRow('smoothScroll', 'Smooth Scrolling', 'Use smooth scroll when moving between pages and sections.', settings.smoothScroll)}
        <div class="settings-note">
          All settings are locally saved unless instructed otherwise.
        </div>
      `);

      const interfacePanel = panel('interface', 'Interface', 'Customize browsing layout and player page behavior.', `
        ${toggleRow('compactCards', 'Compact Cards', 'Show smaller cards for denser browsing pages.', settings.compactCards)}
        ${toggleRow('sectionSearch', 'Section Search Bars', 'Show search fields at the top of Games, Proxies, and Tools.', settings.sectionSearch)}
        ${toggleRow('showPlayerSuggestions', 'Game Suggestions', 'Show recommendation cards below the game player.', settings.showPlayerSuggestions)}
        <div class="settings-note">
          All settings are locally saved unless instructed otherwise.
        </div>
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
        ${toggleRow('autoExternalLaunch', 'Auto External Launch(Games, Apps, etc.)', 'Automatically open games and proxies in an extra tab when you launch them.', settings.autoExternalLaunch)}
        <div id="externalLaunchModeRow" class="settings-animated-row" style="display: ${settings.autoExternalLaunch ? 'block' : 'none'};">
          ${segmentRow('autoLaunchMode', 'Launch Mode', 'Choose how the automatic external tab is created.', [
            { value: 'aboutBlank', label: 'About:Blank' },
            { value: 'blob', label: 'Blob' }
          ])}
        </div>
        ${toggleRow('autoLaunchOnLoad', 'Voltra Incognito', 'Auto-launch Voltra in an about:blank tab every time you visit.', settings.autoLaunchOnLoad)}
        <div class="settings-note">
          All settings are locally saved unless instructed otherwise.
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
        <div class="settings-note">
          All settings are locally saved unless instructed otherwise.
        </div>
      `);

      const accountPanel = panel('account', 'Account', 'Manage password protection and account settings.', `
        ${toggleRow('requirePassword', 'Require Password', 'Ask for a password before accessing the website.', settings.requirePassword)}
        ${textRow('websitePassword', 'Website Password', 'Set a password to protect access to Voltra. Leave blank to disable.', 'Enter password...')}
        ${textRow('bypassKeybind', 'Bypass Keybind', 'Hold Shift + this key to bypass password if forgotten. Leave blank to disable.', 'e.g. V')}
        ${textRow('username', 'Username', 'Set your display name for personalization.', 'Enter username...')}
        ${toggleRow('autoLock', 'Auto-Lock', 'Automatically lock the website after inactivity.', settings.autoLock)}
        ${selectRow('autoLockTime', 'Auto-Lock Timer', 'Time before auto-lock activates.', [
          { value: '5', label: '5 minutes' },
          { value: '15', label: '15 minutes' },
          { value: '30', label: '30 minutes' },
          { value: '60', label: '1 hour' }
        ])}
        <button type="button" class="settings-reset" onclick="wipeAllData()" style="margin-top: 16px;">Wipe All Saved Data</button>
        <div class="settings-note">
          All settings are locally saved unless instructed otherwise.
        </div>
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
                ${navItem('account', 'Account', 'Password & security')}
                ${navItem('system', 'System', 'About & reset')}
              </nav>
              <div class="settings-panels">
                ${audioPanel}
                ${appearancePanel}
                ${motionPanel}
                ${interfacePanel}
                ${cloakingPanel}
                ${accountPanel}
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
      if (section !== null) heroSearchWidthInitialized = false;
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
      if (section === 'settings') {
        updateLaunchModeVisibility();
      }
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

      // Do not toggle `searching` class programmatically — keep expansion tied to hover/focus-only.
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
      // Avoid forcing a layout recalculation here — syncLayout runs on resize/fonts ready.
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

      if (id === 'autoExternalLaunch' || id === 'autoLaunchOnLoad') {
        updateLaunchModeVisibility();
      }

      if (id === 'autoLaunchOnLoad' && val === true) {
        const testPopup = window.open('', '_blank');
        if (!testPopup || testPopup.closed || typeof testPopup.closed == 'undefined') {
          alert('Please allow popups for this website to use Voltra Incognito. The about:blank tab will be blocked otherwise. Reload the page after enabling popups.');
        } else {
          testPopup.close();
          alert('Popups are now enabled. Reloading page...');
          setTimeout(() => location.reload(), 1000);
        }
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

    function wipeAllData() {
      if (confirm('Are you sure you want to wipe all saved data? This will reset everything as if you joined the website for the first time.')) {
        try {
          localStorage.clear();
          sessionStorage.clear();
          location.reload();
        } catch (err) {
          console.warn('Could not wipe all data.', err);
          alert('Could not wipe all data. Please try again.');
        }
      }
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

    function updateLaunchModeVisibility() {
      const externalLaunchModeRow = document.getElementById('externalLaunchModeRow');
      
      if (externalLaunchModeRow) {
        const isVisible = settings.autoExternalLaunch;
        if (isVisible) {
          externalLaunchModeRow.style.display = 'block';
          externalLaunchModeRow.style.opacity = '0';
          externalLaunchModeRow.style.transform = 'translateY(-10px)';
          requestAnimationFrame(() => {
            externalLaunchModeRow.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            externalLaunchModeRow.style.opacity = '1';
            externalLaunchModeRow.style.transform = 'translateY(0)';
          });
        } else {
          externalLaunchModeRow.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
          externalLaunchModeRow.style.opacity = '0';
          externalLaunchModeRow.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            if (!settings.autoExternalLaunch) {
              externalLaunchModeRow.style.display = 'none';
            }
          }, 200);
        }
      }
    }

    function handleAutoLaunchOnLoad() {
      if (settings.autoLaunchOnLoad) {
        const currentUrl = window.location.href;
        const newTab = window.open('about:blank', '_blank');
        if (newTab) {
          newTab.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>Voltra Proxy</title>
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                html, body { width: 100%; height: 100%; overflow: hidden; }
                iframe { width: 100%; height: 100%; border: none; display: block; }
              </style>
            </head>
            <body>
              <iframe src="${currentUrl}" allowfullscreen></iframe>
            </body>
            </html>
          `);
          newTab.document.close();
          window.location.href = 'https://www.google.com';
        }
      }
    }

    handleAutoLaunchOnLoad();

    function checkPasswordProtection() {
      if (settings.requirePassword && settings.websitePassword) {
        const passwordOverlay = document.getElementById('passwordOverlay');
        const passwordInput = document.getElementById('passwordInput');
        const passwordError = document.getElementById('passwordError');
        
        passwordOverlay.style.display = 'flex';
        passwordInput.value = '';
        passwordError.classList.remove('show');
        passwordInput.focus();
        
        document.body.style.overflow = 'hidden';
      }
    }

    function submitPassword() {
      const passwordInput = document.getElementById('passwordInput');
      const passwordError = document.getElementById('passwordError');
      const passwordOverlay = document.getElementById('passwordOverlay');
      
      if (passwordInput.value === settings.websitePassword) {
        passwordOverlay.style.display = 'none';
        document.body.style.overflow = '';
      } else {
        passwordError.classList.add('show');
        passwordInput.value = '';
        passwordInput.focus();
      }
    }

    document.addEventListener('keydown', (e) => {
      if (settings.requirePassword && settings.websitePassword && settings.bypassKeybind) {
        const passwordOverlay = document.getElementById('passwordOverlay');
        if (passwordOverlay && passwordOverlay.style.display === 'flex') {
          if (e.shiftKey && e.key.toUpperCase() === settings.bypassKeybind.toUpperCase()) {
            passwordOverlay.style.display = 'none';
            document.body.style.overflow = '';
          }
        }
      }
    });

    document.addEventListener('DOMContentLoaded', () => {
      const passwordInput = document.getElementById('passwordInput');
      if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            submitPassword();
          }
        });
      }
    });

    window.submitPassword = submitPassword;
    window.checkPasswordProtection = checkPasswordProtection;

    checkPasswordProtection();
  