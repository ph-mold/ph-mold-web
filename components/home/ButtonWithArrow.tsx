import { RightArrowIcon } from "@/utils/svgr";
import { ReactNode, useState } from "react";

interface ButtonWithArrowProps {
  children: ReactNode;
}

export default function ButtonWithArrow({ children }: ButtonWithArrowProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="px-5 py-2 bg-signature text-reverseForground rounded-xl flex relative overflow-hidden cursor-pointer shadow-md"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <RightArrowIcon
        className={`absolute size-3 left-full top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out ${
          hovered ? "opacity-100 -translate-x-4" : "opacity-0"
        }`}
      />
    </button>
  );
}
