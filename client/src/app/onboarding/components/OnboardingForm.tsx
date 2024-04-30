"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import createAxios from "@/lib/Axios";


import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// CopyCodeSource
import type Stripe from "stripe";
import { onboardingSchema } from "@/schemas/user";
import { Plan } from "@/schemas/Plan";
import { decryptData } from "@/lib/utils";


interface CheckoutFormProps {
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode;
}

export function OnboardingForm(props: CheckoutFormProps): JSX.Element {
  const router = useRouter();
  const axios = createAxios();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [scriptError, setScriptError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [plans, setPlans] = useState<Plan[]>([])


  

  const getPlans = async () => {
    try {
      const response = await axios.get("/plans");
      setPlans(response.data.data);
      
    } catch (error) {
      console.error("Error fetching plans:", error);
      throw error;
    }
  };

  useEffect(() => {
    getPlans();
  }, []);


  const handlePlanSelect = (plan: number) => {
    setSelectedPlan(plan);
  };


  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { website: "" },
  });

  // 2. Define a submit handler.
  async function firstStep(values: z.infer<typeof onboardingSchema>) {
    try {
      setIsSubmitting(true);
      console.log(plans )
      setScriptError("");
      handleNext();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log({ error: message });
      setScriptError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function secondStep() {
    try {
      setIsSubmitting(true);

      const plan = plans.find((p) => p.id === selectedPlan);
      if (!plan) throw new Error("Invalid plan");

      const uiMode = props.uiMode ?? "embedded";
      // uiMode, description, customDonation, type , billable_id 
      const formData = {
        billable_id: selectedPlan,
        customDonation: plan.price,
        uiMode: uiMode,
        description: plan.quantity + " " + plan.storage_unit + " Plan",
        type: plan.billing_interval,
      };
      const { client_secret } = await createCheckoutSession(formData);

      router.replace(`/Checkout?session_id=${client_secret}`);



      setScriptError("");

    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error({ error: message });
      setScriptError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleNext() {
    setFormStep((prevStep) => prevStep + 1);
  }

  async function handleSkip() {
    try {
      setIsSkipping(true);
      const response = await axios.post("/update-first-login");

    } catch (error) {
      console.log({ error });
    } finally {
      setIsSkipping(false);
      router.replace("/dashboard");
    }
  }

  async function createCheckoutSession(formData: {
    customDonation: number;
    uiMode: Stripe.Checkout.SessionCreateParams.UiMode;
    description: string;
  }) {
    try {
      const token = localStorage.getItem("token");
  const authToken = token ? decryptData(token) : "";
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { 
          "Content-Type": "application/json",
          "authorization": `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw error;
    }
  }

  return (
    <Card className=" w-full max-w-[500px] bg-[#171b5e] border-none flex flex-col">
      <CardHeader className="p-4">
        <Button
          size="sm"
          variant="secondary"
          className="self-start pl-0"
          onClick={() => setFormStep((prevStep) => prevStep - 1)}
          disabled={isSubmitting || isSkipping || formStep === 1}
        >
          <ChevronLeft color="black" />
          Go back
        </Button>
        <CardTitle className="text-center">
          <span className="text-4xl">
            {formStep === 1 ? "Getting Started" : "Choose a pricing plan:"}
          </span>
        </CardTitle>
      </CardHeader>
      {formStep === 1 && (
        <CardContent className="flex-1 p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(firstStep)}
              className="overflow-x-clip flex-1 flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="website"
                render={() => (
                  <FormItem>
                    <FormLabel>
                      <p>
                        Website <span className="text-primary">*</span>
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="paragraph-normal text-[#FFF] bg-[#2e3044] border-0 placeholder:text-white"
                        placeholder="Enter your website full url"
                        onChange={(e) => {
                          form.setValue("website", e.currentTarget.value);
                          setWebsiteUrl(e.currentTarget.value);
                        }}
                        disabled={isSubmitting || isSkipping}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="secondary"
                  className="min-w-[80px]"
                  onClick={handleSkip}
                  disabled={isSubmitting || isSkipping}
                >
                  <Loader2
                    className={isSkipping ? "animate-spin" : "hidden"}
                    size={20}
                    color="black"
                  />
                  {!isSkipping && "Skip"}
                </Button>
                <Button
                  type="submit"
                  className="min-w-[115px]"
                  disabled={isSubmitting || isSkipping}
                >
                  <Loader2
                    className={isSubmitting ? "animate-spin" : "hidden"}
                    size={20}
                  />
                  {isSubmitting ? null : (
                    <>
                      Continue
                      <ChevronRight />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      )}
      {formStep === 2 && (
        <CardContent className="flex-1 p-4">
          

          <div className="mx-auto max-w-6xl px-12 mb-6">
            <div className="flex flex-wrap justify-center gap-3 ">
             
             {plans.map((plan, i) => (
                <label key={i} className="cursor-pointer">
                  <input
                    type="radio"
                    className="peer sr-only"
                    name="pricing"
                    value={plan.id}
                    checked={selectedPlan === plan?.id ?? ""}
                    onChange={() => handlePlanSelect(plan.id ?? 0)}
                  />
                  <div
                    className={`w-72 max-w-xl rounded-md text-token-text-secondary bg-[#D9D9D933] p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${
                      selectedPlan === plan.id
                        ? "peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold uppercase text-white">
                          {plan.quantity} {plan.storage_unit} Plan
                        </p>
                        <div>
                          <svg width="24" height="24" viewBox="0 0 24 24"
                           className={`${
                            selectedPlan === plan.id
                        ? "block"
                        : "hidden"
                          }`}
                          >
                            <path
                              fill="currentColor"
                              d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35
                              1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <p className="text-sm font-bold">${plan.price} /${plan.billing_interval}</p>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="secondary"
              className="min-w-[80px]"
              onClick={handleSkip}
              disabled={isSubmitting || isSkipping}
            >
              <Loader2
                className={isSkipping ? "animate-spin" : "hidden"}
                size={20}
                color="black"
              />
              {!isSkipping && "Skip"}
            </Button>
            <Button
              type="button"
              onClick={secondStep}
              className="min-w-[115px]"
              disabled={isSubmitting || isSkipping}
            >
              <Loader2
                className={isSubmitting ? "animate-spin" : "hidden"}
                size={20}
              />
              {isSubmitting ? null : (
                <>
                  Continue
                  <ChevronRight />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
