import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Uploadwidget({ className }: { className?: string }) {
  return (
    <section className="py-10" style={{ borderBottom: "3px dotted #e5ecfa" }}>
      {/* <div className="grid max-w-screen-xl px-2 m-auto pt-8 lg:gap-8 xl:gap-0 lg:pt-16 lg:grid-cols-12">
        <h1 className=" text-black  text-6xl font-extrabold tracking-tight col-span-12 flex">
         Accept file uploads from your users in seconds. 
          <Heart size={50} color="#7c3aed" className="pb-4 " />
          
        </h1>
      </div> */}
      <div className="grid max-w-screen-xl px-2 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-black">
          Accept file uploads from your users in seconds.
            <br />
          </h1>
          
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          Receiving any file type from your users can be done with AssetsGer, which enables image cropping, 3D model files, PDF previews, and more.
          </p>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          Enjoy modern SDKs that install in 7 lines of code:
                    </p>
        </div>
        <div className="lg:mt-0 lg:col-span-5 lg:flex mt-5 ">
          <Image
            src="/images/Uploadwidget.png"
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
