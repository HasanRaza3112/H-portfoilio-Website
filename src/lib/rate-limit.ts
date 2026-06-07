import "server-only";

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key) ?? { timestamps: [] };
  const recent = entry.timestamps.filter((timestamp) => now - timestamp < windowMs);

  if (recent.length >= limit) {
    store.set(key, { timestamps: recent });
    return { allowed: false, remaining: 0 };
  }

  recent.push(now);
  store.set(key, { timestamps: recent });

  return {
    allowed: true,
    remaining: Math.max(0, limit - recent.length),
  };
}
