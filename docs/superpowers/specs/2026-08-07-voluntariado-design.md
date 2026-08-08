# Diseño — Banco de voluntariado (`/voluntariado`)

## Objetivo

Nueva sección pública del portal **CO Politica Centro** para conectar proyectos del movimiento con personas voluntarias. UI tipo tablero (filtros + cards), coherente con la marca existente. v1 con Firebase Auth y Firestore.

## Decisiones

| Tema       | Decisión                                                        |
| ---------- | --------------------------------------------------------------- |
| Ruta / nav | `/voluntariado` · “Voluntariado”                                |
| Contenido  | Pestañas **Proyectos** y **Talentos**                           |
| Backend    | Proyecto Firebase nuevo del portal                              |
| Auth       | Google + email/password                                         |
| Alcance v1 | UI usable + Auth + lecturas/escrituras básicas; sin panel admin |

## Arquitectura

- **Página** `src/app/voluntariado/page.tsx` (Server Component, SEO).
- **Feature** `src/features/voluntariado/` (tipos, seed, board client, cards, formularios).
- **Firebase** `src/lib/firebase/` (app client, auth context). Config vía `NEXT_PUBLIC_FIREBASE_*`.
- Si faltan env vars: la UI usa **seed local**; Auth/escritura muestran estado “no configurado” sin romper el build/CI.

## Datos (Firestore)

- `projects` — listado público de proyectos (seed inicial; escritura solo backend/consola).
- `talentProfiles` — perfiles públicos; create/update solo del `uid` autenticado.
- `applications` — postulaciones; create solo autenticado; read propio.

## UI

- Hero institucional (eyebrow, título, disclaimer del movimiento).
- Filtros por categoría; pestañas Proyectos / Talentos.
- Cards: categoría, horas, título, descripción, skills, progreso de cupos, estado, CTA.
- CTA inferior: registrar talento en la red.
- Postular / registrar requiere sesión (modal de Auth).

## Fuera de alcance v1

Panel admin, moderación, chat, notificaciones push, pagos.
