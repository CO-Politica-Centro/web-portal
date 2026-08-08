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
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { getFirebaseClient, isFirebaseConfigured } from "@/lib/firebase/client";

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
  const configured = isFirebaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(() => configured);

  useEffect(() => {
    if (!configured) return;
    const client = getFirebaseClient();
    if (!client) {
      const t = window.setTimeout(() => setLoading(false), 0);
      return () => window.clearTimeout(t);
    }
    return onAuthStateChanged(client.auth, (next) => {
      setUser(next);
      setLoading(false);
    });
  }, [configured]);

  const signInGoogle = useCallback(async () => {
    const client = getFirebaseClient();
    if (!client) throw new Error("Firebase no configurado");
    await signInWithPopup(client.auth, new GoogleAuthProvider());
  }, []);

  const signInEmail = useCallback(async (email: string, password: string) => {
    const client = getFirebaseClient();
    if (!client) throw new Error("Firebase no configurado");
    await signInWithEmailAndPassword(client.auth, email, password);
  }, []);

  const signUpEmail = useCallback(async (email: string, password: string) => {
    const client = getFirebaseClient();
    if (!client) throw new Error("Firebase no configurado");
    await createUserWithEmailAndPassword(client.auth, email, password);
  }, []);

  const logout = useCallback(async () => {
    const client = getFirebaseClient();
    if (!client) return;
    await signOut(client.auth);
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
