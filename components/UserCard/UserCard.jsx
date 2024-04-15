import { Scroll, ScrollText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { josefin_sans_font } from "@/utils/fonts";

const UserCard = ({ user }) => {
  let shortName = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <>
      <div className="border mb-3 rounded px-3 md:px-4 py-2">
        <Link
          href={`/profile/${user?._id}/details`}
          className="flex justify-start items-center gap-1"
        >
          {/* Show the author image */}
          <div className="mr-2 py-1">
            <Avatar>
              <AvatarImage src={user?.image} referrerPolicy="no-referrer" />
              <AvatarFallback>{shortName} </AvatarFallback>
            </Avatar>
            {/* <MyImage src={user?.image} /> */}
          </div>
          <div className="w-full">
            {/* Show the author name, username */}
            <div
              className={`flex flex-wrap items-center text-xs md:py-1 ${josefin_sans_font}`}
            >
              {/* name  */}
              <p className={`font-bold text-base md:text-lg mr-1`}>
                {user?.name}
              </p>

              {/* username */}
              <p className={`text-gray-500 text-sm font-bold`}>
                @{user?.username}
              </p>
            </div>
            {/* Show the author notes count */}
            <div className="text-sm font-bold text-gray-500">
              {user?.notes.length === 0 ? (
                <div className="flex gap-1 items-center">
                  <Scroll className="w-4" />
                  <span>No Notes Published Yet</span>
                </div>
              ) : user?.notes.length === 1 ? (
                <div className="flex gap-1 items-center">
                  <ScrollText className="w-4" />
                  <span>1 Note published</span>
                </div>
              ) : (
                <div className="flex gap-1 items-center">
                  <ScrollText className="w-4" />
                  <span>{user?.notes.length} Notes Published</span>
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default UserCard;
