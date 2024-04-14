"use client";

import Image from "next/image";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { profileSchema } from "@/schemas/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


export function ProfileForm({ user }: { user: any }) {

  const [defaultFormValues, setDefaultFormValues] = useState({
    name: user?.name,
    email: user?.email,
  });

  useEffect(() => {
    setDefaultFormValues({
      name: user?.name,
      email: user?.email,
    });
  }
  , [user]);


  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: defaultFormValues,
  });

  

  const inputStyles =
    "!mt-1 paragraph-normal text-[#FFF] bg-[#2e3044] border-0 placeholder:text-[#CFCFCF]";

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3 w-full mb-10 bg-[#171b5e] rounded-xl px-4 py-5"
      >

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <p>Name</p>
              </FormLabel>
              <FormControl>
                <Input
                  className={inputStyles}
                  placeholder="Enter your name"
                  disabled={true}
                  defaultValue={defaultFormValues.name}
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-normal text-red-500 text-xs" />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>
            <p>Email</p>
          </FormLabel>
          <Input
            disabled={true}
            className={inputStyles}
            defaultValue={defaultFormValues.email}
          />
        </FormItem>
      </form>
    </Form>
  );
}
