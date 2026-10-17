// Semua pengaturan koneksi ke ROS 2 ada di sini.
// Tugasmu: perbaiki tiga bagian bertanda TODO sampai badge berubah hijau
// dan posisi kura-kura muncul.

// TODO 1: alamat rosbridge (websocket). Port bawaan rosbridge: 9090.
export const ROSBRIDGE_URL = "ws://localhost:1234";

// Subscriber: topic yang dibaca web untuk posisi kura-kura.
// TODO 2: ganti dengan topic dan tipe pesan yang benar.
// Petunjuk: jalankan `ros2 topic list -t` dan cari yang berakhiran /pose.
export const POSE_TOPIC = "/GANTI_TOPIC";
export const POSE_TYPE = "GANTI/msg/Tipe";

// Publisher: topic yang ditulis web untuk menggerakkan kura-kura.
// Sudah benar, dipakai di TODO 3 (components/TeleopPanel.tsx).
export const CMD_VEL_TOPIC = "/turtle1/cmd_vel";
export const CMD_VEL_TYPE = "geometry_msgs/msg/Twist";
