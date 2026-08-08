"use client";

import { useId, useState, type FormEvent } from "react";
import { VolunteerDialog } from "@/features/voluntariado/volunteer-dialog";
import { useFirebaseAuth } from "@/lib/firebase/auth-context";
import { cn } from "@/lib/utils";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  title?: string;
};

export function AuthModal({
  open,
  onClose,
  onSuccess,
  title = "Inicia sesión para continuar",
}: AuthModalProps) {
  const titleId = useId();
  const { configured, signInGoogle, signInEmail, signUpEmail } =
    useFirebaseAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      if (mode === "signin") await signInEmail(email, password);
      else await signUpEmail(email, password);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo completar la autenticación",
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
      title={title}
    >
      {!configured ? (
        <p className="text-muted mt-4 text-sm leading-relaxed">
          Firebase aún no está configurado en este entorno. Añade las variables
          `NEXT_PUBLIC_FIREBASE_*` para habilitar inicio de sesión.
        </p>
      ) : (
        <>
          <button
            type="button"
            className="btn-secondary mt-6 w-full"
            disabled={pending}
            onClick={async () => {
              setError(null);
              setPending(true);
              try {
                await signInGoogle();
                onSuccess?.();
                onClose();
              } catch (err) {
                setError(
                  err instanceof Error
                    ? err.message
                    : "No se pudo iniciar con Google",
                );
              } finally {
                setPending(false);
              }
            }}
          >
            Continuar con Google
          </button>

          <div className="text-muted my-5 text-center text-sm">o con email</div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium">
              Correo
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-foreground/15 bg-background mt-1 w-full rounded-md border px-3 py-2"
              />
            </label>
            <label className="block text-sm font-medium">
              Contraseña
              <input
                type="password"
                required
                minLength={6}
                autoComplete={
                  mode === "signin" ? "current-password" : "new-password"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-foreground/15 bg-background mt-1 w-full rounded-md border px-3 py-2"
              />
            </label>
            {error ? (
              <p className="text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={pending}
            >
              {mode === "signin" ? "Entrar" : "Crear cuenta"}
            </button>
          </form>

          <button
            type="button"
            className={cn(
              "text-brand-green mt-4 inline-flex min-h-11 items-center text-sm font-semibold underline-offset-4 hover:underline",
            )}
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin"
              ? "¿No tienes cuenta? Regístrate"
              : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </>
      )}
    </VolunteerDialog>
  );
}
