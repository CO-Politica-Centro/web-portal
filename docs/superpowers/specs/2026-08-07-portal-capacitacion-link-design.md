# Enlace a web de capacitación — diseño

Fecha: 2026-08-07  
Proyecto: web-portal (CO Politica Centro)  
Estado: implementado

## Problema

El portal público no enlaza a la web hermana de capacitación. Quien llega al portal no tiene un camino claro hacia esa formación.

## Objetivos

- Exponer un CTA visible a capacitación en el hero de inicio.
- Repetir el enlace en el footer (descubrimiento persistente en todas las páginas).
- Una sola URL canónica en el contenido del sitio.

## Fuera de alcance

- Ítem nuevo en el menú principal del header.
- Cambios en FAQ, contacto u otras secciones de la home.
- Dominio custom / env var para la URL (hardcode en `site.urls` como Beacons).
- Cambios en web-capacitacion.

## Decisiones

| Decisión | Elección |
| --- | --- |
| URL | `https://web-capacitacion-co-politica.vercel.app` |
| Label | `Capacitación` |
| Hero | Tercer botón, estilo `btn-secondary`, enlace externo |
| Footer | Columna Contacto, debajo de Beacons |
| Nav header | No |

## Enfoque elegido

URL central en `site.urls` + CTA secundario en hero + enlace en footer Contacto.

Alternativas descartadas:

1. También en nav principal — más descubrimiento, pero densifica el menú; el usuario pidió CTA + footer.
2. CTA primario en hero — máxima visibilidad, pero desplaza propuestas/mensaje político del portal.

## Diseño de implementación

### 1. Contenido (`src/content/site.ts`)

Añadir:

```ts
urls: {
  // ...existentes
  capacitacion: "https://web-capacitacion-co-politica.vercel.app",
}
```

No añadir a `site.nav`.

### 2. Hero (`src/components/home/home-hero.tsx`)

Tras el botón secundario de Beacons, añadir un tercer `ExternalLink`:

- `href={site.urls.capacitacion}`
- `className="btn-secondary sm:w-auto"`
- Texto: `Capacitación`
- Abrir en nueva pestaña (comportamiento por defecto de `ExternalLink`)

Orden de botones: Propuestas (primary) → Comunidades (secondary) → Capacitación (secondary).

### 3. Footer (`src/components/layout/site-footer.tsx`)

En la columna Contacto, después del enlace a Beacons:

- `ExternalLink` a `site.urls.capacitacion`
- Label con `LinkUnderline`: `Capacitación`
- Estilo alineado al de Beacons (`text-brand-green` + medium) o al de email muted — preferir el mismo énfasis que Beacons para consistencia de “destino externo oficial”.

### 4. Tests (`src/content/site.test.ts`)

Extender el test de URLs oficiales:

```ts
expect(site.urls.capacitacion).toMatch(/^https:\/\//);
```

Opcional: assert del host `web-capacitacion-co-politica.vercel.app`.

## Criterios de éxito

- En `/`, el hero muestra tres CTAs y el tercero lleva a la web de capacitación en nueva pestaña.
- En cualquier página, el footer muestra `Capacitación` en Contacto con la misma URL.
- `pnpm test` / CI unitario siguen en verde.
- No hay enlace duplicado en el header nav.

## Notas

- Si más adelante hay dominio propio de capacitación, solo hace falta actualizar `site.urls.capacitacion`.
- No inventar personería ni copy de “academia oficial del partido”; el label corto `Capacitación` es suficiente.
