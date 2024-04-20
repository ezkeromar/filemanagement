import {
  CreateCheckoutSessionOutput,
  CreateCheckoutSessionInput,
} from "@/schemas/stripe";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { createCheckoutSession } from "@/actions/stripe";
import { CURRENCY } from "@/env/config";
import axios from 'axios';



export async function POST(request: NextRequest) {
  try {

    const authorization = request.headers.get("authorization");

    const body = await request.json();


    const { uiMode, description, customDonation, type , billable_id } = CreateCheckoutSessionInput.parse(body);

    const formData = new FormData();
    formData.append("customDonation", customDonation.toString());
    formData.append("uiMode", uiMode);
    formData.append("discription", description);

    const { client_secret, url  , session_id } = await createCheckoutSession(formData);

    const data = {
      status: "pending",
      type: type,
      currency: CURRENCY,
      session_id: session_id,
      // date like 2024-04-03
      date_created: new Date().toISOString().split('T')[0],
      date_paid: null,
      billable_type: "App\\Models\\Plan",
      billable_id: billable_id
    };
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/billings/store`, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${authorization}`
      },
    });
    console.log(response);


    if (response.status === 201) {
      return NextResponse.json(
        CreateCheckoutSessionOutput.parse({ client_secret, url }),
        { status: 200 }
      );
    } else {
      return new NextResponse("Sorry something went wrong", { status: 500 });
    }
    
  } catch (error) {
    console.error("Error in POST request:", error);
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 432 });
    }
    return new NextResponse("Sorry something went wrong", { status: 500 });
  }
}
