"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { loginSchema } from "@/schemas/user";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import Logo from "@/components/shared/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


import useAuth from "@/hooks/useAuth";



export function LoginForm() {
  const { login  , user} = useAuth(); 

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    const response = await login(values); 
    setIsSubmitting(false);
    if (response) {
      toast({ title: "You are successfully signed in." });

      if(response && response.is_first_login === 1) {
      router.push("/onboarding");
      }
      else {
        router.push("/dashboard");
      }

    } else {
      toast({ title: "Failed to sign in. Please try again." });

    }
  };


  return (
    <Card className="w-full max-w-[500px] md:bg-slate-200 border-none">
      <CardHeader className="space-y-3 pb-5">
        <Logo className="mx-auto mb-4 sm:mb-10" width={160} height={50} />
        <CardTitle className="text-center text-2xl text-[#3b37ff]">Login</CardTitle>
        <CardDescription className="text-center text-sm">
          Enter your email and password bellow to login
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 px-6 pb-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex">
                    <FormLabel className="bg-[#575868] rounded-l-md basis-10 flex justify-center items-center">
                      <Image
                        src="/icons/email.png"
                        alt="email"
                        width={25}
                        height={25}
                      />
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-slate-50 border-none rounded-l-none "
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex">
                    <FormLabel className="bg-[#575868] rounded-l-md basis-10 flex justify-center items-center">
                      <Image
                        src="/icons/password.png"
                        alt="password"
                        width={25}
                        height={25}
                      />
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-slate-50 border-none rounded-l-none"
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <small className="text-sm text-muted-foreground">
              By logging in, you agree to our{" "}
              <Link
                className="font-semibold underline mx-1 text-black"
                href="/terms-of-service"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                className="font-semibold underline mx-1 text-black"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
            </small>

            <Button
              type="submit"
              className="w-full bg-[#3b37ff] gap-1n "
              disabled={isSubmitting}
            >
              <Loader2
                className={isSubmitting ? "animate-spin" : "hidden"}
                size={20}
              />
              <p className="text-white">Login</p>
            </Button>
          </form>
        </Form>

      </CardContent>
      <CardFooter>
        <Link
          href="/register"
          className={`hover:underline  ${
            isSubmitting && " pointer-events-none "
          }`}
        >
          Do not have an account? Register
        </Link>
      </CardFooter>
    </Card>
  );
}
