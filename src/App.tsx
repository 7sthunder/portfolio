import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue } from "motion/react";
import { ArrowRight, ArrowUpRight, Github, Instagram, Linkedin, Mail, Phone as PhoneIcon } from "lucide-react";
import { featured, independent, more, stack, stats } from "./data";
import { Phone, Shot, ShotThumb, Tilt, Window } from "./Mock";

const nav = ["About", "Projects", "Experience", "Skills", "Contact"];
const wrap = "mx-auto w-full max-w-6xl px-6";
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

const Button = ({ children, href, solid }: { children: React.ReactNode; href: string; solid?: boolean }) => (
  <a href={href} className={`group inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition ${solid ? "bg-wine text-white shadow-lg shadow-wine/25 hover:bg-wine-dark" : "text-ink hover:text-wine"}`}>
    {children}<ArrowRight size={15} className="transition group-hover:translate-x-1" />
  </a>
);

export default function App() {
  const headline = ["Building", "useful software", "for real people."];
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line/60 bg-paper/80 backdrop-blur">
        <div className={`${wrap} flex h-16 items-center justify-between`}>
          <a href="#" className="font-serif text-xl">Aadhi Narayanan R</a>
          <nav className="hidden gap-8 text-sm md:flex">{nav.map((n) => <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-wine">{n}</a>)}</nav>
          <span className="flex items-center gap-2 text-xs"><i className="size-1.5 rounded-full bg-wine" />Open to opportunities</span>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section id="about" className={`${wrap} grid items-center gap-12 py-16 lg:grid-cols-[1fr_1.2fr] lg:py-24`}>
          <div>
            <p className="mb-6 text-xs tracking-widest text-muted">SOFTWARE ENGINEER · FULL-STACK · APPLIED AI</p>
            <h1 className="font-serif text-6xl leading-[1.02] tracking-tight sm:text-7xl">
              {headline.map((l, i) => (
                <span key={l} className="block overflow-hidden pb-1">
                  <motion.span className={`block ${i === 2 ? "text-wine" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}>{l}</motion.span>
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">I'm Aadhi Narayanan R — a software developer with 6+ months of hands-on internship experience at A S CodeLabs, working on real-world business applications, alongside independent projects in AI, machine learning, and full-stack engineering.</p>
            <div className="mt-8 flex items-center gap-4"><Button solid href="#projects">Explore my work</Button><Button href="#contact">Get in touch</Button></div>
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

        {/* Featured */}
        <section id="projects" className={`${wrap} py-20`}>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="rounded bg-wine/10 px-2 py-1 text-xs text-wine">Featured project</span>
              <div className="mt-4 text-sm text-wine">01</div>
              <h2 className="font-serif text-4xl leading-tight">{featured.title}</h2>
              <p className="mt-3 text-xs tracking-widest text-muted">A S CODELABS · INTERNSHIP PROJECT</p>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">{featured.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-2">{featured.tags.map((t) => <Tag key={t} t={t} />)}</div>
              <div className="mt-6"><Button solid href="#">View Case Study</Button></div>
            </div>
            <Tilt>{featured.shot ? <Shot src={featured.shot} alt={featured.shotAlt ?? featured.title} /> : <Window kind={featured.kind} className="aspect-[16/10]" />}</Tilt>
          </div>

          <div className="mt-20">
            <p className={`${label} mb-2 flex items-center gap-4`}>MORE PROJECTS AT A S CODELABS<span className="h-px flex-1 bg-line" /></p>
            {more.map((p, i) => (
              <a key={p.title} href="#" className="group grid items-center gap-6 border-b border-line py-6 md:grid-cols-[2.5rem_14rem_1fr_13rem_2rem]">
                <span className="text-sm text-wine">0{i + 2}</span>
                <div><h3 className="font-serif text-2xl">{p.title}</h3><p className="mt-1 text-[11px] tracking-widest text-muted">A S CODELABS · INTERNSHIP PROJECT</p></div>
                <div><p className="max-w-sm text-sm text-muted">{p.blurb}</p><div className="mt-3 flex flex-wrap gap-2">{p.tags.map((t) => <Tag key={t} t={t} />)}</div></div>
                <div className="overflow-hidden rounded-lg transition duration-500 group-hover:scale-[1.04] group-hover:-rotate-1">{p.shot ? <ShotThumb src={p.shot} alt={p.shotAlt ?? p.title} /> : <Window kind={p.kind} className="h-24 !rounded-lg" />}</div>
                <ArrowRight className="text-muted transition group-hover:translate-x-1 group-hover:text-wine" />
              </a>
            ))}
          </div>
        </section>

        {/* Independent */}
        <section id="experience" className={`${wrap} border-t border-line py-16`}>
          <p className={`${label} mb-6`}>INDEPENDENT PROJECTS</p>
          <div className="grid gap-12 md:grid-cols-2 md:divide-x md:divide-line">
            {independent.map((p, i) => (
              <article key={p.title} className={`grid items-center gap-6 sm:grid-cols-2 ${i ? "md:pl-12" : ""}`}>
                <div>
                  {p.status && <span className="mb-2 inline-block rounded bg-blue-100 px-2 py-0.5 text-[10px] text-blue-700">{p.status}</span>}
                  <h3 className="font-serif text-3xl">{p.title}</h3>
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
          <h2 className="font-serif text-4xl leading-tight">Technologies I work with.<br />Systems I want to understand better.</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3 lg:grid-cols-6">
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
          <div><p className="mb-3 text-xs tracking-widest text-white/60">● GET IN TOUCH</p><h2 className="font-serif text-4xl leading-tight">Have a useful problem<br />to solve? Let's talk.</h2></div>
          <p className="self-center text-sm leading-relaxed text-white/70">I'm always interested in discussing software engineering, practical AI applications, challenging technical problems, and opportunities to build useful products.</p>
          <ul className="space-y-4 text-sm lg:border-l lg:border-white/15 lg:pl-8">
            {[[Mail, "aadhinarayanan23@gmail.com", "mailto:aadhinarayanan23@gmail.com"], [PhoneIcon, "+91 7200016636", "tel:+917200016636"], [Linkedin, "aadhi-narayanan-80093332", "https://linkedin.com/in/aadhi-narayanan-80093332"], [Instagram, "@7s_thunder", "https://instagram.com/7s_thunder"]].map(([Icon, text, href]) => {
              const I = Icon as typeof Mail; return <li key={text as string}><a href={href as string} className="flex items-center gap-3 hover:text-white/70"><I size={16} />{text as string}</a></li>;
            })}
          </ul>
        </div>
        <div className="border-t border-white/10"><div className={`${wrap} flex flex-wrap items-center justify-between gap-4 py-6 text-xs text-white/60`}>
          <div><div className="text-sm text-white">Aadhi Narayanan R</div>Software Engineer · Full-Stack · Applied AI</div>
          <nav className="flex gap-6">{nav.map((n) => <a key={n} href={`#${n.toLowerCase()}`}>{n}</a>)}</nav>
          <span>© 2026 Aadhi Narayanan R. All rights reserved.</span>
        </div></div>
      </footer>
    </>
  );
}
