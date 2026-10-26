/* ========================================================
   CYBER SECURITY MANAGEMENT - PERTEMUAN 6
   Ancaman dan Kerentanan Sistem Informasi
   script.js - Pure Vanilla JavaScript
   ======================================================== */

'use strict';

// ========================================================
// 1. DATA & CONSTANTS
// ========================================================

const THREAT_MODAL_DATA = {
  malware: {
    title: '🦠 MALWARE (Malicious Software)',
    desc: 'Perangkat lunak berbahaya yang sengaja diciptakan untuk menyusup, merusak, atau mencuri data dari perangkat komputer tanpa izin pemiliknya.',
    example: 'Penyusupan virus trojan melalui file installer software bajakan atau file dokumen berformat makro berbahaya.',
    target: 'Komputer pengguna, server kampus, smartphone, dan perangkat IoT.',
    impact: 'Pencurian file, kerusakan sistem operasi, penurunan kinerja perangkat, dan pencurian kredensial.',
    prevention: 'Pasang antivirus terpercaya, update OS secara rutin, dan hindari mengunduh file dari sumber ilegal.'
  },
  phishing: {
    title: '🎣 PHISHING',
    desc: 'Metode penipuan digital di mana peretas menyamar sebagai pihak terpercaya (kampus, bank, media sosial) untuk memancing korban memasukkan kredensial login atau nomor kartu kredit.',
    example: 'Email mendesak mengatasnamakan admin SIAKAD dengan link login palsu berdomain tiruan.',
    target: 'Mahasiswa, staf administrasi, dosen, dan nasabah perbankan.',
    impact: 'Pengambilalihan akun resmi (account takeover) dan penyalahgunaan identitas.',
    prevention: 'Periksa keaslian domain URL sebelum login, jangan klik link mendadak di email, dan aktifkan MFA.'
  },
  ransomware: {
    title: '🔒 RANSOMWARE',
    desc: 'Varian malware berbahaya yang mengenkripsi file penting di komputer atau jaringan korban sehingga tidak bisa dibuka, kemudian menuntut uang tebusan (ransom) untuk kunci pemulihannya.',
    example: 'Serangan WannaCry atau LockBit yang melumpuhkan data rumah sakit dan pusat data akademik.',
    target: 'Basis data institusi pendidikan, rumah sakit, instansi pemerintah, dan korporasi.',
    impact: 'Kelumpuhan operasional total, pemerasan finansial miliaran rupiah, dan potensi kehilangan data permanen.',
    prevention: 'Rutin mencadangkan data (3-2-1 backup offline) dan mematikan port protokol Remote Desktop (RDP) yang tidak terlindungi.'
  },
  dos: {
    title: '🌊 DoS / DDoS (Denial of Service)',
    desc: 'Serangan yang bertujuan melumpuhkan ketersediaan (Availability) layanan sistem dengan cara membanjiri server menggunakan jutaan paket data palsu secara bersamaan dari ribuan botnet.',
    example: 'Portal registrasi KRS kampus mendadak tumbang dan lambat diakses karena dibanjiri jutaan traffic palsu.',
    target: 'Web server akademik, API server pembayaran, dan gateway jaringan kampus.',
    impact: 'Layanan web mati (downtime), mahasiswa tidak bisa mengisi KRS, kerugian reputasi institusi.',
    prevention: 'Implementasi Web Application Firewall (WAF), rate limiting, dan layanan proteksi mitigasi DDoS (seperti Cloudflare).'
  },
  social: {
    title: '🎭 SOCIAL ENGINEERING (Rekayasa Sosial)',
    desc: 'Teknik manipulasi psikologis yang mengeksploitasi kelemahan sifat dasar manusia (rasa panik, percaya, terburu-buru, penasaran) agar memberikan informasi rahasia.',
    example: 'Pelaku menelpon mengaku staf rektorat meminta kode OTP login akun email kampus korban.',
    target: 'Seluruh lapisan pengguna manusia (staf, dosen, mahasiswa).',
    impact: 'Bocorya data rahasia tanpa peretas perlu membobol firewall secara teknis.',
    prevention: 'Pelatihan rutin kesadaran keamanan (security awareness) dan kebijakan ketat: OTP dilarang dibagikan ke siapa pun.'
  },
  password: {
    title: '🔑 PASSWORD ATTACK',
    desc: 'Serangan untuk meretas kata sandi akun menggunakan metode tebakan berulang (Brute Force), pencocokan kamus kata sandi bocor (Dictionary Attack), atau pencurian hash.',
    example: 'Peretas menggunakan program otomatis untuk mencoba 10.000 kombinasi kata sandi umum pada akun admin.',
    target: 'Halaman login web admin, akun email, database server, dan SSH server.',
    impact: 'Penyusupan akun administrator dan manipulasi basis data.',
    prevention: 'Gunakan kata sandi kuat (min 12 karakter alfanumerik acak), batas percobaan login (account lockout), dan wajibkan MFA.'
  },
  insider: {
    title: '🕵️ INSIDER THREAT',
    desc: 'Ancaman keamanan yang berasal dari dalam organisasi sendiri, seperti pegawai, mantan staf, atau mitra kerja yang menyalahgunakan hak akses resmi miliknya.',
    example: 'Staf internal menyalin data ribuan nomor telepon dan alamat mahasiswa lalu menjualnya ke pihak ketiga.',
    target: 'Basis data sensitif internal, rahasia institusi, dan data pribadi civitas academica.',
    impact: 'Kebocoran data massal, tuntutan hukum UU PDP, dan hilangnya kepercayaan publik.',
    prevention: 'Terapkan prinsip Least Privilege, audit log aktivitas berkala, dan penonaktifan akun instan bagi staf yang mutasi/keluar.'
  }
};

const DETECTIVE_CASES = [
  {
    num: 'KASUS 1 DARI 3',
    scenario: '"Seorang mahasiswa menerima email yang memintanya login memverifikasi akun melalui tautan eksternal tidak dikenal."',
    correctThreat: 'phishing',
    correctVuln: 'awareness',
    threatName: 'Phishing',
    vulnName: 'Kurangnya Kewaspadaan Pengguna'
  },
  {
    num: 'KASUS 2 DARI 3',
    scenario: '"Server kampus mendadak tidak dapat diakses dan hang karena menerima jutaan permintaan koneksi palsu secara serentak."',
    correctThreat: 'ddos',
    correctVuln: 'network',
    threatName: 'DoS / DDoS',
    vulnName: 'Perlindungan Jaringan Lemah'
  },
  {
    num: 'KASUS 3 DARI 3',
    scenario: '"Seorang staf kampus menggunakan kata sandi sederhana yang sama (admin123) untuk seluruh akun portal kerja."',
    correctThreat: 'password_attack',
    correctVuln: 'weak_pass',
    threatName: 'Password Attack',
    vulnName: 'Password Lemah / Reuse Password'
  }
];

const P6_QUIZ_QUESTIONS = [
  {
    q: 'Apa pengertian yang paling tepat mengenai "Threat" dalam keamanan siber?',
    opts: [
      'Kelemahan atau celah konfigurasi pada perangkat lunak.',
      'Sesuatu yang berpotensi menyebabkan bahaya atau kerugian pada sistem dan data.',
      'Kombinasi password yang sulit ditebak oleh orang lain.',
      'Sertifikat kelulusan mata kuliah bisnis digital.'
    ],
    correct: 1,
    exp: 'Threat (Ancaman) adalah faktor atau potensi kejadian yang dapat merusak, mencuri, atau mengganggu aset informasi.'
  },
  {
    q: 'Pernyataan: "Sebuah komputer kampus menggunakan sistem operasi usang yang tidak pernah diperbarui selama 2 tahun". Hal tersebut tergolong ke dalam...',
    opts: [
      'Threat',
      'Vulnerability (Kerentanan)',
      'Impact',
      'Firewall'
    ],
    correct: 1,
    exp: 'Sistem operasi usang adalah kelemahan (vulnerability) internal yang belum ditambal dan siap dieksploitasi oleh ancaman siber.'
  },
  {
    q: 'Hubungan yang benar antara Threat, Vulnerability, Risk, dan Impact adalah...',
    opts: [
      'Impact memanfaatkan Threat menghasilkan Vulnerability.',
      'Threat mengeksploitasi Vulnerability, menciptakan Risk yang dapat menimbulkan Impact kerugian.',
      'Risk adalah nama lain dari antivirus.',
      'Vulnerability menghapus Threat sehingga tidak ada Risk.'
    ],
    correct: 1,
    exp: 'Formula keamanan siber: Ancaman mengeksploitasi Kerentanan sehingga memunculkan Risiko yang memicu Dampak nyata.'
  },
  {
    q: 'Jenis malware yang mengunci/mengenkripsi seluruh file di komputer korban dan memeras uang tebusan disebut...',
    opts: [
      'Adware',
      'Ransomware',
      'Spyware',
      'Worm'
    ],
    correct: 1,
    exp: 'Ransomware mengenkripsi dokumen penting dan meminta tebusan (ransom) untuk mendapatkan kunci dekripsi.'
  },
  {
    q: 'Ciri utama yang sering ditemukan pada pesan email Phishing adalah...',
    opts: [
      'Menggunakan alamat email resmi berdomain kampus (.ac.id).',
      'Menciptakan rasa panik/mendesak dan menyertakan tautan login palsu.',
      'Tidak meminta informasi password atau data sensitif apa pun.',
      'Dikirim oleh dosen secara tatap muka di kelas.'
    ],
    correct: 1,
    exp: 'Email phishing kerap memicu kepanikan (urgency) agar korban tergesa-gesa mengklik tautan palsu tanpa memeriksa domain.'
  },
  {
    q: 'Tujuan utama dari serangan Denial-of-Service (DoS / DDoS) adalah merusak prinsip keamanan...',
    opts: [
      'Confidentiality (Kerahasiaan)',
      'Integrity (Keutuhan Data)',
      'Availability (Ketersediaan Layanan)',
      'Non-repudiation'
    ],
    correct: 2,
    exp: 'DoS/DDoS membanjiri kapasitas server sehingga layanan down dan pengguna sah tidak dapat mengaksesnya (merusak Availability).'
  },
  {
    q: 'Upaya menebak ribuan kombinasi kata sandi secara berulang dan otomatis menggunakan komputer disebut...',
    opts: [
      'Brute Force Attack',
      'Social Engineering',
      'Phishing',
      'SQL Injection'
    ],
    correct: 0,
    exp: 'Brute Force Attack mencoba seluruh kemungkinan kombinasi karakter password hingga menemukan yang cocok.'
  },
  {
    q: 'Seseorang menelepon staf kasir dan berpura-pura menjadi atasan untuk meminta transfer dana darurat. Serangan ini merupakan contoh...',
    opts: [
      'Malware',
      'Social Engineering (Rekayasa Sosial)',
      'DDoS Attack',
      'Deface Web'
    ],
    correct: 1,
    exp: 'Social engineering memanfaatkan manipulasi psikologis manusia untuk memperoleh keuntungan atau akses informasi rahasia.'
  },
  {
    q: 'Ancaman keamanan yang timbul karena pegawai internal menyalahgunakan hak akses resmi yang dimilikinya disebut...',
    opts: [
      'External Threat',
      'Insider Threat',
      'Zero-day Attack',
      'Network Sniffing'
    ],
    correct: 1,
    exp: 'Insider Threat dilakukan oleh pihak internal (karyawan, kontraktor) yang memiliki izin akses resmi ke sistem.'
  },
  {
    q: 'Langkah pencegahan paling efektif untuk menahan serangan password attack pada akun administrator adalah...',
    opts: [
      'Menggunakan password tanggal lahir.',
      'Menerapkan kata sandi kompleks, batas percobaan login, dan Multi-Factor Authentication (MFA).',
      'Menempelkan kertas password di samping monitor.',
      'Mematikan layar komputer saat malam hari.'
    ],
    correct: 1,
    exp: 'Kombinasi password panjang, lockout account setelah beberapa kali gagal, dan MFA memberikan proteksi berlapis yang sangat andal.'
  }
];

const P6_SECTION_IDS = [
  'cover', 'tujuan', 'apersepsi', 'threat', 'vulnerability',
  'threat-vs-vuln', 'threat-types', 'malware', 'phishing', 'dos-ddos',
  'password-attack', 'social-engineering', 'insider-threat',
  'klasifikasi-ancaman', 'temukan-kerentanan', 'studi-kasus',
  'attack-chain', 'cyber-detective', 'diskusi-kelompok', 'kuis',
  'ringkasan', 'refleksi', 'tugas', 'progress-belajar'
];

// ========================================================
// 2. STATE VARIABLES
// ========================================================
let p6Visited = new Set();
let detectiveIndex = 0;
let detectiveScore = 0;
let p6QuizIndex = 0;
let p6QuizScore = 0;
let p6QuizAnswered = false;

// ========================================================
// 3. INITIALIZATION
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  initP6Storage();
  initP6Navigation();
  initP6Observer();
  initP6Detective();
  initP6Quiz();
  updateP6ProgressUI();
});

function initP6Storage() {
  const saved = localStorage.getItem('cs6_visited_sections');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      parsed.forEach(id => p6Visited.add(id));
    } catch (e) {
      console.error(e);
    }
  }

  // Load case study answers
  for (let i = 1; i <= 4; i++) {
    const val = localStorage.getItem(`cs6_case_q${i}`);
    const el = document.getElementById(`caseAnalysisQ${i}`);
    if (val && el) el.value = val;
  }

  // Load group discussion
  const arg = localStorage.getItem('cs6_group_argument');
  const argEl = document.getElementById('groupDiscussionArgument');
  if (arg && argEl) argEl.value = arg;

  // Load reflection
  for (let i = 1; i <= 3; i++) {
    const val = localStorage.getItem(`cs6_reflection_q${i}`);
    const el = document.getElementById(`reflQ${i}`);
    if (val && el) el.value = val;
  }
}

// ========================================================
// 4. NAVIGATION & OBSERVER
// ========================================================
function initP6Navigation() {
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

  const resetBtn = document.getElementById('btnResetProgress');
  if (resetBtn) resetBtn.addEventListener('click', resetP6All);
}

function initP6Observer() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (id) {
          p6Visited.add(id);
          localStorage.setItem('cs6_visited_sections', JSON.stringify([...p6Visited]));
          highlightP6Sidebar(id);
          updateP6ProgressUI();
        }
      }
    });
  }, { threshold: 0.25 });

  P6_SECTION_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) obs.observe(el);
  });
}

function highlightP6Sidebar(currentId) {
  document.querySelectorAll('.sidebar .nav-link').forEach(link => {
    const target = link.getAttribute('data-section');
    if (target === currentId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
    if (p6Visited.has(target)) {
      link.classList.add('visited');
    }
  });
}

function updateP6ProgressUI() {
  const count = p6Visited.size;
  const total = P6_SECTION_IDS.length;
  const pct = Math.min(100, Math.round((count / total) * 100));

  const text = document.getElementById('topbarProgressPercent');
  const bar = document.getElementById('topbarProgressBar');
  if (text) text.textContent = `${pct}%`;
  if (bar) bar.style.width = `${pct}%`;

  const sumText = document.getElementById('summaryProgressTextP6');
  const sumCount = document.getElementById('summarySectionsCountP6');
  const sumBar = document.getElementById('summaryProgressBarP6');
  if (sumText) sumText.textContent = `${pct}%`;
  if (sumCount) sumCount.textContent = `${count} dari ${total} bagian materi telah dipelajari.`;
  if (sumBar) sumBar.style.width = `${pct}%`;
}

window.navigateP6Step = function(direction) {
  const currentHash = window.location.hash.replace('#', '') || 'cover';
  const currIndex = P6_SECTION_IDS.indexOf(currentHash);
  let nextIndex = currIndex + direction;

  if (nextIndex < 0) nextIndex = 0;
  if (nextIndex >= P6_SECTION_IDS.length) nextIndex = P6_SECTION_IDS.length - 1;

  const nextId = P6_SECTION_IDS[nextIndex];
  const target = document.getElementById(nextId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
    window.location.hash = nextId;
  }
};

window.resetP6All = function() {
  if (confirm('Apakah Anda yakin ingin mereset seluruh progres belajar Pertemuan 6?')) {
    p6Visited.clear();
    localStorage.removeItem('cs6_visited_sections');
    updateP6ProgressUI();
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
      link.classList.remove('visited', 'active');
    });
    window.location.hash = 'cover';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showP6Toast('Progres belajar Pertemuan 6 berhasil direset.', '↺');
  }
};

// ========================================================
// 5. APERSEPSI & THREAT MODAL
// ========================================================
window.checkApersepsi = function(choice) {
  const btnThreat = document.getElementById('btnApersepsiThreat');
  const btnVuln = document.getElementById('btnApersepsiVuln');
  const fb = document.getElementById('apersepsiFeedback');

  if (btnThreat) btnThreat.classList.remove('selected');
  if (btnVuln) btnVuln.classList.remove('selected');

  if (choice === 'vuln') {
    if (btnVuln) btnVuln.classList.add('selected');
    if (fb) {
      fb.style.display = 'block';
      fb.style.background = 'rgba(16, 185, 129, 0.15)';
      fb.style.border = '1px solid var(--green-digital)';
      fb.style.color = '#86efac';
      fb.innerHTML = `<strong>Tepat Sekali (Vulnerability)!</strong> Password "123456" adalah <em>kelemahan internal</em> pada autentikasi yang dapat dieksploitasi oleh penyerang. Serangan penebakan kata sandi (Password Attack) barulah yang disebut sebagai <em>Ancaman (Threat)</em>.`;
    }
    showP6Toast('Jawaban Tepat!', '✅');
  } else {
    if (btnThreat) btnThreat.classList.add('selected');
    if (fb) {
      fb.style.display = 'block';
      fb.style.background = 'rgba(239, 68, 68, 0.15)';
      fb.style.border = '1px solid var(--danger-red)';
      fb.style.color = '#fca5a5';
      fb.innerHTML = `<strong>Kurang Tepat.</strong> Password yang lemah merupakan <strong>Vulnerability (Kerentanan)</strong>, karena ia adalah cacat/celah internal sistem. Ancaman (Threat) adalah pihak luar atau program yang mencoba menebak password tersebut.`;
    }
  }
};

window.openThreatModal = function(type) {
  const data = THREAT_MODAL_DATA[type];
  if (!data) return;

  const modal = document.getElementById('threatDetailModal');
  const title = document.getElementById('threatModalTitle');
  const body = document.getElementById('threatModalBody');

  if (modal && title && body) {
    title.textContent = data.title;
    body.innerHTML = `
      <p style="margin-bottom:12px;"><strong>Pengertian:</strong> ${data.desc}</p>
      <div style="background:var(--bg-surface); padding:14px; border-radius:var(--radius-sm); border:1px solid var(--border); margin-bottom:12px;">
        <strong style="color:var(--cyan); display:block; margin-bottom:4px;">Contoh Kejadian:</strong>
        <p style="color:var(--text-main); font-size:13px;">${data.example}</p>
      </div>
      <p style="margin-bottom:6px;"><strong>Target Utama:</strong> ${data.target}</p>
      <p style="margin-bottom:6px;"><strong>Dampak Kerugian:</strong> <span style="color:#fca5a5;">${data.impact}</span></p>
      <p style="margin-top:10px; color:#86efac;"><strong>Contoh Pencegahan:</strong> ${data.prevention}</p>
    `;
    modal.classList.add('active');
  }
};

window.closeThreatModal = function() {
  const modal = document.getElementById('threatDetailModal');
  if (modal) modal.classList.remove('active');
};

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// ========================================================
// 6. PHISHING, DoS & PASSWORD ATTACK SIMULATION
// ========================================================
window.checkPhishingSim = function(choice) {
  const fb = document.getElementById('phishingFeedbackBox');
  if (!fb) return;

  fb.style.display = 'block';
  if (choice === 'phishing') {
    fb.style.background = 'rgba(16, 185, 129, 0.15)';
    fb.style.border = '1px solid var(--green-digital)';
    fb.style.color = '#86efac';
    fb.innerHTML = `
      <strong>Analisis Anda Benar! Email ini adalah Phishing Berbahaya.</strong><br>
      Indikator penipuan:
      <ul style="margin:6px 0 0 18px;">
        <li>Domain pengirim palsu (.xyz, bukan domain resmi kampus .ac.id).</li>
        <li>Tekanan psikologis mendesak ("Akun dinonaktifkan dalam 24 jam").</li>
        <li>Tautan URL tidak resmi (<code>siakad-update-login-security.net</code>).</li>
      </ul>
    `;
    showP6Toast('Deteksi Phishing Berhasil!', '✅');
  } else {
    fb.style.background = 'rgba(239, 68, 68, 0.15)';
    fb.style.border = '1px solid var(--danger-red)';
    fb.style.color = '#fca5a5';
    fb.innerHTML = `
      <strong>Hati-hati! Email ini adalah Phishing Palsu.</strong><br>
      Jika Anda mengklik tautan tersebut dan memasukkan password, kredensial akun SIAKAD Anda akan langsung dicuri peretas.
    `;
  }
};

window.setDosMode = function(mode) {
  const server = document.getElementById('dosServerIcon');
  const status = document.getElementById('dosServerStatusText');
  const source = document.getElementById('dosTrafficSource');
  const arrow = document.getElementById('dosArrowIcon');
  const exp = document.getElementById('dosExplanationText');

  if (mode === 'attack') {
    if (server) server.className = 'dos-server-icon overloaded';
    if (status) {
      status.textContent = 'SERVER DOWN! (OVERLOAD)';
      status.style.color = 'var(--danger-red)';
    }
    if (source) {
      source.innerHTML = `
        <span style="color:var(--danger-red);">💥 Botnet 1: 50.000 req/dtk</span><br>
        <span style="color:var(--danger-red);">💥 Botnet 2: 120.000 req/dtk</span><br>
        <span style="color:var(--danger-red);">💥 Botnet 3: 200.000 req/dtk</span>
      `;
    }
    if (arrow) {
      arrow.textContent = '⚡⚡⚡ BANJIR ⚡⚡⚡';
      arrow.style.color = 'var(--danger-red)';
    }
    if (exp) {
      exp.innerHTML = '<strong style="color:var(--danger-red);">Kondisi DDoS:</strong> Sumber daya CPU & bandwidth server habis terkuras melayani request palsu, sehingga mahasiswa sah gagal membuka portal (Error 504 Gateway Timeout).';
    }
    showP6Toast('Simulasi DDoS Dilancarkan!', '⚠️');
  } else {
    if (server) server.className = 'dos-server-icon';
    if (status) {
      status.textContent = 'SERVER SEHAT';
      status.style.color = 'var(--green-digital)';
    }
    if (source) {
      source.innerHTML = `
        👤 Mahasiswa 1 • Akses KRS<br>
        👤 Mahasiswa 2 • Unduh KHS<br>
        👤 Dosen 1 • Input Nilai
      `;
    }
    if (arrow) {
      arrow.textContent = '➔ ➔ ➔';
      arrow.style.color = 'var(--cyan)';
    }
    if (exp) {
      exp.textContent = 'Pada kondisi normal, server SIAKAD memproses permintaan pengguna yang sah secara lancar tanpa hambatan latensi.';
    }
  }
};

window.setPassSimLevel = function(level, btn) {
  document.querySelectorAll('.sim-level-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const mask = document.getElementById('simPasswordMask');
  const result = document.getElementById('passSimResult');
  if (!mask || !result) return;

  if (level === 'lemah') {
    mask.textContent = '123456';
    mask.style.color = '#fca5a5';
    result.style.background = 'rgba(239,68,68,0.15)';
    result.style.borderColor = 'var(--danger-red)';
    result.innerHTML = `
      <strong style="color:#fca5a5;">Tingkat Risiko: SANGAT TINGGI (CRITICAL)</strong>
      <p style="margin-top:4px;">Dapat diretas dalam hitungan milidetik menggunakan kamus password bocor atau tebakan dasar.</p>
    `;
  } else if (level === 'kuat') {
    mask.textContent = 'X7#mK9$qL2!pW';
    mask.style.color = 'var(--cyan)';
    result.style.background = 'rgba(0,212,255,0.12)';
    result.style.borderColor = 'var(--cyan)';
    result.innerHTML = `
      <strong style="color:var(--cyan);">Tingkat Risiko: SEDANG (Perlindungan Baik)</strong>
      <p style="margin-top:4px;">Kombinasi panjang dan simbolik mencegah serangan brute-force, namun akun masih rentan jika password tercuri melalui phishing.</p>
    `;
  } else if (level === 'mfa') {
    mask.textContent = 'X7#mK9$qL2!pW + OTP 829104';
    mask.style.color = '#86efac';
    result.style.background = 'rgba(16,185,129,0.15)';
    result.style.borderColor = 'var(--green-digital)';
    result.innerHTML = `
      <strong style="color:#86efac;">Tingkat Risiko: SANGAT RENDAH (Proteksi Optimal)</strong>
      <p style="margin-top:4px;">Bahkan jika peretas mengetahui password Anda, mereka tetap tidak dapat masuk tanpa kode autentikasi fisik dari perangkat ponsel Anda.</p>
    `;
  }
};

window.checkSocialEng = function(choice, btn) {
  const fb = document.getElementById('socialFeedback');
  if (!fb) return;

  fb.style.display = 'block';
  if (choice === 'B') {
    btn.classList.add('selected-correct');
    fb.style.background = 'rgba(16,185,129,0.15)';
    fb.style.border = '1px solid var(--green-digital)';
    fb.style.color = '#86efac';
    fb.innerHTML = '<strong>Tepat Sekali!</strong> Titik kelemahannya ada pada <em>faktor manusia (karyawan)</em> yang kurang waspada dan ketiadaan SOP verifikasi identitas resmi saat ada panggilan telepon.';
    showP6Toast('Analisis Tepat!', '✅');
  } else {
    btn.classList.add('selected-wrong');
    fb.style.background = 'rgba(239,68,68,0.15)';
    fb.style.border = '1px solid var(--danger-red)';
    fb.style.color = '#fca5a5';
    fb.innerHTML = '<strong>Kurang Tepat.</strong> Serangan social engineering tidak mengeksploitasi kabel atau monitor, melainkan menipu <em>pengguna dan kelemahan prosedur kerja</em>.';
  }
};

// ========================================================
// 7. GAMES & VULN FINDER
// ========================================================
window.checkClassificationGame = function() {
  let correct = 0;
  const total = 6;
  const answers = {
    1: 'phishing',
    2: 'malware',
    3: 'dos',
    4: 'password',
    5: 'insider',
    6: 'social'
  };

  for (let i = 1; i <= total; i++) {
    const sel = document.getElementById(`classSelect${i}`);
    const card = document.querySelector(`.game-item-card[data-idx="${i}"]`);
    if (sel && card) {
      if (sel.value === answers[i]) {
        correct++;
        card.style.borderColor = 'var(--green-digital)';
      } else {
        card.style.borderColor = 'var(--danger-red)';
      }
    }
  }

  const scoreDisplay = document.getElementById('gameScoreDisplay');
  const pct = Math.round((correct / total) * 100);
  if (scoreDisplay) {
    scoreDisplay.textContent = `Skor Anda: ${correct} / ${total} (${pct}%)`;
  }
  showP6Toast(`Latihan Selesai! Skor: ${correct}/${total}`, '🎯');
};

window.toggleVulnChip = function(el, isVuln, reason) {
  const alertEl = document.getElementById('vulnFeedbackAlert');
  if (isVuln) {
    el.classList.toggle('found');
    if (alertEl) {
      alertEl.innerHTML = `<span style="color:#fde047;">✓ Benar! ${reason}</span>`;
    }
    showP6Toast('Kerentanan Ditemukan!', '🔍');
  } else {
    if (alertEl) {
      alertEl.innerHTML = `<span style="color:#fca5a5;">✕ ${reason}</span>`;
    }
  }
};

// ========================================================
// 8. ATTACK CHAIN BUILDER & CYBER DETECTIVE
// ========================================================
window.validateAttackChain = function() {
  const t = document.getElementById('chainThreat')?.value;
  const v = document.getElementById('chainVuln')?.value;
  const r = document.getElementById('chainRisk')?.value;
  const imp = document.getElementById('chainImpact')?.value;
  const res = document.getElementById('chainValidationResult');

  if (!res) return;
  res.style.display = 'block';

  const isPhishingChain = (t === 'phishing' && v === 'user_awareness' && r === 'credential_theft' && imp === 'data_breach');
  const isRansomChain = (t === 'ransomware' && v === 'no_backup' && r === 'file_encrypted' && imp === 'financial_loss');
  const isDdosChain = (t === 'ddos' && v === 'no_bandwidth' && r === 'service_down' && imp === 'reputation_loss');

  if (isPhishingChain || isRansomChain || isDdosChain) {
    res.style.background = 'rgba(16,185,129,0.15)';
    res.style.border = '1px solid var(--green-digital)';
    res.style.color = '#86efac';
    res.innerHTML = `<strong>Rantai Serangan Sangat Logis dan Terbukti!</strong> Kombinasi ancaman mengeksploitasi kerentanan tersebut secara akurat memicu dampak kerugian yang sesuai.`;
    showP6Toast('Rantai Serangan Valid!', '⚡');
  } else {
    res.style.background = 'rgba(245,158,11,0.15)';
    res.style.border = '1px solid var(--warning-amber)';
    res.style.color = '#fde047';
    res.innerHTML = `<strong>Kombinasi Kurang Selaras:</strong> Coba hubungkan secara logis (Contoh: Phishing mengeksploitasi Kurang Edukasi memicu Pencurian Akun yang berdampak pada Pembajakan Identitas).`;
  }
};

function initP6Detective() {
  renderDetective();
}

function renderDetective() {
  if (detectiveIndex >= DETECTIVE_CASES.length) {
    const num = document.getElementById('detectiveCaseNum');
    const text = document.getElementById('detectiveScenarioText');
    const fb = document.getElementById('detectiveFeedback');
    if (num) num.textContent = 'KASUS SELESAI';
    if (text) text.textContent = `Hebat! Anda menyelesaikan semua misi investigasi detektif dengan skor ${detectiveScore} dari 3.`;
    if (fb) {
      fb.innerHTML = `
        <button class="btn-primary" onclick="restartDetective()" style="margin-top:10px;">
          <span>↺ MAIN LAGI</span>
        </button>
      `;
    }
    return;
  }

  const current = DETECTIVE_CASES[detectiveIndex];
  const num = document.getElementById('detectiveCaseNum');
  const text = document.getElementById('detectiveScenarioText');
  const scoreText = document.getElementById('detectiveScoreText');
  const fb = document.getElementById('detectiveFeedback');
  const tSel = document.getElementById('detectiveThreatSelect');
  const vSel = document.getElementById('detectiveVulnSelect');

  if (num) num.textContent = current.num;
  if (text) text.textContent = current.scenario;
  if (scoreText) scoreText.textContent = `Skor: ${detectiveScore}`;
  if (fb) fb.innerHTML = '';
  if (tSel) tSel.value = '';
  if (vSel) vSel.value = '';
}

window.submitDetectiveAnswer = function() {
  if (detectiveIndex >= DETECTIVE_CASES.length) return;

  const current = DETECTIVE_CASES[detectiveIndex];
  const userThreat = document.getElementById('detectiveThreatSelect')?.value;
  const userVuln = document.getElementById('detectiveVulnSelect')?.value;
  const fb = document.getElementById('detectiveFeedback');

  if (!userThreat || !userVuln) {
    alert('Harap pilih Ancaman dan Kerentanan terlebih dahulu!');
    return;
  }

  if (userThreat === current.correctThreat && userVuln === current.correctVuln) {
    detectiveScore++;
    if (fb) {
      fb.innerHTML = `<span style="color:#86efac; font-weight:bold;">✓ Investigasi Tepat! Ancaman: ${current.threatName}, Kerentanan: ${current.vulnName}.</span>`;
    }
    showP6Toast('Kasus Terpecahkan!', '🔍');
  } else {
    if (fb) {
      fb.innerHTML = `<span style="color:#fca5a5; font-weight:bold;">✕ Kurang Tepat. Jawaban: ${current.threatName} dan ${current.vulnName}.</span>`;
    }
  }

  detectiveIndex++;
  setTimeout(renderDetective, 1400);
};

window.restartDetective = function() {
  detectiveIndex = 0;
  detectiveScore = 0;
  renderDetective();
};

// ========================================================
// 9. CASE STUDY, GROUP DISCUSSION & REFLECTION SAVES
// ========================================================
window.saveCaseStudyP6 = function() {
  for (let i = 1; i <= 4; i++) {
    const val = document.getElementById(`caseAnalysisQ${i}`)?.value || '';
    localStorage.setItem(`cs6_case_q${i}`, val);
  }
  showP6Toast('Analisis studi kasus berhasil disimpan!', '💾');
};

window.saveGroupArgumentP6 = function() {
  const val = document.getElementById('groupDiscussionArgument')?.value || '';
  localStorage.setItem('cs6_group_argument', val);
  showP6Toast('Argumentasi diskusi berhasil disimpan!', '💾');
};

window.saveReflectionP6 = function() {
  for (let i = 1; i <= 3; i++) {
    const val = document.getElementById(`reflQ${i}`)?.value || '';
    localStorage.setItem(`cs6_reflection_q${i}`, val);
  }
  showP6Toast('Refleksi pribadi berhasil disimpan!', '💾');
};

// ========================================================
// 10. COMPREHENSIVE QUIZ
// ========================================================
function initP6Quiz() {
  p6QuizIndex = 0;
  p6QuizScore = 0;
  renderP6QuizQuestion();
}

function renderP6QuizQuestion() {
  p6QuizAnswered = false;
  const current = P6_QUIZ_QUESTIONS[p6QuizIndex];
  const qNum = document.getElementById('quizQNumP6');
  const qText = document.getElementById('quizQuestionTextP6');
  const container = document.getElementById('quizOptionsContainerP6');
  const expBox = document.getElementById('quizExpBoxP6');
  const nextBtn = document.getElementById('btnQuizNextP6');
  const fill = document.getElementById('quizProgressFillP6');

  if (qNum) qNum.textContent = `SOAL ${String(p6QuizIndex + 1).padStart(2, '0')} / 10`;
  if (qText) qText.textContent = current.q;
  if (expBox) expBox.style.display = 'none';
  if (nextBtn) nextBtn.style.display = 'none';

  if (fill) {
    const pct = ((p6QuizIndex + 1) / P6_QUIZ_QUESTIONS.length) * 100;
    fill.style.width = `${pct}%`;
  }

  if (container) {
    container.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    current.opts.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<strong class="mono">${letters[idx]}.</strong> <span>${opt}</span>`;
      btn.onclick = () => selectP6QuizAnswer(idx, btn);
      container.appendChild(btn);
    });
  }
}

function selectP6QuizAnswer(selectedIdx, btnElement) {
  if (p6QuizAnswered) return;
  p6QuizAnswered = true;

  const current = P6_QUIZ_QUESTIONS[p6QuizIndex];
  const allBtns = document.querySelectorAll('#quizOptionsContainerP6 .quiz-option-btn');
  const expBox = document.getElementById('quizExpBoxP6');
  const expText = document.getElementById('quizExpTextP6');
  const nextBtn = document.getElementById('btnQuizNextP6');

  allBtns.forEach((b, idx) => {
    b.disabled = true;
    if (idx === current.correct) {
      b.classList.add('selected-correct');
    }
  });

  if (selectedIdx === current.correct) {
    p6QuizScore += 10;
    btnElement.classList.add('selected-correct');
    showP6Toast('Jawaban Benar! (+10 Poin)', '🎉');
  } else {
    btnElement.classList.add('selected-wrong');
    showP6Toast('Jawaban Salah. Simak pembahasannya.', '⚠️');
  }

  if (expBox && expText) {
    expText.textContent = current.exp;
    expBox.style.display = 'block';
  }

  if (nextBtn) {
    nextBtn.style.display = 'inline-flex';
    if (p6QuizIndex === P6_QUIZ_QUESTIONS.length - 1) {
      nextBtn.querySelector('span').textContent = 'LIHAT HASIL KUIS →';
    } else {
      nextBtn.querySelector('span').textContent = 'SOAL BERIKUTNYA →';
    }
  }
}

window.nextQuizP6 = function() {
  p6QuizIndex++;
  if (p6QuizIndex < P6_QUIZ_QUESTIONS.length) {
    renderP6QuizQuestion();
  } else {
    showP6QuizResult();
  }
};

function showP6QuizResult() {
  const card = document.getElementById('quizCardP6');
  const resCard = document.getElementById('quizResultCardP6');
  const scoreText = document.getElementById('quizScoreTextP6');
  const badge = document.getElementById('quizBadgeP6');
  const msg = document.getElementById('quizMsgP6');

  if (card) card.style.display = 'none';
  if (resCard) resCard.style.display = 'block';

  if (scoreText) scoreText.textContent = `${p6QuizScore} / 100`;

  if (badge && msg) {
    if (p6QuizScore >= 80) {
      badge.textContent = '🌟 Kategori: Pemahaman Sangat Baik';
      badge.style.background = 'rgba(16, 185, 129, 0.2)';
      badge.style.color = '#86efac';
      badge.style.border = '1px solid var(--green-digital)';
      msg.textContent = 'Pemahaman konsep Threat, Vulnerability, dan taksonomi serangan siber Anda sudah sangat solid!';
    } else if (p6QuizScore >= 60) {
      badge.textContent = '⚡ Kategori: Pemahaman Cukup';
      badge.style.background = 'rgba(245, 158, 11, 0.2)';
      badge.style.color = '#fde047';
      badge.style.border = '1px solid var(--warning-amber)';
      msg.textContent = 'Pemahaman cukup. Pelajari kembali materi perbedaan DoS, Phishing, dan Social Engineering.';
    } else {
      badge.textContent = '📖 Pelajari Kembali Materi';
      badge.style.background = 'rgba(239, 68, 68, 0.2)';
      badge.style.color = '#fca5a5';
      badge.style.border = '1px solid var(--danger-red)';
      msg.textContent = 'Pelajari kembali materi Threat, Vulnerability, dan klasifikasi ancaman siber.';
    }
  }
}

window.restartQuizP6 = function() {
  p6QuizIndex = 0;
  p6QuizScore = 0;
  const card = document.getElementById('quizCardP6');
  const resCard = document.getElementById('quizResultCardP6');
  if (card) card.style.display = 'block';
  if (resCard) resCard.style.display = 'none';
  renderP6QuizQuestion();
};

// ========================================================
// 11. CLIPBOARD COPY & TOAST
// ========================================================
window.copyTaskP6Instructions = function() {
  const text = `TUGAS: KLASIFIKASI ANCAMAN SIBER
Mata Kuliah: Cyber Security Management (BWP5030) - Bisnis Digital
Institusi: ITBM Polewali Mandar • Pertemuan 6–7 (Bobot 5%)

INSTRUKSI TUGAS:
Buatlah tabel klasifikasi ancaman siber dan analisis sederhana terhadap setiap ancaman (minimal 5 jenis ancaman berbeda).

FORMAT TABEL:
No | Nama Ancaman | Jenis/Kategori | Cara Kerja | Target Utama | Dampak Kerugian | Contoh Pencegahan Nyata
Contoh:
1 | Phishing | Social Engineering | Mengirim email manipulatif | Pengguna Akun | Pencurian Kredensial | Wajibkan MFA & edukasi URL

KETENTUAN:
- Dikerjakan secara sistematis dan rapi.
- Gunakan bahasa sendiri dan hindari plagiasi.
- Sertakan minimal 2 sumber referensi resmi/ilmiah.
- Format pengumpulan: Dokumen PDF.`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showP6Toast('Instruksi tugas berhasil disalin ke clipboard!', '📋'))
      .catch(() => fallbackP6Copy(text));
  } else {
    fallbackP6Copy(text);
  }
};

function fallbackP6Copy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showP6Toast('Instruksi tugas berhasil disalin ke clipboard!', '📋');
}

function showP6Toast(message, icon = '✅') {
  const toast = document.getElementById('p6Toast');
  const toastText = document.getElementById('p6ToastText');
  const toastIcon = document.getElementById('p6ToastIcon');

  if (!toast || !toastText) return;

  toastText.textContent = message;
  if (toastIcon) toastIcon.textContent = icon;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
