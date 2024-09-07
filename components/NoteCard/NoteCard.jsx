"use client";

import { Contact, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useState } from "react";
import { josefin_sans_font } from "@/utils/fonts";
import NoteDescription from "../NoteDescription/NoteDescription";
import SharePopup from "../SharePopup/SharePopup";
import MoreOptions from "../MoreOptions/MoreOptions";
import {
  CommentIcon,
  EmptyHeartIcon,
  RedHeartIcon,
  ShareIcon,
} from "@/app/assets/svgs/GeneralIcons";
import SaveNotes from "../SaveNotes/SaveNotes";
import { generateSlug } from "@/utils/slugGenerator";
import { cn } from "@/lib/utils";

const NoteCard = ({ note, noteAuthor: user }) => {
  const [updatedNote, setUpdatedNote] = useState(note);
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  // Get the first letter of the name to show in the avatar
  const shortName = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const handelLike = async (isLiked) => {
    if (!session) {
      toast.error("You need to sign in to like notes");
      return;
    }
    // Optimistically update the state
    setUpdatedNote((prevNote) => ({
      ...prevNote,
      likes: isLiked
        ? [...prevNote.likes, session?.user?.id]
        : prevNote.likes.filter((id) => id !== session?.user?.id),
    }));

    try {
      const res = await fetch(`/api/notes/${note?._id}/likes`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session?.user?.id, isLiked }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to like the note");
      }

      const { updatedNote } = await res.json();
      // Update the state with the server response
      setUpdatedNote(updatedNote);

      // Notification feature
      if (isLiked) {
        await fetch(`/api/notifications`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            type: "like",
            noteOwnerId: note?.author?._id,
            senderId: session?.user?.id,
            noteId: note?._id,
          }),
        });
      }
      router.refresh();
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      // Revert the state back if the server request failed
      setUpdatedNote((prevNote) => ({
        ...prevNote,
        likes: isLiked
          ? prevNote.likes.filter((id) => id !== session?.user?.id)
          : [...prevNote.likes, session?.user?.id],
      }));
    }
  };

  const handleShare = () => {
    setIsOpenShareModal(!isOpenShareModal);
  };

  return (
    <>
      <div className="border-t border-x flex justify-start gap-1 mb-3 md:mb-4 rounded-tr-xl rounded-tl-xl px-3 md:px-4 py-[.85rem] relative">
        {/* Show the author image */}
        <div className="pt-[5px] mr-2 flex flex-col justify-between items-center">
          <Link
            title={`View Profile of ${user?.name}`}
            href={`/user/${user?.username}/${user?._id}`}
          >
            <Avatar>
              <AvatarImage
                src={user?.image || "/logo.png"}
                referrerPolicy="no-referrer"
                alt={`Profile Image of ${user?.name}` || "DedxNotes"}
              />
              <AvatarFallback>{shortName}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between">
            {/* Show the author name, username */}
            <Link
              href={`/user/${user?.username}/${user?._id}`}
              className={cn("flex flex-wrap items-center text-xs mr-2 py-1", josefin_sans_font)}
            >
              {/* name  */}
              <p className={`font-bold mr-1 flex items-center gap-[2px]`}>
                <span>
                  {user?.isAdmin && (
                    <Contact className="w-3.5 md:w-3.5 h-3.5 md:h-3.5 pb-[.15rem]" />
                  )}
                </span>
                {user?.name}
              </p>

              {/* username */}
              <p className={`text-[#6b6e6e]`}>@{user?.username}</p>
            </Link>
            {/* More options */}
            {(session?.user?.id === user?._id || session?.user?.isAdmin) &&
              (pathName === `/user/${user?.username}/${user?._id}` ||
                pathName === `/admin/${user?._id}/details` ||
                pathName ===
                  `/note/${generateSlug(updatedNote?.title)}/${
                    updatedNote?._id
                  }`) && <MoreOptions noteData={updatedNote} />}
          </div>

          {/* Show the title and date */}
          <Link
            href={`/note/${generateSlug(updatedNote?.title)}/${
              updatedNote?._id
            }`}
          >
            {/* title  */}
            <h2 className={`text-lg md:text-xl font-bold`}>
              {updatedNote?.title}
            </h2>

            {/* date */}
            <div
              className={`pt-[.19rem] md:pt-1 flex text-xs flex-wrap justify-start items-center text-[#6b6e6e] ${josefin_sans_font}`}
            >
              <p className="mr-1">
                {
                  dayjs(updatedNote?.createdAt).format(
                    "MMM D, YYYY • hh : mm A"
                  ) // Mar 27, 2024
                }
              </p>

              {/* Show the edited date if updated */}
              {/* {contentUpdatedAt - createdAt > 1000 && (
                  <p className="flex justify-center items-center">
                    •&nbsp;
                    <PencilLine className="w-3 h-3 mr-1" />
                    <span>edited</span>
                  </p>
                )} */}
              <div>
                •&nbsp;
                <span
                  title={
                    updatedNote?.visibility === "private" ? "Private" : "Public"
                  }
                >
                  {updatedNote?.visibility === "private" ? "🔒" : "🌎"}
                </span>
              </div>
            </div>
          </Link>

          {/* Show the description */}
          <NoteDescription
            description={updatedNote?.description}
            note={updatedNote}
          />

          {/* Show the tags */}
          {updatedNote?.tags && updatedNote?.tags.length > 0 && (
            <div className="pt-1">
              {updatedNote?.tags.map((tag, index) => (
                <Link
                  href={`/result?q=${encodeURIComponent(tag)}`}
                  key={index}
                  className={`text-sm md:text-base  mr-2 cursor-pointer border px-2 py-[0.16rem] rounded inline-block my-1 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out`}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Show the likes and comments and weblink share  */}
          <div className={`flex gap-[.63rem] md:gap-3 mt-2 pt-1 items-center`}>
            {/* Likes  */}
            {updatedNote?.likes && (
              <div className="flex gap-1 cursor-pointer items-center transition-all duration-300 ease-in-out border hover:border-primary rounded-full p-2">
                {updatedNote?.likes?.includes(session?.user?.id) ? (
                  <div title="Unlike Note" onClick={() => handelLike(false)}>
                    <RedHeartIcon className="w-5 h-5 cursor-pointer text-primary" />
                  </div>
                ) : (
                  <div title="Like Note" onClick={() => handelLike(true)}>
                    <EmptyHeartIcon className="w-5 h-5 cursor-pointer" />
                  </div>
                )}
                <span className="text-sm font-bold">
                  {updatedNote?.likes?.length}
                </span>
              </div>
            )}
            {/* Comments */}
            <Link
              title="View Comments"
              href={`/note/${generateSlug(updatedNote?.title)}/${
                updatedNote?._id
              }`}
              className="flex gap-1 items-center transition-all duration-300 ease-in-out border hover:border-primary rounded-full p-2"
            >
              <CommentIcon className="w-5 h-5 cursor-pointer" />
              <span className="text-sm font-bold">
                {note?.comments?.length}
              </span>
            </Link>
            {/* Website link */}
            {updatedNote?.websiteLink && (
              <Link
                title="Visit Website"
                href={updatedNote?.websiteLink}
                target="_blank"
                rel="noopener"
                className="border rounded-full p-[.63rem] hover:border-primary transition-all duration-300 ease-in-out"
              >
                <ExternalLink className="w-4 h-4 " />
              </Link>
            )}
            {/* Share */}
            <div
              title="Share Note"
              onClick={handleShare}
              className="cursor-pointer transition-all duration-300 ease-in-out border rounded-full p-[.63rem] hover:border-primary"
            >
              <ShareIcon className={`w-4 h-4`} />
            </div>

            {/* Save Notes */}
            <div
              title="Save Note"
              className="cursor-pointer transition-all duration-300 ease-in-out border rounded-full p-[.63rem] hover:border-primary"
            >
              <SaveNotes note={updatedNote} />
            </div>

            {isOpenShareModal && (
              <SharePopup updatedNote={updatedNote} handleShare={handleShare} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
