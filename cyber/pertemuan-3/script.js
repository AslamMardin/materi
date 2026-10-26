/* ============================================
   CYBER SECURITY MANAGEMENT - CIA TRIAD
   script.js - Vanilla JavaScript
   ============================================ */

'use strict';

// ============================================
// DATA & CONFIGURATION
// ============================================

const CIA_MODAL_DATA = {
  C: {
    title: '🔒 CONFIDENTIALITY — Kerahasiaan',
    color: 'var(--blue-cia)',
    content: `
      <p><strong>Definisi:</strong> Confidentiality memastikan bahwa informasi hanya dapat diakses oleh pihak yang berwenang. Data yang bersifat rahasia tidak boleh bocor atau diakses oleh orang yang tidak memiliki izin.</p>
      <br>
      <p><strong>Pertanyaan kunci:</strong> <em>"Siapa yang boleh melihat data ini?"</em></p>
      <br>
      <p><strong>Contoh pelanggaran:</strong></p>
      <ul>
        <li>Password akun bocor ke pihak lain</li>
        <li>Data pribadi pelanggan tersebar di internet</li>
        <li>Nilai mahasiswa dapat dilihat oleh mahasiswa lain</li>
        <li>Email rahasia perusahaan terbaca oleh kompetitor</li>
      </ul>
      <br>
      <p><strong>Cara melindungi:</strong></p>
      <ul>
        <li>Enkripsi data (encryption)</li>
        <li>Password yang kuat dan unik</li>
        <li>Multi-Factor Authentication (MFA)</li>
        <li>Access Control — pembatasan hak akses</li>
        <li>Edukasi phishing kepada pengguna</li>
        <li>VPN untuk koneksi yang aman</li>
      </ul>
    `
  },
  I: {
    title: '✅ INTEGRITY — Integritas',
    color: 'var(--green-cia)',
    content: `
      <p><strong>Definisi:</strong> Integrity memastikan bahwa data tetap akurat, lengkap, dan tidak diubah oleh pihak yang tidak berwenang. Setiap perubahan pada data harus melalui proses yang sah dan terotorisasi.</p>
      <br>
      <p><strong>Pertanyaan kunci:</strong> <em>"Apakah data masih benar dan tidak dimanipulasi?"</em></p>
      <br>
      <p><strong>Contoh pelanggaran:</strong></p>
      <ul>
        <li>Nilai mahasiswa diubah tanpa izin dosen</li>
        <li>Harga produk di database berubah tanpa persetujuan</li>
        <li>Data transaksi keuangan dimodifikasi</li>
        <li>File laporan diubah setelah ditandatangani</li>
      </ul>
      <br>
      <p><strong>Cara melindungi:</strong></p>
      <ul>
        <li>Audit Trail — pencatatan setiap perubahan</li>
        <li>Hashing — verifikasi keutuhan data</li>
        <li>Digital Signature</li>
        <li>Access Control yang ketat</li>
        <li>Validasi perubahan dengan persetujuan</li>
        <li>Backup data berkala</li>
      </ul>
    `
  },
  A: {
    title: '⚡ AVAILABILITY — Ketersediaan',
    color: 'var(--orange-cia)',
    content: `
      <p><strong>Definisi:</strong> Availability memastikan bahwa sistem, layanan, dan data selalu tersedia dan dapat diakses oleh pengguna yang berwenang ketika dibutuhkan.</p>
      <br>
      <p><strong>Pertanyaan kunci:</strong> <em>"Apakah sistem dapat digunakan ketika dibutuhkan?"</em></p>
      <br>
      <p><strong>Contoh pelanggaran:</strong></p>
      <ul>
        <li>Website kampus tidak dapat diakses saat KRS</li>
        <li>Server toko online down saat flash sale</li>
        <li>Sistem ATM tidak berfungsi saat dibutuhkan</li>
        <li>Serangan DDoS yang melumpuhkan layanan</li>
      </ul>
      <br>
      <p><strong>Cara melindungi:</strong></p>
      <ul>
        <li>Backup data berkala</li>
        <li>Redundancy — server cadangan</li>
        <li>Monitoring sistem 24/7</li>
        <li>Maintenance dan pembaruan rutin</li>
        <li>Disaster Recovery Plan (DRP)</li>
        <li>Load balancing untuk distribusi beban</li>
      </ul>
    `
  }
};

const ACCESS_DATA = {
  mahasiswa: [
    { resource: '👤 Profil Sendiri', icon: '👤', level: 'VIEW', cls: 'level-view' },
    { resource: '📊 Nilai Sendiri', icon: '📊', level: 'VIEW', cls: 'level-view' },
    { resource: '📊 Nilai Mahasiswa Lain', icon: '📊', level: 'DENIED', cls: 'level-denied' },
    { resource: '🗄️ Database', icon: '🗄️', level: 'DENIED', cls: 'level-denied' },
    { resource: '⚙️ Pengaturan Sistem', icon: '⚙️', level: 'DENIED', cls: 'level-denied' },
    { resource: '📋 Audit Log', icon: '📋', level: 'DENIED', cls: 'level-denied' }
  ],
  dosen: [
    { resource: '👤 Profil Sendiri', icon: '👤', level: 'VIEW', cls: 'level-view' },
    { resource: '📊 Nilai Mata Kuliah', icon: '📊', level: 'VIEW / UPDATE', cls: 'level-update' },
    { resource: '📊 Nilai Mata Kuliah Lain', icon: '📊', level: 'DENIED', cls: 'level-denied' },
    { resource: '🗄️ Database', icon: '🗄️', level: 'LIMITED', cls: 'level-limited' },
    { resource: '⚙️ Pengaturan Sistem', icon: '⚙️', level: 'DENIED', cls: 'level-denied' },
    { resource: '📋 Audit Log', icon: '📋', level: 'LIMITED', cls: 'level-limited' }
  ],
  admin: [
    { resource: '👤 Profil Pengguna', icon: '👤', level: 'MANAGE', cls: 'level-manage' },
    { resource: '📊 Nilai (sesuai kewenangan)', icon: '📊', level: 'MANAGE', cls: 'level-manage' },
    { resource: '🗄️ Database', icon: '🗄️', level: 'MANAGE', cls: 'level-manage' },
    { resource: '⚙️ Pengaturan Sistem', icon: '⚙️', level: 'MANAGE', cls: 'level-manage' },
    { resource: '📋 Audit Log', icon: '📋', level: 'VIEW / MANAGE', cls: 'level-manage' },
    { resource: '👥 Manajemen Akun', icon: '👥', level: 'MANAGE', cls: 'level-manage' }
  ]
};

const LOGIN_PERMS = {
  mahasiswa: [
    { label: 'Melihat profil sendiri', allowed: true },
    { label: 'Melihat nilai sendiri', allowed: true },
    { label: 'Mengubah nilai mahasiswa lain', allowed: false },
    { label: 'Mengakses database sistem', allowed: false }
  ],
  dosen: [
    { label: 'Melihat profil sendiri', allowed: true },
    { label: 'Menginput nilai mata kuliah', allowed: true },
    { label: 'Melihat daftar mahasiswa', allowed: true },
    { label: 'Mengubah pengaturan sistem', allowed: false }
  ],
  admin: [
    { label: 'Mengelola akun pengguna', allowed: true },
    { label: 'Mengakses database sistem', allowed: true },
    { label: 'Melihat audit log', allowed: true },
    { label: 'Mengatur konfigurasi sistem', allowed: true }
  ]
};

const CASE_QUESTIONS = [
  {
    scenario: 'Password akun administrator diketahui oleh orang yang tidak berwenang.',
    answer: 'C',
    explanation: 'Password merupakan informasi/kredensial yang harus dilindungi dari akses pihak yang tidak berwenang. Kebocoran password adalah pelanggaran <strong>Confidentiality</strong>.',
    hint: 'Perhatikan kata kunci: "diketahui orang yang tidak berwenang"'
  },
  {
    scenario: 'Nilai mahasiswa berubah tanpa izin dari dosen yang bersangkutan.',
    answer: 'I',
    explanation: 'Perubahan data tanpa izin merupakan pelanggaran <strong>Integrity</strong>. Data nilai seharusnya akurat dan hanya dapat diubah oleh pihak yang berwenang.',
    hint: 'Perhatikan kata kunci: "berubah tanpa izin"'
  },
  {
    scenario: 'Website kampus tidak dapat diakses oleh mahasiswa selama beberapa jam.',
    answer: 'A',
    explanation: 'Ketidakmampuan pengguna untuk mengakses sistem ketika dibutuhkan adalah pelanggaran <strong>Availability</strong>.',
    hint: 'Perhatikan kata kunci: "tidak dapat diakses"'
  },
  {
    scenario: 'Data pribadi pelanggan bocor dan tersebar di forum internet.',
    answer: 'C',
    explanation: 'Kebocoran data pribadi ke pihak yang tidak berwenang adalah pelanggaran <strong>Confidentiality</strong>. Data pelanggan seharusnya hanya dapat diakses pihak yang berhak.',
    hint: 'Perhatikan kata kunci: "bocor dan tersebar"'
  },
  {
    scenario: 'Harga produk di sistem e-commerce berubah secara tidak wajar tanpa persetujuan.',
    answer: 'I',
    explanation: 'Perubahan data harga tanpa otorisasi adalah pelanggaran <strong>Integrity</strong>. Data harga harus akurat dan hanya dapat diubah oleh pihak yang berwenang.',
    hint: 'Perhatikan kata kunci: "berubah tanpa persetujuan"'
  },
  {
    scenario: 'Server toko online mengalami gangguan dan tidak dapat digunakan selama beberapa jam.',
    answer: 'A',
    explanation: 'Server yang tidak dapat digunakan berarti layanan tidak tersedia, yang merupakan pelanggaran <strong>Availability</strong>.',
    hint: 'Perhatikan kata kunci: "tidak dapat digunakan"'
  },
  {
    scenario: 'Mahasiswa A dapat melihat nilai mahasiswa B tanpa izin.',
    answer: 'C',
    explanation: 'Nilai mahasiswa adalah data yang bersifat pribadi dan rahasia. Akses oleh pihak yang tidak berwenang merupakan pelanggaran <strong>Confidentiality</strong>.',
    hint: 'Perhatikan kata kunci: "melihat tanpa izin"'
  },
  {
    scenario: 'Database sistem keuangan mengalami perubahan data tanpa otorisasi dari pihak yang berwenang.',
    answer: 'I',
    explanation: 'Perubahan data keuangan tanpa otorisasi adalah pelanggaran <strong>Integrity</strong>. Data keuangan harus akurat dan dilindungi dari manipulasi.',
    hint: 'Perhatikan kata kunci: "perubahan data tanpa otorisasi"'
  }
];

const FINAL_QUIZ = [
  {
    q: 'Apa kepanjangan dari CIA dalam konteks CIA Triad keamanan siber?',
    opts: ['Critical Information Architecture', 'Confidentiality, Integrity, Availability', 'Cybersecurity Intelligence Agency', 'Control, Integrity, Access'],
    ans: 1,
    exp: 'CIA Triad adalah singkatan dari <strong>Confidentiality (Kerahasiaan), Integrity (Integritas), dan Availability (Ketersediaan)</strong> — tiga pilar utama keamanan informasi.'
  },
  {
    q: 'Pertanyaan "Siapa yang boleh melihat data ini?" berkaitan dengan elemen CIA Triad yang mana?',
    opts: ['Availability', 'Integrity', 'Confidentiality', 'Authentication'],
    ans: 2,
    exp: '<strong>Confidentiality</strong> berkaitan dengan pembatasan akses — hanya pihak yang berwenang yang boleh melihat data tersebut.'
  },
  {
    q: 'Nilai mahasiswa berubah tanpa izin dosen. Elemen CIA Triad apa yang terganggu?',
    opts: ['Confidentiality', 'Availability', 'Authentication', 'Integrity'],
    ans: 3,
    exp: '<strong>Integrity</strong> terganggu karena data (nilai) berubah tanpa otorisasi yang sah. Data harus tetap akurat dan tidak boleh dimanipulasi.'
  },
  {
    q: 'Data yang sedang dikirim melalui jaringan internet disebut?',
    opts: ['Data at Rest', 'Data in Transit', 'Data in Use', 'Data in Storage'],
    ans: 1,
    exp: '<strong>Data in Transit</strong> adalah data yang sedang berpindah melalui jaringan komunikasi, seperti internet atau intranet.'
  },
  {
    q: 'Proses "Siapa kamu?" dalam sistem keamanan disebut?',
    opts: ['Authorization', 'Access Control', 'Authentication', 'Audit Trail'],
    ans: 2,
    exp: '<strong>Authentication (Autentikasi)</strong> adalah proses verifikasi identitas pengguna sebelum akses diberikan, seperti username + password.'
  },
  {
    q: 'Prinsip yang menyatakan pengguna hanya diberi hak akses minimum yang diperlukan disebut?',
    opts: ['Audit Trail', 'Least Privilege', 'Authorization', 'Access Matrix'],
    ans: 1,
    exp: '<strong>Least Privilege</strong> adalah prinsip memberikan hak akses minimum yang dibutuhkan untuk menjalankan tugas — tidak lebih dari itu.'
  },
  {
    q: 'Serangan DDoS yang melumpuhkan website selama beberapa jam merupakan ancaman terhadap?',
    opts: ['Confidentiality', 'Integrity', 'Availability', 'Authentication'],
    ans: 2,
    exp: 'Serangan DDoS yang membuat website tidak dapat diakses merupakan ancaman terhadap <strong>Availability</strong> — ketersediaan sistem.'
  },
  {
    q: 'Audit Trail berfungsi untuk?',
    opts: ['Memastikan ketersediaan sistem 24 jam', 'Mencatat setiap aktivitas sistem untuk penelusuran', 'Mengenkripsi data saat transit', 'Membatasi akses pengguna'],
    ans: 1,
    exp: '<strong>Audit Trail</strong> adalah catatan aktivitas sistem yang memungkinkan penelusuran siapa yang melakukan apa, kapan, dan datanya apa. Ini berkaitan dengan Integrity.'
  },
  {
    q: 'Data nilai yang tersimpan di server kampus dan tidak sedang diproses disebut?',
    opts: ['Data in Transit', 'Data in Use', 'Data in Process', 'Data at Rest'],
    ans: 3,
    exp: '<strong>Data at Rest</strong> adalah data yang tersimpan dalam media penyimpanan dan tidak sedang berpindah atau diproses.'
  },
  {
    q: 'Penggunaan password kuat + OTP dalam satu proses login merupakan contoh dari?',
    opts: ['Access Control', 'Audit Trail', 'Multi-Factor Authentication (MFA)', 'Least Privilege'],
    ans: 2,
    exp: '<strong>Multi-Factor Authentication (MFA)</strong> adalah penggunaan lebih dari satu faktor autentikasi, seperti password (yang kamu tahu) + OTP (yang kamu miliki).'
  }
];

const DISCUSSION_QUESTIONS = [
  {
    num: '01',
    q: 'Jika harus memilih, mana yang lebih berbahaya: data bocor, data dimanipulasi, atau sistem tidak dapat digunakan? Jelaskan berdasarkan konteksnya!'
  },
  {
    num: '02',
    q: 'Apakah password yang kuat saja sudah cukup untuk menjamin keamanan sebuah sistem? Mengapa ya atau mengapa tidak?'
  },
  {
    num: '03',
    q: 'Jika mahasiswa dapat melihat nilai mahasiswa lain tetapi tidak dapat mengubahnya, apakah ini masih merupakan masalah keamanan? Jelaskan!'
  },
  {
    num: '04',
    q: 'Jika data sepenuhnya aman tetapi website tidak dapat digunakan selama satu hari penuh, apakah sistem tersebut dapat dikatakan aman?'
  }
];

const KAMPUS_QA = [
  {
    q: 'Apa masalah Confidentiality dalam kasus ini?',
    hint: 'Perhatikan kejadian pertama dan kedua — apa yang seharusnya bersifat rahasia?',
    pembahasan: 'Masalah Confidentiality: Password akun dosen diketahui oleh orang lain. Password adalah informasi rahasia yang seharusnya hanya diketahui oleh pemiliknya. Kebocoran password memungkinkan orang tidak berwenang untuk menyamar sebagai dosen.'
  },
  {
    q: 'Apa masalah Integrity dalam kasus ini?',
    hint: 'Perhatikan kejadian ketiga — apa yang berubah dan apakah perubahan itu sah?',
    pembahasan: 'Masalah Integrity: Nilai mahasiswa diubah tanpa izin. Nilai adalah data yang harus akurat dan hanya boleh diubah oleh dosen yang berwenang melalui proses yang sah. Perubahan tanpa otorisasi adalah pelanggaran integritas.'
  },
  {
    q: 'Apa masalah Availability dalam kasus ini?',
    hint: 'Perhatikan kejadian keempat — apa yang tidak bisa dilakukan pengguna?',
    pembahasan: 'Masalah Availability: Sistem akademik tidak dapat diakses selama 4 jam. Ini berarti mahasiswa dan dosen tidak dapat menggunakan sistem ketika dibutuhkan, yang merupakan gangguan terhadap ketersediaan sistem.'
  },
  {
    q: 'Apa kemungkinan penyebab kejadian ini?',
    hint: 'Mengapa password dosen bisa diketahui orang lain? Teknik apa yang mungkin digunakan?',
    pembahasan: 'Kemungkinan penyebab: (1) Phishing — dosen tertipu memberikan passwordnya, (2) Password yang lemah dan mudah ditebak, (3) Tidak menggunakan MFA, (4) Password diberikan kepada orang lain, (5) Keylogger di komputer dosen.'
  },
  {
    q: 'Apa dampak dari kejadian ini?',
    hint: 'Siapa saja yang terdampak? Apa kerugiannya?',
    pembahasan: 'Dampak: (1) Nilai mahasiswa tidak valid — dapat mempengaruhi kelulusan, (2) Kepercayaan terhadap sistem akademik menurun, (3) Proses akademik terganggu, (4) Diperlukan audit dan perbaikan data, (5) Reputasi institusi terdampak.'
  },
  {
    q: 'Bagaimana cara mencegah kejadian serupa?',
    hint: 'Kaitkan dengan perlindungan CIA: password, MFA, audit trail, monitoring...',
    pembahasan: 'Pencegahan: (1) Terapkan MFA untuk semua akun dosen, (2) Wajibkan password yang kuat dan rutin diganti, (3) Aktifkan Audit Trail yang lengkap, (4) Edukasi phishing kepada seluruh civitas akademika, (5) Monitoring aktivitas login yang mencurigakan, (6) Terapkan Least Privilege dengan ketat.'
  }
];

// ============================================
// STATE
// ============================================
let progressVisited = new Set();
const TOTAL_SECTIONS = 18;

let selectedCaseIdx = 0;
let caseAnswered = false;
let caseScore = 0;

let selectedMatchCase = null;
let matchState = { 1: null, 2: null, 3: null };
const MATCH_ANSWERS = { 1: 'C', 2: 'I', 3: 'A' };

let finalQuizCurrent = 0;
let finalQuizScore = 0;
let finalQuizAnswered = false;

let currentUser = null;

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  initNavigation();
  initHamburger();
  renderCaseSimulation();
  renderFinalQuiz();
  renderDiscussion();
  renderKampusAccordion();
  setupScrollSpy();
  setupProgressReset();
});

// ============================================
// PROGRESS
// ============================================
function loadProgress() {
  try {
    const saved = localStorage.getItem('cia_progress_v2');
    if (saved) {
      const arr = JSON.parse(saved);
      progressVisited = new Set(arr);
    }
  } catch (e) { progressVisited = new Set(); }
  updateProgressBar();
  updateNavDots();
}

function saveProgress() {
  try {
    localStorage.setItem('cia_progress_v2', JSON.stringify([...progressVisited]));
  } catch (e) {}
}

function markVisited(sectionId) {
  if (!progressVisited.has(sectionId)) {
    progressVisited.add(sectionId);
    saveProgress();
    updateProgressBar();
    updateNavDots();
  }
}

function updateProgressBar() {
  const pct = Math.round((progressVisited.size / TOTAL_SECTIONS) * 100);
  const fill = document.getElementById('progressBarFill');
  const label = document.getElementById('progressPercent');
  const track = document.getElementById('progressBarTrack');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = pct + '%';
  if (track) track.setAttribute('aria-valuenow', pct);
}

function updateNavDots() {
  document.querySelectorAll('.nav-item').forEach(item => {
    const sec = item.getAttribute('data-section');
    if (sec && progressVisited.has(sec)) {
      item.classList.add('visited');
    }
  });
}

function setupProgressReset() {
  const btn = document.getElementById('btnResetProgress');
  if (btn) {
    btn.addEventListener('click', () => {
      if (confirm('Reset semua progress? Data kuis dan latihan akan direset.')) {
        progressVisited.clear();
        saveProgress();
        updateProgressBar();
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('visited'));
        // Reset quiz state
        resetCaseSim();
        resetFinalQuiz();
        resetMatch();
      }
    });
  }
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sec = item.getAttribute('data-section');
      if (sec) scrollToSection(sec);
      // Close sidebar on mobile
      if (window.innerWidth < 768) closeSidebar();
    });
  });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    markVisited(id);
  }
}

function setupScrollSpy() {
  const sections = document.querySelectorAll('.section[id], [id="authorization"]');
  const navItems = document.querySelectorAll('.nav-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('data-section') === id) {
            item.classList.add('active');
          }
        });
        markVisited(id);
      }
    });
  }, { threshold: 0.2, rootMargin: '-60px 0px -30% 0px' });

  document.querySelectorAll('section[id]').forEach(sec => observer.observe(sec));
}

// ============================================
// HAMBURGER / SIDEBAR
// ============================================
function initHamburger() {
  const btn = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (btn && sidebar && overlay) {
    btn.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('active', isOpen);
      btn.setAttribute('aria-expanded', isOpen);
    });
    overlay.addEventListener('click', closeSidebar);
  }
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const btn = document.getElementById('hamburgerBtn');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

// ============================================
// CIA MODAL
// ============================================
function openCIAModal(type) {
  const data = CIA_MODAL_DATA[type];
  if (!data) return;
  const modal = document.getElementById('ciaModal');
  const title = document.getElementById('ciaModalTitle');
  const content = document.getElementById('ciaModalContent');
  title.textContent = data.title;
  title.style.color = data.color;
  content.innerHTML = data.content;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCIAModal() {
  const modal = document.getElementById('ciaModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function closeCIAModalOnOverlay(e) {
  if (e.target === document.getElementById('ciaModal')) closeCIAModal();
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCIAModal();
});

// ============================================
// DATA LIFECYCLE TOGGLE
// ============================================
function toggleLifecycle(el) {
  const wasActive = el.classList.contains('active');
  document.querySelectorAll('.lifecycle-item').forEach(i => {
    i.classList.remove('active');
    i.setAttribute('aria-expanded', 'false');
  });
  if (!wasActive) {
    el.classList.add('active');
    el.setAttribute('aria-expanded', 'true');
  }
}

// ============================================
// LOGIN SIMULATION
// ============================================
function simulateLogin() {
  const user = document.getElementById('loginUser').value;
  const pass = document.getElementById('loginPass').value.trim();
  const result = document.getElementById('loginResult');

  if (!pass) {
    result.innerHTML = `<div class="feedback-box wrong show"><div class="feedback-title">✗ Login Gagal</div>Password tidak boleh kosong.</div>`;
    result.classList.add('show');
    return;
  }

  const perms = LOGIN_PERMS[user] || [];
  const permHTML = perms.map(p => `
    <li class="${p.allowed ? 'allowed' : 'denied'}">
      <span class="perm-icon"></span>${p.label}
    </li>
  `).join('');

  result.innerHTML = `
    <div class="auth-step authn">
      <div class="auth-step-header">
        <span class="auth-step-icon">🔑</span>
        <span class="auth-step-name">AUTHENTICATION (Autentikasi)</span>
      </div>
      <div class="auth-step-status">✓ Identitas berhasil diverifikasi — User: <strong>${user}</strong></div>
    </div>
    <div class="auth-step authz">
      <div class="auth-step-header">
        <span class="auth-step-icon">🔓</span>
        <span class="auth-step-name">AUTHORIZATION (Otorisasi)</span>
      </div>
      <div class="auth-step-status" style="margin-bottom:8px">Hak akses diberikan berdasarkan role <strong>${user.toUpperCase()}</strong>:</div>
      <ul class="perm-list">${permHTML}</ul>
    </div>
  `;
  result.classList.add('show');
}

// ============================================
// ACCESS CONTROL SIMULATION
// ============================================
function selectUser(user) {
  currentUser = user;
  document.querySelectorAll('.user-btn').forEach(btn => {
    btn.classList.remove('selected');
    btn.setAttribute('aria-pressed', 'false');
  });
  const btn = document.getElementById(`userBtn-${user}`);
  if (btn) {
    btn.classList.add('selected');
    btn.setAttribute('aria-pressed', 'true');
  }

  const data = ACCESS_DATA[user] || [];
  const matrix = document.getElementById('accessMatrix');
  const rows = document.getElementById('accessMatrixRows');

  const header = matrix.querySelector('.access-matrix-header');
  header.textContent = `Hak Akses — Role: ${user.toUpperCase()}`;

  rows.innerHTML = data.map(item => `
    <div class="access-row">
      <div class="access-resource">
        <span class="access-resource-icon" aria-hidden="true">${item.icon}</span>
        ${item.resource}
      </div>
      <span class="access-level ${item.cls}">${item.level}</span>
    </div>
  `).join('');
}

// ============================================
// CASE SIMULATION (Interactive CIA Quiz)
// ============================================
function renderCaseSimulation() {
  selectedCaseIdx = 0;
  caseAnswered = false;
  caseScore = 0;
  renderCaseQuestion();
}

function renderCaseQuestion() {
  const container = document.getElementById('caseSimContainer');
  if (!container) return;

  if (selectedCaseIdx >= CASE_QUESTIONS.length) {
    renderCaseResult();
    return;
  }

  const q = CASE_QUESTIONS[selectedCaseIdx];
  const pct = Math.round((selectedCaseIdx / CASE_QUESTIONS.length) * 100);

  container.innerHTML = `
    <div class="quiz-counter">
      <span class="quiz-progress-text">Kasus ${selectedCaseIdx + 1} / ${CASE_QUESTIONS.length}</span>
      <span class="quiz-score-live">Skor: ${caseScore} / ${selectedCaseIdx}</span>
    </div>
    <div class="quiz-progress-track"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
    <div class="case-card">
      <div class="case-number">KASUS ${String(selectedCaseIdx + 1).padStart(2,'0')}</div>
      <div class="case-scenario">${q.scenario}</div>
      <div class="options-grid">
        <button class="option-btn" id="optC" onclick="answerCase('C')" aria-label="Pilihan A: Confidentiality">
          <span class="option-key">A</span>🔒 Confidentiality (Kerahasiaan)
        </button>
        <button class="option-btn" id="optI" onclick="answerCase('I')" aria-label="Pilihan B: Integrity">
          <span class="option-key">B</span>✅ Integrity (Integritas)
        </button>
        <button class="option-btn" id="optA" onclick="answerCase('A')" aria-label="Pilihan C: Availability">
          <span class="option-key">C</span>⚡ Availability (Ketersediaan)
        </button>
      </div>
      <div class="feedback-box" id="caseFeedback"></div>
    </div>
    <div class="next-btn-wrap" id="nextBtnWrap" style="display:none">
      <button class="btn-primary" onclick="nextCase()">
        ${selectedCaseIdx + 1 < CASE_QUESTIONS.length ? 'Kasus Berikutnya →' : 'Lihat Hasil'}
      </button>
    </div>
  `;
  caseAnswered = false;
}

function answerCase(choice) {
  if (caseAnswered) return;
  caseAnswered = true;
  const q = CASE_QUESTIONS[selectedCaseIdx];
  const isCorrect = choice === q.answer;
  if (isCorrect) caseScore++;

  const map = { C: 'optC', I: 'optI', A: 'optA' };
  ['C', 'I', 'A'].forEach(c => {
    const btn = document.getElementById(map[c]);
    if (!btn) return;
    btn.disabled = true;
    if (c === q.answer) btn.classList.add('correct');
    else if (c === choice && !isCorrect) btn.classList.add('wrong');
  });

  const feedback = document.getElementById('caseFeedback');
  feedback.className = `feedback-box show ${isCorrect ? 'correct' : 'wrong'}`;
  feedback.innerHTML = `
    <div class="feedback-title">${isCorrect ? '✓ BENAR!' : '✗ BELUM TEPAT'}</div>
    <div>${q.explanation}</div>
    ${!isCorrect ? `<div style="margin-top:8px;font-size:12px;color:var(--text-muted)">💡 Petunjuk: ${q.hint}</div>` : ''}
  `;

  const nextWrap = document.getElementById('nextBtnWrap');
  if (nextWrap) nextWrap.style.display = 'flex';
}

function nextCase() {
  selectedCaseIdx++;
  renderCaseQuestion();
}

function renderCaseResult() {
  const container = document.getElementById('caseSimContainer');
  const pct = Math.round((caseScore / CASE_QUESTIONS.length) * 100);
  container.innerHTML = `
    <div class="quiz-result-screen">
      <div class="result-score-circle">
        <div class="result-score-num">${caseScore}/${CASE_QUESTIONS.length}</div>
        <div class="result-score-label">SKOR</div>
      </div>
      <div class="result-category ${pct >= 75 ? 'sangat-baik' : pct >= 50 ? 'baik' : 'cukup'}">${pct}%</div>
      <p class="result-message">${
        pct === 100 ? 'Sempurna! Kamu benar-benar memahami CIA Triad! 🎉' :
        pct >= 75 ? 'Bagus sekali! Pemahaman CIA Triad kamu sudah kuat.' :
        pct >= 50 ? 'Cukup baik. Pelajari kembali beberapa konsep CIA Triad.' :
        'Pelajari kembali materi CIA Triad dan coba lagi.'
      }</p>
      <button class="btn-primary" onclick="resetCaseSim()">↺ Ulangi Latihan</button>
    </div>
  `;
}

function resetCaseSim() {
  selectedCaseIdx = 0;
  caseAnswered = false;
  caseScore = 0;
  renderCaseQuestion();
}

// ============================================
// TOKO ONLINE MATCHING
// ============================================
function selectMatchCase(num) {
  const matched = matchState[num];
  if (matched !== null) return; // already matched

  selectedMatchCase = num;
  [1, 2, 3].forEach(i => {
    const el = document.getElementById(`matchCase-${i}`);
    if (el && matchState[i] === null) {
      el.classList.toggle('selected', i === num);
    }
  });
}

function doMatch(cia) {
  if (selectedMatchCase === null) {
    // flash the cases
    document.querySelectorAll('.match-case').forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight;
      el.style.animation = '';
    });
    return;
  }

  const caseNum = selectedMatchCase;
  const isCorrect = MATCH_ANSWERS[caseNum] === cia;
  matchState[caseNum] = cia;
  selectedMatchCase = null;

  const caseEl = document.getElementById(`matchCase-${caseNum}`);
  if (caseEl) {
    caseEl.classList.remove('selected');
    caseEl.classList.add('matched');
  }

  const targetEl = document.getElementById(`matchTarget-${cia}`);
  if (targetEl) {
    targetEl.classList.add(isCorrect ? 'matched-correct' : 'matched-wrong');
  }

  // Clear selection from cases
  [1, 2, 3].forEach(i => {
    const el = document.getElementById(`matchCase-${i}`);
    if (el) el.classList.remove('selected');
  });

  // Check if all matched
  const allDone = Object.values(matchState).every(v => v !== null);
  if (allDone) {
    const correctCount = Object.entries(MATCH_ANSWERS).filter(([k, v]) => matchState[k] === v).length;
    const resultBox = document.getElementById('matchResultBox');
    resultBox.classList.add('show');
    resultBox.innerHTML = `
      <div style="font-size:14px;font-weight:700;color:${correctCount === 3 ? 'var(--success)' : 'var(--warning)'};margin-bottom:12px">
        ${correctCount === 3 ? '✓ Semua jawaban benar!' : `${correctCount}/3 jawaban benar`}
      </div>
      <div style="font-size:13px;color:var(--text-secondary);line-height:1.7">
        <strong>Pembahasan:</strong><br>
        🔒 <span style="color:var(--blue-cia)">Data pelanggan bocor</span> → Confidentiality — kebocoran data kepada pihak tidak berwenang.<br>
        ✅ <span style="color:var(--green-cia)">Harga produk berubah</span> → Integrity — perubahan data tanpa otorisasi.<br>
        ⚡ <span style="color:var(--orange-cia)">Website tidak dapat diakses</span> → Availability — sistem tidak tersedia ketika dibutuhkan.
      </div>
    `;
  }
}

function resetMatch() {
  selectedMatchCase = null;
  matchState = { 1: null, 2: null, 3: null };
  [1, 2, 3].forEach(i => {
    const el = document.getElementById(`matchCase-${i}`);
    if (el) el.className = 'match-case';
  });
  ['C', 'I', 'A'].forEach(c => {
    const el = document.getElementById(`matchTarget-${c}`);
    if (el) {
      el.classList.remove('matched-correct', 'matched-wrong', 'selected');
    }
  });
  const resultBox = document.getElementById('matchResultBox');
  if (resultBox) resultBox.classList.remove('show');
}

// ============================================
// KAMPUS ACCORDION
// ============================================
function renderKampusAccordion() {
  const container = document.getElementById('kampusAccordion');
  if (!container) return;

  container.innerHTML = KAMPUS_QA.map((item, i) => `
    <div class="question-accordion">
      <div class="q-header" id="qHeader-${i}" onclick="toggleAccordion(${i})" tabindex="0" 
           aria-expanded="false" aria-controls="qBody-${i}"
           onkeydown="if(event.key==='Enter')toggleAccordion(${i})">
        <span>${i + 1}. ${item.q}</span>
        <span class="q-chevron">▼</span>
      </div>
      <div class="q-body" id="qBody-${i}" role="region" aria-labelledby="qHeader-${i}">
        <div class="warning-box" id="qHint-${i}" style="display:none;margin-bottom:10px">
          <span class="warning-icon">💡</span>
          <div><strong>Petunjuk:</strong> ${item.hint}</div>
        </div>
        <div id="qPembahasan-${i}" style="display:none">
          <strong style="color:var(--cyan)">Pembahasan:</strong><br>
          <p style="margin-top:8px">${item.pembahasan}</p>
        </div>
        <div id="qEmpty-${i}" style="color:var(--text-muted);font-size:12px;font-style:italic">
          Coba jawab terlebih dahulu sebelum melihat petunjuk atau pembahasan.
        </div>
      </div>
    </div>
  `).join('');
}

function toggleAccordion(i) {
  const header = document.getElementById(`qHeader-${i}`);
  const body = document.getElementById(`qBody-${i}`);
  const isOpen = body.classList.toggle('open');
  header.classList.toggle('open', isOpen);
  header.setAttribute('aria-expanded', isOpen);
}

function revealAllKampus(type) {
  KAMPUS_QA.forEach((_, i) => {
    const body = document.getElementById(`qBody-${i}`);
    const header = document.getElementById(`qHeader-${i}`);
    if (!body.classList.contains('open')) {
      body.classList.add('open');
      header.classList.add('open');
      header.setAttribute('aria-expanded', 'true');
    }
    const hint = document.getElementById(`qHint-${i}`);
    const pembahasan = document.getElementById(`qPembahasan-${i}`);
    const empty = document.getElementById(`qEmpty-${i}`);

    if (type === 'hint' && hint) {
      hint.style.display = 'flex';
      if (empty) empty.style.display = 'none';
    }
    if (type === 'pembahasan' && pembahasan) {
      pembahasan.style.display = 'block';
      if (hint) hint.style.display = 'none';
      if (empty) empty.style.display = 'none';
    }
  });
}

// ============================================
// DISCUSSION
// ============================================
function renderDiscussion() {
  const container = document.getElementById('discussionGrid');
  if (!container) return;

  container.innerHTML = DISCUSSION_QUESTIONS.map(item => `
    <div class="discussion-card">
      <div class="discussion-num">PERTANYAAN ${item.num}</div>
      <div class="discussion-question">${item.q}</div>
    </div>
  `).join('');
}

function startDiscussion() {
  const btn = document.getElementById('btnMulaiDiskusi');
  if (btn) {
    btn.textContent = '✅ Diskusi Dimulai!';
    btn.style.background = 'linear-gradient(135deg, var(--success), #15803d)';
    setTimeout(() => {
      btn.textContent = '💬 MULAI DISKUSI';
      btn.style.background = '';
    }, 3000);
  }
}

// ============================================
// FINAL QUIZ
// ============================================
function renderFinalQuiz() {
  finalQuizCurrent = 0;
  finalQuizScore = 0;
  finalQuizAnswered = false;
  renderFinalQuestion();
}

function renderFinalQuestion() {
  const container = document.getElementById('finalQuizContainer');
  if (!container) return;

  if (finalQuizCurrent >= FINAL_QUIZ.length) {
    renderFinalResult();
    return;
  }

  const q = FINAL_QUIZ[finalQuizCurrent];
  const pct = Math.round((finalQuizCurrent / FINAL_QUIZ.length) * 100);
  const optKeys = ['A', 'B', 'C', 'D'];

  const optsHTML = q.opts.map((opt, i) => `
    <button class="quiz-option" id="qOpt-${i}" onclick="answerFinal(${i})" aria-label="Pilihan ${optKeys[i]}: ${opt}">
      <span class="quiz-opt-key">${optKeys[i]}</span>${opt}
    </button>
  `).join('');

  container.innerHTML = `
    <div class="quiz-counter">
      <span class="quiz-progress-text">Soal ${finalQuizCurrent + 1} / ${FINAL_QUIZ.length}</span>
      <span class="quiz-score-live">Skor: ${finalQuizScore}</span>
    </div>
    <div class="quiz-progress-track"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
    <div class="quiz-card">
      <div class="quiz-question-text">${q.q}</div>
      <div class="quiz-options">${optsHTML}</div>
      <div class="quiz-feedback" id="quizFeedback"></div>
      <div class="quiz-nav" id="quizNav" style="display:none">
        <span></span>
        <button class="btn-primary" onclick="nextFinalQuestion()">
          ${finalQuizCurrent + 1 < FINAL_QUIZ.length ? 'Soal Berikutnya →' : '🏁 Lihat Hasil'}
        </button>
      </div>
    </div>
  `;
  finalQuizAnswered = false;
}

function answerFinal(idx) {
  if (finalQuizAnswered) return;
  finalQuizAnswered = true;
  const q = FINAL_QUIZ[finalQuizCurrent];
  const isCorrect = idx === q.ans;
  if (isCorrect) finalQuizScore++;

  for (let i = 0; i < q.opts.length; i++) {
    const btn = document.getElementById(`qOpt-${i}`);
    if (!btn) continue;
    btn.disabled = true;
    if (i === q.ans) btn.classList.add('correct-ans');
    else if (i === idx && !isCorrect) btn.classList.add('wrong-ans');
  }

  const fb = document.getElementById('quizFeedback');
  fb.className = `quiz-feedback show ${isCorrect ? 'ok' : 'no'}`;
  fb.innerHTML = `<strong>${isCorrect ? '✓ Benar!' : '✗ Belum tepat'}</strong><br>${q.exp}`;

  const nav = document.getElementById('quizNav');
  if (nav) nav.style.display = 'flex';
}

function nextFinalQuestion() {
  finalQuizCurrent++;
  renderFinalQuestion();
}

function renderFinalResult() {
  const container = document.getElementById('finalQuizContainer');
  const pct = Math.round((finalQuizScore / FINAL_QUIZ.length) * 100);
  let cat, catClass, msg;

  if (pct >= 90) {
    cat = 'Sangat Baik'; catClass = 'sangat-baik'; msg = 'Luar biasa! Penguasaan materi Anda sangat baik. 🎉';
  } else if (pct >= 75) {
    cat = 'Baik'; catClass = 'baik'; msg = 'Bagus! Pemahaman Anda terhadap CIA Triad sudah baik.';
  } else if (pct >= 60) {
    cat = 'Cukup'; catClass = 'cukup'; msg = 'Cukup baik. Pelajari kembali beberapa bagian materi.';
  } else {
    cat = 'Perlu Belajar Lagi'; catClass = 'perlu-belajar'; msg = 'Pelajari kembali seluruh materi sebelum mengulang kuis.';
  }

  container.innerHTML = `
    <div class="quiz-result-screen">
      <div class="result-score-circle">
        <div class="result-score-num">${pct}</div>
        <div class="result-score-label">/ 100</div>
      </div>
      <div class="result-category ${catClass}">${cat}</div>
      <p class="result-message">${finalQuizScore} dari ${FINAL_QUIZ.length} soal dijawab benar.<br>${msg}</p>
      <div class="flex-gap" style="justify-content:center">
        <button class="btn-primary" onclick="resetFinalQuiz()">↺ ULANGI KUIS</button>
        <button class="btn-secondary" onclick="scrollToSection('rangkuman')">📌 Lihat Rangkuman</button>
      </div>
    </div>
  `;
}

function resetFinalQuiz() {
  finalQuizCurrent = 0;
  finalQuizScore = 0;
  finalQuizAnswered = false;
  renderFinalQuestion();
}

// ============================================
// COPY TASK INSTRUCTIONS
// ============================================
function copyTaskInstructions() {
  const text = `TUGAS 1 — Ringkasan Konsep Dasar Keamanan Siber dan CIA Triad
Mata Kuliah: Cyber Security Management (BWP5030) | Pertemuan 3

INSTRUKSI:
Buat ringkasan minimal 2 halaman yang membahas:
1. Pengertian keamanan siber.
2. Tujuan keamanan siber.
3. Pentingnya perlindungan data.
4. Confidentiality (Kerahasiaan) — pengertian, contoh, cara perlindungan.
5. Integrity (Integritas) — pengertian, contoh, cara perlindungan.
6. Availability (Ketersediaan) — pengertian, contoh, cara perlindungan.
7. Contoh penerapan CIA Triad dalam kehidupan nyata (minimal 2 kasus).
8. Kesimpulan.

KETENTUAN:
- Individu (dikerjakan sendiri)
- Minimal 2 halaman
- Format: PDF
- Font: Times New Roman 12
- Spasi: 1,5
- Kertas: A4
- Minimal 2 referensi`;

  const btn = document.getElementById('btnCopyTask');
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = '✓ Berhasil Disalin!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = '📋 SALIN INSTRUKSI TUGAS';
        btn.classList.remove('copied');
      }, 2500);
    }).catch(() => fallbackCopy(text, btn));
  } else {
    fallbackCopy(text, btn);
  }
}

function fallbackCopy(text, btn) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    btn.textContent = '✓ Berhasil Disalin!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = '📋 SALIN INSTRUKSI TUGAS';
      btn.classList.remove('copied');
    }, 2500);
  } catch (e) {
    btn.textContent = '⚠ Gagal, salin manual';
    setTimeout(() => { btn.innerHTML = '📋 SALIN INSTRUKSI TUGAS'; }, 2500);
  }
  document.body.removeChild(ta);
}
