"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MobileSidebar from "./MobileSidebar";
import { adminHeaderLinks } from "@/constants";
import { User } from "./User";
import { redirect } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { MainNav } from "../root/MainNav";


export default  function Header() {
  const { user } = useAuth(); 


  return (
    <header className="w-full absolute bg-transparent flex-end px-5 py-2 lg:py-4">
      <div className="flex-1">
        {/* <MobileSidebar user={user} /> */}
        <MainNav className="mx-6" />

      </div>
      <nav className="flex-end gap-4">
        {adminHeaderLinks.map((item) => (
          <Button key={item.label} size="icon" className="bg-[#3b37ff] hover:bg-[#0679f6]">
            <Image src={item.imgURL} alt={item.label} width={26} height={26} />
          </Button>
        ))}
        <User />
      </nav>
    </header>
  );
}
