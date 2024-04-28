"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navbarLinks } from "@/constants";

export default function NavbarLinks() {
  const pathname = usePathname();

  return (
    <>
      {navbarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        return (
          <Link
            key={item.route}
            href={item.route}
            className={` text-black transition-all hover:scale-105 ${
              isActive && " underlineLink scale-105 font-bold"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
