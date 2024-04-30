import { CircleCheckBig } from "lucide-react";
import Image from "next/image";

export default function Performance({ className }: { className?: string }) {
  return (
    <section
      className="py-10 flex justify-center"
      style={{ borderBottom: "3px dotted #e5ecfa" }}
    >
      <div className="grid max-w-screen-xl px-2 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-black">
            Remarkable performance
            <br />
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Serve images, videos and audio to millions in seconds, with a
            media-optimized CDN and media processing APIs.
          </p>
          <div className=" ">
            <div className="flex">
              <div className="w-[30px]">
                <CircleCheckBig color="#7c3aed" size={28} className="" />
              </div>{" "}
              <p className="ml-2 flex gap-2 text-gray-500">
                <b className="text-black">
                  Up to 90% smaller images, 3D Model & audio
                </b>
              </p>
            </div>
            
            <div className="flex mt-4">
              <div className="w-[30px]">
                <CircleCheckBig color="#7c3aed" size={28} className="" />
              </div>{" "}
              <p className="ml-2 flex gap-2 text-gray-500">
                <span className="text-gray-500 max-w-xl">
                  <b className="text-black">~10ms latency:</b> edge-cache hits
                </span>
              </p>
            </div>
            <div className="flex mt-4">
              <div className="w-[30px]">
                <CircleCheckBig color="#7c3aed" size={28} className="" />
              </div>{" "}
              <p className="ml-2 flex gap-2 text-gray-500">
                <span className="text-gray-500 max-w-xl">
                  <b className="text-black">~200ms latency:</b> perma-cache
                  hits*
                </span>
              </p>
            </div>
            <br />
          </div>
          <span className="text-gray-500 max-w-xl">
            * Ar-display uses a permanent cache to return processed images,
            videos and audio near-instantly on all edge-cache misses, forever
          </span>
        </div>
        <div className=" lg:mt-0 lg:col-span-5 lg:flex mt-5 ">
          <Image
            src="/svg/Performance.svg"
            alt="Image"
            height={400}
            className="m-auto"
            width={300}
            priority
          />
        </div>
      </div>
    </section>
  );
}
