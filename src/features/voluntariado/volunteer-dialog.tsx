"use client";

import { useEffect, useEffectEvent, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type VolunteerDialogProps = {
  open: boolean;
  onClose: () => void;
  titleId: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function VolunteerDialog({
  open,
  onClose,
  titleId,
  title,
  children,
  className,
}: VolunteerDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const onCloseEvent = useEffectEvent(onClose);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;
    const onBackdropClick = (event: MouseEvent) => {
      if (event.target === dialog) onCloseEvent();
    };
    dialog.addEventListener("click", onBackdropClick);
    return () => dialog.removeEventListener("click", onBackdropClick);
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className={cn(
        "fixed inset-0 z-[60] m-0 flex h-full max-h-none w-full max-w-none items-center justify-center bg-transparent p-4 open:flex",
        "[&::backdrop]:bg-foreground/40",
      )}
    >
      <div
        className={cn(
          "bg-surface border-foreground/10 w-full max-w-md rounded-xl border p-6 shadow-xl",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id={titleId} className="text-xl font-semibold">
            {title}
          </h2>
          <button
            type="button"
            className="text-muted hover:text-foreground inline-flex min-h-11 min-w-11 items-center justify-center rounded-md"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
