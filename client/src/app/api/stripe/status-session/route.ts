import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const session_id = req.nextUrl.searchParams.get("session_id") as string;
    const authorization = req.headers.get("authorization");
    if (!session_id) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(
      session_id as string
    );
    if (!session || session.payment_status !== "paid") {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    axios.defaults.headers.common['Authorization'] = authorization;

    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/billings/update/${session_id}` ,
      {
        session_id : session_id,
        status : "completed",
      } 
    );

      if (response.status === 200) {
        return NextResponse.json(
          { message: "Payment Successfull" },
          { status: 200 }
        );
      }
      
      return NextResponse.json(
        { error: "Payment Failed" },
        { status: 500 }
      );
  
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}