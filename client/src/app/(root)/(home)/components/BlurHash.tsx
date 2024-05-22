import { CircleCheckBig, Heart } from "lucide-react";
import Image from "next/image";

export default function BlurHash({ className }: { className?: string }) {
  return (
    <section
      className=" py-10 flex justify-center "
      style={{ borderBottom: "3px dotted #e5ecfa" }}
    >
      <div className="grid max-w-screen-xl px-2 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-black">
          BlurHash, WebP, AVIF & more
                      <br />
          </h1>
          {/* <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          These APIs are straightforward and extensively documented, eliminating the need for software development kits (SDKs). 

          </p> */}

          <div className=" ">
            <div className="flex">
            <div className="w-[30px]">
              <CircleCheckBig color="#7c3aed" size={28} className="" />
            </div>              <p className="ml-2 flex gap-2 text-gray-500">
                <span className="text-gray-500">
                <b className="text-black">BlurHash for Instant Image Placeholders : </b>
                Use BlurHash to create quick placeholders for images.
                </span>
              </p>
            </div>
            <br />
            <div className="flex">
            <div className="w-[30px]">
              <CircleCheckBig color="#7c3aed" size={28} className="" />
            </div>              <p className="ml-2 flex gap-2 text-gray-500">
                <span className="text-gray-500 max-w-xl">
                  <b className="text-black">Performance Enhancement : </b> 
                  Boost your website’s Google PageSpeed score by reducing Largest Contentful Paint (LCP) with BlurHash.

                </span>
              </p>
            </div>
            <br />
            <div className="flex">
            <div className="w-[30px]">
              <CircleCheckBig color="#7c3aed" size={28} className="" />
            </div>              <p className="ml-2 flex gap-2 text-gray-500">
                <span className="text-gray-500 max-w-xl">
                  
                Boost your website’s Google PageSpeed score by reducing Largest Contentful Paint (LCP) with BlurHash.</span>
              </p>
            </div>
            <div className="flex">
            <div className="w-[30px]">
              <CircleCheckBig color="#7c3aed" size={28} className="" />
            </div>              <p className="ml-2 flex gap-2 text-gray-500">
                <span className="text-gray-500 max-w-xl">

                  
                Achieve up to 90% bandwidth reduction by utilizing WebP, AVIF, and adjusting image quality and compression settings.
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className=" lg:mt-0 lg:col-span-5 lg:flex mt-5 ">
          <Image
            src="/images/BlurHash.png"
            alt="Image"
            height={760}
            className="m-auto"
            width={540}
            priority
          />
        </div>
      </div>
    </section>
  );
}
