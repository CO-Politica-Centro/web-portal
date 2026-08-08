"use client";

import {
  CATEGORY_LABELS,
  STATUS_LABELS,
  projectProgress,
  type VolunteerProject,
} from "@/features/voluntariado/types";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: VolunteerProject;
  onApply: (project: VolunteerProject) => void;
};

export function ProjectCard({ project, onApply }: ProjectCardProps) {
  const progress = projectProgress(project);
  const isFull =
    project.status === "completed" || project.slotsFilled >= project.slotsTotal;

  return (
    <article
      className={cn(
        "border-foreground/10 bg-surface flex h-full flex-col rounded-xl border border-t-4 p-5 shadow-[0_8px_24px_rgb(0_0_0_/0.04)]",
        project.category === "tech" && "border-t-brand-green",
        project.category === "legal" && "border-t-accent",
        project.category === "diseno" && "border-t-accent-soft",
        project.category === "comunicacion" && "border-t-foreground/40",
        project.category === "territorio" && "border-t-brand-green/70",
        project.category === "otro" && "border-t-muted",
      )}
    >
      <div className="text-muted flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="font-semibold tracking-wide uppercase">
          [{CATEGORY_LABELS[project.category]}]
        </span>
        <span>⌛ {project.hoursLabel}</span>
      </div>

      <h3 className="mt-3 text-xl leading-snug font-semibold">
        {project.title}
      </h3>
      <p className="text-muted mt-3 flex-1 text-base leading-relaxed">
        {project.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.skills.map((skill) => (
          <li
            key={skill}
            className="bg-foreground/5 text-foreground rounded-md px-2.5 py-1 text-xs font-semibold"
          >
            {skill}
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <div
          className="bg-foreground/10 h-2 overflow-hidden rounded-full"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Avance de cupos"
        >
          <div
            className={cn(
              "h-full rounded-full",
              project.status === "completed"
                ? "bg-brand-green"
                : project.status === "urgent"
                  ? "bg-accent"
                  : "bg-foreground/50",
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-muted mt-2 text-sm">
          {project.slotsFilled} de {project.slotsTotal} voluntarios inscritos
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          className="btn-primary flex-1 text-sm"
          onClick={() => onApply(project)}
        >
          {isFull ? "Unirse a la lista de espera" : "Postularme al proyecto"}
        </button>
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide uppercase",
            project.status === "recruiting" && "bg-accent/20 text-foreground",
            project.status === "urgent" && "bg-red-700/15 text-red-800",
            project.status === "completed" &&
              "bg-brand-green/15 text-brand-green",
          )}
        >
          {STATUS_LABELS[project.status]}
        </span>
      </div>
    </article>
  );
}
