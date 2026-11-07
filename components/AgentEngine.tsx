"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Bot, Route, Square } from "lucide-react";

type Kind = "type" | "pop" | "wipe";
const NAMES = ["Scout", "Layout", "Typeset", "Motion", "QA", "Deploy", "Copy", "Lint", "Index", "Render", "Palette", "Review"];
const COLORS = ["#ff3b2f", "#8b5cf6", "#06b6d4", "#f59e0b", "#10b981", "#ec4899", "#3b82f6", "#84cc16", "#f97316", "#14b8a6", "#a855f7", "#eab308"];
const MAX_BUILDING = 6;

interface Job {
  el: HTMLElement;
  kind: Kind;
  phase: "move" | "draw" | "reveal";
  t: number; // time in current phase (ms)
  dur: number; // reveal duration
  text?: string;
  box: HTMLDivElement;
}
interface Cursor {
  el: HTMLDivElement;
  name: string;
  x: number;
  y: number;
  tx: number;
  ty: number;
  idleT: number;
  job: Job | null;
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function robotTag(name: string, color: string) {
  return `<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
<line x1="9" y1="1.5" x2="9" y2="4" stroke="#fff" stroke-width="1.2"/><circle class="robot-ant" cx="9" cy="1.7" r="1.3" fill="#fff"/>
<rect x="2.5" y="4" width="13" height="10" rx="3" fill="#fff"/>
<rect class="robot-eye" x="5" y="7.4" width="2.6" height="3.4" rx="1" fill="${color}"/>
<rect class="robot-eye" x="10.4" y="7.4" width="2.6" height="3.4" rx="1" fill="${color}"/>
<rect x="6.5" y="12" width="5" height="1" rx=".5" fill="${color}" opacity=".5"/></svg><span>${name}</span>`;
}

export default function AgentEngine() {
  const [paused, setPaused] = useState(false);
  const [agentsOn, setAgentsOn] = useState(true);
  const [touring, setTouring] = useState(false);
  const [booting, setBooting] = useState(false);
  const [progress, setProgress] = useState(0);

  const pausedRef = useRef(false);
  const touringRef = useRef(false);
  const stopTourRef = useRef<() => void>(() => {});
  const startTourScrollRef = useRef<() => void>(() => {});

  const setPause = useCallback((v: boolean) => {
    pausedRef.current = v;
    setPaused(v);
  }, []);

  const toggleAgents = useCallback(() => {
    try {
      const params = new URLSearchParams(location.search);
      const cur = document.documentElement.classList.contains("build-mode");
      localStorage.setItem("agents", cur ? "off" : "on");
      params.delete("agents");
      sessionStorage.removeItem("tour");
      const qs = params.toString();
      location.href = location.pathname + (qs ? "?" + qs : "") + location.hash;
    } catch {
      location.reload();
    }
  }, []);

  const startTour = useCallback(() => {
    try {
      sessionStorage.setItem("tour", "1");
    } catch {}
    window.scrollTo(0, 0);
    location.reload();
  }, []);

  const stopTour = useCallback(() => stopTourRef.current(), []);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === "t") startTour();
      else if (k === "a") toggleAgents();
      else if (k === "p") setPause(!pausedRef.current);
      else if (e.key === "Escape") stopTour();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [startTour, toggleAgents, setPause, stopTour]);

  // Main engine
  useEffect(() => {
    const root = document.documentElement;
    const on = root.classList.contains("build-mode");
    setAgentsOn(on);
    const wantTour = (() => {
      try {
        return sessionStorage.getItem("tour") === "1";
      } catch {
        return false;
      }
    })();
    try {
      sessionStorage.removeItem("tour");
    } catch {}

    if (!on) {
      (window as unknown as { __agentsReady?: boolean }).__agentsReady = true;
      return;
    }

    let disposed = false;
    let raf = 0;
    const phone = window.innerWidth < 640;
    const nCursors = phone ? 6 : 10;
    const layer = document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);

    const inView = new Set<HTMLElement>();
    const active = new Set<HTMLElement>();
    const cursors: Cursor[] = [];
    let started = false;

    const build = (el: HTMLElement) => {
      el.dataset.state = "built";
      el.style.clipPath = "";
      el.style.opacity = "";
      el.style.transform = "";
      el.style.transition = "";
      const full = el.dataset.full;
      if (full !== undefined) {
        el.textContent = full;
        delete el.dataset.full;
      }
    };

    const all = () => Array.from(document.querySelectorAll<HTMLElement>("[data-build]"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          const el = en.target as HTMLElement;
          if (en.isIntersecting) inView.add(el);
          else {
            inView.delete(el);
            if (!el.dataset.state && en.boundingClientRect.bottom < 0) build(el); // scrolled past: appear instantly
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -4% 0px" },
    );

    const mkCursor = (i: number): Cursor => {
      const color = COLORS[i % COLORS.length];
      const el = document.createElement("div");
      el.className = "agent-cursor";
      el.style.opacity = "0";
      el.innerHTML = `<svg width="20" height="22" viewBox="0 0 20 22" style="filter:drop-shadow(0 2px 3px rgba(0,0,0,.6))"><path d="M2 1.5 L2 17 L6.2 13.2 L9.2 20 L12 18.8 L9.1 12.2 L15 12 Z" fill="${color}" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/></svg>
<div class="tag" style="background:${color}">${robotTag(NAMES[i % NAMES.length], color)}</div>`;
      layer.appendChild(el);
      const x = Math.random() * window.innerWidth,
        y = Math.random() * window.innerHeight * 0.8;
      return { el, name: NAMES[i % NAMES.length], x, y, tx: x, ty: y, idleT: 0, job: null };
    };
    for (let i = 0; i < nCursors; i++) cursors.push(mkCursor(i));

    const mkBox = (el: HTMLElement, label: string) => {
      const b = document.createElement("div");
      b.className = "wire-box";
      b.innerHTML = `<span>${label}</span><i style="left:-4px;top:-4px"></i><i style="right:-4px;top:-4px"></i><i style="left:-4px;bottom:-4px"></i><i style="right:-4px;bottom:-4px"></i>`;
      b.style.opacity = "0";
      layer.appendChild(b);
      return b;
    };

    const ancestorsBuilt = (el: HTMLElement) => {
      let p = el.parentElement?.closest<HTMLElement>("[data-build]");
      while (p) {
        if (p.dataset.state !== "built") return false;
        p = p.parentElement?.closest<HTMLElement>("[data-build]") ?? null;
      }
      return true;
    };

    const nextTargets = () => {
      const list: { el: HTMLElement; top: number; left: number }[] = [];
      inView.forEach((el) => {
        if (el.dataset.state || active.has(el)) return;
        if (!ancestorsBuilt(el)) return;
        const r = el.getBoundingClientRect();
        if (r.width < 2 || r.height < 2) {
          build(el);
          return;
        }
        list.push({ el, top: r.top, left: r.left });
      });
      list.sort((a, b) => Math.round(a.top / 24) - Math.round(b.top / 24) || a.left - b.left);
      return list.map((l) => l.el);
    };

    const startJob = (c: Cursor, el: HTMLElement) => {
      const kind = (el.dataset.build as Kind) || "pop";
      const label = kind === "type" ? "text" : kind === "wipe" ? "headline" : "block";
      const job: Job = { el, kind, phase: "move", t: 0, dur: 600, box: mkBox(el, label) };
      if (kind === "type") {
        job.text = el.textContent || "";
        job.dur = Math.min(1500, Math.max(350, job.text.length * 14));
        el.dataset.full = job.text;
      } else job.dur = kind === "wipe" ? 750 : 520;
      active.add(el);
      c.job = job;
    };

    const finish = (c: Cursor) => {
      const j = c.job;
      if (!j) return;
      build(j.el);
      j.box.remove();
      active.delete(j.el);
      c.job = null;
      c.idleT = 0;
    };

    const rectOf = (el: HTMLElement) => el.getBoundingClientRect();

    let last = performance.now();
    const tick = (now: number) => {
      if (disposed) return;
      raf = requestAnimationFrame(tick);
      const dt = Math.min(64, now - last);
      last = now;
      if (pausedRef.current) return;

      // assign jobs
      let building = cursors.filter((c) => c.job).length;
      if (building < MAX_BUILDING) {
        const targets = nextTargets();
        for (const c of cursors) {
          if (building >= MAX_BUILDING || !targets.length) break;
          if (c.job) continue;
          const el = targets.shift()!;
          startJob(c, el);
          building++;
        }
      }

      for (const c of cursors) {
        c.el.style.opacity = "1";
        const j = c.job;
        if (j) {
          const r = rectOf(j.el);
          if (j.phase === "move") {
            j.t += dt;
            c.tx = r.left;
            c.ty = r.top;
            const d = Math.hypot(c.tx - c.x, c.ty - c.y);
            if ((d < 10 && j.t > 250) || j.t > 1400) {
              j.phase = "draw";
              j.t = 0;
            }
          } else if (j.phase === "draw") {
            j.t += dt;
            const p = ease(Math.min(1, j.t / 380));
            c.tx = r.left + r.width * p;
            c.ty = r.top + r.height * p;
            j.box.style.opacity = "1";
            j.box.style.transform = `translate(${r.left}px,${r.top}px)`;
            j.box.style.width = Math.max(4, r.width * p) + "px";
            j.box.style.height = Math.max(4, r.height * p) + "px";
            if (j.t >= 380) {
              j.phase = "reveal";
              j.t = 0;
              j.el.dataset.state = "building";
              if (j.kind === "wipe") j.el.style.clipPath = "inset(0 100% 0 0)";
              if (j.kind === "pop") {
                j.el.style.opacity = "0";
                j.el.style.transform = "scale(0.92)";
              }
              if (j.kind === "type") j.el.textContent = "";
            }
          } else {
            j.t += dt;
            const p = Math.min(1, j.t / j.dur);
            j.box.style.transform = `translate(${r.left}px,${r.top}px)`;
            j.box.style.width = r.width + "px";
            j.box.style.height = r.height + "px";
            j.box.style.opacity = String(1 - p * 0.7);
            if (j.kind === "type" && j.text !== undefined) {
              const n = Math.floor(j.text.length * p);
              j.el.textContent = "";
              const a = document.createElement("span");
              a.textContent = j.text.slice(0, n);
              const b = document.createElement("span");
              b.textContent = j.text.slice(n);
              b.style.visibility = "hidden";
              j.el.append(a, b);
              c.tx = r.left + Math.min(r.width, r.width * p);
              c.ty = r.top + r.height * 0.6;
            } else if (j.kind === "wipe") {
              const q = ease(p);
              j.el.style.clipPath = `inset(0 ${(1 - q) * 100}% 0 0)`;
              c.tx = r.left + r.width * q;
              c.ty = r.top + r.height / 2;
            } else {
              const q = easeOut(p);
              j.el.style.opacity = String(q);
              j.el.style.transform = `scale(${0.92 + 0.08 * q})`;
              c.tx = r.left + r.width * 0.5;
              c.ty = r.top + r.height * 0.5;
            }
            if (p >= 1) finish(c);
          }
        } else {
          c.idleT += dt;
          if (c.idleT > 1800 + Math.random() * 1800) {
            c.idleT = 0;
            c.tx = 40 + Math.random() * (window.innerWidth - 120);
            c.ty = 60 + Math.random() * (window.innerHeight - 160);
          }
        }
        const k = 1 - Math.exp(-dt / (j ? 90 : 420));
        c.x += (c.tx - c.x) * k;
        c.y += (c.ty - c.y) * k;
        c.el.style.transform = `translate(${c.x}px,${c.y}px)`;
      }
    };

    const startEngine = () => {
      if (disposed || started) return;
      started = true;
      all().forEach((el) => io.observe(el));
      last = performance.now();
      raf = requestAnimationFrame(tick);
      if (wantTour) waitThenTour();
    };

    // --- Tour: wait for hero to build, then scroll the whole site smoothly ---
    let tourRaf = 0;
    const endTour = () => {
      cancelAnimationFrame(tourRaf);
      touringRef.current = false;
      setTouring(false);
      window.removeEventListener("wheel", endTour);
      window.removeEventListener("touchstart", endTour);
      window.removeEventListener("keydown", onTourKey);
    };
    const onTourKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key.startsWith("Arrow") || e.key.startsWith("Page")) endTour();
    };
    stopTourRef.current = endTour;

    const runScroll = () => {
      const dist = () => document.documentElement.scrollHeight - window.innerHeight;
      const speed = 150; // px per second at cruise
      const ramp = 1400; // ms ease in / ease out
      let pos = 0;
      let t0 = performance.now();
      let prev = t0;
      touringRef.current = true;
      setTouring(true);
      window.addEventListener("wheel", endTour, { passive: true });
      window.addEventListener("touchstart", endTour, { passive: true });
      window.addEventListener("keydown", onTourKey);
      const step = (now: number) => {
        if (!touringRef.current) return;
        tourRaf = requestAnimationFrame(step);
        const dt = Math.min(64, now - prev);
        prev = now;
        if (pausedRef.current) return;
        const D = dist();
        const sinceStart = now - t0;
        const remaining = D - pos;
        const inF = Math.min(1, sinceStart / ramp);
        const outF = Math.min(1, Math.max(0.04, remaining / (speed * (ramp / 1000) * 0.5)));
        const v = speed * ease(inF) * Math.min(1, ease(outF));
        // slow down if a section is still being built just below the fold
        const waiting = inView.size && Array.from(inView).some((e) => !e.dataset.state && e.getBoundingClientRect().top < window.innerHeight * 0.55);
        pos += (v * dt * (waiting ? 0.25 : 1)) / 1000;
        window.scrollTo(0, pos);
        if (pos >= D - 1) {
          setTimeout(endTour, 600);
          touringRef.current = false;
        }
      };
      tourRaf = requestAnimationFrame(step);
    };
    startTourScrollRef.current = runScroll;

    const waitThenTour = () => {
      const t0 = performance.now();
      const check = () => {
        if (disposed) return;
        const heroPending = all().some((el) => !el.dataset.state && el.getBoundingClientRect().top < window.innerHeight && el.getBoundingClientRect().bottom > 0);
        const anyActive = cursors.some((c) => c.job);
        if ((!heroPending && !anyActive) || performance.now() - t0 > 15000) setTimeout(runScroll, 700);
        else setTimeout(check, 200);
      };
      setTimeout(check, 600);
    };

    // --- Boot loader, then start ---
    setBooting(true);
    const b0 = performance.now();
    const bootDur = 900;
    const bootTick = () => {
      if (disposed) return;
      const p = Math.min(1, (performance.now() - b0) / bootDur);
      setProgress(p);
      if (p < 1) requestAnimationFrame(bootTick);
      else {
        setBooting(false);
        startEngine();
      }
    };
    (window as unknown as { __agentsReady?: boolean }).__agentsReady = true;
    requestAnimationFrame(bootTick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(tourRaf);
      io.disconnect();
      layer.remove();
      window.removeEventListener("wheel", endTour);
      window.removeEventListener("touchstart", endTour);
      window.removeEventListener("keydown", onTourKey);
    };
  }, []);

  return (
    <>
      {booting && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[#09090b]" role="status" aria-live="polite">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-zinc-400">
            <Bot size={16} className="text-[#ff3b2f]" /> BOOTING AGENTS
          </div>
          <div className="h-[2px] w-48 overflow-hidden rounded bg-zinc-800">
            <div className="h-full bg-[#ff3b2f]" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      )}
      <div className="fixed inset-x-0 bottom-4 z-[95] mx-auto flex w-max max-w-[calc(100vw-16px)] items-center gap-1 rounded-full border border-zinc-800 bg-[#0c0c0f]/95 p-1 shadow-2xl" role="toolbar" aria-label="Animation controls">
        <button className="dock-btn" data-on={paused} onClick={() => setPause(!paused)} disabled={!agentsOn} aria-pressed={paused} title="Pause (P)">
          {paused ? <Play size={14} /> : <Pause size={14} />} {paused ? "Resume" : "Pause"}
        </button>
        <button className="dock-btn" data-on={agentsOn} onClick={toggleAgents} aria-pressed={agentsOn} title="Agents on/off (A)">
          <Bot size={14} /> Agents {agentsOn ? "on" : "off"}
        </button>
        {touring ? (
          <button className="dock-btn primary" onClick={stopTour} title="Stop tour (Esc)">
            <Square size={13} /> Stop
          </button>
        ) : (
          <button className="dock-btn primary" onClick={startTour} title="Tour (T)">
            <Route size={14} /> Tour
          </button>
        )}
      </div>
    </>
  );
}
