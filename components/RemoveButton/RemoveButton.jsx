"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { source_code_pro_font } from "@/utils/fonts";

const RemoveButton = ({ id, title }) => {
  const [conformationMessage, setConformationMessage] = useState(false);

  const router = useRouter();

  const removeNote = async () => {
    if (conformationMessage) {
      const toastId = toast.loading("Deleting Note...");
      try {
        const res = await fetch(`/api/notes?id=${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error deleting note");
        }
        toast.success("Note Deleted Successfully.", {
          id: toastId,
        });
        router.refresh();
      } catch (e) {
        toast.error(e.message, {
          id: toastId,
        });
        console.log(e.message);
      }
      setConformationMessage(false);
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            onClick={() => setConformationMessage(true)}
            variant="outline"
            size="icon"
            className="rounded-full h-[2.35rem] w-[2.35rem]"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className={`font-bold`}>
              This action cannot be undone. You are about to delete this note :{" "}
              <span className={`text-primary ${source_code_pro_font}`}>
                {title}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className={`font-bold`}
              onClick={() => setConformationMessage(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className={`font-bold`} onClick={removeNote}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RemoveButton;
