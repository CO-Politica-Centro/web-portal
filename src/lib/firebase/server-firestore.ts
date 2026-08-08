import "server-only";

const PROJECT_ID =
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "web-portal-cpc";

type FirestoreValue =
  | { stringValue: string }
  | { integerValue: string }
  | { booleanValue: boolean }
  | { timestampValue: string }
  | { arrayValue: { values?: FirestoreValue[] } };

function stringValue(value: string): FirestoreValue {
  return { stringValue: value };
}

function arrayOfStrings(values: string[]): FirestoreValue {
  return {
    arrayValue: {
      values: values.map((value) => stringValue(value)),
    },
  };
}

async function firestoreFetch(
  path: string,
  idToken: string,
  init: RequestInit,
): Promise<Response> {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${path}`;
  return fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
}

export async function createProjectApplication(input: {
  idToken: string;
  uid: string;
  projectId: string;
  message: string;
}) {
  const body = {
    fields: {
      uid: stringValue(input.uid),
      projectId: stringValue(input.projectId),
      message: stringValue(input.message),
      createdAt: { timestampValue: new Date().toISOString() },
    },
  };

  const response = await firestoreFetch("projectApplications", input.idToken, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || "No se pudo crear la postulación");
  }
}

export async function upsertVolunteerTalent(input: {
  idToken: string;
  uid: string;
  displayName: string;
  headline: string;
  availability: string;
  bio: string;
  skills: string[];
  categories: string[];
}) {
  const now = new Date().toISOString();
  const body = {
    fields: {
      displayName: stringValue(input.displayName),
      headline: stringValue(input.headline),
      availability: stringValue(input.availability),
      bio: stringValue(input.bio),
      skills: arrayOfStrings(input.skills),
      categories: arrayOfStrings(input.categories),
      createdAt: { timestampValue: now },
      updatedAt: { timestampValue: now },
    },
  };

  const response = await firestoreFetch(
    `volunteerTalents/${encodeURIComponent(input.uid)}`,
    input.idToken,
    {
      method: "PATCH",
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    // First-time profile: PATCH may fail if doc missing; try create via POST with documentId.
    const create = await firestoreFetch(
      `volunteerTalents?documentId=${encodeURIComponent(input.uid)}`,
      input.idToken,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    );
    if (!create.ok) {
      const detail = await create.text();
      throw new Error(detail || "No se pudo guardar el perfil");
    }
  }
}
