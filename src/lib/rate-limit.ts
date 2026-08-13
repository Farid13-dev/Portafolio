interface RateLimitStore {
    count: number;
    resetTime: number;
}

const store = new Map<string, RateLimitStore>();

export function rateLimit(ip: string, max: number = 3, windowMs: number = 300_000) {
    const now = Date.now();
    const record = store.get(ip);

    if (!record || now > record.resetTime) {
        store.set(ip, { count: 1, resetTime: now + windowMs });
        return { success: true };
    }

    if (record.count >= max) {
        return { success: false, message: 'Demasiados intentos. Intenta más tarde.' };
    }

    record.count++;
    return { success: true };
}