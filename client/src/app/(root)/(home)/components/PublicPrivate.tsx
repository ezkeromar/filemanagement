import { CircleCheckBig } from "lucide-react";
import Image from "next/image";

export default function PublicPrivate({ className }: { className?: string }) {
  return (
    <section className="py-10 flex justify-center" style={{ borderBottom: "3px dotted #e5ecfa" }}>
      <div className="grid max-w-screen-xl px-2 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-black">
            Public and private assets
            <br />
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Optionally protect your{" "}
            <b className="text-black">images,3D Model, and audio </b> using
            JWT-based auth, to give your app control over file access
            permissions.{" "}
          </p>
          <div className=" ">
            <div className="flex">
              <CircleCheckBig color="#7c3aed" size={32} className="" />
              <p className="ml-2 flex gap-2 text-gray-500">
                <b className="text-black">Public file access:</b>{" "}
                <span className="text-gray-500">
                  {" "}
                  serve public assets for your app or website.
                </span>
              </p>
            </div>
            <br />
            <div className="flex">
              <CircleCheckBig color="#7c3aed" size={32} className="" />
              <p className="ml-2 flex gap-2 text-gray-500">
                <span className="text-gray-500 max-w-xl">
                  {" "}
                  <b className="text-black">Private file access: </b> use JWTs
                  to authorize uploads and downloads via your own API.
                </span>
              </p>
            </div>
            <br />
          </div>
        </div>
        <div className=" lg:mt-0 lg:col-span-5 lg:flex mt-5 ">
          <Image
            src="/images/PublicPrivate.png"
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
