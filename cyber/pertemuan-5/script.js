/* ========================================================
   CYBER SECURITY MANAGEMENT - PERTEMUAN 5
   Analisis Penerapan Standar, Regulasi, dan Tata Kelola
   script.js - Pure Vanilla JavaScript
   ======================================================== */

'use strict';

// ========================================================
// 1. DATA CONSTANTS
// ========================================================

const P5_FLOW_DETAILS = {
  1: {
    title: '1. REGULASI (Hukum & Kepatuhan)',
    text: 'Regulasi adalah aturan formal yang ditetapkan oleh pemerintah atau lembaga yang berwenang (misalnya UU No. 27/2022 tentang Pelindungan Data Pribadi). Regulasi bersifat WAJIB dan menentukan hak pemilik data, kewajiban pengendali data, serta sanksi denda jika terjadi pelanggaran.'
  },
  2: {
    title: '2. STANDAR / FRAMEWORK (Acuan Praktik Terbaik)',
    text: 'Standar (seperti ISO/IEC 27001 dan NIST CSF 2.0) menjadi panduan terstruktur bagi organisasi untuk menerjemahkan kewajiban umum hukum menjadi proses kerja keamanan nyata yang terukur dan berstandar internasional.'
  },
  3: {
    title: '3. GOVERNANCE (Tata Kelola Organisasi)',
    text: 'Pimpinan puncak (Direksi/Rektorat) memberikan mandat kepemimpinan, mengalokasikan anggaran, membentuk tim penanggung jawab (CISO/IT), dan mengawasi postur risiko keamanan siber di seluruh divisi.'
  },
  4: {
    title: '4. POLICY (Kebijakan Organisasi)',
    text: 'Dokumen formal tingkat tinggi yang menetapkan prinsip "APA YANG HARUS DAN DILARANG DILAKUKAN". Contoh: Kebijakan Klasifikasi Data, Kebijakan Password Kuat, dan Kebijakan Hak Akses Minimum.'
  },
  5: {
    title: '5. PROCEDURE (Prosedur Operasional Standar - SOP)',
    text: 'Instruksi kerja berurutan langkah demi langkah "BAGAIMANA CARA MELAKUKANNYA". Contoh: Prosedur registrasi akun admin baru, SOP aktivasi MFA, dan SOP backup database berkala.'
  },
  6: {
    title: '6. CONTROL (Kontrol Keamanan)',
    text: 'Mekanisme perlindungan nyata untuk mengurangi risiko atau memastikan aturan dipatuhi di dunia nyata. Meliputi kontrol teknis (firewall, RBAC, enkripsi), administratif (SOP, NDA), dan fisik (ruang server terkunci).'
  },
  7: {
    title: '7. MONITORING (Pemantauan Berkelanjutan)',
    text: 'Mengamati dan merekam operasional sistem secara realtime: apakah kontrol benar-benar berjalan? Meliputi pemantauan log koneksi, deteksi upaya peretasan, dan verifikasi status backup.'
  },
  8: {
    title: '8. EVALUATION (Evaluasi & Perbaikan Berkelanjutan)',
    text: 'Menguji apakah kontrol yang diterapkan efektif menekan risiko. Dilakukan melalui audit internal berkala, uji kerentanan tahunan, dan evaluasi insiden untuk penyempurnaan kebijakan berikutnya.'
  }
};

const GOV_MAP_DETAILS = {
  pimpinan: {
    title: '👔 Peran Pimpinan Puncak (Direksi / Rektorat)',
    text: 'Memegang akuntabilitas tertinggi terhadap postur keamanan organisasi. Pimpinan menetapkan selera risiko (risk appetite), mengesahkan kebijakan umum tertulis, menyetujui investasi anggaran keamanan siber, dan mempertanggungjawabkan kepatuhan hukum kepada publik.'
  },
  kebijakan: {
    title: '📜 Instrumen Kebijakan (Policy)',
    text: 'Aturan formal yang menjadi payung hukum internal. Tanpa adanya kebijakan yang disahkan secara tertulis oleh pimpinan, staf teknis tidak memiliki landasan wewenang untuk menertibkan pengguna yang lalai menjaga password.'
  },
  peran: {
    title: '👥 Pembagian Peran dan Wewenang',
    text: 'Pemisahan tugas (Segregation of Duties) yang jelas: administrator database mengelola server teknis, pimpinan unit menyetujui izin akses pegawai, dan auditor internal memeriksa kepatuhan tanpa campur tangan operasional.'
  },
  risiko: {
    title: '⚖️ Manajemen Risiko Informasi',
    text: 'Mendata seluruh aset digital berharga, memperkirakan peluang terjadinya ancaman, serta menghitung besaran potensi kerugian finansial maupun reputasi jika aset tersebut bocor.'
  },
  kontrol: {
    title: '🛡️ Kontrol Keamanan (Security Controls)',
    text: 'Tindakan mitigasi nyata: kontrol preventif (mencegah insiden), kontrol detektif (menemukan anomali), dan kontrol korektif (memulihkan layanan setelah insiden).'
  },
  monitoring: {
    title: '📡 Pemantauan & Pencatatan Log',
    text: 'Memastikan semua aktivitas sensitif (seperti perubahan nilai mahasiswa atau export data pelanggan) terekam dalam audit trail yang tidak dapat diubah (tamper-proof).'
  },
  evaluasi: {
    title: '🔄 Evaluasi & Audit Berkala',
    text: 'Menilai apakah kontrol keamanan masih relevan menghadapi tren modus serangan siber terbaru atau perlu dilakukan pembaruan teknologi dan regulasi.'
  }
};

const PPC_STAGES = {
  1: {
    pill: 'TAHAP 1 • POLICY (Kebijakan)',
    pillClass: 'pill-policy',
    desc: 'Mandat Prinsipil Tingkat Tinggi',
    title: '"Data pelanggan dan data pribadi mahasiswa wajib dilindungi kerahasiaannya dari akses yang tidak berwenang."',
    body: 'Kebijakan menetapkan tujuan hukum dan manajerial yang wajib dipatuhi oleh seluruh entitas di organisasi.'
  },
  2: {
    pill: 'TAHAP 2 • PROCEDURE (Prosedur/SOP)',
    pillClass: 'pill-cyan',
    desc: 'Instruksi Kerja Bertahap',
    title: '"Akses database produksi hanya diberikan berdasarkan persetujuan tertulis kepala departemen dan diverifikasi tim IT."',
    body: 'SOP mengatur alur permohonan akun, validasi identitas pemohon, penetapan masa berlaku izin, dan mekanisme pencabutan akses.'
  },
  3: {
    pill: 'TAHAP 3 • CONTROL (Kontrol Keamanan)',
    pillClass: 'pill-control',
    desc: 'Mekanisme Perlindungan Nyata',
    title: '"Penerapan Role-Based Access Control (RBAC) pada basis data."',
    body: 'Kontrol teknis membatasi query SQL: staf layanan hanya dapat membaca tabel profil yang diizinkan tanpa hak akses ke database server langsung.'
  },
  4: {
    pill: 'TAHAP 4 • MONITORING (Pemantauan)',
    pillClass: 'pill-evaluation',
    desc: 'Pengawasan Realtime',
    title: '"Seluruh aktivitas query dan pembacaan data pelanggan dicatat dalam server SIEM."',
    body: 'Setiap akses data di luar jam kerja atau unduhan data dalam jumlah besar memicu notifikasi peringatan dini ke tim keamanan.'
  },
  5: {
    pill: 'TAHAP 5 • EVALUATION (Evaluasi)',
    pillClass: 'pill-evaluation',
    desc: 'Audit & Perbaikan Berkelanjutan',
    title: '"Audit hak akses akun pengguna dilakukan setiap 3 bulan sekali oleh tim auditor independen."',
    body: 'Akun pegawai yang mutasi atau berhenti dicabut seketika, dan konfigurasi RBAC ditinjau ulang terhadap kebutuhan bisnis baru.'
  }
};

// RBAC Simulator Data
const RBAC_DATA = {
  cs: {
    name: 'Customer Service (Layanan Pelanggan)',
    resources: [
      { name: 'Data Pelanggan', status: 'LIMITED', desc: 'Hanya data profil kontak dasar untuk verifikasi keluhan pelanggan.' },
      { name: 'Data Transaksi', status: 'LIMITED', desc: 'Melihat status transaksi terkait tiket keluhan yang sedang ditangani.' },
      { name: 'Database Server', status: 'DENIED', desc: 'Ditolak total. Staf CS tidak boleh mengakses terminal database.' },
      { name: 'Sistem Admin / Server', status: 'DENIED', desc: 'Ditolak total. Tidak memiliki kewenangan teknis server.' }
    ]
  },
  marketing: {
    name: 'Marketing (Pemasaran)',
    resources: [
      { name: 'Data Pelanggan', status: 'LIMITED', desc: 'Hanya data agregat tren pasar tanpa NIK atau identitas sensitif individu.' },
      { name: 'Data Transaksi', status: 'LIMITED', desc: 'Data agregat statistik total penjualan produk bulanan.' },
      { name: 'Database Server', status: 'DENIED', desc: 'Ditolak total. Tidak memiliki izin query langsung ke database.' },
      { name: 'Sistem Admin / Server', status: 'DENIED', desc: 'Ditolak total. Tidak memiliki hak istimewa sistem.' }
    ]
  },
  finance: {
    name: 'Finance (Keuangan)',
    resources: [
      { name: 'Data Pelanggan', status: 'LIMITED', desc: 'Melihat nama pembayar dan nomor invoice penagihan.' },
      { name: 'Data Transaksi', status: 'ACCESS', desc: 'Akses penuh ke mutasi pembayaran, slip transfer, dan status pelunasan.' },
      { name: 'Database Server', status: 'DENIED', desc: 'Ditolak. Akses hanya melalui antarmuka modul software ERP keuangan.' },
      { name: 'Sistem Admin / Server', status: 'DENIED', desc: 'Ditolak total. Konfigurasi server adalah wewenang IT.' }
    ]
  },
  it: {
    name: 'IT Admin / Database Administrator (DBA)',
    resources: [
      { name: 'Data Pelanggan', status: 'ACCESS', desc: 'Akses teknis untuk pemeliharaan database dengan pencatatan log ketat.' },
      { name: 'Data Transaksi', status: 'ACCESS', desc: 'Pemeliharaan integritas tabel dan proses replikasi data backup.' },
      { name: 'Database Server', status: 'ACCESS', desc: 'Akses administratif penuh (root/sysadmin) dengan verifikasi MFA.' },
      { name: 'Sistem Admin / Server', status: 'ACCESS', desc: 'Mengelola patch keamanan, konfigurasi firewall, dan monitoring SIEM.' }
    ]
  },
  umum: {
    name: 'Pegawai Umum / Staf Non-Teknis',
    resources: [
      { name: 'Data Pelanggan', status: 'DENIED', desc: 'Ditolak total. Tidak ada relevansi tugas pekerjaan.' },
      { name: 'Data Transaksi', status: 'DENIED', desc: 'Ditolak total. Bukan staf divisi keuangan atau kasir.' },
      { name: 'Database Server', status: 'DENIED', desc: 'Ditolak total. Menghindari bahaya kebocoran internal.' },
      { name: 'Sistem Admin / Server', status: 'DENIED', desc: 'Ditolak total. Dibatasi hanya untuk staf IT terverifikasi.' }
    ]
  }
};

// Comprehensive Quiz Pertemuan 5 (12 Questions)
const P5_QUIZ_QUESTIONS = [
  {
    q: 'Apa perbedaan esensial antara fokus Pertemuan 4 dan Pertemuan 5?',
    opts: [
      'Pertemuan 4 membahas peretasan WiFi, Pertemuan 5 membuat virus komputer.',
      'Pertemuan 4 membahas definisi dasar konsep, sedangkan Pertemuan 5 menganalisis bagaimana konsep tersebut diterapkan nyata dalam organisasi.',
      'Pertemuan 5 menggantikan materi Pertemuan 4 karena Pertemuan 4 sudah usang.',
      'Tidak ada perbedaan antara Pertemuan 4 dan 5.'
    ],
    correct: 1,
    exp: 'Pertemuan 5 adalah kelanjutan dari Pertemuan 4 yang berfokus pada analisis operasional, pembentukan kontrol, RBAC, monitoring, dan evaluasi berkala di tempat kerja.'
  },
  {
    q: 'Pernyataan "Data pelanggan wajib dilindungi dari akses pihak ketiga yang tidak berwenang" tergolong ke dalam tingkatan...',
    opts: [
      'Procedure (SOP)',
      'Policy (Kebijakan Organisasi)',
      'Control Fisik',
      'Audit Trail'
    ],
    correct: 1,
    exp: 'Kebijakan (Policy) adalah arahan mandat prinsipil tingkat tinggi yang disahkan oleh manajemen puncak mengenai apa yang wajib dipatuhi.'
  },
  {
    q: 'Prinsip "Role-Based Access Control (RBAC)" dalam tata kelola keamanan siber bertujuan untuk...',
    opts: [
      'Memberikan hak akses super-admin ke seluruh karyawan agar pekerjaan cepat selesai.',
      'Membatasi wewenang akses pengguna hanya sesuai dengan peran jabatan dan kebutuhan tugas fungsinya.',
      'Menghapus kewajiban kata sandi bagi staf senior.',
      'Membolehkan staf magang mengedit saldo keuangan.'
    ],
    correct: 1,
    exp: 'RBAC memastikan hak akses diberikan berdasarkan peran kerja (Role) dengan menerapkan asas Least Privilege sehingga meminimalisir risiko kebocoran data internal.'
  },
  {
    q: 'Dalam alur "Policy → Procedure → Control", fungsi utama dari Kontrol (Control) adalah...',
    opts: [
      'Membuat presentasi rapat tahunan.',
      'Mekanisme perlindungan nyata untuk mengurangi risiko atau memastikan aturan kebijakan benar-benar dijalankan.',
      'Menghapus dokumen yang sudah tidak dipakai.',
      'Membeli software termahal di pasaran tanpa pelatihan.'
    ],
    correct: 1,
    exp: 'Control adalah tindakan atau instrumen nyata (teknis, manajerial, fisik) yang mengeksekusi mandat kebijakan agar risiko dapat ditekan ke tingkat yang dapat diterima.'
  },
  {
    q: 'Aktivitas memeriksa catatan log upaya login gagal secara harian tergolong ke dalam tahap...',
    opts: [
      'Monitoring (Pemantauan)',
      'Perumusan Visi Pimpinan',
      'Pembelian Lisensi',
      'Sertifikasi Kelulusan'
    ],
    correct: 0,
    exp: 'Monitoring berfokus pada pengamatan rutin dan realtime untuk memastikan apakah operasional sistem berjalan normal dan mendeteksi anomali.'
  },
  {
    q: 'Penilaian komprehensif tahunan untuk menguji apakah kebijakan keamanan masih efektif atau memerlukan revisi disebut...',
    opts: [
      'Monitoring',
      'Evaluation (Evaluasi)',
      'Authentication',
      'Penetrasi WiFi'
    ],
    correct: 1,
    exp: 'Evaluation menguji efektivitas jangka panjang dari kontrol keamanan yang diterapkan dan menjadi dasar perbaikan berkelanjutan (continual improvement).'
  },
  {
    q: 'Mengapa pembagian peran (Segregation of Duties) sangat penting dalam pengelolaan SIAKAD kampus?',
    opts: [
      'Agar staf administrasi tidak perlu bekerja keras.',
      'Mencegah manipulasi data nilai sepihak dan memastikan adanya mekanisme pengawasan silang (cross-check).',
      'Agar seluruh data nilai dapat dilihat secara publik oleh siapa saja.',
      'Untuk menghemat biaya listrik komputer kampus.'
    ],
    correct: 1,
    exp: 'Pemisahan wewenang mencegah satu orang memiliki kekuasaan mutlak tanpa pengawasan, sehingga risiko manipulasi nilai atau kebocoran data dapat dicegah.'
  },
  {
    q: 'Jika sebuah kampus memiliki firewall canggih namun membiarkan seluruh staf memiliki akun root ke database, celah keamanan terbesar berasal dari aspek...',
    opts: [
      'Kurangnya kabel jaringan LAN.',
      'Kelemahan Tata Kelola (Governance) dan ketiadaan pembatasan hak akses (Access Control).',
      'Antivirus yang belum di-restart.',
      'Kapasitas RAM server yang terlalu besar.'
    ],
    correct: 1,
    exp: 'Teknologi secanggih apa pun tidak akan mampu melindungi sistem jika tata kelola internal memberikan akses terbuka ke seluruh personel (kegagalan manajerial).'
  },
  {
    q: 'Berdasarkan UU PDP No. 27/2022, kewajiban apa yang harus segera dipenuhi institusi jika terbukti mengalami kebocoran data pribadi?',
    opts: [
      'Menutup kampus selama 1 tahun.',
      'Menyampaikan pemberitahuan tertulis mengenai kegagalan pelindungan data kepada pemilik data dan lembaga pengawas.',
      'Menghapus seluruh file data agar tidak ada jejak bukti hukum.',
      'Menyalahkan penyedia listrik atas gangguan sistem.'
    ],
    correct: 1,
    exp: 'UU PDP mewajibkan pengendali data pribadi menyampaikan pemberitahuan tertulis resmi dalam kurun waktu yang ditentukan jika terjadi kebocoran data.'
  },
  {
    q: 'Manakah contoh kontrol keamanan kategori "Administratif"?',
    opts: [
      'Pemasangan firewall perangkat keras.',
      'Penyusunan SOP penonaktifan akun karyawan yang berhenti kerja dan penandatanganan pakta integritas (NDA).',
      'Penguncian pintu ruangan server dengan gembok biometrik.',
      'Penyaringan port koneksi pada router.'
    ],
    correct: 1,
    exp: 'Kontrol administratif berkaitan dengan aturan tertulis, kebijakan manajerial, pelatihan personel, dan prosedur kerja operasional.'
  },
  {
    q: 'Apakah mengantongi sertifikat standar internasional seperti ISO/IEC 27001 menjamin sebuah institusi 100% bebas dari serangan siber?',
    opts: [
      'Ya, dijamin 100% kebal dari segala macam peretasan selamanya.',
      'Tidak, karena standar adalah pedoman proses pengelolaan risiko; keamanan siber membutuhkan kewaspadaan terus-menerus dan adaptasi ancaman dinamis.',
      'Ya, karena sertifikat ISO otomatis mematikan semua hacker di internet.',
      'Tergantung pada merk komputer yang digunakan kampus.'
    ],
    correct: 1,
    exp: 'Tidak ada sistem yang 100% aman. Standar ISO membantu meminimalisir risiko dan mempercepat pemulihan, namun evaluasi dan kewaspadaan tetap wajib berjalan.'
  },
  {
    q: 'Siklus perbaikan tata kelola keamanan yang benar dan berkelanjutan mengikuti alur...',
    opts: [
      'Beli Alat → Pasang → Lupakan selamanya',
      'Implementasi → Monitoring → Evaluasi → Perbaikan (Improvement) → Implementasi ulang',
      'Menunggu Insiden Terjadi → Panik → Ganti Pimpinan',
      'Audit satu kali saat akreditasi lalu abaikan'
    ],
    correct: 1,
    exp: 'Keamanan informasi adalah siklus berulang berkelanjutan (Continual Improvement Cycle) untuk terus beradaptasi dengan teknologi dan ancaman baru.'
  }
];

const P5_SECTION_IDS = [
  'cover', 'tujuan', 'review', 'kebutuhan-gov', 'aturan-praktik',
  'analisis-standar', 'analisis-regulasi', 'analisis-gov', 'policy-control',
  'access-control', 'monitoring-eval', 'studi-kasus', 'analisis-kasus',
  'simulasi-keputusan', 'aktivitas-kelompok', 'diskusi-kelas',
  'kuis-interaktif', 'rangkuman', 'refleksi', 'tugas'
];

// ========================================================
// 2. STATE & INIT
// ========================================================
let p5Visited = new Set();
let p5QuizIndex = 0;
let p5QuizScore = 0;
let p5QuizAnswered = false;

document.addEventListener('DOMContentLoaded', () => {
  initP5Storage();
  initP5Navigation();
  initP5PpcStepper();
  initP5Rbac('cs');
  initP5OrgTabs();
  initP5Quiz();
  initP5Observer();
  updateP5ProgressUI();
});

function initP5Storage() {
  const saved = localStorage.getItem('cs5_visited_sections');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      parsed.forEach(id => p5Visited.add(id));
    } catch (e) {
      console.error(e);
    }
  }

  // Load group analysis
  for (let i = 1; i <= 9; i++) {
    const val = localStorage.getItem(`cs5_group_q${i}`);
    const el = document.getElementById(`groupQ${i}`);
    if (val && el) el.value = val;
  }

  // Load discussion
  const disc = localStorage.getItem('cs5_discussion_notes');
  const discEl = document.getElementById('classDiscussionNotes');
  if (disc && discEl) discEl.value = disc;

  // Load reflection
  const refl = localStorage.getItem('cs5_reflection');
  const reflEl = document.getElementById('studentReflectionP5');
  if (refl && reflEl) reflEl.value = refl;
}

// ========================================================
// 3. NAVIGATION & OBSERVER
// ========================================================
function initP5Navigation() {
  const btn = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (btn && sidebar && overlay) {
    btn.addEventListener('click', () => {
      const open = sidebar.classList.contains('mobile-open');
      if (open) {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        sidebar.classList.add('mobile-open');
        overlay.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    overlay.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    });

    sidebar.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('mobile-open');
          overlay.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  const resetBtn = document.getElementById('btnResetAll');
  if (resetBtn) resetBtn.addEventListener('click', resetP5All);
}

function initP5Observer() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (id) {
          p5Visited.add(id);
          localStorage.setItem('cs5_visited_sections', JSON.stringify([...p5Visited]));
          highlightP5Sidebar(id);
          updateP5ProgressUI();
        }
      }
    });
  }, { threshold: 0.25 });

  P5_SECTION_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) obs.observe(el);
  });
}

function highlightP5Sidebar(currentId) {
  document.querySelectorAll('.sidebar .nav-link').forEach(link => {
    const target = link.getAttribute('data-section');
    if (target === currentId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
    if (p5Visited.has(target)) {
      link.classList.add('visited');
    }
  });
}

function updateP5ProgressUI() {
  const count = p5Visited.size;
  const total = P5_SECTION_IDS.length;
  const pct = Math.min(100, Math.round((count / total) * 100));

  const text = document.getElementById('topbarProgressPercent');
  const bar = document.getElementById('topbarProgressBar');
  if (text) text.textContent = `${pct}%`;
  if (bar) bar.style.width = `${pct}%`;
}

window.navigateP5Step = function(direction) {
  const currentHash = window.location.hash.replace('#', '') || 'cover';
  const currIndex = P5_SECTION_IDS.indexOf(currentHash);
  let nextIndex = currIndex + direction;

  if (nextIndex < 0) nextIndex = 0;
  if (nextIndex >= P5_SECTION_IDS.length) nextIndex = P5_SECTION_IDS.length - 1;

  const nextId = P5_SECTION_IDS[nextIndex];
  const target = document.getElementById(nextId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
    window.location.hash = nextId;
  }
};

window.resetP5All = function() {
  if (confirm('Reset seluruh progress belajar Pertemuan 5?')) {
    p5Visited.clear();
    localStorage.removeItem('cs5_visited_sections');
    updateP5ProgressUI();
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
      link.classList.remove('visited', 'active');
    });
    window.location.hash = 'cover';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showP5Toast('Progress belajar Pertemuan 5 berhasil direset.', '↺');
  }
};

// ========================================================
// 4. FLOW DETAILS & CHECKLIST
// ========================================================
window.showP5FlowDetail = function(stepNum) {
  const data = P5_FLOW_DETAILS[stepNum];
  if (!data) return;

  const modal = document.getElementById('p5Modal');
  const title = document.getElementById('p5ModalTitle');
  const content = document.getElementById('p5ModalContent');
  if (modal && title && content) {
    title.textContent = data.title;
    content.innerHTML = `<p>${data.text}</p>`;
    modal.classList.add('active');
  }
};

window.showGovMapDetail = function(key) {
  const data = GOV_MAP_DETAILS[key];
  if (!data) return;

  const modal = document.getElementById('p5Modal');
  const title = document.getElementById('p5ModalTitle');
  const content = document.getElementById('p5ModalContent');
  if (modal && title && content) {
    title.textContent = data.title;
    content.innerHTML = `<p>${data.text}</p>`;
    modal.classList.add('active');
  }
};

window.closeP5Modal = function() {
  const modal = document.getElementById('p5Modal');
  if (modal) modal.classList.remove('active');
};

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

window.toggleCheckItem = function(rowEl) {
  rowEl.classList.toggle('checked');
};

// ========================================================
// 5. POLICY -> PROCEDURE -> CONTROL STEPPER
// ========================================================
function initP5PpcStepper() {
  const buttons = document.querySelectorAll('.ppc-step-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const step = btn.getAttribute('data-step');
      const data = PPC_STAGES[step];
      if (data) {
        const pill = document.getElementById('ppcStagePill');
        const desc = document.getElementById('ppcStageDesc');
        const title = document.getElementById('ppcTitle');
        const body = document.getElementById('ppcBody');

        if (pill) {
          pill.textContent = data.pill;
          pill.className = `section-pill ${data.pillClass}`;
        }
        if (desc) desc.textContent = data.desc;
        if (title) title.textContent = data.title;
        if (body) body.textContent = data.body;
      }
    });
  });
}

// ========================================================
// 6. RBAC SIMULATOR
// ========================================================
function initP5Rbac(initialRole) {
  const buttons = document.querySelectorAll('.rbac-role-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderRbacRole(btn.getAttribute('data-role'));
    });
  });
  renderRbacRole(initialRole);
}

function renderRbacRole(roleKey) {
  const matrix = document.getElementById('rbacMatrixGrid');
  const role = RBAC_DATA[roleKey];
  if (!matrix || !role) return;

  matrix.innerHTML = '';
  role.resources.forEach(res => {
    const card = document.createElement('div');
    card.className = 'rbac-resource-card';

    let badgeClass = 'badge-access-denied';
    let badgeText = '⛔ DITOLAK (DENIED)';
    if (res.status === 'ACCESS') {
      badgeClass = 'badge-access-granted';
      badgeText = '✅ DISETUJUI (ACCESS)';
    } else if (res.status === 'LIMITED') {
      badgeClass = 'badge-access-limited';
      badgeText = '⚠️ TERBATAS (LIMITED)';
    }

    card.innerHTML = `
      <div>
        <strong style="color:var(--text-white); font-size:14px; display:block; margin-bottom:6px;">${res.name}</strong>
        <p style="font-size:12.5px; color:var(--text-secondary); line-height:1.5;">${res.desc}</p>
      </div>
      <span class="badge-access-status ${badgeClass}">${badgeText}</span>
    `;
    matrix.appendChild(card);
  });
}

// ========================================================
// 7. SIMULASI PENGAMBILAN KEPUTUSAN
// ========================================================
window.checkDecision = function(scenarioNum, choiceLetter, isCorrect) {
  const card = document.querySelector(`.decision-scenario-card[data-scenario="${scenarioNum}"]`);
  if (!card) return;

  const buttons = card.querySelectorAll('.decision-opt-btn');
  const fb = card.querySelector('.decision-feedback');

  buttons.forEach(b => {
    b.disabled = true;
    b.classList.remove('correct', 'wrong');
  });

  const clicked = Array.from(buttons).find(b => b.textContent.startsWith(choiceLetter));
  if (isCorrect) {
    if (clicked) clicked.classList.add('correct');
    if (fb) {
      fb.style.display = 'block';
      fb.style.background = 'rgba(16, 185, 129, 0.15)';
      fb.style.border = '1px solid var(--success)';
      fb.style.color = '#a7f3d0';
      fb.innerHTML = `<strong>Tepat Sekali!</strong> Keputusan ini mencerminkan tata kelola keamanan profesional dengan menerapkan kontrol perlindungan proporsional tanpa mengorbankan operasional bisnis.`;
    }
    showP5Toast('Keputusan Tepat!', '✅');
  } else {
    if (clicked) clicked.classList.add('wrong');
    if (fb) {
      fb.style.display = 'block';
      fb.style.background = 'rgba(239, 68, 68, 0.15)';
      fb.style.border = '1px solid var(--danger)';
      fb.style.color = '#fca5a5';
      fb.innerHTML = `<strong>Kurang Tepat.</strong> Tindakan tersebut dapat menimbulkan kerentanan baru atau menghentikan aktivitas bisnis secara ekstrem. Pilihlah langkah pengetatan tata kelola yang terukur.`;
    }
  }
};

// ========================================================
// 8. AKTIVITAS KELOMPOK, DISKUSI, REFLEKSI
// ========================================================
function initP5OrgTabs() {
  const tabs = document.querySelectorAll('.org-tab-btn');
  tabs.forEach(t => {
    t.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      t.classList.add('active');
      showP5Toast(`Organisasi terpilih: ${t.textContent}`, '🏢');
    });
  });
}

window.saveGroupAnalysis = function() {
  for (let i = 1; i <= 9; i++) {
    const val = document.getElementById(`groupQ${i}`)?.value || '';
    localStorage.setItem(`cs5_group_q${i}`, val);
  }
  showP5Toast('Rancangan tata kelola kelompok berhasil disimpan!', '💾');
};

window.saveDiscussionNotes = function() {
  const val = document.getElementById('classDiscussionNotes')?.value || '';
  localStorage.setItem('cs5_discussion_notes', val);
  showP5Toast('Catatan diskusi kelas berhasil disimpan!', '💾');
};

window.saveReflectionP5 = function() {
  const val = document.getElementById('studentReflectionP5')?.value || '';
  localStorage.setItem('cs5_reflection', val);
  showP5Toast('Refleksi manajerial berhasil disimpan!', '💾');
};

// ========================================================
// 9. COMPREHENSIVE QUIZ (12 QUESTIONS)
// ========================================================
function initP5Quiz() {
  p5QuizIndex = 0;
  p5QuizScore = 0;
  renderP5QuizQ();
}

function renderP5QuizQ() {
  p5QuizAnswered = false;
  const current = P5_QUIZ_QUESTIONS[p5QuizIndex];
  const qNum = document.getElementById('quizQNumP5');
  const qText = document.getElementById('quizQuestionTextP5');
  const container = document.getElementById('quizOptionsContainerP5');
  const expBox = document.getElementById('quizExpBoxP5');
  const nextBtn = document.getElementById('btnQuizNextP5');
  const fill = document.getElementById('quizProgressFillP5');

  if (qNum) qNum.textContent = `SOAL ${String(p5QuizIndex + 1).padStart(2, '0')} / 12`;
  if (qText) qText.textContent = current.q;
  if (expBox) expBox.style.display = 'none';
  if (nextBtn) nextBtn.style.display = 'none';

  if (fill) {
    const pct = ((p5QuizIndex + 1) / P5_QUIZ_QUESTIONS.length) * 100;
    fill.style.width = `${pct}%`;
  }

  if (container) {
    container.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    current.opts.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<strong class="mono">${letters[idx]}.</strong> <span>${opt}</span>`;
      btn.onclick = () => selectP5QuizAnswer(idx, btn);
      container.appendChild(btn);
    });
  }
}

function selectP5QuizAnswer(selectedIdx, btnElement) {
  if (p5QuizAnswered) return;
  p5QuizAnswered = true;

  const current = P5_QUIZ_QUESTIONS[p5QuizIndex];
  const allBtns = document.querySelectorAll('#quizOptionsContainerP5 .quiz-option-btn');
  const expBox = document.getElementById('quizExpBoxP5');
  const expText = document.getElementById('quizExpTextP5');
  const nextBtn = document.getElementById('btnQuizNextP5');

  allBtns.forEach((b, idx) => {
    b.disabled = true;
    if (idx === current.correct) {
      b.classList.add('selected-correct');
    }
  });

  if (selectedIdx === current.correct) {
    p5QuizScore += Math.round(100 / P5_QUIZ_QUESTIONS.length);
    btnElement.classList.add('selected-correct');
    showP5Toast('Jawaban Benar!', '🎉');
  } else {
    btnElement.classList.add('selected-wrong');
    showP5Toast('Jawaban Salah. Pelajari pembahasannya.', '⚠️');
  }

  if (expBox && expText) {
    expText.textContent = current.exp;
    expBox.style.display = 'block';
  }

  if (nextBtn) {
    nextBtn.style.display = 'inline-flex';
    if (p5QuizIndex === P5_QUIZ_QUESTIONS.length - 1) {
      nextBtn.querySelector('span').textContent = 'LIHAT HASIL KUIS →';
    } else {
      nextBtn.querySelector('span').textContent = 'SOAL BERIKUTNYA →';
    }
  }
}

window.nextQuizP5 = function() {
  p5QuizIndex++;
  if (p5QuizIndex < P5_QUIZ_QUESTIONS.length) {
    renderP5QuizQ();
  } else {
    showP5QuizResult();
  }
};

function showP5QuizResult() {
  const card = document.getElementById('quizCardP5');
  const resCard = document.getElementById('quizResultCardP5');
  const scoreText = document.getElementById('quizScoreTextP5');
  const badge = document.getElementById('quizBadgeP5');
  const msg = document.getElementById('quizMsgP5');

  if (card) card.style.display = 'none';
  if (resCard) resCard.style.display = 'block';

  // Cap score max 100
  const finalScore = Math.min(100, p5QuizScore);
  if (scoreText) scoreText.textContent = `${finalScore} / 100`;

  if (badge && msg) {
    if (finalScore >= 90) {
      badge.textContent = '🌟 Kategori: Sangat Baik';
      badge.style.background = 'rgba(74, 222, 128, 0.2)';
      badge.style.color = '#86efac';
      badge.style.border = '1px solid var(--color-control)';
      msg.textContent = 'Luar biasa! Anda menguasai analisis penerapan standar, regulasi UU PDP, kontrol RBAC, dan tata kelola organisasi secara mendalam.';
    } else if (finalScore >= 75) {
      badge.textContent = '👍 Kategori: Baik';
      badge.style.background = 'rgba(56, 189, 248, 0.2)';
      badge.style.color = '#7dd3fc';
      badge.style.border = '1px solid var(--color-standar)';
      msg.textContent = 'Bagus sekali! Pemahaman analisis kontrol dan prosedur operasional Anda sudah sangat solid.';
    } else if (finalScore >= 60) {
      badge.textContent = '⚡ Kategori: Cukup';
      badge.style.background = 'rgba(250, 204, 21, 0.2)';
      badge.style.color = '#fde047';
      badge.style.border = '1px solid var(--color-evaluation)';
      msg.textContent = 'Cukup baik. Disarankan untuk menelaah kembali perbedaan monitoring vs evaluasi serta matriks solusi studi kasus.';
    } else {
      badge.textContent = '📖 Pelajari Kembali Materi';
      badge.style.background = 'rgba(239, 68, 68, 0.2)';
      badge.style.color = '#fca5a5';
      badge.style.border = '1px solid var(--danger)';
      msg.textContent = 'Skor Anda masih di bawah standar kelulusan modul. Silakan baca materi dari awal dan ikuti kuis kembali.';
    }
  }
}

window.restartQuizP5 = function() {
  p5QuizIndex = 0;
  p5QuizScore = 0;
  const card = document.getElementById('quizCardP5');
  const resCard = document.getElementById('quizResultCardP5');
  if (card) card.style.display = 'block';
  if (resCard) resCard.style.display = 'none';
  renderP5QuizQ();
};

// ========================================================
// 10. CLIPBOARD TASK COPY & TOAST
// ========================================================
window.copyTaskP5Instructions = function() {
  const text = `TUGAS 1 (RPS Rangkaian Pertemuan 4–5):
RINGKASAN STANDAR, REGULASI, DAN TATA KELOLA KEAMANAN SIBER
Mata Kuliah: Cyber Security Management (BWP5030) - Bisnis Digital

INSTRUKSI PENUGASAN:
Buat ringkasan minimal 2 halaman mengenai Standar, Regulasi, dan Tata Kelola Keamanan Siber dengan pembahasan mencakup:
1. Pengertian standar keamanan siber dan urgensinya.
2. Pengertian regulasi keamanan data dan contoh peraturan yang berlaku (UU PDP No. 27/2022).
3. Pengertian tata kelola keamanan siber (governance).
4. Perbedaan mendasar antara standar dan regulasi.
5. Contoh standar/framework keamanan siber (ISO/IEC 27001 dan NIST CSF 2.0).
6. Contoh regulasi yang relevan di Indonesia.
7. Contoh penerapan kontrol nyata pada organisasi.
8. Kesimpulan dan rekomendasi manajerial.

KETENTUAN TUGAS:
- Bentuk: Individu Mandiri
- Minimal: 2 Halaman
- Format: PDF (Times New Roman 12, Spasi 1.5, Kertas A4)
- Referensi: Minimal 2 rujukan resmi/ilmiah
- Bobot Penilaian: 5% terhadap Nilai Akhir Perkuliahan`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showP5Toast('Instruksi tugas berhasil disalin ke clipboard!', '📋'))
      .catch(() => fallbackP5Copy(text));
  } else {
    fallbackP5Copy(text);
  }
};

function fallbackP5Copy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showP5Toast('Instruksi tugas berhasil disalin ke clipboard!', '📋');
}

function showP5Toast(message, icon = '✅') {
  const toast = document.getElementById('p5Toast');
  const toastText = document.getElementById('p5ToastText');
  const toastIcon = document.getElementById('p5ToastIcon');

  if (!toast || !toastText) return;

  toastText.textContent = message;
  if (toastIcon) toastIcon.textContent = icon;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
