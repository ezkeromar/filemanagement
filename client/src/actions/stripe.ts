"use server";

import type { Stripe } from "stripe";
import { headers } from "next/headers";
import { CURRENCY } from "@/env/config";
import { formatAmountForStripe } from "@/utils/stripe-helpers";
import { stripe } from "@/lib/stripe";


export async function createCheckoutSession(
  data: FormData,
): Promise<{ client_secret: string | null; url: string | null ; session_id: string | null }> {
  const ui_mode = data.get(
    "uiMode",
    ) as Stripe.Checkout.SessionCreateParams.UiMode;
    
  const origin: string = headers().get("origin") as string;
  const discription = data.get("discription") as string;


  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "donate",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: discription,
            },
            unit_amount: formatAmountForStripe(
              Number(data.get("customDonation") as string),
              CURRENCY,
            ),
          },
        },
      ],
      ...(ui_mode === "hosted" && {
        success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`,
        cancel_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}&canceled=true`,
      }),
      ...(ui_mode === "embedded" && {
        return_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`,
      }),
      ui_mode,
    });

  return {
    client_secret: checkoutSession.client_secret,
    session_id: checkoutSession.id,
    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(
  data: FormData,
): Promise<{ client_secret: string }> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: formatAmountForStripe(
        Number(data.get("customDonation") as string),
        CURRENCY,
      ),
      automatic_payment_methods: { enabled: true },
      currency: CURRENCY,
    });

  return { client_secret: paymentIntent.client_secret as string };
}