import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { profile, heroStats, workStats, projects, extraProjects, stack, timeline, skillGroups, principles } from "@/data/resume";

const Eyebrow = ({ children }: { children: string }) => (
  <p data-build="type" className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff3b2f]">
    {children}
  </p>
);

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div
        data-build="wipe"
        className="metal-word pointer-events-none absolute left-1/2 top-[47%] -translate-x-1/2 md:top-[7%] whitespace-nowrap text-[clamp(4.5rem,21.5vw,23rem)]"
        aria-hidden="true"
      >
        PORTFOLIO
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <div className="relative h-[68svh] min-h-[420px] md:h-[88svh]">
          <div className="hero-glow absolute left-1/2 top-[40%] h-[90%] w-[140%] -translate-x-1/2 -translate-y-1/2" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img data-build="pop" src="/headshot.png" alt={`${profile.name}, portrait`} className="hero-photo relative h-full w-auto max-w-none object-contain" />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 content-between gap-6 px-5 pb-24 pt-20 md:grid-cols-[1fr_auto] md:content-end md:px-10 md:pb-28">
        <div className="max-w-[32rem] md:self-end">
          <p data-build="type" className="font-brush text-3xl text-zinc-300 md:text-4xl">
            Hello, I&apos;m
          </p>
          <h1 data-build="type" className="font-anton text-[clamp(3.2rem,9vw,7rem)] uppercase leading-[0.95] text-white">
            {profile.name}
          </h1>
          <p data-build="type" className="mt-2 font-mono text-xs uppercase tracking-widest text-[#ff3b2f] md:text-sm">
            {profile.role}
          </p>
          <p data-build="type" className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-300 md:text-base">
            {profile.bio}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a data-build="pop" href="#work" className="btn">
              View work <ArrowDownRight size={16} />
            </a>
            <p data-build="type" className="flex items-center gap-1.5 font-mono text-xs text-zinc-400">
              Based in {profile.city}
            </p>
          </div>
        </div>

        <div className="flex gap-3 md:flex-col md:self-end md:gap-4">
          {heroStats.map((s) => (
            <div key={s.l} data-build="pop" className="flex-1 rounded-xl border border-zinc-800/80 bg-[#09090b]/70 px-4 py-3 md:min-w-[180px]">
              <p className="font-anton text-3xl text-white md:text-5xl">{s.v}</p>
              <p className="mt-1 text-[11px] leading-snug text-zinc-400 md:text-xs">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-7xl scroll-mt-10 px-5 py-24 md:px-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
        <div>
          <Eyebrow>01 / Work</Eyebrow>
          <h2 data-build="wipe" className="mt-3 font-anton text-[clamp(2.8rem,8vw,6.5rem)] uppercase leading-none text-white">
            Work that ships
          </h2>
          <p data-build="type" className="mt-4 max-w-md text-zinc-400">
            Agents, platforms and compilers, each tested, gated and deployed.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {workStats.map((s) => (
            <div key={s.l} data-build="pop" className="rounded-xl border border-zinc-800 p-3">
              <p className="font-anton text-2xl text-[#ff3b2f] md:text-3xl">{s.v}</p>
              <p className="mt-1 text-[11px] leading-snug text-zinc-400">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <article key={p.name} data-build="pop" className="card flex flex-col p-6">
            <p data-build="type" className="font-mono text-[11px] text-zinc-500">
              {String(i + 1).padStart(2, "0")} / {p.sub}
            </p>
            <h3 data-build="type" className="mt-2 font-anton text-3xl uppercase tracking-wide text-white">
              {p.name}
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff3b2f]" />
                  <span data-build="type">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
        <article data-build="pop" className="card flex flex-col p-6">
          <p data-build="type" className="font-mono text-[11px] text-zinc-500">
            07 / Additional projects
          </p>
          <h3 data-build="type" className="mt-2 font-anton text-3xl uppercase tracking-wide text-white">
            More builds
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
            {extraProjects.map((p) => (
              <li key={p.name} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff3b2f]" />
                <span data-build="type">
                  {p.name}: {p.d}
                </span>
              </li>
            ))}
          </ul>
          <a href={profile.github} target="_blank" rel="noreferrer" className="link-icon mt-auto pt-5 text-sm">
            <Github size={16} /> Code on GitHub <ArrowUpRight size={14} />
          </a>
        </article>
      </div>
    </section>
  );
}

export function Stack() {
  const row = stack.map((s) => (
    <span key={s} className="mx-2 whitespace-nowrap rounded-full border border-zinc-800 bg-[#0f0f12] px-5 py-2.5 font-mono text-sm text-zinc-300">
      {s}
    </span>
  ));
  return (
    <section className="py-16">
      <div className="mx-auto mb-8 max-w-7xl px-5 md:px-10">
        <Eyebrow>02 / Stack</Eyebrow>
        <h2 data-build="wipe" className="mt-3 font-anton text-[clamp(2.4rem,6vw,4.5rem)] uppercase leading-none text-white">
          Tools I build with
        </h2>
      </div>
      <div data-build="pop" className="marquee overflow-hidden" aria-label="Tech stack">
        <div className="marquee-track">
          <div className="flex shrink-0 py-2">{row}</div>
          <div className="flex shrink-0 py-2" aria-hidden="true">
            {row}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Record() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-24 md:px-10">
      <Eyebrow>03 / Record</Eyebrow>
      <h2 data-build="wipe" className="mt-3 font-anton text-[clamp(2.8rem,8vw,6rem)] uppercase leading-none text-white">
        The record
      </h2>
      <ol className="mt-12 border-l border-zinc-800">
        {timeline.map((t) => (
          <li key={t.title} data-build="pop" className="relative pb-10 pl-7 last:pb-0 md:pl-10">
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#ff3b2f] shadow-[0_0_12px_#ff3b2f]" />
            <p className="flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-500">
              <span data-build="type">{t.when}</span>
              <span className="rounded border border-zinc-800 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-[#ff3b2f]">{t.kind}</span>
            </p>
            <h3 data-build="type" className="mt-1.5 text-xl font-semibold text-white md:text-2xl">
              {t.title}
            </h3>
            <p data-build="type" className="mt-1 text-sm text-zinc-400">
              {t.org}
            </p>
            {t.bullets && (
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-300">
                {t.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
                    <span data-build="type">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

export function About() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-10">
      <Eyebrow>04 / About</Eyebrow>
      <h2 data-build="wipe" className="mt-3 font-anton text-[clamp(2.8rem,8vw,6rem)] uppercase leading-none text-white">
        About me
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="space-y-5 text-base leading-relaxed text-zinc-300 md:text-lg">
          <p data-build="type">
            I&apos;m a B.Tech Computer Science student (Data Science specialization) at VIT Vellore. I build backend, full-stack and AI systems end to end: multi-agent automation, RAG pipelines, real-time WebSocket platforms and secure REST APIs with role-based access control.
          </p>
          <p data-build="type">
            I have written 500+ automated tests across projects. This summer I interned at Titan Company Limited (RAG chatbot and AI analytics modules) and at Ardent Software (generative AI and prompt engineering, where I built INTERVION). {profile.seeking}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {principles.map((p, i) => (
            <div key={p.t} data-build="pop" className="card p-5">
              <p className="font-mono text-[11px] text-[#ff3b2f]">0{i + 1}</p>
              <h3 className="mt-1 font-semibold text-white">{p.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => (
          <div key={g.title} data-build="pop" className="card p-5">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500">{g.title}</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 pb-10 pt-24 md:px-10">
      <Eyebrow>05 / Contact</Eyebrow>
      <div data-build="pop" className="relative mt-4 overflow-hidden rounded-3xl border border-[#3a1512] bg-gradient-to-br from-[#2a0c0a] via-[#12090a] to-[#09090b] p-8 md:p-16">
        <h2 data-build="wipe" className="font-anton text-[clamp(2.6rem,7.5vw,6rem)] uppercase leading-none text-white">
          Let&apos;s build something
        </h2>
        <p data-build="type" className="mt-4 max-w-lg text-zinc-300">
          {profile.seeking} Send a note and I&apos;ll reply.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${profile.email}`} className="btn">
            <Mail size={16} /> {profile.email}
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn ghost">
            <Github size={16} /> GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn ghost">
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
      </div>
      <footer className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-zinc-900 pb-24 pt-6 font-mono text-xs text-zinc-500 sm:flex-row sm:items-center">
        <p data-build="type">
          © 2026 {profile.name}
        </p>
        <p data-build="type">{profile.city}</p>
      </footer>
    </section>
  );
}
