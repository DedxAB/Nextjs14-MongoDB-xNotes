import Link from "next/link";
import { Button } from "../ui/button";
import { getServerSession } from "next-auth";
import { fetchUserByEmail } from "@/services/userServices";
import GradientText from "../GradientText";
import { HeroBannerIcon } from "@/app/assets/svgs/GeneralIcons";

const UserBanner = async () => {
  const session = await getServerSession();
  const user = session
    ? (await fetchUserByEmail(session?.user?.email))?.user
    : null;
  const userName = user?.name?.split(" ")[0] || "Guest";
  const greetingText = session ? `Hello, ${userName}` : "Hello, Guest";
  const welcomeText = session ? "Welcome to xNotes" : "Want to create notes?";

  return (
    <div className="font-bold text-[#444746] mb-6 mt-8 md:flex md:items-center md:gap-2 md:justify-between w-full">
      <div>
        <GradientText className="text-4xl md:text-5xl py-1">
          {greetingText}
        </GradientText>
        <h1 className="text-3xl md:text-4xl my-2">{welcomeText}</h1>

        {!session && (
          <Link href="/signin">
            <Button className="text-base font-bold mt-1">Sign in</Button>
          </Link>
        )}
      </div>
      <div className="hidden md:block">
        <HeroBannerIcon className="w-[13.5rem] h-[7.5rem]" />
      </div>
    </div>
  );
};

export default UserBanner;
