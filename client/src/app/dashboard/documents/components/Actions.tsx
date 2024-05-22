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

export function Actions({ itemId }: { itemId: number }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const axios = createAxios();

  const handleDeleteModel = async () => {
    try {
      const response = await axios.delete(`/documents/destroy/${itemId}`);
      if (response.status === 200) {
        toast({ title: "Document deleted successfully." });
        router.push("/dashboard/documents");
      } else {
        toast({ title: "Failed to delete document." });
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      toast({ title: "An error occurred while deleting document." });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="">
          <Button size="icon" variant="link" className=" hover:border-2 hover:border-[#7975ac] bg-transparent">
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
