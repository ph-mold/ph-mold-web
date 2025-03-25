"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const MENU_ITEMS = [
  { en: "About Us", ko: "회사소개" },
  { en: "Products", ko: "생산제품" },
  { en: "Production Facilities", ko: "생산설비" },
  { en: "Inquiry", ko: "문의" }
];

export default function Header() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [maxWidths, setMaxWidths] = useState<number[]>([]);

  const setRefs = (el: HTMLSpanElement | null, index: number) => {
    if (el) textRefs.current[index] = el;
  };

  useEffect(() => {
    setMaxWidths(textRefs.current.map((ref) => ref?.offsetWidth ?? 0));
  }, []);

  return (
    <header className="fixed top-0 z-10 h-fit min-h-16 w-full bg-white/30 backdrop-blur-md md:h-16">
      <nav className="flex h-full w-full items-center justify-between px-4 md:justify-center">
        <Image src="/logo.png" alt="" width={40} height={40} className="mr-6" />
        <ul className="hidden space-x-6 md:flex">
          {MENU_ITEMS.map((item, index) => (
            <li
              key={index}
              className="text-foreground cursor-pointer text-center text-base whitespace-nowrap transition-all duration-200"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                minWidth: maxWidths[index] ? `${maxWidths[index]}px` : "auto"
              }}
            >
              <span ref={(el) => setRefs(el, index)}>
                {hoveredIndex === index ? item.ko : item.en}
              </span>
            </li>
          ))}
        </ul>
        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      <nav
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          menuOpen ? "max-h-96 py-4" : "max-h-0 py-0"
        }`}
      >
        <ul className="flex flex-col">
          {MENU_ITEMS.map((item, index) => (
            <li
              key={index}
              className="text-foreground w-full cursor-pointer py-2 text-center text-base"
            >
              {item.ko}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
