[![CI](https://github.com/DevSalud/landing-catalina-to/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/DevSalud/landing-catalina-to/actions/workflows/ci.yml)

# Landing Page - Catalina Herrera (Terapeuta Ocupacional)

Este repositorio contiene el código fuente del sitio web profesional de **Catalina Herrera**, Terapeuta Ocupacional especializada en atención infanto-juvenil. El proyecto es una landing page moderna, rápida y optimizada para SEO, construida con las últimas tecnologías web.

## 🚀 Tecnologías Utilizadas

El proyecto está construido sobre un stack moderno enfocado en el rendimiento y la experiencia de desarrollo:

- **Framework:** [Astro 5](https://astro.build/) (Server-side Rendering con adaptador Cloudflare).
- **UI Library:** [React 19](https://react.dev/) (Componentes interactivos).
- **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/) (Vite Plugin).
- **CMS:** [Sanity](https://www.sanity.io/) (Gestión de contenido para el Blog).
- **Iconos:** [Lucide React](https://lucide.dev/).
- **Componentes UI:** [Radix UI](https://www.radix-ui.com/) (Accesibilidad y primitivas sin estilo).
- **Backend/Integraciones:**
  - **Cloudflare Pages:** Hosting y Serverless functions (SSR).
  - **Supabase:** Edge Functions para lógica de negocio (recordatorios de citas).
  - **Resend:** Servicio de envío de correos transaccionales.
- **Calidad de Código:** [Biome](https://biomejs.dev/) (Linter y Formatter).

## ✨ Características Principales

- **Inicio Informativo:** Secciones claras sobre servicios, precios, ubicación y perfil profesional.
- **Blog Integrado:** Sistema de blog gestionado con Sanity, incluyendo filtrado por categorías y renderizado de texto enriquecido (Portable Text).
- **Procesamiento de Citas:** Módulo para confirmar o rechazar citas (`/procesar-cita`) que interactúa con funciones serverless externas.
- **SEO Optimizado:** Implementación de Schema.org, sitemap automático y metadatos dinámicos.
- **Diseño Responsivo:** Adaptado a dispositivos móviles y escritorio con animaciones suaves (`tw-animate-css`).

## �️ Instalación y Configuración

### Prerrequisitos

- Node.js (v18 o superior)
- npm, pnpm o bun

### Pasos

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/landing-catalina-to.git
    cd landing-catalina-to
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    # o
    bun install
    ```

3.  **Configurar Variables de Entorno:**

    Crea un archivo `.env` en la raíz del proyecto basándote en el siguiente esquema:

    ```env
    # Google Maps Embed API
    PUBLIC_MAPS_API_KEY=tu_api_key_google_maps

    # Resend (Email Service)
    RESEND_API_KEY=re_tu_api_key_resend

    # Supabase Edge Functions
    EMAIL_REMINDER_FUNCTION_URL=https://tu-proyecto.supabase.co/functions/v1/update-appointment-status
    SUPABASE_PUBLIC_KEY=tu_supabase_anon_key
    ```

4.  **Iniciar el servidor de desarrollo:**

    ```bash
    npm run dev
    ```

    El sitio estará disponible en `http://localhost:4321`.

## 📜 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo local.
- `npm run build`: Construye el sitio para producción (SSR).
- `npm run preview`: Previsualiza la build de producción localmente.
- `npm run typecheck`: Verifica los tipos de TypeScript.
- `npm run biome:check`: Ejecuta el linter Biome.
- `npm run biome:format`: Formatea el código automáticamente con Biome.

## 📂 Estructura del Proyecto

```text
/
├── public/             # Archivos estáticos (imágenes, fuentes, iconos)
├── src/
│   ├── components/     # Componentes Astro y React (.astro, .tsx)
│   ├── layouts/        # Layouts principales (Layout.astro, Main.astro)
│   ├── lib/            # Utilidades, consultas a Sanity y Schemas SEO
│   ├── pages/          # Rutas del sitio (incluye API routes en /api)
│   ├── sanity/         # Configuración y esquemas del CMS Sanity
│   ├── styles/         # Estilos globales CSS
│   └── env.d.ts        # Definiciones de tipos para variables de entorno
├── astro.config.mjs    # Configuración de Astro
├── biome.json          # Configuración de Biome
└── package.json        # Dependencias y scripts
```

## � Despliegue

Este proyecto está configurado para desplegarse en **Cloudflare Pages**.

1.  Conecta tu repositorio a Cloudflare Pages.
2.  Selecciona el framework **Astro**.
3.  Configura las variables de entorno en el panel de Cloudflare.
4.  El comando de build es `npm run build` y el directorio de salida es `dist` (o el predeterminado de Astro/Cloudflare).

---

Desarrollado con ❤️ por Paolo Herrera - DevSalud para Catalina Herrera.
