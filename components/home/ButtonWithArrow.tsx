import { RightArrowIcon } from "@/utils/svgr";
import { ReactNode, useState } from "react";
import clsx from "clsx";

interface ButtonWithArrowProps {
  children: ReactNode;
  className?: string;
}

export default function ButtonWithArrow({
  children,
  className = "",
}: ButtonWithArrowProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className={clsx(
        "px-4 py-2 bg-signature/80 text-reverseForground rounded-lg flex relative overflow-hidden cursor-pointer w-fit",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <RightArrowIcon
        className={clsx(
          "absolute size-3 left-full top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out",
          hovered ? "opacity-100 -translate-x-4" : "opacity-0"
        )}
      />
    </button>
  );
}
