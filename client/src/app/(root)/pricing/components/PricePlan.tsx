import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleCheck, CircleX, Infinity } from "lucide-react";

export default function PricePlan({
  children,
  pricing,
}: {
  children: React.ReactNode;

  pricing: {
    name: string;
    Basic: any;
    Plus: any;
    Advanced: any;
    Enterprise: any;
  }[];
}) {
  const tableHeadStyles = " text-center text-white w-[33%] ";
  const tableCellStyles = " text-black max-sm:p-2 py-3";

  return (
    <>
      <h2 className="h2-semibold text-center">{children}</h2>
      <div className="container px-5  mx-auto flex flex-wrap">
        <div className="lg:w-1/4 mt-48 hidden lg:block">
          <div className="mt-px border-t border-gray-300 border-b border-l rounded-tl-lg rounded-bl-lg overflow-hidden">
            {pricing.map((price, index) => (
              <p
                key={index}
                className="bg-gray-100 text-gray-900 h-12 text-center px-4 flex items-center justify-start -mt-px"
              >
                {price.name}
              </p>
            ))}
          </div>
        </div>
        <div className="flex lg:w-3/4 w-full flex-wrap lg:border border-gray-300 rounded-lg">
          <div className="lg:w-1/4 lg:mt-px w-full mb-10 lg:mb-0 border-2 border-gray-300 lg:border-none rounded-lg lg:rounded-none">
            <div className="px-2 text-center h-48 flex flex-col items-center justify-center">
              <h3 className="tracking-widest text-black">Basic</h3>
              <h2 className="text-5xl text-gray-900 font-medium flex items-center justify-center leading-none mb-4 mt-2">
                $7
                <span className="text-gray-600 text-base ml-1">/mo</span>
              </h2>{" "}
              <span className="text-sm text-gray-600">
                For small applications & hobby users.
              </span>
            </div>
            {pricing.map((price, index) => (
              <p 
              className={`text-gray-600 h-12 text-center px-2 flex items-center -mt-px justify-center border-t border-gray-300 ${
                index % 2 === 0 ? 'bg-gray-100' : ''
              }`}
              >
                {price.Basic =="unlimited"   ? (
                  <Infinity  color={"black"}/>
                ) : (
                  typeof price.Basic === "string" ? (
                    price.Basic
                  ) : (
                    price.Basic === true ? (
                      <CircleCheck color={"green"}/>
                    ) : (
                      <CircleX  color={"red"}/>)
                  )
                  
                  
                )}
              </p>
            ))}
            
            {/* <div className="border-t border-gray-300 p-6 text-center rounded-bl-lg">
              <button className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">
                Button
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-auto"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
              <p className="text-xs text-gray-500 mt-3">
                Literally you probably haven't heard of them jean shorts.
              </p>
            </div> */}
          </div>
          <div className="lg:w-1/4 lg:-mt-px w-full mb-10 lg:mb-0 border-2 rounded-lg border-indigo-500 relative">
            <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
              POPULAR
            </span>
            <div className="px-2 text-center h-48 flex flex-col items-center justify-center">
              <h3 className="tracking-widest text-black">Plus</h3>
              <h2 className="text-5xl text-gray-900 font-medium flex items-center justify-center leading-none mb-4 mt-2">
                $35
                <span className="text-gray-600 text-base ml-1">/mo</span>
              </h2>
              <span className="text-sm text-gray-600">
                For individuals & startups building production apps.
              </span>
            </div>
            {pricing.map((price, index) => (
              <p 
              className={`text-gray-600 h-12 text-center px-2 flex items-center -mt-px justify-center border-t border-gray-300 ${
                index % 2 === 0 ? 'bg-gray-100' : ''
              }`}
              >
                {price.Plus =="unlimited"   ? (
                  <Infinity  color={"black"}/>
                ) : (
                  typeof price.Plus === "string" ? (
                    price.Plus
                  ) : (
                    price.Plus === true ? (
                      <CircleCheck color={"green"}/>
                    ) : (
                      <CircleX  color={"red"}/>)
                  )
                  
                  
                )}
              </p>
            ))}
            
            {/* <div className="p-6 text-center border-t border-gray-300">
              <button className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">
                Button
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-auto"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
              <p className="text-xs text-gray-500 mt-3">
                Literally you probably haven't heard of them jean shorts.
              </p>
            </div> */}
          </div>
          <div className="lg:w-1/4 w-full lg:mt-px border-2 border-gray-300 lg:border-none rounded-lg lg:rounded-none">
            <div className="px-2 text-center h-48 flex flex-col items-center justify-center">
              <h3 className="tracking-widest text-black">Advanced</h3>
              <h2 className="text-5xl text-gray-900 font-medium flex items-center justify-center leading-none mb-4 mt-2">
                $195
                <span className="text-gray-600 text-base ml-1">/mo</span>
              </h2>
              <span className="text-sm text-gray-600">
                For teams building midsize production apps.
              </span>
            </div>
            
            {pricing.map((price, index) => (
              <p 
              className={`text-gray-600 h-12 text-center px-2 flex items-center -mt-px justify-center border-t border-gray-300 ${
                index % 2 === 0 ? 'bg-gray-100' : ''
              }`}
              >
                {price.Advanced =="unlimited"   ? (
                  <Infinity  color={"black"}/>
                ) : (
                  typeof price.Advanced === "string" ? (
                    price.Advanced
                  ) : (
                    price.Advanced === true ? (
                      <CircleCheck color={"green"}/>
                    ) : (
                      <CircleX  color={"red"}/>)
                  )
                  
                  
                )}
              </p>
            ))}
            {/* <div className="p-6 text-center border-t border-gray-300">
              <button className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">
                Button
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-auto"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
              <p className="text-xs text-gray-500 mt-3">
                Literally you probably haven't heard of them jean shorts.
              </p>
            </div> */}
          </div>
          <div className="lg:w-1/4 w-full lg:mt-px border-2 border-gray-300 lg:border-none rounded-lg lg:rounded-none">
            <div className="px-2 text-center h-48 flex flex-col items-center justify-center">
              <h3 className="tracking-widest text-black">Enterprise</h3>
              <h3 className="text-3xl text-gray-900 font-medium flex items-center justify-center leading-none mb-4 mt-2">
                Enterprise <span className="text-base ml-1">pricing</span>
              </h3>
              <span className="text-sm text-gray-600">
                For teams building large production apps.{" "}
              </span>
            </div>
           

            {pricing.map((price, index) => (
              <p 
              className={`text-gray-600 h-12 text-center px-2 flex items-center -mt-px justify-center border-t border-gray-300 ${
                index % 2 === 0 ? 'bg-gray-100' : ''
              }`}
              >
                {price.Enterprise =="unlimited"   ? (
                  <Infinity  color={"black"}/>
                ) : (
                  typeof price.Enterprise === "string" ? (
                    price.Enterprise
                  ) : (
                    price.Enterprise === true ? (
                      <CircleCheck color={"green"}/>
                    ) : (
                      <CircleX  color={"red"}/>)
                  )
                  
                  
                )}
              </p>
            ))}

            {/* <div className="p-6 text-center border-t border-gray-300">
              <button className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">
                Button
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-auto"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
              <p className="text-xs text-gray-500 mt-3">
                Literally you probably haven't heard of them jean shorts.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
