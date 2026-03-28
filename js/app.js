/* ============================================================
   Еліктеуіш & Бейнелеуіш сөздер — Main App
   ============================================================ */

class App {
  constructor(startModuleId) {
    this.state = {
      view: startModuleId ? 'module' : 'home',
      moduleId: startModuleId || null,
      step: startModuleId ? 'learn' : null,
      qIndex: 0,
      score: 0,
      ex2Placed: {},
      quizTimer: null,
      timeLeft: 60,
      quizQuestions: [],
      quizAnswers: {},
      ex1Questions: null,
      ex1Score: 0,
      ex1Answers: {},
      chosen: null,
    };
    this.progress = JSON.parse(localStorage.getItem('kaz_progress') || '{}');
    this._selectedCard = null;

    // ── Single global click listener — added ONCE in constructor ──────────
    // BUG FIX: previously _bind() added a new listener on every render
    // causing multiple _handle() calls per click after navigating.
    this._appEl = document.getElementById('app');
    this._clickHandler = (e) => {
      const el = e.target.closest('[data-action]');
      if (!el) return;
      this._handle(el.dataset);
    };
    this._appEl.addEventListener('click', this._clickHandler);

    this._render();
  }

  // ─── STATE ────────────────────────────────────────────────
  go(updates) {
    Object.assign(this.state, updates);
    this._render();
  }

  saveProgress(moduleId, step) {
    if (!this.progress[moduleId]) this.progress[moduleId] = {};
    this.progress[moduleId][step] = true;
    localStorage.setItem('kaz_progress', JSON.stringify(this.progress));
  }

  getModule() {
    return AppData.modules.find(m => m.id === this.state.moduleId);
  }

  // ─── RENDER ───────────────────────────────────────────────
  _render() {
    const { view, step } = this.state;
    let html = '';

    if (view === 'home')                               html = this._home();
    else if (view === 'module' && step === 'learn')    html = this._learn();
    else if (view === 'module' && step === 'ex1')      html = this._ex1();
    else if (view === 'module' && step === 'ex2')      html = this._ex2();
    else if (view === 'module' && step === 'quiz')     html = this._quiz();
    else if (view === 'module' && step === 'results')  html = this._results();

    this._appEl.innerHTML = html;
    requestAnimationFrame(() => {
      this._appEl.querySelector('.page')?.classList.add('page-enter');
    });
    this._bind();
  }

  // ─── HOME ─────────────────────────────────────────────────
  _home() {
    const cards = AppData.modules.map(m => {
      const done = this.progress[m.id] || {};
      const steps = ['learn','ex1','ex2','quiz'];
      const completedSteps = steps.filter(s => done[s]).length;
      const pct = Math.round((completedSteps / steps.length) * 100);
      const btnLabel = pct === 0 ? 'Бастау' : pct === 100 ? 'Қайталау' : 'Жалғастыру';
      const stepsDone = steps.map(s => `
        <div class="mc-step ${done[s]?'done':''}">${
          s==='learn'?'📖':s==='ex1'?'🎧':s==='ex2'?'🔀':'⏱'
        }</div>`).join('');

      return `
      <div class="module-card" data-action="open-module" data-mid="${m.id}"
           style="--mc:${m.color}">
        <div class="mc-glow"></div>
        <div class="mc-shine"></div>
        <div class="mc-top">
          <span class="mc-icon">${m.icon}</span>
          <span class="mc-badge ${m.type}">${m.type === 'audio' ? '🎵 Аудио' : '🎬 Анимация'}</span>
        </div>
        <h2 class="mc-title">${m.title}</h2>
        <p class="mc-sub">${m.subtitle}</p>
        <p class="mc-desc">${m.description}</p>
        <div class="mc-meta">
          <span class="mc-meta-item">📚 ${m.words.length} сөз</span>
          <span class="mc-meta-item">🎯 4 жаттығу</span>
        </div>
        <div class="mc-steps-row">${stepsDone}</div>
        <div class="mc-progress-wrap">
          <div class="mc-progress-bar">
            <div class="mc-progress-fill" style="width:${pct}%"></div>
          </div>
          <span class="mc-progress-label">${pct}%</span>
        </div>
        <button class="mc-btn" data-action="open-module" data-mid="${m.id}">
          ${btnLabel} →
        </button>
      </div>`;
    }).join('');

    // Compute total overall progress
    const totalSteps = AppData.modules.length * 4;
    const totalDone  = AppData.modules.reduce((acc, m) => {
      const d = this.progress[m.id] || {};
      return acc + ['learn','ex1','ex2','quiz'].filter(s => d[s]).length;
    }, 0);
    const overallPct = Math.round((totalDone / totalSteps) * 100);

    return `
    <div class="page home-page">
      <nav class="nav">
        <span class="nav-logo" data-action="back-landing" style="cursor:pointer" title="Лендингке қайту">← ҚАЗ ТІЛІ</span>
        <span class="nav-tag">Интерактивті платформа</span>
        <div class="nav-overall">
          <div class="nav-overall-bar"><div class="nav-overall-fill" style="width:${overallPct}%"></div></div>
          <span class="nav-overall-lbl">${overallPct}% аяқталды</span>
        </div>
      </nav>

      <!-- ── Premium Hero ── -->
      <div class="home-hero">
        <div class="home-hero-orb orb-purple"></div>
        <div class="home-hero-orb orb-teal"></div>
        <div class="home-hero-orb orb-gold"></div>
        <div class="home-hero-inner">
          <div class="home-hero-badge">✦ Жаңа оқу форматы</div>
          <h1 class="home-hero-title">
            Еліктеуіш <span class="hht-amp">&amp;</span> Бейнелеуіш<br>
            <span class="hht-grad">Сөздер</span>
          </h1>
          <p class="home-hero-sub">Дыбыс пен қимылды тікелей сезін — аудио мен анимация арқылы үйрен</p>
          <div class="home-hero-stats">
            <div class="hhs"><span class="hhs-n">28</span><span class="hhs-l">Сөз</span></div>
            <div class="hhs-div"></div>
            <div class="hhs"><span class="hhs-n">8</span><span class="hhs-l">Жаттығу</span></div>
            <div class="hhs-div"></div>
            <div class="hhs"><span class="hhs-n">2</span><span class="hhs-l">Модуль</span></div>
            <div class="hhs-div"></div>
            <div class="hhs"><span class="hhs-n">${overallPct}%</span><span class="hhs-l">Үлгерім</span></div>
          </div>
        </div>
      </div>

      <!-- ── Module Cards ── -->
      <div class="modules-wrap">
        <div class="modules-header">
          <h3 class="section-label">🎓 Модульдер</h3>
          <span class="section-sublabel">Модульді таңдап, сабақты бастаңыз</span>
        </div>
        <div class="modules-grid">${cards}</div>
      </div>
    </div>`;
  }

  // ─── MODULE NAV ────────────────────────────────────────────
  _moduleNav(m, activeStep) {
    const steps = [
      { id:'learn', icon:'📖', label:'Сабақ'     },
      { id:'ex1',   icon:'🎧', label:'1-жаттығу' },
      { id:'ex2',   icon:'🔀', label:'2-жаттығу' },
      { id:'quiz',  icon:'⏱',  label:'Тест'      },
    ];
    const done = this.progress[m.id] || {};
    return `
    <nav class="nav">
      <span class="nav-logo" data-action="home" style="cursor:pointer">ҚАЗ ТІЛІ</span>
      <div class="nav-steps">
        ${steps.map(s => `
          <div class="nav-step ${s.id===activeStep?'active':''} ${done[s.id]?'done':''}"
               data-action="goto-step" data-step="${s.id}">
            <span>${s.icon}</span><span>${s.label}</span>
          </div>`).join('')}
      </div>
    </nav>`;
  }

  // ─── LEARN ────────────────────────────────────────────────
  _learn() {
    const m = this.getModule();
    const words = m.words;
    const idx = this.state.qIndex;
    const w = words[idx];
    const isAudio = m.type === 'audio';

    const visual = isAudio
      ? `<div class="sound-visual" id="sv">
           <div class="sound-ring r1"></div>
           <div class="sound-ring r2"></div>
           <div class="sound-ring r3"></div>
           <button class="play-btn" id="playBtn" data-action="play-sound" data-sound="${w.sound}">▶</button>
         </div>`
      : `<div class="anim-wrap">${Animations.get(w.anim)}</div>`;

    return `
    <div class="page learn-page">
      ${this._moduleNav(m,'learn')}
      <div class="learn-wrap">
        <div class="word-counter">${idx+1} / ${words.length}</div>
        <div class="word-card" style="--mc:${m.color}">
          <div class="wc-glow"></div>
          <div class="wc-type-badge ${w.type}">${w.type === 'дара' ? '◆ Дара' : '◈ Күрделі'}</div>
          <h2 class="wc-word">${w.word}</h2>
          <p class="wc-meaning">${w.meaning}</p>
          <p class="wc-example"><em>«${w.example}»</em></p>
          <div class="wc-visual">${visual}</div>
        </div>
        <div class="learn-nav">
          <button class="btn-sec" data-action="prev-word" ${idx===0?'disabled':''}>← Артқа</button>
          <div class="word-dots">
            ${words.map((_,i)=>`<div class="dot ${i===idx?'active':i<idx?'done':''}"></div>`).join('')}
          </div>
          ${idx < words.length-1
            ? `<button class="btn-pri" style="background:${m.color}" data-action="next-word">Келесі →</button>`
            : `<button class="btn-pri" style="background:${m.color}" data-action="finish-learn">Жаттығуға →</button>`
          }
        </div>
      </div>
    </div>`;
  }

  // ─── EXERCISE 1 ───────────────────────────────────────────
  _ex1() {
    const m = this.getModule();
    const words = m.words;
    const idx = this.state.qIndex;

    if (!this.state.ex1Questions) {
      this.state.ex1Questions = this._shuffle([...words]);
      this.state.ex1Score = 0;
      this.state.ex1Answers = {};
    }
    const qs = this.state.ex1Questions;
    const q = qs[idx];
    const isAudio = m.type === 'audio';
    const answered = this.state.ex1Answers[q.id];

    const others = this._shuffle(words.filter(w => w.id !== q.id)).slice(0,3);
    const opts = this._shuffle([q, ...others]);

    const visual = isAudio
      ? `<div class="sound-visual ${answered?'played-once':''}" id="sv">
           <div class="sound-ring r1"></div>
           <div class="sound-ring r2"></div>
           <div class="sound-ring r3"></div>
           <button class="play-btn ${answered?'played':''}" id="ex1PlayBtn"
                   data-action="play-sound" data-sound="${q.sound}">▶</button>
         </div>`
      : `<div class="anim-wrap">${Animations.get(q.anim)}</div>`;

    const prompt = isAudio
      ? 'Дыбысты тыңда, дұрыс сөзді таңда'
      : 'Анимацияны қара, дұрыс сөзді таңда';

    return `
    <div class="page ex1-page">
      ${this._moduleNav(m,'ex1')}
      <div class="ex-wrap">
        <div class="ex-header">
          <h2 class="ex-title">1-жаттығу</h2>
          <p class="ex-desc">${prompt}</p>
          <div class="ex-progress-bar"><div class="ex-progress-fill" style="width:${(idx/words.length)*100}%"></div></div>
          <span class="ex-counter">${idx+1}/${words.length}</span>
        </div>
        <div class="ex1-visual">${visual}</div>
        <div class="ex1-options">
          ${opts.map(o => {
            let cls = 'opt-btn';
            if (answered) {
              if (o.id === q.id) cls += ' correct';
              else if (o.id === answered) cls += ' wrong';
            }
            return `<button class="${cls}" data-action="ex1-answer"
                     data-qid="${q.id}" data-oid="${o.id}" data-correct="${q.id}"
                     ${answered?'disabled':''}>
              ${o.word}
            </button>`;
          }).join('')}
        </div>
        ${answered ? `
          <div class="feedback ${answered===q.id?'feedback-ok':'feedback-err'}">
            ${answered===q.id ? '✓ Дұрыс!' : `✗ Қате. Дұрыс жауап: <strong>${q.word}</strong>`}
          </div>
          <button class="btn-pri" style="background:${m.color}" data-action="ex1-next">
            ${idx < words.length-1 ? 'Келесі →' : '2-жаттығуға →'}
          </button>
        ` : ''}
      </div>
    </div>`;
  }

  // ─── EXERCISE 2 — Drag & Drop / Click-to-place ─────────────
  _ex2() {
    const m = this.getModule();
    const words = m.words;
    const placed = this.state.ex2Placed || {};
    const remaining = words.filter(w => !placed[w.id]);
    const dara = words.filter(w => placed[w.id] === 'дара');
    const kurd = words.filter(w => placed[w.id] === 'күрделі');
    const done = remaining.length === 0;
    let score = 0;
    if (done) words.forEach(w => { if (placed[w.id] === w.type) score++; });

    return `
    <div class="page ex2-page">
      ${this._moduleNav(m,'ex2')}
      <div class="ex-wrap">
        <div class="ex-header">
          <h2 class="ex-title">2-жаттығу — Жіктеу</h2>
          <p class="ex-desc">Сөздерді дұрыс топқа сүйреңіз <span class="ex2-hint">(немесе: сөзді таңдап, топты басыңыз)</span></p>
          <div class="ex-progress-bar"><div class="ex-progress-fill" style="width:${Math.round(((words.length - remaining.length)/words.length)*100)}%"></div></div>
          <span class="ex-counter">${words.length - remaining.length}/${words.length} жіктелді</span>
        </div>
        ${!done ? `
        <div class="ex2-cards" id="ex2Cards">
          ${remaining.map(w => `
            <div class="ex2-card" draggable="true" data-wid="${w.id}">
              ${w.word}
            </div>`).join('')}
        </div>` : ''}

        <div class="ex2-zones">
          <div class="ex2-zone ${done?'zone-done':''}" data-zone="дара" id="zoneDara">
            <div class="zone-label">◆ Дара</div>
            <div class="zone-words">
              ${dara.map(w => {
                const correct = done && w.type === 'дара';
                return `<div class="zone-word ${done?(correct?'wc':'ww'):''}">
                  ${w.word}${done?`<span>${correct?'✓':'✗'}</span>`:''}
                </div>`;
              }).join('')}
              ${!done ? `<div class="zone-placeholder">+ сүйреңіз</div>` : ''}
            </div>
          </div>
          <div class="ex2-zone ${done?'zone-done':''}" data-zone="күрделі" id="zoneKurd">
            <div class="zone-label">◈ Күрделі</div>
            <div class="zone-words">
              ${kurd.map(w => {
                const correct = done && w.type === 'күрделі';
                return `<div class="zone-word ${done?(correct?'wc':'ww'):''}">
                  ${w.word}${done?`<span>${correct?'✓':'✗'}</span>`:''}
                </div>`;
              }).join('')}
              ${!done ? `<div class="zone-placeholder">+ сүйреңіз</div>` : ''}
            </div>
          </div>
        </div>

        ${done ? `
          <div class="ex2-result">
            <div class="result-score">${score}/${words.length}</div>
            <p>${score === words.length ? '🏆 Тамаша! Барлығы дұрыс!' : `${score} дұрыс жауап`}</p>
            <button class="btn-pri" style="background:${m.color}" data-action="goto-quiz">
              Тестке өту →
            </button>
          </div>` : ''}
      </div>
    </div>`;
  }

  // ─── QUIZ ─────────────────────────────────────────────────
  _buildQuizQuestions(words) {
    return this._shuffle(words).slice(0,7).map(w => {
      const others = words.filter(x => x.id !== w.id);
      const wrong = this._shuffle(others).slice(0,3).map(x => x.meaning);
      const opts = this._shuffle([w.meaning, ...wrong]);
      return { wid: w.id, word: w.word, correct: w.meaning, options: opts };
    });
  }

  _quiz() {
    const m = this.getModule();
    if (!this.state.quizQuestions.length) {
      this.state.quizQuestions = this._buildQuizQuestions(m.words);
      this.state.quizAnswers = {};
      this.state.timeLeft = 60;
      this._startTimer();
    }
    const qs = this.state.quizQuestions;
    const idx = this.state.qIndex;
    const q = qs[idx];
    const ans = this.state.quizAnswers[q.wid];
    const tl = this.state.timeLeft;

    return `
    <div class="page quiz-page">
      ${this._moduleNav(m,'quiz')}
      <div class="ex-wrap">
        <div class="quiz-header">
          <div class="quiz-timer ${tl<=10?'timer-low':''}" id="quizTimer">⏱ ${tl}с</div>
          <div class="quiz-prog">${idx+1} / ${qs.length}</div>
        </div>
        <div class="quiz-qbar">
          <div class="quiz-qfill" style="width:${(idx/qs.length)*100}%"></div>
        </div>
        <div class="quiz-card" style="--mc:${m.color}">
          <p class="quiz-prompt">«${q.word}» — мағынасы қандай?</p>
          <div class="quiz-opts">
            ${q.options.map((o,i)=>{
              let cls = 'qopt';
              if (ans) {
                if (o === q.correct) cls += ' qopt-ok';
                else if (o === ans)  cls += ' qopt-err';
              }
              return `<button class="${cls}" data-action="quiz-answer"
                       data-qid="${q.wid}" data-ans="${o.replace(/"/g,'&quot;')}"
                       data-correct="${q.correct.replace(/"/g,'&quot;')}"
                       ${ans?'disabled':''}>
                <span class="qopt-num">${String.fromCharCode(1040+i)}</span>
                <span>${o}</span>
              </button>`;
            }).join('')}
          </div>
          ${ans ? `
            <div class="feedback ${ans===q.correct?'feedback-ok':'feedback-err'}">
              ${ans===q.correct ? '✓ Дұрыс!' : `✗ Дұрыс жауап: <em>${q.correct}</em>`}
            </div>
            <button class="btn-pri" style="background:${m.color}" data-action="quiz-next">
              ${idx < qs.length-1 ? 'Келесі →' : 'Нәтиже →'}
            </button>` : ''}
        </div>
      </div>
    </div>`;
  }

  // ─── RESULTS ──────────────────────────────────────────────
  _results() {
    const m = this.getModule();
    const qs = this.state.quizQuestions;
    const ans = this.state.quizAnswers;
    const score = qs.filter(q => ans[q.wid] === q.correct).length;
    const pct = Math.round((score/qs.length)*100);
    const stars = pct >= 86 ? 3 : pct >= 57 ? 2 : 1;
    this.saveProgress(m.id,'quiz');

    return `
    <div class="page results-page">
      ${this._moduleNav(m,'quiz')}
      <div class="results-wrap">
        <div class="results-card">
          <div class="res-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3-stars)}</div>
          <div class="res-score">${score}/${qs.length}</div>
          <div class="res-pct">${pct}%</div>
          <p class="res-msg">${
            pct===100 ? '🏆 Керемет! Мінсіз нәтиже!' :
            pct>=86   ? '🎉 Тамаша! Сіз жақсы үйрендіңіз!' :
            pct>=57   ? '👍 Жақсы! Біраз қайталаңыз.' :
                        '💪 Тырысыңыз! Сабақты қайталаңыз.'
          }</p>
          <div class="res-breakdown">
            ${qs.map(q=>`
              <div class="res-row ${ans[q.wid]===q.correct?'res-ok':'res-fail'}">
                <span>${ans[q.wid]===q.correct?'✓':'✗'}</span>
                <span class="res-word">${q.word}</span>
                <span class="res-def">${q.correct}</span>
              </div>`).join('')}
          </div>
          <div class="res-btns">
            <button class="btn-sec" data-action="retry-quiz">🔄 Тестті қайталау</button>
            <button class="btn-pri" style="background:${m.color}" data-action="home">🏠 Басты бет</button>
          </div>
        </div>
      </div>
    </div>`;
  }

  // ─── BIND EVENTS (drag-drop only — click handler is in constructor) ─────
  _bind() {
    // ── Drag & Drop (desktop) ─────────────────────────────
    document.querySelectorAll('[draggable]').forEach(card => {
      card.addEventListener('dragstart', e => {
        e.dataTransfer.setData('wid', card.dataset.wid);
        e.dataTransfer.effectAllowed = 'move';
        card.classList.add('dragging');
      });
      card.addEventListener('dragend', () => card.classList.remove('dragging'));
    });

    document.querySelectorAll('.ex2-zone').forEach(zone => {
      zone.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        zone.classList.add('zone-over');
      });
      zone.addEventListener('dragleave', e => {
        if (!zone.contains(e.relatedTarget)) zone.classList.remove('zone-over');
      });
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('zone-over');
        const wid = e.dataTransfer.getData('wid');
        if (!wid) return;
        const placed = { ...this.state.ex2Placed, [wid]: zone.dataset.zone };
        this.go({ ex2Placed: placed });
      });
    });

    // ── Mobile: tap card → tap zone ───────────────────────
    // NOTE: these use stopPropagation so the root click handler doesn't fire
    document.querySelectorAll('.ex2-card').forEach(card => {
      card.addEventListener('click', e => {
        e.stopPropagation();
        if (this._selectedCard === card.dataset.wid) {
          card.classList.remove('selected');
          this._selectedCard = null;
        } else {
          document.querySelectorAll('.ex2-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          this._selectedCard = card.dataset.wid;
        }
      });
    });

    document.querySelectorAll('.ex2-zone').forEach(zone => {
      zone.addEventListener('click', e => {
        if (!this._selectedCard) return;
        e.stopPropagation();
        const placed = { ...this.state.ex2Placed, [this._selectedCard]: zone.dataset.zone };
        this._selectedCard = null;
        this.go({ ex2Placed: placed });
      });
    });
  }

  // ─── HANDLE ACTION ────────────────────────────────────────
  _handle(d) {
    switch(d.action) {

      case 'back-landing':
        this._clearTimer();
        window.landing = new Landing((moduleId) => {
          window.scrollTo({ top: 0 });
          document.documentElement.style.setProperty('background','#07071a');
          window.kaz = new App(moduleId);
        });
        break;

      case 'home':
        this._clearTimer();
        this.go({ view:'home', moduleId:null, step:null, qIndex:0,
                  quizQuestions:[], ex1Questions:null, ex1Answers:{},
                  ex1Score:0, ex2Placed:{} });
        break;

      case 'open-module':
        this._clearTimer();
        this.go({ view:'module', moduleId:d.mid, step:'learn', qIndex:0,
                  ex1Questions:null, ex1Answers:{}, ex1Score:0,
                  ex2Placed:{}, quizQuestions:[], quizAnswers:{} });
        break;

      case 'goto-step':
        this._clearTimer();
        this.go({ step:d.step, qIndex:0, ex1Questions:null,
                  ex1Answers:{}, ex1Score:0, ex2Placed:{},
                  quizQuestions:[], quizAnswers:{} });
        break;

      case 'prev-word':
        this.go({ qIndex: Math.max(0, this.state.qIndex-1) });
        break;

      case 'next-word':
        this.go({ qIndex: this.state.qIndex+1 });
        break;

      case 'finish-learn':
        this.saveProgress(this.state.moduleId,'learn');
        this.go({ step:'ex1', qIndex:0, ex1Questions:null, ex1Answers:{}, ex1Score:0 });
        break;

      case 'play-sound': {
        audio.play(d.sound);
        this._sonarPulse();
        break;
      }

      case 'ex1-answer': {
        if (this.state.ex1Answers[d.qid]) break; // already answered
        const answers = { ...this.state.ex1Answers, [d.qid]: d.oid };
        const newScore = (this.state.ex1Score || 0) + (d.oid === d.correct ? 1 : 0);
        this.go({ ex1Answers: answers, ex1Score: newScore });
        break;
      }

      case 'ex1-next': {
        const qs = this.state.ex1Questions;
        const next = this.state.qIndex + 1;
        if (next >= qs.length) {
          this.saveProgress(this.state.moduleId,'ex1');
          this.go({ step:'ex2', qIndex:0, ex2Placed:{} });
        } else {
          this.go({ qIndex: next });
        }
        break;
      }

      case 'goto-quiz':
        this.saveProgress(this.state.moduleId,'ex2');
        this._clearTimer();
        this.go({ step:'quiz', qIndex:0, quizQuestions:[], quizAnswers:{} });
        break;

      case 'quiz-answer': {
        if (this.state.quizAnswers[d.qid]) break; // already answered
        const quizAnswers = { ...this.state.quizAnswers, [d.qid]: d.ans };
        this.go({ quizAnswers });
        break;
      }

      case 'quiz-next': {
        const next = this.state.qIndex + 1;
        if (next >= this.state.quizQuestions.length) {
          this._clearTimer();
          this.go({ step:'results' });
        } else {
          this.go({ qIndex: next });
        }
        break;
      }

      case 'retry-quiz':
        this._clearTimer();
        this.go({ step:'quiz', qIndex:0, quizQuestions:[], quizAnswers:{} });
        break;

      default:
        // Legacy fallback: direct data-sound on elements without explicit action
        if (d.sound) {
          audio.play(d.sound);
          this._sonarPulse();
        }
        break;
    }
  }

  // ─── HELPERS ──────────────────────────────────────────────
  _sonarPulse() {
    const sv = document.getElementById('sv');
    if (!sv) return;
    sv.classList.remove('playing');
    void sv.offsetWidth;
    sv.classList.add('playing');
  }

  _clearTimer() {
    if (this.state.quizTimer) {
      clearInterval(this.state.quizTimer);
      this.state.quizTimer = null;
    }
  }

  _startTimer() {
    this._clearTimer();
    const interval = setInterval(() => {
      this.state.timeLeft = Math.max(0, this.state.timeLeft - 1);
      const el = document.getElementById('quizTimer');
      if (el) {
        el.textContent = `⏱ ${this.state.timeLeft}с`;
        if (this.state.timeLeft <= 10) el.classList.add('timer-low');
      }
      if (this.state.timeLeft <= 0) {
        clearInterval(interval);
        this.state.quizTimer = null;
        const qs = this.state.quizQuestions;
        const ans = { ...this.state.quizAnswers };
        qs.forEach(q => { if (!ans[q.wid]) ans[q.wid] = '__timeout__'; });
        this.go({ step:'results', quizAnswers: ans });
      }
    }, 1000);
    this.state.quizTimer = interval;
  }

  _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length-1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}

window.addEventListener('load', () => {
  window.landing = new Landing((moduleId) => {
    window.scrollTo({ top: 0 });
    document.documentElement.style.setProperty('background','#07071a');
    window.kaz = new App(moduleId);
  });
});
