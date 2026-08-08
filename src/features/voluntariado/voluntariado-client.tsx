"use client";

import { FirebaseAuthProvider } from "@/lib/firebase/auth-context";
import { VoluntariadoBoard } from "@/features/voluntariado/voluntariado-board";

export function VoluntariadoClient() {
  return (
    <FirebaseAuthProvider>
      <VoluntariadoBoard />
    </FirebaseAuthProvider>
  );
}
