"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Banner from "./Banner";
import { svgLandingPage } from "@/constants";
import { ArrowRight } from "lucide-react";

export default function Hero({ className }: { className?: string }) {
  return (
    <>
      <section className="py-5 flex justify-center">
        <div className="">
          <div className="grid max-w-screen-xl px-2 py-8 mx-auto lg:gap-8 lg:py-16 lg:grid-cols-12 gap-8">
            <div className="mr-auto place-self-center lg:col-span-6 pb-10  md:py-0">
              <h1 className="max-w-2xl mb-4 text-5xl font-extrabold tracking-tight leading-none  xl:text-6xl text-black text-center md:text-start">
                <span className="text-2xl md:text-5xl text-black">
                  {" "}
                  One Platform for your
                </span>
                <br />
                <span className="primary-text-gradient text-5xl m-auto ">
                  3D Models ,Images & Files
                </span>
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl text-center dark:text-gray-400">
                Are you tired of overspending on cloud resources? Do you
                struggle with managing files efficiently? Look no further!
                assetsger is your solution.
              </p>
              <div className=" w-full grid sm:flex">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 sm:mr-3 mb-2 sm:mb-0 text-base font-medium text-center text-white rounded-lg primary-bg-gradient hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                >
                  Get started
                  <ArrowRight className="w-5 h-5 ml-2 -mr-1" />
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-white focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  Contact US
                </Link>
              </div>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-6 lg:flex">
              <Image
                src="/images/script-code.png"
                alt="Image"
                height={860}
                width={640}
                priority
              />
            </div>
          </div>
          <div className="text-center">
            <span className="text-d-block text-sm font-bold text-capitalize mb-6 text-slate-400">
              Serving images, 3D Model &amp; Text Files
              <span className="nowrap text-slate-400"> for your teams</span>
            </span>
          </div>
          <div className="max-w-screen-md px-2 mx-auto lg:gap-8 lg:py-16 flex justify-center items-center">
            <div className="md:flex md:flex-wrap md:justify-center  grid grid-cols-2">
              {svgLandingPage.map((item, index) => (
                <div key={index} className="m-2">
                  <Image
                    src={item}
                    width={150}
                    height={150}
                    alt="Image"
                    priority
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
