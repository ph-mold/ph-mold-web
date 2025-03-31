"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const MENU_ITEMS = [
  { ko: "회사소개", link: "/about" },
  { ko: "생산제품", link: "/products" },
  { ko: "생산설비", link: "/facilities" },
  { ko: "문의", link: "/contact" }
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-background2 fixed top-0 z-10 min-h-16 w-full border-b-2 bg-white/80 backdrop-blur-md">
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
            <li key={index}>
              <Link
                href={item.link}
                className={`text-foreground block text-center text-base whitespace-nowrap transition-all duration-200 ${
                  pathname === item.link ? "text-signature" : ""
                }`}
              >
                {item.ko}
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
                className={`block py-2 ${
                  pathname === item.link ? "text-signature" : ""
                }`}
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
