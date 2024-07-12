"use client";

import { ExternalLink, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import RemoveButton from "../RemoveButton/RemoveButton";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useState } from "react";
import { josefin_sans_font } from "@/utils/fonts";
import NoteDescription from "../NoteDescription/NoteDescription";
import SharePopup from "../SharePopup/SharePopup";

const NoteCard = ({ note, user }) => {
  const [updatedNote, setUpdatedNote] = useState(note);
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  // console.log(note.author._id);
  // console.log(session?.user);

  // Get the first letter of the name to show in the avatar
  const shortName = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  // Get the contentUpdatedAt and createdAt date for comparison the note is updated or not
  // const contentUpdatedAt = new Date(updatedNote?.contentUpdatedAt).getTime();
  // const createdAt = new Date(updatedNote?.createdAt).getTime();

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
      {/* Note card 03notecard branch */}
      <div className="border-t border-x flex justify-start gap-1 mb-3 md:mb-4 rounded-tr-xl rounded-tl-xl px-3 md:px-4 py-[.85rem] relative">
        {/* Show the author image */}
        <div className="pt-[5px] mr-2 flex flex-col justify-between items-center">
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
          <>
            {(session?.user?.id === user?._id || session?.user?.isAdmin) &&
              (pathName === `/profile/${user?._id}/details` ||
                pathName === `/admin/${user?._id}/details`) && (
                <>
                  {/* Add the edit button */}
                  <Link href={`/edit-note/${updatedNote?._id}`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full h-[2.35rem] w-[2.35rem]"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
                </>
              )}
          </>
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center">
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
          </div>

          {/* Title and Date div  */}
          <div className="flex justify-between items-start gap-1">
            {/* Show the title and date */}
            <Link href={`/note/${updatedNote?._id}/details`}>
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
                  <span>
                    {updatedNote?.visibility === "private"
                      ? "Only me"
                      : "Public"}
                  </span>
                </div>
              </div>
            </Link>
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
              <div className="flex gap-1 items-center transition-all duration-300 ease-in-out border hover:border-primary rounded-full p-2">
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
                    className="w-5 h-5 cursor-pointer "
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
                  {updatedNote?.likes?.length}
                </span>
              </div>
            )}

            {/* Comments */}
            <Link
              href={`/note/${updatedNote?._id}/details`}
              className="flex gap-1 items-center transition-all duration-300 ease-in-out border hover:border-primary rounded-full p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>
              <span className="text-sm font-bold">
                {note?.comments?.length}
              </span>
            </Link>

            {/* Website link */}
            {updatedNote?.websiteLink && (
              <Link
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
              onClick={handleShare}
              className="cursor-pointer transition-all duration-300 ease-in-out border rounded-full p-[.63rem] hover:border-primary"
            >
              {/* <Share2 className="w-4 h-4 " /> */}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill={"none"}
              >
                <path
                  d="M19.1918 9.44118L17.2265 7.46899C15.8104 6.04799 15.2554 5.28357 14.4886 5.55381C13.5325 5.89077 13.8472 8.01692 13.8472 8.73471C12.3607 8.73471 10.8152 8.60259 9.34985 8.87787C4.51259 9.78664 3 13.7153 3 18C4.3691 17.0302 5.73683 15.997 7.38233 15.5476C9.43637 14.9865 11.7304 15.2542 13.8472 15.2542C13.8472 15.972 13.5325 18.0982 14.4886 18.4351C15.3575 18.7413 15.8104 17.9409 17.2265 16.5199L19.1918 14.5477C20.3973 13.338 21 12.7332 21 11.9945C21 11.2558 20.3973 10.6509 19.1918 9.44118Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {(session?.user?.id === user?._id || session?.user?.isAdmin) &&
              (pathName === `/profile/${user?._id}/details` ||
                pathName === `/admin/${user?._id}/details`) && (
                <>
                  <RemoveButton
                    id={updatedNote?._id}
                    title={updatedNote?.title}
                  />
                </>
              )}
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
