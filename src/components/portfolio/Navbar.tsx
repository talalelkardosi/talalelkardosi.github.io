import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/content";

const links = ["About", "Services", "Projects", "Skills", "Credentials", "Contact"];

export function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["hero", ...links.map((l) => l.toLowerCase())].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3">
      <nav aria-label="Main" className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 md:px-6">
        <a href="#hero" className="font-display text-lg font-semibold tracking-tight">
          <span className="text-gold">{profile.name}</span>
          <span className="sr-only"> {profile.name} home</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const id = l.toLowerCase();
            return (
              <li key={l}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`relative rounded-full px-3 py-1.5 text-sm transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-200 ${active === id ? "text-gold-bright after:scale-x-100" : "after:scale-x-0"} ${active === id ? "text-gold-bright" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {l}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          <a href="#contact" className="btn-gold !px-4 !py-2 text-sm">Let's Talk</a>
          <button
            className="rounded-full p-2 text-foreground lg:hidden"
            aria-label={open ? "Close menu" : "Menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <ul className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-3 lg:hidden">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-4 py-3 ${active === l.toLowerCase() ? "text-gold-bright" : "text-foreground"}`}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
