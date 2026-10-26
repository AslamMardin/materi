Buat sebuah media pembelajaran interaktif berbasis WEB menggunakan HTML, CSS, dan JavaScript murni (tanpa framework) untuk materi perkuliahan:

MATA KULIAH:
Cyber Security Management

KODE:
BWP5030

PERTEMUAN:
3

JUDUL:
Penerapan CIA Triad dan Perlindungan Data

SUB-CPMK:
2.1 — Mahasiswa mampu menjelaskan prinsip dasar keamanan siber dan perlindungan data.

==================================================
A. TUJUAN PEMBELAJARAN
==================================================

Setelah mempelajari materi ini, mahasiswa diharapkan mampu:

1. Menjelaskan kembali Confidentiality, Integrity, dan Availability.
2. Mengidentifikasi data yang perlu dilindungi.
3. Menjelaskan perlindungan data dalam berbagai kondisi.
4. Menganalisis masalah keamanan berdasarkan CIA Triad.
5. Menentukan langkah perlindungan yang sesuai terhadap suatu kasus.

==================================================
B. KONSEP UTAMA
==================================================

Media harus menjelaskan konsep berikut:

1. CIA Triad
   - Confidentiality = Kerahasiaan
   - Integrity = Integritas
   - Availability = Ketersediaan

Gunakan pertanyaan sederhana sebagai cara mengingat:

Confidentiality:
"Siapa yang boleh melihat?"

Integrity:
"Apakah data masih benar dan tidak dimanipulasi?"

Availability:
"Apakah sistem bisa digunakan ketika dibutuhkan?"

2. Perlindungan Data

Jelaskan jenis data yang perlu dilindungi:
- Data mahasiswa
- Data pelanggan
- Data transaksi
- Data keuangan
- Data pribadi
- Username
- Password
- OTP
- Data bisnis
- Data akademik

3. Kondisi Data

Jelaskan:

Data at Rest:
Data yang sedang tersimpan.
Contoh: database mahasiswa, file di laptop, database pelanggan.

Data in Transit:
Data yang sedang dikirim melalui jaringan.
Contoh: login ke website, transaksi online, pengiriman file.

Data in Use:
Data yang sedang digunakan atau diproses.
Contoh: dosen menginput nilai, sistem menghitung transaksi.

4. Authentication dan Authorization

Authentication:
"Siapa kamu?"

Contoh:
- Username dan password
- Fingerprint
- Face recognition
- OTP
- MFA

Authorization:
"Apa yang boleh kamu lakukan?"

Berikan contoh:
Mahasiswa dapat melihat nilai miliknya sendiri, tetapi tidak boleh mengubah nilai mahasiswa lain.

5. Access Control

Jelaskan bahwa pengguna hanya diberikan hak akses sesuai kebutuhan.

Berikan contoh:

Mahasiswa:
VIEW nilai sendiri.

Dosen:
INPUT/UPDATE nilai mata kuliah yang diampu.

Admin:
Mengelola data sesuai kewenangan.

6. Least Privilege

Jelaskan bahwa pengguna hanya diberikan hak akses minimum yang diperlukan untuk menjalankan tugasnya.

7. Audit Trail

Jelaskan bahwa audit trail merupakan catatan aktivitas sistem, misalnya:
- siapa yang login
- kapan login
- siapa yang mengubah data
- data apa yang diubah

Tekankan:
Audit trail bukan Availability.
Audit trail membantu penelusuran aktivitas, pengendalian, integritas, dan investigasi.

8. Perlindungan CIA

Confidentiality:
- Password kuat
- MFA
- Access control
- Authorization
- Encryption
- Edukasi phishing

Integrity:
- Access control
- Audit trail
- Validasi perubahan
- Backup
- Hashing
- Digital signature

Availability:
- Backup
- Redundancy
- Monitoring
- Maintenance
- Disaster recovery
- Server cadangan

==================================================
C. STRUKTUR WEBSITE
==================================================

Buat website pembelajaran dengan struktur:

1. Dashboard / Hero
2. Tujuan Pembelajaran
3. Review CIA Triad
4. Perlindungan Data
5. Data at Rest
6. Data in Transit
7. Data in Use
8. Authentication vs Authorization
9. Access Control & Least Privilege
10. Audit Trail
11. Studi Kasus
12. Simulasi Analisis CIA
13. Kuis Interaktif
14. Diskusi Kelompok
15. Rangkuman
16. Tugas

Gunakan sistem navigasi yang jelas.

==================================================
D. DESAIN UI/UX
==================================================

Gunakan desain modern bertema Cybersecurity.

Gaya visual:
- Dark mode
- Profesional
- Futuristik
- Akademik
- Cocok untuk mahasiswa perguruan tinggi
- Tidak terlalu ramai

Warna:
- Background dark navy / hampir hitam
- Card sedikit lebih terang
- Accent cyan/blue
- Warna khusus untuk CIA:
  Confidentiality → biru
  Integrity → hijau
  Availability → oranye

Gunakan:
- Card
- Icon
- Badge
- Progress bar
- Diagram
- Timeline
- Modal
- Tooltip
- Hover effect
- Animasi ringan

Jangan menggunakan animasi berlebihan.

Website harus responsive untuk:
- Desktop
- Laptop
- Tablet
- Smartphone

==================================================
E. HERO SECTION
==================================================

Buat halaman pembuka:

CYBER SECURITY MANAGEMENT

Pertemuan 3

PENERAPAN CIA TRIAD
DAN PERLINDUNGAN DATA

Subtitle:
"Memahami bagaimana menjaga kerahasiaan, integritas, dan ketersediaan informasi."

Tambahkan tombol:

[ MULAI BELAJAR ]

Di bagian visual tampilkan ilustrasi:
- Shield
- Lock
- Database
- Network
- Server

==================================================
F. INTERACTIVE CIA TRIAD
==================================================

Buat bagian CIA Triad dalam bentuk tiga kartu besar.

CARD 1:
CONFIDENTIALITY
Kerahasiaan

Pertanyaan:
"Siapa yang boleh melihat?"

Penjelasan:
Informasi hanya dapat diakses oleh pihak yang berwenang.

Contoh:
Data nilai mahasiswa hanya dapat diakses oleh pihak yang memiliki kewenangan.

CARD 2:
INTEGRITY
Integritas

Pertanyaan:
"Apakah data masih benar?"

Penjelasan:
Data harus tetap akurat, utuh, dan tidak diubah secara tidak sah.

Contoh:
Nilai mahasiswa tidak boleh diubah tanpa izin.

CARD 3:
AVAILABILITY
Ketersediaan

Pertanyaan:
"Apakah sistem dapat digunakan?"

Penjelasan:
Informasi dan sistem harus tersedia ketika dibutuhkan.

Contoh:
Sistem akademik harus dapat diakses saat mahasiswa melakukan KRS.

Setiap card dapat diklik untuk membuka detail.

==================================================
G. INTERACTIVE DATA LIFECYCLE
==================================================

Buat visual interaktif:

DATA
↓
AT REST
↓
IN TRANSIT
↓
IN USE

Setiap bagian dapat diklik.

AT REST:
"Data yang sedang tersimpan."

IN TRANSIT:
"Data yang sedang berpindah melalui jaringan."

IN USE:
"Data yang sedang digunakan atau diproses."

Berikan contoh pada setiap kondisi.

==================================================
H. AUTHENTICATION VS AUTHORIZATION
==================================================

Buat perbandingan visual dua kolom.

AUTHENTICATION

"Siapa kamu?"

Contoh:
Username + Password
Fingerprint
Face Recognition
OTP
MFA

AUTHORIZATION

"Apa yang boleh kamu lakukan?"

Contoh:
Mahasiswa → melihat nilai sendiri
Dosen → mengelola nilai mata kuliah
Admin → mengelola data sesuai kewenangan

Buat simulasi login sederhana.

Ketika pengguna memasukkan:
Username: mahasiswa
Password: 12345

Tampilkan simulasi:

AUTHENTICATION:
Identitas berhasil diverifikasi.

Kemudian tampilkan:

AUTHORIZATION:
Akses diberikan:
✓ Melihat profil
✓ Melihat nilai sendiri
✗ Mengubah nilai mahasiswa lain

==================================================
I. SIMULASI ACCESS CONTROL
==================================================

Buat simulasi sederhana.

Tampilkan tiga pengguna:

[ MAHASISWA ]
[ DOSEN ]
[ ADMIN ]

Dan beberapa resource:

[ Profil ]
[ Nilai ]
[ Database ]
[ Pengaturan Sistem ]

Ketika pengguna dipilih, tampilkan hak akses yang sesuai.

Contoh:

MAHASISWA:
Profil → VIEW
Nilai sendiri → VIEW
Nilai mahasiswa lain → DENIED
Database → DENIED
Pengaturan → DENIED

DOSEN:
Profil → VIEW
Nilai mata kuliah → VIEW/UPDATE
Database → LIMITED
Pengaturan → DENIED

ADMIN:
Profil → MANAGE
Nilai → MANAGE sesuai kewenangan
Database → MANAGE
Pengaturan → MANAGE

==================================================
J. STUDI KASUS UTAMA
==================================================

Buat section besar:

STUDI KASUS
"Perubahan Nilai di Sistem Akademik"

Kasus:

"Seorang mahasiswa login ke Sistem Akademik Kampus. Beberapa hari kemudian, nilai mata kuliah berubah tanpa sepengetahuan dosen dan mahasiswa lain."

Tampilkan kasus dalam bentuk visual timeline:

LOGIN
↓
AKUN DIGUNAKAN
↓
NILAI BERUBAH
↓
INSIDEN DITEMUKAN

Kemudian tampilkan:

ANALISIS CIA

Confidentiality:
Akun atau kredensial kemungkinan diakses oleh pihak yang tidak berwenang.

Integrity:
Nilai mata kuliah berubah tanpa izin.

Availability:
Periksa apakah sistem tetap dapat diakses atau mengalami gangguan.

Tambahkan catatan:
"Availability hanya dikatakan terganggu jika sistem/data tidak tersedia ketika dibutuhkan."

==================================================
K. INTERACTIVE CASE ANALYSIS
==================================================

Buat latihan analisis.

Tampilkan kasus:

"Password akun administrator diketahui oleh orang lain."

Pilihan:

A. Confidentiality
B. Integrity
C. Availability

Mahasiswa memilih jawaban.

Jika benar:

✓ BENAR

"Password merupakan informasi/kredensial yang harus dilindungi dari akses pihak yang tidak berwenang. Kasus ini berkaitan dengan Confidentiality."

Jika salah:

✗ BELUM TEPAT

"Perhatikan kata kunci: akses oleh pihak yang tidak berwenang."

Buat minimal 8 kasus.

Kasus 1:
Password admin diketahui orang lain.

Jawaban:
Confidentiality.

Kasus 2:
Nilai mahasiswa berubah tanpa izin.

Jawaban:
Integrity.

Kasus 3:
Website kampus tidak dapat diakses.

Jawaban:
Availability.

Kasus 4:
Data pelanggan bocor ke internet.

Jawaban:
Confidentiality.

Kasus 5:
Harga produk berubah tanpa izin.

Jawaban:
Integrity.

Kasus 6:
Server toko online down selama beberapa jam.

Jawaban:
Availability.

Kasus 7:
Mahasiswa dapat melihat nilai mahasiswa lain tanpa izin.

Jawaban:
Confidentiality.

Kasus 8:
Database mengalami perubahan data tanpa otorisasi.

Jawaban:
Integrity.

Setelah selesai, tampilkan skor.

==================================================
L. STUDI KASUS TOKO ONLINE
==================================================

Buat kasus kedua:

"Sebuah toko online mengalami tiga kejadian:

1. Data pelanggan tersebar di internet.
2. Harga beberapa produk berubah tanpa izin.
3. Website tidak dapat diakses selama lima jam."

Mahasiswa diminta menghubungkan kasus dengan CIA.

Buat tiga kartu kejadian yang bisa di-drag atau diklik.

Target:

Data pelanggan bocor
→ Confidentiality

Harga produk berubah
→ Integrity

Website tidak dapat diakses
→ Availability

==================================================
M. STUDI KASUS KAMPUS
==================================================

Buat kasus kelompok:

"Sebuah kampus menggunakan Sistem Informasi Akademik.

1. Password salah satu akun dosen diketahui orang lain.
2. Orang tersebut login ke sistem.
3. Beberapa nilai mahasiswa diubah.
4. Sistem akademik kemudian tidak dapat diakses selama 4 jam.
5. Sistem tidak memiliki pencatatan aktivitas yang lengkap."

Pertanyaan:

1. Apa masalah Confidentiality?
2. Apa masalah Integrity?
3. Apa masalah Availability?
4. Apa kemungkinan penyebabnya?
5. Apa dampaknya?
6. Bagaimana cara mencegahnya?

Buat tombol:

[ LIHAT PETUNJUK ]

[ LIHAT PEMBAHASAN ]

Pembahasan jangan langsung ditampilkan sebelum mahasiswa menekan tombol.

==================================================
N. PERTANYAAN DISKUSI
==================================================

Buat section:

"DISKUSI KELOMPOK"

Pertanyaan:

1. Jika harus memilih, mana yang lebih berbahaya: data bocor, data dimanipulasi, atau sistem tidak dapat digunakan? Jelaskan berdasarkan konteks.

2. Apakah password yang kuat saja sudah cukup untuk menjamin keamanan sebuah sistem?

3. Jika mahasiswa dapat melihat nilai mahasiswa lain tetapi tidak dapat mengubahnya, apakah masih merupakan masalah keamanan?

4. Jika data aman tetapi website tidak dapat digunakan selama satu hari, apakah sistem tersebut dapat dikatakan aman?

Tambahkan tombol:
[ MULAI DISKUSI ]

==================================================
O. KUIS AKHIR
==================================================

Buat kuis interaktif minimal 10 soal pilihan ganda.

Materi:
- CIA Triad
- Confidentiality
- Integrity
- Availability
- Data at Rest
- Data in Transit
- Data in Use
- Authentication
- Authorization
- Access Control
- Least Privilege
- Audit Trail

Setiap soal:
- 4 pilihan
- Hanya satu jawaban benar
- Feedback setelah menjawab
- Skor otomatis

Di akhir tampilkan:

HASIL KUIS

Skor: XX/100

Kategori:

90–100:
"Sangat Baik"

75–89:
"Baik"

60–74:
"Cukup"

<60:
"Perlu mempelajari kembali materi"

Tambahkan tombol:

[ ULANGI KUIS ]

==================================================
P. RANGKUMAN
==================================================

Buat rangkuman visual:

CONFIDENTIALITY
→ Menjaga kerahasiaan

INTEGRITY
→ Menjaga keutuhan dan keakuratan data

AVAILABILITY
→ Menjaga ketersediaan sistem/data

Kemudian:

Authentication
→ Siapa kamu?

Authorization
→ Apa yang boleh kamu lakukan?

Least Privilege
→ Berikan akses minimum yang diperlukan.

Audit Trail
→ Catat aktivitas agar dapat ditelusuri.

==================================================
Q. TUGAS 1
==================================================

Buat section:

TUGAS 1
"Ringkasan Konsep Dasar Keamanan Siber dan CIA Triad"

Instruksi:

Buat ringkasan minimal 2 halaman yang membahas:

1. Pengertian keamanan siber.
2. Tujuan keamanan siber.
3. Pentingnya perlindungan data.
4. Confidentiality.
5. Integrity.
6. Availability.
7. Contoh penerapan CIA Triad.
8. Kesimpulan.

Ketentuan:

- Individu
- Minimal 2 halaman
- Format PDF
- Font Times New Roman 12
- Spasi 1,5
- Kertas A4
- Minimal 2 referensi

Tambahkan tombol:
[ SALIN INSTRUKSI TUGAS ]

Saat tombol diklik, teks instruksi tugas otomatis disalin ke clipboard.

==================================================
R. PROGRESS PEMBELAJARAN
==================================================

Tambahkan progress bar di bagian atas.

Contoh:

PROGRESS BELAJAR
████████░░ 80%

Progress bertambah ketika mahasiswa membuka bagian materi.

Gunakan localStorage agar progress tetap tersimpan ketika halaman direfresh.

==================================================
S. NAVIGASI
==================================================

Buat sidebar atau navbar:

01 Tujuan
02 CIA Triad
03 Perlindungan Data
04 Data at Rest
05 Data in Transit
06 Data in Use
07 Authentication
08 Authorization
09 Access Control
10 Audit Trail
11 Studi Kasus
12 Simulasi
13 Diskusi
14 Kuis
15 Rangkuman
16 Tugas

Klik navigasi harus melakukan smooth scrolling ke section terkait.

Tambahkan tombol:
"← Sebelumnya"
"Berikutnya →"

==================================================
T. FITUR JAVASCRIPT
==================================================

Gunakan JavaScript vanilla untuk:

1. Navigasi antar section.
2. Smooth scrolling.
3. Interactive CIA cards.
4. Simulasi Authentication & Authorization.
5. Simulasi Access Control.
6. Interactive case analysis.
7. Drag-and-drop atau click matching untuk CIA.
8. Kuis otomatis.
9. Perhitungan skor.
10. Feedback jawaban.
11. Progress bar.
12. localStorage.
13. Tombol copy tugas.
14. Modal pembahasan.
15. Reset progress.

Jangan menggunakan backend.

Semua data kuis dan materi disimpan dalam JavaScript.

==================================================
U. TEKNIS FILE
==================================================

Buat tiga file:

index.html
style.css
script.js

Jangan menggunakan framework seperti:
- React
- Vue
- Angular
- Bootstrap

Gunakan:
- HTML5
- CSS3
- Vanilla JavaScript

Boleh menggunakan Google Fonts dan icon library melalui CDN jika diperlukan.

==================================================
V. RESPONSIVE
==================================================

Website harus nyaman digunakan:

Desktop:
Sidebar + content.

Tablet:
Sidebar dapat diperkecil.

Mobile:
Gunakan hamburger menu.

Pastikan:
- teks tidak terpotong
- card tidak keluar layar
- tombol mudah ditekan
- tabel dapat di-scroll horizontal
- kuis nyaman dimainkan di smartphone

==================================================
W. AKSESIBILITAS
==================================================

Gunakan:
- semantic HTML
- label yang jelas
- kontras warna yang baik
- tombol yang dapat digunakan dengan keyboard
- alt text pada gambar
- ukuran font nyaman dibaca

Jangan menggunakan teks terlalu kecil.

==================================================
X. GAYA BAHASA
==================================================

Gunakan Bahasa Indonesia yang:
- sederhana
- akademik
- komunikatif
- mudah dipahami mahasiswa
- tidak terlalu teknis

Jika menggunakan istilah teknis bahasa Inggris, tuliskan istilah Indonesia dan Inggris.

Contoh:

Confidentiality (Kerahasiaan)

Integrity (Integritas)

Availability (Ketersediaan)

Authentication (Autentikasi)

Authorization (Otorisasi)

Access Control (Kontrol Akses)

Audit Trail (Jejak Audit)

==================================================
Y. OUTPUT AKHIR
==================================================

Hasil akhir harus berupa media pembelajaran Cyber Security Management yang:

- interaktif
- modern
- responsif
- menarik
- tidak seperti dokumen teks biasa
- dapat digunakan dosen saat mengajar
- dapat digunakan mahasiswa untuk belajar mandiri
- memiliki materi
- memiliki simulasi
- memiliki studi kasus
- memiliki diskusi
- memiliki kuis
- memiliki skor
- memiliki progress pembelajaran
- memiliki Tugas 1

Pastikan seluruh materi benar-benar dapat digunakan dan tidak hanya berupa desain visual.

Buat kode yang rapi, modular, mudah dibaca, dan mudah dikembangkan.

Jangan memberikan mockup atau pseudocode.
Langsung hasilkan kode lengkap HTML, CSS, dan JavaScript yang siap dijalankan di browser.