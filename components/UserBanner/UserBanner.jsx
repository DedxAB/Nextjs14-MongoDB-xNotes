import Link from "next/link";
import { Button } from "../ui/button";
import { getServerSession } from "next-auth";

const UserBanner = async () => {
  // Get the session
  const session = await getServerSession();

  return (
    <>
      {/* Show the user name if logged in */}
      {session ? (
        <>
          <div className="font-bold text-[#444746] mb-6 mt-8">
            <h1 className="text-4xl md:text-5xl py-1 bg-gradient-to-r from-blue-500  via-red-500 to-pink-500 bg-clip-text text-transparent">
              Hello, {session?.user?.name.split(" ")[0]}
            </h1>
            <h1 className="text-3xl md:text-4xl my-2">Welcome to xNotes</h1>
          </div>
        </>
      ) : (
        <>
          <div className="font-bold text-[#444746] mb-6 mt-8">
            <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-blue-500  via-red-500 to-pink-500 bg-clip-text text-transparent">
              Hello, Guest
            </h1>
            <h1 className="text-3xl md:text-4xl my-2">
              Wants to create notes?
            </h1>
            <Link href={`/signin`}>
              <Button
                variant={`outline`}
                className={`text-base font-bold mt-1`}
              >
                Sign in
              </Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default UserBanner;
