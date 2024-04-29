"use client";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
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
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { source_code_pro_font } from "@/utils/fonts";

const RemoveComment = ({ comment, note }) => {
  const [conformationMessage, setConformationMessage] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  const deleteComment = async (id) => {
    if (conformationMessage) {
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
          throw new Error(errorData.message || "Falied to Delete Comment.");
        }
        toast.success("Comment Deleted Successfully.", { id: toastId });
        router.refresh();
      } catch (e) {
        toast.error(e.message, { id: toastId });
        console.log(e.message);
      }
      setConformationMessage(false);
    }
  };

  if (
    session?.user?.id === comment?.author?._id ||
    session?.user?.id === note?.author?._id ||
    session?.user?.isAdmin
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
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className={`font-bold`}>
                This action cannot be undone. You are about to delete this
                comment :{" "}
                <span className={`text-primary ${source_code_pro_font}`}>
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
