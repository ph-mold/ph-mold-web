import { RightArrowIcon } from "@/utils/svgr";
import { ReactNode, useState } from "react";
import clsx from "clsx";

interface ButtonWithArrowProps {
  children: ReactNode;
  className?: string;
}

export default function ButtonWithArrow({
  children,
  className = ""
}: ButtonWithArrowProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className={clsx(
        "bg-signature/80 text-reverseForground relative flex w-fit cursor-pointer overflow-hidden rounded-lg px-4 py-2",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <RightArrowIcon
        className={clsx(
          "absolute top-1/2 left-full size-3 -translate-y-1/2 transform transition-all duration-300 ease-in-out",
          hovered ? "-translate-x-4 opacity-100" : "opacity-0"
        )}
      />
    </button>
  );
}
