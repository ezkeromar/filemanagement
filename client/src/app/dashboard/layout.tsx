import Image from "next/image";
import Sidebar from "@/components/layout/admin/Sidebar";
import Header from "@/components/layout/admin/Header";
import { MainNav } from "@/components/layout/root/MainNav";



export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  

  return (
    <div className="relative overflow-y-hidden h-screen  mx-auto flex b">
      <Header />
      <main
        className="max-sm:w-full overflow-y-auto grow pb-8 md:px-10 px-3 pt-16  lg:w-auto"
        style={{ width: "calc(100vw - 70px)" }}
      >

        {children}
      </main>
    </div>
  );
}
