"use client";

import type Stripe from "stripe";
import React, { useEffect, useState } from "react";
import * as config from "@/env/config";
import getStripe from "@/utils/get-stripejs";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

import { Loader2 } from "lucide-react";





interface CheckoutFormProps {
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode;
}

export default function CheckoutForm(props: CheckoutFormProps): JSX.Element {
  const [loading] = useState<boolean>(false);
  const [input, setInput] = useState<{ customDonation: number }>({
    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
  });
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const uiMode = props.uiMode;

  useEffect(() => {
    const generateCheckoutSession = async () => {
      try {
        // Retrieve subscription information from the URL params
        const urlParams = new URLSearchParams(window.location.search);
        const client_secret = urlParams.get("session_id");

        if (uiMode === "embedded") {
          setClientSecret(client_secret);
        }
      } catch (error) {
        console.error("Error generating checkout session:", error);
        // Handle error here
      }
    };

    generateCheckoutSession();
  }, [uiMode]);
  

  

  return (
    <div className="">
      {clientSecret ? (
        <EmbeddedCheckoutProvider
          stripe={getStripe()}
          options={ { clientSecret: clientSecret
            ,onComplete: () => {
              console.log("Checkout completed");
            },
            
           } }
          
        >
          <EmbeddedCheckout
          
          />
          
        </EmbeddedCheckoutProvider>
      ) : (
        <Loader2 />
      )}
    </div>
  );
}
