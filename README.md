# web-portal

Portal público de **CO Politica Centro** — movimiento político de centro en Colombia (liberalismo social).

Producción: https://web-portal-co-politica.vercel.app

## Qué incluye

- Home narrativa: hero, quiénes somos, pilares, destacados, liderazgo, actualidad, comunidades, cierre
- Páginas `/propuestas`, `/equipo`, `/contacto`
- Nav accesible (skip link, menú móvil ARIA, `aria-current`)
- Scroll motion con GSAP + respeto a `prefers-reduced-motion`
- Contenido centralizado en `src/content/site.ts`
- Comunidad en Discord: https://discord.gg/VKjgAbDDvC

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + `cn()` (`clsx` + `tailwind-merge`)
- GSAP / `@gsap/react` / ScrollTrigger
- Vitest, ESLint, Prettier, react-doctor
- Vercel Analytics + GitHub Actions CI (solo paths de código)

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
| `pnpm run ci`       | Lint + typecheck + format + test + build |
| `pnpm react:doctor` | Análisis React Doctor                    |

## Accesibilidad y motion

- Skip link “Saltar al contenido”
- Landmarks `header` / `main#contenido` / `footer`
- Menú móvil con Escape, focus trap y cierre al navegar
- Motion con GSAP: `PageIntro` (carga inicial), `Reveal` (entrada/salida de viewport) y `ParallaxLite` (hero)
- Script `motion-ok` pre-oculta intros antes de hidratar para que la carga se vea
- Con `prefers-reduced-motion: reduce` no hay reveals, intros ni parallax

## Despliegue (Vercel)

- Proyecto: `web-portal-co-politica`
- Variable: `NEXT_PUBLIC_SITE_URL`
- Para deploys automáticos desde GitHub: instalar la [GitHub App de Vercel](https://github.com/apps/vercel) en la org y vincular el repo

Dominio custom: Project → Settings → Domains.
