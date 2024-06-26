import { CircleCheckBig, Heart } from "lucide-react";
import Image from "next/image";

export default function CDN({ className }: { className?: string }) {
  return (
    <section
      className=" py-10 flex justify-center "
      style={{ borderBottom: "3px dotted #e5ecfa" }}
    >
      <div className="grid max-w-screen-xl px-2 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-black">
          AssetsGer for Realtime Media Processing and CDN                      <br />
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          You can seamlessly integrate your existing storage with AssetsGer, gaining access to real-time media processing APIs and an incredibly fast content delivery network (CDN) without the need to relocate your files.
          </p>

          <div className=" ">
            <div className="flex">
            <div className="w-[30px]">
              <CircleCheckBig color="#7c3aed" size={28} className="" />
            </div>              <p className="ml-2 flex gap-2 text-gray-500">
                <span className="text-gray-500">
                <b className="text-black">
                Built-in Storage : </b>
                AssetsGer provides built-in storage that works out of the box.                </span>
              </p>
            </div>
            <br />
            <div className="flex">
            <div className="w-[30px]">
              <CircleCheckBig color="#7c3aed" size={28} className="" />
            </div>              <p className="ml-2 flex gap-2 text-gray-500">
                <span className="text-gray-500 max-w-xl">
                  <b className="text-black">External Storage Options : </b> You can also connect external storage services such as AWS S3, Google Storage, Cloudflare R2, and DigitalOcean Spaces.
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
                  <b className="text-black">Reverse Proxy Support : </b>AssetsGer supports processing images, text files, and 3D model files hosted elsewhere via HTTP.
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className=" lg:mt-0 lg:col-span-5 lg:flex mt-5 ">
          <Image
            src="/images/Bytescale.png"
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
