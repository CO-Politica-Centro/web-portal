<p align="center">
  <a href="README.md">Español</a> · <a href="README.en.md">English</a>
</p>

<h1 align="center">Portal</h1>

<p align="center">
  <img src="public/brand/og-default.jpg" alt="Imagen de marca del portal, crema, oro y verde" width="100%">
</p>

<p align="center">Portal del movimiento de centro en Colombia.</p>

Sitio público en [web-portal-co-politica.vercel.app](https://web-portal-co-politica.vercel.app). El contenido sale de `src/content/site.ts`. La comunidad está en Discord.

<p align="center">
  <a href="https://github.com/CO-Politica-Centro/web-portal/actions/workflows/ci.yml"><img src="https://github.com/CO-Politica-Centro/web-portal/actions/workflows/ci.yml/badge.svg" alt="Estado de CI"></a>
</p>

<p align="center">
  <a href="https://skillicons.dev">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,pnpm,githubactions&theme=dark&perline=6">
      <source media="(prefers-color-scheme: light)" srcset="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,pnpm,githubactions&theme=light&perline=6">
      <img alt="Next.js, React, TypeScript, Tailwind, pnpm, GitHub Actions" src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,pnpm,githubactions&perline=6">
    </picture>
  </a>
</p>

## Características

- Home, propuestas, equipo y contacto.
- Motion con GSAP y respeto a reduced-motion.
- CI y `pnpm test`.

> [!NOTE]
> El texto del movimiento se edita en `src/content/site.ts`, no repartido por los componentes.

## Tecnologías

- **Next.js, React y Tailwind** — el portal.
- **GSAP** — scroll. No tiene icono en la grilla.
- **pnpm 11.1.1** — Node 22 o superior.

## Inicio rápido

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

> [!IMPORTANT]
> `pnpm run ci` junta lint, tipos, formato, pruebas y build.

## Uso

La invitación de Discord del sitio es https://discord.gg/VKjgAbDDvC.

> [!TIP]
> Con `prefers-reduced-motion` no hay reveals ni parallax. Prueba el portal también así.

## Contribuir

Repositorio de [CO Politica Centro](https://github.com/CO-Politica-Centro).

> [!WARNING]
> No subas `.env.local`.

## Licencia

Este repositorio no incluye un archivo de licencia.
