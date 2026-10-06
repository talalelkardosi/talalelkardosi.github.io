import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Toaster, toast } from "sonner";
import {
  Sparkles, LineChart, Database, LayoutDashboard, FileText, ArrowUpRight, Copy,
  Mail, Phone, MessageCircle, Linkedin, Briefcase, GraduationCap, Award,
} from "lucide-react";
import {
  profile, about, services, projects, githubProfile, skills, credentials, contacts, email,
  type Project, type ServiceIcon, type ContactKind,
} from "@/data/content";
import { Navbar } from "@/components/portfolio/Navbar";
import { ProjectModal } from "@/components/portfolio/ProjectModal";
import { GithubIcon, ProfilePhoto, Reveal, SectionHeading, Typing } from "@/components/portfolio/bits";

const TITLE = "Talal Al-Kardosi | Freelance Data Analyst";
const DESC = "Freelance data analyst helping businesses turn messy data into clear decisions with data cleaning, SQL analysis, and interactive dashboards.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
  }),
  component: Index,
});

const serviceIcons: Record<ServiceIcon, typeof Sparkles> = {
  clean: Sparkles, eda: LineChart, sql: Database, dashboard: LayoutDashboard, report: FileText,
};
const contactIcons: Record<ContactKind, typeof Mail> = {
  email: Mail, phone: Phone, whatsapp: MessageCircle, linkedin: Linkedin,
  github: Mail, mostaql: Briefcase, khamsat: Briefcase,
};

const container = "mx-auto max-w-6xl px-5 md:px-8";

function Index() {
  const [selected, setSelected] = useState<Project | null>(null);
  const lastProjectTrigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selected) lastProjectTrigger.current?.focus();
  }, [selected]);

  return (
    <div className="grain min-h-screen overflow-x-clip bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects
          onOpen={(project, trigger) => {
            lastProjectTrigger.current = trigger;
            setSelected(project);
          }}
        />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {profile.name}
      </footer>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
      <Toaster theme="dark" position="bottom-center" />
    </div>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const [firstName, ...lastNameParts] = profile.name.split(" ");
  const lastName = lastNameParts.join(" ");
  const item = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.1 + i * 0.08, ease: "easeOut" as const },
  });
  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center pt-28 pb-24">
      <div className="hero-grid absolute inset-0" aria-hidden />
      <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-gold/15 blur-[120px] hero-glow" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_95%)]" aria-hidden />
      <div className={`${container} relative grid w-full items-center gap-14 lg:grid-cols-[1.2fr_1fr]`}>
        <motion.div {...item(0)} className="order-first mx-auto lg:order-last">
          <ProfilePhoto className="aspect-[4/5] w-[17rem] sm:w-[18.5rem] lg:w-[26rem]" />
        </motion.div>
        <div className="text-center lg:text-left">
          <motion.p {...item(1)} className="text-xs font-medium uppercase tracking-[0.35em] text-gold">{profile.role}</motion.p>
          <motion.h1 {...item(2)} className="mt-5 flex flex-col font-semibold leading-[0.9]" style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}>
            <span>{firstName}</span>
            <span className="text-gold-bright">{lastName}</span>
          </motion.h1>
          <motion.p {...item(3)} className="mt-6 min-h-[2rem] font-display text-xl text-gold-bright md:text-2xl">
            <Typing words={profile.typing} />
          </motion.p>
          <motion.p {...item(4)} className="mx-auto mt-6 max-w-[560px] leading-relaxed text-muted-foreground lg:mx-0">
            {profile.usp}
          </motion.p>
          <motion.div {...item(5)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a href="#projects" className="btn-gold">View Projects</a>
            <a href="#contact" className="btn-outline-gold">Let's Talk</a>
          </motion.div>
        </div>
      </div>
      <a href="#about" aria-label="Scroll down" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
        <span className="flex h-10 w-6 justify-center rounded-full border border-gold/50 pt-2">
          <span className="scroll-dot h-2 w-1 rounded-full bg-gold-bright" />
        </span>
      </a>
      <div className="gold-line absolute inset-x-0 bottom-0" aria-hidden />
    </section>
  );
}


function About() {
  return (
    <section id="about" className={`${container} scroll-mt-24 py-24`}>
      <SectionHeading eyebrow="Who I am" title="About Me" />
      <Reveal className="max-w-3xl space-y-6 text-lg leading-relaxed text-foreground/85">
        {about.map((p, i) => (
          <p key={i} className={i === about.length - 1 ? "font-display text-gold-bright" : ""}>{p}</p>
        ))}
      </Reveal>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-charcoal py-24">
      <div className={container}>
        <SectionHeading eyebrow="Services" title="What I Do" />
        <div className="flex flex-wrap justify-center gap-6">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.icon];
            return (
              <Reveal key={s.title} delay={i * 0.08} className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                <article className="glow-hover h-full rounded-2xl border border-border bg-panel p-7">
                  <Icon className="h-6 w-6 text-gold" strokeWidth={1.25} aria-hidden />
                  <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{s.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects({ onOpen }: { onOpen: (p: Project, trigger: HTMLButtonElement) => void }) {
  return (
    <section id="projects" className={`${container} scroll-mt-24 py-24`}>
      <SectionHeading
        eyebrow="Work"
        title="Featured Projects"
        sub="A selection of my most representative work. More projects and code are available on my GitHub."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08} className="min-w-0">
            <button
              onClick={(event) => onOpen(p, event.currentTarget)}
              className="glow-hover group relative flex h-full w-full min-w-0 flex-col rounded-2xl border border-border bg-panel p-7 text-left"
            >
              {(p.githubUrl || p.dashboardUrl) && (
                <span className="absolute right-5 top-5 flex items-center gap-2">
                  {p.dashboardUrl && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 px-2.5 py-1 text-xs text-gold-bright">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-bright" aria-hidden /> Live
                    </span>
                  )}
                  {p.githubUrl && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 px-2.5 py-1 text-xs text-gold-bright">
                      <GithubIcon className="h-3.5 w-3.5" /> GitHub
                    </span>
                  )}
                </span>
              )}
              <h3
                className={`${p.dashboardUrl && p.githubUrl ? "pt-10 pr-0 sm:pt-0 sm:pr-40" : "pr-24"} break-words text-xl font-semibold md:text-2xl`}
              >
                {p.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-muted-foreground">
                {p.description ?? p.problem}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[...p.tags, ...(p.tool ? [p.tool] : [])].map((t) => (
                  <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{t}</span>
                ))}
              </div>
              <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-gold-bright">
                Read case study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </button>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 flex justify-center">
        <a href={githubProfile} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
          <GithubIcon /> See All Projects on GitHub
        </a>
      </Reveal>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 bg-charcoal py-24">
      <div className={container}>
        <SectionHeading eyebrow="Toolkit" title="Skills" />
        <div className="space-y-10">
          {skills.map((g) => (
            <Reveal key={g.group}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">{g.group}</h3>
              <ul className="flex flex-wrap gap-2.5">
                {g.items.map((s) => (
                  <li key={s} className="glow-hover cursor-default rounded-full border border-border bg-panel px-4 py-2 text-sm">{s}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Credentials() {
  return (
    <section id="credentials" className={`${container} scroll-mt-24 py-24`}>
      <SectionHeading eyebrow="Learning" title="Training & Credentials" />
      <ol className="relative ml-3 border-l border-gold/40">
        {credentials.map((c, i) => {
          const Icon = i === credentials.length - 1 ? GraduationCap : Award;
          return (
            <Reveal key={c.title} delay={i * 0.08} className="relative mb-10 pl-10 last:mb-0">
              <li className="list-none">
                <span className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-gold bg-background">
                  <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} aria-hidden />
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold">{c.title}</h3>
                  {c.status && <span className="rounded-full border border-gold/50 px-2.5 py-0.5 text-xs text-gold-bright">{c.status}</span>}
                </div>
                <p className="mt-1 text-gold">{c.org}</p>
                <p className="mt-2 text-muted-foreground">{c.detail}</p>
                {c.issued && <p className="mt-2 text-sm text-muted-foreground">{c.issued}</p>}
                {c.chips && (
                  <ul className="mt-3 flex flex-wrap gap-2" aria-label="Topics covered">
                    {c.chips.map((chip) => (
                      <li key={chip} className="rounded-full border border-gold/30 px-2.5 py-1 text-xs text-gold-bright">
                        {chip}
                      </li>
                    ))}
                  </ul>
                )}
                {c.credentialUrl && (
                  <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 rounded-md border border-gold/50 px-2.5 py-1 text-xs font-medium text-gold-bright transition-colors hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                    Verify Credential ↗
                  </a>
                )}
              </li>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}

function Contact() {
  const copy = async (v: string) => {
    try {
      await navigator.clipboard.writeText(v);
      toast.success("Copied");
    } catch {
      toast.error("Couldn't copy");
    }
  };
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-charcoal py-24">
      <div className="absolute -bottom-40 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" aria-hidden />
      <div className={`${container} relative`}>
        <SectionHeading eyebrow="Contact" title="Let's Make Your Data Useful" sub="Have messy data or a question your numbers should answer? Send me a message." />
        <Reveal className="mb-10">
          <a href={`mailto:${email}`} className="btn-gold !px-8 !py-4 text-lg"><Mail className="h-5 w-5" /> Email Me</a>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {contacts.filter((c) => c.url).map((c, i) => {
            const Icon = contactIcons[c.kind];
            const external = c.url.startsWith("http");
            return (
              <Reveal key={c.kind} delay={i * 0.08} className="relative">
                <a
                  href={c.url}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="glass glow-hover flex h-full items-center gap-4 rounded-2xl p-5 pr-14"
                >
                  {c.kind === "github" ? <GithubIcon className="h-6 w-6 shrink-0 text-gold" /> : <Icon className="h-6 w-6 shrink-0 text-gold" strokeWidth={1.25} aria-hidden />}
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-widest text-muted-foreground">{c.label}</span>
                    <span className="block truncate">{c.value}</span>
                  </span>
                </a>
                {c.copy && (
                  <button
                    onClick={() => copy(c.copy!)}
                    aria-label={`Copy ${c.label.toLowerCase()}`}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-muted-foreground hover:text-gold-bright"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
