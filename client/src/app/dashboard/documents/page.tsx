"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Actions } from "./components/Actions";
import createAxios from "@/lib/Axios";
import PaginationWithApi from "@/components/PaginationWithApi";
import { useEffect, useState } from "react";
import { Document } from "@/schemas/document";
import { Paginate } from "@/schemas/laravel-pagination-types";
import CopyValue from "@/components/CopyValue";
import { StoreDocument } from "./components/StoreDocument";
import { CirclePlus, Loader2 } from "lucide-react";

export default function Documents() {
  const axios = createAxios();

  const [documents, setDocuments] = useState<Paginate<Document> | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false);
  const [isLoding, setIsLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/documents?page=${page}&perPage=${perPage}`
      );
      setIsLoading(false);
      setDocuments(response.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [page, perPage]);

  const closeDocumentDialog = () => {
    setIsDocumentDialogOpen(false);
    fetchDocuments();
  };

  const openDocumentDialog = () => {
    setIsDocumentDialogOpen(true);
  };

  const tableRowStyles = "border-none hover:bg-transparent";
  const tableHeadStyles = "text-center text-[#F5F5F5] border-b border-r px-2";
  const tableCellStyles = "text-center text-[#F5F5F5] border-r p-2";

  return (
    <div className="flex flex-col gap-5">
      <h1 className="relative group">
        Documents
        <span className="absolute content-[''] bg-white w-[10rem] h-[1.5px] left-0 bottom-[-0.75rem] rounded-xl"></span>
      </h1>
      <Table className="max-w-screen overflow-x-scroll rounded-xl bg-[#171b5e]">
        <TableHeader>
          <TableRow className={tableRowStyles}>
            <TableHead
              className={`${tableHeadStyles} text-start min-w-[9.5rem] max-w-[11rem]`}
            >
              <p>Document Name</p>
            </TableHead>
            {/* <TableHead className={tableHeadStyles}>
              <p>Path</p>
            </TableHead> */}
            <TableHead className={tableHeadStyles}>
              <p>URL</p>
            </TableHead>
            <TableHead
              className={`${tableHeadStyles} px-2 border-r-0 flex justify-center items-center`}
            >
              <CirclePlus onClick={openDocumentDialog} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { !isLoding && documents?.data.map((item: Document, index: number) => (
            <TableRow key={index} className={tableRowStyles}>
              <TableCell className={tableCellStyles}>
                <p>{item.name}</p>
              </TableCell>
              {/* <TableCell className={tableCellStyles}>
                <p>{item.path}</p>
              </TableCell> */}
              <TableCell className={tableCellStyles}>
                <CopyValue value={item.url} />
              </TableCell>
              <TableCell
                  className={`${tableRowStyles} px-6 border-r-0 text-center `}
                  >
                <Actions itemId={item.id} />
              </TableCell>
            </TableRow>
          ))}
          {!isLoding && !documents?.data.length && (
            <TableRow className={tableRowStyles}>
              <TableCell colSpan={4} className="w-full h-24 text-center">
                <p>No documents.</p>
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
        links={documents?.links ?? []}
        displayPerPage={true}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
      />
      <StoreDocument
        isOpen={isDocumentDialogOpen}
        onClose={closeDocumentDialog}
      />
    </div>
  );
}
