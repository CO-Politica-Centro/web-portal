<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS — web-portal (CO Politica Centro)

Guía para agentes (Cursor, Claude Code y similares) que trabajen en este repositorio.

## Qué es

Portal web del movimiento político **CO Politica Centro** (Colombia). Plantilla Next.js lista para contenido; org: https://github.com/CO-Politica-Centro — comunidades: https://beacons.ai/centropd

## Idioma

| Canal | Idioma |
| --- | --- |
| UI / README / docs | Español |
| Commits | Inglés (Conventional Commits) |
| Chat con el usuario | Español |

## Stack rápido

Next.js App Router · React · TypeScript · Tailwind v4 · pnpm · Vitest · Vercel · `cn()` en `src/lib/utils.ts`

Calidad: `pnpm run ci`

## Reglas Cursor (fuente de verdad del repo)

- [`.cursor/rules/project-context.mdc`](.cursor/rules/project-context.mdc)
- [`.cursor/rules/stack.mdc`](.cursor/rules/stack.mdc)
- [`.cursor/rules/component-scope.mdc`](.cursor/rules/component-scope.mdc)
- [`.cursor/rules/git-commits.mdc`](.cursor/rules/git-commits.mdc)

## Comandos Cursor

- **`/auto-commit`** → [`.cursor/commands/auto-commit.md`](.cursor/commands/auto-commit.md)

## Commits

- Sin trailers `Co-authored-by: Cursor` / `Made-with: Cursor`
- Usar `git commit -F` + verificar `git log -1 --format=%B`
- No push salvo petición explícita

## Estructura

```
src/app/           # rutas (/, /propuestas, /equipo, /contacto)
src/components/    # UI compartida
src/lib/           # utils (cn, etc.)
src/hooks/         # hooks transversales
.cursor/           # reglas y comandos del agente
```
