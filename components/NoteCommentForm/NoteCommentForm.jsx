"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import { CustomInput } from "../ui/custom-input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { inter_font, josefin_sans_font } from "@/utils/fonts";
import { Button } from "../ui/button";
import { SendHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";

const NoteCommentForm = ({ note, currentUser }) => {
  const [comment, setComment] = useState("");

  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmitCommentForm = async () => {
    if (!session) {
      toast.error("You must be logged in to add a comment");
      return;
    }
    if (!comment) {
      toast.warning("Please add a comment before submitting");
      return;
    }
    const toastId = toast.loading("Adding Comment...");
    try {
      const res = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: comment,
          author: session?.user?.id,
          noteId: note?._id,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add comment");
      }

      router.refresh();
      toast.success("Comment added Successfully.", {
        id: toastId,
      });
    } catch (error) {
      toast.error(error.message, { id: toastId });
      console.log(error);
    } finally {
      setComment("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
      handleSubmitCommentForm();
    }
  };

  // console.log(currentUser);

  const shortName = currentUser?.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <>
      <div className="border flex justify-start items-center gap-1 mb-3 rounded-lg px-3 md:px-4 py-3">
        {/* Show the author image */}
        <div className="mr-2 py-1">
          <Avatar>
            <AvatarImage
              src={currentUser?.image || "/logo.png"}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback>{shortName || "DN"}</AvatarFallback>
          </Avatar>
        </div>

        {/* Show the author name, username and user comment text */}
        <div className="w-full flex flex-col gap-1 md:gap-2">
          {/* Show the author name, username */}
          <div
            className={`flex flex-wrap items-center text-xs ${josefin_sans_font}`}
          >
            {/* name  */}
            <p className={`font-bold  mr-1`}>
              {currentUser?.name || <>DedxNotes</>}
            </p>

            {/* username */}
            <p className={`text-[#6b6e6e]`}>
              @{currentUser?.username || <>dedxnotes</>}
            </p>
          </div>

          {/* Show the user comment text*/}
          <div className="text-sm font-bold flex justify-between items-center gap-2">
            <CustomInput
              type="text"
              placeholder="Add a comment here..."
              className={`${inter_font} font-normal md:text-sm`}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              name="comment"
              disabled={!session}
              onKeyDown={handleKeyDown}
            />
            <Button
              size="icon"
              className={`h-8 w-10 md:w-9`}
              disabled={!session || !comment}
              onClick={handleSubmitCommentForm}
            >
              <SendHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCommentForm;
