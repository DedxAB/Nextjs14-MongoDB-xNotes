"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { CalendarDays, Contact, Scroll, ScrollText } from "lucide-react";
import { josefin_sans_font } from "@/utils/fonts";

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
        <div className="flex items-center gap-3 mb-3">
          {/* User Avatar */}
          <Avatar className={`w-16 h-16`}>
            <AvatarImage src={user?.image || "/logo.png"} alt={user?.name} />
            <AvatarFallback>{shortName}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            {/* User name and username */}
            <div
              className={`flex items-center flex-wrap font-bold ${josefin_sans_font}`}
            >
              <p className="text-lg md:text-2xl mr-[.35rem] flex flex-wrap items-center">
                {user?.name}
                {user?.isAdmin && (
                  <span className="inline-block ml-[.15rem]" title="admin">
                    <Contact className="w-4 md:w-5 h-4 md:h-5 pb-[.15rem]" />
                  </span>
                )}
              </p>
              {/* <p className="text-base md:text-xl text-gray-500">
                @{user?.username}
              </p> */}
            </div>

            {/* Username  */}
            <div className="">
              <p
                className={`text-base md:text-xl text-gray-500 ${josefin_sans_font}`}
              >
                @{user?.username}
              </p>
              {/* {user?.notes.length === 0 ? (
                <div className="flex gap-1 items-center">
                  <Scroll className="w-4 h-4" />
                  <span>No Notes Published Yet</span>
                </div>
              ) : user?.notes.length === 1 ? (
                <div className="flex gap-1 items-center">
                  <ScrollText className="w-4 h-4" />
                  <span>1 Note published</span>
                </div>
              ) : (
                <div className="flex gap-1 items-center">
                  <ScrollText className="w-4 h-4" />
                  <span>{user?.notes.length} Notes Published</span>
                </div>
              )} */}
            </div>
          </div>
        </div>

        {/* User Bio */}
        <div className="whitespace-pre-line font-bold my-4">
          {user?.bio ? user?.bio : "No bio available"}
        </div>

        {/* User Social Links */}
        {user?.socialLinks && (
          <div className="flex gap-3">
            {user?.socialLinks?.facebook && (
              <Link
                href={user?.socialLinks?.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
            )}
            {user?.socialLinks?.twitter && (
              <Link
                href={user?.socialLinks?.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
            )}
            {user?.socialLinks?.instagram && (
              <Link
                href={user?.socialLinks?.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
            )}
          </div>
        )}

        <div className="my-4 flex flex-wrap justify-between items-center">
          {/* User Joined date */}
          <div
            className={`text-gray-500 flex gap-1 justify-start ${josefin_sans_font}`}
          >
            <CalendarDays className="w-4 h-4" />
            <p className="text-sm font-bold">
              Joined on {dayjs(user?.createdAt).format("DD MMM YYYY")}
            </p>
          </div>

          {/* Edit Profile Button of current user*/}
          {session?.user?.id === user?._id &&
            (session?.user?.isAdmin ? (
              <Link href={`/admin/${user?._id}/edit`}>
                <Button className={`font-bold`}>Edit Admin Profile</Button>
              </Link>
            ) : (
              <Link href={`/profile/${user?._id}/edit`}>
                <Button className={`font-bold`}>Edit Profile</Button>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
