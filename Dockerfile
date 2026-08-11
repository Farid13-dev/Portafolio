# Dockerfile para desplegar el portafolio con SQLite
# Este Dockerfile es compatible con Render, Railway y cualquier servidor con Docker

FROM oven/bun:1-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias primero para caché
COPY package.json bun.lockb* ./

# Instalar dependencias
RUN bun install --frozen-lockfile --production=false

# Copiar el resto del código
COPY . .

# Crear directorio para la base de datos
RUN mkdir -p db

# Generar Prisma Client
RUN bun run db:generate

# Build de la aplicación
RUN bun run build

# Crear un archivo .db vacío si no existe
RUN touch db/custom.db

# Exponer puerto 3000
EXPOSE 3000

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV DATABASE_URL=file:../db/custom.db
ENV PORT=3000

# Iniciar la aplicación
CMD ["bun", "run", "start"]
