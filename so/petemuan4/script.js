/* =============================================
   SISTEM OPERASI — PERTEMUAN 4
   Manajemen Proses | script.js
   ============================================= */

'use strict';

/* ─── Navigation ─── */
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item');
const visitedSections = new Set();

function showSection(id) {
  sections.forEach(s => s.classList.remove('active'));
  navItems.forEach(n => n.classList.remove('active'));

  const target = document.getElementById('section-' + id);
  if (target) {
    target.classList.add('active');
    visitedSections.add(id);
  }

  const navEl = document.querySelector(`[data-section="${id}"]`);
  if (navEl) {
    navEl.classList.add('active');
    navEl.classList.add('visited');
    navEl.querySelector('.nav-check')?.style && (navEl.querySelector('.nav-check').style.display = 'block');
  }

  updateProgress();
  closeSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress() {
  const total = navItems.length;
  const done  = visitedSections.size;
  const pct   = Math.round((done / total) * 100);
  const fill  = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  if (fill)  fill.style.width = pct + '%';
  if (label) label.textContent = pct + '%';
}

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const sec = item.dataset.section;
    if (sec) showSection(sec);
  });
});

/* ─── Sidebar Mobile ─── */
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const hamburger = document.getElementById('hamburger');

function openSidebar()  { sidebar.classList.add('open'); overlay.classList.add('show'); }
function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('show'); }

hamburger?.addEventListener('click', openSidebar);
overlay?.addEventListener('click', closeSidebar);

/* ─── Dark / Light Mode ─── */
let isDark = true;
document.getElementById('theme-toggle')?.addEventListener('click', () => {
  isDark = !isDark;
  document.body.classList.toggle('light', !isDark);
  const btn = document.getElementById('theme-toggle');
  btn.innerHTML = isDark
    ? '<span>🌙</span> Dark Mode'
    : '<span>☀️</span> Light Mode';
});

/* ─── Hero Button ─── */
document.getElementById('btn-mulai')?.addEventListener('click', () => showSection('tujuan'));

/* ─── Program vs Process Toggle ─── */
document.getElementById('btn-lihat-perbedaan')?.addEventListener('click', () => {
  const wrap = document.getElementById('pp-table-wrap');
  if (!wrap) return;
  wrap.classList.toggle('show');
  const btn = document.getElementById('btn-lihat-perbedaan');
  btn.textContent = wrap.classList.contains('show') ? '▲ Sembunyikan' : '📊 Lihat Perbedaannya';
});

/* ─── Process State Click ─── */
const stateInfo = {
  new:  { title: '🟡 NEW', desc: 'Proses baru saja dibuat oleh sistem operasi. Kernel mengalokasikan PCB dan sumber daya awal untuk proses ini.' },
  ready:{ title: '🟢 READY', desc: 'Proses telah siap dijalankan dan sedang menunggu giliran mendapatkan waktu CPU dari scheduler.' },
  running:{ title: '🔵 RUNNING', desc: 'Proses sedang dieksekusi oleh CPU. Hanya satu proses yang dapat berada di state ini pada satu CPU dalam satu waktu.' },
  waiting:{ title: '🟠 WAITING / BLOCKED', desc: 'Proses sedang menunggu suatu kejadian eksternal, misalnya operasi I/O (baca/tulis file) selesai dilaksanakan.' },
  terminated:{ title: '🔴 TERMINATED', desc: 'Proses telah selesai dieksekusi. Sistem operasi membebaskan sumber daya yang digunakan proses ini.' },
};

document.querySelectorAll('.state-node').forEach(node => {
  node.addEventListener('click', () => {
    document.querySelectorAll('.state-node').forEach(n => n.classList.remove('active'));
    node.classList.add('active');
    const st = node.dataset.state;
    const box = document.getElementById('state-info-box');
    if (box && stateInfo[st]) {
      box.innerHTML = `<h4>${stateInfo[st].title}</h4><p>${stateInfo[st].desc}</p>`;
    }
  });
});

/* ─── Simulator Manajemen Proses ─── */
const simProcesses = [
  { id: 'chrome',   icon: '🌐', name: 'Chrome' },
  { id: 'word',     icon: '📝', name: 'Word' },
  { id: 'vscode',   icon: '💻', name: 'VS Code' },
  { id: 'explorer', icon: '📁', name: 'Explorer' },
];

const simSteps = [
  { proc: 'chrome',   from: 'new',     to: 'ready',      text: 'Chrome dibuat dan masuk ke antrean Ready Queue.' },
  { proc: 'word',     from: 'new',     to: 'ready',      text: 'Microsoft Word dibuat dan masuk ke Ready Queue.' },
  { proc: 'chrome',   from: 'ready',   to: 'running',    text: 'Scheduler memberikan CPU kepada Chrome. Chrome mulai dieksekusi.' },
  { proc: 'word',     from: 'ready',   to: 'ready',      text: 'Word masih menunggu di Ready Queue.' },
  { proc: 'chrome',   from: 'running', to: 'waiting',    text: 'Chrome membutuhkan data dari disk. Chrome masuk ke Waiting.' },
  { proc: 'word',     from: 'ready',   to: 'running',    text: 'Scheduler memberikan CPU kepada Word. Context switch terjadi.' },
  { proc: 'chrome',   from: 'waiting', to: 'ready',      text: 'Data disk selesai. Chrome kembali ke Ready Queue.' },
  { proc: 'word',     from: 'running', to: 'terminated', text: 'Word selesai dieksekusi dan dihentikan.' },
  { proc: 'chrome',   from: 'ready',   to: 'running',    text: 'Chrome mendapat giliran CPU kembali.' },
  { proc: 'chrome',   from: 'running', to: 'terminated', text: 'Chrome selesai dan dihentikan. Sumber daya dibebaskan.' },
];

let simCurrentStep = 0;
let simRunning     = false;
let simInterval    = null;

// State of each process
let procState = {};

function initSim() {
  procState = {};
  simProcesses.forEach(p => { procState[p.id] = 'none'; });
  renderSim();
  updateSimInfo('Klik ▶ MULAI untuk memulai simulasi.', 0);
  simCurrentStep = 0;
  simRunning = false;
  clearInterval(simInterval);
  document.getElementById('sim-btn-start')?.removeAttribute('disabled');
  document.getElementById('sim-btn-next')?.removeAttribute('disabled');
}

function renderSim() {
  const zones = { new: [], ready: [], running: [], waiting: [], terminated: [] };
  simProcesses.forEach(p => {
    if (procState[p.id] && procState[p.id] !== 'none') {
      zones[procState[p.id]]?.push(p);
    }
  });

  ['new','ready','running','waiting','terminated'].forEach(zone => {
    const el = document.getElementById('simzone-' + zone);
    if (!el) return;
    const procs = el.querySelectorAll('.proc-card');
    procs.forEach(pc => pc.remove());
    zones[zone].forEach(p => {
      const card = document.createElement('div');
      card.className = `proc-card ${p.id} anim-bounce`;
      card.innerHTML = `<span class="pc-icon">${p.icon}</span><span class="pc-name">${p.name}</span>`;
      el.appendChild(card);
    });
  });
}

function updateSimInfo(text, step) {
  const info = document.getElementById('sim-step-info');
  if (!info) return;
  const total = simSteps.length;
  info.querySelector('.step-num').textContent = step > 0 ? `STEP ${step} / ${total}` : 'SIMULATOR';
  info.querySelector('.step-text').textContent = text;
}

function doSimStep() {
  if (simCurrentStep >= simSteps.length) {
    updateSimInfo('✅ Simulasi selesai! Semua proses telah dieksekusi.', simSteps.length);
    simRunning = false;
    clearInterval(simInterval);
    return;
  }
  const step = simSteps[simCurrentStep];
  procState[step.proc] = step.to;
  renderSim();
  updateSimInfo(step.text, simCurrentStep + 1);
  simCurrentStep++;
}

document.getElementById('sim-btn-start')?.addEventListener('click', () => {
  if (simRunning) return;
  initSim();
  setTimeout(() => {
    simRunning = true;
    simInterval = setInterval(() => {
      if (simCurrentStep >= simSteps.length) {
        clearInterval(simInterval);
        simRunning = false;
      } else {
        doSimStep();
      }
    }, 1500);
  }, 300);
});

document.getElementById('sim-btn-pause')?.addEventListener('click', () => {
  if (simRunning) {
    clearInterval(simInterval);
    simRunning = false;
  } else if (simCurrentStep > 0 && simCurrentStep < simSteps.length) {
    simRunning = true;
    simInterval = setInterval(() => {
      if (simCurrentStep >= simSteps.length) {
        clearInterval(simInterval);
        simRunning = false;
      } else {
        doSimStep();
      }
    }, 1500);
  }
});

document.getElementById('sim-btn-next')?.addEventListener('click', () => {
  if (!simRunning) doSimStep();
});

document.getElementById('sim-btn-reset')?.addEventListener('click', initSim);

/* ─── Context Switch Animation ─── */
const ctxSteps = [
  { text: '1. CPU sedang menjalankan Chrome', active: 0 },
  { text: '2. Simpan konteks Chrome ke PCB', active: 1 },
  { text: '3. Context Switch terjadi', active: 2 },
  { text: '4. Muat konteks Word dari PCB', active: 3 },
  { text: '5. CPU mulai menjalankan Word', active: 4 },
];

let ctxStep = 0;
let ctxRunning = false;
let ctxInterval = null;

function renderCtx() {
  document.querySelectorAll('.ctx-step').forEach((el, i) => {
    el.classList.toggle('active', i === ctxStep);
  });
  const chromeBox = document.getElementById('ctx-chrome');
  const wordBox   = document.getElementById('ctx-word');
  if (ctxStep < 2) {
    chromeBox?.classList.add('active');
    wordBox?.classList.remove('active');
  } else if (ctxStep >= 4) {
    chromeBox?.classList.remove('active');
    wordBox?.classList.add('active');
  } else {
    chromeBox?.classList.remove('active');
    wordBox?.classList.remove('active');
  }
}

document.getElementById('ctx-btn-start')?.addEventListener('click', () => {
  ctxStep = 0;
  renderCtx();
  ctxRunning = true;
  clearInterval(ctxInterval);
  ctxInterval = setInterval(() => {
    ctxStep++;
    if (ctxStep >= 5) { clearInterval(ctxInterval); ctxRunning = false; ctxStep = 4; }
    renderCtx();
  }, 1200);
});

document.getElementById('ctx-btn-reset')?.addEventListener('click', () => {
  clearInterval(ctxInterval);
  ctxRunning = false;
  ctxStep = 0;
  renderCtx();
  document.querySelectorAll('.ctx-step').forEach(el => el.classList.remove('active'));
  document.getElementById('ctx-chrome')?.classList.remove('active');
  document.getElementById('ctx-word')?.classList.remove('active');
});

/* ─── PCB Dynamic ─── */
const pcbStates = ['RUNNING','WAITING','READY','RUNNING'];
const pcbCounters = ['0x004A12','0x004A12','0x004B30','0x004C88'];
const pcbIo = ['Ready','Pending','Pending','Ready'];
let pcbIdx = 0;

document.getElementById('pcb-cycle')?.addEventListener('click', () => {
  pcbIdx = (pcbIdx + 1) % pcbStates.length;
  const stateEl = document.getElementById('pcb-state-val');
  const pcEl    = document.getElementById('pcb-pc-val');
  const ioEl    = document.getElementById('pcb-io-val');
  if (stateEl) {
    stateEl.textContent = pcbStates[pcbIdx];
    stateEl.className = 'pcb-val ' + pcbStates[pcbIdx].toLowerCase();
  }
  if (pcEl) pcEl.textContent = pcbCounters[pcbIdx];
  if (ioEl) ioEl.textContent = pcbIo[pcbIdx];
});

/* ─── CPU/RAM Animated Bars ─── */
const resourceData = {
  chrome:  { cpu: 20, ram: 500, ramTotal: 8000 },
  word:    { cpu: 10, ram: 350, ramTotal: 8000 },
  vscode:  { cpu: 15, ram: 700, ramTotal: 8000 },
};

function animateBars() {
  Object.entries(resourceData).forEach(([app, data]) => {
    const cpuFill = document.getElementById(`bar-cpu-${app}`);
    const ramFill = document.getElementById(`bar-ram-${app}`);
    const cpuPct  = document.getElementById(`pct-cpu-${app}`);
    const ramPct  = document.getElementById(`pct-ram-${app}`);
    if (cpuFill) { cpuFill.style.width = data.cpu + '%'; }
    if (ramFill) { ramFill.style.width = ((data.ram / data.ramTotal) * 100).toFixed(1) + '%'; }
    if (cpuPct)  { cpuPct.textContent  = data.cpu + '%'; }
    if (ramPct)  { ramPct.textContent  = data.ram + ' MB'; }
  });
}

// Animate bars when section is active
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) animateBars();
  });
}, { threshold: 0.2 });
const resSection = document.getElementById('section-cpu-ram');
if (resSection) observer.observe(resSection);

// Fluctuate bars slightly
setInterval(() => {
  Object.keys(resourceData).forEach(app => {
    resourceData[app].cpu = Math.max(1, Math.min(100, resourceData[app].cpu + (Math.random() - 0.5) * 4));
  });
  const cpuSection = document.getElementById('section-cpu-ram');
  if (cpuSection?.classList.contains('active')) animateBars();
}, 2000);

/* ─── Analisis Kondisi RAM ─── */
document.querySelectorAll('.quiz-ram-opt').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.quiz-ram-opt').forEach(b => b.classList.remove('correct','wrong'));
    const isCorrect = btn.dataset.answer === 'A';
    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    const feedback = document.getElementById('ram-quiz-feedback');
    if (feedback) {
      feedback.className = 'game-feedback show ' + (isCorrect ? 'correct' : 'wrong');
      feedback.innerHTML = isCorrect
        ? '✅ <strong>Benar!</strong> RAM 97% menunjukkan penggunaan memori sangat tinggi. Sistem operasi kesulitan mengalokasikan memori baru sehingga kinerja turun.'
        : '❌ <strong>Kurang tepat.</strong> Perhatikan angka CPU (35%) vs RAM (97%). CPU masih berjalan normal, tetapi RAM hampir penuh menyebabkan bottleneck.';
    }
    document.querySelectorAll('.quiz-ram-opt').forEach(b => b.disabled = true);
  });
});

/* ─── Mini Game (Process Detective) ─── */
const gameQuestions = [
  {
    q: 'Microsoft Word sedang menunggu data dari SSD.',
    opts: ['NEW','READY','RUNNING','WAITING','TERMINATED'],
    ans: 3,
    explain: 'WAITING karena proses menunggu operasi I/O (baca SSD) selesai.'
  },
  {
    q: 'Chrome baru saja dibuka oleh pengguna, OS baru selesai membuat proses tersebut.',
    opts: ['NEW','READY','RUNNING','WAITING','TERMINATED'],
    ans: 0,
    explain: 'NEW adalah state ketika proses baru saja dibuat oleh sistem operasi.'
  },
  {
    q: 'VS Code berada di antrean dan siap menerima CPU kapan saja.',
    opts: ['NEW','READY','RUNNING','WAITING','TERMINATED'],
    ans: 1,
    explain: 'READY berarti proses sudah siap dan menunggu giliran mendapatkan CPU dari scheduler.'
  },
  {
    q: 'Proses kalkulator sedang dieksekusi secara aktif oleh CPU.',
    opts: ['NEW','READY','RUNNING','WAITING','TERMINATED'],
    ans: 2,
    explain: 'RUNNING berarti CPU sedang mengeksekusi instruksi proses tersebut.'
  },
  {
    q: 'Pengguna menutup Notepad dan proses selesai dihentikan.',
    opts: ['NEW','READY','RUNNING','WAITING','TERMINATED'],
    ans: 4,
    explain: 'TERMINATED berarti proses selesai dan sumber dayanya dibebaskan OS.'
  },
  {
    q: 'Struktur data yang digunakan OS untuk menyimpan semua informasi sebuah proses disebut...',
    opts: ['CPU Register','PCB','RAM Block','Thread Table'],
    ans: 1,
    explain: 'PCB (Process Control Block) menyimpan PID, state, program counter, register, dan info memori.'
  },
  {
    q: 'Mekanisme perpindahan CPU dari satu proses ke proses lain disebut...',
    opts: ['Multitasking','Scheduling','Context Switch','Thread Switching'],
    ans: 2,
    explain: 'Context Switch adalah proses menyimpan kondisi proses lama dan memuat kondisi proses baru.'
  },
  {
    q: 'Mana yang BUKAN merupakan informasi yang tersimpan dalam PCB?',
    opts: ['PID','Warna tema aplikasi','Program Counter','CPU Registers'],
    ans: 1,
    explain: 'PCB menyimpan informasi teknis seperti PID, state, counter, register, dan memori — bukan preferensi visual.'
  },
  {
    q: 'Unit eksekusi yang lebih kecil di dalam sebuah proses disebut...',
    opts: ['Module','Thread','Subprocess','Kernel'],
    ans: 1,
    explain: 'Thread adalah unit eksekusi dalam proses. Satu proses bisa memiliki banyak thread.'
  },
];

let gameScore   = 0;
let gameCurrent = 0;
let gameAnswered = false;

function renderGame() {
  const container = document.getElementById('game-container');
  const scoreBox  = document.getElementById('game-score-box');
  if (!container) return;

  if (gameCurrent >= gameQuestions.length) {
    container.style.display = 'none';
    if (scoreBox) {
      scoreBox.style.display = 'block';
      const pct = Math.round((gameScore / gameQuestions.length) * 100);
      const num  = scoreBox.querySelector('.sc-num');
      const tot  = scoreBox.querySelector('.sc-total');
      const grade = scoreBox.querySelector('.score-grade');
      if (num)   num.textContent   = gameScore;
      if (tot)   tot.textContent   = '/' + gameQuestions.length;
      if (grade) {
        let g = '';
        if (pct >= 90) { g = '🏆 Sangat Baik!';   grade.className = 'score-grade excellent'; }
        else if (pct >= 80) { g = '👍 Baik!';      grade.className = 'score-grade good'; }
        else if (pct >= 70) { g = '🙂 Cukup';      grade.className = 'score-grade average'; }
        else                { g = '📚 Pelajari Lagi'; grade.className = 'score-grade poor'; }
        grade.textContent = g;
      }
    }
    updateGameProgress();
    return;
  }

  const q = gameQuestions[gameCurrent];
  container.style.display = 'block';
  if (scoreBox) scoreBox.style.display = 'none';
  gameAnswered = false;

  container.innerHTML = `
    <div class="game-card">
      <div class="game-num">Soal ${gameCurrent + 1} / ${gameQuestions.length}</div>
      <div class="game-q">${q.q}</div>
      <div class="game-options">
        ${q.opts.map((opt, i) => `
          <button class="game-opt" data-index="${i}">
            <span class="opt-letter">${String.fromCharCode(65+i)}</span>
            ${opt}
          </button>
        `).join('')}
      </div>
      <div class="game-feedback" id="gfeedback"></div>
    </div>
  `;

  container.querySelectorAll('.game-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      if (gameAnswered) return;
      gameAnswered = true;
      const idx = parseInt(btn.dataset.index);
      const correct = idx === q.ans;
      if (correct) gameScore++;
      btn.classList.add(correct ? 'correct' : 'wrong');
      if (!correct) {
        container.querySelectorAll('.game-opt')[q.ans].classList.add('correct');
      }
      container.querySelectorAll('.game-opt').forEach(b => b.disabled = true);
      const fb = document.getElementById('gfeedback');
      if (fb) {
        fb.className = 'game-feedback show ' + (correct ? 'correct' : 'wrong');
        fb.innerHTML = (correct ? '✅ ' : '❌ ') + q.explain;
      }
      updateGameProgress();
      setTimeout(() => {
        gameCurrent++;
        renderGame();
      }, 2200);
    });
  });

  updateGameProgress();
}

function updateGameProgress() {
  document.querySelectorAll('.gp-dot').forEach((dot, i) => {
    dot.className = 'gp-dot';
    if (i < gameCurrent) dot.classList.add(i < gameCurrent ? 'done' : '');
    if (i === gameCurrent) dot.classList.add('current');
  });
  // mark answered correctly
}

document.getElementById('game-start-btn')?.addEventListener('click', () => {
  gameScore = 0;
  gameCurrent = 0;
  gameAnswered = false;
  const scoreBox = document.getElementById('game-score-box');
  if (scoreBox) scoreBox.style.display = 'none';
  renderGame();
});

document.getElementById('game-restart-btn')?.addEventListener('click', () => {
  gameScore = 0;
  gameCurrent = 0;
  gameAnswered = false;
  const scoreBox = document.getElementById('game-score-box');
  if (scoreBox) scoreBox.style.display = 'none';
  renderGame();
});

/* ─── Quick Quiz (Latihan Cepat) ─── */
const quizQuestions = [
  {
    q: 'Apa perbedaan utama antara Program dan Process?',
    opts: [
      'Program menggunakan CPU, Process tidak',
      'Process adalah program yang sedang dieksekusi',
      'Program lebih besar dari Process',
      'Tidak ada perbedaan'
    ],
    ans: 1,
    topic: 'Program vs Process'
  },
  {
    q: 'State proses ketika sedang menunggu operasi I/O selesai adalah...',
    opts: ['NEW','READY','RUNNING','WAITING'],
    ans: 3,
    topic: 'Process State'
  },
  {
    q: 'Informasi apa yang TIDAK tersimpan dalam PCB?',
    opts: ['PID','State proses','Warna desktop','Program Counter'],
    ans: 2,
    topic: 'PCB'
  },
  {
    q: 'Fungsi RAM dalam manajemen proses adalah...',
    opts: [
      'Menjalankan instruksi proses',
      'Menyimpan data dan instruksi yang sedang digunakan',
      'Mengatur jadwal proses',
      'Menghentikan proses'
    ],
    ans: 1,
    topic: 'CPU & RAM'
  },
  {
    q: 'Context Switch adalah...',
    opts: [
      'Mengganti tema OS',
      'Perpindahan CPU dari satu proses ke proses lain dengan simpan/muat kondisi',
      'Mematikan semua proses',
      'Menyimpan file di disk'
    ],
    ans: 1,
    topic: 'Context Switch'
  },
];

let quizAnswers = new Array(quizQuestions.length).fill(null);
let quizCurrentQ = 0;

function renderQuiz() {
  quizQuestions.forEach((q, qi) => {
    const step = document.getElementById(`quiz-step-${qi}`);
    if (!step) return;
    step.classList.toggle('active', qi === quizCurrentQ);
  });
}

function quizSelectAnswer(qi, optIdx) {
  quizAnswers[qi] = optIdx;
  const step = document.getElementById(`quiz-step-${qi}`);
  if (!step) return;
  step.querySelectorAll('.quiz-opt').forEach((btn, i) => {
    btn.classList.toggle('selected', i === optIdx);
  });
}

function showQuizResult() {
  const result = document.getElementById('quiz-result');
  const stepsWrap = document.getElementById('quiz-steps');
  if (!result || !stepsWrap) return;

  let correct = 0;
  quizQuestions.forEach((q, i) => {
    if (quizAnswers[i] === q.ans) correct++;
  });

  const pct = (correct / quizQuestions.length) * 100;
  let grade = '', gradeClass = '';
  if (pct >= 90)      { grade = '🏆 Sangat Baik';    gradeClass = 'excellent'; }
  else if (pct >= 80) { grade = '👍 Baik';            gradeClass = 'good'; }
  else if (pct >= 70) { grade = '🙂 Cukup';           gradeClass = 'average'; }
  else                { grade = '📚 Perlu Belajar Lagi'; gradeClass = 'poor'; }

  stepsWrap.style.display = 'none';
  result.style.display = 'block';

  // Show correct/wrong per question
  const breakdown = quizQuestions.map((q, i) => {
    const userAns = quizAnswers[i];
    const isRight = userAns === q.ans;
    return `
      <div style="margin-bottom:12px; padding:12px 16px; background:var(--bg-card); border-radius:8px; border-left: 3px solid ${isRight ? 'var(--green-500)' : 'var(--red-500)'};">
        <div style="font-size:12px; color:var(--text-muted); margin-bottom:4px;">${q.topic}</div>
        <div style="font-size:13px; margin-bottom:6px;">${q.q}</div>
        <div style="font-size:12px; color:${isRight ? 'var(--green-400)' : 'var(--red-400)'};">
          ${isRight ? '✅' : '❌'} Jawaban Anda: ${userAns !== null ? q.opts[userAns] : '(tidak dijawab)'}
          ${!isRight ? `<br><span style="color:var(--green-400)">✔ Jawaban benar: ${q.opts[q.ans]}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');

  result.innerHTML = `
    <div class="quiz-result">
      <div class="score-circle" style="margin-bottom:16px;">
        <div class="sc-num">${correct}</div>
        <div class="sc-total">/${quizQuestions.length}</div>
      </div>
      <div class="score-grade ${gradeClass}">${grade}</div>
      <div style="font-size:14px; color:var(--text-muted); margin-bottom:24px;">Skor: ${Math.round(pct)}/100</div>
      <div style="text-align:left;">${breakdown}</div>
      <button class="btn btn-primary mt-24" onclick="resetQuiz()">🔄 Ulangi Latihan</button>
    </div>
  `;
}

window.resetQuiz = function() {
  quizAnswers = new Array(quizQuestions.length).fill(null);
  quizCurrentQ = 0;
  const result = document.getElementById('quiz-result');
  const stepsWrap = document.getElementById('quiz-steps');
  if (result)    { result.style.display = 'none'; result.innerHTML = ''; }
  if (stepsWrap) { stepsWrap.style.display = 'block'; }
  // reset selections
  quizQuestions.forEach((q, qi) => {
    const step = document.getElementById(`quiz-step-${qi}`);
    if (!step) return;
    step.querySelectorAll('.quiz-opt').forEach(btn => btn.classList.remove('selected','correct','wrong'));
    step.classList.remove('active');
  });
  renderQuiz();
};

// Wire up quiz options
quizQuestions.forEach((q, qi) => {
  const step = document.getElementById(`quiz-step-${qi}`);
  if (!step) return;
  step.querySelectorAll('.quiz-opt').forEach((btn, oi) => {
    btn.addEventListener('click', () => quizSelectAnswer(qi, oi));
  });
  const nextBtn = step.querySelector('.quiz-next');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (quizAnswers[qi] === null) return;
      quizCurrentQ = Math.min(quizCurrentQ + 1, quizQuestions.length - 1);
      if (qi === quizQuestions.length - 1) {
        showQuizResult();
      } else {
        renderQuiz();
      }
    });
  }
  const prevBtn = step.querySelector('.quiz-prev');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      quizCurrentQ = Math.max(quizCurrentQ - 1, 0);
      renderQuiz();
    });
  }
});

/* ─── Pembahasan Studi Kasus ─── */
document.getElementById('btn-lihat-pembahasan')?.addEventListener('click', () => {
  const wrap = document.getElementById('pembahasan-wrap');
  if (!wrap) return;
  wrap.classList.toggle('show');
  const btn = document.getElementById('btn-lihat-pembahasan');
  btn.textContent = wrap.classList.contains('show') ? '▲ Tutup Pembahasan' : '💬 Lihat Pembahasan';
});

/* ─── Final Simulation ─── */
const finalSteps = [
  { icon: '👤', label: 'User mengklik Microsoft Word', badge: 'Input', color: 'var(--cyan-400)' },
  { icon: '⚙️', label: 'OS membuat PROCESS baru', badge: 'OS Action', color: 'var(--purple-400)' },
  { icon: '🟡', label: 'State: NEW', badge: 'NEW', color: 'var(--yellow-400)' },
  { icon: '🟢', label: 'State: READY — Masuk Ready Queue', badge: 'READY', color: 'var(--green-400)' },
  { icon: '🔵', label: 'State: RUNNING — CPU menjalankan Word', badge: 'RUNNING', color: 'var(--blue-400)' },
  { icon: '🟠', label: 'Word membutuhkan data → WAITING', badge: 'WAITING', color: 'var(--orange-400)' },
  { icon: '🗂️', label: 'Data selesai dibaca dari disk', badge: 'I/O Done', color: 'var(--cyan-400)' },
  { icon: '🟢', label: 'State: READY kembali', badge: 'READY', color: 'var(--green-400)' },
  { icon: '🔵', label: 'State: RUNNING — Word aktif kembali', badge: 'RUNNING', color: 'var(--blue-400)' },
  { icon: '🔴', label: 'Word ditutup → TERMINATED', badge: 'TERMINATED', color: 'var(--red-400)' },
];

let finalStepIdx = 0;
let finalRunning = false;
let finalInterval = null;

function renderFinalSim() {
  const container = document.getElementById('final-sim-container');
  if (!container) return;
  container.innerHTML = finalSteps.map((s, i) => `
    <div class="fsf-step ${i < finalStepIdx ? 'done' : ''} ${i === finalStepIdx - 1 ? 'active' : ''}" id="fsf-${i}">
      <span class="fsf-icon">${s.icon}</span>
      <span class="fsf-label">${s.label}</span>
      <span class="fsf-badge" style="background:${s.color}20; color:${s.color}; border:1px solid ${s.color}40;">${s.badge}</span>
    </div>
  `).join('');
}

document.getElementById('final-sim-btn')?.addEventListener('click', () => {
  finalStepIdx = 0;
  renderFinalSim();
  clearInterval(finalInterval);
  finalRunning = true;
  finalInterval = setInterval(() => {
    finalStepIdx++;
    renderFinalSim();
    if (finalStepIdx >= finalSteps.length) {
      clearInterval(finalInterval);
      finalRunning = false;
    }
  }, 800);
});

/* ─── Download Template ─── */
document.getElementById('btn-download-template')?.addEventListener('click', () => {
  const content = `TEMPLATE HASIL PENGAMATAN PROSES
Mata Kuliah: Sistem Operasi — Pertemuan 4
Nama: ___________________________
NIM:  ___________________________
Tanggal: _______________________

+----+------------------+-------+----------+---------------------------+
| No | Nama Proses      | CPU % | RAM (MB) | Fungsi Proses             |
+----+------------------+-------+----------+---------------------------+
|  1 |                  |       |          |                           |
|  2 |                  |       |          |                           |
|  3 |                  |       |          |                           |
|  4 |                  |       |          |                           |
|  5 |                  |       |          |                           |
+----+------------------+-------+----------+---------------------------+

PERTANYAAN ANALISIS:
1. Sebutkan 5 proses yang Anda amati dan jelaskan fungsi masing-masing.
2. Proses mana yang menggunakan CPU paling tinggi?
3. Proses mana yang menggunakan RAM paling tinggi?
4. Mengapa proses membutuhkan CPU dan RAM?
5. Bagaimana Kernel berperan dalam mengelola proses?
6. Apa yang terjadi jika terlalu banyak proses berjalan bersamaan?
7. Jelaskan hubungan antara Process, CPU, RAM, dan Kernel.

KESIMPULAN:
_______________________________________________________________
_______________________________________________________________
`;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = 'Template_Tugas4_SistemOperasi.txt';
  a.click();
  URL.revokeObjectURL(url);
});

/* ══════════════════════════════════════════════════
   SIMULATOR 2: CPU SCHEDULER (ROUND ROBIN & GANTT)
   ══════════════════════════════════════════════════ */
const defaultSchedProcs = [
  { id: 'chrome',   name: 'P1: Chrome',   icon: '🌐', burst: 5, totalBurst: 5, color: 'chrome' },
  { id: 'word',     name: 'P2: Word',     icon: '📝', burst: 3, totalBurst: 3, color: 'word' },
  { id: 'vscode',   name: 'P3: VS Code',  icon: '💻', burst: 4, totalBurst: 4, color: 'vscode' },
  { id: 'explorer', name: 'P4: Explorer', icon: '📁', burst: 2, totalBurst: 2, color: 'explorer' },
];

let schedQueue = [];
let schedRunning = null;
let schedQuantum = 2;
let schedQuantumUsed = 0;
let schedCurrentTime = 0;
let schedHistory = [];
let schedInterval = null;
let schedIsPlaying = false;

function initCpuScheduler() {
  resetCpuScheduler();

  document.getElementById('sched-quantum-select')?.addEventListener('change', (e) => {
    schedQuantum = parseInt(e.target.value, 10) || 2;
    renderSchedulerUI();
  });

  document.getElementById('btn-sched-start')?.addEventListener('click', startCpuScheduler);
  document.getElementById('btn-sched-pause')?.addEventListener('click', pauseCpuScheduler);
  document.getElementById('btn-sched-step')?.addEventListener('click', stepCpuScheduler);
  document.getElementById('btn-sched-reset')?.addEventListener('click', resetCpuScheduler);
}

function resetCpuScheduler() {
  pauseCpuScheduler();
  schedQueue = JSON.parse(JSON.stringify(defaultSchedProcs));
  schedRunning = null;
  schedQuantumUsed = 0;
  schedCurrentTime = 0;
  schedHistory = [];

  const quantumSelect = document.getElementById('sched-quantum-select');
  if (quantumSelect) {
    schedQuantum = parseInt(quantumSelect.value, 10) || 2;
  }

  // Reset Gantt
  const track = document.getElementById('gantt-track');
  const timeEl = document.getElementById('gantt-time');
  if (track) track.innerHTML = '<div class="gantt-block idle" data-tip="CPU Idle">Siap...</div>';
  if (timeEl) timeEl.innerHTML = '<span class="gantt-tick">0s</span>';

  renderSchedulerUI();
}

function renderSchedulerUI() {
  // 1. CPU Box
  const cpuRunningEl = document.getElementById('sched-cpu-running');
  const timebarFill  = document.getElementById('sched-quantum-bar');
  const timebarText  = document.getElementById('sched-quantum-text');
  const cpuBox       = document.getElementById('sched-cpu-box');

  if (cpuRunningEl) {
    if (schedRunning) {
      cpuRunningEl.innerHTML = `
        <div class="sched-running-proc">
          <span class="srp-icon">${schedRunning.icon}</span>
          <div>
            <div class="srp-name">${schedRunning.name}</div>
            <div class="srp-pid">Sisa Burst: <strong>${schedRunning.burst}s</strong> / ${schedRunning.totalBurst}s</div>
          </div>
        </div>
      `;
      cpuBox?.classList.add('anim-pulse');
    } else {
      cpuRunningEl.innerHTML = `
        <span class="sched-cpu-idle">
          ${schedQueue.length === 0 && schedCurrentTime > 0
            ? '🎉 Semua proses di antrean telah selesai dieksekusi!'
            : 'CPU sedang Idle. Klik ▶ Mulai Scheduler untuk eksekusi.'}
        </span>
      `;
      cpuBox?.classList.remove('anim-pulse');
    }
  }

  // 2. Quantum Progress
  if (timebarFill && timebarText) {
    const pct = schedRunning ? Math.min(100, Math.round((schedQuantumUsed / schedQuantum) * 100)) : 0;
    timebarFill.style.width = pct + '%';
    timebarText.textContent = `${schedQuantumUsed} / ${schedQuantum} detik (Quantum)`;
  }

  // 3. Ready Queue
  const queueEl = document.getElementById('sched-queue');
  if (queueEl) {
    if (schedQueue.length === 0) {
      queueEl.innerHTML = '<span class="sched-empty-queue">Antrean Ready Queue Kosong (Tidak ada proses menunggu)</span>';
    } else {
      queueEl.innerHTML = schedQueue.map(p => `
        <div class="sched-proc-chip ${p.color}">
          <span class="spc-icon">${p.icon}</span>
          <span>${p.name}</span>
          <span class="spc-burst">${p.burst}s</span>
        </div>
      `).join('');
    }
  }
}

function stepCpuScheduler() {
  // If no process is running, pick the next from queue
  if (!schedRunning) {
    if (schedQueue.length === 0) {
      pauseCpuScheduler();
      renderSchedulerUI();
      return;
    }
    schedRunning = schedQueue.shift();
    schedQuantumUsed = 0;
  }

  // Execute 1 second
  schedCurrentTime++;
  schedQuantumUsed++;
  schedRunning.burst--;

  // Append Gantt Chart Block
  appendGanttBlock(schedRunning.color, schedRunning.name, schedCurrentTime);

  // Check if process finished
  if (schedRunning.burst <= 0) {
    schedRunning = null;
    schedQuantumUsed = 0;
  } else if (schedQuantumUsed >= schedQuantum) {
    // Quantum expired -> Context Switch!
    schedQueue.push(schedRunning);
    schedRunning = null;
    schedQuantumUsed = 0;
  }

  renderSchedulerUI();

  // If completed everything
  if (!schedRunning && schedQueue.length === 0) {
    pauseCpuScheduler();
  }
}

function appendGanttBlock(colorClass, procName, timeSec) {
  const track = document.getElementById('gantt-track');
  const timeEl = document.getElementById('gantt-time');
  if (!track || !timeEl) return;

  // Clear idle placeholder on first step
  const idle = track.querySelector('.gantt-block.idle');
  if (idle) idle.remove();

  const block = document.createElement('div');
  block.className = `gantt-block ${colorClass}`;
  block.setAttribute('data-tip', `${procName} (t=${timeSec}s)`);
  block.textContent = procName.split(':')[0];
  track.appendChild(block);

  const tick = document.createElement('span');
  tick.className = 'gantt-tick';
  tick.textContent = timeSec + 's';
  timeEl.appendChild(tick);

  // Auto-scroll gantt chart to right
  track.scrollLeft = track.scrollWidth;
}

function startCpuScheduler() {
  if (schedIsPlaying) return;
  schedIsPlaying = true;
  document.getElementById('btn-sched-start')?.setAttribute('disabled', 'true');
  schedInterval = setInterval(() => {
    stepCpuScheduler();
  }, 1000);
}

function pauseCpuScheduler() {
  schedIsPlaying = false;
  clearInterval(schedInterval);
  document.getElementById('btn-sched-start')?.removeAttribute('disabled');
}

/* ══════════════════════════════════════════════════
   SIMULATOR 3: RAM MEMORY MAP SIMULATOR
   ══════════════════════════════════════════════════ */
let memBlocks = [
  { id: 'kernel',   name: 'Kernel OS (Reserved)',    size: 1024, type: 'kernel' },
  { id: 'chrome',   name: 'Google Chrome (PID 1024)', size: 1400, type: 'chrome' },
  { id: 'vscode',   name: 'VS Code (PID 2048)',       size: 1200, type: 'vscode' },
  { id: 'word',     name: 'MS Word (PID 3096)',       size: 780,  type: 'word' },
  { id: 'explorer', name: 'File Explorer (PID 4120)', size: 446,  type: 'explorer' },
  { id: 'free1',    name: 'Free RAM Space',           size: 3342, type: 'free' }
];

const candidateProcesses = [
  { id: 'spotify', name: 'Spotify Music (PID 5210)', size: 480, type: 'chrome' },
  { id: 'discord', name: 'Discord Chat (PID 6104)', size: 620, type: 'explorer' },
  { id: 'node',    name: 'Node.js Dev (PID 7312)',  size: 540, type: 'vscode' },
  { id: 'zoom',    name: 'Zoom Meeting (PID 8440)', size: 750, type: 'word' },
];

function initMemMap() {
  renderMemMap();

  document.getElementById('btn-mem-launch')?.addEventListener('click', launchNewMemProcess);
  document.getElementById('btn-mem-kill')?.addEventListener('click', killLargestMemProcess);
  document.getElementById('btn-mem-defrag')?.addEventListener('click', defragMemMap);
}

function renderMemMap() {
  const bar = document.getElementById('memmap-bar');
  if (!bar) return;

  const totalRAM = 8192;
  bar.innerHTML = memBlocks.map(b => {
    const heightPct = Math.max(30, Math.round((b.size / totalRAM) * 240));
    return `
      <div class="mem-block ${b.type} ${b.isNew ? 'allocating' : ''}" style="min-height:${heightPct}px;">
        ${b.name} — ${b.size} MB
      </div>
    `;
  }).join('');

  // Remove isNew flag
  memBlocks.forEach(b => delete b.isNew);

  // Compute stats
  const usedRAM = memBlocks.filter(b => b.type !== 'free').reduce((acc, b) => acc + b.size, 0);
  const freeRAM = Math.max(0, totalRAM - usedRAM);
  const utilPct = ((usedRAM / totalRAM) * 100).toFixed(1);

  const usedEl = document.getElementById('mem-used-val');
  const freeEl = document.getElementById('mem-free-val');
  const utilEl = document.getElementById('mem-util-val');

  if (usedEl) usedEl.textContent = `${usedRAM.toLocaleString()} MB`;
  if (freeEl) freeEl.textContent = `${freeRAM.toLocaleString()} MB`;
  if (utilEl) utilEl.textContent = `${utilPct}%`;
}

function launchNewMemProcess() {
  // Find first free block
  const freeIdx = memBlocks.findIndex(b => b.type === 'free' && b.size >= 400);
  if (freeIdx === -1) {
    alert('⚠️ Alokasi Gagal: RAM tidak memiliki ruang bebas yang cukup! Hentikan proses terlebih dahulu.');
    return;
  }

  const candidate = candidateProcesses[Math.floor(Math.random() * candidateProcesses.length)];
  const freeBlock = memBlocks[freeIdx];
  const newProc = {
    id: candidate.id + '_' + Date.now().toString().slice(-4),
    name: candidate.name,
    size: candidate.size,
    type: candidate.type,
    isNew: true
  };

  const remainingFree = freeBlock.size - candidate.size;
  if (remainingFree > 80) {
    memBlocks.splice(freeIdx, 1, newProc, {
      id: 'free_' + Date.now(),
      name: 'Free RAM Space',
      size: remainingFree,
      type: 'free'
    });
  } else {
    memBlocks.splice(freeIdx, 1, newProc);
  }

  renderMemMap();
}

function killLargestMemProcess() {
  const activeProcs = memBlocks.filter(b => b.type !== 'kernel' && b.type !== 'free');
  if (activeProcs.length === 0) {
    alert('Tidak ada proses pengguna yang dapat dihentikan (Kernel terlindungi).');
    return;
  }

  activeProcs.sort((a, b) => b.size - a.size);
  const largest = activeProcs[0];
  const idx = memBlocks.indexOf(largest);
  if (idx !== -1) {
    memBlocks[idx] = {
      id: 'free_' + Date.now(),
      name: 'Free RAM Space',
      size: largest.size,
      type: 'free'
    };
    renderMemMap();
  }
}

function defragMemMap() {
  const kernel = memBlocks.filter(b => b.type === 'kernel');
  const active = memBlocks.filter(b => b.type !== 'kernel' && b.type !== 'free');
  const totalFree = memBlocks.filter(b => b.type === 'free').reduce((acc, b) => acc + b.size, 0);

  memBlocks = [
    ...kernel,
    ...active,
    { id: 'free_defrag', name: 'Free RAM Space (Terkonsolidasi)', size: totalFree, type: 'free', isNew: true }
  ];

  renderMemMap();
}

/* ══════════════════════════════════════════════════
   LIVE STATS TICKER (Drives micro-animations)
   ══════════════════════════════════════════════════ */
function initLiveStatsTicker() {
  const cpuVal = document.getElementById('hdr-cpu-val');
  const ramVal = document.getElementById('hdr-ram-val');

  setInterval(() => {
    if (cpuVal) {
      const randCpu = Math.floor(Math.random() * 24) + 32; // 32% - 56%
      cpuVal.textContent = randCpu + '%';
    }
    if (ramVal) {
      const randRam = (4.6 + Math.random() * 0.5).toFixed(1); // 4.6 - 5.1 GB
      ramVal.textContent = randRam + ' GB';
    }
  }, 2500);
}

/* ══════════════════════════════════════════════════
   SIMULATOR 4: PROGRAM TO PROCESS LAUNCHER
   ══════════════════════════════════════════════════ */
function initProgramLauncherSim() {
  const btnWord = document.getElementById('btn-launch-word');
  const btnChrome = document.getElementById('btn-launch-chrome');
  const diskStage = document.getElementById('lstage-disk');
  const ramStage  = document.getElementById('lstage-ram');
  const cpuStage  = document.getElementById('lstage-cpu');
  const arrow1    = document.getElementById('larrow-1');
  const arrow2    = document.getElementById('larrow-2');
  const fileChip  = document.getElementById('lstage-file-chip');
  const ramChip   = document.getElementById('lstage-ram-chip');
  const cpuChip   = document.getElementById('lstage-cpu-chip');
  const statusBox = document.getElementById('launcher-status-box');

  function runLaunch(name, pid, ramMB) {
    if (!statusBox) return;

    // Reset stages
    [diskStage, ramStage, cpuStage].forEach(s => s?.classList.remove('active', 'done'));
    [arrow1, arrow2].forEach(a => a?.classList.remove('active'));

    // Step 1: Disk reading
    diskStage?.classList.add('active');
    if (fileChip) fileChip.textContent = `📄 ${name}.exe (Storage)`;
    if (ramChip)  ramChip.textContent  = `⏳ Alokasi ${ramMB} MB...`;
    if (cpuChip)  cpuChip.textContent  = `💤 CPU Idle`;
    statusBox.innerHTML = `<strong>Langkah 1/3:</strong> User mengeklik program. Sistem operasi membaca file <code>${name}.exe</code> dari penyimpanan sekunder (Disk/SSD) ke memori.`;

    // Step 2: Loading to RAM
    setTimeout(() => {
      diskStage?.classList.remove('active');
      diskStage?.classList.add('done');
      arrow1?.classList.add('active');
      ramStage?.classList.add('active');

      if (ramChip) ramChip.textContent = `🧠 [PID: ${pid}] Alokasi ${ramMB} MB + PCB Aktif`;
      statusBox.innerHTML = `<strong>Langkah 2/3:</strong> Kernel mengalokasikan RAM sebesar <strong>${ramMB} MB</strong>, membuat struktur <strong>PCB (Process Control Block)</strong>, dan memberikan <strong>PID unik: ${pid}</strong>. Program resmi menjadi <strong>PROCESS</strong>!`;
    }, 1400);

    // Step 3: CPU execution
    setTimeout(() => {
      ramStage?.classList.remove('active');
      ramStage?.classList.add('done');
      arrow1?.classList.remove('active');
      arrow2?.classList.add('active');
      cpuStage?.classList.add('active');

      if (cpuChip) cpuChip.textContent = `⚡ [PID: ${pid}] Mengeksekusi Instruksi`;
      statusBox.innerHTML = `<strong>Langkah 3/3 (Selesai):</strong> Scheduler CPU mengalokasikan thread execution. Register CPU &amp; Program Counter mulai mengeksekusi instruksi aktif dari <strong>${name} [PID: ${pid}]</strong>!`;
    }, 2800);
  }

  btnWord?.addEventListener('click', () => runLaunch('Word', 1024, 350));
  btnChrome?.addEventListener('click', () => runLaunch('Chrome', 2048, 780));
}

/* ══════════════════════════════════════════════════
   SIMULATOR 5: PROCESS MEMORY ARCHITECTURE (STACK/HEAP)
   ══════════════════════════════════════════════════ */
function initProcessMemorySim() {
  let stackFrames = 3;
  let heapObjects = 2;

  const stackEl     = document.getElementById('pmem-stack');
  const heapEl      = document.getElementById('pmem-heap');
  const stackInfoEl = document.getElementById('pmem-stack-info');
  const heapInfoEl  = document.getElementById('pmem-heap-info');
  const statusEl    = document.getElementById('pmem-status');

  function updateMemoryUI() {
    if (stackEl) stackEl.style.minHeight = (stackFrames * 22 + 20) + 'px';
    if (heapEl)  heapEl.style.minHeight  = (heapObjects * 22 + 20) + 'px';

    if (stackInfoEl) stackInfoEl.textContent = `${stackFrames} Frame Fungsi Aktif (SP: 0x${(0x7FFF00 - stackFrames * 0x20).toString(16).toUpperCase()})`;
    if (heapInfoEl)  heapInfoEl.textContent  = `${heapObjects} Objek Dinamis dialokasikan`;

    if (statusEl) {
      if (stackFrames >= 5) {
        statusEl.innerHTML = `<span style="color:var(--red-400);">⚠️ PERINGATAN: Rekursi terlalu dalam! Hampir terjadi <strong>Stack Overflow</strong>!</span>`;
      } else if (heapObjects >= 5) {
        statusEl.innerHTML = `<span style="color:var(--yellow-400);">⚠️ Alokasi Heap besar! Terjadi potensi <strong>Memory Leak</strong> jika tidak di-free.</span>`;
      } else {
        statusEl.innerHTML = `<span style="color:var(--blue-400);">✅ Ruang memori proses aman dan seimbang. Stack dan Heap tidak bertabrakan.</span>`;
      }
    }
  }

  document.getElementById('btn-pmem-call')?.addEventListener('click', () => {
    if (stackFrames < 6) stackFrames++;
    updateMemoryUI();
  });

  document.getElementById('btn-pmem-return')?.addEventListener('click', () => {
    if (stackFrames > 1) stackFrames--;
    updateMemoryUI();
  });

  document.getElementById('btn-pmem-alloc')?.addEventListener('click', () => {
    if (heapObjects < 6) heapObjects++;
    updateMemoryUI();
  });

  document.getElementById('btn-pmem-free')?.addEventListener('click', () => {
    if (heapObjects > 0) heapObjects--;
    updateMemoryUI();
  });

  updateMemoryUI();
}

/* ══════════════════════════════════════════════════
   SIMULATOR 6: STATE EVENT TRIGGER CONTROLLER
   ══════════════════════════════════════════════════ */
function initStateEventTriggers() {
  const box = document.getElementById('state-info-box');
  const stateNodes = document.querySelectorAll('.state-node');

  function triggerState(stateName, title, desc) {
    stateNodes.forEach(n => n.classList.remove('active'));
    const target = document.querySelector(`.state-node[data-state="${stateName}"]`);
    if (target) {
      target.classList.add('active');
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    if (box) {
      box.innerHTML = `
        <h4>${title}</h4>
        <p>${desc}</p>
      `;
      box.classList.add('active');
    }
  }

  document.getElementById('btn-ev-admit')?.addEventListener('click', () => {
    triggerState('ready', '🟢 Event: Admitted (NEW ➔ READY)', 'Proses baru telah dialokasikan memori dan PCB oleh OS, kemudian dimasukkan ke antrean Ready Queue untuk menunggu giliran CPU.');
  });

  document.getElementById('btn-ev-dispatch')?.addEventListener('click', () => {
    triggerState('running', '🔵 Event: Scheduler Dispatch (READY ➔ RUNNING)', 'Algoritma penjadwalan OS memilih proses ini dari antrean dan mengalokasikan siklus CPU. Proses mulai mengeksekusi instruksi aktif.');
  });

  document.getElementById('btn-ev-io')?.addEventListener('click', () => {
    triggerState('waiting', '🟠 Event: I/O Request (RUNNING ➔ WAITING)', 'Proses memanggil System Call (misal: membaca file disk atau menunggu paket jaringan). Karena operasi I/O lambat, CPU memindahkan proses ke state WAITING (Blocked).');
  });

  document.getElementById('btn-ev-iodone')?.addEventListener('click', () => {
    triggerState('ready', '🟢 Event: I/O Complete (WAITING ➔ READY)', 'Hardware I/O mengirimkan sinyal Interrupt ke Kernel bahwa data telah selesai dibaca. Proses kembali siap di antrean Ready Queue.');
  });

  document.getElementById('btn-ev-preempt')?.addEventListener('click', () => {
    triggerState('ready', '🟢 Event: Timer Interrupt / Preempt (RUNNING ➔ READY)', 'Jatah waktu CPU (Time Quantum) proses telah habis. CPU Scheduler melakukan Context Switch dan memindahkan proses kembali ke Ready Queue.');
  });

  document.getElementById('btn-ev-exit')?.addEventListener('click', () => {
    triggerState('terminated', '🔴 Event: Exit / Terminate (RUNNING ➔ TERMINATED)', 'Proses selesai mengeksekusi instruksi terakhirnya (misal: return 0 atau ditutup user). OS membebaskan seluruh RAM dan menghapus PCB proses.');
  });
}

/* ══════════════════════════════════════════════════
   SIMULATOR 7: SINGLE-THREAD VS MULTI-THREAD RACE
   ══════════════════════════════════════════════════ */
function initThreadRaceSim() {
  const btnRun = document.getElementById('btn-run-thread-race');
  const cardST = document.getElementById('card-single-thread');
  const cardMT = document.getElementById('card-multi-thread');
  const badgeST = document.getElementById('badge-st');
  const badgeMT = document.getElementById('badge-mt');
  const stBar   = document.getElementById('st-bar');
  const stPct   = document.getElementById('st-pct');
  const mtNetBar  = document.getElementById('mt-net-bar');
  const mtNetPct  = document.getElementById('mt-net-pct');
  const mtFileBar = document.getElementById('mt-file-bar');
  const mtFilePct = document.getElementById('mt-file-pct');
  const btnSTClick = document.getElementById('btn-test-st-click');
  const btnMTClick = document.getElementById('btn-test-mt-click');
  const msgST = document.getElementById('st-click-msg');
  const msgMT = document.getElementById('mt-click-msg');

  let isRaceRunning = false;
  let isSTFrozen = false;
  let stClicks = 0;
  let mtClicks = 0;

  btnSTClick?.addEventListener('click', () => {
    if (isSTFrozen) {
      if (msgST) msgST.innerHTML = `<span style="color:var(--red-400); font-weight:bold;">❌ Klik Gagal! Main thread sedang sibuk memproses loop, UI freeze!</span>`;
    } else {
      stClicks++;
      if (msgST) msgST.textContent = `Tombol direspons normal (${stClicks} klik).`;
    }
  });

  btnMTClick?.addEventListener('click', () => {
    mtClicks++;
    if (msgMT) msgMT.innerHTML = `<span style="color:var(--green-400); font-weight:bold;">⚡ Responsif! UI Thread merespons instan (${mtClicks} klik) meski background threads bekerja!</span>`;
  });

  btnRun?.addEventListener('click', () => {
    if (isRaceRunning) return;
    isRaceRunning = true;
    isSTFrozen = true;
    stClicks = 0;
    mtClicks = 0;
    btnRun.setAttribute('disabled', 'true');

    // UI state
    cardST?.classList.add('frozen');
    if (badgeST) { badgeST.className = 'app-status-badge frozen'; badgeST.textContent = 'Membeku (Not Responding)'; }
    if (badgeMT) { badgeMT.className = 'app-status-badge smooth'; badgeMT.textContent = 'Multi-Core Aktif (60 FPS)'; }
    cardMT?.classList.add('responsive');

    if (msgST) msgST.innerHTML = `<span style="color:var(--red-400); font-weight:bold;">⚠️ Main thread sedang diblokir! Coba klik tombol di atas!</span>`;

    // Multi-Thread animation runs concurrently (finishes in ~1.8s)
    let mtProgress = 0;
    const mtInterval = setInterval(() => {
      mtProgress += 10;
      if (mtNetBar) mtNetBar.style.width = Math.min(100, mtProgress * 1.2) + '%';
      if (mtNetPct) mtNetPct.textContent = Math.min(100, Math.round(mtProgress * 1.2)) + '%';
      if (mtFileBar) mtFileBar.style.width = Math.min(100, mtProgress) + '%';
      if (mtFilePct) mtFilePct.textContent = Math.min(100, Math.round(mtProgress)) + '%';

      if (mtProgress >= 100) {
        clearInterval(mtInterval);
        if (badgeMT) badgeMT.textContent = '✅ Selesai (1.8s)';
      }
    }, 180);

    // Single-Thread animation runs sequentially (finishes in ~3.8s)
    let stProgress = 0;
    const stInterval = setInterval(() => {
      stProgress += 5;
      if (stBar) stBar.style.width = stProgress + '%';
      if (stPct) stPct.textContent = stProgress + '%';

      if (stProgress >= 100) {
        clearInterval(stInterval);
        isSTFrozen = false;
        isRaceRunning = false;
        cardST?.classList.remove('frozen');
        if (badgeST) { badgeST.className = 'app-status-badge smooth'; badgeST.textContent = '✅ Selesai (3.8s)'; }
        if (msgST) msgST.textContent = 'Proses selesai! UI kembali merespons setelah thread bebas.';
        btnRun.removeAttribute('disabled');
      }
    }, 190);
  });
}

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
  showSection('hero');
  initSim();
  initCpuScheduler();
  initMemMap();
  initProgramLauncherSim();
  initProcessMemorySim();
  initStateEventTriggers();
  initThreadRaceSim();
  initLiveStatsTicker();
  renderFinalSim();
  renderQuiz();
  animateBars();
});


