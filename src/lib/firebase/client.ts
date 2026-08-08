import { initializeApp, getApps, type FirebaseApp } from "firebase/app";

export type FirebaseClient = {
  app: FirebaseApp;
};

type PublicFirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

let cachedConfig: PublicFirebaseConfig | null | undefined;
let appPromise: Promise<FirebaseApp | null> | null = null;

async function loadPublicConfig(): Promise<PublicFirebaseConfig | null> {
  if (cachedConfig !== undefined) return cachedConfig;
  try {
    const response = await fetch("/api/firebase/public-config", {
      cache: "no-store",
    });
    if (!response.ok) {
      cachedConfig = null;
      return null;
    }
    const payload = (await response.json()) as {
      configured?: boolean;
      config?: PublicFirebaseConfig;
    };
    cachedConfig = payload.configured && payload.config ? payload.config : null;
    return cachedConfig;
  } catch {
    cachedConfig = null;
    return null;
  }
}

async function getFirebaseApp(): Promise<FirebaseApp | null> {
  if (!appPromise) {
    appPromise = (async () => {
      const config = await loadPublicConfig();
      if (!config) return null;
      return getApps().length > 0 ? getApps()[0]! : initializeApp(config);
    })();
  }
  return appPromise;
}

export async function getFirebaseAuth() {
  const app = await getFirebaseApp();
  if (!app) return null;
  const { getAuth } = await import("firebase/auth");
  return getAuth(app);
}
