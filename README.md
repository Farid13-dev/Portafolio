# 🚀 Portafolio - Oliver Farid Rodriguez Morales

Portafolio profesional de Ingeniero de Software Full Stack construido con Next.js 16, TypeScript, Prisma y PostgreSQL.

---

## 📋 Índice

1. [Inicio Rápido](#-inicio-rápido)
2. [Tecnologías](#-tecnologías)
3. [Estructura del Proyecto](#-estructura-del-proyecto)
4. [Comandos Disponibles](#-comandos-disponibles)
5. [Base de Datos](#-base-de-datos)
6. [Formulario de Contacto y WhatsApp](#-formulario-de-contacto-y-whatsapp)
7. [Imágenes](#-imágenes)
8. [Despliegue](#-despliegue)
9. [Desarrollo Local](#-desarrollo-local)
10. [Modelos de Datos](#-modelos-de-datos)
11. [Troubleshooting](#-troubleshooting)
12. [Próximos Pasos](#-próximos-pasos)

---

## ⚡ Inicio Rápido

```bash
# Instalar dependencias
bun install

# Generar Prisma Client
bun run db:generate

# Crear tablas en la base de datos
bun run db:push

# Poblar con datos iniciales
bun run db:seed

# Iniciar servidor de desarrollo
bun run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

> Necesitas un archivo `.env` con `DATABASE_URL`, `DIRECT_URL`, `RESEND_API_KEY` y `CONTACT_EMAIL` antes del primer paso. Ver [Base de Datos](#-base-de-datos) y [Formulario de Contacto](#-formulario-de-contacto-y-whatsapp).

---

## 🛠️ Tecnologías

### Frontend
- **Next.js 16** - App Router con **React Server Components** e **ISR** (las páginas se generan como HTML estático y se regeneran cada hora)
- **React 19** - Server Actions y `useActionState` en el formulario de contacto
- **TypeScript 5** - Tipado estricto, tipos derivados del schema de Prisma
- **Tailwind CSS 4** - Estilos utility-first
- **shadcn/ui** - Solo los componentes que se usan (button, card, badge, input, textarea)
- **next/image**, **next/link**, **next/font** - Imágenes optimizadas (AVIF/WebP), navegación con prefetch y fuente Geist autoalojada
- **next-themes** - Modo oscuro según el sistema
- **Lucide React** - Iconos

### Backend
- **Prisma 6** - ORM type-safe, consultado directamente desde los Server Components (`src/lib/data.ts`)
- **PostgreSQL (Supabase)** - Base de datos en producción y desarrollo
- **Server Actions** - Envío del formulario de contacto (`src/app/actions/send-contact.ts`)
- **Zod 4** - Esquema de validación compartido entre cliente y servidor
- **Resend** - Envío de correos del formulario de contacto

### DevOps
- **Vercel** - Hosting y despliegue continuo (preview por rama, producción desde `main`)
- **GitHub Actions** - CI: lint, typecheck y build en cada PR a `develop`/`main`
- **ESLint** (config por defecto de Next) y **TypeScript** estricto

> El proyecto se despliega exclusivamente en Vercel. No usa Docker ni VPS propio.

### Cómo fluyen los datos

```
Visita → Vercel sirve el HTML ya generado (ISR, revalidate 1h)
                  ↑
   next build / regeneración: page.tsx (Server Component)
                  → src/lib/data.ts → Prisma → PostgreSQL
```

Ninguna visita ejecuta consultas a la base de datos ni peticiones `fetch` desde el navegador: el HTML llega completo (mejor SEO y LCP). Los únicos componentes cliente son `Navigation` (menú móvil + scroll-spy), `ContactFormFields` (formulario) y `SafeImage` (fallback de imagen).

---

## 📂 Estructura del Proyecto

```
Portafolio/
├── .github/workflows/ci.yml              # CI: lint + typecheck + build
├── prisma/
│   ├── schema.prisma                     # Esquema de la base de datos (PostgreSQL)
│   └── seed.ts                           # Datos iniciales
├── public/
│   └── images/                           # Imágenes estáticas locales
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── layout.tsx                    # Layout raíz: nav + main + footer, metadata, ThemeProvider
│   │   ├── page.tsx                      # Home (Server Component, ISR 1h)
│   │   ├── servicios/page.tsx            # Rutas con página y metadata propias
│   │   ├── experiencia/page.tsx
│   │   ├── formacion/page.tsx
│   │   ├── portafolio/page.tsx
│   │   ├── tutoriales/page.tsx
│   │   ├── error.tsx                     # Pantalla de error con "Reintentar"
│   │   ├── not-found.tsx                 # 404
│   │   ├── sitemap.ts / robots.ts        # SEO
│   │   ├── opengraph-image.tsx           # Imagen Open Graph generada con los datos del perfil
│   │   ├── actions/send-contact.ts       # Server Action del formulario de contacto
│   │   └── globals.css                   # Estilos globales (Tailwind v4)
│   │
│   ├── components/
│   │   ├── portafolio/                   # Secciones (Server Components)
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── ExperienceSection.tsx / ExperienceTimeline.tsx
│   │   │   ├── EducationSection.tsx / EducationTimeline.tsx
│   │   │   ├── PortafolioSection.tsx
│   │   │   ├── TutorialsSection.tsx
│   │   │   ├── ContactSection.tsx        # Información de contacto (servidor)
│   │   │   └── ContactFormFields.tsx     # Formulario (cliente, useActionState)
│   │   ├── layout/
│   │   │   ├── Navigation.tsx            # Cliente: menú móvil + scroll-spy (IntersectionObserver)
│   │   │   ├── Footer.tsx
│   │   │   └── BackToHome.tsx
│   │   ├── providers/theme-provider.tsx  # next-themes
│   │   └── ui/                           # shadcn/ui usados + SafeImage (next/image con fallback)
│   │
│   ├── lib/
│   │   ├── data.ts                       # Fetchers con Prisma (server-only, React cache)
│   │   ├── db.ts                         # Cliente Prisma (singleton)
│   │   ├── navigation.ts                 # Definición única de las secciones
│   │   ├── site.ts                       # URL y nombre del sitio
│   │   ├── contact-schema.ts             # Zod: reglas del formulario
│   │   ├── email.ts                      # Plantillas del correo
│   │   ├── rate-limit.ts                 # 3 envíos cada 5 min por IP
│   │   ├── whatsapp.ts                   # Link de WhatsApp
│   │   └── utils.ts
│   │
│   └── types/
│       └── portafolio.ts                 # Tipos derivados del schema de Prisma
│
├── .env.example
├── components.json
├── DEPLOYMENT.md                         # Guía del proceso de despliegue
├── eslint.config.mjs
├── IMAGES_GUIDE.md
├── next.config.ts                        # images.remotePatterns, reactStrictMode
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

---

## 🎮 Comandos Disponibles

### Desarrollo

```bash
# Instalar dependencias
bun install

# Iniciar servidor de desarrollo
bun run dev

# Verificar calidad de código (lo mismo que ejecuta el CI)
bun run lint
bun run typecheck
```

### Base de Datos

```bash
# Generar Prisma Client
bun run db:generate

# Sincronizar el schema con la base de datos
bun run db:push

# Poblar con datos iniciales
bun run db:seed

# Abrir Prisma Studio (interfaz gráfica)
bunx prisma studio
```

### Producción

```bash
# Construir para producción (necesita DATABASE_URL: las páginas se generan leyendo la BD)
bun run build

# Iniciar servidor de producción
bun run start
```

---

## 🗄️ Base de Datos

El proyecto usa **PostgreSQL alojado en Supabase**, tanto en desarrollo local como en producción (Vercel). El cliente de Prisma se instancia una sola vez con patrón singleton en `src/lib/db.ts`, evitando abrir conexiones nuevas en cada request.

### Esquema

- **Profile** - Información personal y profesional
- **SectionHeader** - Título y descripción dinámicos de cada sección de la página
- **Service** - Servicios ofrecidos
- **Experience** - Experiencia laboral
- **Education** - Formación académica (carreras, posgrados, cursos)
- **Project** - Proyectos realizados
- **Tutorial** - Tutoriales creados
- **SkillCategory** - Categorías de habilidades
- **Skill** - Habilidades específicas

### Datos Iniciales

El script `seed.ts` incluye:

| Modelo | Cantidad | Contenido |
|--------|----------|-----------|
| Profile | 1 | Perfil completo de Oliver Farid Rodriguez Morales |
| SectionHeader | 7 | Título/descripción de cada sección (sobre-mí, servicios, experiencia, formación, portafolio, tutoriales, contacto) |
| Services | 6 | Desarrollo Web, Apps Móviles, Backend, BD, Cloud, Consultoría |
| Experiences | 3 | Experiencia laboral real |
| Education | 2 | Formación académica real |
| Projects | 6 | Proyectos con imágenes y enlaces a GitHub |
| Tutorials | 6 | Tutoriales con imágenes y videos de YouTube |
| SkillCategories | 4 | Frontend, Backend, Database, DevOps & Tools |
| Skills | ~23 | Habilidades organizadas por categoría |

### Variables de Entorno Requeridas

```env
# Pooling (runtime) — puerto 6543
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Conexión directa (migraciones/db:push) — puerto 5432
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"

# Dominio público (metadata, sitemap, robots, Open Graph). En Vercel, si falta, se usa VERCEL_PROJECT_PRODUCTION_URL
NEXT_PUBLIC_SITE_URL="https://tu-dominio.com"
```

> Si la contraseña contiene caracteres especiales (`@`, `#`, `%`, etc.), deben percent-encodearse. Ver [DEPLOYMENT.md](DEPLOYMENT.md) para el detalle completo.
>
> Como las páginas se generan en `next build` (ISR), `DATABASE_URL` también debe estar disponible **durante el build** (en Vercel lo está; en GitHub Actions hay que añadirla como secret).

### Editar Contenido del Portafolio

Todo el contenido (perfil, proyectos, servicios, formación, encabezados de sección, etc.) se administra de dos formas:

**Con Prisma Studio o el Table Editor de Supabase** (edición directa, sin tocar código):
```bash
bunx prisma studio
```
Se abre en [http://localhost:5555](http://localhost:5555) — conectado a la base de datos que tengas configurada en `.env`.

**Editando `prisma/seed.ts`** (recomendado cuando el cambio debe quedar versionado en Git):
```bash
bun run db:seed
```

> ⚠️ Tu `.env` local apunta a la misma base de datos que usa producción. Cualquier cambio hecho con Prisma Studio o `db:seed` desde tu máquina se refleja de inmediato en el sitio en vivo.

### CV en PDF (botón "Descargar CV")

El hero muestra el botón solo si `Profile.cvUrl` tiene valor. Para publicar el PDF:
. Supabase → **Storage** → **New bucket** (p. ej. `docs`) marcado como **Public**.. Sube el archivo (p. ej. `cv-oliver-rodriguez.pdf`) y copia su **URL pública** (`…/storage/v1/object/public/docs/cv-oliver-rodriguez.pdf`).. Guarda esa URL en `Profile.cvUrl` (Prisma Studio o `prisma/seed.ts`). La home se regenera en la siguiente revalidación (máx. 1 h) o al redesplegar.

---

# 📧 Formulario de Contacto y WhatsApp

## Envío de correo (Resend)

El formulario de contacto (`ContactSection.tsx` + `ContactFormFields.tsx`) envía el correo mediante la **Server Action** `src/app/actions/send-contact.ts`, usando [Resend](https://resend.com/). Las reglas de validación viven en un único esquema de Zod (`src/lib/contact-schema.ts`) que usan tanto el cliente como el servidor.

### Variables de entorno requeridas

Archivo `.env`:

```env
RESEND_API_KEY="re_tu_api_key"
CONTACT_EMAIL="tu-email@ejemplo.com"
CONTACT_FROM="Portafolio <onboarding@resend.dev>"   # opcional; en producción usa un dominio verificado
```

> Sin verificar un dominio propio en Resend, `onboarding@resend.dev` solo puede enviar correos hacia la dirección con la que te registraste en la cuenta — suficiente para este caso de uso, ya que el destinatario eres tú mismo.

### Seguridad y anti-spam

- **Validación con Zod:** nombre ≥ 2 caracteres, asunto ≥ 5, mensaje entre 20 y 5000, email válido. La misma regla se ejecuta en vivo en el cliente (avisa campo a campo y mantiene el botón desactivado hasta que todo es válido) y de nuevo en el servidor antes de enviar.
- **Escape de HTML:** el contenido se escapa (`escapeHtml` en `src/lib/email.ts`) antes de insertarse en el HTML del correo.
- **Honeypot y tiempo de relleno:** campo oculto `website` (fuera del árbol de accesibilidad) y un contador desde que se muestra el formulario. Si un bot lo completa o envía en menos de 2,5 s, la acción responde "éxito" sin enviar nada.
- **Rate limiting:** máximo 3 envíos **válidos** por IP cada 5 minutos, con un store en memoria (`src/lib/rate-limit.ts`). Se comprueba después de validar, así que un intento incompleto no consume cuota; al superarlo se indica cuántos minutos faltan.

### Responsive del correo

El template HTML del correo (`src/lib/email.ts`) está optimizado para escritorio y móvil:

- `meta viewport` y media queries para reducir padding y ajustar el ancho en pantallas < 600 px.
- Ancho máximo `820px` en desktop, `100%` en móvil.
- Botón de respuesta y texto con `word-break` para evitar desbordes.

### UX y accesibilidad del formulario

- Funciona incluso sin JavaScript (`<form action>` + `useActionState`).
- Validación en vivo al salir de cada campo (mismo esquema que el servidor), errores con `aria-invalid` y `aria-describedby`, contador de caracteres del mensaje y foco automático en el primer error.
- El botón permanece desactivado hasta que todos los campos son válidos, con un texto de ayuda enlazado por `aria-describedby`.
- Mensajes de éxito/error con `role="status"` / `role="alert"`.
- Tras un envío correcto el formulario se limpia; si hay error, lo escrito se conserva.
- Mientras se envía, el botón muestra `aria-busy` y bloquea el doble envío.

## Enlaces a WhatsApp

El teléfono del perfil no abre el marcador (`tel:`), sino WhatsApp directo con un mensaje predefinido. Esto se centraliza en `src/lib/whatsapp.ts` (`buildWhatsappLink`), usado tanto en `HeroSection.tsx` como en `ContactSection.tsx` — evita duplicar la lógica en ambos componentes.

El mensaje predefinido se puede personalizar por perfil mediante el campo `Profile.whatsappMessage`; si está vacío, se usa un mensaje por defecto.
---

## 🖼️ Imágenes

### Formatos Soportados

- ✅ **PNG** - Ideal para logos y gráficos con transparencia
- ✅ **JPG/JPEG** - Ideal para fotografías
- ✅ **WebP** - Formato moderno, mejor compresión
- ✅ **SVG** - Gráficos vectoriales escalables
- ✅ **GIF** - Imágenes animadas
- ✅ **Base64** - Imágenes codificadas en texto

### Fuentes de Imágenes

- ✅ **URLs Online** (`http://`, `https://`) — incluye Supabase Storage
- ✅ **Rutas Locales** (`/images/...`)
- ✅ **Base64** (`data:image/...`)

📖 Guía completa: **[IMAGES_GUIDE.md](IMAGES_GUIDE.md)**

---

## 🚀 Despliegue

El proyecto está desplegado en **Vercel**, con base de datos **PostgreSQL en Supabase**, usando flujo **Gitflow** (`main` / `develop` / `feature/*`).

📖 **Guía completa del proceso, paso a paso:** **[DEPLOYMENT.md](DEPLOYMENT.md)**

Resumen rápido:

1. Repo conectado a Vercel, con `main` como rama de producción
2. Base de datos PostgreSQL provisionada en Supabase
3. Variables `DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_EMAIL` (y opcionalmente `CONTACT_FROM`) configuradas en Vercel (Production + Preview + Development)
4. Cada push a una rama genera un **Preview Deployment**; cada merge a `main` despliega a producción automáticamente

### CI (GitHub Actions)

`.github/workflows/ci.yml` ejecuta **lint, typecheck y build** en cada push y pull request hacia `develop` y `main`. Para que el paso de build funcione en GitHub (las páginas leen la base de datos al generarse), añade en el repo **Settings → Secrets and variables → Actions** los secrets `DATABASE_URL` y `DIRECT_URL`; si faltan, el CI ejecuta lint y typecheck y marca el build como omitido (Vercel sigue construyendo en cada deploy).

Flujo recomendado: `feature/*` → PR a `develop` (CI en verde + preview de Vercel) → PR de `develop` a `main` (producción).

Para desplegar cambios nuevos, sigue el flujo Gitflow documentado en [DEPLOYMENT.md](DEPLOYMENT.md#-6-flujo-gitflow-para-futuros-cambios).

---

## 💻 Desarrollo Local

### Configuración en WebStorm (Windows)

1. **Abrir el proyecto:** File → Open → seleccionar carpeta del proyecto
2. **Instalar Bun** (si no está instalado):
   ```powershell
   irm bun.sh/install.ps1 | iex
   ```
3. **Instalar dependencias y preparar la base de datos:**
   ```powershell
   bun install
   bun run db:generate
   bun run db:push
   bun run db:seed
   ```
4. **Ejecutar el servidor:**
   ```powershell
   bun run dev
   ```
5. **Abrir en navegador:** [http://localhost:3000](http://localhost:3000)

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (ver plantilla en `.env.example`):

```env
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
RESEND_API_KEY="re_tu_api_key"
CONTACT_EMAIL="tu-email@ejemplo.com"
NODE_ENV=development
```

### Desarrollo Iterativo

Next.js tiene Hot Module Reload, por lo que:
- Los cambios en el código se reflejan automáticamente
- No necesitas recargar el navegador
- Los cambios en el schema de la base de datos requieren re-ejecutar `bun run db:push`
- Los cambios en el contenido (`seed.ts`) requieren re-ejecutar `bun run db:seed`

---

## 📊 Modelos de Datos

### Profile
```typescript
{
  id: string
  firstName: string
  lastName: string
  title: string            // título largo (ej. usado en el Hero)
  titleProfile?: string    // título corto (ej. usado en "Sobre Mí")
  headline?: string        // titular del hero (frase con verbo, no el cargo)
  email: string
  phone?: string
  whatsappMessage?: string // mensaje predefinido del link de WhatsApp
  linkedin?: string
  github?: string
  location?: string
  bio?: string
  profileImage?: string    // URL de foto de perfil
  logoImage?: string       // URL del logo
  cvUrl?: string           // URL pública del CV en PDF (Supabase Storage); muestra "Descargar CV"
  techStack?: string       // JSON array de tecnologías
  availability: boolean
}
```

### SectionHeader
```typescript
{
  id: string
  key: string          // "sobre-mi" | "servicios" | "experiencia" | "formacion" | "portafolio" | "tutoriales" | "contacto"
  title: string
  description: string
  order: number
}
```

### Service
```typescript
{
  id: string
  title: string
  description: string
  icon: string           // Nombre del icono Lucide
  features: string       // JSON array
  order: number
  published: boolean
}
```

### Experience
```typescript
{
  id: string
  title: string
  company: string
  location?: string
  description: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  order: number
  published: boolean
}
```

### Education
```typescript
{
  id: string
  title: string          // ej. "Ingeniería de Sistemas"
  institution: string
  type: string            // "Pregrado" | "Maestría" | "Curso" | "Certificación" | "Diplomado"
  location?: string
  description?: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  order: number
  published: boolean
}
```

### Project
```typescript
{
  id: string
  title: string
  description: string
  image: string           // URL de imagen
  githubUrl?: string
  tags: string             // JSON array
  order: number
  published: boolean
}
```

### Tutorial
```typescript
{
  id: string
  title: string
  description: string
  level: string            // Principiante, Intermedio, Avanzado
  duration: string
  category: string
  youtubeUrl?: string
  image?: string
  order: number
  published: boolean
}
```

---

## 🐛 Troubleshooting

### "bun: command not found"

```powershell
irm bun.sh/install.ps1 | iex
```

### Base de datos vacía

```bash
bun run db:push
bun run db:seed
```

### Imágenes no se muestran

1. Verifica que las URLs en `prisma/seed.ts` sean válidas
2. Ejecuta `bun run db:seed` para actualizar
3. Revisa la consola del navegador para errores de carga

### El formulario de contacto no envía el correo

1. Confirma que `RESEND_API_KEY` y `CONTACT_EMAIL` estén en tu `.env` (local) y en Vercel (Production + Preview)
2. Revisa que la cuenta de Resend esté activa y la key no haya expirado
3. Sin dominio verificado en Resend, el correo solo llega a la dirección con la que te registraste (configura `CONTACT_FROM` cuando verifiques tu dominio)

### Puerto 3000 en uso

```json
"dev": "next dev -p 3001"
```

### Errores de linting

```bash
bun run lint
```

### Errores de conexión a la base de datos

Revisa que `DATABASE_URL` y `DIRECT_URL` estén bien configuradas, y que la contraseña esté percent-encodeada si tiene caracteres especiales. Ver detalle completo en **[DEPLOYMENT.md](DEPLOYMENT.md#-7-troubleshooting-encontrado)**.

---

## 🎯 Próximos Pasos

### Personalización

1. **Editar perfil:** Modifica `prisma/seed.ts` (o Prisma Studio) y ejecuta `bun run db:seed`
2. **Agregar proyectos/formación/tutoriales:** Edita el array correspondiente en `seed.ts`
3. **Cambiar los títulos de sección:** Tabla `SectionHeader`
4. **Personalizar estilos:** Modifica `src/app/globals.css` y componentes
5. **Agregar dominio propio:** Configúralo desde el dashboard de Vercel

### Mejoras Sugeridas

- [ ] Panel de administrador protegido con autenticación
- [ ] Agregar analytics (Google Analytics, Plausible)
- [ ] Agregar blog personal
- [x] Optimizar imágenes con Next.js Image
- [ ] Agregar pruebas unitarias
- [x] Configurar CI/CD con GitHub Actions (`.github/workflows/ci.yml`)

---

## 📚 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

---

## 📄 Licencia

Este proyecto es de propiedad de Oliver Farid Rodriguez Morales.

---

**Desarrollado con ❤️ usando Next.js, TypeScript, Prisma y PostgreSQL.**

**¿Necesitas ayuda?** Revisa la sección [Troubleshooting](#-troubleshooting) o el detalle completo en [DEPLOYMENT.md](DEPLOYMENT.md).