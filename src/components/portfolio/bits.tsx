import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { profile } from "@/data/content";

export function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.18 7.69 10.67.56.1.77-.24.77-.54v-1.9c-3.13.68-3.79-1.51-3.79-1.51-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.64 1.22 3.28.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.28-5.15 5.56.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.78.54a11.26 11.26 0 0 0 7.68-10.67C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  );
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
      <h2 className="text-3xl font-semibold md:text-5xl">{title}</h2>
      <div className="mt-5 h-px w-20 bg-gold" />
      {sub && <p className="mt-6 max-w-2xl text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}


export function Typing({ words }: { words: string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [text, setText] = useState<string>(words[0] ?? "");
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (reduce) {
      const t = setInterval(() => setI((x) => (x + 1) % words.length), 2500);
      return () => clearInterval(t);
    }
    const word = words[i] ?? "";
    const t = setTimeout(
      () => {
        if (!del) {
          if (text.length < word.length) setText(word.slice(0, text.length + 1));
          else setDel(true);
        } else if (text.length > 0) setText(word.slice(0, text.length - 1));
        else {
          setDel(false);
          setI((x) => (x + 1) % words.length);
        }
      },
      !del && text === word ? 1700 : del ? 40 : 80,
    );
    return () => clearTimeout(t);
  }, [text, del, i, words, reduce]);
  return (
    <span aria-live="polite">
      {reduce ? words[i] : text}
      <span className="caret ml-0.5 inline-block w-[2px] bg-gold-bright align-middle" style={{ height: "1em" }} />
    </span>
  );
}

export function ProfilePhoto({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const showPhoto = Boolean(profile.photo) && !failed;
  // Deterministic pseudo-random (fixed seed) so SSR and client hydration match.
  const particles = useMemo(() => {
    let s = 42;
    const rand = () => {
      s = (s * 1103515245 + 12345) % 2147483648;
      return s / 2147483648;
    };
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: 6 + rand() * 88,
      size: 1.5 + rand() * 2.5,
      rise: 380 + rand() * 200,
      drift: (rand() - 0.5) * 56,
      duration: 6 + rand() * 7,
      delay: rand() * 9,
    }));
  }, []);

  useEffect(() => {
    const image = imageRef.current;
    if (!image?.complete) return;
    if (image.naturalWidth > 0) setLoaded(true);
    else setFailed(true);
  }, []);

  return (
    <div className={`group relative ${className}`}>
      <div className="absolute -inset-10 rounded-full bg-gold/20 blur-3xl opacity-70" aria-hidden />
      <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full border border-gold/40" aria-hidden />
      <div className="profile-frame relative h-full w-full overflow-hidden rounded-t-full border-2 border-gold bg-charcoal">
        {showPhoto ? (
          <>
            <div className="profile-photo-bg absolute inset-0" aria-hidden />
            {!reduce && (
              <div
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-full"
                style={{ opacity: 0.45 }}
                aria-hidden
              >
                {particles.map((p) => (
                  <motion.span
                    key={p.id}
                    className="absolute rounded-full bg-gold-bright"
                    style={{
                      left: `${p.left}%`,
                      top: "100%",
                      width: p.size,
                      height: p.size,
                      boxShadow: "0 0 6px rgba(230,195,92,0.8)",
                    }}
                    animate={{ y: [0, -p.rise], x: [0, p.drift], opacity: [0, 0.9, 0] }}
                    transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
                  />
                ))}
              </div>
            )}
            <img
              ref={imageRef}
              src={profile.photo}
              alt={`Portrait of ${profile.name}, freelance data analyst`}
              width={1200}
              height={896}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
              className={`profile-image relative h-full w-full object-cover object-[50%_20%] ${loaded || reduce ? "opacity-100" : "opacity-0"}`}
            />
            <div className="profile-photo-overlay absolute inset-0" aria-hidden />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center" role="img" aria-label={`${profile.name} monogram`}>
            <span className="font-display text-7xl font-semibold text-gold md:text-8xl">{profile.monogram}</span>
          </div>
        )}
      </div>
    </div>
  );
}
