# Starter Web Turtle

Website untuk menggerakkan turtlesim (ROS 2) dari browser lewat rosbridge.
Hasil akhir yang kamu kejar: buka web, badge hijau, kura-kura tampil dan bisa digerakkan.

Panduan setup langkah demi langkah: https://ahnafyura.github.io/magang-website-dev-PGR/

## Prasyarat

- Ubuntu 24.04 dengan ROS 2 Jazzy
- Node.js 20 atau lebih baru
- Paket ROS: `sudo apt install ros-jazzy-rosbridge-suite ros-jazzy-turtlesim`

## Menjalankan

Terminal 1 (ROS 2: turtlesim dan rosbridge):

    source /opt/ros/jazzy/setup.bash
    ros2 launch ros/web_demo.launch.py

Terminal 2 (web):

    npm install
    npm run dev

Buka http://localhost:3000.

## Tugasmu

Awalnya badge merah dan tidak ada data. Cari tiga bagian bertanda `TODO`:

    grep -rn "TODO" lib components

| TODO | File | Yang dikerjakan |
|---|---|---|
| 1 | `lib/rosConfig.ts` | Perbaiki alamat rosbridge |
| 2 | `lib/rosConfig.ts` | Ganti subscriber ke topic pose turtle |
| 3 | `components/TeleopPanel.tsx` | Tulis publisher yang mengirim Twist |

Selesai kalau: badge hijau, angka x y theta bergerak, dan tombol (atau W A S D)
menggerakkan kura-kura di jendela turtlesim.

## Tantangan tambahan

- Tambah tombol untuk memanggil service `/clear` (hapus jejak) atau `/turtle1/set_pen`.
- Tampilkan kecepatan linear dari pesan pose.
- Ganti warna jejak di `components/PoseCanvas.tsx`.

## Struktur

    app/            halaman Next.js
    components/     TurtleApp (halaman utama), TeleopPanel, PoseCanvas, ConnectionBadge
    lib/            useRos (koneksi ke rosbridge), rosConfig (pengaturan)
    ros/            launch file turtlesim + rosbridge
    Dockerfile      membungkus web jadi image Docker (bahan Lab 8)
    deploy/         contoh konfigurasi Nginx (bahan Lab 8)
