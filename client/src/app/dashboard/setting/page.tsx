"use client";

import { ProfileForm } from "./components/ProfileForm";
import useAuth from "@/hooks/useAuth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Paginate } from "@/schemas/laravel-pagination-types";
import CopyValue from "@/components/CopyValue";
import { useEffect, useState } from "react";
import createAxios from "@/lib/Axios";
import PaginationWithApi from "@/components/PaginationWithApi";
import { useToast } from "@/components/ui/use-toast";
import { Actions } from "./components/Actions";
import { formatDate } from "@/lib/utils";
import { Loader2, CirclePlus } from "lucide-react";
import { SidebarNav } from "./components/sidebar-nav";
import { Separator } from "@radix-ui/react-select";

export default function Setting() {
  const { user } = useAuth();
  const axios = createAxios();
  const { toast } = useToast();

  const [SecretKeys, setSecretKeys] = useState<Paginate<any> | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isLoding, setIsLoading] = useState(true);
  const [isLodingAddKey, setIsLoadingAddKey] = useState(false);

  const tableRowStyles =
    " hover:bg-transparent bg-slate-200 border-b border-r-0";
  const tableHeadStyles = " ";
  const tableCellStyles = "";

  const fetchSecretKeys = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/secret-keys?page=${page}&perPage=${perPage}`
      );
      setIsLoading(false);
      setSecretKeys(response.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const generateSecretKey = async () => {
    try {
      setIsLoadingAddKey(true);
      const response = await axios.post(`/secret-keys/generate`);
      setIsLoadingAddKey(false);
      if (response.status === 200) {
        toast({ title: "Secret key generated successfully." });
        fetchSecretKeys();
        return;
      }

      toast({
        title: "Failed to generate secret key.",
        variant: "destructive",
      });
    } catch (error) {
      console.log(error);
      setIsLoadingAddKey(false);
    }
  };

  useEffect(() => {
    fetchSecretKeys();
  }, [page, perPage]);

  return (
    <div className="flex flex-col gap-5">
      <div className="hidden space-y-6 p-3  md:block">
        <div className="space-y-0.5">
          <h2 className="text-xl font-bold tracking-tight text-blue-500">
            Settings
          </h2>
          {/* <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p> */}
        </div>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav />
        </aside>
        <div className="flex-1 lg:max-w-full">
          <div>
            <h3 className="text-lg font-medium">Profile</h3>
          </div>
          <hr className="border-t border-gray-200 my-3" />
          <ProfileForm user={user} />
          <Table className="max-w-screen overflow-x-scroll  rounded-3xl bg-slate-100 ">
            <TableHeader>
              <TableRow>
                <TableHead
                  className={`${tableHeadStyles} text-start min-w-[9.5rem] max-w-[11rem]`}
                >
                  <p>Secret Key</p>
                </TableHead>
                <TableHead className={tableHeadStyles}>
                  <p>Created At</p>
                </TableHead>
                <TableHead
                  className={`${tableHeadStyles} px-2 border-r-0 flex justify-center items-center`}
                >
                  {isLodingAddKey ? (
                    <Loader2
                      size={14}
                      color="#7c3aed"
                      className="animate-spin"
                    />
                  ) : (
                    <CirclePlus onClick={generateSecretKey} size={24} />
                  )}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!isLoding &&
                SecretKeys?.data.map((item: any, index: number) => (
                  <TableRow key={index} className={tableRowStyles}>
                    <TableCell className={tableCellStyles}>
                      <CopyValue value={item.secret_key} />
                    </TableCell>
                    <TableCell className={tableCellStyles}>
                      <p>{formatDate(item.created_at ?? null, "en")}</p>
                    </TableCell>
                    <TableCell className={`${tableRowStyles} `}>
                      <Actions itemId={item.id} refreshData={fetchSecretKeys} />
                    </TableCell>
                  </TableRow>
                ))}
              {!SecretKeys?.data.length && !isLoding && (
                <TableRow className={tableRowStyles}>
                  <TableCell
                    colSpan={3}
                    className="text-center text-[#F5F5F5] p-4"
                  >
                    No secret keys found.
                  </TableCell>
                </TableRow>
              )}
              {isLoding && (
                <TableRow className={tableRowStyles}>
                  <TableCell
                    colSpan={3}
                    className="text-center text-[#F5F5F5] p-4  flex justify-center items-center "
                  >
                    <Loader2
                      size={64}
                      color="#7c3aed"
                      className="animate-spin m-auto"
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <PaginationWithApi
            links={SecretKeys?.links ?? []}
            displayPerPage={true}
            onPageChange={setPage}
          />
        </div>
      </div>
      {/* <ProfileForm user={user} /> */}
    </div>
  );
}
