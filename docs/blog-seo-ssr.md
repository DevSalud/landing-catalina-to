# Blog: SEO y SSR

Este documento describe el estado actual del SEO y el patrón de JSON‑LD para el blog, junto con decisiones y recomendaciones de mantenimiento.

## Estado actual
- La grilla del blog (`src/pages/blog.astro`) se renderiza con SSR inicial y delega el filtrado/interacción a un Island React (`BlogFilterIsland.tsx`) con `client:load`.
- `src/layouts/Layout.astro` es responsable de metadatos SEO (Open Graph, Twitter, canonical) y de inyectar JSON‑LD.
- Si no se pasan props, `Layout` aplica valores por defecto (title, description, imagen, etc.) y un `Person` por defecto.

## Metadatos en `<head>`
- `viewport`: `width=device-width, initial-scale=1` (actualizado).
- Se eliminó `<link rel="sitemap" ...>` (ya declarado en `robots.txt`) y `og:image:type`.
- Canonical absoluto: se calcula con `canonical ?? ogUrl ?? SITE_URL` y se normaliza a URL completa.
- Open Graph: se asegura `og:image` absoluto, `og:image:alt`, `og:title`, `og:description`, `og:type`.
- Artículos: cuando `og:type === 'article'`, se inyecta `article:published_time` (ISO) y `article:tag` por cada etiqueta.
- Twitter: `summary_large_image`, `title`, `description`, `image`, `url`, `image:alt`. No se define `twitter:site` por no haber handle.

## Patrón de JSON‑LD
### Inyección
- Se usa `set:html` para inyectar el JSON en `<script type="application/ld+json">`, evitando que se renderice `{schemaJson}` de forma literal.

Ejemplo real en `Layout.astro`:
```astro
{
  schemaJson && (
    <script is:inline type="application/ld+json" set:html={schemaJson}></script>
  )
}
```

### Comportamiento del `Layout`
- Si NO se pasa `schema`, el `Layout` inyecta un `Person` por defecto (Catalina Herrera) con `worksFor` `LocalBusiness` y un catálogo de ofertas.
- Si se pasa `schema`, el `Layout` inyecta exactamente lo recibido y NO añade el `Person` por defecto. Para conservarlo, inclúyelo dentro del array.

### Catálogo de Ofertas (Person)
- Se definen dos `Offer` para el mismo `Service` (sesión terapéutica):
  - `Sesión terapéutica particular`: `priceCurrency: "CLP"`, `price: "21990"`.
  - `Sesión terapéutica con descuento Fonasa`: `priceCurrency: "CLP"`, `price: "15000"`.
- Recomendación: declarar ambos precios para transparencia y consistencia con el contenido visible.

## Esquemas por página
### Blog index (`/blog`)
- `schema`: `Person`, `BreadcrumbList`, `Blog`.
- Beneficios: identidad consistente (E‑E‑A‑T), breadcrumbs claros, contexto de listado de artículos.

Ejemplo (resumen):
```json
[
  { "@context": "https://schema.org", "@type": "Person", "@id": "https://cataterapia.cl/#catalina" },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cataterapia.cl/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://cataterapia.cl/blog" }
  ]},
  { "@context": "https://schema.org", "@type": "Blog", "name": "Blog de Terapia Ocupacional", "url": "https://cataterapia.cl/blog" }
]
```

### Blog slug (`/blog/[slug]`)
- `schema`: `Person`, `BreadcrumbList`, `BlogPosting`.
- Beneficios: identidad y autoría, breadcrumbs hasta el artículo, datos enriquecidos para rich results.

Ejemplo (resumen):
```json
[
  { "@context": "https://schema.org", "@type": "Person", "@id": "https://cataterapia.cl/#catalina" },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cataterapia.cl/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://cataterapia.cl/blog" },
    { "@type": "ListItem", "position": 3, "name": "Título del artículo", "item": "https://cataterapia.cl/blog/slug" }
  ]},
  { "@context": "https://schema.org", "@type": "BlogPosting", "headline": "Título", "mainEntityOfPage": { "@id": "https://cataterapia.cl/blog/slug" } }
]
```

Nota: En el código actual del slug, el breadcrumb usa 2 niveles (Inicio → Artículo). Se recomienda añadir el nivel intermedio “Blog” para completar los 3 niveles.

## Configuración de sitio y sitemap
- `astro.config.mjs` define `site: "https://cataterapia.cl"`, utilizado para canonicals y IDs (`@id`).
- `@astrojs/sitemap` genera el sitemap; la referencia en `robots.txt` es `Sitemap: https://cataterapia.cl/sitemap-index.xml`.

## Buenas prácticas
- Evita backticks y espacios extra en URLs y `@context` en los esquemas. Usa siempre strings limpios.
- Valida el JSON‑LD con Rich Results Test o Schema Markup Validator.
- Mantén sincronizados los precios declarados en JSON‑LD con los que aparecen en la página.

## Validación y despliegue
- Linter: `bun run biome:check`.
- Typecheck: `bun run typecheck`.
- Build: `bun run build` y `bun run preview`.