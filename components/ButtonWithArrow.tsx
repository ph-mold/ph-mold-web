import { RightArrowIcon } from "@/utils/svgr";
import { ReactNode, useState } from "react";

interface ButtonWithArrowProps {
  children: ReactNode;
}

export default function ButtonWithArrow({ children }: ButtonWithArrowProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="px-8 py-3 bg-signature text-white font-medium rounded-full flex items-center justify-center relative overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="transition-all duration-300">{children}</span>

      <RightArrowIcon
        className={`absolute size-4 left-full top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out ${
          hovered ? "opacity-100 -translate-x-6" : "opacity-0"
        }`}
      />
    </button>
  );
}
