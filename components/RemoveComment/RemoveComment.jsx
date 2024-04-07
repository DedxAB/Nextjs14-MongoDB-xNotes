"use client";
import { Trash2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

const RemoveComment = ({ comment, note }) => {
  const { data: session } = useSession();
  //   console.log(comment);
  //   console.log(note);
  if (
    session?.user?.id === comment?.author?._id ||
    session?.user?.id === note?.author?._id
  ) {
    return (
      <>
        <Button variant={`outline`} size="icon">
          <Trash2 className="w-4 text-red-500" />
        </Button>
      </>
    ); // return the remove comment button
  } else {
    return null;
  }
};

export default RemoveComment;
