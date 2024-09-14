import Link from "next/link";

import { josefin_sans_font } from "@/utils/fonts";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserCard = ({ user }) => {
  let shortName = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <>
      <div className="border mb-3 rounded-lg px-3 md:px-4 py-2">
        <Link
          href={`/user/${user?.username}/${user?._id}`}
          className="flex justify-start items-center gap-1"
        >
          {/* Show the author image */}
          <div className="mr-2 py-1">
            <Avatar>
              <AvatarImage
                src={user?.image}
                referrerPolicy="no-referrer"
                alt={user?.name}
              />
              <AvatarFallback>{shortName} </AvatarFallback>
            </Avatar>
          </div>
          <div className="w-full">
            {/* Show the author name, username */}
            <div
              className={`flex flex-wrap items-center text-xs ${josefin_sans_font}`}
            >
              {/* name  */}
              <p className={`font-bold text-base md:text-lg mr-1`}>
                {user?.name}
              </p>

              {/* username */}
              {/* <p className={`text-gray-500 text-sm font-bold`}>
                @{user?.username}
              </p> */}
            </div>
            {/* Show the author notes count */}
            <div className="">
              {/* username */}
              <p
                className={`text-gray-500 text-sm font-bold ${josefin_sans_font}`}
              >
                @{user?.username}
              </p>
              {/* {user?.notes.length === 0 ? (
                <div className="flex gap-1 items-center">
                  <Scroll className="w-4" />
                  <span>No Notes</span>
                </div>
              ) : user?.notes.length === 1 ? (
                <div className="flex gap-1 items-center">
                  <ScrollText className="w-4" />
                  <span>1 Note</span>
                </div>
              ) : (
                <div className="flex gap-1 items-center">
                  <ScrollText className="w-4" />
                  <span>{user?.notes.length} Notes</span>
                </div>
              )} */}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default UserCard;
