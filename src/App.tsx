import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue } from "motion/react";
import { ArrowRight, ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { featured, independent, more, stack, stats, type Project } from "./data";
import { Phone, Shot, ShotThumb, Tilt, Window } from "./Mock";

const nav = ["About", "Projects", "Experience", "Skills", "Contact"];
// 90rem, not the usual 72rem: the case-study screenshots are the widest thing
// on the page and 1152px left a visible gutter of dead paper on a 1440p screen.
// Gutter steps with the viewport so the measure stays readable on a phone.
const wrap = "mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12";
const label = "text-xs font-medium tracking-wide text-wine";
const Tag = ({ t }: { t: string }) => <span className="rounded-md border border-line bg-white/60 px-2.5 py-1 text-xs text-muted">{t}</span>;

function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const v = useMotionValue(0);
  const [out, setOut] = useState(0);
  useEffect(() => { if (inView) { const c = animate(v, to, { duration: 1.2, ease: "easeOut", onUpdate: (n) => setOut(Math.round(n)) }); return () => c.stop(); } }, [inView, to, v]);
  return <span ref={ref}>{out}{suffix}</span>;
}

const Button = ({ children, href, solid, className = "" }: { children: React.ReactNode; href: string; solid?: boolean; className?: string }) => (
  <a href={href} className={`group inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition ${solid ? "bg-wine text-white shadow-lg shadow-wine/25 hover:bg-wine-dark" : "text-ink hover:text-wine"} ${className}`}>
    {children}<ArrowRight size={15} className="transition group-hover:translate-x-1" />
  </a>
);

/** Official WhatsApp mark — lucide dropped its brand icons, so the glyph is inlined. */
const WhatsApp = ({ size = 24, ...rest }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...rest}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.987 2.896 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.886-9.885 9.886M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.945c0 2.096.549 4.142 1.588 5.945L0 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.585 0 11.946-5.359 11.949-11.945a11.87 11.87 0 0 0-3.426-8.398" />
  </svg>
);

/** The full-width, featured-style layout a list row grows into. */
function CaseStudy({ p, n, lead }: { p: Project; n: string; lead?: boolean }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
      <div>
        <span className="rounded bg-wine/10 px-2 py-1 text-xs text-wine">{lead ? "Featured project" : "Case study"}</span>
        <div className="mt-4 text-sm text-wine">{n}</div>
        <h3 className="font-serif text-3xl leading-tight sm:text-4xl">{p.title}</h3>
        <p className="mt-3 text-xs tracking-widest text-muted">A S CODELABS · INTERNSHIP PROJECT</p>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">{p.blurb}</p>
        {p.highlights && (
          <ul className="mt-5 max-w-sm space-y-2">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-muted"><i className="mt-[9px] size-1 shrink-0 rounded-full bg-wine" />{h}</li>
            ))}
          </ul>
        )}
        <div className="mt-5 flex flex-wrap gap-2">{p.tags.map((t) => <Tag key={t} t={t} />)}</div>
        <div className="mt-6 flex flex-wrap items-center gap-5">
          <Button solid href="#">View Case Study</Button>
          {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 text-sm text-wine">Live site<ArrowUpRight size={15} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>}
        </div>
      </div>
      <Tilt>{p.shot ? <Shot src={p.shot} alt={p.shotAlt ?? p.title} /> : <Window kind={p.kind} className="aspect-[16/10]" />}</Tilt>
    </div>
  );
}

/**
 * One clock and easing for both directions, so a hand-off is a single motion.
 * 600ms on the standard ease-in-out rather than a decelerate curve: a
 * decelerate covers most of the distance in the first fifth of the time and
 * reads as fast no matter how long it runs, whereas easing in and out spends
 * the duration evenly and settles as deliberately as it started. Because both
 * directions share it, the closing and opening rows always sum to one
 * monotonic height change.
 */
const GROW_MS = 600;
const GROW_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

/**
 * A project row. Collapsed it is the compact summary line; hovering — or
 * focusing — it grows into the full featured-project layout below.
 *
 * Only one layer is in flow at a time; the other is pulled out of it, so the
 * row box's natural height is always the height of the layer on show. That box
 * is animated in explicit pixels, measured from the layer being shown, because
 * it is the row's height that the whole page above and below slides by.
 * Animating a grid track instead looks equivalent but does not interpolate
 * reliably: the incoming layer snaps to full height while the outgoing one
 * still holds its old height for the full duration, so the page visibly
 * overshoots and then settles.
 *
 * Opacity crossfades on a shorter clock than the height, so the outgoing copy
 * is gone before the incoming one is uncovered — that is what stops both
 * versions of a project being visible at once. Touch devices have no hover, so
 * there the row is a tap toggle instead.
 */
function ProjectRow({ p, i, open, onEnter, onLeave, onToggle }: {
  p: Project; i: number; open: boolean;
  onEnter: () => void; onLeave: () => void; onToggle: () => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const wide = useRef<HTMLDivElement>(null);
  const sized = useRef(false);
  const held = useRef(0);
  const running = useRef(false);
  const n = `0${i + 1}`;
  const canHover = () => window.matchMedia("(hover: hover)").matches;

  useLayoutEffect(() => {
    const el = box.current!, to = (open ? wide.current! : row.current!).offsetHeight;
    // While a transition is in flight the box is still pinned to pixels, so its
    // measured height is the live one. Once it has settled the height goes back
    // to `auto`, and measuring then would read the *new* layout — so rest on the
    // height we last drove it to.
    const from = running.current ? el.offsetHeight : held.current;
    if (!sized.current) { sized.current = true; held.current = to; el.style.height = to + "px"; return; }
    running.current = true;
    el.style.transition = "none";
    el.style.height = from + "px";
    void el.offsetHeight; // commit the start value so the next one animates
    el.style.transition = `height ${GROW_MS}ms ${GROW_EASE}`;
    el.style.height = to + "px";
    held.current = to;
    // Hand the height back to the content once it has settled, so late web
    // fonts, a resized viewport or an image finishing can reflow the row
    // itself instead of being pinned to stale pixels.
    const done = window.setTimeout(() => { running.current = false; el.style.transition = ""; el.style.height = ""; }, GROW_MS);
    return () => clearTimeout(done);
  }, [open]);

  useEffect(() => {
    const sync = () => { if (!running.current) held.current = box.current!.offsetHeight; };
    window.addEventListener("resize", sync);
    document.fonts?.ready.then(sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={open}
      className="cursor-pointer touch-manipulation border-b border-line"
      onPointerEnter={() => { if (canHover()) onEnter(); }}
      onPointerLeave={() => { if (canHover()) onLeave(); }}
      onFocus={onEnter}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onLeave(); }}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}
      onClick={() => { if (!canHover()) onToggle(); }}
    >
      {/* Centred while closing so the box closes around the row rather than
          leaving a gap under it; top-anchored while opening so the case study
          is uncovered from the top. */}
      <div ref={box} className={`relative flex overflow-hidden ${open ? "items-start" : "items-center"}`}>
        <div inert={open} className={`w-full transition-opacity ${open ? "pointer-events-none absolute inset-x-0 top-0 opacity-0 duration-150" : "opacity-100 duration-300"}`}>
          <div ref={row}>
            <a href="#" className="group grid grid-cols-[1.75rem_minmax(0,1fr)] items-center gap-x-4 gap-y-4 py-6 md:grid-cols-[2.5rem_minmax(0,1fr)_11rem] md:gap-x-6 xl:grid-cols-[2.5rem_minmax(0,13rem)_minmax(0,1fr)_15rem]">
              <span className="col-start-1 row-start-1 text-sm text-wine">{n}</span>
              <div className="col-start-2 row-start-1"><h3 className="font-serif text-2xl">{p.title}</h3><p className="mt-1 text-[11px] tracking-widest text-muted">A S CODELABS · INTERNSHIP PROJECT</p></div>
              {/* Explicit placement instead of source order: the summary drops
                  under the title on a phone and only pulls alongside it once
                  there is a track spare for it. Source order alone left the
                  blurb ~120px wide through the whole md range. */}
              <div className="col-span-2 col-start-1 row-start-2 md:col-span-1 md:col-start-2 xl:col-start-3 xl:row-start-1"><p className="max-w-sm text-sm text-muted">{p.blurb}</p><div className="mt-3 flex flex-wrap gap-2">{p.tags.map((t) => <Tag key={t} t={t} />)}</div></div>
              {/* The arrow travels with the thumbnail rather than holding a
                  track of its own, so it needs no column it cannot have below
                  xl and it stays glued to the edge of the row either way. */}
              <div className="col-start-2 row-start-3 flex items-center gap-3 md:col-start-3 md:row-start-1 xl:col-start-4 xl:row-start-1">
                <div className="min-w-0 flex-1 overflow-hidden rounded-lg transition duration-500 group-hover:scale-[1.04] group-hover:-rotate-1">{p.shot ? <ShotThumb src={p.shot} alt={p.shotAlt ?? p.title} /> : <Window kind={p.kind} className="h-24 !rounded-lg" />}</div>
                <ArrowRight className="shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-wine" />
              </div>
            </a>
          </div>
        </div>
        <div inert={!open} className={`w-full transition-opacity ${open ? "opacity-100 duration-400 delay-150" : "pointer-events-none absolute inset-x-0 top-0 opacity-0 duration-150"}`}>
          <div ref={wide} className="pb-10 pt-2"><CaseStudy p={p} n={n} lead={!i} /></div>
        </div>
      </div>
    </div>
  );
}

/**
 * The project list, and the single owner of which row is open. Keeping the
 * index up here means only one row is ever open: running the pointer down the
 * list hands off from one row to the next rather than letting both grow at
 * once, so the page above and below slides once, in one direction, instead of
 * swelling and settling back. Open and close also share one clock and easing —
 * a row closing as another opens then sums to a single smooth height change
 * rather than a dip.
 */
function ProjectList({ items }: { items: Project[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const last = useRef<number | null>(null);
  const closing = useRef<number | undefined>(undefined);
  useEffect(() => () => clearTimeout(closing.current), []);
  // Entering always wins: it clears any pending close, so a handoff collapses
  // the row being left right away instead of leaving both open for a beat.
  const enter = (i: number) => { last.current = i; clearTimeout(closing.current); setOpen(i); };
  // Leaving is only debounced when nothing took over, which is the case that
  // needs it: the pointer skimming the bottom edge of a tall expanded panel.
  const leave = (i: number) => {
    if (last.current !== i) return;
    closing.current = window.setTimeout(() => setOpen((cur) => (cur === i ? null : cur)), 100);
  };
  return (
    <>
      {items.map((p, i) => (
        <ProjectRow
          key={p.title} p={p} i={i} open={open === i}
          onEnter={() => enter(i)} onLeave={() => leave(i)}
          onToggle={() => setOpen((cur) => (cur === i ? null : i))}
        />
      ))}
    </>
  );
}

export default function App() {
  const headline = ["Building", "useful software", "for real people."];
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line/60 bg-paper/80 backdrop-blur">
        <div className={`${wrap} flex h-16 items-center justify-between`}>
          <a href="#" className="font-serif text-xl">Aadhi Narayanan R</a>
          {/* Tighter tracking and gaps from md up: five links plus the status
              pill do not fit on one line at 768px at full size. */}
          <nav className="hidden gap-5 text-xs text-muted md:flex lg:gap-8 lg:text-sm">{nav.map((n) => <a key={n} href={`#${n.toLowerCase()}`} className="transition hover:text-wine">{n}</a>)}</nav>
          <span className="flex items-center gap-2 text-xs"><i className="size-1.5 rounded-full bg-wine" /><span className="hidden lg:inline">Open to opportunities</span></span>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section id="about" className={`${wrap} grid items-center gap-10 py-14 sm:gap-12 sm:py-16 lg:grid-cols-[1fr_1.2fr] lg:py-24`}>
          <div>
            <p className="mb-6 font-display text-xs font-semibold tracking-widest text-muted">SOFTWARE ENGINEER · FULL-STACK · APPLIED AI</p>
            {/* Sized in vw, not steps: the headline is one line per phrase and
                each line is its own mask, so a fixed step either overflows the
                column on a laptop or pushes a phone into a two-line wrap. Poppins
                runs wide, so the floor drops to 34px below 360px, where 40px
                wraps "for real people." onto two lines in a 280px column. */}
            <h1 className="font-display text-[clamp(2.125rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight min-[360px]:text-[clamp(2.5rem,5vw,4.5rem)]">
              {headline.map((l, i) => (
                <span key={l} className="block overflow-hidden pb-1.5">
                  {/* The payload of the sentence takes the heaviest weight; the
                      words framing it stay one step back so the eye lands on it. */}
                  <motion.span className={`block ${i === 1 ? "font-extrabold" : i === 2 ? "text-wine" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}>{l}</motion.span>
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">I'm <b className="font-semibold text-ink">Aadhi Narayanan R</b> — a software developer with <b className="font-semibold text-ink">6+ months of hands-on internship experience at A S CodeLabs</b>, working on real-world business applications, alongside independent projects in AI, machine learning, and full-stack engineering.</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3"><Button solid href="#projects" className="font-display font-semibold">Explore my work</Button><Button href="#contact" className="font-display font-semibold">Get in touch</Button></div>
            <div className="mt-8 flex gap-5">
              {[[Linkedin, "https://linkedin.com/in/aadhi-narayanan-80093332", "LinkedIn"], [Github, "https://github.com/", "GitHub"], [Instagram, "https://instagram.com/7s_thunder", "Instagram"], [Mail, "mailto:aadhinarayanan23@gmail.com", "Email"]].map(([Icon, href, name]) => {
                const I = Icon as typeof Mail; return <a key={name as string} href={href as string} aria-label={name as string} className="transition hover:-translate-y-0.5 hover:text-wine"><I size={20} /></a>;
              })}
            </div>
          </div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3 }}>
            <Tilt><Window kind="dash" className="aspect-[16/10]" /></Tilt>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="border-y border-line">
          <div className={`${wrap} grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.2fr_1.4fr]`}>
            {stats.map((s) => (
              <div key={s.sub} className="lg:border-r lg:border-line">
                <div className="font-serif text-4xl text-wine"><Count to={s.n} suffix={s.suffix} /></div>
                <div className="mt-1 text-sm font-medium">{s.label}</div><div className="text-sm text-muted">{s.sub}</div>
              </div>
            ))}
            <div className="lg:border-r lg:border-line"><div className="font-serif text-3xl text-wine">Full-stack</div><div className="text-sm text-muted">Frontend · Backend<br />AI · Infrastructure</div></div>
            <div className="text-sm text-muted">Exploring how technology can solve practical problems and make a meaningful impact.<a href="#experience" className="mt-3 flex items-center gap-1 text-wine">More about me <ArrowRight size={14} /></a></div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className={`${wrap} py-16 sm:py-20`}>
          <p className={`${label} mb-2 flex items-center gap-4`}>PROJECTS AT A S CODELABS<span className="h-px flex-1 bg-line" /></p>
          <ProjectList items={[featured, ...more]} />
        </section>

        {/* Independent */}
        <section id="experience" className={`${wrap} border-t border-line py-16`}>
          <p className={`${label} mb-6`}>INDEPENDENT PROJECTS</p>
          {/* Both tiers step at once, and both wait for xl: a two-up outer grid
              under a two-up article leaves about 220px for the copy, which
              reads worse than one full-width article per row. */}
          <div className="grid gap-12 xl:grid-cols-2 xl:gap-0">
            {independent.map((p, i) => (
              <article key={p.title} className={`grid items-center gap-6 sm:grid-cols-2 ${i ? "xl:border-l xl:border-line xl:pl-12" : "xl:pr-12"}`}>
                <div>
                  {p.status && <span className="mb-2 inline-block rounded bg-blue-100 px-2 py-0.5 text-[10px] text-blue-700">{p.status}</span>}
                  <h3 className="font-serif text-2xl sm:text-3xl">{p.title}</h3>
                  <p className="mt-1 text-sm font-medium">{p.sub}</p>
                  <p className="mt-2 text-sm text-muted">{p.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <Tag key={t} t={t} />)}</div>
                  <a href="#" className="mt-5 inline-flex items-center gap-1 text-sm text-wine">{p.cta}<ArrowUpRight size={15} /></a>
                </div>
                {i === 0 ? <Window kind="dash" className="aspect-[4/3]" /> : <Phone />}
              </article>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className={`${wrap} border-t border-line py-16`}>
          <p className={`${label} mb-3`}>TECH STACK</p>
          <h2 className="font-serif text-3xl leading-tight sm:text-4xl">Technologies I work with.<br />Systems I want to understand better.</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {Object.entries(stack).map(([group, items]) => (
              <div key={group}>
                <h3 className="mb-3 text-sm font-semibold">{group}</h3>
                <ul className="space-y-1.5 text-sm text-muted">{items.map((t) => <li key={t} className="transition hover:translate-x-1 hover:text-wine">{t}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Contact */}
      <footer id="contact" className="bg-night text-white">
        <div className={`${wrap} grid gap-10 py-16 lg:grid-cols-[1.2fr_1.2fr_1fr]`}>
          <div><p className="mb-3 text-xs tracking-widest text-white/60">● GET IN TOUCH</p><h2 className="font-serif text-3xl leading-tight sm:text-4xl">Have a useful problem<br />to solve? Let's talk.</h2></div>
          <p className="self-center text-sm leading-relaxed text-white/70">I'm always interested in discussing software engineering, practical AI applications, challenging technical problems, and opportunities to build useful products.</p>
          <ul className="space-y-4 text-sm lg:border-l lg:border-white/15 lg:pl-8">
            {[[Mail, "aadhinarayanan23r@gmail.com", "mailto:aadhinarayanan23r@gmail.com"], [WhatsApp, "+91 72000 16636", "https://wa.me/917200016636"], [Linkedin, "Aadhi Narayanan R", "https://www.linkedin.com/in/aadhi-narayanan-80093332a"], [Instagram, "@7s_thunder", "https://instagram.com/7s_thunder"]].map(([Icon, text, href]) => {
              const I = Icon as typeof Mail;
              const ext = !(href as string).startsWith("mailto:");
              return <li key={text as string}><a href={href as string} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined} className="flex items-center gap-3 hover:text-white/70"><I size={16} />{text as string}</a></li>;
            })}
          </ul>
        </div>
        <div className="border-t border-white/10"><div className={`${wrap} flex flex-wrap items-center justify-between gap-4 py-6 text-xs text-white/60`}>
          <div><div className="text-sm text-white">Aadhi Narayanan R</div>Software Engineer · Full-Stack · Applied AI</div>
          {/* Wraps on its own: the bottom bar wraps as a whole, so five links
              in one unwrapped row overflow a 320px viewport. */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2">{nav.map((n) => <a key={n} href={`#${n.toLowerCase()}`}>{n}</a>)}</nav>
          <span>© 2026 Aadhi Narayanan R. All rights reserved.</span>
        </div></div>
      </footer>
    </>
  );
}
