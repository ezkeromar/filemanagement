import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { title } from "process";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Accordions({ className = "" }: { className?: string }) {
  const dataAccordion = [
    {
      title: "Billing",
      items: [
        {
          title: "Which payment methods do you support?",
          contents: [
            "Ar display supports all major credit cards (including Mastercard, Visa, Maestro, American Express, Discover, Diners Club, JCB, UnionPay, and Mada) and PayPal.",
            "All payments are handled safely and securely via Paddle: our online payments processor.",
          ],
        },
        {
          title: "Do you send invoices?",
          contents: [
            "Yes, we send monthly receipts which can be converted into tax invoices by adding your company's tax details to the online receipt itself. Once added, all future receipts will be sent as tax invoices.",
          ],
        },
      ],
    },
    {
      title: "Plans ",
      items: [
        {
          title: "What happens if I exceed the limits?",
          contents: [
            "We will email you once 80% of your account's quotas have been consumed.",
            "We will email you again once 100% of your account's quotas have been consumed: if this happens then your downloads and/or uploads will return '429: Too Many Requests'.",
            "Your current usage is displayed in the Ar display Dashboard under the",
            "Please contact support  for quota increases: we will respond as soon as we receive your message.",
          ],
        },
        {
          title: "Are there daily limits?",
          contents: [
            "There are no daily limits.",
            "The only limits are your plan's monthly limits.",
          ],
        },
        {
          title: "How do I upgrade?",
          contents: [
            "You can upgrade your account at any time via the Billing page.",
          ],
        },
        {
          title: "Can I cancel my plan?",
          contents: [
            "Yes, you can cancel or change your plan at any time.",
            "To cancel or downgrade your plan, please refer to the Billing  page in the Ar display Dashboard.",
          ],
        },
        {
          title: "What happens to my files if I cancel?",
          contents: [
            "Your files will be deleted from our servers after you cancel your account.",
            "You can export all of your files before cancelling via the Ar display Dashboard.",
          ],
        },
      ],
    },
    {
      title: "Technical",
      items: [
        {
          title: "Where are my files stored?",
          contents: [
            "AWhen you upload files using the Ar display SDKs or the Ar display API, your files will be stored in one of Ar display's internal AWS S3 buckets by default.",
            "Alternatively, you can choose to store your files in a custom AWS S3 bucket or a DigitalOcean Space.",
            "You can also configure Ar display as a reverse-proxy/CDN to process images, videos, and audio files from external HTTP URLs, without having to move them away from your existing storage service.",
          ],
        },
        {
          title: "Can I easily export my files?",
          contents: [
            "Yes: Ar display  provides API endpoints for listing and downloading files, making it easy to programmatically export your files at any time.",
          ],
        },
        {
          title: "Do you support uploads from mobile devices?",
          contents: [
            "Yes: Ar display supports file uploads from mobile devices.",
            "Ar display provides a smooth experience to mobile users through its fault-tolerant file upload protocol. This protocol uses an internal mechanism of file chunking, parallel chunk uploads and automatic retries to ensure that when network connectivity issues occur, uploads are resumed from where they left off after connectivity is restored.",
            "This happens automatically and by default when you use Upload.js.",
          ],
        },
        {
          title: "We use TBs of bandwidth on our website, can you help us?",
          contents: [
            "Yes, we can definitely help.",
            "Ar display is limitless in its capacity: many of our customers serve TBs of traffic on a daily basis.",
            "If you would like to discuss custom pricing for your business, please contact sales",
          ],
        },
      ],
    },
  ];

  return (
    <>
      <section
        className={`mt-14 relative flex justify-between flex-col ${className}`}
      >
        <div className="flex flex-col justify-center w-full py-20 ">
          <span className="text-gray-400 text-md m-auto font-semibold">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <span className="h2-semibold  text-black text-5xl text-center font-bold m-auto max-w-[700px]">
            Got questions? We've got answers.
          </span>
        </div>

        <div className="justify-center md:max-w-[900px] m-auto">
          {dataAccordion.map((item, index) => (
            <div key={index} className="mb-8  md:min-w-[900px]">
              <h2 className="text-2xl font-semibold text-black">{item.title}</h2>
              <Accordion type="single" collapsible>
                {item.items.map((subItem, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-black text-base">
                      {subItem.title}
                    </AccordionTrigger>
                    <AccordionContent className="">
                      {subItem.contents.map((content, index) => (
                        <>
                        <span key={index} className="text-gray-500 text-md">
                          {content}
                        </span>
                        <br/>
                        </>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
         
        </div>
      </section>
    </>
  );
}
