const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export const fetcher = async <T>(
  url: string,
  options?: RequestInit & { cacheType?: "no-store" | "force-cache" | "default" }
): Promise<T | undefined> => {
  const cache = options?.cacheType ?? "no-store";
  const res = await fetch(`${API_BASE}${url}`, { ...options, cache });

  if (!res.ok) {
    return;
  }

  return res.json();
};
