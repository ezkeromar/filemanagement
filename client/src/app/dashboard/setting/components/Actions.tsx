"use client";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";
import { useState } from "react";
import createAxios from "@/lib/Axios";

export function Actions({ itemId , refreshData}: { itemId: number, refreshData: () => void }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const axios = createAxios();

  const handleDeleteModel = async () => {
    try {
      const response = await axios.delete(`/secret-keys/destroy/${itemId}`);
      if (response.status === 200) {
        toast({ title: "Secret key deleted successfully." });
        refreshData();
      } else {
        toast({ title: "Failed to delete secret key." });
      }
    } catch (error) {
      console.error("Error deleting secret key:", error);
      toast({ title: "An error occurred while deleting secret key." });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="hover:bg-[#7975ac]">
          <Button size="icon" className="bg-transparent hover:bg-[#7975ac]">
            <MoreHorizontal size={22} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#575a98]">
          <DropdownMenuItem
            className="hover:cursor-pointer hover:bg-[#7975ac]"
            onClick={() => setIsDeleteConfirmationOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmationDialog
        isOpen={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
        onDelete={handleDeleteModel}
      />
    </>
  );
}
