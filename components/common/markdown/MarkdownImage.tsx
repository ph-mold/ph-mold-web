import Image from "next/image";
import { imageLoader } from "@/lib/imageLoader";
import clsx from "clsx";

interface MarkdownImageProps {
  src?: string;
  alt?: string;
  title?: string;
}

function parseOptions(title?: string): Record<string, string> {
  if (!title) return {};
  return Object.fromEntries(
    title
      .split(" ")
      .map((pair) => pair.split("="))
      .filter(([k, v]) => k && v)
  );
}

export default function MarkdownImage({
  src = "",
  alt = "",
  title
}: MarkdownImageProps) {
  const options = parseOptions(title);

  const maxWidth = options.maxWidth ? `${options.maxWidth}` : undefined;
  const align = options.align;

  return (
    <div
      className={clsx(
        "relative my-6 aspect-square w-full",
        align === "center" && "mx-auto",
        align === "left" && "mr-auto",
        align === "right" && "ml-auto"
      )}
      style={{ maxWidth }}
    >
      <Image loader={imageLoader} src={src} alt={alt} fill />
    </div>
  );
}
