"use client";

import { useEffect, useRef } from "react";

export type Pose = { x: number; y: number; theta: number };

const WORLD = 11.09; // lebar dan tinggi dunia turtlesim
const SIZE = 440;

// Menggambar jejak dan posisi robot dari pose turtlesim.
export default function PoseCanvas({ pose }: { pose: Pose | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trail = useRef<Pose[]>([]);

  useEffect(() => {
    if (!pose) return;
    // Robot "loncat" (misalnya setelah reset): mulai jejak baru, jangan tarik garis lurus.
    const last = trail.current[trail.current.length - 1];
    if (last && Math.hypot(pose.x - last.x, pose.y - last.y) > 2) trail.current = [];
    trail.current.push(pose);
    if (trail.current.length > 300) trail.current.shift();

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const px = (v: number) => (v / WORLD) * SIZE;
    const py = (v: number) => SIZE - (v / WORLD) * SIZE; // sumbu y dibalik

    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.fillStyle = "#e6f0ff";
    ctx.fillRect(0, 0, SIZE, SIZE);

    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 2;
    ctx.beginPath();
    trail.current.forEach((p, i) =>
      i === 0 ? ctx.moveTo(px(p.x), py(p.y)) : ctx.lineTo(px(p.x), py(p.y)),
    );
    ctx.stroke();

    ctx.save();
    ctx.translate(px(pose.x), py(pose.y));
    ctx.rotate(-pose.theta);
    ctx.fillStyle = "#111";
    ctx.beginPath();
    ctx.moveTo(14, 0);
    ctx.lineTo(-10, 8);
    ctx.lineTo(-10, -8);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }, [pose]);

  return (
    <canvas
      ref={canvasRef}
      width={SIZE}
      height={SIZE}
      className="rounded border"
    />
  );
}
