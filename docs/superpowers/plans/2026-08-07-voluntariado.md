# Voluntariado Board Implementation Plan

> **For agentic workers:** Implement task-by-task. Steps use checkbox syntax.

**Goal:** Ship `/voluntariado` with Proyectos/Talentos tabs, brand-coherent board UI, Firebase Auth + Firestore wired with local seed fallback.

**Architecture:** Server page + client board feature; Firebase modular SDK behind env flags; Firestore collections `projects`, `talentProfiles`, `applications`.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4, Firebase JS SDK, Vitest.

## Global Constraints

- UI/copy in Spanish; commits in English Conventional Commits.
- Do not invent party legal status; keep `site.disclaimer`.
- Prefer Server Components; `"use client"` only when needed.
- Scope: `src/features/voluntariado/` + thin `src/app/voluntariado/`.
- CI (`pnpm run ci`) must pass without Firebase credentials (seed fallback).

---

### Task 1: Firebase project + rules

- [ ] Create Firebase project `web-portal-cpc`
- [ ] Web app + Auth (Google + email) + Firestore rules
- [ ] Document env keys in `.env.example`

### Task 2: Domain model + seed

- [ ] Types, categories, seed projects/talents
- [ ] Unit test for category filter helpers

### Task 3: Firebase client + Auth UI

- [ ] `src/lib/firebase/client.ts` + auth context
- [ ] Sign-in modal (Google + email)

### Task 4: Board UI

- [ ] Tabs, filters, project cards, talent cards, bottom CTA
- [ ] Apply / register forms writing to Firestore when configured

### Task 5: Wire into portal shell

- [ ] Nav, sitemap, CSP connect-src for Google/Firebase
- [ ] Run `pnpm run ci`
