"use client";

import { useEffect, useState } from "react";
import { Ros, Topic } from "roslib";

export type RosStatus = "connecting" | "connected" | "closed" | "error";

// Membuka koneksi ke rosbridge dan mencoba menyambung ulang tiap 2 detik.
export function useRos(url: string) {
  const [ros, setRos] = useState<Ros | null>(null);
  const [status, setStatus] = useState<RosStatus>("connecting");

  useEffect(() => {
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let current: Ros | null = null;

    const connect = () => {
      setStatus("connecting");
      const r = new Ros({ url });
      current = r;
      r.on("connection", () => {
        setRos(r);
        setStatus("connected");
      });
      r.on("error", () => setStatus("error"));
      r.on("close", () => {
        setRos(null);
        if (stopped) return;
        setStatus("closed");
        timer = setTimeout(connect, 2000);
      });
    };

    connect();
    return () => {
      stopped = true;
      clearTimeout(timer);
      current?.close();
    };
  }, [url]);

  return { ros, status };
}

// Subscribe satu topic dan kembalikan pesan terakhir.
// throttleMs membatasi laju pesan dari sisi rosbridge supaya UI tidak lag.
export function useTopic<T>(
  ros: Ros | null,
  name: string,
  messageType: string,
  throttleMs = 0,
) {
  const [msg, setMsg] = useState<T | null>(null);

  useEffect(() => {
    if (!ros) return;
    const topic = new Topic<T>({
      ros,
      name,
      messageType,
      throttle_rate: throttleMs,
    });
    topic.subscribe((m) => setMsg(m));
    return () => topic.unsubscribe();
  }, [ros, name, messageType, throttleMs]);

  return msg;
}
