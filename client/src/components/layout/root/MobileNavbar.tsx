"use client";

import { AlignRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navbarLinks } from "@/constants";
import Logo from "@/components/shared/Logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileNavbar() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignRight
          size={36}
          color="black"
          className="transition-all hover:scale-110 sm:hidden"
        />
      </SheetTrigger>
      <SheetContent className="bg-white">
        <Logo className="scale-110 " />
        <nav className="flex flex-col gap-4 mt-4">
          {navbarLinks.map((item) => {
            const isActive =
              (pathname.includes(item.route) && item.route.length > 1) ||
              pathname === item.route;

            return (
              <SheetClose key={item.route} asChild>
                <Link
                  href={item.route}
                  className={` text-gray-900 transition-all hover:scale-105 ${
                    isActive && " underlineLink scale-105 font-bold"
                  }`}
                >
                  {item.label}
                </Link>
              </SheetClose>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
