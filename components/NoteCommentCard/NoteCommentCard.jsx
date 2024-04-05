import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const NoteCommentCard = ({ comment }) => {
  let shortName = comment?.author?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <>
      <div className="border flex justify-start items-center gap-3 mb-3 rounded px-3 md:px-4 py-2">
        {/* Show the author image */}
        <Link href={`/profile/${comment?.author?._id}`} className="">
          <Avatar>
            <AvatarImage
              src={comment?.author?.image}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback>{shortName} </AvatarFallback>
          </Avatar>
        </Link>

        {/* Show the author name, username and user comment text */}
        <div className="w-full flex flex-col gap-1">
          {/* Show the author name, username */}
          <div className="flex flex-wrap items-center text-xs">
            <Link
              href={`/profile/${comment?.author?._id}`}
              className="flex flex-wrap items-center mr-2"
            >
              {/* name  */}
              <p className={`font-bold text-xs mr-1`}>
                {comment?.author?.name}
              </p>

              {/* username */}
              <p className={`text-gray-500 text-xs`}>
                @{comment?.author?.username}
              </p>
            </Link>
          </div>

          {/* Show the user comment text*/}
          <div className="text-sm font-bold">
            <p className="text-sm">{comment?.text}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCommentCard;
