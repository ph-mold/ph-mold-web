"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const MENU_ITEMS = [
  { en: "About Us", ko: "회사소개", link: "/" },
  { en: "Products", ko: "생산제품", link: "/products" },
  { en: "Production Facilities", ko: "생산설비", link: "/" },
  { en: "Inquiry", ko: "문의", link: "/" }
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
    <header className="m-h-16 border-background2 fixed top-0 z-10 w-full border-b-2 bg-white/60 backdrop-blur-md">
      <nav className="flex h-full w-full items-center justify-between px-4 py-3 md:justify-center">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            className="mr-6"
          />
        </Link>
        {/* Desktop 메뉴 */}
        <ul className="hidden space-x-6 md:flex">
          {MENU_ITEMS.map((item, index) => (
            <li
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                minWidth: maxWidths[index] ? `${maxWidths[index]}px` : "auto"
              }}
            >
              <Link
                href={item.link}
                className="text-foreground block text-center text-base whitespace-nowrap transition-all duration-200"
              >
                <span ref={(el) => setRefs(el, index)}>
                  {hoveredIndex === index ? item.ko : item.en}
                </span>
              </Link>
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

      {/* Mobile 메뉴 */}
      <nav
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          menuOpen ? "max-h-96 py-4" : "max-h-0 py-0"
        }`}
      >
        <ul className="flex flex-col">
          {MENU_ITEMS.map((item, index) => (
            <li
              key={index}
              className="text-foreground w-full text-center text-base"
            >
              <Link
                href={item.link}
                onClick={() => setMenuOpen(false)}
                className="block py-2"
              >
                {item.ko}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
