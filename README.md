# 🚀 Portafolio - Oliver Farid Rodriguez Morales

Portafolio profesional de Ingeniero de Software Full Stack construido con Next.js 16, TypeScript, Prisma y SQLite.

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
9. [Troubleshooting](#-troubleshooting)

---

## ⚡ Inicio Rápido

### Windows (Recomendado)

```bash
# Ejecutar el script de inicialización (hace TODO en un solo comando)

```

Este script realiza automáticamente:
- ✅ Verifica Bun
- ✅ Instala dependencias
- ✅ Genera Prisma Client
- ✅ Crea la base de datos
- ✅ Puebla con todos los datos
- ✅ Verifica el código

Luego ejecuta el servidor:

```bash
bun run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

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
- **SQLite** - Base de datos (desarrollo local)
- **Next.js API Routes** - Backend integrado

### Estado y Datos
- **Zustand** - Estado global
- **TanStack Query** - Caching y sincronización de datos
- **React Hook Form** - Formularios optimizados

### DevOps
- **Docker** - Contenedores (para producción)
- **ESLint** - Linting de código
- **TypeScript** - Validación de tipos

---

## 📂 Estructura del Proyecto

```
Portafolio/
├── db/
│   └── custom.db                         # Base de datos SQLite (gitignored)
├── public/                               # Archivos estáticos
├── prisma/
│   ├── schema.prisma                     # Esquema de la base de datos
│   └── seed.ts                           # Datos iniciales
├── scripts/                              # Scripts útiles
|    ├── backup-sqlite.sh                 # Backup de la base de datos
|    ├── restore-sqlite.sh                # Restaurar backup
|    └── migrate-to-postgres.js           # Migrar a PostgreSQL
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
│   │   │   └── ContactForm.tsx
│   │   │   ├── ExperienceSection.tsx
|   |   |   ├── ExperienceTimeline.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── LoadingSkeleton.tsx
│   │   │   ├── PortfolioSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── TutorialsSection.tsx
│   │   ├── layout/                            # Componentes de layout
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   ├── providers/
│   │   │   ├── providers.tsx
│   │   └── ui/                                # Componentes shadcn/ui
│   │
│   ├── hooks/
│   │   ├── use-mobile.ts                      #Hooks de datos con TanStack Query
│   │   ├── use-portfolio-data.ts              #Hook para notificaciones toast
│   │   └── use-toast.ts                       #Hook para detectar mobile
│   │
│   └── lib/
│       ├── schema.prisma                      # Cliente prismna
│       └── seed.ts                            # Datos iniciales
│
│
│
├── upload/                              # Archivos subidos             
├── 📄.dockerignore
├── 📄.env
├── 📄.env.example
├── 📄.gitignore
├── 📄bun.lock
├── 📄Caddyfile
├── 📄components.json
├── 📄Dockerfile
├── 📄eslint.config.mjs
├── 📄IMAGES_GUIDE.md
├── 📄next.config.ts
├── 📄next-env.d.ts
├── 📄package.json
├── 📄package-lock.json
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

# Crear tablas en la base de datos
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

### Esquema

El portafolio usa los siguientes modelos de Prisma:

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

### Cambiar Imagen de Perfil o Logo

Edita `prisma/seed.ts` y cambia las URLs en la sección del Profile:

```typescript
create: {
  // ...
  profileImage: 'https://tu-imagen-perfil.jpg',
  logoImage: 'https://tu-logo.png',
  // ...
}
```

Luego ejecuta:

```bash
bun run db:seed
```

### Ver Datos con Prisma Studio

```bash
bunx prisma studio
```

Se abrirá en [http://localhost:5555](http://localhost:5555).

---

## 🖼️ Imágenes

### Formatos Soportados

El portafolio soporta múltiples formatos de imagen:

- ✅ **PNG** - Ideal para logos y gráficos con transparencia
- ✅ **JPG/JPEG** - Ideal para fotografías
- ✅ **WebP** - Formato moderno, mejor compresión
- ✅ **SVG** - Gráficos vectoriales escalables
- ✅ **GIF** - Imágenes animadas
- ✅ **Base64** - Imágenes codificadas en texto

### Fuentes de Imágenes

Puedes usar imágenes de diferentes fuentes:

- ✅ **URLs Online** (http://, https://)
- ✅ **Rutas Locales** (/images/, ../, etc.)
- ✅ **Base64** (data:image/...)

### Imágenes Online (URLs)

Las imágenes online son las más sencillas de usar:

```typescript
// En prisma/seed.ts
{
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  logoImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
}
```

### Imágenes Locales

Para usar imágenes locales:

1. Coloca las imágenes en `public/images/`:

```
Portafolio/
├── public/
│   └── images/
│       ├── profile.jpg
│       ├── logo.png
│       ├── project-1.jpg
│       └── tutorial-1.png
```

2. Usa la ruta en `prisma/seed.ts`:

```typescript
{
  profileImage: '/images/profile.jpg',
  logoImage: '/images/logo.png',
}
```

⚠️ **Importante:** Las rutas locales deben empezar con `/`

### Imágenes Base64

Para convertir una imagen a base64 y usarla:

```typescript
{
  profileImage: 'data:image/png;base64,iVBORw0KGgoAAAANS...',
  logoImage: 'data:image/png;base64,iVBORw0KGgoAAAANS...',
}
```

### Cambiar Imágenes

Edita `prisma/seed.ts`:

```typescript
// Profile
{
  profileImage: 'https://tu-nueva-foto.jpg',  // URL o ruta local
  logoImage: '/images/tu-logo.png',
}

// Projects
{
  image: '/images/projects/mi-proyecto.jpg',
}

// Tutorials
{
  image: 'https://example.com/tutorial.jpg',
}
```

Luego ejecuta:

```bash
bun run db:seed
```

### Componentes de Imagen

El proyecto usa componentes optimizados:

- **`ImageWrapper`** - Para imágenes generales (proyectos, tutoriales, perfil)
- **`LogoImage`** - Específicamente para logotipos

Ambos incluyen:
- ✅ Manejo automático de errores
- ✅ Fallback personalizable
- ✅ Loading states
- ✅ Lazy loading opcional

### Más Información

Para una guía completa sobre imágenes, consulta: **[IMAGES_GUIDE.md](IMAGES_GUIDE.md)**

---

## 🚀 Despliegue

### Opción 1: Render.com (Recomendado para SQLite)

**Ventajas:**
- ✅ Soporta discos persistentes (necesario para SQLite)
- ✅ Gratis para uso personal
- ✅ Deploy automático desde GitHub

**Pasos:**

1. **Subir código a GitHub:**
   ```bash
   git add .
   git commit -m "Ready to deploy"
   git push
   ```

2. **Crear cuenta en [Render](https://render.com)**

3. **Crear Web Service:**
   - Conecta tu repositorio de GitHub
   - Runtime: **Docker**
   - Variables de entorno:
     ```
     NODE_ENV=production
     DATABASE_URL=file:./db/custom.db
     PORT=3000
     ```

4. **Configurar Disco Persistente (IMPORTANTE):**
   - En la configuración del Web Service
   - Sección "Disks"
   - Agregar disco:
     - Name: `data`
     - Mount Path: `./db`
     - Size: `1 GB`

5. **Deploy**

⚠️ **Sin el disco persistente, perderás los datos en cada deploy.**

### Opción 2: Migrar a PostgreSQL (Para Producción)

SQLite es excelente para desarrollo, pero para producción recomendado usar PostgreSQL.

**Migración a Supabase (gratis):**

1. Crear proyecto en [Supabase](https://supabase.com)
2. Copiar la URL de conexión
3. Actualizar `.env`:
   ```env
   DATABASE_URL="postgresql://postgres:TU_PASSWORD@db.TU_PROYECTO.supabase.co:5432/postgres"
   ```
4. Cambiar `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
5. Ejecutar:
   ```bash
   bun run db:generate
   bun run db:push
   bun run db:seed
   ```

### Opción 3: VPS / Servidor Propio

Para más control, puedes desplegar en un VPS (DigitalOcean, Linode, etc.):

```bash
# Clonar el proyecto
git clone https://github.com/tu-usuario/portafolio.git
cd portafolio

# Instalar dependencias
bun install

# Configurar variables de entorno
nano .env
# Agrega: DATABASE_URL=file:./db/custom.db

# Build y ejecutar
bun run build
pm2 start "bun run start" --name portafolio
```

---

## 💻 Desarrollo Local

### Configuración en WebStorm (Windows)

1. **Abrir el proyecto:**
   - File → Open
   - Seleccionar carpeta del proyecto

2. **Instalar Bun** (si no está instalado):
   - Abrir PowerShell como Administrador
   - Ejecutar: `irm bun.sh/install.ps1 | iex`

3. **Ejecutar inicialización:**
   - Terminal (`Alt + F12`)
   - Ejecutar: ``

4. **Ejecutar el servidor:**
   - `bun run dev`
   - O crear Run Configuration en WebStorm

5. **Abrir en navegador:**
   - [http://localhost:3000](http://localhost:3000)

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos SQLite (desarrollo local)
DATABASE_URL=file:./db/custom.db

# Entorno
NODE_ENV=development
```

Ver `.env.example` para más opciones.

### Desarrollo Iterativo

Next.js tiene Hot Module Reload, por lo que:
- Los cambios se reflejan automáticamente
- No necesitas recargar el navegador
- Los cambios en la base de datos requieren re-ejecutar `bun run db:push`

---

## 🐛 Troubleshooting

### Problema: "bun: command not found"

**Solución:**
```powershell
# PowerShell como Administrador
irm bun.sh/install.ps1 | iex
```

### Problema: Base de datos vacía

**Solución:**
```bash
# Ejecutar el script de inicialización


# O manualmente:
bun run db:push
bun run db:seed
```

### Problema: Imágenes no se muestran

**Solución:**
1. Verifica que las URLs en `prisma/seed.ts` sean válidas
2. Ejecuta `bun run db:seed` para actualizar
3. Revisa la consola del navegador para errores de carga

### Problema: Los cambios no se reflejan

**Solución:**
1. Presiona `Ctrl + S` para guardar archivos
2. Si persiste, recarga el navegador con `F5`
3. Verifica que el servidor esté corriendo

### Problema: "Database file not found"

**Solución:**
```bash
# Crear carpeta
mkdir db

# Crear base de datos
bun run db:push
```

### Problema: Puerto 3000 en uso

**Solución:**
- Cierra la otra aplicación usando el puerto 3000
- O cambia el puerto en `package.json`:
  ```json
  "dev": "next dev -p 3001"
  ```

### Problema: Errores de linting

**Solución:**
```bash
# Ver errores
bun run lint

# La mayoría son advertencias, no críticas
# El proyecto funciona incluso con advertencias
```

---

## 📊 Modelos de Datos

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

---

## 🎯 Próximos Pasos

### Personalización

1. **Editar perfil:** Modifica `prisma/seed.ts` y ejecuta `bun run db:seed`
2. **Agregar proyectos:** Edita `prisma/seed.ts` en la sección de `projectsData`
3. **Personalizar estilos:** Modifica `src/app/globals.css` y componentes
4. **Cambiar colores:** Edita `tailwind.config.ts`
5. **Agregar dominio:** Configura en tu plataforma de hosting

### Mejoras Sugeridas

- [ ] Migrar a PostgreSQL para producción
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
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org/docs)

---

## 📄 Licencia

Este proyecto es de propiedad de Oliver Farid Rodriguez Morales.

---

**Desarrollado con ❤️ usando Next.js, TypeScript y Prisma.**

---

**¿Necesitas ayuda? Revisa la sección [Troubleshooting](#-troubleshooting) o revisa los logs del servidor.**
