# web-portal

Portal web del movimiento **CO Politica Centro** (plantilla Next.js lista para contenido).

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- `cn()` (`clsx` + `tailwind-merge`)
- Vitest, ESLint, Prettier, react-doctor
- Vercel Analytics
- GitHub Actions CI

## Desarrollo

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Scripts

| Script              | Descripción                              |
| ------------------- | ---------------------------------------- |
| `pnpm dev`          | Servidor local                           |
| `pnpm ci`           | Lint + typecheck + format + test + build |
| `pnpm react:doctor` | Análisis React Doctor                    |

## Despliegue (Vercel)

1. Conectar este repo a un proyecto Vercel (framework Next.js).
2. Definir `NEXT_PUBLIC_SITE_URL` con la URL de producción (`https://….vercel.app` o dominio custom).
3. Branch de producción: `main`.

Para un dominio propio: Project → Settings → Domains.

## Rutas stub

- `/` — inicio
- `/propuestas`
- `/equipo`
- `/contacto`
