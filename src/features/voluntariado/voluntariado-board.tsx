"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
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
  type TalentProfile,
  type VolunteerCategoryId,
  type VolunteerProject,
} from "@/features/voluntariado/types";
import { getFirebaseClient, isFirebaseConfigured } from "@/lib/firebase/client";
import { useFirebaseAuth } from "@/lib/firebase/auth-context";
import { cn } from "@/lib/utils";

type BoardTab = "projects" | "talents";
type PendingAction =
  { type: "apply"; project: VolunteerProject } | { type: "register" };

function mapTalentDoc(
  id: string,
  data: Record<string, unknown>,
): TalentProfile | null {
  if (
    typeof data.displayName !== "string" ||
    typeof data.headline !== "string" ||
    typeof data.bio !== "string" ||
    typeof data.availability !== "string" ||
    !Array.isArray(data.skills) ||
    !Array.isArray(data.categories)
  ) {
    return null;
  }
  return {
    id,
    displayName: data.displayName,
    headline: data.headline,
    bio: data.bio,
    availability: data.availability,
    skills: data.skills.filter((s): s is string => typeof s === "string"),
    categories: data.categories.filter(
      (c): c is VolunteerCategoryId => typeof c === "string",
    ),
  };
}

function mapProjectDoc(
  id: string,
  data: Record<string, unknown>,
): VolunteerProject | null {
  if (
    typeof data.title !== "string" ||
    typeof data.description !== "string" ||
    typeof data.category !== "string" ||
    typeof data.hoursLabel !== "string" ||
    typeof data.status !== "string" ||
    !Array.isArray(data.skills)
  ) {
    return null;
  }
  return {
    id,
    title: data.title,
    description: data.description,
    category: data.category as VolunteerCategoryId,
    hoursLabel: data.hoursLabel,
    status: data.status as VolunteerProject["status"],
    skills: data.skills.filter((s): s is string => typeof s === "string"),
    slotsFilled: typeof data.slotsFilled === "number" ? data.slotsFilled : 0,
    slotsTotal: typeof data.slotsTotal === "number" ? data.slotsTotal : 1,
  };
}

export function VoluntariadoBoard() {
  const { user, loading, logout, configured } = useFirebaseAuth();
  const [tab, setTab] = useState<BoardTab>("projects");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [projects, setProjects] = useState<VolunteerProject[]>(SEED_PROJECTS);
  const [talents, setTalents] = useState<TalentProfile[]>(SEED_TALENTS);
  const [authOpen, setAuthOpen] = useState(false);
  const [applyProject, setApplyProject] = useState<VolunteerProject | null>(
    null,
  );
  const [registerOpen, setRegisterOpen] = useState(false);
  const pendingActionRef = useRef<PendingAction | null>(null);

  const refreshRemote = useCallback(async () => {
    if (!isFirebaseConfigured()) return;
    const client = getFirebaseClient();
    if (!client) return;
    try {
      const [projectSnap, talentSnap] = await Promise.all([
        getDocs(collection(client.db, "projects")),
        getDocs(collection(client.db, "talentProfiles")),
      ]);
      const remoteProjects = projectSnap.docs
        .map((d) => mapProjectDoc(d.id, d.data()))
        .filter((p): p is VolunteerProject => p !== null);
      const remoteTalents = talentSnap.docs
        .map((d) => mapTalentDoc(d.id, d.data()))
        .filter((t): t is TalentProfile => t !== null);
      if (remoteProjects.length > 0) setProjects(remoteProjects);
      if (remoteTalents.length > 0) {
        setTalents([...SEED_TALENTS, ...remoteTalents]);
      }
    } catch {
      // Keep seed data if remote fails (offline / rules / empty).
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!isFirebaseConfigured()) return;
      const client = getFirebaseClient();
      if (!client) return;
      try {
        const [projectSnap, talentSnap] = await Promise.all([
          getDocs(collection(client.db, "projects")),
          getDocs(collection(client.db, "talentProfiles")),
        ]);
        if (cancelled) return;
        const remoteProjects = projectSnap.docs
          .map((d) => mapProjectDoc(d.id, d.data()))
          .filter((p): p is VolunteerProject => p !== null);
        const remoteTalents = talentSnap.docs
          .map((d) => mapTalentDoc(d.id, d.data()))
          .filter((t): t is TalentProfile => t !== null);
        if (remoteProjects.length > 0) setProjects(remoteProjects);
        if (remoteTalents.length > 0) {
          setTalents([...SEED_TALENTS, ...remoteTalents]);
        }
      } catch {
        // Keep seed data if remote fails.
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleProjects = useMemo(
    () => filterProjects(projects, category),
    [projects, category],
  );
  const visibleTalents = useMemo(
    () => filterTalents(talents, category),
    [talents, category],
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
          Modo demostración: datos locales. Configura Firebase para Auth y
          guardado real.
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

      {tab === "projects" ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onApply={(p) => requireAuth({ type: "apply", project: p })}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleTalents.map((talent) => (
            <TalentCard key={talent.id} talent={talent} />
          ))}
        </div>
      )}

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
        onSaved={() => void refreshRemote()}
      />
    </div>
  );
}
