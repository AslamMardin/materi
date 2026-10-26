/* ========================================================
   CYBER SECURITY MANAGEMENT - PERTEMUAN 4
   Standar, Regulasi, dan Tata Kelola Keamanan Siber
   script.js - Pure Vanilla JavaScript
   ======================================================== */

'use strict';

// ========================================================
// 1. DATA CONSTANTS & QUESTIONS
// ========================================================

const NIST_FUNCTIONS = {
  govern: {
    icon: '🏛️',
    title: 'GOVERN (Tata Kelola)',
    text: 'Menetapkan dan memantau strategi manajemen risiko keamanan siber, ekspektasi kebijakan, kepatuhan hukum, alokasi sumber daya, dan akuntabilitas peran dalam strategi bisnis organisasi.'
  },
  identify: {
    icon: '🔍',
    title: 'IDENTIFY (Identifikasi)',
    text: 'Memahami konteks organisasi, mendata seluruh aset fisik dan perangkat lunak, memetakan rantai pasok (supply chain), serta menilai kerentanan dan potensi dampak risiko siber.'
  },
  protect: {
    icon: '🛡️',
    title: 'PROTECT (Proteksi)',
    text: 'Menerapkan pengamanan untuk membatasi atau menahan dampak potensi insiden siber, seperti kontrol akses (IAM), enkripsi data, perlindungan jaringan, dan pelatihan kesadaran siber staf.'
  },
  detect: {
    icon: '📡',
    title: 'DETECT (Deteksi)',
    text: 'Menemukan dan menganalisis potensi anomali atau serangan siber secara cepat melalui pemantauan log (SIEM), audit sistem berkala, dan sensor deteksi intrusi (IDS/IPS).'
  },
  respond: {
    icon: '⚡',
    title: 'RESPOND (Respons)',
    text: 'Mengambil tindakan penanggulangan setelah insiden siber terdeteksi, meliputi mitigasi ancaman, analisis forensik, komunikasi internal/eksternal, serta pelaporan ke regulator.'
  },
  recover: {
    icon: '🔄',
    title: 'RECOVER (Pemulihan)',
    text: 'Memulihkan kemampuan atau layanan sistem yang terganggu akibat insiden siber secara aman, merestorasi backup data, serta mengevaluasi pelajaran berharga (lessons learned).'
  }
};

const SIAKAD_DATA = {
  kebijakan: {
    title: '📜 Kebijakan Tata Kelola SIAKAD',
    text: 'Hanya pihak berwenang dan terverifikasi yang memiliki izin mengubah data nilai dan kurikulum. Setiap modifikasi data nilai wajib memiliki persetujuan digital pimpinan program studi/dekanat dan tercatat permanen di sistem audit.'
  },
  peran: {
    title: '👥 Peran & Wewenang di SIAKAD',
    text: 'Dosen pengampu hanya dapat mengisi nilai pada mata kuliah yang ditugaskan. Staf administrasi mengelola administrasi berkas tanpa akses edit nilai langsung. Pimpinan fakultas memvalidasi kelulusan.'
  },
  akses: {
    title: '🔑 Manajemen Hak Akses (Least Privilege)',
    text: 'Mahasiswa hanya dapat melihat Kartu Hasil Studi (KHS) dan profil miliknya sendiri. Akses antar akun dipagari ketat dengan autentikasi berbasis sesi aman dan verifikasi identitas berlapis.'
  },
  monitoring: {
    title: '📡 Pemantauan & Pencatatan Log',
    text: 'Seluruh upaya login yang gagal, akses file transkrip rahasia, maupun perubahan data sensitif dicatat secara realtime dalam server log terisolasi untuk mendeteksi upaya peretasan dini.'
  },
  insiden: {
    title: '⚡ Rencana Tanggap Insiden Siber',
    text: 'Jika terindikasi kebocoran database mahasiswa, tim tanggap darurat kampus langsung mengisolasi server, mereset token sesi seluruh akun, melakukan investigasi forensik, dan memberi notifikasi kepada otoritas perlindungan data.'
  }
};

const RELATION_DATA = {
  1: {
    title: '1. Regulasi Hukum (Undang-Undang)',
    text: 'Regulasi adalah hukum yang ditetapkan oleh negara (misal UU PDP No. 27/2022). Regulasi menentukan batas hukum, kewajiban perlindungan hak individu, dan sanksi denda jika data bocor. Organisasi WAJIB patuh.'
  },
  2: {
    title: '2. Standar & Framework Internasional',
    text: 'Regulasi hukum tidak mengajarkan secara teknis bagaimana cara mengamankan server. Organisasi membutuhkan Standar & Framework (seperti ISO 27001 dan NIST CSF) sebagai panduan metodologi dan daftar kontrol keamanan terbaik.'
  },
  3: {
    title: '3. Tata Kelola (Governance)',
    text: 'Pimpinan organisasi (Rektor/Direksi) mengadopsi standar tersebut ke dalam struktur tata kelola resmi: menyetujui anggaran keamanan, membentuk tim security, menetapkan akuntabilitas, dan mengawasi implementasi.'
  },
  4: {
    title: '4. Kebijakan & Prosedur (Policy & SOP)',
    text: 'Governance diterjemahkan ke dalam dokumen operasional yang mengikat seluruh karyawan/mahasiswa: Kebijakan Keamanan (apa yang diwajibkan) dan SOP (langkah teknis pengoperasian sehari-hari).'
  },
  5: {
    title: '5. Implementasi Nyata',
    text: 'Eksekusi di lapangan yang menggabungkan Manusia (pelatihan security awareness), Proses (alur kerja yang aman), dan Teknologi (firewall, enkripsi, autentikasi multi-faktor).'
  },
  6: {
    title: '6. Monitoring & Evaluasi Berkelanjutan',
    text: 'Audit berkala dan peninjauan log untuk memastikan kebijakan benar-benar dipatuhi dan siap beradaptasi jika ada modus serangan baru. Hasil evaluasi dilaporkan kembali ke Pimpinan (siklus berulang).'
  }
};

// Classification Game Items (8 items)
const CLASSIFICATION_ITEMS = [
  {
    name: 'ISO/IEC 27001',
    desc: 'Pedoman internasional sistem manajemen keamanan informasi (ISMS).',
    category: 'standar'
  },
  {
    name: 'UU No. 27 Tahun 2022 (UU PDP)',
    desc: 'Undang-undang Republik Indonesia yang mengatur kewajiban perlindungan data pribadi dan sanksi hukum.',
    category: 'regulasi'
  },
  {
    name: 'NIST Cybersecurity Framework 2.0',
    desc: 'Kerangka kerja berbasis 6 fungsi (Govern, Identify, Protect, Detect, Respond, Recover) untuk mengelola risiko siber.',
    category: 'framework'
  },
  {
    name: 'Peraturan BSSN No. 8 Tahun 2020',
    desc: 'Ketentuan hukum resmi dari Badan Siber dan Sandi Negara tentang Sistem Pengamanan Informasi.',
    category: 'regulasi'
  },
  {
    name: 'CIS Critical Security Controls',
    desc: 'Daftar praktik acuan terstruktur 18 kontrol prioritas untuk menangkal serangan siber paling umum.',
    category: 'standar'
  },
  {
    name: 'General Data Protection Regulation (GDPR)',
    desc: 'Aturan hukum perlindungan data yang mengikat secara yuridis di wilayah Uni Eropa.',
    category: 'regulasi'
  },
  {
    name: 'COBIT 2019 (ISACA)',
    desc: 'Kerangka kerja tata kelola dan manajemen teknologi informasi serta informasi organisasi.',
    category: 'framework'
  },
  {
    name: 'PCI-DSS (Payment Card Industry)',
    desc: 'Standar kepatuhan keamanan teknis untuk pengelolaan data transaksi kartu kredit/pembayaran.',
    category: 'standar'
  }
];

// Quiz Questions (10 items)
const QUIZ_QUESTIONS = [
  {
    question: 'Apa definisi yang paling tepat mengenai "Standar Keamanan Siber"?',
    options: [
      'Undang-undang yang jika dilanggar akan menyebabkan kurungan penjara.',
      'Acuan atau pedoman teknis yang digunakan untuk membantu organisasi menyusun proses keamanan secara konsisten.',
      'Aplikasi antivirus yang wajib diinstal pada semua komputer pengguna.',
      'Sertifikat kelulusan mata kuliah keamanan siber bagi mahasiswa.'
    ],
    correct: 1,
    explanation: 'Standar berfungsi sebagai tolok ukur, acuan, atau pedoman terstruktur agar proses dan kontrol keamanan di organisasi konsisten serta dapat diuji.'
  },
  {
    question: 'Fungsi baru yang secara resmi ditambahkan dalam pembaruan NIST Cybersecurity Framework versi 2.0 adalah...',
    options: [
      'MONITOR',
      'GOVERN (Tata Kelola)',
      'PENETRATE',
      'ENCRYPT'
    ],
    correct: 1,
    explanation: 'NIST CSF 2.0 secara resmi menambahkan fungsi "GOVERN" untuk menekankan pentingnya tata kelola dan strategi manajemen risiko di level pimpinan organisasi.'
  },
  {
    question: 'Undang-undang di Indonesia yang menjadi landasan utama kewajiban perlindungan data pribadi dan sanksi kebocorannya adalah...',
    options: [
      'UU No. 27 Tahun 2022',
      'UU Ketenagakerjaan No. 13 Tahun 2003',
      'UU Kepabeanan No. 17 Tahun 2006',
      'Peraturan Daerah Khusus Ibu Kota Jakarta'
    ],
    correct: 0,
    explanation: 'UU No. 27 Tahun 2022 adalah Undang-Undang Perlindungan Data Pribadi (UU PDP) yang mengikat setiap pengendali data pribadi di Indonesia.'
  },
  {
    question: 'Perbedaan utama antara "Kebijakan (Policy)" dan "Prosedur (Procedure)" terletak pada...',
    options: [
      'Policy dibuat oleh staf lapangan, Procedure dibuat oleh presiden.',
      'Policy menjawab "Apa yang harus/tidak boleh dilakukan", sedangkan Procedure menjelaskan langkah teknis "Bagaimana melakukannya".',
      'Policy hanya berlaku untuk jaringan kabel, sedangkan Procedure untuk WiFi.',
      'Tidak ada perbedaan antara policy dan procedure dalam tata kelola siber.'
    ],
    correct: 1,
    explanation: 'Kebijakan adalah arahan manajemen tingkat tinggi (apa tujuannya), sedangkan prosedur adalah instruksi kerja bertahap/SOP (bagaimana langkah mengerjakannya).'
  },
  {
    question: 'Dalam tata kelola keamanan siber, siapa yang memegang tanggung jawab tertinggi terkait arah strategis dan alokasi anggaran keamanan?',
    options: [
      'Staf magang IT',
      'Pimpinan puncak organisasi (Direksi / Rektorat)',
      'Hanya vendor pihak ketiga pembuat firewall',
      'Mahasiswa semester awal'
    ],
    correct: 1,
    explanation: 'Manajemen puncak (Rektorat/Direksi) memegang mandat tata kelola utama dalam menentukan prioritas risiko, mengesahkan kebijakan formal, dan menyetujui anggaran.'
  },
  {
    question: 'Prinsip "Least Privilege" dalam pengelolaan hak akses akun SIAKAD berarti...',
    options: [
      'Setiap staf berhak memiliki akses tak terbatas ke seluruh database.',
      'Pengguna hanya diberikan izin akses minimum yang benar-benar dibutuhkan untuk menjalankan tugas fungsinya.',
      'Akun dibebaskan dari kewajiban memakai password yang rumit.',
      'Semua mahasiswa diizinkan mengedit nilai mata kuliah temannya.'
    ],
    correct: 1,
    explanation: 'Prinsip Least Privilege membatasi hak akses pengguna hanya pada sumber daya yang mutlak diperlukan dalam pekerjaannya guna meminimalkan risiko kebocoran.'
  },
  {
    question: 'Standar internasional yang paling diakui untuk Sistem Manajemen Keamanan Informasi (ISMS) adalah...',
    options: [
      'ISO/IEC 27001',
      'ISO 9001 Manajemen Mutu Makanan',
      'IEEE 802.11 Standar Nirkabel',
      'SNI Helm Pengendara Motor'
    ],
    correct: 0,
    explanation: 'ISO/IEC 27001 adalah standar internasional terkemuka untuk menerapkan, memelihara, dan meningkatkan Sistem Manajemen Keamanan Informasi (ISMS).'
  },
  {
    question: 'Manakah dari pernyataan berikut yang paling tepat menggambarkan sifat kepatuhan "Regulasi" dibanding "Standar"?',
    options: [
      'Regulasi umumnya bersifat sukarela, sedangkan standar wajib hukum pidana.',
      'Regulasi bersifat wajib dipatuhi dan memiliki kekuatan hukum resmi, sedangkan standar pada prinsipnya adalah acuan praktik terbaik (best practices).',
      'Regulasi dan standar tidak memiliki hubungan sama sekali.',
      'Regulasi hanya berlaku untuk komputer yang terhubung ke internet.'
    ],
    correct: 1,
    explanation: 'Regulasi dikeluarkan otoritas yang berwenang dan bersifat mengikat secara hukum (mandatory), sedangkan standar diadopsi sebagai pedoman mutu pengelolaan (voluntary/best-practice).'
  },
  {
    question: 'Ketika terjadi kebocoran data pada SIAKAD kampus, tahap penanganan yang berfokus pada isolasi sistem dan penutupan celah termasuk fungsi NIST CSF...',
    options: [
      'IDENTIFY',
      'RESPOND',
      'GOVERN',
      'PLAN'
    ],
    correct: 1,
    explanation: 'Fungsi RESPOND mencakup aksi penanggulangan tanggap darurat saat insiden terjadi, termasuk penahanan/isolasi sistem, analisis forensik, dan komunikasi.'
  },
  {
    question: 'Keamanan siber yang kokoh dalam sebuah organisasi modern dibangun di atas sinergi 5 elemen, yaitu...',
    options: [
      'Komputer + Kabel + Monitor + Mouse + Keyboard',
      'Manusia + Proses + Teknologi + Kebijakan + Tata Kelola',
      'Antivirus gratis + Password pendek + Sharing akun + Akses bebas + Firewall mati',
      'Hanya dana anggaran tanpa perlu pengawasan'
    ],
    correct: 1,
    explanation: 'Keamanan siber bukan sekadar teknologi, melainkan kolaborasi harmonis antara Manusia, Proses, Teknologi, Kebijakan, dan Tata Kelola (Governance).'
  }
];

// All Section IDs for progress calculation
const ALL_SECTION_IDS = [
  'cover', 'tujuan', 'apersepsi', 'apa-itu-standar', 'standar-framework',
  'apa-itu-regulasi', 'regulasi-indonesia', 'standar-vs-regulasi',
  'apa-itu-governance', 'unsur-governance', 'policy-vs-procedure',
  'peran-tanggung-jawab', 'hubungan-srg', 'penerapan-kampus',
  'studi-kasus', 'analisis-kasus', 'game-klasifikasi', 'kuis-pemahaman',
  'rangkuman', 'refleksi', 'tugas', 'progress-belajar'
];

// ========================================================
// 2. STATE MANAGEMENT
// ========================================================
let visitedSections = new Set();
let gameCurrentIndex = 0;
let gameScore = 0;
let quizCurrentIndex = 0;
let quizScore = 0;
let quizAnswered = false;

// ========================================================
// 3. INITIALIZATION ON DOM CONTENT LOADED
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  initNavigation();
  initApersepsi();
  initNistCSF();
  initSiakadTabs();
  initClassificationGame();
  initQuiz();
  initIntersectionObserver();
  updateProgressUI();
});

// Storage handler
function initStorage() {
  const savedSections = localStorage.getItem('cs4_visited_sections');
  if (savedSections) {
    try {
      const parsed = JSON.parse(savedSections);
      parsed.forEach(id => visitedSections.add(id));
    } catch (e) {
      console.error(e);
    }
  }

  // Load saved analysis questions
  for (let i = 1; i <= 6; i++) {
    const saved = localStorage.getItem(`cs4_case_q${i}`);
    const el = document.getElementById(`caseQ${i}`);
    if (saved && el) el.value = saved;
  }

  // Load saved reflection
  const savedRefl = localStorage.getItem('cs4_student_reflection');
  const reflEl = document.getElementById('studentReflectionInput');
  if (savedRefl && reflEl) reflEl.value = savedRefl;
}

// ========================================================
// 4. NAVIGATION & SIDEBAR
// ========================================================
function initNavigation() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (hamburgerBtn && sidebar && overlay) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = sidebar.classList.contains('mobile-open');
      if (isOpen) {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      } else {
        sidebar.classList.add('mobile-open');
        overlay.classList.add('active');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
      }
    });

    overlay.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    });

    // Close on nav link click in mobile
    sidebar.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('mobile-open');
          overlay.classList.remove('active');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Reset progress buttons
  const resetBtn = document.getElementById('btnResetAll');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetAllProgress);
  }
}

// Track sections as they enter viewport
function initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (id) {
          visitedSections.add(id);
          localStorage.setItem('cs4_visited_sections', JSON.stringify([...visitedSections]));
          highlightSidebar(id);
          updateProgressUI();
        }
      }
    });
  }, {
    threshold: 0.25
  });

  ALL_SECTION_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

function highlightSidebar(currentId) {
  document.querySelectorAll('.sidebar .nav-link').forEach(link => {
    const targetSection = link.getAttribute('data-section');
    if (targetSection === currentId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }

    if (visitedSections.has(targetSection)) {
      link.classList.add('visited');
    }
  });
}

function updateProgressUI() {
  const count = visitedSections.size;
  const total = ALL_SECTION_IDS.length;
  const percent = Math.min(100, Math.round((count / total) * 100));

  // Topbar progress
  const topbarPercent = document.getElementById('topbarProgressPercent');
  const topbarFill = document.getElementById('topbarProgressBar');
  if (topbarPercent) topbarPercent.textContent = `${percent}%`;
  if (topbarFill) topbarFill.style.width = `${percent}%`;

  // Summary section progress
  const sumPercent = document.getElementById('summaryProgressText');
  const sumFill = document.getElementById('summaryProgressBar');
  const sumCount = document.getElementById('summarySectionsCount');
  if (sumPercent) sumPercent.textContent = `${percent}%`;
  if (sumFill) sumFill.style.width = `${percent}%`;
  if (sumCount) sumCount.textContent = `${count} dari ${total} bagian materi telah dipelajari.`;
}

function navigateStep(direction) {
  const currentHash = window.location.hash.replace('#', '') || 'cover';
  const currentIndex = ALL_SECTION_IDS.indexOf(currentHash);
  let targetIndex = currentIndex + direction;

  if (targetIndex < 0) targetIndex = 0;
  if (targetIndex >= ALL_SECTION_IDS.length) targetIndex = ALL_SECTION_IDS.length - 1;

  const targetId = ALL_SECTION_IDS[targetIndex];
  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: 'smooth' });
    window.location.hash = targetId;
  }
}

// ========================================================
// 5. APERSEPSI LOGIC
// ========================================================
function initApersepsi() {
  const container = document.getElementById('apersepsiOptions');
  const feedback = document.getElementById('apersepsiFeedback');
  if (!container || !feedback) return;

  container.querySelectorAll('.apersepsi-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.apersepsi-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      feedback.classList.add('active');
    });
  });
}

// ========================================================
// 6. NIST CSF 2.0 INTERACTION
// ========================================================
function initNistCSF() {
  const buttons = document.querySelectorAll('.nist-btn');
  const panel = document.getElementById('nistDetailPanel');
  if (!buttons.length || !panel) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const funcKey = btn.getAttribute('data-func');
      const data = NIST_FUNCTIONS[funcKey];
      if (data) {
        panel.innerHTML = `
          <strong style="color:var(--color-framework); font-size:14px;">${data.icon} ${data.title}:</strong>
          <p style="margin-top:6px; color:var(--text-main); font-size:13.5px; line-height:1.6;">${data.text}</p>
        `;
      }
    });
  });
}

// ========================================================
// 7. STANDAR VS REGULASI QUICK CHECK
// ========================================================
window.checkStatementAnswer = function(stmtId, userChoice) {
  const item = document.querySelector(`.statement-item[data-id="${stmtId}"]`);
  if (!item) return;

  const correctChoice = item.getAttribute('data-answer');
  const buttons = item.querySelectorAll('.btn-choice');

  buttons.forEach(btn => {
    btn.classList.remove('correct', 'wrong');
    btn.disabled = true;
  });

  const clickedBtn = Array.from(buttons).find(b => b.textContent.toLowerCase() === userChoice.toLowerCase());

  if (userChoice === correctChoice) {
    if (clickedBtn) clickedBtn.classList.add('correct');
    showToast('Tepat sekali! Jawaban Anda benar.', '✅');
  } else {
    if (clickedBtn) clickedBtn.classList.add('wrong');
    showToast(`Kurang tepat. Pernyataan ini tergolong ${correctChoice.toUpperCase()}.`, '⚠️');
  }
};

// ========================================================
// 8. UNSUR TATA KELOLA EXPAND
// ========================================================
window.toggleUnsur = function(cardEl) {
  cardEl.classList.toggle('expanded');
};

// ========================================================
// 9. POLICY VS PROCEDURE MINI QUIZ
// ========================================================
window.checkPolicyQuiz = function(choice) {
  const fb = document.getElementById('policyQuizFeedback');
  if (!fb) return;

  fb.style.display = 'block';
  if (choice === 'policy') {
    fb.style.background = 'rgba(16, 185, 129, 0.15)';
    fb.style.border = '1px solid var(--success)';
    fb.style.color = '#a7f3d0';
    fb.innerHTML = `<strong>Tepat Sekali (Policy)!</strong> Aturan tersebut menentukan ekspektasi tingkat tinggi bahwa MFA wajib bagi admin ("Apa yang harus dilakukan"). Langkah-langkah mengonfigurasi MFA di layar barulah tergolong Prosedur.`;
    showToast('Jawaban Benar!', '✅');
  } else {
    fb.style.background = 'rgba(239, 68, 68, 0.15)';
    fb.style.border = '1px solid var(--danger)';
    fb.style.color = '#fecaca';
    fb.innerHTML = `<strong>Kurang Tepat.</strong> Itu merupakan <strong>Policy</strong> karena mengatur prinsip atau kewajiban umum. Prosedur akan merinci urutan langkah: unduh authenticator, scan QR code, dan masukkan 6 digit token.`;
  }
};

// ========================================================
// 10. SIAKAD SIMULATOR TABS
// ========================================================
function initSiakadTabs() {
  const tabs = document.querySelectorAll('.siakad-tab-btn');
  const display = document.getElementById('siakadDisplayBox');
  if (!tabs.length || !display) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabKey = tab.getAttribute('data-tab');
      const info = SIAKAD_DATA[tabKey];
      if (info) {
        display.innerHTML = `
          <h3 style="color:var(--cyan); margin-bottom:8px;">${info.title}</h3>
          <p style="font-size:14px; line-height:1.7; color:var(--text-main);">${info.text}</p>
        `;
      }
    });
  });
}

// ========================================================
// 11. CASE STUDY ANALYSIS & MODALS
// ========================================================
window.saveCaseAnalysis = function() {
  for (let i = 1; i <= 6; i++) {
    const val = document.getElementById(`caseQ${i}`)?.value || '';
    localStorage.setItem(`cs4_case_q${i}`, val);
  }
  showToast('Seluruh jawaban analisis berhasil disimpan!', '💾');
};

window.openAnalysisSampleModal = function() {
  const modal = document.getElementById('analysisModal');
  if (modal) modal.classList.add('active');
};

window.closeAnalysisModal = function() {
  const modal = document.getElementById('analysisModal');
  if (modal) modal.classList.remove('active');
};

// Relation Modal
window.showRelationDetail = function(stepNum) {
  const data = RELATION_DATA[stepNum];
  const modal = document.getElementById('relationModal');
  const title = document.getElementById('relationModalTitle');
  const body = document.getElementById('relationModalBody');

  if (data && modal && title && body) {
    title.textContent = data.title;
    body.innerHTML = `<p>${data.text}</p>`;
    modal.classList.add('active');
  }
};

window.closeRelationModal = function() {
  const modal = document.getElementById('relationModal');
  if (modal) modal.classList.remove('active');
};

// Close modal on outside click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// ========================================================
// 12. CLASSIFICATION GAME
// ========================================================
function initClassificationGame() {
  renderGameItem();
}

function renderGameItem() {
  if (gameCurrentIndex >= CLASSIFICATION_ITEMS.length) {
    // Game Completed
    const cardTitle = document.getElementById('gameCardTitle');
    const cardDesc = document.getElementById('gameCardDesc');
    const scoreText = document.getElementById('gameScoreText');
    const fbText = document.getElementById('gameFeedbackText');

    if (cardTitle) cardTitle.textContent = '🎉 Latihan Selesai!';
    if (cardDesc) cardDesc.textContent = `Hebat! Anda berhasil menjawab ${gameScore} dari ${CLASSIFICATION_ITEMS.length} instrumen dengan benar.`;
    if (scoreText) scoreText.textContent = `${gameScore} / ${CLASSIFICATION_ITEMS.length}`;
    if (fbText) {
      fbText.innerHTML = `
        <button class="btn-primary" onclick="restartClassificationGame()" style="margin:10px auto;">
          <span>↺ MAIN LAGI</span>
        </button>
      `;
    }
    return;
  }

  const current = CLASSIFICATION_ITEMS[gameCurrentIndex];
  const titleEl = document.getElementById('gameCardTitle');
  const descEl = document.getElementById('gameCardDesc');
  const scoreText = document.getElementById('gameScoreText');
  const progText = document.getElementById('gameProgressText');
  const fbText = document.getElementById('gameFeedbackText');

  if (titleEl) titleEl.textContent = current.name;
  if (descEl) descEl.textContent = current.desc;
  if (scoreText) scoreText.textContent = `${gameScore} / ${CLASSIFICATION_ITEMS.length}`;
  if (progText) progText.textContent = `Soal ${gameCurrentIndex + 1} dari ${CLASSIFICATION_ITEMS.length}`;
  if (fbText) fbText.textContent = '';
}

window.answerClassification = function(userCategory) {
  if (gameCurrentIndex >= CLASSIFICATION_ITEMS.length) return;

  const current = CLASSIFICATION_ITEMS[gameCurrentIndex];
  const fbText = document.getElementById('gameFeedbackText');

  if (userCategory === current.category) {
    gameScore++;
    if (fbText) {
      fbText.innerHTML = `<span style="color:var(--success); font-weight:600;">✓ Benar! "${current.name}" adalah ${current.category.toUpperCase()}.</span>`;
    }
  } else {
    if (fbText) {
      fbText.innerHTML = `<span style="color:var(--danger); font-weight:600;">✕ Kurang tepat. "${current.name}" merupakan ${current.category.toUpperCase()}.</span>`;
    }
  }

  gameCurrentIndex++;
  setTimeout(() => {
    renderGameItem();
  }, 1100);
};

window.restartClassificationGame = function() {
  gameCurrentIndex = 0;
  gameScore = 0;
  renderGameItem();
};

// ========================================================
// 13. COMPREHENSIVE QUIZ (10 QUESTIONS)
// ========================================================
function initQuiz() {
  quizCurrentIndex = 0;
  quizScore = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  quizAnswered = false;
  const current = QUIZ_QUESTIONS[quizCurrentIndex];
  const qNum = document.getElementById('quizQNum');
  const qText = document.getElementById('quizQuestionText');
  const optionsBox = document.getElementById('quizOptionsContainer');
  const expBox = document.getElementById('quizExplanationBox');
  const nextBtn = document.getElementById('btnQuizNext');
  const progressFill = document.getElementById('quizProgressFill');

  if (qNum) qNum.textContent = `SOAL ${String(quizCurrentIndex + 1).padStart(2, '0')} / 10`;
  if (qText) qText.textContent = current.question;
  if (expBox) expBox.classList.remove('show');
  if (nextBtn) nextBtn.style.display = 'none';

  if (progressFill) {
    const pct = ((quizCurrentIndex + 1) / QUIZ_QUESTIONS.length) * 100;
    progressFill.style.width = `${pct}%`;
  }

  if (optionsBox) {
    optionsBox.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    current.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<strong class="mono">${letters[idx]}.</strong> <span>${opt}</span>`;
      btn.onclick = () => selectQuizAnswer(idx, btn);
      optionsBox.appendChild(btn);
    });
  }
}

function selectQuizAnswer(selectedIdx, btnElement) {
  if (quizAnswered) return;
  quizAnswered = true;

  const current = QUIZ_QUESTIONS[quizCurrentIndex];
  const allButtons = document.querySelectorAll('.quiz-option-btn');
  const expBox = document.getElementById('quizExplanationBox');
  const expText = document.getElementById('quizExplanationText');
  const nextBtn = document.getElementById('btnQuizNext');

  allButtons.forEach((b, idx) => {
    b.disabled = true;
    if (idx === current.correct) {
      b.classList.add('selected-correct');
    }
  });

  if (selectedIdx === current.correct) {
    quizScore += 10;
    btnElement.classList.add('selected-correct');
    showToast('Jawaban Benar! (+10 Poin)', '🎉');
  } else {
    btnElement.classList.add('selected-wrong');
    showToast('Jawaban Salah. Simak pembahasannya.', '⚠️');
  }

  if (expBox && expText) {
    expText.textContent = current.explanation;
    expBox.classList.add('show');
  }

  if (nextBtn) {
    nextBtn.style.display = 'inline-flex';
    if (quizCurrentIndex === QUIZ_QUESTIONS.length - 1) {
      nextBtn.querySelector('span').textContent = 'LIHAT HASIL KUIS →';
    } else {
      nextBtn.querySelector('span').textContent = 'SOAL BERIKUTNYA →';
    }
  }
}

window.nextQuizQuestion = function() {
  quizCurrentIndex++;
  if (quizCurrentIndex < QUIZ_QUESTIONS.length) {
    renderQuizQuestion();
  } else {
    showQuizResults();
  }
};

function showQuizResults() {
  const quizCard = document.getElementById('quizCard');
  const resultCard = document.getElementById('quizResultCard');
  const finalScoreEl = document.getElementById('quizFinalScore');
  const badgeEl = document.getElementById('quizRatingBadge');
  const msgEl = document.getElementById('quizRatingMessage');

  if (quizCard) quizCard.style.display = 'none';
  if (resultCard) resultCard.style.display = 'block';

  if (finalScoreEl) finalScoreEl.textContent = `${quizScore} / 100`;

  if (badgeEl && msgEl) {
    if (quizScore >= 90) {
      badgeEl.textContent = '🌟 Kategori: Sangat Baik';
      badgeEl.style.background = 'rgba(16, 185, 129, 0.2)';
      badgeEl.style.color = '#6ee7b7';
      badgeEl.style.border = '1px solid var(--success)';
      msgEl.textContent = 'Luar biasa! Anda memiliki pemahaman mendalam tentang standar, regulasi UU PDP, dan tata kelola keamanan siber.';
    } else if (quizScore >= 75) {
      badgeEl.textContent = '👍 Kategori: Baik';
      badgeEl.style.background = 'rgba(56, 189, 248, 0.2)';
      badgeEl.style.color = '#7dd3fc';
      badgeEl.style.border = '1px solid var(--color-standar)';
      msgEl.textContent = 'Bagus sekali! Anda memahami sebagian besar konsep dasar dan implementasi tata kelola dengan baik.';
    } else if (quizScore >= 60) {
      badgeEl.textContent = '⚡ Kategori: Cukup';
      badgeEl.style.background = 'rgba(245, 158, 11, 0.2)';
      badgeEl.style.color = '#fcd34d';
      badgeEl.style.border = '1px solid var(--warning)';
      msgEl.textContent = 'Cukup baik. Silakan pelajari kembali perbedaan spesifik ISO vs NIST dan UU PDP agar lebih mantap.';
    } else {
      badgeEl.textContent = '📖 Perlu Mempelajari Kembali';
      badgeEl.style.background = 'rgba(239, 68, 68, 0.2)';
      badgeEl.style.color = '#fca5a5';
      badgeEl.style.border = '1px solid var(--danger)';
      msgEl.textContent = 'Skor Anda masih di bawah standar kompetensi. Ulangi membaca materi dari awal dan ikuti kuis kembali.';
    }
  }
}

window.restartQuiz = function() {
  quizCurrentIndex = 0;
  quizScore = 0;
  const quizCard = document.getElementById('quizCard');
  const resultCard = document.getElementById('quizResultCard');
  if (quizCard) quizCard.style.display = 'block';
  if (resultCard) resultCard.style.display = 'none';
  renderQuizQuestion();
};

// ========================================================
// 14. REFLEKSI & TUGAS (CLIPBOARD API)
// ========================================================
window.saveStudentReflection = function() {
  const text = document.getElementById('studentReflectionInput')?.value || '';
  localStorage.setItem('cs4_student_reflection', text);
  showToast('Refleksi Anda berhasil disimpan di browser!', '💾');
};

window.copyTaskInstructions = function() {
  const instructions = `TUGAS 2: STANDAR, REGULASI, DAN TATA KELOLA KEAMANAN SIBER
Mata Kuliah: Cyber Security Management (BWP5030) - Bisnis Digital

INSTRUKSI PENUGASAN:
Buat ringkasan minimal 2 halaman (PDF) mengenai Standar, Regulasi, dan Tata Kelola Keamanan Siber.
Pembahasan wajib mencakup:
1. Pengertian standar keamanan siber dan urgensinya.
2. Pengertian regulasi dan ketentuan UU Perlindungan Data Pribadi (UU No. 27/2022).
3. Pengertian tata kelola (Cybersecurity Governance) dan 6 unsurnya.
4. Perbedaan mendasar antara standar dan regulasi.
5. Contoh standar/framework (ISO/IEC 27001 dan NIST CSF 2.0).
6. Analisis penerapannya pada sebuah organisasi nyata (kampus / startup / e-commerce).
7. Kesimpulan dan saran manajerial.

KETENTUAN:
- Bentuk: Individu Mandiri
- Format: Dokumen PDF (Minimal 2 Halaman)
- Referensi: Minimal 2 rujukan resmi/ilmiah
- Bobot Penilaian: 5% terhadap Nilai Akhir RPS`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(instructions)
      .then(() => showToast('Instruksi tugas berhasil disalin ke clipboard!', '📋'))
      .catch(() => fallbackCopy(instructions));
  } else {
    fallbackCopy(instructions);
  }
};

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast('Instruksi tugas berhasil disalin ke clipboard!', '📋');
}

// Reset all progress
window.resetAllProgress = function() {
  if (confirm('Apakah Anda yakin ingin mereset seluruh progres belajar Pertemuan 4?')) {
    visitedSections.clear();
    localStorage.removeItem('cs4_visited_sections');
    updateProgressUI();
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
      link.classList.remove('visited', 'active');
    });
    window.location.hash = 'cover';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Progres berhasil direset dari awal.', '↺');
  }
};

// ========================================================
// 15. TOAST NOTIFICATION UTILITY
// ========================================================
function showToast(message, icon = '✅') {
  const toast = document.getElementById('toastMessage');
  const toastText = document.getElementById('toastText');
  const toastIcon = document.getElementById('toastIcon');

  if (!toast || !toastText) return;

  toastText.textContent = message;
  if (toastIcon) toastIcon.textContent = icon;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
