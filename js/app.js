document.addEventListener('DOMContentLoaded', () => {
       // State management
                              let currentModule = null;
       let currentTopic = null;
                                     let score = 0;
       let timeLeft = 60;
       let timerId = null;

                              // DOM Elements
                              const elements = {
                                         landingPage: document.getElementById('landing-page'),
                                         moduleSelection: document.getElementById('module-selection'),
                                         topicSelection: document.getElementById('topic-selection'),
                                         readerPage: document.getElementById('reader-page'),
                                         gamePage: document.getElementById('game-page'),
                                         moduleGrid: document.getElementById('module-grid'),
                                         topicList: document.getElementById('topic-list'),
                                         readerContent: document.getElementById('reader-content'),
                                         gameContainer: document.getElementById('game-container'),
                                         backButtons: document.querySelectorAll('.back-btn'),
                                         timerDisplay: document.getElementById('time-left'),
                                         scoreDisplay: document.getElementById('current-score')
                              };

                              // Initialize App
                              function init() {
                                         renderModules();
                                         setupEventListeners();
                              }

                              // Render Modules
                              function renderModules() {
                                         elements.moduleGrid.innerHTML = '';
                                         AppData.modules.forEach(module => {
                                                        const card = document.createElement('div');
                                                        card.className = 'module-card';
                                                        card.style.background = module.gradient;
                                                        card.innerHTML = `
                                                                        <div class="module-icon">${module.icon}</div>
                                                                                        <h3>${module.title}</h3>
                                                                                                        <p>${module.subtitle}</p>
                                                                                                                    `;
                                                        card.onclick = () => selectModule(module);
                                                        elements.moduleGrid.appendChild(card);
                                         });
                              }
       // Module Selection
                              function selectModule(module) {
                                         currentModule = module;
                                         renderTopics(module);
                                  switchPage('topic-selection');
                              }

                              // Render Topics
                              function renderTopics(module) {
                                         elements.topicList.innerHTML = '';
                                         module.topics.forEach(topic => {
                                                        const item = document.createElement('div');
                                                        item.className = 'topic-item';
                                                        item.innerHTML = `
                                                                        <div class="topic-info">
                                                                                            <h4>${topic.title}</h4>
                                                                                                                <p>${topic.author}</p>
                                                                                                                                </div>
                                                                                                                                                ${topic.hasGame ? '<span class="game-badge">\ud83c\udfae \u041e\u0439\u044b\u043d</span>' : ''}
                                                                                                                                                            `;
                                                        item.onclick = () => selectTopic(topic);
                                                        elements.topicList.appendChild(item);
                                         });
                              }

                              // Topic Selection
                              function selectTopic(topic) {
                                         currentTopic = topic;
                                         if (topic.hasGame) {
                                                        startGame();
                                         } else {
                                                        showReader(topic);
                                         }
                              }

                              // Reader
                              function showReader(topic) {
                                         elements.readerContent.innerHTML = `
                                                     <h2>${topic.title}</h2>
                                                                 <p class="author">${topic.author}</p>
                                                                             <div class="text-content">
                                                                                             <p>\u0411\u04b1\u043b \u0448\u044b\u0493\u0430\u0440\u043c\u0430 \u04d9\u043b\u0456 \u0436\u04af\u043a\u0442\u0435\u043b\u043c\u0435\u0434\u0456. \u0416\u0430\u049b\u044b\u043d \u0430\u0440\u0430\u0434\u0430 \u049b\u043e\u0441\u044b\u043b\u0430\u0442\u044b\u043d \u0431\u043e\u043b\u0430\u0434\u044b.</p>
                                                                                                         </div>
                                                                                                                 `;
                                         switchPage('reader-page');
                              }
       // Game Logic
                              function startGame() {
                                         score = 0;
                                         timeLeft = 60;
                                         updateGameUI();
                                         switchPage('game-page');
                                         startTimer();
                                         generateQuestion();
                              }

                              function startTimer() {
                                         if (timerId) clearInterval(timerId);
                                         timerId = setInterval(() => {
                                                        timeLeft--;
                                                        elements.timerDisplay.textContent = timeLeft;
                                                        if (timeLeft <= 0) endGame();
                                         }, 1000);
                              }

                              function generateQuestion() {
                                         const questions = [
                                            { q: '\u049a\u0430\u0441\u044b\u043c \u049a\u0430\u0439\u0441\u0435\u043d\u043e\u0432 \u043a\u0456\u043c?', a: ['\u0411\u0430\u0442\u044b\u0440, \u0436\u0430\u0437\u0443\u0448\u044b', '\u04d8\u043d\u0448\u0456', '\u0492\u0430\u043b\u044b\u043c'], correct: 0 },
                                            { q: '"\u0416\u0430\u0443 \u0442\u044b\u043b\u044b\u043d\u0434\u0430\u0493\u044b \u0431\u0430\u043b\u0430" \u043a\u0456\u043c \u0442\u0443\u0440\u0430\u043b\u044b?', a: ['\u0421\u0435\u0440\u0456\u043a', '\u0411\u043e\u043b\u0430\u0442\u0431\u0435\u043a', '\u04d8\u043b\u0438\u0431\u0435\u043a'], correct: 1 }
                                                    ];

           const q = questions[Math.floor(Math.random() * questions.length)];
                                         elements.gameContainer.innerHTML = `
                                                     <div class="question-box">
                                                                     <h3>${q.q}</h3>
                                                                                     <div class="options-grid">
                                                                                                         ${q.a.map((opt, i) => `
                                                                                                                                 <button class="option-btn" onclick="checkAnswer(${i}, ${q.correct})">${opt}</button>
                                                                                                                                                     `).join('')}
                                                                                                                                                                     </div>
                                                                                                                                                                                 </div>
                                                                                                                                                                                         `;
                              }

                              window.checkAnswer = (selected, correct) => {
                                         if (selected === correct) {
                                                        score += 10;
                                                        elements.scoreDisplay.textContent = score;
                                                        generateQuestion();
                                         } else {
                                                        timeLeft -= 5;
                                         }
                              };
       function updateGameUI() {
                  elements.scoreDisplay.textContent = score;
                  elements.timerDisplay.textContent = timeLeft;
       }

                              function endGame() {
                                         clearInterval(timerId);
                                         alert('\u041e\u0439\u044b\u043d \u0430\u044f\u049b\u0442\u0430\u043b\u0434\u044b! \u0421\u0456\u0437\u0434\u0456\u04a3 \u04b1\u043f\u0430\u0439\u044b\u04a3\u044b\u0437: ' + score);
                                         switchPage('topic-selection');
                              }

                              // Navigation
                              function switchPage(pageId) {
                                         document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                                         document.getElementById(pageId).classList.add('active');
                                         window.scrollTo(0, 0);
                              }

                              function setupEventListeners() {
                                         elements.backButtons.forEach(btn => {
                                                        btn.onclick = () => {
                                                                           const current = document.querySelector('.page.active').id;
                                                                           if (current === 'topic-selection') switchPage('module-selection');
                                                                           else if (current === 'reader-page' || current === 'game-page') switchPage('topic-selection');
                                                        };
                                         });

           document.querySelector('.start-btn').onclick = () => switchPage('module-selection');
                              }

                              init();
});
