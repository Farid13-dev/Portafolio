# 🚀 Guía de Despliegue - Migración SQLite → PostgreSQL (Supabase) + Vercel

Documento de referencia con el proceso completo seguido para migrar el portafolio de SQLite local a PostgreSQL en Supabase, desplegado en Vercel con flujo Gitflow.

---

## 📋 Índice

1. [Configuración de Git y GitHub](#-1-configuración-de-git-y-github)
2. [Configuración de Supabase](#-2-configuración-de-supabase)
3. [Cambios en el proyecto](#-3-cambios-en-el-proyecto)
4. [Configuración de Vercel](#-4-configuración-de-vercel)
5. [Flujo de merge hasta producción](#-5-flujo-de-merge-hasta-producción)
6. [Flujo Gitflow para futuros cambios](#-6-flujo-gitflow-para-futuros-cambios)
7. [Formulario de contacto (Resend)](#-7-formulario-de-contacto-resend)
8. [Limpieza de archivos sin uso](#-8-limpieza-de-archivos-sin-uso)
9. [Troubleshooting encontrado](#-9-troubleshooting-encontrado)

---

## 🌿 1. Configuración de Git y GitHub

### Inicializar repo y subir `main`

```powershell
git init
git add .
git commit -m "chore: initial commit"
git branch -M main
git remote add origin https://github.com/Farid13-dev/Portafolio.git
git push -u origin main
```

### Crear rama `develop`

```powershell
git checkout -b develop
git push -u origin develop
```

### Crear feature branch para cada cambio

```powershell
git checkout develop
git pull origin develop
git checkout -b feature/nombre-del-cambio
```

> **Convención Gitflow:**
> - `main` → producción, permanente
> - `develop` → integración, permanente
> - `feature/*`, `chore/*`, `release/*`, `hotfix/*` → temporales, se borran tras el merge

---

## 🗄️ 2. Configuración de Supabase

1. Crear cuenta en [supabase.com](https://supabase.com) con login de GitHub
2. **New Project** → nombre del proyecto, contraseña de BD (generada por Supabase), región más cercana → Plan **Free**
3. Esperar aprovisionamiento (1-2 min)
4. Ir a **Project Settings → Database → Connection string**
5. Seleccionar la pestaña **ORM → Prisma** (da el formato exacto listo para copiar)
6. Copiar las dos connection strings:
   - `DATABASE_URL` → **Transaction pooler**, puerto **6543**, con `?pgbouncer=true` (para runtime/serverless)
   - `DIRECT_URL` → **Direct/Session connection**, puerto **5432** (para migraciones y `db:push`)
7. Reemplazar `[YOUR-PASSWORD]` por la contraseña real de la base de datos

> ⚠️ **Importante:** si la contraseña tiene caracteres especiales (`@`, `#`, `%`, etc.), hay que percent-encodearlos o la conexión falla. Ejemplo: `@` → `%40`.
>
> ⚠️ Los corchetes `[ ]` en `[YOUR-PASSWORD]` son solo un placeholder de la documentación — no se incluyen literalmente en la URL final.

---

## ⚙️ 3. Cambios en el proyecto

### `.env` (nunca se sube a git, ya está en `.gitignore`)

```env
DATABASE_URL="postgresql://postgres.[project-ref]:[PASSWORD_ENCODED]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[project-ref]:[PASSWORD_ENCODED]@aws-0-[region].pooler.supabase.com:5432/postgres"
RESEND_API_KEY="re_tu_api_key"
CONTACT_EMAIL="tu-email@ejemplo.com"
NODE_ENV=development
```

### `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")       // pooling, puerto 6543 — para runtime
  directUrl = env("DIRECT_URL")         // directa, puerto 5432 — para db:push
}
```

> Se eliminaron los modelos `User` y `Post` de ejemplo (generados por defecto por `npx prisma init`), ya que no eran usados por el proyecto.

### Cliente de Prisma (patrón singleton)

Para evitar abrir una conexión nueva en cada request (causa común de latencia en serverless), el cliente se instancia una única vez en `src/lib/db.ts` y se reutiliza en todas las rutas API:

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

Todas las rutas importan desde ahí: `import { prisma } from '@/lib/db'` — nunca `new PrismaClient()` directo dentro de un handler.

### Aplicar el schema y sembrar datos

```powershell
bun run db:generate
bun run db:push
bun run db:seed
```

### Verificar en local

```powershell
bun run dev
```

Confirmar que todas las rutas API responden `200`: `/api/profile`, `/api/services`, `/api/projects`, `/api/tutorials`, `/api/skills`, `/api/experiences`, `/api/education`, `/api/section-headers`.

---

## ▲ 4. Configuración de Vercel

1. **Add New → Project** → seleccionar el repo `Portafolio` desde GitHub
2. Dejar el **Root Directory** en default (raíz del repo)
3. Primer deploy (va a fallar en las rutas `/api/*` porque aún no hay BD conectada — es esperado)
4. **Settings → Git** → confirmar que **Production Branch** = `main`
5. **Settings → Environment Variables** → agregar:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`

   Marcar las tres casillas de entorno: **Production**, **Preview** y **Development**

> ⚠️ Las variables de entorno **no se aplican retroactivamente**. Si las agregas después de un deploy, necesitas forzar un **Redeploy** para que tomen efecto:
> ```
> Vercel → Deployments → "..." en el último deploy → Redeploy
> ```

### Entornos de Vercel

| Environment | Rama | Dominio |
|---|---|---|
| **Production** | `main` | dominio real (ej. `portafolio-nu-pied.vercel.app`) |
| **Preview** | cualquier otra rama (`develop`, `feature/*`) | URL única por deploy |
| **Development** | uso vía Vercel CLI local | — |

---

## 🔀 5. Flujo de merge hasta producción

```powershell
git add .
git commit -m "feat: descripción del cambio"
git push -u origin feature/nombre-del-cambio
```

1. Vercel genera automáticamente un **Preview Deployment** para la rama
2. Verificar en la URL de preview que todo cargue sin errores 500 (revisar consola del navegador y Runtime Logs de Vercel)
3. **Pull Request** en GitHub: `feature/nombre-del-cambio → develop` → revisar diff → **Merge**
4. **Pull Request**: `develop → main` → revisar diff → **Merge**
5. Vercel despliega automáticamente a producción al detectar el push a `main`
6. Verificar el sitio en producción

### Sincronizar `develop` (si el merge se hizo directo a `main`)

```powershell
git checkout develop
git merge main
git push origin develop
```

### Limpieza: borrar la feature branch ya usada

```powershell
git branch -d feature/nombre-del-cambio
git push origin --delete feature/nombre-del-cambio
```

---

## 🔁 6. Flujo Gitflow para futuros cambios

```powershell
# 1. Partir siempre desde develop actualizado
git checkout develop
git pull origin develop

# 2. Crear la feature branch
git checkout -b feature/nombre-de-la-funcionalidad

# 3. Trabajar con commits pequeños y descriptivos
git add .
git commit -m "feat: descripción del cambio"

# 4. Subir y revisar en Preview Deployment de Vercel
git push -u origin feature/nombre-de-la-funcionalidad

# 5. Pull Request feature → develop, revisar y mergear

# 6. Cuando develop esté estable: Pull Request develop → main
#    (esto dispara el deploy de producción en Vercel)

# 7. Limpieza
git branch -d feature/nombre-de-la-funcionalidad
git push origin --delete feature/nombre-de-la-funcionalidad
```

---

## 📧 7. Formulario de contacto (Resend)

1. Crear cuenta en [resend.com](https://resend.com)
2. Dashboard → **API Keys** → **Create API Key**
3. Agregar `RESEND_API_KEY` y `CONTACT_EMAIL` en `.env` local y en Vercel (Production + Preview + Development)
4. Instalar el SDK:
   ```powershell
   bun add resend
   ```
5. La lógica de envío vive en `src/app/api/contact/route.ts`, y el formulario (`ContactForm.tsx`) hace `fetch('/api/contact')` con estado de carga/éxito/error

> Sin verificar un dominio propio en Resend, el remitente usa `onboarding@resend.dev` y solo se puede enviar hacia la dirección con la que te registraste en la cuenta.

---

## 🧹 8. Limpieza de archivos sin uso

Tras completar la migración y confirmar que el despliegue es exclusivamente en Vercel (sin VPS propio), se eliminaron:

```powershell
# Scripts de SQLite (ya migrado a Postgres)
Remove-Item scripts\backup-sqlite.sh
Remove-Item scripts\restore-sqlite.sh
Remove-Item scripts\migrate-to-postgres.js
Remove-Item scripts -Recurse -Force -ErrorAction SilentlyContinue

# Lockfile duplicado (el proyecto usa bun.lock)
Remove-Item package-lock.json

# Carpeta de uploads sin funcionalidad real (solo tenía un .gitkeep)
Remove-Item upload -Recurse -Force

# Docker y Caddy (solo aplican a self-hosting con VPS, no usado)
Remove-Item Dockerfile
Remove-Item .dockerignore
Remove-Item Caddyfile
```

Subido siguiendo Gitflow:
```powershell
git checkout develop
git pull origin develop
git checkout -b chore/cleanup-unused-files
git add -A
git commit -m "chore: eliminar archivos sin uso (sqlite scripts, docker, caddy, upload, lockfile duplicado)"
git push -u origin chore/cleanup-unused-files
```

---

## 🐛 9. Troubleshooting encontrado

### Error: Turbopack "failed to create junction point" (Windows)

Causado por un junction point corrupto/duplicado del cliente de Prisma. Solución:

```powershell
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules\.prisma
npx prisma generate
```

Si persiste, reinstalación limpia:
```powershell
Remove-Item -Recurse -Force node_modules
bun install
npx prisma generate
```

### Error: `EPERM: operation not permitted, rename ... query_engine-windows.dll.node`

Causado por tener `bun run dev` o Prisma Studio corriendo en otra terminal mientras se ejecuta `db:generate`/`db:push` — el motor de Prisma queda bloqueado en memoria. Solución: cerrar todos los procesos de Next.js/Prisma Studio antes de correr esos comandos, y si persiste:

```powershell
Remove-Item -Recurse -Force node_modules\.prisma -ErrorAction SilentlyContinue
bun run db:generate
```

### Error: `JSON.parse` en `techStack` ("Unexpected token '''")

Causado por datos guardados en formato de lista Python (`['a','b']`) en vez de JSON válido (`["a","b"]`). Solucionado reseteando la base de datos con un seed que genera JSON válido con `JSON.stringify()`.

### Warning: "Encountered two children with the same key" en React

Causado por usar el propio valor (`skill`) como `key` en un `.map()`, con un valor duplicado en los datos. Solución: usar `key` compuesta con índice.

```tsx
{skillGroup.items.map((skill, index) => (
  <Badge key={`${groupIndex}-${index}-${skill}`} variant="secondary">
    {skill}
  </Badge>
))}
```

### Error: "Added the required column ... without a default value" al hacer `db:push`

Ocurre al agregar un campo nuevo **requerido** (sin `?` ni `@default(...)`) a un modelo que ya tiene filas existentes — Postgres no sabe qué valor poner en las filas viejas. **Nunca usar `--force-reset`** (borra todos los datos). Solución: declarar el campo como opcional (`String?`) o con un valor por defecto (`@default("")`).

### Variables de entorno no toman efecto en Vercel tras agregar un modelo nuevo al schema

Si Vercel reutiliza el `node_modules` cacheado de un build anterior, el cliente de Prisma generado ahí puede no incluir los modelos nuevos, aunque el build no falle. Síntoma: las rutas que usan el modelo nuevo devuelven vacío o error, incluso con las variables de entorno bien configuradas. Solución inmediata: **Redeploy sin caché** desde Vercel. Solución permanente: agregar un script `postinstall` en `package.json` para que `prisma generate` corra en cada instalación:

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### Variables de entorno no toman efecto en Vercel (general)

Si se agregan variables de entorno después de un deploy ya realizado, hay que forzar un **Redeploy** manual — Vercel no las aplica retroactivamente al deployment existente.

---

**Última actualización:** Migración a PostgreSQL completada, formulario de contacto con Resend y enlaces de WhatsApp integrados, sección de Formación Académica y encabezados dinámicos agregados, limpieza de archivos sin uso realizada. Todo verificado en producción.