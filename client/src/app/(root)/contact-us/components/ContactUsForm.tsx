"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function ContactUsForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // 1. Define your form.
  const ContactUsSchema = z.object({
    name: z
      .string()
      .min(5, { message: "Name must be at least 5 characters" })
      .max(30, { message: "Name must not exceed 30 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    phone: z.string().regex(/^\d{10}$/),
    message: z
      .string()
      .min(20, { message: "Message must be at least 20 characters" })
      .max(500, { message: "Message must not exceed 500 characters" }),
  });
  const form = useForm<z.infer<typeof ContactUsSchema>>({
    resolver: zodResolver(ContactUsSchema),
    defaultValues: { name: "", email: "", phone: undefined, message: "" },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ContactUsSchema>) {
    try {
      setIsSubmitting(true);
      toast({ title: "Form still on developement." });
      router.push("/thanks");
    } catch (error) {
      toast({
        title: "Your message is not submitted",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputStyles = "paragraph-normal border border-gray-300 text-gray-900 bg-gray-100 border-0";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full max-w-xl mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <p className="text-black">
                  Name <span className="text-red-500">*</span>
                </p>
              </FormLabel>
              <FormControl>
                <Input
                  className={inputStyles}
                  placeholder="Enter your full name"
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-normal text-red-500 text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
              <p className="text-black">
                  Email <span className="text-red-500">*</span>
                </p>
              </FormLabel>
              <FormControl>
                <Input
                  className={inputStyles}
                  placeholder="Enter your email"
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-normal text-red-500 text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
              <p className="text-black">
                  Phone Number <span className="text-red-500">*</span>
                </p>
              </FormLabel>
              <FormControl>
                <Input
                  className={inputStyles}
                  placeholder="Enter your phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-normal text-red-500 text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
              <p className="text-black">
                  Message <span className="text-red-500">*</span>
                </p>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  className={`${inputStyles} resize-none`}
                  placeholder="Type your message here."
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-normal text-red-500 text-xs" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="self-center mt-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? <>Submitting...</> : <>Submit</>}
        </Button>
      </form>
    </Form>
  );
}
