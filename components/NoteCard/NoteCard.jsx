"use client";

import { ExternalLink, Pencil, PencilLine } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import RemoveButton from "../RemoveButton/RemoveButton";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useState } from "react";
import {
  inter_font,
  josefin_sans_font,
  source_code_pro_font,
} from "@/utils/fonts";
import NoteDescription from "../NoteDescription/NoteDescription";

const NoteCard = ({ note, user }) => {
  const [updatedNote, setUpdatedNote] = useState(note);
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  // Get the first letter of the name to show in the avatar
  const shortName = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  // Get the contentUpdatedAt and createdAt date for comparison the note is updated or not
  const contentUpdatedAt = new Date(updatedNote?.contentUpdatedAt).getTime();
  const createdAt = new Date(updatedNote?.createdAt).getTime();

  const handelLike = async (isLiked) => {
    if (!session) {
      toast.error("Please Login to like Notes");
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
      // console.log(updatedNote);
      // Update the state with the server response
      setUpdatedNote(updatedNote);
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

  return (
    <>
      {/* Note card 03notecard branch */}
      <div className="border flex justify-start gap-1 mb-3 md:mb-4 rounded-md px-3 md:px-4 py-[.85rem]">
        {/* Show the author image */}
        <div className="mr-2 pt-[5px]">
          <Link href={`/profile/${user?._id}/details`}>
            <Avatar>
              <AvatarImage
                src={user?.image || "/logo.png"}
                referrerPolicy="no-referrer"
                alt={`Profile Image of ${user?.name}`}
              />
              <AvatarFallback>{shortName}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <div className="w-full">
          {/* Show the author name, username */}
          <Link
            href={`/profile/${user?._id}/details`}
            className={`flex flex-wrap items-center text-xs mr-2 py-1 ${josefin_sans_font}`}
          >
            {/* name  */}
            <p className={`font-bold mr-1`}>{user?.name}</p>

            {/* username */}
            <p className={`text-[#6b6e6e] `}>@{user?.username}</p>
          </Link>

          {/* Title and Date div  */}
          <div className="flex justify-between items-start gap-1">
            {/* Show the title and date */}
            <Link href={`/note/${updatedNote?._id}/details`}>
              {/* title  */}
              <h2
                className={`text-lg md:text-xl font-bold ${source_code_pro_font}`}
              >
                {updatedNote?.title}
              </h2>

              {/* date */}
              <div
                className={`md:pt-1 flex text-xs flex-wrap justify-start items-center text-[#6b6e6e] ${josefin_sans_font}`}
              >
                <p className="mr-1">
                  {
                    dayjs(updatedNote?.createdAt).format(
                      "MMM D, YYYY | hh : mm A"
                    ) // Mar 27, 2024
                  }
                </p>

                {/* Show the edited date if updated */}
                {contentUpdatedAt - createdAt > 1000 && (
                  <p className="flex justify-center items-center">
                    &middot;&nbsp;
                    <PencilLine className="w-3 h-3 mr-1" />
                    <span>edited</span>
                  </p>
                )}
              </div>
            </Link>

            {/* Show this in the Profile page only */}
            {/* Show Edit and remove button based on user who created this note */}
            {(session?.user?.id === user?._id || session?.user?.isAdmin) &&
              (pathName === `/profile/${user?._id}/details` ||
                pathName === `/admin/${user?._id}/details`) && (
                <div className="min-w-20">
                  {/* Add the edit button */}
                  <Link href={`/edit-note/${updatedNote?._id}`}>
                    <Button variant="outline" size="icon" className="mr-2">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>

                  {/* Add the remove button */}
                  <RemoveButton
                    id={updatedNote?._id}
                    title={updatedNote?.title}
                  />
                </div>
              )}
          </div>

          {/* Show the description */}
          <NoteDescription
            description={updatedNote?.description}
            noteId={updatedNote?._id}
          />

          {/* Show the tags */}
          {updatedNote?.tags && updatedNote?.tags.length > 0 && (
            <div className="pt-1">
              {updatedNote?.tags.map((tag, index) => (
                <Link
                  href={`/result?q=${encodeURIComponent(tag)}`}
                  key={index}
                  className={`text-sm md:text-base ${source_code_pro_font} mr-2 cursor-pointer border px-2 py-[0.16rem] rounded inline-block my-1 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out`}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Show the likes and comments and weblink */}
          <div
            className={`${source_code_pro_font} flex gap-5 mt-2 pt-1 items-center`}
          >
            {/* Likes  */}
            {updatedNote?.likes && (
              <div className="flex gap-1 items-center">
                {updatedNote?.likes?.includes(session?.user?.id) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 cursor-pointer text-primary"
                    onClick={() => handelLike(false)}
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 cursor-pointer text-primary"
                    onClick={() => handelLike(true)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                )}
                <span className="text-sm font-bold">
                  {updatedNote?.likes.length} Likes
                </span>
              </div>
            )}
            {/* Comments */}
            <Link
              href={`/note/${updatedNote?._id}/details`}
              className="flex gap-1 items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>
              <span className="text-sm font-bold">
                {updatedNote?.comments?.length} Comments
              </span>
            </Link>
            {updatedNote?.websiteLink && (
              <Link href={updatedNote?.websiteLink} target="_blank">
                <ExternalLink className="w-4 h-4 text-primary" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCard;

/*
  note:
  {
    _id: '660dbaca2638ddeed21ca063',
    title: 'Cloudinary',
    description: 'Streamline media management and improve user experience by automatically delivering images and videos, enhanced and optimized for every user.',
    author: {
      _id: '65fda3f22f7ede6787e9f5af',
      email: 'arnab.iguniverse@gmail.com',
      name: 'Arnab Bhoumik',
      image: 'https://lh3.googleusercontent.com/a/ACg8ocI1XTigSLw4VGEwGPKzRgn7G0h94GUPOupylNyMa9nBrA=s96-c',
      username: 'arnab.iguniverse',
      createdAt: '2024-03-22T15:29:54.498Z',
      updatedAt: '2024-04-04T02:35:44.055Z',
      __v: 0,
      notes: [Array],
      bio: 'Love the way you are | Student CSE | Love photography | Love playing cricket | Love watching Netflix.'        
    },
    likes: [],
    comments: [],
    tags: [ 'development' ],
    websiteLink: 'https://cloudinary.com/',
    contentUpdatedAt: '2024-04-03T20:23:38.182Z',
    createdAt: '2024-04-03T20:23:38.183Z',
    updatedAt: '2024-04-03T20:23:38.183Z',
    __v: 0
  }
*/
