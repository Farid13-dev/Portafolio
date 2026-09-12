/**
 * Identidad de respaldo: lo que se pinta cuando la base de datos aún está vacía
 * o no responde.
 *
 * Es ficticia a propósito. Los datos reales del sitio viven en la tabla
 * `Profile` (los lee `src/lib/data.ts` en runtime), nunca en el repositorio.
 * Para personalizar el sitio se edita esa fila, no este archivo.
 */
export const FALLBACK_PROFILE = {
  firstName: "Alex",
  lastName: "Rivera",
  /** Titular bajo el nombre, en el hero. */
  title: "Ingeniero de Software | Full Stack Developer",
  /** Cargo corto, en la tarjeta de "Sobre mí". */
  titleProfile: "Ingeniero de Sistemas",
  /** Descripción de una línea, en el pie. */
  summary: "Ingeniero de Software enfocado en desarrollo backend y sistemas con IA.",
  location: "Ciudad Ejemplo, Colombia",
} as const;

export const FALLBACK_FULL_NAME = `${FALLBACK_PROFILE.firstName} ${FALLBACK_PROFILE.lastName}`;
