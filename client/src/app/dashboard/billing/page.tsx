'use client';
import RadialProgressBar from "@/components/RadialProgressBar";
import SubscriptionInfo from "./components/SubscriptionInfo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { redirect } from "next/navigation";
import { billing } from "@/schemas/billing";
import { formatDate } from "@/lib/utils";
import { Paginate } from "@/schemas/laravel-pagination-types";
import createAxios from "@/lib/Axios";
import PaginationWithApi from "@/components/PaginationWithApi";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";



export default  function Billing({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const axios = createAxios();
  const { user } = useAuth();


  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [billings, setBillings] = useState<Paginate<billing> | null>(null);

  const fetchBillings = async () => {
    try {
      const response = await axios.get(`/billings?page=${page}&perPage=${perPage}`);
      setBillings(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchBillings();
  }, [page, perPage]);
    
  let diffDays = 0;
  let percent = 0;
  if (user && user.details) {
    diffDays =  user.details?.days ? parseInt(user.details?.days) : 0;
    percent = user.details?.percentage ? parseInt(user.details?.percentage) : 0; 
  }

  const tableRowStyles = " border-none hover:bg-transparent ";
  const tableHeadStyles = " text-center text-[#F5F5F5] border-b border-r px-2 ";
  const tableCellStyles = " text-center text-[#F5F5F5] border-r p-2 ";

  return (
    <div className="flex flex-col gap-5">
      <h1>Billing</h1>
      <div className="flex flex-col gap-4 w-full mb-10 bg-[#171b5e] rounded-xl p-4">
        <div className="flex flex-wrap gap-4 w-full">
          <SubscriptionInfo className="flex-1" user={user} />

          <RadialProgressBar
            progress={percent}
            value={diffDays}
            type="days"
            message="Days remaining"
          />
        </div>
      </div>

      <Table className="max-w-screen overflow-x-scroll rounded-xl bg-[#171b5e]">
        <TableHeader>
          <TableRow className={tableRowStyles}>
            <TableHead
              className={`${tableHeadStyles} text-start min-w-[9.5rem] max-w-[11rem]`}
            >
              <p>Discription</p>
            </TableHead>
            <TableHead className={`${tableHeadStyles} w-[7rem]`}>
              <p>Amount</p>
            </TableHead>
            <TableHead className={`${tableHeadStyles} `}>
              <p>Currency</p>
            </TableHead>
            <TableHead className={`${tableHeadStyles} w-[7rem]`}>
              <p>Status</p>
            </TableHead>
            <TableHead className={`${tableHeadStyles} px-6 border-r-0`}>
              <p>Date</p>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {billings && billings.data.length > 0 ? (
            billings.data.map((item, index) => (
              <TableRow key={index} className={tableRowStyles}>
                <TableCell className={`${tableCellStyles} text-start`}>
                  <p className="line-clamp-2">{item.description}</p>
                </TableCell>
                <TableCell className={tableCellStyles}>
                  <p>{item.currency}</p>
                </TableCell>
                <TableCell className={tableCellStyles}>
                  <p>{item.unit_amount}</p>
                </TableCell>
                <TableCell className={tableCellStyles}>
                  <p>{item.status}</p>
                </TableCell>
                <TableCell className={`${tableCellStyles} px-6 border-r-0`}>
                  <p>{formatDate(item.date_created ?? null, "en")}</p>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className={tableRowStyles}>
              <TableCell colSpan={5} className="w-full h-24 text-center">
                <p>No billings.</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
        <PaginationWithApi
        links={billings?.links ?? []}
        displayPerPage={true}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
      />
    </div>
  );
}
