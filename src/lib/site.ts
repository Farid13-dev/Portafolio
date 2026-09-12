import { FALLBACK_FULL_NAME, FALLBACK_PROFILE } from "@/lib/profile-fallback";

// URL pública del sitio, en orden de prioridad:
// 1. NEXT_PUBLIC_SITE_URL (defínela en Vercel con tu dominio real)
// 2. VERCEL_PROJECT_PRODUCTION_URL (la expone Vercel automáticamente)
// 3. localhost en desarrollo
const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// Sin barra final: el sitemap y las URLs canónicas concatenan "/ruta".
export const SITE_URL = rawSiteUrl.trim().replace(/\/+$/, "");

// Identidad pública del sitio. Los valores por defecto son ficticios porque este
// repositorio se publica como proyecto de muestra: define NEXT_PUBLIC_SITE_NAME,
// NEXT_PUBLIC_SITE_AUTHOR y NEXT_PUBLIC_SITE_DESCRIPTION en el entorno (Vercel →
// Settings → Environment Variables) en lugar de escribir aquí tus datos.
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? FALLBACK_FULL_NAME;
export const SITE_AUTHOR = process.env.NEXT_PUBLIC_SITE_AUTHOR ?? SITE_NAME;
export const SITE_DESCRIPTION =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ?? FALLBACK_PROFILE.summary;
