# **App Name**: XalesIn WhatsApp AI Bot

## Core Features:

- WhatsApp Notification Listener: Aplikasi Android akan mendengarkan dan membaca notifikasi WhatsApp yang masuk dari aplikasi pihak ketiga (App A).

- OpenRouter AI Integration: Mengirim konten notifikasi yang terdeteksi ke layanan AI melalui OpenRouter API, untuk diproses dan mendapatkan respons cerdas.

- Automated WhatsApp Reply: Mengirimkan balasan otomatis ke percakapan WhatsApp, menggunakan respons dari AI dan memanfaatkan fitur balasan notifikasi Android.

- Secure AI Key Management: Menyediakan mekanisme yang aman untuk menangani dan menggunakan API Key OpenRouter (disarankan melalui Supabase Edge Function atau serverless layer lain untuk keamanan).

- Configurable AI Parameters: Pengguna dapat mengatur parameter AI di sisi client seperti temperature, max_tokens, top_p, dll., yang akan dikirim bersama permintaan ke OpenRouter.

- Dynamic Prompt Construction: Membangun prompt AI secara dinamis, menggabungkan instruksi sistem, pertanyaan pengguna (dari notifikasi), dan konteks dari knowledge base.

- Internal Knowledge Base Management: Memungkinkan pengguna untuk mengunggah file (misalnya CSV, TXT, JSON) yang berisi data knowledge base internal. Aplikasi akan mengonversi dan memformat data ini agar siap digunakan sebagai konteks oleh AI.

- Bot Settings Interface: Menyediakan antarmuka pengaturan yang intuitif untuk mengontrol fungsionalitas bot, meliputi:

- Mengaktifkan/Menonaktifkan Bot.

- Menentukan waktu tunda balasan (Delay Reply) dalam detik.

- Mengatur prefix/suffix untuk balasan chat bot.

- Input untuk OpenRouter API Key dan nama Model AI.

## Style Guidelines:

- Primary color: Deep Indigo (#3F51B5) untuk memberikan kesan profesional dan kepercayaan, sejalan dengan visi Enterprise.

- Background color: Light Grayish Blue (#F5F7FA) untuk tampilan yang bersih, modern, dan minimalis.

- Accent color: Amber Orange (#FF9800) untuk tombol aksi utama, indikator penting, dan elemen interaktif yang menarik perhatian.

- Body font: 'Inter', sans-serif (jika tidak tersedia, gunakan 'Roboto' sebagai fallback).

- Headline font: 'Inter Bold', sans-serif (jika tidak tersedia, gunakan 'Roboto Bold' sebagai fallback).

- Icons: Gunakan ikon dari lucide-react atau inline SVG yang konsisten, modern, dan mudah dipahami untuk navigasi dan aksi.

- Layout: Terapkan desain berbasis kartu (Card) dan daftar (ListTile) untuk pengaturan dan informasi yang terorganisir dengan baik.

- Spacing: Pertahankan padding dan margin yang konsisten (multiples of 8px atau 16px) untuk keterbacaan yang optimal.

- Animations: Gunakan animasi transisi yang halus dan subtil untuk navigasi antar halaman atau perubahan status (misalnya, saat bot diaktifkan/dinonaktifkan).

- Responsiveness: Pastikan antarmuka dapat menyesuaikan diri dengan berbagai ukuran layar perangkat Android, menggunakan tata letak fleksibel.