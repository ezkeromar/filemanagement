import Image from "next/image";
import Sidebar from "@/components/layout/admin/Sidebar";
import Header from "@/components/layout/admin/Header";



export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  

  return (
    <div className="relative overflow-y-hidden h-screen max-w-7xl mx-auto flex">
      <div className="z-[-1] absolute h-full w-full top-0 left-0">
      <Image src="/images/bg-layout.png" alt="bg-img" fill />

      </div>

      <Header />
      <Sidebar/>
      <main
        className="max-sm:w-full overflow-y-auto grow px-4 pb-8 pt-16 lg:pt-20 lg:w-auto"
        style={{ width: "calc(100vw - 70px)" }}
      >
        {children}
      </main>
    </div>
  );
}
