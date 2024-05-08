"use client";
import Link from "next/link";
import { footerLinks } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { subscribeSchema } from "@/schemas/subscribe";

// usestate
import { useState } from "react";

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";


export default function Footer() {
  // isSubmitting
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();


  const form = useForm<z.infer<typeof subscribeSchema>>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { email: "" },
  });

  async function handleSubmit(data: z.infer<typeof subscribeSchema>) {
    setIsSubmitting(true);
    const res = await fetch("/api/subscribe/store", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res?.ok) throw new Error(await res.text());
    form.reset();
    toast({ title: "Subscribed"});
    setIsSubmitting(false);
  }

  return (
    <footer className="w-full flex flex-col gap-6 snap-center py-8 px-3 sm:px-5   bg-slate-100">
      <div className="grid sm:grid-cols-2 ">
        <div className="grid grid-cols-2 sm:border-r px-2  sm:border-black">
          {footerLinks.length > 0 &&
            footerLinks.map((item) => (
              <Link
                key={item.route || ""}
                href={item.route}
                className="hover:text-gray-300 text-[18px] py-2"
              >
                {item.label}
              </Link>
            ))}
        </div>
        <div className=" ml-10 mr-8">
          <div className="flex gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="overflow-x-clip flex-1 flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        <p className="text-black">Subscribe to our Email </p>
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input
                            className="w-3/4 bg-slate-50 border border-black rounded-lg ml-2"
                            placeholder="Enter your email"
                            onChange={(e) => {
                              form.setValue("email", e.currentTarget.value);
                            }}
                          />

                          <Button className="w-1/4 bg- text-[18px] px-3 py-2 rounded-lg text-white flex gap-2 primary-bg-gradient">
                            <Loader2
                              className={
                                isSubmitting ? "animate-spin " : "hidden"
                              }
                              color="black"
                              size={20}
                            />
                            Subscribe
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            {/* <Input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-[#1a1a1a] border border-gray-400 rounded-lg"
            /> */}
          </div>
        </div>
      </div>
      <small className="text-[16px] text-black">
        Ar Display {new Date().getFullYear()}
      </small>
    </footer>
  );
}
