"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { adminSidebarTopLinks, adminSidebarBottomLinks } from "@/constants";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileSidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const linkStyles =
    " link-hover group relative flex items-center justify-start rounded-lg p-2 gap-4 hover:bg-[#7975ac] ";

  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={40} className="sm:hidden" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-[#585b98] custom-scrollbar flex justify-between flex-col gap-4 px-3 py-8 w-[14rem]"
      >
        <div className="flex items-center justify-start p-2 lg:gap-4">
          <p className="line-clamp-2 base-medium uppercase">
            Very Long Store Name Bla Bla
          </p>
        </div>
        <nav className="flex-1 flex flex-col gap-4">
          <section className="flex flex-1 flex-col gap-2">
            {adminSidebarTopLinks.map((item) => {
              const isActive = pathname === item.route;
              
              return (
                <SheetClose asChild key={item.label}>
                  <Link
                    href={item.route}
                    className={`${isActive && "bg-[#7975ac]"} ${linkStyles}`}
                  >
                    <Image
                      src={item.imgURL}
                      alt={item.label}
                      width={30}
                      height={30}
                    />
                    <p className="base-medium">{item.label}</p>
                  </Link>
                </SheetClose>
              );
            })}
          </section>

          <section className="flex flex-col gap-2">
            {adminSidebarBottomLinks.map((item) => {
              const isActive = pathname === item.route;

              return (
                <SheetClose asChild key={item.label}>
                  <Link
                    href={item.route}
                    className={`${isActive && "bg-[#7975ac]"} ${linkStyles}`}
                  >
                    <Image
                      src={item.imgURL}
                      alt={item.label}
                      width={30}
                      height={30}
                    />
                    <p className="base-medium">{item.label}</p>
                  </Link>
                </SheetClose>
              );
            })}
          </section>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
