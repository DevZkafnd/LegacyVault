"use client";
import { useEffect, useState } from "react";

type ToastKind = "success" | "error" | "info";
type ToastItem = { id: number; kind: ToastKind; message: string };

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ kind?: ToastKind; message: string }>;
      const id = Date.now() + Math.floor(Math.random() * 1000);
      const kind = ce.detail.kind || "info";
      setToasts((prev) => [...prev, { id, kind, message: ce.detail.message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    };
    window.addEventListener("lv-toast", handler as EventListener);
    return () => window.removeEventListener("lv-toast", handler as EventListener);
  }, []);

  const bg = (k: ToastKind) =>
    k === "success"
      ? "from-green-700/80 to-emerald-700/80 border-green-500"
      : k === "error"
      ? "from-red-700/80 to-rose-700/80 border-red-500"
      : "from-gray-700/80 to-gray-800/80 border-gray-500";

  const icon = (k: ToastKind) => (k === "success" ? "✅" : k === "error" ? "⚠️" : "🔔");

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`min-w-[260px] max-w-[340px] px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-sm gold-divider bg-gradient-to-br ${bg(
            t.kind
          )}`}
        >
          <div className="flex items-center gap-3">
            <span className="text-yellow-300">{icon(t.kind)}</span>
            <p className="text-sm text-gray-100">{t.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

