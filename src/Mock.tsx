import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { Project } from "./data";

const rows = [["REQ-001", "Dubai → Abu Dhabi", "Pending"], ["REQ-002", "Sharjah → Jebel Ali", "Confirmed"], ["REQ-003", "Dubai → Al Ain", "In Transit"], ["REQ-004", "Abu Dhabi → Dubai", "Completed"], ["REQ-005", "Dubai → Fujairah", "Pending"]];
const tone: Record<string, string> = { Pending: "bg-red-100 text-red-600", Confirmed: "bg-emerald-100 text-emerald-700", "In Transit": "bg-blue-100 text-blue-600", Completed: "bg-emerald-100 text-emerald-700" };

/**
 * Real screenshot in the same browser-chrome frame the mock windows use, so
 * captured shots sit consistently next to the stylised ones.
 * `src` is a path relative to /public; BASE_URL keeps it correct under Pages.
 */
export function Shot({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl shadow-black/20 ${className}`}>
      <div className="flex gap-1.5 bg-night px-3 py-2">{["#ff5f57", "#febc2e", "#28c840"].map((c) => <i key={c} className="size-2 rounded-full" style={{ background: c }} />)}</div>
      <img src={`${import.meta.env.BASE_URL}${src}`} alt={alt} loading="lazy" decoding="async" className="block w-full" />
    </div>
  );
}

/**
 * Small (h-24) version of the same frame, for the project list. The image is
 * cropped from the top with object-cover so the headline stays in view.
 */
export function ShotThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="h-24 overflow-hidden rounded-lg border border-black/10 bg-white shadow-md">
      <div className="flex gap-1.5 bg-night px-3 py-2">{["#ff5f57", "#febc2e", "#28c840"].map((c) => <i key={c} className="size-2 rounded-full" style={{ background: c }} />)}</div>
      <img src={`${import.meta.env.BASE_URL}${src}`} alt={alt} loading="lazy" decoding="async" className="h-[72px] w-full object-cover object-top" />
    </div>
  );
}

/** Stylised UI window, used where no real screenshot exists yet. */
export function Window({ kind = "dash", className = "" }: { kind?: Project["kind"]; className?: string }) {
  const dark = kind === "gym" || kind === "print";
  return (
    <div className={`overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl shadow-black/20 ${className}`}>
      <div className="flex gap-1.5 bg-night px-3 py-2">{["#ff5f57", "#febc2e", "#28c840"].map((c) => <i key={c} className="size-2 rounded-full" style={{ background: c }} />)}</div>
      <div className="flex h-full min-h-40">
        <div className="hidden w-1/5 space-y-2 bg-night p-3 sm:block">
          <div className="mb-3 h-2 w-8 rounded bg-white/70" />
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className={`h-1.5 rounded ${i === 0 ? "bg-wine" : "bg-white/20"}`} />)}
        </div>
        <div className={`flex-1 p-3 ${dark ? "bg-neutral-900" : "bg-neutral-50"}`}>
          <div className={`mb-2 h-2 w-24 rounded ${dark ? "bg-white/70" : "bg-neutral-800"}`} />
          {kind === "table" ? (
            <div className="space-y-1.5">
              {rows.map(([id, route, s]) => (
                <div key={id} className="flex items-center justify-between rounded bg-white px-2 py-1 text-[8px] shadow-sm">
                  <b>{id}</b><span className="text-neutral-500">{route}</span><span className={`rounded px-1.5 py-0.5 ${tone[s]}`}>{s}</span>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mb-2 grid grid-cols-4 gap-1.5">
                {["24", "8", "AED 127k", "32"].map((v) => <div key={v} className={`rounded p-1.5 text-[9px] font-semibold ${dark ? "bg-white/10 text-white" : "bg-white shadow-sm"}`}>{v}</div>)}
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <div className="col-span-2 h-20 rounded bg-[radial-gradient(circle_at_30%_40%,#cfe3c7,#e8e4d8)]" />
                <div className={`space-y-1.5 rounded p-1.5 ${dark ? "bg-white/10" : "bg-white"}`}>{[0, 1, 2, 3].map((i) => <div key={i} className="h-1.5 rounded bg-neutral-300/70" />)}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/** Pointer-driven 3D tilt — the one "creative" moment in the hero. */
export function Tilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 14 }), sy = useSpring(y, { stiffness: 120, damping: 14 });
  const rx = useTransform(sy, [-0.5, 0.5], [7, -7]), ry = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      onPointerMove={(e) => {
        // Mouse only: on touch, pointermove keeps firing while the finger
        // scrolls, which swung the mock around mid-scroll.
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >{children}</motion.div>
  );
}

export function Phone() {
  return (
    <div className="mx-auto w-40 rounded-[1.6rem] border-4 border-neutral-900 bg-white p-3 shadow-2xl shadow-black/25">
      <div className="mb-2 text-[9px] font-semibold">Today's Schedule</div>
      <div className="mx-auto mb-2 grid size-16 place-items-center rounded-full border-[6px] border-emerald-400 text-xs font-semibold text-emerald-600">78%</div>
      <div className="flex h-10 items-end gap-1">{[40, 60, 45, 80, 70, 95].map((h, i) => <div key={i} className="flex-1 rounded-sm bg-emerald-500" style={{ height: `${h}%` }} />)}</div>
    </div>
  );
}
