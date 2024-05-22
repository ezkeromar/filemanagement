import { CircleCheckBig, Heart } from "lucide-react";
import Image from "next/image";

export default function ProcessingAPIs({ className }: { className?: string }) {
  return (
    <section
      className=" py-10 flex justify-center "
      style={{ borderBottom: "3px dotted #e5ecfa" }}
    >
      <div className="grid max-w-screen-xl px-2 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-black">
          Effortless File Upload and Media Processing APIs
                      <br />
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          These APIs are straightforward and extensively documented, eliminating the need for software development kits (SDKs). 

          </p>

          <div className=" ">
            <div className="flex">
            <div className="w-[30px]">
              <CircleCheckBig color="#7c3aed" size={28} className="" />
            </div>              <p className="ml-2 flex gap-2 text-gray-500">
                <span className="text-gray-500">
                <b className="text-black">Single HTTP Request for File Upload : </b>
                You can upload files using just one HTTP request.
                </span>
              </p>
            </div>
            <br />
            <div className="flex">
            <div className="w-[30px]">
              <CircleCheckBig color="#7c3aed" size={28} className="" />
            </div>              <p className="ml-2 flex gap-2 text-gray-500">
                <span className="text-gray-500 max-w-xl">
                  <b className="text-black">Robust File Management : </b> i These APIs support file management features such as organizing files into folders and handling file metadata.
                </span>
              </p>
            </div>
            <br />
            <div className="flex">
            <div className="w-[30px]">
              <CircleCheckBig color="#7c3aed" size={28} className="" />
            </div>              <p className="ml-2 flex gap-2 text-gray-500">
                <span className="text-gray-500 max-w-xl">
                  {" "}
                  <b className="text-black">External Storage Mapping : </b> You can easily map any folder to external storage.
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className=" lg:mt-0 lg:col-span-5 lg:flex mt-5 ">
          <Image
            src="/images/BlurHash.png"
            alt="Image"
            height={700}
            className="m-auto"
            width={500}
            priority
          />
        </div>
      </div>
    </section>
  );
}
