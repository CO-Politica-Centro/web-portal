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

- Producción actual: https://web-portal-co-politica.vercel.app
- Proyecto: `web-portal-co-politica` (team Fravelz)

Para deploys automáticos desde GitHub, instala la [GitHub App de Vercel](https://github.com/apps/vercel) en la org `CO-Politica-Centro` y vincula este repo en Project → Settings → Git.

Dominio custom: Project → Settings → Domains.

## Rutas stub

- `/` — inicio
- `/propuestas`
- `/equipo`
- `/contacto`
