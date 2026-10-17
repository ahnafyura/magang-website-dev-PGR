import type { RosStatus } from "@/lib/useRos";

const LABEL: Record<RosStatus, string> = {
  connecting: "Menghubungkan...",
  connected: "Terhubung",
  closed: "Terputus, mencoba lagi",
  error: "Error koneksi",
};

const COLOR: Record<RosStatus, string> = {
  connecting: "bg-yellow-400",
  connected: "bg-green-500",
  closed: "bg-orange-500",
  error: "bg-red-500",
};

export default function ConnectionBadge({ status }: { status: RosStatus }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
      <span className={`h-2.5 w-2.5 rounded-full ${COLOR[status]}`} />
      {LABEL[status]}
    </span>
  );
}
