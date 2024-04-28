import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero({ className = "" }: { className?: string }) {
  return (
    <section
      className={`pb-4 relative flex justify-between flex-col ${className}`}
    >
      <div className="flex flex-col justify-center w-full py-20 ">
        <span className="text-gray-400 text-md m-auto font-semibold">
        PLANS FOR TEAMS OF ALL SIZES

        </span>
          <span className="h2-semibold  text-black text-5xl text-center font-bold m-auto max-w-[600px]">
            Let us take care of images, 3D Model & audio
          </span>
      </div>
    </section>
  );
}
