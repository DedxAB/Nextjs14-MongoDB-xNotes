import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import RemoveComment from "../RemoveComment/RemoveComment";

dayjs.extend(relativeTime);

const NoteCommentCard = ({ comment, note }) => {
  let shortName = comment?.author?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  const commentTime = dayjs(comment?.createdAt);
  const relativeTime = commentTime.fromNow();
  // console.log(relativeTime);

  return (
    <>
      <div className="border flex justify-start items-start gap-3 mb-3 rounded px-3 md:px-4 py-2">
        {/* Show the author image */}
        <Link href={`/profile/${comment?.author?._id}/details`} className="">
          <Avatar>
            <AvatarImage
              src={comment?.author?.image}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback>{shortName} </AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex justify-between items-start w-full">
          {/* Show the author name, username and user comment text */}
          <div className="w-full flex flex-col gap-1">
            {/* Show the author name, username */}
            <Link
              href={`/profile/${comment?.author?._id}`}
              className="flex flex-wrap items-center mr-2 text-xs gap-1"
            >
              {/* name  */}
              <p className={`font-bold`}>{comment?.author?.name}</p>

              {/* username */}
              <p className={`text-[#6b6e6e]`}>@{comment?.author?.username}</p>
              <p className="text-[#6b6e6e]">
                {dayjs().diff(commentTime, "day") > 1
                  ? commentTime.format("MMM DD, YYYY")
                  : relativeTime}
              </p>
            </Link>

            {/* Show the user comment text*/}
            <div className="text-sm font-bold">
              <p className="text-sm">{comment?.text}</p>
            </div>
          </div>
          <div>
            <RemoveComment comment={comment} note={note} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCommentCard;
