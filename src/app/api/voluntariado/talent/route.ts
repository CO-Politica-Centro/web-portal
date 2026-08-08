import { NextResponse } from "next/server";
import { upsertVolunteerTalent } from "@/lib/firebase/server-firestore";

type Body = {
  idToken?: string;
  uid?: string;
  displayName?: string;
  headline?: string;
  availability?: string;
  bio?: string;
  skills?: string[];
  categories?: string[];
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const idToken = body.idToken?.trim() ?? "";
  const uid = body.uid?.trim() ?? "";
  const displayName = body.displayName?.trim() ?? "";
  const headline = body.headline?.trim() ?? "";
  const availability = body.availability?.trim() ?? "";
  const bio = body.bio?.trim() ?? "";
  const skills = Array.isArray(body.skills)
    ? body.skills.filter((s): s is string => typeof s === "string")
    : [];
  const categories = Array.isArray(body.categories)
    ? body.categories.filter((s): s is string => typeof s === "string")
    : [];

  if (
    !idToken ||
    !uid ||
    !displayName ||
    !headline ||
    !availability ||
    !bio ||
    skills.length === 0 ||
    categories.length === 0
  ) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }

  try {
    await upsertVolunteerTalent({
      idToken,
      uid,
      displayName,
      headline,
      availability,
      bio,
      skills,
      categories,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error al guardar perfil",
      },
      { status: 502 },
    );
  }
}
