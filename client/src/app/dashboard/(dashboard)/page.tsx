 "use client";
 import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { decryptData, convertSize } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import createAxios from "@/lib/Axios";
import WeeklyOverview from "./components/WeeklyOverview";
import RadialProgressBar from "@/components/RadialProgressBar";

interface SearchParams {
  session_id?: string;
}

export default function Dashboard({ searchParams }: { searchParams?: SearchParams }) {
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const updateBilling = async (session_id: string) => {
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
            title: "Payment Failed",
            description: "Your payment has failed",
          });
          throw new Error("Failed to create checkout session");
        } else {
          toast({
            title: "Payment Successful",
            description: "Your payment has been successfully processed",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (searchParams?.session_id) {
      updateBilling(searchParams.session_id);
    }
  }, [searchParams, toast]);

  let percentage = 0;
  let storageAvailable = 0;

  if (user && user.document_details) {
    const sorageLimit = convertSize(user.document_details.quantity ??0, user.document_details.storage_unit ?? "bg", "MB");
    const storageUsed = convertSize(user.document_details.size ?? 0, user.document_details.storageUnit ?? 'GB', "MB");
    storageAvailable = sorageLimit - storageUsed;
    percentage = (storageUsed / sorageLimit) * 100;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="hidden space-y-6 p-3  md:block">
        <div className="space-y-0.5">
          <h2 className="text-xl font-bold tracking-tight text-blue-500">Welcome {user?.name ?? ""}</h2>
          {/* <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p> */}
        </div>
        </div>
      <div className="flex flex-col gap-4 w-full mb-10 bg-slate-200 rounded-xl p-4">
        <p className="font-semibold">Dashboard Overview</p>
        <div className="flex flex-wrap gap-4 w-full">
          <WeeklyOverview salesPerformance={30} className="flex-1" />
          <RadialProgressBar
            progress={percentage}
            value={convertSize(storageAvailable ?? 0,  "MB" , 'GB')}
            type="GB"
            message="Storage Available"
          />
        </div>
      </div>
    </div>
  );
}
