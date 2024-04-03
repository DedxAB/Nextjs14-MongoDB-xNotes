"use client";
import { Pencil, PencilLine } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import RemoveButton from "../RemoveButton/RemoveButton";
import dayjs from "dayjs";
import { Playfair_Display } from "next/font/google";
import { toast } from "sonner";
import { useState } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
});

const NoteCard = ({ note, user }) => {
  const [updatedNote, setUpdatedNote] = useState(note);
  const { data: session } = useSession();
  const pathName = usePathname();
  // const router = useRouter();
  // console.log(updatedNote);

  // Get the contentUpdatedAt and createdAt date for comparison the note is updated or not
  const contentUpdatedAt = new Date(updatedNote?.contentUpdatedAt).getTime();
  const createdAt = new Date(updatedNote?.createdAt).getTime();

  const handelLike = async (isLiked) => {
    // Optimistically update the state
    setUpdatedNote((prevNote) => ({
      ...prevNote,
      likes: isLiked
        ? [...prevNote.likes, session?.user?.id]
        : prevNote.likes.filter((id) => id !== session?.user?.id),
    }));

    try {
      const res = await fetch(`/api/topics/${note?._id}/likes`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session?.user?.id, isLiked }),
      });

      if (!res.ok) {
        throw new Error("Failed to like the note");
      }

      const updatedNote = await res.json();
      // Update the state with the server response
      setUpdatedNote(updatedNote.topic);
    } catch (error) {
      console.log(error);
      // Revert the state back if the server request failed
      setUpdatedNote((prevNote) => ({
        ...prevNote,
        likes: isLiked
          ? prevNote.likes.filter((id) => id !== session?.user?.id)
          : [...prevNote.likes, session?.user?.id],
      }));
    }
  };

  const truncateString = (str, num) => {
    return (
      <>
        {str?.length > num ? str.slice(0, num) : str}
        {str?.length > num && (
          <>
            <span>... </span>
            <span className="bg-gradient-to-r from-blue-500 via-red-500 to-pink-300 bg-clip-text text-transparent cursor-pointer hover:underline">
              Show more
            </span>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <div className="border flex justify-start gap-1 mb-3 rounded px-3 md:px-4 py-3">
        {/* Show the author image */}
        <Link href={`/profile/${user?._id}`} className="mr-2 py-1">
          <Avatar>
            <AvatarImage src={user?.image} referrerPolicy="no-referrer" />
          </Avatar>
          {/* <MyImage src={user?.image} /> */}
        </Link>
        <div className="w-full">
          {/* Show the author name, username */}
          <div className="flex flex-wrap items-center text-xs">
            <Link
              href={`/profile/${user?._id}`}
              className="flex flex-wrap items-center mr-2 py-1"
            >
              {/* name  */}
              <p className={`font-bold mr-1`}>{user?.name}</p>

              {/* username */}
              <p className={`text-gray-500`}>@{user?.username}</p>
            </Link>
          </div>

          {/* Title and Date div  */}
          <div className="flex justify-between items-center gap-1">
            {/* Show the title and date */}
            <Link href={`/note/${updatedNote?._id}/details`}>
              {/* title  */}
              <h2 className={`text-lg md:text-xl font-bold hover:underline`}>
                {updatedNote?.title}
              </h2>

              {/* date */}
              <div className="flex text-xs flex-wrap justify-start items-center text-[#6b6e6e]">
                <h2 className="mr-2">
                  {
                    dayjs(updatedNote?.createdAt).format(
                      "MMM D, YYYY | hh : mm A"
                    ) // Mar 27, 2024
                  }
                </h2>
                {/* Show the edited date if updated */}
                {/* {alert(updatedNote?.createdAt)} */}
                {contentUpdatedAt - createdAt > 1000 && (
                  <div className="flex items-center">
                    <PencilLine className="w-3 mr-1" />
                    <p>edited</p>
                  </div>
                )}
              </div>
            </Link>

            {/* Show Edit and remove button based on user who created this note */}
            {/* {alert(session?.user?.id)} */}
            {session?.user?.id === updatedNote?.author &&
              pathName === `/profile/${user?._id}` && (
                <div className="min-w-20">
                  {/* Add the edit button */}
                  <Link href={`/edit-note/${updatedNote?._id}`}>
                    <Button variant="outline" size="icon" className="mr-2">
                      <Pencil className="w-4" />
                    </Button>
                  </Link>
                  {/* Add the remove button */}
                  <RemoveButton id={updatedNote?._id} />
                </div>
              )}
          </div>

          {/* Show the description */}
          <Link href={`/note/${updatedNote?._id}/details`}>
            <div className="flex justify-between items-cente mt-1">
              <h2 className="text-sm md:text-base font-bold py-1">
                {pathName === `/note/${updatedNote?._id}/details`
                  ? updatedNote?.description
                  : truncateString(updatedNote?.description, 115)}
              </h2>
            </div>
          </Link>
          {/* Show the tags */}
          <div className="mt-1">
            <p
              className={`text-sm hover:underline cursor-pointer ${playfair.className} inline-block`}
            >
              #nextjs
            </p>
          </div>

          {/* Show the likes and comments */}
          <div className="flex gap-5 mt-2 py-2">
            {/* Likes  */}
            <div className="flex gap-1 items-center">
              {updatedNote?.likes.includes(session?.user?.id) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-red-500 cursor-pointer"
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
                  className="w-5 h-5 cursor-pointer"
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

            {/* Comments */}
            <div className="flex gap-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>
              <span className="text-sm font-bold">5 Comments</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
