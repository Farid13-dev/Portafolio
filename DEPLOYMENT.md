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
7. [Troubleshooting encontrado](#-7-troubleshooting-encontrado)

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

### Crear feature branch para la migración

```powershell
git checkout -b feature/migrate-postgres develop
```

> **Convención Gitflow:**
> - `main` → producción, permanente
> - `develop` → integración, permanente
> - `feature/*`, `release/*`, `hotfix/*` → temporales, se borran tras el merge

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

Confirmar que `/api/profile`, `/api/services`, `/api/projects`, `/api/tutorials`, `/api/skills` y `/api/experiences` responden `200`.

---

## ▲ 4. Configuración de Vercel

1. **Add New → Project** → seleccionar el repo `Portafolio` desde GitHub
2. Dejar el **Root Directory** en default (raíz del repo)
3. Primer deploy (va a fallar en las rutas `/api/*` porque aún no hay BD conectada — es esperado)
4. **Settings → Git** → confirmar que **Production Branch** = `main`
5. **Settings → Environment Variables** → agregar:
   - `DATABASE_URL`
   - `DIRECT_URL`

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
# Subir la feature con los cambios de Postgres
git add .
git commit -m "feat: migrar datasource de sqlite a postgresql (supabase)"
git push -u origin feature/migrate-postgres
```

1. Vercel genera automáticamente un **Preview Deployment** para la rama
2. Verificar en la URL de preview que todo cargue sin errores 500
3. **Pull Request** en GitHub: `feature/migrate-postgres → develop` → revisar diff → **Merge**
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
git branch -d feature/migrate-postgres
git push origin --delete feature/migrate-postgres
```

---

## 🔁 6. Flujo Gitflow para futuros cambios

Para cualquier nueva funcionalidad (ej. panel de administrador, nueva sección, etc.):

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

## 🐛 7. Troubleshooting encontrado

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

### Error: `JSON.parse` en `techStack` ("Unexpected token '''")

Causado por datos guardados en formato de lista Python (`['a','b']`) en vez de JSON válido (`["a","b"]`). Solucionado reseteando la base de datos con un seed que genera JSON válido con `JSON.stringify()`.

### Warning: "Encountered two children with the same key" en React

Causado por usar el propio valor (`skill`) como `key` en un `.map()`, con un valor duplicado (`"GraphQL"`) en los datos. Solución: usar `key` compuesta con índice.

```tsx
{skillGroup.items.map((skill, index) => (
  <Badge key={`${groupIndex}-${index}-${skill}`} variant="secondary">
    {skill}
  </Badge>
))}
```

### Variables de entorno no toman efecto en Vercel

Si se agregan variables de entorno después de un deploy ya realizado, hay que forzar un **Redeploy** manual — Vercel no las aplica retroactivamente al deployment existente.

---

**Última actualización:** Migración completada y verificada en producción.
