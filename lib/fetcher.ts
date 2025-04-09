// lib/fetcher.ts

export const fetcher = async <T>(
  url: string,
  options?: RequestInit & { cacheType?: "no-store" | "force-cache" | "default" }
): Promise<T> => {
  const cache = options?.cacheType ?? "no-store";
  const res = await fetch(url, { ...options, cache });

  if (!res.ok) {
    console.error(`Fetch failed: ${url}`);
    throw new Error("Fetch error");
  }

  return res.json();
};
