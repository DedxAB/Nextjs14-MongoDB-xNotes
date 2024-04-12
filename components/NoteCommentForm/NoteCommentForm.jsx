"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { CustomInput } from "../ui/custom-input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { federo_font } from "@/utils/fonts";

const NoteCommentForm = ({ note }) => {
  const [comment, setComment] = useState("");

  const router = useRouter();
  const { data: session } = useSession();
  // console.log(session);

  const handelSubmitCommentForm = async (e) => {
    e.preventDefault();
    // console.log(comment);
    if (!session) {
      toast.error("You must be logged in to add a comment");
      return;
    }
    if (!comment) {
      toast.warning("Please add a comment before submitting");
      return;
    }
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

      toast.success("Comment added Successfully");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setComment("");
    }
  };

  const shortName = session?.user?.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <>
      <div className="border flex justify-start items-center gap-1 mb-3 rounded px-3 md:px-4 py-3">
        {/* Show the author image */}
        <div className="mr-2 py-1">
          <Avatar>
            <AvatarImage
              src={session?.user?.image || "/logo.png"}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback>{shortName}</AvatarFallback>
          </Avatar>
        </div>

        {/* Show the author name, username and user comment text */}
        <div className="w-full flex flex-col gap-1 md:gap-2">
          {/* Show the author name, username */}
          <div className={`flex flex-wrap items-center text-xs ${federo_font}`}>
            {/* name  */}
            <p className={`font-bold  mr-1`}>
              {session?.user?.name || <>DedxNotes</>}
            </p>

            {/* username */}
            <p className={`text-[#6b6e6e]`}>
              @{session?.user?.username || <>dedxnotes</>}
            </p>
          </div>

          {/* Show the user comment text*/}
          <div className="text-sm font-bold">
            <form onSubmit={handelSubmitCommentForm}>
              <CustomInput
                type="text"
                placeholder="Add a comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                name="comment"
                // required
                disabled={!session}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCommentForm;
