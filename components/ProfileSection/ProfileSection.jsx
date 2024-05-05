"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { CalendarDays, Contact } from "lucide-react";
import {
  inter_font,
  josefin_sans_font,
  source_code_pro_font,
} from "@/utils/fonts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

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
              <div className="text-lg md:text-2xl mr-[.35rem] flex flex-wrap items-center">
                {user?.name}
                {user?.isAdmin && (
                  <>
                    <div className="mr-10 ml-1 pt-2">
                      <Dialog>
                        <DialogTrigger>
                          <Contact className="w-4 md:w-5 h-4 md:h-5 pb-[.15rem]" />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="mb-2">
                              What is this badge?
                            </DialogTitle>
                            <DialogDescription className={`${inter_font}`}>
                              This badge indicates that the user is an admin of
                              this website. Admin has special privileges and can
                              manage the website.
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Username  */}
            <div className="font-bold">
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

        {/* User Google Account  */}
        {session?.user?.id === user?._id && (
          <div
            className={`${source_code_pro_font} text-gray-500 font-semibold text-lg my-4 flex items-center flex-wrap`}
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                className="w-6 h-6"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              <span>&nbsp;</span>
            </div>
            <span>{user?.email}</span>
          </div>
        )}

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

        <div className="my-4 flex flex-wrap justify-between gap-2 items-center">
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
