import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Cards from "./Cards";

export default function EnterprisePricing({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section
      className={`mt-14 relative flex justify-between flex-col ${className}`}
    >
      <div className="flex flex-col justify-center w-full py-20 ">
        <span className="text-gray-400 text-md m-auto font-semibold">
          PRICING THAT SCALES WITH YOU
        </span>
        <span className="h2-semibold  text-black text-5xl text-center font-bold m-auto max-w-[550px]">
          Enterprise pricing
        </span>
      </div>

      <div className="justify-center grid gap-3 grid-cols-1 md:grid-cols-4">
        <Cards/>
      </div>
    </section>
  );
}
