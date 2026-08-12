# 🚀 Portafolio - Oliver Farid Rodriguez Morales

Portafolio profesional de Ingeniero de Software Full Stack construido con Next.js 16, TypeScript, Prisma y PostgreSQL.

---

## 📋 Índice

1. [Inicio Rápido](#-inicio-rápido)
2. [Tecnologías](#-tecnologías)
3. [Estructura del Proyecto](#-estructura-del-proyecto)
4. [Comandos Disponibles](#-comandos-disponibles)
5. [Base de Datos](#-base-de-datos)
6. [Imágenes](#-imágenes)
7. [Despliegue](#-despliegue)
8. [Desarrollo Local](#-desarrollo-local)
9. [Modelos de Datos](#-modelos-de-datos)
10. [Troubleshooting](#-troubleshooting)
11. [Próximos Pasos](#-próximos-pasos)

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

> Necesitas un archivo `.env` con `DATABASE_URL` y `DIRECT_URL` apuntando a tu base de datos PostgreSQL antes del primer paso. Ver [Base de Datos](#-base-de-datos).

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

### Estado y Datos
- **Zustand** - Estado global
- **TanStack Query** - Caching y sincronización de datos
- **React Hook Form** - Formularios optimizados

### DevOps
- **Vercel** - Hosting y despliegue continuo
- **Docker** - Contenedores (opcional, para self-hosting)
- **ESLint** - Linting de código
- **TypeScript** - Validación de tipos

---

## 📂 Estructura del Proyecto

```
Portafolio/
├── prisma/
│   ├── schema.prisma                     # Esquema de la base de datos (PostgreSQL)
│   └── seed.ts                           # Datos iniciales
├── public/                               # Archivos estáticos
├── src/
│   ├── app/                                   # Next.js App Router
│   │   ├── api/                               # API Routes
│   │   │   ├── profile/                       # API del perfil
│   │   │   ├── services/                      # API de servicios
│   │   │   ├── projects/                      # API de proyectos
│   │   │   ├── tutorials/                     # API de tutoriales
│   │   │   ├── skills/                        # API de habilidades
│   │   │   └── experiences/                   # API de experiencia
│   │   ├── page.tsx                           # Página principal
│   │   ├── layout.tsx                         # Layout raíz
│   │   └── globals.css                        # Estilos globales
│   │
│   ├── components/
│   │   ├── portfolio/                         # Componentes del portafolio
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── ExperienceTimeline.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── LoadingSkeleton.tsx
│   │   │   ├── PortfolioSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   └── TutorialsSection.tsx
│   │   ├── layout/                            # Componentes de layout
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   ├── providers/
│   │   │   └── providers.tsx
│   │   └── ui/                                # Componentes shadcn/ui
│   │
│   └── hooks/
│       ├── use-mobile.ts                      # Hook para detectar mobile
│       ├── use-portafolio-data.ts              # Hooks de datos con TanStack Query
│       └── use-toast.ts                       # Hook para notificaciones toast
│
├── upload/                              # Archivos subidos
├── 📄.dockerignore
├── 📄.env                                # Variables de entorno (gitignored)
├── 📄.env.example
├── 📄.gitignore
├── 📄bun.lock
├── 📄Caddyfile
├── 📄components.json
├── 📄Dockerfile
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

El proyecto usa **PostgreSQL alojado en Supabase**, tanto en desarrollo local como en producción (Vercel).

### Esquema

- **Experience** - Experiencia laboral
- **Profile** - Información personal y profesional
- **Project** - Proyectos realizados
- **Service** - Servicios ofrecidos
- **Skill** - Habilidades específicas
- **SkillCategory** - Categorías de habilidades
- **Tutorial** - Tutoriales creados

### Datos Iniciales

El script `seed.ts` incluye:

| Modelo | Cantidad | Contenido |
|--------|----------|-----------|
| Experiences | 2 | SDAyR y Ant Factory Systems |
| Profile | 1 | Perfil completo con Oliver Farid Rodriguez Morales |
| Projects | 6 | Proyectos con imágenes y enlaces a GitHub |
| Services | 6 | Desarrollo Web, Apps Móviles, Backend, BD, Cloud, Consultoría |
| Skills | ~23 | Habilidades organizadas por categoría |
| SkillCategories | 4 | Frontend, Backend, Database, DevOps & Tools |
| Tutorials | 6 | Tutoriales con imágenes y videos de YouTube |

### Variables de Entorno Requeridas

```env
# Pooling (runtime) — puerto 6543
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Conexión directa (migraciones/db:push) — puerto 5432
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
```

> Si la contraseña contiene caracteres especiales (`@`, `#`, `%`, etc.), deben percent-encodearse. Ver [DEPLOYMENT.md](DEPLOYMENT.md) para el detalle completo.

### Editar Contenido del Portafolio

Todo el contenido (perfil, proyectos, servicios, etc.) se administra editando `prisma/seed.ts` y volviendo a correr:

```bash
bun run db:seed
```

O directamente con la interfaz visual:

```bash
bunx prisma studio
```

Se abre en [http://localhost:5555](http://localhost:5555) — conectado a la base de datos que tengas configurada en `.env` (local o producción, según cuál apuntes).

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

- ✅ **URLs Online** (`http://`, `https://`)
- ✅ **Rutas Locales** (`/images/...`)
- ✅ **Base64** (`data:image/...`)

### Ejemplo: Imágenes Online

```typescript
// En prisma/seed.ts
{
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  logoImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
}
```

### Ejemplo: Imágenes Locales

1. Coloca las imágenes en `public/images/`
2. Usa la ruta en `prisma/seed.ts`:

```typescript
{
  profileImage: '/images/profile.jpg',
  logoImage: '/images/logo.png',
}
```

⚠️ **Importante:** las rutas locales deben empezar con `/`

### Componentes de Imagen

- **`ImageWrapper`** - Para imágenes generales (proyectos, tutoriales, perfil)
- **`LogoImage`** - Específicamente para logotipos

Ambos incluyen manejo automático de errores, fallback personalizable, loading states y lazy loading opcional.

📖 Guía completa: **[IMAGES_GUIDE.md](IMAGES_GUIDE.md)**

---

## 🚀 Despliegue

El proyecto está desplegado en **Vercel**, con base de datos **PostgreSQL en Supabase**, usando flujo **Gitflow** (`main` / `develop` / `feature/*`).

📖 **Guía completa del proceso, paso a paso:** **[DEPLOYMENT.md](DEPLOYMENT.md)**

Resumen rápido:

1. Repo conectado a Vercel, con `main` como rama de producción
2. Base de datos PostgreSQL provisionada en Supabase
3. Variables `DATABASE_URL` y `DIRECT_URL` configuradas en Vercel (Production + Preview + Development)
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

### Experience
```typescript
{
  id: string
  title: string
  company: string
  location?: string
  description: string
  startDate: string      // "May 14" o "May 2014"
  endDate?: string
  isCurrent: boolean
  order: number
  published: boolean
}
```

### Profile
```typescript
{
  id: string
  firstName: string
  lastName: string
  title: string
  email: string
  phone?: string
  linkedin?: string
  github?: string
  location?: string
  bio?: string
  profileImage?: string  // URL de foto de perfil
  logoImage?: string     // URL del logo
  techStack?: string     // JSON array de tecnologías
  availability: boolean
}
```

### Project
```typescript
{
  id: string
  title: string
  description: string
  image: string          // URL de imagen
  githubUrl?: string
  tags: string           // JSON array
  order: number
  published: boolean
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

### Tutorial
```typescript
{
  id: string
  title: string
  description: string
  level: string          // Principiante, Intermedio, Avanzado
  duration: string
  category: string
  youtubeUrl?: string
  image?: string         // URL de imagen
  order: number
  published: boolean
}
```



---

## 🐛 Troubleshooting

### "bun: command not found"

```powershell
# PowerShell como Administrador
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

### Los cambios no se reflejan

1. Presiona `Ctrl + S` para guardar archivos
2. Si persiste, recarga el navegador con `F5`
3. Verifica que el servidor esté corriendo

### Puerto 3000 en uso

Cierra la otra aplicación usando el puerto 3000, o cambia el puerto en `package.json`:
```json
"dev": "next dev -p 3001"
```

### Errores de linting

```bash
bun run lint
```
La mayoría son advertencias, no críticas — el proyecto funciona incluso con advertencias.

### Errores de conexión a la base de datos

Revisa que `DATABASE_URL` y `DIRECT_URL` estén bien configuradas en `.env`, y que la contraseña esté correctamente percent-encodeada si tiene caracteres especiales. Ver la sección de troubleshooting detallada en **[DEPLOYMENT.md](DEPLOYMENT.md#-7-troubleshooting-encontrado)** (incluye errores de Turbopack en Windows, datos JSON corruptos, y keys duplicadas en React).

---

## 🎯 Próximos Pasos

### Personalización

1. **Editar perfil:** Modifica `prisma/seed.ts` y ejecuta `bun run db:seed`
2. **Agregar proyectos:** Edita `prisma/seed.ts` en la sección de `projectsData`
3. **Personalizar estilos:** Modifica `src/app/globals.css` y componentes
4. **Cambiar colores:** Edita `tailwind.config.ts`
5. **Agregar dominio propio:** Configúralo desde el dashboard de Vercel

### Mejoras Sugeridas

- [ ] Panel de administrador protegido con autenticación
- [ ] Agregar analytics (Google Analytics, Plausible)
- [ ] Implementar contacto con email real
- [ ] Agregar blog personal
- [ ] Optimizar imágenes con Next.js Image
- [ ] Agregar pruebas unitarias
- [ ] Configurar CI/CD con GitHub Actions

---

## 📚 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org/docs)

---

## 📄 Licencia

Este proyecto es de propiedad de Oliver Farid Rodriguez Morales.

---

**Desarrollado con ❤️ usando Next.js, TypeScript, Prisma y PostgreSQL.**

**¿Necesitas ayuda?** Revisa la sección [Troubleshooting](#-troubleshooting) o el detalle completo en [DEPLOYMENT.md](DEPLOYMENT.md).