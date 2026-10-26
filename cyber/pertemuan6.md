Buat sebuah website pembelajaran interaktif berbasis HTML, CSS, dan JavaScript VANILLA untuk mata kuliah:

CYBER SECURITY MANAGEMENT
Kode Mata Kuliah: BWP5030
Program Studi: Bisnis Digital
Institusi: Institut Teknologi dan Bisnis Muhammadiyah Polewali Mandar
Pertemuan: 6
CPMK: CPMK-3
Sub-CPMK: 3.1
Topik: ANCAMAN DAN KERENTANAN SISTEM INFORMASI

==================================================
1. TUJUAN WEBSITE
==================================================

Website digunakan sebagai media pembelajaran interaktif untuk mahasiswa pada Pertemuan 6.

Mahasiswa diharapkan mampu:

1. Menjelaskan pengertian ancaman (threat) dalam keamanan siber.
2. Menjelaskan pengertian kerentanan (vulnerability).
3. Membedakan threat, vulnerability, dan risk.
4. Mengidentifikasi berbagai jenis ancaman siber.
5. Mengklasifikasikan ancaman berdasarkan karakteristiknya.
6. Mengidentifikasi kerentanan yang dapat dimanfaatkan oleh suatu ancaman.
7. Menganalisis hubungan antara ancaman, kerentanan, risiko, dan dampak.
8. Menganalisis kasus sederhana keamanan sistem informasi.

Website harus terasa seperti "Cyber Security Learning Lab", bukan sekadar halaman materi PDF.

==================================================
2. TEKNOLOGI
==================================================

Gunakan:

- HTML5
- CSS3
- JavaScript Vanilla
- Tidak menggunakan framework
- Tidak menggunakan React
- Tidak menggunakan Bootstrap
- Tidak menggunakan Tailwind
- Tidak menggunakan backend

Struktur file:

index.html
style.css
script.js

Semua fitur interaktif harus berjalan di browser.

Gunakan localStorage untuk menyimpan:

- progress belajar
- jawaban kuis
- skor
- status materi yang telah dibaca
- hasil aktivitas interaktif

==================================================
3. DESAIN VISUAL
==================================================

Gunakan tema Cyber Security modern.

Gaya:

- Dark mode
- Background hitam / navy gelap
- Accent cyan / biru elektrik / hijau digital
- Card glassmorphism
- Border tipis bercahaya
- Efek glow secukupnya
- Font modern dan mudah dibaca
- Responsive desktop, tablet, dan smartphone

Jangan membuat desain terlalu ramai.

Gunakan ikon sederhana menggunakan emoji atau inline SVG.

Buat navigasi sticky di bagian atas.

Menu:

[01] INTRO
[02] THREAT
[03] VULNERABILITY
[04] THREAT TYPES
[05] ANALYSIS
[06] CASE STUDY
[07] GAME
[08] QUIZ
[09] TASK
[10] SUMMARY

==================================================
4. HERO SECTION
==================================================

Buat hero section:

CYBER SECURITY MANAGEMENT

PERTEMUAN 06

"Ancaman dan Kerentanan Sistem Informasi"

Badge:

CPMK-3
SUB-CPMK 3.1

Tambahkan deskripsi:

"Kenali ancamannya, temukan kerentanannya, pahami risikonya."

Tambahkan tombol:

[ MULAI BELAJAR ]

Ketika diklik, scroll ke bagian tujuan pembelajaran.

Tambahkan visual berupa ilustrasi jaringan komputer / shield / warning / cybersecurity.

==================================================
5. TUJUAN PEMBELAJARAN
==================================================

Buat section "Learning Objectives".

Tampilkan dalam bentuk card.

Card:

01
Memahami Threat

02
Memahami Vulnerability

03
Membedakan Threat, Vulnerability, dan Risk

04
Mengenali Jenis Ancaman Siber

05
Mengidentifikasi Kerentanan

06
Menganalisis Kasus Keamanan

Gunakan animasi ketika card muncul.

==================================================
6. APERSEPSI
==================================================

Buat pertanyaan pembuka:

"Jika sebuah akun mahasiswa menggunakan password:
123456

Apakah masalahnya merupakan ancaman atau kerentanan?"

Buat dua tombol:

[ THREAT ]
[ VULNERABILITY ]

Setelah mahasiswa memilih, tampilkan feedback.

Jawaban:

VULNERABILITY

Karena password yang lemah merupakan kelemahan yang dapat dimanfaatkan oleh pihak yang melakukan serangan.

Tambahkan tombol:

"LANJUT KE MATERI"

==================================================
7. MATERI: APA ITU THREAT?
==================================================

Judul:

01 — THREAT

Jelaskan:

Threat (ancaman) adalah sesuatu yang berpotensi menyebabkan kerugian terhadap sistem, data, perangkat, atau pengguna.

Buat visual:

THREAT
↓
Potensi serangan / kejadian berbahaya
↓
Dapat memanfaatkan vulnerability
↓
Menimbulkan risk
↓
Menimbulkan impact

Berikan contoh:

- Phishing
- Malware
- Ransomware
- DoS/DDoS
- Password Attack
- Social Engineering
- Insider Threat

Buat setiap jenis ancaman dalam interactive card.

Ketika card diklik, tampilkan deskripsi singkat.

==================================================
8. MATERI: APA ITU VULNERABILITY?
==================================================

Judul:

02 — VULNERABILITY

Jelaskan:

Vulnerability adalah kelemahan atau celah dalam sistem, aplikasi, konfigurasi, proses, atau perilaku pengguna yang dapat dimanfaatkan oleh ancaman.

Tampilkan contoh:

PASSWORD LEMAH
↓
Kelemahan autentikasi

SISTEM TIDAK DIPERBARUI
↓
Kelemahan perangkat lunak

HAK AKSES BERLEBIHAN
↓
Kelemahan kontrol akses

KONFIGURASI SALAH
↓
Kelemahan konfigurasi

KURANG EDUKASI PENGGUNA
↓
Kelemahan manusia/proses

==================================================
9. THREAT vs VULNERABILITY vs RISK
==================================================

Buat tabel perbandingan interaktif:

THREAT
Apa yang dapat menyebabkan bahaya?

VULNERABILITY
Kelemahan apa yang dapat dimanfaatkan?

RISK
Kemungkinan dan konsekuensi ketika ancaman memanfaatkan kelemahan.

IMPACT
Apa akibat yang ditimbulkan?

Buat visual alur:

THREAT
     +
VULNERABILITY
     ↓
    RISK
     ↓
   IMPACT

Berikan contoh:

Threat:
Phishing

Vulnerability:
Pengguna tidak mampu mengenali email palsu

Risk:
Akun dapat diambil alih

Impact:
Data pengguna dapat disalahgunakan

==================================================
10. JENIS-JENIS ANCAMAN SIBER
==================================================

Buat grid card interaktif minimal 7 jenis.

CARD 1
MALWARE

CARD 2
PHISHING

CARD 3
RANSOMWARE

CARD 4
DoS / DDoS

CARD 5
SOCIAL ENGINEERING

CARD 6
PASSWORD ATTACK

CARD 7
INSIDER THREAT

Setiap card ketika diklik membuka modal:

- Nama ancaman
- Pengertian
- Contoh kejadian
- Target
- Dampak
- Contoh pencegahan

Jangan membuat penjelasan terlalu teknis.

==================================================
11. MALWARE
==================================================

Buat bagian khusus:

MALWARE

Jelaskan secara sederhana sebagai perangkat lunak berbahaya.

Tampilkan beberapa contoh:

- Virus
- Worm
- Trojan
- Spyware
- Ransomware

Buat visual:

MALWARE
↓
Masuk ke perangkat
↓
Menjalankan aktivitas berbahaya
↓
Mengganggu / mencuri / merusak
↓
Menimbulkan dampak

==================================================
12. PHISHING
==================================================

Buat simulasi email phishing.

Tampilkan contoh email:

"AKUN ANDA AKAN DINONAKTIFKAN!"

"Segera login untuk memverifikasi akun."

[ VERIFIKASI SEKARANG ]

Tambahkan beberapa tanda mencurigakan:

- Bahasa mendesak
- Link mencurigakan
- Meminta informasi sensitif
- Pengirim tidak jelas

Pertanyaan:

"Apakah email ini aman?"

Tombol:

[ AMAN ]
[ PHISHING ]

Jika benar:

"Benar. Email tersebut memiliki beberapa indikator phishing."

==================================================
13. DoS / DDoS
==================================================

Buat visualisasi sederhana:

USER NORMAL
USER NORMAL
USER NORMAL
       ↓
    SERVER

Kemudian:

ATTACKER
 ↓↓↓↓↓↓↓↓↓↓↓
SERVER

Tampilkan indikator:

SERVER OVERLOAD

Jelaskan bahwa serangan DoS/DDoS bertujuan mengganggu ketersediaan layanan dengan membanjiri sistem dengan permintaan.

==================================================
14. PASSWORD ATTACK
==================================================

Buat simulasi sederhana.

Tampilkan:

Username:
admin

Password:
[********]

Pilihan keamanan:

[ Password lemah ]
[ Password kuat ]
[ MFA aktif ]

Ketika mahasiswa memilih konfigurasi yang berbeda, tampilkan tingkat risiko secara deskriptif:

PASSWORD LEMAH
→ risiko lebih tinggi

PASSWORD KUAT
→ perlindungan lebih baik

MFA AKTIF
→ menambah lapisan autentikasi

Jangan membuat simulasi hacking nyata.

==================================================
15. SOCIAL ENGINEERING
==================================================

Berikan kasus:

"Seseorang menelepon staf kampus dan mengaku sebagai administrator sistem. Ia meminta kode OTP dengan alasan sedang memperbaiki akun."

Pertanyaan:

"Apa yang menjadi titik kelemahan dalam kasus tersebut?"

Pilihan:

A. Server
B. Pengguna/prosedur
C. Kabel jaringan
D. Monitor

Jawaban:

B. Pengguna/prosedur

Berikan feedback edukatif.

==================================================
16. INSIDER THREAT
==================================================

Berikan kasus:

"Seorang pegawai yang memiliki akses database menyalin data mahasiswa dan mengirimkannya ke pihak lain."

Tanyakan:

"Ancaman apakah yang paling sesuai?"

Jawaban:

INSIDER THREAT

Tambahkan penjelasan singkat.

==================================================
17. KLASIFIKASI ANCAMAN
==================================================

Buat aktivitas drag-and-drop atau click classification.

Instruksi:

"Masukkan setiap kasus ke kategori ancaman yang sesuai."

Kategori:

MALWARE
PHISHING
DoS/DDoS
SOCIAL ENGINEERING
PASSWORD ATTACK
INSIDER THREAT

Kasus:

1. Email login palsu
2. File terenkripsi dan meminta tebusan
3. Server dibanjiri request
4. Password ditebak berulang kali
5. Pegawai membocorkan data
6. Pengguna ditipu melalui telepon

Setelah selesai:

[ PERIKSA JAWABAN ]

Tampilkan:

Benar: X / 6
Skor: X%

==================================================
18. IDENTIFIKASI VULNERABILITY
==================================================

Buat permainan:

"Temukan kerentanan!"

Kasus:

Sebuah laboratorium komputer memiliki kondisi:

- Semua komputer menggunakan password yang sama.
- Sistem operasi jarang diperbarui.
- Semua mahasiswa menggunakan akun administrator.
- Tidak ada pembatasan hak akses.
- Pengguna tidak mendapatkan edukasi keamanan.

Mahasiswa harus mengklik bagian yang merupakan vulnerability.

Setiap pilihan memberikan feedback.

Contoh:

PASSWORD SAMA
→ Vulnerability

SISTEM TIDAK DIPERBARUI
→ Vulnerability

AKUN ADMINISTRATOR
→ Vulnerability

==================================================
19. STUDI KASUS UTAMA
==================================================

Judul:

CASE STUDY — LABORATORIUM KOMPUTER KAMPUS

Kasus:

"Sebuah laboratorium komputer kampus memiliki 30 komputer. Semua komputer terhubung ke jaringan yang sama. Sebagian komputer menggunakan sistem operasi yang belum diperbarui. Password beberapa akun masih sederhana. Mahasiswa menggunakan akun dengan hak akses yang terlalu tinggi. Suatu hari beberapa komputer mengalami gangguan setelah seorang pengguna membuka file dari sumber yang tidak dikenal."

Tampilkan pertanyaan analisis:

1. Apa ancamannya?
2. Apa vulnerability-nya?
3. Apa kemungkinan risk-nya?
4. Apa impact yang mungkin terjadi?
5. Apa tindakan pencegahannya?

Buat form jawaban interaktif.

==================================================
20. THREAT → VULNERABILITY → RISK
==================================================

Buat simulasi "Build the Attack Chain".

Mahasiswa memilih:

THREAT
↓
VULNERABILITY
↓
RISK
↓
IMPACT

Contoh pilihan:

Threat:
Malware

Vulnerability:
User membuka file tidak dikenal

Risk:
Malware menginfeksi komputer

Impact:
Data/sistem terganggu

Buat beberapa kombinasi kasus.

Berikan feedback jika kombinasi logis.

==================================================
21. GAME: CYBER DETECTIVE
==================================================

Buat game sederhana.

Judul:

"CYBER DETECTIVE"

Instruksi:

"Kamu adalah analis keamanan. Identifikasi ancaman dan kerentanan dari setiap kasus."

Kasus 1:

"Seorang mahasiswa menerima email yang meminta login melalui link tertentu."

Tentukan:

Threat:
Phishing

Vulnerability:
Kurangnya kewaspadaan pengguna

Kasus 2:

"Server kampus tidak dapat diakses karena menerima permintaan dalam jumlah sangat besar."

Threat:
DoS/DDoS

Vulnerability:
Perlindungan layanan jaringan tidak memadai

Kasus 3:

"Pegawai menggunakan password sederhana yang sama pada beberapa akun."

Threat:
Password Attack

Vulnerability:
Password lemah/reuse password

Tambahkan skor.

==================================================
22. DISKUSI KELOMPOK
==================================================

Buat section:

"DISKUSI KELOMPOK"

Pertanyaan utama:

"Apakah keamanan sistem lebih banyak bergantung pada teknologi atau perilaku manusia?"

Buat dua sisi:

ARGUMEN A
Teknologi merupakan faktor utama.

ARGUMEN B
Manusia merupakan faktor utama.

Catatan:

Tujuan aktivitas bukan mencari satu jawaban mutlak, tetapi melatih mahasiswa memberikan argumen berdasarkan kasus.

Tambahkan textarea:

"Argumentasi kelompok Anda..."

Tambahkan:

[ SIMPAN ARGUMEN ]

==================================================
23. KUIS
==================================================

Buat minimal 10 soal pilihan ganda.

Materi:

- Threat
- Vulnerability
- Risk
- Malware
- Phishing
- Ransomware
- DoS/DDoS
- Social Engineering
- Password Attack
- Insider Threat

Setiap soal memiliki 4 pilihan.

Setelah selesai:

Tampilkan:

HASIL KUIS

Jawaban benar:
X / 10

Nilai:
XX

Berikan feedback:

80–100:
"Pemahaman konsep sudah baik."

60–79:
"Pemahaman cukup, beberapa konsep perlu dipelajari kembali."

<60:
"Pelajari kembali materi Threat, Vulnerability, dan klasifikasi ancaman."

==================================================
24. RINGKASAN MATERI
==================================================

Buat visual summary:

THREAT
= potensi bahaya

VULNERABILITY
= kelemahan yang dapat dimanfaatkan

RISK
= risiko yang muncul ketika ancaman memanfaatkan kelemahan

IMPACT
= dampak yang ditimbulkan

Kemudian:

THREAT
+
VULNERABILITY
↓
RISK
↓
IMPACT

Jenis ancaman:

Malware
Phishing
Ransomware
DoS/DDoS
Social Engineering
Password Attack
Insider Threat

==================================================
25. REFLEKSI
==================================================

Buat pertanyaan:

1. Ancaman apa yang paling sering kamu temui dalam kehidupan sehari-hari?
2. Kerentanan apa yang sering dilakukan pengguna tanpa disadari?
3. Apa yang dapat dilakukan untuk mengurangi risiko?

Gunakan textarea.

Tombol:

[ SIMPAN REFLEKSI ]

Simpan ke localStorage.

==================================================
26. TUGAS PERKULIAHAN
==================================================

Buat section khusus:

TUGAS — KLASIFIKASI ANCAMAN SIBER

Tugas mengacu pada RPS Pertemuan 6–7.

Bobot:
5%

Instruksi:

"Buat tabel klasifikasi ancaman siber dan analisis sederhana terhadap setiap ancaman."

Minimal 5 jenis ancaman.

Format tabel:

No
Ancaman
Jenis/Kategori
Cara Kerja
Target
Dampak
Contoh Pencegahan

Contoh:

1 | Phishing | Social Engineering | ... | Pengguna | ... | ...

Ketentuan:

- Dikerjakan secara sistematis.
- Gunakan bahasa sendiri.
- Sertakan sumber/referensi.
- Fokus pada klasifikasi dan analisis ancaman.
- File dikumpulkan dalam format PDF.

Tambahkan tombol:

[ SALIN INSTRUKSI TUGAS ]

==================================================
27. PROGRESS BELAJAR
==================================================

Buat progress bar:

PROGRESS BELAJAR
████████░░░░░░ 60%

Progress bertambah ketika section selesai.

Gunakan localStorage.

Tampilkan:

✓ Materi Threat
✓ Materi Vulnerability
✓ Jenis Ancaman
✓ Studi Kasus
✓ Game
✓ Kuis
✓ Tugas

==================================================
28. FITUR INTERAKTIF
==================================================

Wajib tersedia:

- Smooth scrolling
- Sticky navigation
- Active menu indicator
- Progress bar
- Modal
- Tabs
- Accordion
- Quiz engine
- Score calculation
- Drag-and-drop atau click classification
- Case study interaction
- localStorage
- Toast notification
- Copy task button
- Reset progress button

Tambahkan tombol:

[ RESET PROGRESS ]

Sebelum reset tampilkan confirmation dialog.

==================================================
29. JAVASCRIPT
==================================================

Semua logika menggunakan Vanilla JavaScript.

Buat fungsi modular:

initApp()
updateProgress()
saveProgress()
loadProgress()
resetProgress()

initQuiz()
checkQuiz()
showQuizResult()

initThreatClassification()
checkThreatClassification()

initVulnerabilityGame()
checkVulnerability()

initCaseStudy()
saveReflection()

copyTask()

showToast()

Gunakan event listener yang jelas.

Hindari inline JavaScript.

==================================================
30. AKSESIBILITAS
==================================================

Pastikan:

- Kontras teks cukup tinggi.
- Tombol mudah diklik.
- Ukuran font nyaman.
- Responsive.
- Tidak menggunakan animasi berlebihan.
- Semua elemen interaktif dapat digunakan dengan keyboard jika memungkinkan.

==================================================
31. RESPONSIVE DESIGN
==================================================

Desktop:
Layout dua kolom untuk beberapa materi.

Tablet:
Layout menyesuaikan menjadi satu/two column.

Mobile:
Semua card menjadi satu kolom.

Navigasi berubah menjadi mobile menu.

==================================================
32. FOOTER
==================================================

Tampilkan:

CYBER SECURITY MANAGEMENT
BWP5030

Pertemuan 6
Ancaman dan Kerentanan Sistem Informasi

CPMK-3 | Sub-CPMK 3.1

"Learn. Analyze. Protect."

==================================================
33. ATURAN PENTING KONTEN
==================================================

Jangan membuat materi terlalu teknis.

Target pengguna adalah mahasiswa Bisnis Digital.

Gunakan bahasa Indonesia yang jelas dan akademik tetapi mudah dipahami.

Utamakan pembelajaran konseptual dan analisis kasus.

Jangan membuat simulasi hacking yang benar-benar dapat digunakan untuk menyerang sistem.

Semua contoh serangan harus bersifat edukatif dan aman.

Jangan menghilangkan hubungan:

Threat
→ Vulnerability
→ Risk
→ Impact

Fokus utama Pertemuan 6 adalah:

"MENGIDENTIFIKASI DAN MENGKLASIFIKASIKAN ANCAMAN SERTA KERENTANAN SISTEM INFORMASI."

Pertemuan 6 merupakan bagian dari rangkaian Pertemuan 6–7 sesuai RPS. Jangan memasukkan materi standar/regulasi/tata kelola secara mendalam karena materi tersebut merupakan fokus Pertemuan 4–5.

==================================================
34. OUTPUT AKHIR
==================================================

Buat tiga file:

1. index.html
2. style.css
3. script.js

Pastikan ketiga file langsung dapat dijalankan dengan membuka index.html.

Tidak membutuhkan server.

Pastikan seluruh tombol, game, kuis, progress, modal, localStorage, dan navigasi berfungsi.

Hasil akhir harus terasa seperti platform pembelajaran Cyber Security modern dan interaktif, bukan website artikel biasa.