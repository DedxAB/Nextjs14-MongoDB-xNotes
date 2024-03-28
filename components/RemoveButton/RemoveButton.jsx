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

const RemoveButton = ({ id }) => {
  const router = useRouter();
  const [conformationMessage, setConformationMessage] = useState(false);

  const removeTopic = async () => {
    if (conformationMessage) {
      try {
        const res = await fetch(`/api/topics?id=${id}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Error deleting note");
        toast.success("Note Deleted Successfully.");
        router.refresh();
      } catch (e) {
        toast.error("Failed to Delete Note.");
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
          >
            <Trash2 className="w-4 text-red-500" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className={`font-bold`}>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className={`font-bold`}
              onClick={() => setConformationMessage(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className={`font-bold`} onClick={removeTopic}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RemoveButton;
