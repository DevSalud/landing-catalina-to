# Decisiones Técnicas y Arquitectura (Playbook)

Este documento centraliza las decisiones arquitectónicas y la selección de tecnologías (Stack) en esta *landing page*. El objetivo es servir como referencia principal técnica para clonar, escalar y adaptar rápidamente esta base a futuros clientes con confianza de no improvisar.

## 1. Core Stack y Framework
- **Framework Base:** [Astro](https://astro.build/).
  - *Por qué:* Es la herramienta definitiva para sitios estáticos o pseudo-estáticos orientados al contenido y el SEO. Su paradigma de "Arquitectura en Islas" compila a puro HTML/CSS sin enviar JavaScript al cliente de forma predeterminada, alcanzando puntajes de Web Vitals de casi 100/100 fácilmente.
- **Estilización:** [Tailwind CSS](https://tailwindcss.com/).
  - *Por qué:* Agiliza la maquetación. Preserva un sistema de diseño consistente, evita las colisiones de nombres CSS globales y purga el código no usado eficientemente para producción.
- **Lenguaje:** TypeScript (`.ts` y `.astro`).
  - *Por qué:* Evitar errores en tiempo de pre-compilación y facilitar refactorizaciones masivas cuando los datos del cliente cambian.

## 2. Gestión de UI y Experiencia Gráfica
- **Animaciones de Scroll (Reveal):** Vanilla JS.
  - *Decisión:* En lugar de arrastrar librerías pesadas como GSAP, AOS o Framer Motion para animaciones sencillas de opacidad y escalas de entrada (`.reveal-left`, `.reveal`), se optó por un `IntersectionObserver` ultra ligero introducido globalmente en `Layout.astro`.
- **Iconografía:** `lucide-react`.
  - *Decisión:* Vectores limpios y consistentes. Astro se encarga de extraerlos y renderizarlos en build-time como `<svg>` embebidos, sin obligarnos a enviar *React* al dispositivo del cliente.
- **Notificaciones UI (Toasts):** `sonner`.
  - *Decisión:* La librería más ligera, visualmente moderna y accesible para manejar notificaciones (ej. tras enviar correos).

## 3. Optimización Automática (Performance)
- **Imágenes Inteligentes:** Componente `<Picture>` de módulo nativo `astro:assets`.
  - *Por qué:* Optimiza y redimensiona cualquier imagen local automáticamente a WebP/AVIF. Configura `srcset` exacto para cada pantalla, evita Layout Shifts (CLS) y maneja el *lazy-loading*.
  - *Excepción:* El Hero section fuerza `fetchpriority="high"` y `loading="eager"` en su imagen, asegurando un Largest Contentful Paint (LCP) inmediato.
- **Fuentes Tipográficas Localizadas:** Fuentes auto-alojadas (`/public/fonts/*.woff2`) precargadas en el `<head>`.
  - *Decisión:* Evitar penalizaciones por conectarse a dominios externos como Google Fonts que bloquean el subproceso de renderizado y causan Layout Shifts por swaps de texto.

## 4. Estructura Lógica y de Datos (SOLID)
- **Single Source of Truth (Fuente Única de Verdad):** Todas las variables dinámicas de los clientes (teléfonos, correos, URL, links de pago, direcciones, namespace de agendamiento) se concentran en un único archivo `src/lib/constants.ts`. Adaptar el sitio a un nuevo cliente implica modificar casi exclusivamente este entorno.
- **Manejo de Formularios (Backend-less):** [Astro Actions](https://docs.astro.build/en/guides/actions/).
  - *Decisión:* Mantiene llamadas seguras tipo-RPC para enviar formularios sin necesidad de requerir un servidor Node costoso o rutas de API puras.
- **Modulos Dinámicos (Lazy Import):** La lógica cliente (`contact.ts` y `about.ts`) solo se carga cuando es verdaderamente necesario. El listener de eventos del Toast o las Actions solo inician resoluciones DNS y módulos de JS pesados cuando el usuario realiza un *scroll* e ingresa a dichas capas.

## 5. Integraciones de Terceros (SaaS)
Estas son las piezas satelitales seleccionadas para el sitio por su limpieza y efectividad:
- **Analítica de Audiencia:** [Umami Analytics](https://umami.is).
  - *Por qué:* 100% centrado en la privacidad y anonimato. Su SDK pesa ~2kb, no impacta la carga (defer) y elimina la obligación legal (en la mayoría de las legislaciones) de tener el horrible *"Banner Consentimiento de Cookies"* de Google Analytics.
  - *Integración:* Implementado en los componentes clave mendiante atributos DOM rastreables (`data-umami-event="hero-agendar"`).
- **Agendamiento:** [Cal.com](https://cal.com).
  - *Por qué:* Abierto, modificable e integrable. Elimina la fricción de redireccionar usuarios a dominios extraños de terceros reduciendo tasas de rebote y abandono.
  - *Integración:* La UI se inserta sobre la página nativamente (Modal) mediante un snippet interceptor asincrónico alojado al final del documento global (`Layout.astro`). Se apoya obligatoriamente en atributos natales `href="javascript:void(0)"` y `data-cal-link` para prevenir saltos de navegación.

## 6. Motores de Búsqueda (Technical SEO)
- **Schemas.org:** Implementación integrada de generadores JSON-LD (`src/lib/seoSchemas.ts`) para Rich Snippets en directorios de búsqueda (LocalBusiness, MedicalWebPage).
- **Control de Metas:** OpenGraph, Twitter Cards, *canonical tags* autotransformadores con inyección dinámica según el idioma (`es-CL`) para que al ser compartido por WhatsApp se generen las miniaturas exactas.
