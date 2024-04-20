import type { Metadata } from "next";

import CheckoutForm from "@/components/CheckoutForm";




export default function DonatePage(): JSX.Element {
  return  <CheckoutForm uiMode="embedded" />;
}