# Pintara Flipbook Reader (Lite, PWA) - Tugas Internship

[cite_start]Projek ini adalah sebuah Progressive Web App (PWA) yang ringan dan dapat di-install, yang mereplikasi pengalaman membaca flipbook sederhana[cite: 12]. Aplikasi ini dibangun menggunakan React dan Vite.

## Arsitektur Cache

Aplikasi ini menggunakan _service worker_ (dikonfigurasi melalui Workbox pada file `vite.config.js`) untuk mengaktifkan fungsionalitas offline. Strategi caching dibagi menjadi dua bagian utama:

1. **Precache (App Shell)**:

   - [cite_start]**Apa yang di-cache?**: _App shell_ atau kerangka utama aplikasi, yang mencakup semua aset statis penting agar aplikasi dapat berjalan: file HTML, CSS, JavaScript, dan ikon-ikon aplikasi[cite: 29].
   - **Strategi**: File-file ini di-cache segera setelah _service worker_ di-install. Ini memastikan bahwa kerangka dasar aplikasi selalu tersedia.
   - **Mengapa?**: Strategi ini memastikan antarmuka pengguna (UI) aplikasi dapat selalu dimuat secara instan, bahkan saat pengguna sedang offline. [cite_start]Hal ini menjamin aplikasi dapat dimulai dengan cepat dan andal, tanpa menampilkan layar putih kosong[cite: 68].

2. **Runtime Caching (Gambar Buku)**:
   - [cite_start]**Apa yang di-cache?**: Gambar-gambar halaman buku (`.png`, `.jpg`, dll.) yang diakses pengguna saat membaca[cite: 30].
   - **Strategi**: `StaleWhileRevalidate`.
   - **Mengapa?**: Saat pengguna meminta gambar halaman buku, strategi ini akan melakukan hal berikut:
     1. Pertama, strategi ini akan memeriksa cache. Jika gambar tersedia di dalam cache, gambar akan langsung ditampilkan, membuat halaman terasa sangat cepat dimuat.
     2. Secara bersamaan, permintaan dikirim ke jaringan untuk mengambil versi terbaru dari gambar tersebut.
     3. Jika permintaan jaringan berhasil, cache akan diperbarui dengan versi gambar yang baru untuk kunjungan berikutnya.
        Pendekatan ini memberikan keseimbangan yang sangat baik antara kecepatan (menyajikan dari cache) dan kebaruan data (memperbarui di latar belakang).

## Cara Menguji Fungsionalitas Offline

[cite_start]Anda dapat mengikuti langkah-langkah berikut untuk memverifikasi bahwa _caching offline_ berfungsi seperti yang diharapkan[cite: 74]:

1. _Clone_ repositori ini dan install dependensi (`npm install`).
2. _Build_ proyek untuk mode produksi: `npm run build`.
3. Jalankan _preview_ dari hasil build: `npm run preview`.
4. Buka aplikasi di browser (disarankan Chrome di perangkat Android untuk uji coba instalasi).
5. **Saat Online**: Buka salah satu buku (contoh: "Petualangan Kiko") dan lihat halaman 1 dan 2.
6. **Aktifkan Mode Pesawat**: Nyalakan mode pesawat pada perangkat Anda atau atur status jaringan ke "Offline" pada Developer Tools browser.
7. **Saat Offline**:
   - Kembali ke aplikasi yang sudah dibuka.
   - [cite_start]Indikator "Offline Mode" seharusnya muncul di bagian atas[cite: 67].
   - Buka kembali buku yang tadi dibaca. [cite_start]Halaman 1 dan 2 akan tetap tampil dengan benar karena sudah tersimpan di cache[cite: 65].
   - [cite_start]Saat mencoba membuka halaman 3 (yang belum pernah dilihat saat online), aplikasi akan menampilkan pesan _fallback_ ["Halaman belum diunduh."](cite: 38, 66).

## Keterbatasan & Ide Perbaikan

Berikut adalah beberapa keterbatasan dari implementasi saat ini dan ide untuk perbaikan di masa depan:

- **Keterbatasan**: Strategi caching gambar saat ini tidak memiliki batas waktu (TTL). Cache akan terus disimpan hingga dihapus secara manual oleh browser atau pengguna.
- **Ide Perbaikan**:
  - [cite_start]Mengimplementasikan mekanisme _Time-To-Live_ (TTL) sederhana pada cache, misalnya dengan memvalidasi ulang cache yang usianya lebih dari 24 jam[cite: 42].
  - Menambahkan fitur _prefetch_ halaman berikutnya. [cite_start]Saat pengguna berada di halaman `N`, aplikasi dapat secara diam-diam mengambil dan menyimpan gambar untuk halaman `N+1` di latar belakang untuk membuat navigasi terasa lebih mulus dan cepat[cite: 41].
