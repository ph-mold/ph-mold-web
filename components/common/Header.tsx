"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { imageLoader } from "@/lib/imageLoader";
import Button from "./Button";

const MENU_ITEMS = [
  { ko: "회사소개", link: ["/about"], isDisabled: true },
  { ko: "생산제품", link: ["/products", "/product"], isDisabled: false },
  { ko: "생산설비", link: ["/facilities"], isDisabled: true },
  { ko: "문의", link: ["/contact"], isDisabled: true }
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-background2 fixed top-0 z-10 min-h-16 w-full border-b-2 bg-white/80 backdrop-blur-md">
      <nav className="flex h-full w-full items-center justify-between px-4 py-3 md:justify-center">
        <Link href={"/"}>
          <Image
            loader={imageLoader}
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            className="mr-6"
          />
        </Link>
        {/* Desktop 메뉴 */}
        <ul className="hidden space-x-2 md:flex">
          {MENU_ITEMS.map((item, index) => {
            const [href, ...highlightPaths] = item.link;
            const isActive = highlightPaths.some((hl) =>
              pathname.startsWith(hl)
            );
            return (
              <li key={index}>
                <Link href={href}>
                  <Button
                    size="small"
                    variant="text"
                    color="secondary"
                    className={`${isActive && "!text-signature !font-medium"}`}
                    disabled={item.isDisabled}
                  >
                    {item.ko}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
        {/* Hamburger (Mobile) */}
        <Button
          size="small"
          variant="text"
          color="secondary"
          className="!p-2 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </nav>

      {/* Mobile 메뉴 */}
      <nav
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          menuOpen ? "max-h-96 py-4" : "max-h-0 py-0"
        }`}
      >
        <ul className="flex flex-col">
          {MENU_ITEMS.map((item, index) => {
            const [href, ...highlightPaths] = item.link;
            const isActive = highlightPaths.some((hl) =>
              pathname.startsWith(hl)
            );
            return (
              <li
                key={index}
                className="text-foreground w-full text-center text-base"
              >
                <Link href={href} onClick={() => setMenuOpen(false)}>
                  <Button
                    fullWidth
                    variant="text"
                    size="small"
                    color="secondary"
                    className={`py-2 ${isActive && "!text-signature !font-medium"}`}
                    disabled={item.isDisabled}
                  >
                    {item.ko}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
