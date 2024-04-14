"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import NavbarLinks from "./NavbarLinks";
import MobileNavbar from "./MobileNavbar";
import Logo from "@/components/shared/Logo";

export default function Header() {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    function scrollHeader() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.scrollY >= 70) setIsScroll(true);
        else setIsScroll(false);
      }, 10);
    }
    window.addEventListener("scroll", scrollHeader);

    return () => {
      window.removeEventListener("scroll", scrollHeader);
      clearTimeout(timeoutId);
    };
  }, [isScroll]);

  return (
    <header
      className={`snap-none shadow-2xl z-50 transition-all ease duration-350 top-0 left-0 w-full flex-between gap-6 p-3 sticky ${
        isScroll ? "bg-[#0b0b0c]" : "bg-transparent"
      }`}
    >
      <Logo className="transition-all hover:scale-105" />
      <nav className="grow flex-evenly gap-4 max-w-[750px] max-sm:hidden">
        <NavbarLinks />
      </nav>
      <div className="flex-end gap-4">
        <Link href="/admin">
          <Button size="sm" className="primary-bg-gradient">
            Try free trial
          </Button>
        </Link>
        <MobileNavbar />
      </div>
    </header>
  );
}
