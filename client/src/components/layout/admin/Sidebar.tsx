"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { adminSidebarTopLinks, adminSidebarBottomLinks } from "@/constants";
import useAuth from "@/hooks/useAuth";


export default function SideBar() {
    const pathname = usePathname();
    const {  user } = useAuth(); 

  const linkStyles =
    " link-hover group relative flex items-center justify-start rounded-lg p-2 lg:gap-4 hover:bg-[#7975ac] ";
  const labelStyles =
    "bg-[#4f4d6a] absolute left-12 z-50 m-2 w-auto min-w-max origin-left scale-0 rounded-md p-2 text-sm font-bold transition-all duration-100 group-hover:scale-100 max-sm:hidden lg:hidden";

  return (
    <aside className="bg-[#171b5e] h-screen custom-scrollbar sticky left-0 top-0 z-40 flex justify-between flex-col gap-4 shrink-0 overflow-x-visible px-3 py-8 w-[69px] max-sm:hidden lg:w-[14rem]">
      <section className="flex">
        <div className="flex items-center justify-start rounded-lg p-2 lg:gap-4">
          <p className="line-clamp-2 base-medium uppercase max-lg:hidden">
            { user?.name ?? ""}
          </p>
        </div>
      </section>

      <section className="flex flex-1 flex-col gap-2">
        {adminSidebarTopLinks.map((item) => {
          const isActive = pathname === item.route;
          return (
            <Link
              key={item.label}
              href={item.route}
              className={`${linkStyles} ${isActive && "bg-[#7975ac]"}`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={30}
                height={30}
              />
              <p className="base-medium max-lg:hidden">{item.label}</p>
              <div className={labelStyles}>{item.label}</div>
            </Link>
          );
        })}
      </section>

      <section className="flex flex-col gap-2">
        {adminSidebarBottomLinks.map((item) => {
          const isActive = pathname === item.route;
          return (
            <Link
              key={item.label}
              href={item.route}
              className={`${linkStyles} ${isActive && "bg-[#7975ac]"} `}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={30}
                height={30}
              />
              <p className="base-medium max-lg:hidden">{item.label}</p>
              <div className={labelStyles}>{item.label}</div>
            </Link>
          );
        })}
      </section>
    </aside>
  );
}
