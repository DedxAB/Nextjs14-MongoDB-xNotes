"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { CalendarDays, Scroll, ScrollText } from "lucide-react";

const ProfileSection = ({ user }) => {
  const { data: session } = useSession();
  let shortName = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section>
      <div className="mb-6 mt-8">
        {/* Profile Heading */}
        <p className="text-4xl md:text-5xl mb-5 py-1 bg-gradient-to-r from-blue-500  via-red-500 to-pink-500 bg-clip-text text-transparent font-bold">
          Profile
        </p>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          {/* User Avatar */}
          <Avatar className={`w-16 h-16`}>
            <AvatarImage src={user?.image || "/logo.png"} alt={user?.name} />
            <AvatarFallback>{shortName}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            {/* User name and username */}
            <div className="flex items-center flex-wrap font-bold">
              <p className="text-lg md:text-2xl mr-[.35rem]">{user?.name}</p>
              <p className="text-base md:text-xl text-gray-500">
                @{user?.username}
              </p>
            </div>

            {/* User Notes count */}
            <div className="text-sm md:text-base text-gray-500 font-bold">
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
        </div>

        {/* User Bio */}
        <div className="my-4">
          <p className="font-bold">
            {user?.bio ? user?.bio : "No bio available"}
          </p>
        </div>

        {/* User Social Links */}
        <div></div>

        <div className="my-4 flex flex-wrap justify-between items-center">
          {/* User Joined date */}
          <div className="text-gray-500 flex gap-1 justify-start items-center">
            <CalendarDays className="w-4" />
            <p className="text-sm font-bold">
              Joined on {dayjs(user?.createdAt).format("DD MMM YYYY")}
            </p>
          </div>

          {/* Edit Profile Button of current user*/}
          {session?.user?.id === user?._id && (
            <Link href={`/profile/${user?._id}/edit`}>
              <Button variant={`outline`} className={`font-bold`}>
                Edit Profile
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
