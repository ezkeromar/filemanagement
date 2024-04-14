import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { newDocumentSchema ,newDocument } from "@/schemas/document";
import { zodResolver } from "@hookform/resolvers/zod";
import createAxios from "@/lib/Axios";

interface StoreDocumentProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function StoreDocument({
  isOpen,
  onClose,
}: StoreDocumentProps) {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const axios = createAxios();

  const handleClose = () => {
    onClose && onClose();
  };

  const form = useForm<newDocument>({
    resolver: zodResolver(newDocumentSchema),
    defaultValues: {
      file: null,
    },
  });

  const onSubmit = async (data: newDocument) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("file", file as File);
    try {
      const response = await axios.post("/documents/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
      });
      if (response.status === 200) {
        setIsSubmitting(false);
        form.reset();
        setProgress(0);
        handleClose();
      } else {
        setIsSubmitting(false);
        setProgress(0);
        setError("Failed to upload document.");
      }
    } catch (error) {
      setIsSubmitting(false);
      setProgress(0);
      setError("An error occurred while uploading document.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#171b5e]">
          <p className="-mt-4">Upload Document</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full  bg-[#171b5e] rounded-xl px-4 "
          >
            <DialogHeader>
              <DialogDescription>
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <p>
                          Document <span className="text-primary">*</span>
                        </p>
                      </FormLabel>
                      <FormControl>

                        <Input
                          className="cursor-pointer"
                          id="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              form.setValue("file", file);
                              setFile(file);
                            }
                          }}
                          type="file"
                        />
                      </FormControl>
                        {error.length > 0 && (
                          <p className="text-red-500 text-sm">{error}</p>
                        )}
                        {progress > 0 && progress < 100 && (
                          <Progress value={progress} className="w-[60%]" />
                        )}
                      <FormMessage className="font-normal text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                className="bg-[#74768C] text-white hover:bg-[#414360]"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                disabled={!form.formState.isDirty && !form.formState.isValid}
                type="submit"
                className="primary-bg-gradient gap-1"
              >
                <Loader2
                  className={isSubmitting ? "animate-spin" : "hidden"}
                  size={20}
                />
                {isSubmitting ? <>Loading...</> : <>Save</>}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
