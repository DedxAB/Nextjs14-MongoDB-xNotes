"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { josefin_sans_font } from "@/utils/fonts";
import { DeleteIcon } from "@/app/assets/svgs/GeneralIcons";

import { Button } from "../ui/button";
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

const RemoveComment = ({ comment, note }) => {
  const [conformationMessage, setConformationMessage] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  const deleteComment = async (id) => {
    if (conformationMessage) {
      if (!session) {
        return toast.error("You need to login to delete a comment.");
      }
      const toastId = toast.loading("Deleting Comment...");
      try {
        const res = await fetch(`/api/comments/delete/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ noteId: note._id }),
        });
        const errorData = await res.json();
        if (!res.ok) {
          throw new Error(errorData.error || "Failed to Delete Comment.");
        }
        router.refresh();
        toast.success("Comment Deleted Successfully.", { id: toastId });
      } catch (e) {
        toast.error(e.message, { id: toastId });
        console.log(e.message);
      }
      setConformationMessage(false);
    }
  };

  if (
    session &&
    (session?.user?.id === comment?.author?._id ||
      session?.user?.id === note?.author?._id ||
      session?.user?.isAdmin)
  ) {
    return (
      <>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              onClick={() => setConformationMessage(true)}
              variant="outline"
              size="icon"
            >
              <DeleteIcon className="w-4 h-4 text-primary" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className={`font-bold`}>
                This action cannot be undone. You are about to delete this
                comment :{" "}
                <span className={`text-primary ${josefin_sans_font}`}>
                  {comment?.text}
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
              <AlertDialogAction
                className={`font-bold`}
                onClick={() => deleteComment(comment._id)}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  } else {
    return null;
  }
};

export default RemoveComment;
