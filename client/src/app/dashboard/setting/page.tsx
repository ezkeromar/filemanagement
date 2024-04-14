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

export default  function Setting() {
  const { user } = useAuth();
  const axios = createAxios();
  const { toast } = useToast();

  const [SecretKeys, setSecretKeys] = useState<Paginate<any> | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isLoding, setIsLoading] = useState(true);
  const [isLodingAddKey, setIsLoadingAddKey] = useState(false);

  const tableRowStyles = "border-none hover:bg-transparent";
  const tableHeadStyles = "text-center text-[#F5F5F5] border-b border-r px-2";
  const tableCellStyles = "text-center text-[#F5F5F5] border-r p-2";

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
      <h1 className="relative group">
        Settings
        <span className="absolute content-[''] bg-white w-[10rem] h-[1.5px] left-0 bottom-[-0.75rem] rounded-xl"></span>
      </h1>
      <ProfileForm user={user} />

      <Table className="max-w-screen overflow-x-scroll rounded-xl bg-[#171b5e]">
        <TableHeader>
          <TableRow className={tableRowStyles}>
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
                <Loader2 size={14} color="#7c3aed" className="animate-spin" />
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
                <TableCell
                  className={`${tableRowStyles} px-6 border-r-0 text-center `}
                >
                  <Actions itemId={item.id} refreshData={fetchSecretKeys} />
                </TableCell>
              </TableRow>
            ))}
          {!SecretKeys?.data.length && !isLoding && (
            <TableRow className={tableRowStyles}>
              <TableCell colSpan={3} className="text-center text-[#F5F5F5] p-4">
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
  );
}
