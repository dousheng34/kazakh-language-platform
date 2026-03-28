/* ============================================================
   LANDING PAGE — Еліктеуіш & Бейнелеуіш Сөздер
   ============================================================ */

class Landing {
  constructor(onStart) {
    this.onStart = onStart;
    this._demoSounds = [
      { id:'tars',  label:'Тарс',  sound:'door_slam', desc:'Есіктің қатты жабылу дыбысы' },
      { id:'sart',  label:'Сарт',  sound:'crack',     desc:'Заттың шағылу/сыну дыбысы'   },
      { id:'gurs',  label:'Гүрс',  sound:'crash',     desc:'Ауыр заттың құлау дыбысы'    },
      { id:'shyrt', label:'Шырт',  sound:'click',     desc:'Жіптің үзілу дыбысы'          },
    ];
    this._render();
    this._bind();
  }

  _render() {
    document.getElementById('app').innerHTML = this._html();
    requestAnimationFrame(() => this._animate());
  }

  _html() {
    return `
    <div class="lp" id="landingRoot">

      <!-- ── NAVBAR ── -->
      <nav class="lp-nav" id="lpNav">
        <div class="lp-nav-inner">
          <a class="lp-logo" href="#">Еліктеуіш &amp; Бейнелеуіш</a>
          <div class="lp-nav-links">
            <a href="#hero"     class="lp-nl active">Басты бет</a>
            <a href="#modules"  class="lp-nl">Модульдер</a>
            <a href="#heritage" class="lp-nl">Мұра</a>
            <a href="#reviews"  class="lp-nl">Пікірлер</a>
          </div>
          <button class="lp-cta-btn" id="navStartBtn" data-action="start">Бастау →</button>
          <button class="lp-burger" id="lpBurger">☰</button>
        </div>
        <div class="lp-mobile-menu" id="lpMobileMenu">
          <a href="#hero"     class="lp-ml" data-close>Басты бет</a>
          <a href="#modules"  class="lp-ml" data-close>Модульдер</a>
          <a href="#heritage" class="lp-ml" data-close>Мұра</a>
          <a href="#reviews"  class="lp-ml" data-close>Пікірлер</a>
          <button class="lp-cta-btn" data-action="start">Бастау →</button>
        </div>
      </nav>

      <!-- ── HERO ── -->
      <section class="lp-hero" id="hero">
        <div class="lp-hero-content">
          <div class="lp-hero-badge">✦ ТІЛДІ МЕҢГЕРУ</div>
          <h1 class="lp-hero-h1">
            Қазақ тілінің<br><em class="lp-gold-italic">сыры</em>
          </h1>
          <p class="lp-hero-sub">
            Дыбыстар мен қимылдар арқылы қазақ сөздерін үйрен.<br>
            Аталар мұрасы мен дала рухын тіл арқылы сезін.
          </p>
          <div class="lp-hero-btns">
            <button class="lp-btn-primary" data-action="start">Бастау</button>
            <a href="#modules" class="lp-btn-ghost">⊙ Модульдерді зерттеу</a>
          </div>
        </div>
        <div class="lp-hero-visual">
          <div class="lp-mountain-card">
            <img src="images/mountains.png" alt="Қазақ табиғаты" class="lp-mountain-img">
            <div class="lp-sound-bubble" id="heroBubble">
              <button class="lp-mini-play" data-sound="crack" title="Тыңда">▶</button>
              <div>
                <strong>«Сарт-сұрт...»</strong>
                <span>Қысқы таңда отын жарудың дыбысы</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── STATS ── -->
      <div class="lp-stats">
        <div class="lp-stat"><span class="lp-stat-n">28</span><span class="lp-stat-l">Сөз</span></div>
        <div class="lp-stat-div"></div>
        <div class="lp-stat"><span class="lp-stat-n">8</span><span class="lp-stat-l">Жаттығу</span></div>
        <div class="lp-stat-div"></div>
        <div class="lp-stat"><span class="lp-stat-n">2</span><span class="lp-stat-l">Модуль</span></div>
        <div class="lp-stat-div"></div>
        <div class="lp-stat"><span class="lp-stat-n">100%</span><span class="lp-stat-l">Тегін</span></div>
      </div>

      <!-- ── AUDIO DEMO ── -->
      <section class="lp-audio" id="audio-demo">
        <div class="lp-section-inner">
          <div class="lp-audio-left">
            <div class="lp-section-badge">🔊 ЕЛІКТЕУІШ СӨЗДЕР</div>
            <h2 class="lp-section-h2">Дыбыстарды<br>тіркелей тыңданыз</h2>
            <p class="lp-section-sub">
              Табиғат пен адам дүниесіндегі дыбыстарды бейнелейтін сөздер. Әр бірін басып, дыбысын тыңданыз.
            </p>
            <div class="lp-audio-demos">
              ${this._demoSounds.map(s => `
              <div class="lp-audio-row" id="row_${s.id}" data-sound="${s.sound}">
                <button class="lp-play-circle" data-sound="${s.sound}" title="${s.label} дыбысын тыңда">▶</button>
                <div class="lp-audio-info">
                  <div class="lp-audio-wave" id="wave_${s.id}">
                    ${Array(12).fill('<span></span>').join('')}
                  </div>
                  <strong>${s.label}</strong>
                  <span>${s.desc}</span>
                </div>
              </div>`).join('')}
            </div>
          </div>
          <div class="lp-audio-right">
            <div class="lp-audio-card">
              <div class="lp-audio-icon">🎵</div>
              <h3>Мүмкіндіктер</h3>
              <ul class="lp-audio-features">
                <li>✓ 14 еліктеуіш сөзді тыңданыз</li>
                <li>✓ Дыбысты тіркелей таныз</li>
                <li>✓ 4 жаттығу форматы</li>
                <li>✓ Жұлдыз рейтингпен тест</li>
              </ul>
              <button class="lp-btn-primary" data-action="start" data-module="elikteuis">Модульді бастау →</button>
            </div>
          </div>
        </div>
      </section>

      <!-- ── MODULES ── -->
      <section class="lp-modules" id="modules">
        <div class="lp-section-inner">
          <div class="lp-section-badge" style="color:#1a5c52;background:rgba(26,92,82,.1)">✦ МОДУЛЬДЕР</div>
          <h2 class="lp-section-h2 center">Үйрену жолыңызды таңданыз</h2>
          <p class="lp-section-sub center">Әр модульдің өз бағдары, жаттығу және тесті бар.</p>
          <div class="lp-mod-grid">

            <div class="lp-mod-card" style="--mc:#7c3aed">
              <div class="lp-mod-glow"></div>
              <div class="lp-mod-top">
                <span class="lp-mod-icon">🔊</span>
                <span class="lp-mod-tag audio">🎵 Аудио</span>
              </div>
              <h3>Еліктеуіш Сөздер</h3>
              <p>Дыбысқа еліктейтін сөздер — тарс, сарт, дүңк, морт және т.б.</p>
              <div class="lp-mod-list">
                <div class="lp-mod-item"><span>📖</span> 14 сөз сабағы</div>
                <div class="lp-mod-item"><span>🎧</span> Дыбысты табу жаттығуы</div>
                <div class="lp-mod-item"><span>🔀</span> Жіктеу жаттығуы</div>
                <div class="lp-mod-item"><span>⏱</span> 60 сек таймер тест</div>
              </div>
              <button class="lp-mod-btn" data-action="start" data-module="elikteuis">
                Бастау →
              </button>
            </div>

            <div class="lp-mod-card" style="--mc:#0891b2">
              <div class="lp-mod-glow"></div>
              <div class="lp-mod-top">
                <span class="lp-mod-icon">✨</span>
                <span class="lp-mod-tag animation">🎬 Анимация</span>
              </div>
              <h3>Бейнелеуіш Сөздер</h3>
              <p>Қимыл-бейне білдіретін сөздер — жалт, желп, селк, қалт және т.б.</p>
              <div class="lp-mod-list">
                <div class="lp-mod-item"><span>📖</span> 14 сөз сабағы</div>
                <div class="lp-mod-item"><span>🎬</span> SVG анимация</div>
                <div class="lp-mod-item"><span>🔀</span> Жіктеу жаттығуы</div>
                <div class="lp-mod-item"><span>⏱</span> 60 сек таймер тест</div>
              </div>
              <button class="lp-mod-btn" data-action="start" data-module="beineleuis">
                Бастау →
              </button>
            </div>

          </div>
        </div>
      </section>

      <!-- ── HERITAGE ── -->
      <section class="lp-heritage" id="heritage">
        <div class="lp-section-inner lp-heritage-inner">
          <div class="lp-heritage-imgs">
            <div class="lp-hi hi1">
              <img src="images/eagle_hunter.png" alt="Бүркіт аушысы">
            </div>
            <div class="lp-hi hi2">
              <img src="images/ornament.png" alt="Қазақ өрнегі">
            </div>
            <div class="lp-hi hi3">
              <img src="images/mountains.png" alt="Қазақ табиғаты">
            </div>
          </div>
          <div class="lp-heritage-text">
            <div class="lp-section-badge" style="color:#c4952a;background:rgba(196,149,42,.1)">🏺 АРЫБЫР БУЫҢДАҒЫ МҰРА</div>
            <h2 class="lp-section-h2">Тіліміз — біздің<br>рухани <em class="lp-gold-italic">байлығымыз</em></h2>
            <p class="lp-section-sub">
              Қазақ мәдениетінде тіл — тек қатынас құралы емес; білгіл қорғаны ортаның айнасы. <strong>Еліктеуіш</strong> және <strong>Бейнелеуіш</strong> сөздер дала өмірінің сезімдік мәнін ашатын кілт болып табылады.
            </p>
            <div class="lp-heritage-features">
              <div class="lp-hf">
                <div class="lp-hf-icon">🌿</div>
                <div>
                  <strong>Табиғат Жаңғыры</strong>
                  <span>Тіліміз шөптердің сыбыры, тұлпарлардың шабысын және таудағы желді еліктеу арқылы дамыған.</span>
                </div>
              </div>
              <div class="lp-hf">
                <div class="lp-hf-icon">🦅</div>
                <div>
                  <strong>Дала Өмірі</strong>
                  <span>Көшпенді өмірден туындаған сөздер — бүркіт ұшысы, ат шабысы, желпін соқпасы.</span>
                </div>
              </div>
              <div class="lp-hf">
                <div class="lp-hf-icon">📜</div>
                <div>
                  <strong>Ата Мұрасы</strong>
                  <span>Жырау мен ақындардың тілінде мың жылдық даналық сақталған.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── HOW IT WORKS ── -->
      <section class="lp-how" id="how">
        <div class="lp-section-inner">
          <div class="lp-section-badge" style="color:#7c3aed;background:rgba(124,58,237,.1)">⚡ ҚАЛАЙ ЖҰМЫС ІСТЕЙДІ</div>
          <h2 class="lp-section-h2 center">3 адімде бастаңыз</h2>
          <div class="lp-steps">
            <div class="lp-step">
              <div class="lp-step-num">1</div>
              <div class="lp-step-icon">📖</div>
              <h3>Сабақты оқып шығыңыз</h3>
              <p>Әр сөздің мағынасын, мысалын және дыбысын / анимациясын көріңіз.</p>
            </div>
            <div class="lp-step-arrow">→</div>
            <div class="lp-step">
              <div class="lp-step-num">2</div>
              <div class="lp-step-icon">🎯</div>
              <h3>Жаттығу орындаңыз</h3>
              <p>Дыбысты тыңдап тауып, drag-and-drop арқылы топқа жіктеңіз.</p>
            </div>
            <div class="lp-step-arrow">→</div>
            <div class="lp-step">
              <div class="lp-step-num">3</div>
              <div class="lp-step-icon">🏆</div>
              <h3>Тестпен тексересіз</h3>
              <p>60 секунд ішінде 7 сұраққа жауап беріп, жұлдыз алыңыз.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ── REVIEWS ── -->
      <section class="lp-reviews" id="reviews">
        <div class="lp-section-inner">
          <div class="lp-section-badge" style="color:#1a5c52;background:rgba(26,92,82,.1)">💬 ПІКІРЛЕР</div>
          <h2 class="lp-section-h2 center">Қолданушы пікірлері</h2>
          <div class="lp-reviews-grid">
            <div class="lp-review-card">
              <div class="lp-stars">⭐⭐⭐⭐⭐</div>
              <p class="lp-review-text">
                «Бұл платформаның еліктеуіш сөздерді талдауы маған қазақ поэзиясының нықтелген ырғағын түсінуге көмектесті. Шетелдіктер үшін тапқырмас құрал!»
              </p>
              <div class="lp-reviewer">
                <div class="lp-reviewer-avatar">А</div>
                <div>
                  <strong>Асел Н.</strong>
                  <span>Тіл маман</span>
                </div>
              </div>
            </div>
            <div class="lp-review-card featured">
              <div class="lp-stars">⭐⭐⭐⭐⭐</div>
              <p class="lp-review-text">
                «Қазақстанда тұрған 3 жыл ішінде бейнелеуіш сөздердің нюанстарын тек осындағы көрмелік көрсетілімдерден кеңірек ғана ұқтым. Шынайы үйрену тәжірибесі!»
              </p>
              <div class="lp-reviewer">
                <div class="lp-reviewer-avatar" style="background:#0891b2">M</div>
                <div>
                  <strong>Mark S.</strong>
                  <span>Шетелдік маман</span>
                </div>
              </div>
            </div>
            <div class="lp-review-card">
              <div class="lp-stars">⭐⭐⭐⭐⭐</div>
              <p class="lp-review-text">
                «Балаларыма қазақ тілін үйрету үшін тапқырмаған ең тиімді ықпал. Жаттығу форматы өте қызықты және түсінікті!»
              </p>
              <div class="lp-reviewer">
                <div class="lp-reviewer-avatar" style="background:#c4952a">Д</div>
                <div>
                  <strong>Дана М.</strong>
                  <span>Ата-ана</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── CTA ── -->
      <section class="lp-cta">
        <div class="lp-cta-inner">
          <h2 class="lp-cta-h2">Сөздік қорыңызды байытуға<br>даяр сыз ба?</h2>
          <p class="lp-cta-sub">Қазақ тілінің сезімдік тереңдігін зерттеп жүрген мындаған оқушылар қатарына қосылыңыз.</p>
          <div class="lp-cta-btns">
            <button class="lp-cta-main-btn" data-action="start">Қазір қосылу →</button>
            <a href="#modules" class="lp-cta-ghost">Модульдерді көріңіз</a>
          </div>
        </div>
      </section>

      <!-- ── FOOTER ── -->
      <footer class="lp-footer">
        <div class="lp-footer-inner">
          <div class="lp-footer-logo">Еліктеуіш &amp; Бейнелеуіш Сөздер</div>
          <p class="lp-footer-sub">Қазақ тілін аудио мен анимация арқылы интерактивті үйрен.</p>
          <div class="lp-footer-links">
            <a href="#hero">Бастапқы бет</a>
            <a href="#modules">Модульдер</a>
            <a href="#heritage">Мұра</a>
            <a href="#reviews">Пікірлер</a>
          </div>
          <div class="lp-footer-bottom">© 2025 Еліктеуіш &amp; Бейнелеуіш Сөздер</div>
        </div>
      </footer>

    </div>`;
  }

  _bind() {
    const root = document.getElementById('landingRoot');

    root.addEventListener('click', e => {
      // ── Start / module buttons
      const startBtn = e.target.closest('[data-action="start"]');
      if (startBtn) {
        const mod = startBtn.dataset.module || null;
        this.onStart(mod);
        return;
      }

      // ── Audio play buttons
      const playBtn = e.target.closest('[data-sound]');
      if (playBtn) {
        const s = playBtn.dataset.sound;
        audio.play(s);
        // Wave animation
        const rows = root.querySelectorAll('.lp-audio-row');
        rows.forEach(r => {
          const w = r.querySelector('.lp-audio-wave');
          if (w) w.classList.remove('active');
        });
        const matchedRow = [...rows].find(r => r.dataset.sound === s);
        const waveEl = matchedRow?.querySelector('.lp-audio-wave');
        if (waveEl) {
          void waveEl.offsetWidth;
          waveEl.classList.add('active');
        }
        return;
      }

      // ── Burger menu
      if (e.target.closest('#lpBurger')) {
        document.getElementById('lpMobileMenu').classList.toggle('open');
        return;
      }
      if (e.target.closest('[data-close]')) {
        document.getElementById('lpMobileMenu').classList.remove('open');
      }
    });

    // Sticky nav
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('lpNav');
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // Intersection observer for reveal animations
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    root.querySelectorAll('.lp-stat,.lp-mod-card,.lp-step,.lp-review-card,.lp-hf,.lp-heritage-imgs .lp-hi')
        .forEach(el => observer.observe(el));

    // Smooth scroll
    root.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Nav active link highlight
    const sections = ['hero','modules','heritage','reviews'];
    const io = new IntersectionObserver(entries => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          root.querySelectorAll('.lp-nl').forEach(l => l.classList.remove('active'));
          const link = root.querySelector(`.lp-nl[href="#${ent.target.id}"]`);
          if (link) link.classList.add('active');
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  _animate() {
    const h1     = document.querySelector('.lp-hero-h1');
    const sub    = document.querySelector('.lp-hero-sub');
    const btns   = document.querySelector('.lp-hero-btns');
    const visual = document.querySelector('.lp-hero-visual');
    [h1, sub, btns, visual].forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      setTimeout(() => {
        el.style.transition = 'all 0.75s cubic-bezier(.34,1.2,.64,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 80 + i * 130);
    });
  }
}
