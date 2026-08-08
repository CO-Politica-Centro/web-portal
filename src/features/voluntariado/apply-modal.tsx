"use client";

import { useId, useState, type FormEvent } from "react";
import { VolunteerDialog } from "@/features/voluntariado/volunteer-dialog";
import type { VolunteerProject } from "@/features/voluntariado/types";
import { useFirebaseAuth } from "@/lib/firebase/auth-context";

type ApplyModalProps = {
  project: VolunteerProject | null;
  onClose: () => void;
};

export function ApplyModal({ project, onClose }: ApplyModalProps) {
  const titleId = useId();
  const { user } = useFirebaseAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  const open = project !== null;
  const activeProject = project;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user || !activeProject) return;
    setPending(true);
    setError(null);
    try {
      const idToken = await user.getIdToken();
      const response = await fetch("/api/voluntariado/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken,
          uid: user.uid,
          projectId: activeProject.id,
          message: message.trim(),
        }),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(payload?.error ?? "No se pudo enviar la postulación");
      }
      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo enviar la postulación",
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
      title={
        activeProject ? `Postulación · ${activeProject.title}` : "Postulación"
      }
      className="max-w-lg"
    >
      {done ? (
        <p className="text-muted mt-4 leading-relaxed">
          Recibimos tu postulación. El equipo del movimiento te contactará si
          hay cupo o encaje.
        </p>
      ) : (
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium">
            ¿Cómo puedes aportar?
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border-foreground/15 bg-background mt-1 w-full rounded-md border px-3 py-2"
            />
          </label>
          {error ? (
            <p className="text-sm text-red-700" role="alert">
              {error}
            </p>
          ) : null}
          <button type="submit" className="btn-primary" disabled={pending}>
            Enviar postulación
          </button>
        </form>
      )}
    </VolunteerDialog>
  );
}
