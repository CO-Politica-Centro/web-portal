"use client";

import { useId, useMemo, useState, type FormEvent } from "react";
import { VolunteerDialog } from "@/features/voluntariado/volunteer-dialog";
import {
  VOLUNTEER_CATEGORIES,
  type VolunteerCategoryId,
} from "@/features/voluntariado/types";
import { useFirebaseAuth } from "@/lib/firebase/auth-context";

type RegisterTalentModalProps = {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
};

const CATEGORY_OPTIONS: { id: VolunteerCategoryId; label: string }[] = [];
for (const c of VOLUNTEER_CATEGORIES) {
  if (c.id === "all") continue;
  CATEGORY_OPTIONS.push({ id: c.id, label: c.label });
}

export function RegisterTalentModal({
  open,
  onClose,
  onSaved,
}: RegisterTalentModalProps) {
  const titleId = useId();
  const { user } = useFirebaseAuth();
  const [displayName, setDisplayName] = useState("");
  const [headline, setHeadline] = useState("");
  const [availability, setAvailability] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [categories, setCategories] = useState<VolunteerCategoryId[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  const selected = useMemo(() => new Set(categories), [categories]);

  function toggleCategory(id: VolunteerCategoryId) {
    setCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user) return;
    if (categories.length === 0) {
      setError("Elige al menos una categoría");
      return;
    }
    setPending(true);
    setError(null);
    try {
      const skillList: string[] = [];
      for (const part of skills.split(",")) {
        const trimmed = part.trim();
        if (trimmed) skillList.push(trimmed);
      }
      const idToken = await user.getIdToken();
      const response = await fetch("/api/voluntariado/talent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken,
          uid: user.uid,
          displayName: displayName.trim(),
          headline: headline.trim(),
          availability: availability.trim(),
          bio: bio.trim(),
          skills: skillList,
          categories,
        }),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(payload?.error ?? "No se pudo guardar el perfil");
      }
      setDone(true);
      onSaved?.();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo guardar el perfil",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <VolunteerDialog
      open={open}
      onClose={onClose}
      titleId={titleId}
      title="Registrar mi talento"
      className="max-h-[90vh] max-w-lg overflow-y-auto"
    >
      {done ? (
        <p className="text-muted mt-4 leading-relaxed">
          Perfil guardado. Aparecerá en el banco de talentos para proyectos del
          movimiento.
        </p>
      ) : (
        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium">
            Nombre para mostrar
            <input
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="border-foreground/15 bg-background mt-1 w-full rounded-md border px-3 py-2"
            />
          </label>
          <label className="block text-sm font-medium">
            Titular (rol / ciudad)
            <input
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="border-foreground/15 bg-background mt-1 w-full rounded-md border px-3 py-2"
            />
          </label>
          <label className="block text-sm font-medium">
            Disponibilidad
            <input
              required
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="border-foreground/15 bg-background mt-1 w-full rounded-md border px-3 py-2"
            />
          </label>
          <label className="block text-sm font-medium">
            Bio breve
            <textarea
              required
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="border-foreground/15 bg-background mt-1 w-full rounded-md border px-3 py-2"
            />
          </label>
          <label className="block text-sm font-medium">
            Skills (separadas por coma)
            <input
              required
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="border-foreground/15 bg-background mt-1 w-full rounded-md border px-3 py-2"
            />
          </label>
          <fieldset>
            <legend className="text-sm font-medium">Categorías</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map((c) => {
                const active = selected.has(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleCategory(c.id)}
                    className={
                      active
                        ? "bg-brand-green/15 text-brand-green rounded-md px-2.5 py-1 text-xs font-semibold"
                        : "bg-foreground/5 rounded-md px-2.5 py-1 text-xs font-semibold"
                    }
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
          {error ? (
            <p className="text-sm text-red-700" role="alert">
              {error}
            </p>
          ) : null}
          <button type="submit" className="btn-primary" disabled={pending}>
            Guardar perfil
          </button>
        </form>
      )}
    </VolunteerDialog>
  );
}
