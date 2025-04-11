import type { ImageLoader } from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_FILE_SERVER_BASE_URL;

export const imageLoader: ImageLoader = ({ src, width, quality }) => {
  if (!src.startsWith("/contents/")) {
    return `${src}?w=${width}&q=${quality ?? 75}`;
  }

  return `${baseUrl}${src}?w=${width}&q=${quality ?? 75}`;
};
