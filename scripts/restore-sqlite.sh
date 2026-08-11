#!/bin/bash

# Script para restaurar la base de datos desde un backup
# Uso: ./scripts/restore-sqlite.sh [archivo_backup]

DB_PATH="./db/custom.db"
BACKUP_DIR="./backups/sqlite"

# Verificar que se proporcionó un archivo de backup
if [ -z "$1" ]; then
    echo "❌ Error: Debes especificar un archivo de backup"
    echo ""
    echo "Uso: $0 <archivo_backup>"
    echo ""
    echo "Backups disponibles:"
    ls -lh "$BACKUP_DIR"/portafolio_backup_*.db.gz 2>/dev/null | awk '{print $9, $5}'
    exit 1
fi

BACKUP_FILE="$1"

# Si el archivo no tiene ruta completa, buscarlo en el directorio de backups
if [[ ! "$BACKUP_FILE" =~ / ]]; then
    BACKUP_FILE="$BACKUP_DIR/$BACKUP_FILE"
fi

# Verificar que el archivo de backup existe
if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Error: No se encuentra el archivo de backup: $BACKUP_FILE"
    exit 1
fi

# Crear backup de la base de datos actual antes de restaurar
if [ -f "$DB_PATH" ]; then
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    BACKUP_BEFORE="$BACKUP_DIR/portafolio_before_restore_${TIMESTAMP}.db"
    echo "🔄 Creando backup de seguridad de la base de datos actual..."
    cp "$DB_PATH" "$BACKUP_BEFORE"
    gzip "$BACKUP_BEFORE"
    echo "✅ Backup guardado en: ${BACKUP_BEFORE}.gz"
fi

# Descomprimir y restaurar
echo "🔄 Restaurando desde $BACKUP_FILE..."

if [[ "$BACKUP_FILE" =~ \.gz$ ]]; then
    gunzip -c "$BACKUP_FILE" > "$DB_PATH"
else
    cp "$BACKUP_FILE" "$DB_PATH"
fi

if [ $? -eq 0 ]; then
    echo "✅ Base de datos restaurada exitosamente!"
    echo "📁 Archivo restaurado: $DB_PATH"
else
    echo "❌ Error al restaurar la base de datos"
    exit 1
fi
