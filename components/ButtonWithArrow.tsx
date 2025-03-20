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

      {/* 화살표 아이콘 - 기본적으로 숨김, 마우스 오버 시 나타남 */}
      <svg
        className={`absolute size-4 left-full top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out ${
          hovered ? "opacity-100 -translate-x-6" : "opacity-0"
        }`}
        fill="#ffffff"
        viewBox="0 0 330 330"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
          c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
          C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
          C255,161.018,253.42,157.202,250.606,154.389z"
        />
      </svg>
    </button>
  );
}
