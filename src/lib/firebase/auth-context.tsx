"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  configured: boolean;
  signInGoogle: () => Promise<void>;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUpEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function FirebaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    void (async () => {
      const auth = await getFirebaseAuth();
      if (cancelled) return;
      if (!auth) {
        setConfigured(false);
        setLoading(false);
        return;
      }
      setConfigured(true);
      const { onAuthStateChanged } = await import("firebase/auth");
      unsubscribe = onAuthStateChanged(auth, (next) => {
        setUser(next);
        setLoading(false);
      });
    })();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  const signInGoogle = useCallback(async () => {
    const auth = await getFirebaseAuth();
    if (!auth) throw new Error("Firebase no configurado");
    const { GoogleAuthProvider, signInWithPopup } =
      await import("firebase/auth");
    await signInWithPopup(auth, new GoogleAuthProvider());
  }, []);

  const signInEmail = useCallback(async (email: string, password: string) => {
    const auth = await getFirebaseAuth();
    if (!auth) throw new Error("Firebase no configurado");
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signUpEmail = useCallback(async (email: string, password: string) => {
    const auth = await getFirebaseAuth();
    if (!auth) throw new Error("Firebase no configurado");
    const { createUserWithEmailAndPassword } = await import("firebase/auth");
    await createUserWithEmailAndPassword(auth, email, password);
  }, []);

  const logout = useCallback(async () => {
    const auth = await getFirebaseAuth();
    if (!auth) return;
    const { signOut } = await import("firebase/auth");
    await signOut(auth);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      configured,
      signInGoogle,
      signInEmail,
      signUpEmail,
      logout,
    }),
    [user, loading, configured, signInGoogle, signInEmail, signUpEmail, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useFirebaseAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      "useFirebaseAuth debe usarse dentro de FirebaseAuthProvider",
    );
  }
  return ctx;
}
