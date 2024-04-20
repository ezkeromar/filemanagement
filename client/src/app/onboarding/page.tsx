"use client";
import Image from "next/image";
import { OnboardingForm } from "./components/OnboardingForm";
import useAuth from "@/hooks/useAuth";


export default  function OnboardingPage() {

  const { user } = useAuth();

  return (
    <div className="relative max-w-7xl min-h-screen mx-auto flex-start flex-col">
      <div className="z-[-1] absolute w-full top-0 left-0 h-screen">
        <Image src="/images/bg-layout.png" alt="bg-img" fill />
      </div>
      <main className="flex-1 w-full p-3 sm:p-5 !pt-0 flex-center  snap-y snap-mandatory">
        <OnboardingForm uiMode="embedded" />
      </main>
    </div>
  );
}