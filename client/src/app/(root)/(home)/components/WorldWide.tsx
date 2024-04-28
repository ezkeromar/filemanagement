import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WorldWide({ className }: { className?: string }) {
  return (
    <section className="">
      <div className=" max-w-screen-xl px-4 m-auto pt-8 lg:gap-8 xl:gap-0 lg:pt-16 text-center">
        <h1 className="text-black text-6xl font-extrabold tracking-tight w-fit flex m-auto">
          Optimized content delivery
        </h1>
        <br />
        <p className="max-w-2xl mb-6 m-auto font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 text-center">
          Optimize and serve images, videos, and audio at lightning-fast speeds
          to reduce page load times and improve the UX of your web app.{" "}
        </p>
      </div>

      <div className="lg:mt-4 lg:flex sm:px-40 pb-20">
        <Image
          src="/svg/WorldWide.svg"
          alt="Image"
          height={760}
          width={540}
          className="m-auto w-full"
        />
      </div>
    </section>
  );
}
