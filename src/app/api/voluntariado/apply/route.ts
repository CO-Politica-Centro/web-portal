import { NextResponse } from "next/server";
import { createProjectApplication } from "@/lib/firebase/server-firestore";

type Body = {
  projectId?: string;
  message?: string;
  idToken?: string;
  uid?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const projectId = body.projectId?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const idToken = body.idToken?.trim() ?? "";
  const uid = body.uid?.trim() ?? "";

  if (!projectId || !message || !idToken || !uid) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }
  if (message.length > 2000) {
    return NextResponse.json(
      { error: "Mensaje demasiado largo" },
      { status: 400 },
    );
  }

  try {
    await createProjectApplication({ idToken, uid, projectId, message });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Error al guardar postulación",
      },
      { status: 502 },
    );
  }
}
