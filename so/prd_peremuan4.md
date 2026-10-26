Buat website pembelajaran interaktif berbasis HTML, CSS, dan JavaScript Vanilla untuk Mata Kuliah Sistem Operasi, Pertemuan 4.

JUDUL:
“SISTEM OPERASI — PERTEMUAN 4”
Subjudul:
“Manajemen Proses”

TARGET:
Mahasiswa Semester III.

TUJUAN PEMBELAJARAN:
Mahasiswa mampu menganalisis mekanisme proses dan penjadwalan pada sistem operasi.

KONSEP UTAMA:
Website harus membantu mahasiswa memahami:
- Pengertian proses
- Perbedaan program dan proses
- Process State
- Process Control Block (PCB)
- Manajemen proses oleh sistem operasi
- Hubungan proses dengan CPU dan RAM
- Context Switch
- Process dan Thread
- Pengelolaan beberapa proses secara bersamaan

DESAIN:
- Modern, profesional, akademik, dan bertema teknologi.
- Gunakan kombinasi warna biru, putih, dan aksen warna seperlunya.
- Responsive untuk laptop, tablet, dan smartphone.
- Gunakan card, diagram, flowchart, badge, progress bar, animasi, dan ikon.
- Tampilan tidak terlalu penuh teks.
- Gunakan visualisasi untuk konsep yang sulit.
- Animasi harus ringan dan membantu pemahaman.
- Gunakan CSS murni dan JavaScript Vanilla.
- Tidak membutuhkan backend.
- Semua fitur harus dapat berjalan langsung di browser.

STRUKTUR WEBSITE:

1. HERO / HALAMAN PEMBUKA

Tampilkan:
“SISTEM OPERASI”
“PERTEMUAN 4”
“Manajemen Proses”

Deskripsi:
“Memahami bagaimana sistem operasi mengelola program yang sedang berjalan, menggunakan CPU dan RAM, serta berpindah dari satu keadaan proses ke keadaan lainnya.”

Tombol:
“Mulai Belajar”

Tambahkan ilustrasi proses:
PROGRAM → PROCESS → CPU + RAM

---

2. TUJUAN PEMBELAJARAN

Tampilkan tujuan:
Setelah mengikuti pembelajaran, mahasiswa mampu:
- Menganalisis konsep proses pada sistem operasi.
- Membedakan program dan proses.
- Menganalisis perubahan state suatu proses.
- Menjelaskan fungsi Process Control Block.
- Menganalisis hubungan process, CPU, RAM, dan kernel.
- Menjelaskan konsep context switch.
- Membedakan process dan thread.

---

3. PROGRAM VS PROCESS

Jelaskan:

PROGRAM:
Kumpulan instruksi yang tersimpan dan belum tentu sedang dijalankan.

PROCESS:
Program yang sedang dieksekusi dan membutuhkan sumber daya sistem.

Buat visual interaktif:

PROGRAM
Microsoft Word.exe
        ↓
      Dijalankan
        ↓
PROCESS
Microsoft Word
        ↓
Menggunakan
CPU + RAM

Berikan contoh:
- Microsoft Word.exe = Program
- Microsoft Word yang sedang berjalan = Process
- Chrome.exe = Program
- Chrome yang sedang berjalan = Process

Tambahkan tombol:
“Lihat Perbedaannya”

Ketika diklik tampilkan tabel Program vs Process.

---

4. APA YANG DIMAKSUD DENGAN PROCESS?

Jelaskan:
Process adalah program yang sedang dieksekusi oleh sistem komputer.

Tampilkan hubungan:

USER
↓
MENJALANKAN PROGRAM
↓
OPERATING SYSTEM
↓
PROCESS
↓
CPU + RAM

Jelaskan bahwa ketika user menjalankan aplikasi, sistem operasi mengelola aplikasi tersebut sebagai proses.

---

5. PROCESS STATE

Jelaskan lima state utama:

NEW
READY
RUNNING
WAITING / BLOCKED
TERMINATED

Tampilkan diagram:

NEW
 ↓
READY
 ↓
RUNNING
 ↓
TERMINATED

Dan hubungan:

RUNNING → WAITING
WAITING → READY
READY → RUNNING

Berikan penjelasan ketika setiap state diklik:

NEW:
“Proses baru dibuat.”

READY:
“Proses siap dijalankan dan menunggu giliran menggunakan CPU.”

RUNNING:
“Proses sedang dieksekusi oleh CPU.”

WAITING:
“Proses sedang menunggu suatu kejadian, misalnya operasi I/O selesai.”

TERMINATED:
“Proses telah selesai dieksekusi.”

---

6. ANIMASI PROCESS MANAGEMENT

Ini harus menjadi salah satu fitur utama website.

Buat simulator visual bernama:

“SIMULATOR MANAJEMEN PROSES”

Tampilkan beberapa proses:

[ Chrome ]
[ Microsoft Word ]
[ VS Code ]
[ File Explorer ]

Tampilkan area:

NEW
READY QUEUE
CPU / RUNNING
WAITING
TERMINATED

Proses berbentuk kartu yang dapat bergerak secara animasi.

Contoh:

NEW
  ↓
READY QUEUE
  ↓
CPU
RUNNING
  ↓
WAITING
  ↓
READY QUEUE
  ↓
CPU
RUNNING
  ↓
TERMINATED

Gunakan animasi perpindahan kartu.

Sediakan tombol:

▶ MULAI SIMULASI
⏸ PAUSE
⏭ NEXT STEP
↻ RESET

---

7. SIMULASI STEP-BY-STEP

Ketika mahasiswa menekan NEXT STEP, proses bergerak satu tahap.

STEP 1:
NEW → READY

Keterangan:
“Proses telah dibuat dan masuk ke antrean Ready.”

STEP 2:
READY → RUNNING

Keterangan:
“Proses mendapatkan kesempatan menggunakan CPU.”

STEP 3:
RUNNING → WAITING

Keterangan:
“Proses membutuhkan operasi I/O sehingga harus menunggu.”

STEP 4:
WAITING → READY

Keterangan:
“Operasi I/O selesai dan proses kembali siap menggunakan CPU.”

STEP 5:
READY → RUNNING

Keterangan:
“Scheduler kembali memberikan CPU kepada proses.”

STEP 6:
RUNNING → TERMINATED

Keterangan:
“Proses selesai dieksekusi.”

Tampilkan progress:
STEP 1/6
STEP 2/6
dan seterusnya.

---

8. MULTI PROCESS SIMULATOR

Tampilkan beberapa proses:

Chrome
Microsoft Word
VS Code
File Explorer

Buat:

READY QUEUE
[Chrome] [Word] [VS Code] [File Explorer]

CPU:

┌─────────────────┐
│       CPU       │
│    RUNNING      │
│      WORD       │
└─────────────────┘

Simulasikan perpindahan:

Chrome → CPU
Chrome → Waiting
Word → CPU
Word → Waiting
VS Code → CPU

Jelaskan bahwa CPU dapat digunakan oleh banyak proses secara bergantian dan sistem operasi mengatur proses tersebut.

---

9. CONTEXT SWITCH

Buat animasi khusus:

CPU sedang menjalankan:
CHROME

Kemudian:

“Simpan kondisi Chrome”
↓
CONTEXT SWITCH
↓
“Muat kondisi Word”
↓
CPU menjalankan:
WORD

Tampilkan:

CHROME
↓
SAVE CONTEXT
↓
CONTEXT SWITCH
↓
LOAD CONTEXT WORD
↓
WORD
↓
RUNNING

Jelaskan:

“Context Switch adalah mekanisme ketika sistem operasi berpindah dari menjalankan satu proses ke proses lainnya dengan menyimpan dan memulihkan informasi proses.”

Gunakan animasi perpindahan kartu.

---

10. PROCESS CONTROL BLOCK (PCB)

Jelaskan bahwa PCB adalah struktur data yang digunakan sistem operasi untuk menyimpan informasi penting mengenai suatu proses.

Tampilkan PCB:

PROCESS CONTROL BLOCK

PID:
1024

Process Name:
Microsoft Word

State:
RUNNING

Program Counter:
0x004A12

CPU Registers:
Active

Memory Information:
350 MB

I/O Status:
Ready

Buat bagian PCB dapat diklik.

Ketika State berubah:

RUNNING
→ WAITING
→ READY
→ RUNNING

nilai pada PCB ikut berubah.

---

11. HUBUNGAN PROCESS, CPU, DAN RAM

Buat visual:

PROCESS
   │
   ├────→ CPU
   │
   └────→ RAM

Jelaskan:

CPU:
Menjalankan instruksi proses.

RAM:
Menyimpan data dan instruksi yang sedang digunakan.

KERNEL:
Mengelola penggunaan CPU, RAM, dan proses.

Buat simulasi sederhana:

Chrome:
CPU 20%
RAM 500 MB

Word:
CPU 10%
RAM 350 MB

VS Code:
CPU 15%
RAM 700 MB

Tambahkan progress bar yang dapat berubah secara animasi.

---

12. ANALISIS KONDISI RAM

Buat simulasi:

CPU: 35%
RAM: 97%

Pertanyaan:
“Laptop mengalami penurunan kinerja. Apa yang perlu dianalisis?”

Pilihan:
A. RAM sedang hampir penuh
B. CPU pasti rusak
C. Keyboard rusak
D. Monitor rusak

Jawaban benar:
A. RAM sedang hampir penuh.

Berikan penjelasan:

“RAM 97% menunjukkan penggunaan memori sangat tinggi. CPU tetap bekerja menjalankan instruksi, tetapi data tersebut tidak cukup untuk menyimpulkan bahwa CPU rusak.”

---

13. PROCESS DAN THREAD

Jelaskan:

PROCESS
├── THREAD 1
├── THREAD 2
└── THREAD 3

Penjelasan:
Process adalah program yang sedang berjalan dan memiliki sumber daya yang dikelola sistem operasi.

Thread adalah unit eksekusi di dalam process.

Berikan contoh:
Browser dapat menggunakan beberapa thread untuk pekerjaan yang berbeda.

Buat visualisasi process dengan beberapa thread.

---

14. STUDI KASUS

Kasus:

“Seorang mahasiswa membuka Chrome, Microsoft Word, dan Visual Studio Code secara bersamaan.”

Tampilkan:

Chrome → Process
Word → Process
VS Code → Process

Pertanyaan:
1. Apakah ketiganya merupakan process?
2. Mengapa ketiganya membutuhkan CPU?
3. Mengapa ketiganya membutuhkan RAM?
4. Siapa yang mengelola penggunaan CPU dan RAM?
5. Apa yang terjadi jika terlalu banyak process berjalan?

Buat tombol:
“Lihat Pembahasan”

---

15. MINI GAME — PROCESS DETECTIVE

Buat minimal 8 soal.

Contoh:

SOAL:
“Microsoft Word sedang menunggu data dari SSD.”

State yang paling sesuai?

A. NEW
B. READY
C. RUNNING
D. WAITING
E. TERMINATED

Jawaban:
D. WAITING

Berikan feedback langsung.

Buat soal lain tentang:
- NEW
- READY
- RUNNING
- WAITING
- TERMINATED
- PCB
- CPU
- RAM
- Context Switch

Tampilkan skor otomatis.

---

16. LATIHAN CEPAT

Buat 5 soal pilihan ganda.

Materi:
1. Program vs Process
2. Process State
3. PCB
4. CPU dan RAM
5. Context Switch

Setelah selesai tampilkan:

SKOR ANDA:
80/100

Berikan kategori:
90–100 = Sangat Baik
80–89 = Baik
70–79 = Cukup
<70 = Perlu Belajar Lagi

---

17. TUGAS PERTEMUAN 4

Judul:

“ANALISIS PROSES YANG BERJALAN PADA SISTEM OPERASI”

Buat halaman tugas khusus.

PETUNJUK TUGAS:

Lakukan pengamatan terhadap proses yang sedang berjalan pada komputer/laptop yang Anda gunakan.

1. Buka Task Manager pada Windows menggunakan Ctrl + Shift + Esc atau gunakan System Monitor pada Linux.
2. Amati proses yang sedang berjalan.
3. Pilih 5 proses yang berbeda untuk diamati.
4. Catat nama proses, penggunaan CPU, penggunaan RAM, dan fungsi proses tersebut.
5. Ambil screenshot hasil pengamatan.
6. Gunakan hasil pengamatan tersebut untuk menjawab pertanyaan analisis.
7. Buat kesimpulan berdasarkan hasil pengamatan.

---

18. PERTANYAAN ANALISIS TUGAS

Tampilkan sebagai bagian dari tugas.

“Berdasarkan hasil pengamatan Anda, jawab pertanyaan berikut:”

1. Sebutkan 5 proses yang Anda amati dan jelaskan fungsi masing-masing.
2. Proses mana yang menggunakan CPU paling tinggi? Berapa persentase penggunaannya?
3. Proses mana yang menggunakan RAM paling tinggi? Berapa besar penggunaannya?
4. Mengapa proses yang sedang berjalan membutuhkan CPU dan RAM?
5. Bagaimana Kernel berperan dalam mengelola proses-proses tersebut?
6. Apa yang kemungkinan terjadi jika terlalu banyak proses berjalan secara bersamaan?
7. Berdasarkan hasil pengamatan, jelaskan hubungan antara Process, CPU, RAM, dan Kernel.

Tambahkan catatan:

“Pertanyaan analisis di atas merupakan bagian dari tugas. Mahasiswa tidak mengerjakan petunjuk dan pertanyaan sebagai dua tugas terpisah.”

---

19. FORMAT HASIL PENGAMATAN

Sediakan template tabel:

| No | Nama Proses | CPU | RAM | Fungsi Proses |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |

Tambahkan tombol:
“Download Template”

Jika tidak memungkinkan membuat file, tampilkan tabel yang mudah disalin.

---

20. KETENTUAN PENGUMPULAN

Tampilkan:

- Tugas dikerjakan secara individu.
- Minimal 5 proses.
- Wajib menyertakan screenshot Task Manager/System Monitor.
- Jawaban berdasarkan hasil pengamatan sendiri.
- Gunakan bahasa sendiri.
- Laporan 2–3 halaman.
- Format PDF.
- Nama file:
  NIM_Nama_Tugas4_SistemOperasi.pdf
- Dikumpulkan melalui SPARING sesuai jadwal.

HASIL AKHIR:
Screenshot → Data 5 Proses → Jawaban Analisis → Kesimpulan

---

21. RANGKUMAN

Buat rangkuman dalam bentuk kartu:

PROGRAM
“Kumpulan instruksi yang tersimpan.”

PROCESS
“Program yang sedang dieksekusi.”

PROCESS STATE
“Keadaan yang menunjukkan posisi/kondisi proses.”

PCB
“Informasi yang digunakan OS untuk mengelola proses.”

CPU
“Menjalankan instruksi proses.”

RAM
“Menyimpan data dan instruksi yang sedang digunakan.”

CONTEXT SWITCH
“Perpindahan CPU dari satu proses ke proses lainnya.”

THREAD
“Unit eksekusi dalam sebuah process.”

---

22. SIMULASI TERAKHIR

Buat tombol:

“SIMULASIKAN MEMBUKA MICROSOFT WORD”

Ketika diklik, tampilkan animasi:

USER
↓
Klik Microsoft Word
↓
OS membuat PROCESS
↓
NEW
↓
READY
↓
RUNNING
↓
CPU menjalankan Word
↓
Word membutuhkan data
↓
WAITING
↓
Data selesai dibaca
↓
READY
↓
RUNNING
↓
TERMINATED

Pada setiap tahap tampilkan keterangan singkat.

---

23. NAVIGASI

Buat sidebar/navbar:

Beranda
Tujuan
Program vs Process
Process
Process State
Process Management
PCB
CPU & RAM
Context Switch
Process & Thread
Studi Kasus
Mini Game
Latihan
Tugas
Rangkuman

Tambahkan progress pembelajaran.

Progress berubah ketika mahasiswa membuka setiap materi.

---

24. FITUR JAVASCRIPT

Gunakan JavaScript Vanilla untuk:

- Navigasi tanpa reload.
- Sidebar responsive.
- Accordion.
- Modal.
- Simulator process state.
- Animasi perpindahan process.
- Multi-process simulation.
- CPU simulation.
- Ready Queue.
- Context Switch animation.
- PCB update otomatis.
- Mini game.
- Quiz.
- Sistem skor.
- Feedback jawaban.
- Progress pembelajaran.
- Tombol reset.
- Dark mode.
- Scroll ke bagian materi.
- Animasi ringan saat elemen muncul.

---

25. STRUKTUR FILE

Buat:

index.html
style.css
script.js

Pastikan tidak menggunakan backend.

Semua fungsi harus bekerja ketika index.html dibuka langsung di browser.

PRINSIP UTAMA WEBSITE:

Website bukan hanya halaman materi, tetapi merupakan media pembelajaran interaktif.

Fokus utama:
“MAHASISWA MELIHAT DAN MEMAHAMI BAGAIMANA SISTEM OPERASI MENGELOLA PROSES.”

Jangan hanya memberikan definisi.

Gunakan:
- Visual
- Animasi
- Simulasi
- Studi kasus
- Pertanyaan analisis
- Mini game
- Quiz

Prioritaskan pemahaman konsep dibandingkan banyaknya teks.