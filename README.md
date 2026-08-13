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
- **Next.js 16** - Framework React con App Router
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 4** - Estilos utility-first
- **shadcn/ui** - Componentes UI accesibles
- **Framer Motion** - Animaciones fluidas
- **Lucide React** - Iconos modernos

### Backend
- **Prisma 6** - ORM type-safe
- **PostgreSQL (Supabase)** - Base de datos en producción y desarrollo
- **Next.js API Routes** - Backend integrado
- **Resend** - Envío de correos del formulario de contacto

### Estado y Datos
- **Zustand** - Estado global
- **TanStack Query** - Caching y sincronización de datos
- **React Hook Form** - Formularios optimizados

### DevOps
- **Vercel** - Hosting y despliegue continuo
- **ESLint** - Linting de código
- **TypeScript** - Validación de tipos

> El proyecto se despliega exclusivamente en Vercel. No usa Docker ni VPS propio.

---

## 📂 Estructura del Proyecto

```
Portafolio/
├── prisma/
│   ├── schema.prisma                     # Esquema de la base de datos (PostgreSQL)
│   └── seed.ts                           # Datos iniciales
├── public/
│   └── images/                           # Imágenes estáticas locales
├── src/
│   ├── app/                                   # Next.js App Router
│   │   ├── api/                               # API Routes
│   │   │   ├── contact/                       # Envío de correo (Resend)
│   │   │   ├── education/                     # Formación académica
│   │   │   ├── experiences/                   # Experiencia laboral
│   │   │   ├── profile/                       # Perfil
│   │   │   ├── projects/                      # Proyectos
│   │   │   ├── section-headers/               # Encabezados dinámicos de sección
│   │   │   ├── services/                      # Servicios
│   │   │   ├── skills/                        # Habilidades
│   │   │   └── tutorials/                     # Tutoriales
│   │   ├── page.tsx                           # Página principal
│   │   ├── layout.tsx                         # Layout raíz
│   │   └── globals.css                        # Estilos globales
│   │
│   ├── components/
│   │   ├── portafolio/                        # Componentes del portafolio
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── EducationSection.tsx
│   │   │   ├── EducationTimeline.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── ExperienceTimeline.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── LoadingSkeleton.tsx
│   │   │   ├── PortafolioSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   └── TutorialsSection.tsx
│   │   ├── layout/                            # Componentes de layout
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   ├── providers/
│   │   │   └── providers.tsx
│   │   └── ui/                                # Componentes shadcn/ui
│   │
│   ├── hooks/
│   │   ├── use-mobile.ts                      # Hook para detectar mobile
│   │   ├── use-portafolio-data.ts             # Hooks de datos con TanStack Query
│   │   └── use-toast.ts                       # Hook para notificaciones toast
│   │
│   └── lib/
│       ├── db.ts                              # Cliente Prisma (patrón singleton)
│       ├── rate-limit.ts                      # Rate limiting (3 envíos cada 5 min)
│       ├── utils.ts                     
│       └── whatsapp.ts                        # Helper para construir links de WhatsApp
│
├── 📄.env                                      # Variables de entorno (gitignored)
├── 📄.env.example
├── 📄.gitignore
├── 📄bun.lock
├── 📄components.json
├── 📄DEPLOYMENT.md                       # Guía detallada del proceso de despliegue
├── 📄eslint.config.mjs
├── 📄IMAGES_GUIDE.md
├── 📄next.config.ts
├── 📄next-env.d.ts
├── 📄package.json
├── 📄postcss.config.mjs
├── 📄PROJECT_STATUS.md
├── 📄README.md
├── 📄tailwind.config.ts
└── 📄tsconfig.json
```

> `scripts/`, `upload/`, `Dockerfile`, `.dockerignore`, `Caddyfile` y `package-lock.json` fueron eliminados: los primeros dos ya no se usaban, y los de Docker/Caddy solo aplicaban a self-hosting con VPS, algo que este proyecto no usa (despliegue 100% en Vercel).

---

## 🎮 Comandos Disponibles

### Desarrollo

```bash
# Instalar dependencias
bun install

# Iniciar servidor de desarrollo
bun run dev

# Verificar calidad de código
bun run lint
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
# Construir para producción
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
```

> Si la contraseña contiene caracteres especiales (`@`, `#`, `%`, etc.), deben percent-encodearse. Ver [DEPLOYMENT.md](DEPLOYMENT.md) para el detalle completo.

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

---

# 📧 Formulario de Contacto y WhatsApp

## Envío de correo (Resend)

El formulario de contacto (`ContactForm.tsx`) envía un correo real a través de la API route `src/app/api/contact/route.ts`, usando [Resend](https://resend.com/).

### Variables de entorno requeridas

Archivo `.env`:

```env
RESEND_API_KEY="re_tu_api_key"
CONTACT_EMAIL="tu-email@ejemplo.com"
```

> Sin verificar un dominio propio en Resend, solo se pueden enviar correos hacia la dirección con la que te registraste en la cuenta — suficiente para este caso de uso, ya que el destinatario eres tú mismo.

### Seguridad y anti-spam

La API incluye varias capas de protección para evitar spam y abuso:

- **Validación de longitud mínima:** nombre ≥ 10 caracteres, asunto ≥ 15, mensaje ≥ 100. Esto filtra mensajes de una sola palabra o bots genéricos.
- **Sanitización:** todo el contenido se limpia (`sanitize`) y escapa (`escapeHtml`) antes de insertarse en el HTML del correo, evitando inyección de código.
- **Honeypot:** campo oculto `website` en el formulario. Si un bot lo completa, la API rechaza la petición automáticamente.
- **Rate limiting:** máximo 3 envíos por IP cada 5 minutos, implementado con un store en memoria (`src/lib/rate-limit.ts`).
- **Detección de spam por patrones:** la API evalúa el mensaje contra patrones comunes (URLs, términos promocionales, cripto, etc.). Si el puntaje es alto, se rechaza.

### Responsive del correo

El template HTML del correo está optimizado para verse bien tanto en escritorio como en móvil:

- `meta viewport` y media queries para reducir padding y ajustar el ancho en pantallas < 600 px.
- Ancho máximo configurable (por defecto `820px` en desktop, `100%` en móvil).
- Botón de respuesta y texto con `word-break` para evitar desbordes.

### UX del formulario

- Validación en tiempo real con errores por campo (borde rojo + mensaje).
- Contador de caracteres en el mensaje (`0/5000`).
- Botón de envío se deshabilita mientras hay errores o está cargando.
- Estados visuales de éxito/error con auto-limpieza tras 5 segundos.

## Enlaces a WhatsApp

El teléfono del perfil no abre el marcador (`tel:`), sino WhatsApp directo con un mensaje predefinido. Esto se centraliza en `src/lib/whatsapp.ts` (`buildWhatsappLink`), usado tanto en `HeroSection.tsx` como en `ContactForm.tsx` — evita duplicar la lógica en ambos componentes.

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
3. Variables `DATABASE_URL`, `DIRECT_URL`, `RESEND_API_KEY`, `CONTACT_EMAIL` configuradas en Vercel (Production + Preview + Development)
4. Cada push a una rama genera un **Preview Deployment**; cada merge a `main` despliega a producción automáticamente

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
  email: string
  phone?: string
  whatsappMessage?: string // mensaje predefinido del link de WhatsApp
  linkedin?: string
  github?: string
  location?: string
  bio?: string
  profileImage?: string    // URL de foto de perfil
  logoImage?: string       // URL del logo
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
3. Sin dominio verificado en Resend, el correo solo llega a la dirección con la que te registraste

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
- [ ] Optimizar imágenes con Next.js Image
- [ ] Agregar pruebas unitarias
- [ ] Configurar CI/CD con GitHub Actions

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