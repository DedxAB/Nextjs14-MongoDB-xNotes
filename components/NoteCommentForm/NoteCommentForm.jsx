"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { CustomInput } from "../ui/custom-input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const NoteCommentForm = ({ note }) => {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const { data: session } = useSession();
  // console.log(session);

  const handelSubmitCommentForm = async (e) => {
    e.preventDefault();
    // console.log(comment);
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
        throw new Error("Failed to add comment" || res.json());
      }

      toast.success("Comment added successfully");
      router.refresh();
    } catch (error) {
      console.log(error.message);
    } finally {
      setComment("");
    }
  };

  const shortName = session?.user.name
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
              src={session?.user.image}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback>{shortName}</AvatarFallback>
          </Avatar>
        </div>

        {/* Show the author name, username and user comment text */}
        <div className="w-full flex flex-col gap-1">
          {/* Show the author name, username */}
          <div className="flex flex-wrap items-center text-xs">
            <div className="flex flex-wrap items-center">
              {/* name  */}
              <p className={`font-bold text-xs mr-1`}>{session?.user.name}</p>

              {/* username */}
              <p className={`text-gray-500 text-xs`}>
                @{session?.user?.username}
              </p>
            </div>
          </div>

          {/* Show the user comment text*/}
          <div className="text-sm font-bold text-gray-500">
            <form onSubmit={handelSubmitCommentForm}>
              <CustomInput
                type="text"
                placeholder="Add a comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                name="comment"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCommentForm;
