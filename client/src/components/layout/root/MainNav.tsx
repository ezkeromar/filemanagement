"use client";
import Link from "next/link"
import { usePathname } from "next/navigation";


import { cn } from "@/lib/utils"
import { adminSidebarBottomLinks, adminSidebarTopLinks } from "@/constants";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {adminSidebarTopLinks.map((item) => {
          const isActive = pathname === item.route;
          return (
            <Link
              href={item.route}
              className={`text-sm font-medium transition-colors hover:text-primary py-1 rounded-lg ${isActive && " bg-slate-200 px-2"}`}
            >
              {item.label}
            </Link>
          );
      })}
      {adminSidebarBottomLinks.map((item) => {
          const isActive = pathname === item.route;
          return (
            <Link
              href={item.route}
              className={`text-sm font-medium transition-colors hover:text-primary py-1 rounded-lg ${isActive && " bg-slate-200 px-2"}`}
            >
              {item.label}
            </Link>
          );
      })}
      
    </nav>
  )
}