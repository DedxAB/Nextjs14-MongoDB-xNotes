"use client";

import { handleCheckSavedNote } from "@/actions/note.actions";
import { SaveIcon } from "@/app/assets/svgs/GeneralIcons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SaveNotes({ note }) {
  const { data: session } = useSession();
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSavedStatus = async () => {
      const { isSaved } = await handleCheckSavedNote(
        session?.user?.id,
        note?._id
      );
      setIsSaved(isSaved);
    };

    if (session?.user?.id && note?._id) {
      checkSavedStatus();
    }
  }, [note?._id, session?.user?.id]);

  const handleSave = async () => {
    if (!session) {
      toast.error("You need to sign in to save notes");
      return;
    }
    const toastId = toast.loading(`${isSaved ? "Unsaving" : "Saving"} note...`);
    try {
      const response = await fetch(`/api/saved-notes`, {
        method: isSaved ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          noteId: note?._id,
        }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      toast.success(`${isSaved ? "Note unsaved" : "Note saved"} successfully`, {
        id: toastId,
      });
      router.refresh();
      setIsSaved(!isSaved);
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
  };
  return (
    <div onClick={handleSave} title="Save Note">
      {!isSaved ? (
        <SaveIcon className={`w-4 h-4 text-foreground`} fill={"none"} />
      ) : (
        <SaveIcon className={`w-4 h-4 text-primary`} fill={"#E11D48"} />
      )}
    </div>
  );
}
