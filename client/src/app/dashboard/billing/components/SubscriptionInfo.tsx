"use client";
import React, { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils";
import { User } from "@/schemas/user";

interface SubscriptionInfoProps {
  className?: string;
  user: User  | null | undefined;
}

interface SubscriptionInfo {
  currentSubscription: string;
  lastPaymentDate: Date | string;
  nextPaymentDate: Date | string;
  price: string | number;
}

const SubscriptionInfo: React.FC<SubscriptionInfoProps> = ({
  className,
  user,
}) => {
  const [data, setData] = useState<SubscriptionInfo>({
    currentSubscription: "---",
    lastPaymentDate: "---",
    nextPaymentDate: "---",
    price: 0,
  });

  useEffect(() => {
    if (user && !("error" in user)) {
      setData({
        currentSubscription: user.current_billing ?  user.current_billing. description + " - " + user.current_billing.unit_amount + " " + user.current_billing.currency : "---",
        lastPaymentDate: user.details?.date_created ?? "---",
        nextPaymentDate: user.details?.next_payment_date ?? "---",
        price: user.current_billing ? user.current_billing.unit_amount : 0,
      });
    }
  }, [user]);

  return (
    <div
      className={`bg-[#8487c3b2] rounded-lg p-5 flex flex-col gap-2 font-semibold ${className}`}
    >
      <p>Subscription Information</p>
      <div className="flex justify-between gap-4 max-sm:flex-col">
        <div className="flex flex-col gap-2 max-w-full flex-1">
          <p className="">Current subscription : {data.currentSubscription}</p>
          <div className="grid grid-cols-2 w-full">
            <p className="">
              Last payment : {formatDate(data.lastPaymentDate ?? null, "en")}
            </p>
            <p className="">
              Next payment : {formatDate(data.nextPaymentDate ?? null, "en")}{" "}
            </p>
          </div>
          <p className="">Price : {data.price} USD</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionInfo;
