import { CircleCheckBig, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Details({ className }: { className?: string }) {
  return (
    <section className="" >
      <div className="grid max-w-screen-xl px-2 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-black">
            Affordable for everyone
            <br />
          </h1>
          <p className="max-w-xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Ar-display outperforms bundled, home-grown, and dedicated image
            processing solutions in cost efficiency,
            <br />
            <b className="text-black">
              making it the top choice for large web apps.
            </b>{" "}
          </p>
        </div>
        <div className=" lg:mt-0 lg:col-span-5  ">
          <div className="flex">
            <div className="w-[30px]">
              <CircleCheckBig color="#7c3aed" size={32} className="" />
            </div>
            <div className="w-full ">
              <p className="ml-2 flex gap-2 text-gray-500">
                <span className="text-gray-500 max-w-xl text-lg">
                  {" "}
                  <b className="text-black">Low pricing: </b>$0.25 per 1000
                  source images
                </span>
              </p>
              <p className="text-gray-300 max-w-xl text-sm	">
                {" "}
                (Industry average: $5 - $15 per 1000 source images.)
              </p>
            </div>
          </div>
          <div className="flex py-5">
            <div className="w-[30px]">
              <CircleCheckBig color="#7c3aed" size={32} className="" />
            </div>
            <div className="w-full ">
              <p className="ml-2 flex gap-2 text-gray-500">
                <span className="text-gray-500 max-w-xl text-lg">
                  <b className="text-black">No monthly re-billing: </b>no charge
                  for image optimizations you've already performed.
                </span>
              </p>
              <p className="text-gray-300 max-w-xl text-sm">
                (Many vendors charge for the number of optimized images
                requested each month, even if you've optimized them before.)
              </p>
            </div>
          </div>
          <div className="flex py-5">
            <div className="w-[30px]">
              <CircleCheckBig color="#7c3aed" size={32} className="" />
            </div>
            <div className="w-full ">
              <p className="ml-2 flex gap-2 text-gray-500">
                <span className="text-gray-500 max-w-xl text-lg">
                  <b className="text-black">Adjustable costs : </b>configure 
                  processing time vs. bandwidth to suit your app's traffic
                  profile.
                </span>
              </p>
            </div>
          </div>
          <div className="flex py-5">
            <div className="w-[30px]">
              <CircleCheckBig color="#7c3aed" size={32} className="" />
            </div>
            <div className="w-full ">
              <p className="ml-2 flex gap-2 text-gray-500">
                <span className="text-gray-500 max-w-xl text-lg">
                  <b className="text-black">Permanent caching</b>{" "}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="space-bottom-2 lg:col-span-12">
          <p className="mt-9 mb-5  smaller text-center mx-auto w-full text-slate-400">
            * Ar-display charges based on processing time, which you can control
            through image compression, image quality, output format, and output
            dimensions. $0.25 per 1000 images is based on 600ms of processing
            time per image, which is the approximate time it takes to process a
            4000×3000 JPEG into a thumbnail.
          </p>
        </div>
      </div>
    </section>
  );
}
