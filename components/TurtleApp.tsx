"use client";

import ConnectionBadge from "./ConnectionBadge";
import PoseCanvas, { type Pose } from "./PoseCanvas";
import TeleopPanel from "./TeleopPanel";
import { POSE_TOPIC, POSE_TYPE, ROSBRIDGE_URL } from "@/lib/rosConfig";
import { useRos, useTopic } from "@/lib/useRos";

export default function TurtleApp() {
  const { ros, status } = useRos(ROSBRIDGE_URL);
  // Subscriber: setiap pesan baru di POSE_TOPIC mengubah nilai pose.
  const pose = useTopic<Pose>(ros, POSE_TOPIC, POSE_TYPE, 100);

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Turtle Web</h1>
        <ConnectionBadge status={status} />
      </header>

      <div className="grid gap-6 md:grid-cols-[440px_1fr]">
        <PoseCanvas pose={pose} />
        <div className="space-y-6">
          {pose ? (
            <p className="font-mono text-sm">
              x={pose.x.toFixed(2)} y={pose.y.toFixed(2)} theta={pose.theta.toFixed(2)}
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Belum ada data pose dari {POSE_TOPIC}.
            </p>
          )}
          {ros ? (
            <TeleopPanel ros={ros} />
          ) : (
            <p className="text-sm text-gray-500">
              Tombol kontrol muncul setelah terhubung ke rosbridge.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
