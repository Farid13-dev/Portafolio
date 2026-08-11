#!/bin/bash

# Script para hacer backup de la base de datos SQLite
# Uso: ./scripts/backup-sqlite.sh

# Configuración
DB_PATH="./db/custom.db"
BACKUP_DIR="./backups/sqlite"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/portafolio_backup_${TIMESTAMP}.db"

# Crear directorio de backups si no existe
mkdir -p "$BACKUP_DIR"

echo "🔄 Creando backup de la base de datos..."

# Verificar que la base de datos existe
if [ ! -f "$DB_PATH" ]; then
    echo "❌ Error: No se encuentra el archivo de base de datos en $DB_PATH"
    exit 1
fi

# Crear backup
cp "$DB_PATH" "$BACKUP_FILE"

# Comprimir el backup
gzip "$BACKUP_FILE"
BACKUP_FILE="${BACKUP_FILE}.gz"

# Verificar que el backup se creó correctamente
if [ -f "$BACKUP_FILE" ]; then
    SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo "✅ Backup creado exitosamente: $BACKUP_FILE"
    echo "📦 Tamaño: $SIZE"
else
    echo "❌ Error al crear el backup"
    exit 1
fi

# Mantener solo los últimos 7 backups
echo "🧹 Limpiando backups antiguos..."
cd "$BACKUP_DIR"
ls -t portafolio_backup_*.db.gz | tail -n +8 | xargs -r rm

# Mostrar backups disponibles
echo ""
echo "📁 Backups disponibles:"
ls -lh portafolio_backup_*.db.gz 2>/dev/null | tail -n 5

echo ""
echo "✨ Backup completado!"
