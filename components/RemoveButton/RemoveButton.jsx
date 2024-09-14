"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
import { josefin_sans_font } from "@/utils/fonts";
import { generateSlug } from "@/utils/slugGenerator";
import { DeleteIcon } from "@/app/assets/svgs/GeneralIcons";

const RemoveButton = ({ id, title }) => {
  const [conformationMessage, setConformationMessage] = useState(false);

  const router = useRouter();
  const pathName = usePathname();

  const removeNote = async () => {
    if (conformationMessage) {
      const toastId = toast.loading("Deleting Note...");
      try {
        const res = await fetch(`/api/notes?id=${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Error deleting note");
        }

        if (pathName === `/note/${generateSlug(title)}/${id}`) {
          router.push("/");
          router.refresh();
        } else {
          router.refresh();
        }

        toast.success("Note Deleted Successfully.", {
          id: toastId,
        });
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
          <div
            onClick={() => setConformationMessage(true)}
            className="flex items-center justify-start cursor-pointer gap-2"
          >
            <DeleteIcon className="w-4 h-4 text-primary" />
            <span>Delete</span>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className={`font-bold`}>
              This action cannot be undone. You are about to delete this note :{" "}
              <span className={`text-primary ${josefin_sans_font}`}>
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
