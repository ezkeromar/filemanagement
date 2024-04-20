 "use client";
import WeeklyOverview from "./components/WeeklyOverview";
import ClicksAndViews from "./components/ClicksAndViews";
import useAuth from "@/hooks/useAuth";
import createAxios from "@/lib/Axios";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { decryptData } from "@/lib/utils";




export default  function Dashboard({
  searchParams,
}: {
  searchParams?: {
    session_id?: string;
  };
}) {

  const { user } = useAuth();
  const { toast } = useToast();


  const updateBilling = async (session_id : string ) => {
    try {
      const token = localStorage.getItem("token");
      const authToken = token ? decryptData(token) : "";
      const response = await fetch(`/api/stripe/status-session?session_id=${session_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        toast({
          title:"Payment Failed",
          description: "Your payment has been failed"});
          throw new Error("Failed to create checkout session");

      }
      else {
        toast({
          title:"Payment Successfull",
          description: "Your payment has been successfully processed"});
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (searchParams?.session_id) {
      updateBilling(searchParams.session_id);
    }
  }, [searchParams]);





  return (
    <div className="flex flex-col gap-5">
      <h1>Welcome {user?.name ?? ""}</h1>
      <div className="flex flex-col gap-4 w-full mb-10 bg-[#171b5e] rounded-xl p-4">
        <p className="font-semibold">Dashboard Overview</p>
        <div className="flex flex-wrap gap-4 w-full">
         <WeeklyOverview salesPerformance={30} className="flex-1" />
          {/* <ClicksAndViews clicks={460} totalViews={280} /> */}
        </div>
      </div>
    </div>
  );
}
