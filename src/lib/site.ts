// URL pública del sitio, en orden de prioridad:
// 1. NEXT_PUBLIC_SITE_URL (defínela en Vercel con tu dominio real)
// 2. VERCEL_PROJECT_PRODUCTION_URL (la expone Vercel automáticamente)
// 3. localhost en desarrollo
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_NAME = "OliverFarid.ing";
export const SITE_DESCRIPTION =
  "Ingeniero de Software enfocado en desarrollo backend y sistemas con IA. Portafolio de Oliver Farid Rodríguez Morales.";
