import { notFound } from "next/navigation";

export const fetcher = async <T>(
  url: string,
  options?: RequestInit & { cacheType?: "no-store" | "force-cache" | "default" }
): Promise<T | undefined> => {
  const cache = options?.cacheType ?? "no-store";
  const res = await fetch(url, { ...options, cache });

  if (!res.ok) {
    notFound();
  }

  return res.json();
};
