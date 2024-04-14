import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative max-w-7xl min-h-screen mx-auto flex justify-start items-center flex-col ">
      <Toaster />

      <div className="z-[-1] absolute w-full h-screen top-0 left-0">
        <Image src="/images/bg-layout.png" alt="bg-img" fill />
      </div>
      <main className="flex-1 w-full flex">
        <aside className="bg-[#171b5e] basis-[40%] hidden md:flex"></aside>
        <div className="flex-1 flex justify-center items-center">
          {children}
        </div>
      </main>
    </div>
  );
}
