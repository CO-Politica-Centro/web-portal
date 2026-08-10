"use client";

import { useMemo, useRef, useState } from "react";
import { ApplyModal } from "@/features/voluntariado/apply-modal";
import { AuthModal } from "@/features/voluntariado/auth-modal";
import { ProjectCard } from "@/features/voluntariado/project-card";
import { RegisterTalentModal } from "@/features/voluntariado/register-talent-modal";
import { SEED_PROJECTS, SEED_TALENTS } from "@/features/voluntariado/seed";
import { TalentCard } from "@/features/voluntariado/talent-card";
import {
  VOLUNTEER_CATEGORIES,
  filterProjects,
  filterTalents,
  type CategoryFilter,
  type VolunteerProject,
} from "@/features/voluntariado/types";
import { Reveal } from "@/components/motion/reveal";
import { useFirebaseAuth } from "@/lib/firebase/auth-context";
import { cn } from "@/lib/utils";

type BoardTab = "projects" | "talents";
type PendingAction =
  { type: "apply"; project: VolunteerProject } | { type: "register" };

export function VoluntariadoBoard() {
  const { user, loading, logout, configured } = useFirebaseAuth();
  const [tab, setTab] = useState<BoardTab>("projects");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [authOpen, setAuthOpen] = useState(false);
  const [applyProject, setApplyProject] = useState<VolunteerProject | null>(
    null,
  );
  const [registerOpen, setRegisterOpen] = useState(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);
  const pendingActionRef = useRef<PendingAction | null>(null);

  const visibleProjects = useMemo(
    () => filterProjects(SEED_PROJECTS, category),
    [category],
  );
  const visibleTalents = useMemo(
    () => filterTalents(SEED_TALENTS, category),
    [category],
  );

  function openPendingAction(action: PendingAction) {
    if (action.type === "apply") setApplyProject(action.project);
    else setRegisterOpen(true);
  }

  function requireAuth(action: PendingAction) {
    if (user) {
      openPendingAction(action);
      return;
    }
    pendingActionRef.current = action;
    setAuthOpen(true);
  }

  function handleAuthSuccess() {
    const action = pendingActionRef.current;
    pendingActionRef.current = null;
    if (action) openPendingAction(action);
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Secciones de voluntariado"
        >
          {(
            [
              ["projects", "Proyectos"],
              ["talents", "Talentos"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className={cn(
                "inline-flex min-h-11 items-center rounded-md px-4 text-sm font-semibold",
                tab === id
                  ? "bg-foreground text-background"
                  : "bg-foreground/5 text-foreground hover:bg-foreground/10",
              )}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="text-sm">
          {loading ? (
            <span className="text-muted">Cargando sesión…</span>
          ) : user ? (
            <button
              type="button"
              className="text-brand-green font-semibold underline-offset-4 hover:underline"
              onClick={() => void logout()}
            >
              Salir ({user.email ?? "cuenta"})
            </button>
          ) : (
            <button
              type="button"
              className="text-brand-green font-semibold underline-offset-4 hover:underline"
              onClick={() => setAuthOpen(true)}
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </div>

      {!configured ? (
        <p className="border-accent/40 bg-surface text-muted mt-4 rounded-md border-l-4 px-4 py-3 text-sm">
          Modo demostración: Auth no configurado. Añade `NEXT_PUBLIC_FIREBASE_*`
          para habilitar postulaciones reales.
        </p>
      ) : null}

      {savedNotice ? (
        <p className="border-brand-green/40 bg-brand-green/10 text-foreground mt-4 rounded-md border-l-4 px-4 py-3 text-sm">
          {savedNotice}
        </p>
      ) : null}

      <div
        className="mt-6 flex flex-wrap gap-2"
        role="group"
        aria-label="Filtro por categoría"
      >
        {VOLUNTEER_CATEGORIES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={cn(
              "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold tracking-wide uppercase",
              category === item.id
                ? "bg-brand-green/15 text-brand-green"
                : "text-muted hover:bg-foreground/5",
            )}
            onClick={() => setCategory(item.id)}
          >
            [{item.label}]
          </button>
        ))}
      </div>

      <Reveal
        key={`${tab}-${category}`}
        className="mt-8"
        stagger="[data-reveal-card]"
        once
      >
        {tab === "projects" ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.map((project) => (
              <div key={project.id} data-reveal-card>
                <ProjectCard
                  project={project}
                  onApply={(p) => requireAuth({ type: "apply", project: p })}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleTalents.map((talent) => (
              <div key={talent.id} data-reveal-card>
                <TalentCard talent={talent} />
              </div>
            ))}
          </div>
        )}
      </Reveal>

      <div className="border-foreground/10 bg-surface mt-14 flex flex-col gap-5 rounded-xl border p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow">Banco de talentos</p>
          <h2 className="section-title mt-3 text-2xl sm:text-3xl">
            ¿No encuentras tu tarea? Registra tu perfil
          </h2>
          <p className="text-muted mt-3 leading-relaxed">
            Súmate al banco aunque no haya un proyecto exacto hoy. Cuando abra
            un cupo compatible, priorizamos perfiles registrados.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary shrink-0"
          onClick={() => requireAuth({ type: "register" })}
        >
          Registrar mi talento en la red
        </button>
      </div>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />
      <ApplyModal
        project={applyProject}
        onClose={() => setApplyProject(null)}
      />
      <RegisterTalentModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onSaved={() =>
          setSavedNotice(
            "Perfil enviado. El equipo del movimiento lo revisará para futuros proyectos.",
          )
        }
      />
    </div>
  );
}
