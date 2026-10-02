import * as Dialog from "@radix-ui/react-dialog";
import { X, ExternalLink } from "lucide-react";
import type { Project } from "@/data/content";
import { GithubIcon } from "./bits";

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const tags = project ? [...project.tags, ...(project.tool ? [project.tool] : [])] : [];
  return (
    <Dialog.Root open={!!project} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="glass fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-charcoal/95 p-6 md:p-10 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
          {project && (
            <>
              <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:text-gold-bright" aria-label="Close">
                <X className="h-5 w-5" />
              </Dialog.Close>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Case Study</p>
              <Dialog.Title className="mt-3 pr-8 font-display text-2xl font-semibold md:text-3xl">{project.title}</Dialog.Title>
              <Dialog.Description className="sr-only">Problem, approach and result for {project.title}</Dialog.Description>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{t}</span>
                ))}
              </div>
              {project.screenshot && (
                <img src={project.screenshot} alt={`${project.title} screenshot`} className="mt-6 w-full rounded-lg border border-border" />
              )}
              <div className="mt-8 space-y-6">
                {(["problem", "approach", "result"] as const).map((k) => (
                  <section key={k}>
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-gold-bright">{k}</h3>
                    <p className="mt-2 leading-relaxed text-foreground/85">{project[k]}</p>
                  </section>
                ))}
              </div>
              {project.dashboardUrl ? (
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a href={project.dashboardUrl} target="_blank" rel="noopener noreferrer" className="btn-gold justify-center">
                    View Live Dashboard ↗
                  </a>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-gold justify-center">
                      <GithubIcon /> View Code on GitHub
                    </a>
                  )}
                  {project.reportUrl && (
                    <a href={project.reportUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-gold justify-center">
                      View Report <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              ) : (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">
                      <GithubIcon /> View Project on GitHub ↗
                    </a>
                  )}
                  {project.reportUrl && (
                    <a href={project.reportUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
                      View Report <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
