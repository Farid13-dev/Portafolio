# Guía de despliegue

Cómo poner este portafolio en producción: base de datos, variables de entorno, Vercel y CI. Para levantarlo en local, el [README](README.md#puesta-en-marcha) basta.

**Índice:** [Base de datos](#1-base-de-datos-postgresql) · [Variables de entorno](#2-variables-de-entorno) · [Vercel](#3-vercel) · [CI](#4-ci-github-actions) · [Flujo de trabajo](#5-flujo-de-trabajo) · [Problemas conocidos](#problemas-conocidos)

---

## 1. Base de datos (PostgreSQL)

Cualquier PostgreSQL sirve. Estas instrucciones usan Supabase porque su plan gratuito cubre de sobra un portafolio.

1. **New Project** en [supabase.com](https://supabase.com) → contraseña de base de datos y región más cercana.
2. **Project Settings → Database → Connection string**, pestaña **ORM → Prisma**.
3. Copiar las **dos** cadenas de conexión.

El proyecto necesita las dos porque cumplen funciones distintas (`prisma/schema.prisma`):

| Variable | Puerto | Para qué |
|---|---|---|
| `DATABASE_URL` | 6543 | Runtime. Transaction pooler con `?pgbouncer=true`: en serverless cada invocación abriría una conexión nueva y agotaría el límite de Postgres |
| `DIRECT_URL` | 5432 | Conexión directa. La usa `prisma db push`, que necesita sesiones largas y sentencias DDL que el pooler no admite |

> **Dos detalles que rompen la conexión en silencio:** los corchetes de `[YOUR-PASSWORD]` son un marcador de la documentación, no van en la URL final; y si la contraseña tiene caracteres especiales hay que codificarlos en porcentaje (`@` → `%40`, `#` → `%23`).

Luego, contra una base **vacía**:

```bash
bun run db:push    # crea las tablas
bun run db:seed    # datos de ejemplo — destructivo, ver el aviso del README
```

## 2. Variables de entorno

La plantilla completa está en [`.env.example`](.env.example). Esta tabla resume qué lee el código y qué pasa si falta:

| Variable | ¿Obligatoria? | Si falta |
|---|---|---|
| `DATABASE_URL` | **Sí** | La aplicación no arranca y el build falla |
| `DIRECT_URL` | **Sí** | `db:push` falla |
| `RESEND_API_KEY` | Para el formulario | El envío devuelve error de configuración |
| `CONTACT_EMAIL` | Para el formulario | El envío devuelve error de configuración |
| `CONTACT_FROM` | No | Se usa `onboarding@resend.dev`, que solo entrega al dueño de la cuenta de Resend. En producción, un dominio verificado |
| `NEXT_PUBLIC_SITE_URL` | No | Se usa `VERCEL_PROJECT_PRODUCTION_URL` y, en local, `http://localhost:3000`. Afecta a canónicas, sitemap y Open Graph |
| `NEXT_PUBLIC_SITE_NAME` | No | Se usa el nombre ficticio de `src/lib/profile-fallback.ts` |
| `NEXT_PUBLIC_SITE_AUTHOR` | No | Se usa `NEXT_PUBLIC_SITE_NAME` |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | No | Se usa la descripción ficticia de reserva |

> Las variables `NEXT_PUBLIC_*` se incrustan **al compilar**, no se leen en runtime. Definirlas o cambiarlas no surte efecto hasta el siguiente despliegue.

## 3. Vercel

1. **Add New → Project** → importar el repositorio. Root Directory en la raíz.
2. **Settings → Git** → Production Branch = `main`.
3. **Settings → Environment Variables** → añadir las de la tabla anterior, marcando **Production** y **Preview** (y **Development** si usas la CLI).

En el panel de Vercel los valores se pegan **sin comillas**: a diferencia de un `.env`, aquí las comillas acaban dentro del valor.

| Entorno | Rama | URL |
|---|---|---|
| Production | `main` | Dominio propio o `<proyecto>.vercel.app` |
| Preview | cualquier otra rama | URL única por despliegue |

> Vercel no aplica las variables retroactivamente: si las añades después de un despliegue, hay que redesplegar (**Deployments → ⋯ → Redeploy**).

## 4. CI (GitHub Actions)

`.github/workflows/ci.yml` ejecuta **lint → typecheck → build** en cada push y cada PR hacia `develop` o `main`.

El build necesita acceso a la base de datos, porque las páginas se prerenderizan leyendo el contenido. Para que el paso se ejecute hay que definir en **Settings → Secrets and variables → Actions** los secrets `DATABASE_URL` y `DIRECT_URL`. Si faltan, el workflow no falla: omite el build con un aviso, porque Vercel lo ejecuta igualmente en cada despliegue.

`package.json` incluye `postinstall: prisma generate`, así que el cliente de Prisma se regenera en cada instalación y nunca queda desfasado respecto al esquema.

## 5. Flujo de trabajo

Gitflow, un PR por cambio:

```bash
git checkout develop && git pull                 # partir de develop al día
git checkout -b feature/nombre-del-cambio
# ... commits pequeños, mensajes en español (feat:, fix:, chore:, docs:)
bun run lint && bun run typecheck && bun run build   # lo mismo que el CI
git push -u origin feature/nombre-del-cambio
```

1. Vercel publica una **preview** de la rama. Comprobar ahí antes de pedir revisión.
2. PR `feature/*` → `develop`. El CI tiene que estar en verde.
3. Cuando `develop` esté estable, PR `develop` → `main`: ese merge despliega a producción.
4. Borrar la rama ya mergeada (`git branch -d` y `git push origin --delete`).

---

## Problemas conocidos

### `EPERM: operation not permitted, rename ... query_engine-windows.dll.node`

En Windows, con `bun run dev` o Prisma Studio abiertos en otra terminal: el motor de Prisma queda bloqueado en memoria y `db:generate` / `db:push` no pueden reemplazarlo. Cierra esos procesos antes. Si persiste:

```powershell
Remove-Item -Recurse -Force node_modules\.prisma -ErrorAction SilentlyContinue
bun run db:generate
```

Corolario: si cambias dependencias sin tocar el esquema, `bun install --ignore-scripts` evita el `postinstall` y el bloqueo.

### Turbopack: «failed to create junction point» (Windows)

Junction point corrupto del cliente de Prisma:

```powershell
Remove-Item -Recurse -Force .next, node_modules\.prisma
bun run db:generate
```

### `Added the required column ... without a default value` al hacer `db:push`

Aparece al añadir un campo **requerido** a un modelo con filas existentes: Postgres no sabe qué poner en las antiguas. Decláralo opcional (`String?`) o con `@default(...)`. **No uses `--force-reset`**: borra todos los datos.

### `tsc` o `next build` fallan tras borrar una ruta

Los tipos generados en `.next/types` quedan obsoletos y siguen referenciando el archivo eliminado. Borra `.next` y vuelve a compilar.

### Las capturas del README no coinciden con lo que veo

Son las del seed de ejemplo, con datos ficticios. Tu despliegue muestra lo que haya en **tu** base de datos.
