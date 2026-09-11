interface RateLimitEntry {
  count: number;
  resetTime: number;
}

export interface RateLimitResult {
  success: boolean;
  /** Intentos que quedan en la ventana actual */
  remaining: number;
  /** Milisegundos hasta que se reinicia la ventana (0 si aún hay cupo) */
  retryAfterMs: number;
}

// Store en memoria: suficiente para un portafolio (cada instancia serverless lleva el suyo).
const store = new Map<string, RateLimitEntry>();
const MAX_ENTRIES = 1000;

function purgeExpired(now: number) {
  for (const [key, entry] of store) {
    if (now > entry.resetTime) store.delete(key);
  }
}

export function rateLimit(key: string, max = 3, windowMs = 300_000): RateLimitResult {
  const now = Date.now();
  if (store.size > MAX_ENTRIES) purgeExpired(now);

  const entry = store.get(key);
  if (!entry || now > entry.resetTime) {
    store.set(key, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: max - 1, retryAfterMs: 0 };
  }

  if (entry.count >= max) {
    return { success: false, remaining: 0, retryAfterMs: entry.resetTime - now };
  }

  entry.count += 1;
  return { success: true, remaining: max - entry.count, retryAfterMs: 0 };
}
