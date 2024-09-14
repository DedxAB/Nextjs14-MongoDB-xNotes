"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";

import { CalendarDays, Contact } from "lucide-react";

import { inter_font, josefin_sans_font } from "@/utils/fonts";
import {
  FacebookIcon,
  GoogleIcon,
  InstagramIcon,
  XIcon,
} from "@/app/assets/svgs/GeneralIcons";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DialogContent } from "../ui/dialog";
import {
  CustomDialogContent,
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/custom-dialog";

import GradientText from "../GradientText";

const ProfileSection = ({ user }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  let shortName = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  const highResImageSrc = user?.image?.replace("s96-c", "s512-c");

  return (
    <section id="profile-section">
      <div className="mb-6 mt-8">
        {/* Profile Heading */}
        <GradientText className="text-4xl md:text-5xl mb-5 py-1">
          Profile
        </GradientText>
        <div className="flex items-center gap-3 mb-3">
          {/* User Avatar */}
          <Dialog>
            <DialogTrigger>
              <Avatar className={`w-16 h-16 cursor-pointer`}>
                <AvatarImage
                  src={highResImageSrc || "/logo.png"}
                  referrerPolicy="no-referrer"
                  alt={user?.name || "DedxNotes"}
                />
                <AvatarFallback className="text-lg">
                  {shortName || "DN"}
                </AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <CustomDialogContent className="grid place-items-center w-fit rounded-full p-0">
              <DialogHeader>
                <DialogDescription>
                  <Avatar className={`w-52 h-52`}>
                    <AvatarImage
                      src={highResImageSrc || "/logo.png"}
                      referrerPolicy="no-referrer"
                      alt={user?.name || "DedxNotes"}
                    />
                    <AvatarFallback className="text-xl">
                      {user?.name || "DedxNotes"}
                    </AvatarFallback>
                  </Avatar>
                </DialogDescription>
              </DialogHeader>
            </CustomDialogContent>
          </Dialog>

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
            </div>
          </div>
        </div>

        {/* User Google Account  */}
        {session?.user?.id === user?._id && (
          <div
            className={`${josefin_sans_font} my-4 flex items-center flex-wrap`}
          >
            <div className="flex items-center">
              <GoogleIcon className="w-4 md:w-5 h-4 md:h-5" />
              <span className="text-md md:text-xl text-gray-500 font-bold pt-1">
                oogle •
              </span>
            </div>
            <span className="text-md md:text-xl text-gray-500 font-bold pt-1">
              &nbsp;{user?.email}
            </span>
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
                <FacebookIcon className="w-5 h-5 text-primary" />
              </Link>
            )}
            {user?.socialLinks?.twitter && (
              <Link
                href={user?.socialLinks?.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-primary"
              >
                <XIcon className="w-5 h-5 text-primary" />
              </Link>
            )}
            {user?.socialLinks?.instagram && (
              <Link
                href={user?.socialLinks?.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-primary"
              >
                <InstagramIcon className="w-5 h-5 text-primary" />
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
              pathName === `/user/${user?.username}/${user?._id}` && (
                <Link href={`/user/${user?.username}/${user?._id}/edit`}>
                  <Button className={`font-bold`}>Edit Profile</Button>
                </Link>
              )
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
