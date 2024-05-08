import React from "react";
import Header from "@/components/layout/root/Header";
// color.css
// C:\Users\Hamza Tbib\Documents\project hamza\filemanagement\client\src\app\color.css
import "../color.css";
import Footer from "@/components/layout/root/Footer";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <div className="relative  min-h-screen mx-auto flex-start flex-col bg-slate-50 ">
      <div className="z-[-1] absolute w-full top-0 left-0 h-screen">
        {/* <Image src="/images/bg-layout.png" alt="bg-img" fill /> */}
      </div>
      <Header />
      <main className="flex-1 w-full p-3 sm:p-5 !pt-0 flex flex-col snap-y snap-mandatory px-10">
        {children}
      </main>
    </div>
    <Footer />
    </>
  );
}
