import { CircleCheckBig } from "lucide-react";
import Image from "next/image";

export default function Efficient({ className }: { className?: string }) {
  return (
    <section
      className="py-10 flex justify-center"
      style={{ borderBottom: "3px dotted #e5ecfa" }}
    >
      <div className="grid max-w-screen-xl px-2 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-black">
          Efficient Image Processing APIs:
          <br />
          </h1>
          <p className="max-w-xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            <b className="text-black">Did you know: </b> you can bring your
            These APIs allow you to perform various image operations using straightforward URL commands.

          </p>
          <div className=" ">
            <div className="flex">
              <div className="w-[30px]">
                <CircleCheckBig color="#7c3aed" size={28} className="" />
              </div>{" "}
              <p className="ml-2 flex gap-2 text-gray-500">
                <span className="text-gray-500">
                <b className="text-black">Optimization Options : </b>
                You can optimize images by choosing formats like WebP, AVIF, and BlurHash.</span>
              </p>
            </div>
            <br />
            <div className="flex">
              <div className="w-[30px]">
                <CircleCheckBig color="#7c3aed" size={28} className="" />
              </div>{" "}
              <p className="ml-2 flex gap-2 text-gray-500">
                <span className="text-gray-500 max-w-xl">
                  <b className="text-black">Conversion Capabilities: </b> 
                  Convert images between formats such as HEIC, GIF, JPG, and PDF.
                </span>
              </p>
            </div>
            <br />
            <div className="flex">
              <div className="w-[30px]">
                <CircleCheckBig color="#7c3aed" size={28} className="" />
              </div>
              <p className="ml-2 flex gap-2 text-gray-500">
                <span className="text-gray-500 max-w-xl">
                  <b className="text-black">Resize and Crop: </b> 
                  These APIs support automatic cropping and resizing of images.
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className=" lg:mt-0 lg:col-span-5 lg:flex mt-5  ">
          <Image
            src="/images/Ar-display.png"
            alt="Image"
            className="m-auto"
            height={300}
            width={400}
            priority
          />
        </div>
      </div>
    </section>
  );
}
