"use client";

import { useEffect, useState } from "react";
import { Service, Topic } from "roslib";
import type { Ros } from "roslib";
import { CMD_VEL_TOPIC, CMD_VEL_TYPE } from "@/lib/rosConfig";

type Twist = {
  linear: { x: number; y: number; z: number };
  angular: { x: number; y: number; z: number };
};

type Cmd = { lin: number; ang: number };

const twist = ({ lin, ang }: Cmd): Twist => ({
  linear: { x: lin, y: 0, z: 0 },
  angular: { x: 0, y: 0, z: ang },
});

const KEYS: Record<string, Cmd> = {
  w: { lin: 1.5, ang: 0 },
  arrowup: { lin: 1.5, ang: 0 },
  s: { lin: -1.5, ang: 0 },
  arrowdown: { lin: -1.5, ang: 0 },
  a: { lin: 0, ang: 1.5 },
  arrowleft: { lin: 0, ang: 1.5 },
  d: { lin: 0, ang: -1.5 },
  arrowright: { lin: 0, ang: -1.5 },
};

// Kirim perintah gerak dari browser: publish Twist ke CMD_VEL_TOPIC.
export default function TeleopPanel({ ros }: { ros: Ros }) {
  // cmd = perintah yang sedang ditahan. null = tombol dilepas.
  const [cmd, setCmd] = useState<Cmd | null>(null);

  useEffect(() => {
    const pub = new Topic<Twist>({
      ros,
      name: CMD_VEL_TOPIC,
      messageType: CMD_VEL_TYPE,
    });
    if (!cmd) {
      // TODO 3a: lepas tombol = berhenti. Publish twist({ lin: 0, ang: 0 }).
      return;
    }
    // Selama tombol ditahan, publish 10 kali per detik.
    // TODO 3b: publish twist(cmd) lewat `pub` setiap 100 ms.
    // Petunjuk: pub.publish(...) di dalam setInterval.
    const timer = setInterval(() => {}, 100);
    return () => clearInterval(timer);
  }, [ros, cmd]);

  // Keyboard: W A S D atau tombol panah.
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const c = KEYS[e.key.toLowerCase()];
      if (c && !e.repeat) setCmd(c);
    };
    const up = (e: KeyboardEvent) => {
      if (KEYS[e.key.toLowerCase()]) setCmd(null);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  const reset = () => {
    const svc = new Service<Record<string, never>, Record<string, never>>({
      ros,
      name: "/reset",
      serviceType: "std_srvs/srv/Empty",
    });
    svc.callService({}, () => {});
  };

  const btn = "rounded border px-4 py-2 active:bg-gray-200 select-none";
  const bind = (lin: number, ang: number) => ({
    onPointerDown: () => setCmd({ lin, ang }),
    onPointerUp: () => setCmd(null),
    onPointerLeave: () => setCmd(null),
  });

  return (
    <div className="space-y-2">
      <h2 className="font-semibold">Teleop</h2>
      <div className="grid w-48 grid-cols-3 gap-2">
        <span />
        <button className={btn} {...bind(1.5, 0)}>▲</button>
        <span />
        <button className={btn} {...bind(0, 1.5)}>◀</button>
        <button className={btn} onClick={() => setCmd(null)}>■</button>
        <button className={btn} {...bind(0, -1.5)}>▶</button>
        <span />
        <button className={btn} {...bind(-1.5, 0)}>▼</button>
        <span />
      </div>
      <p className="text-xs text-gray-500">Keyboard: W A S D atau tombol panah.</p>
      <button className={btn} onClick={reset}>Reset simulasi</button>
    </div>
  );
}
