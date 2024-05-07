import Link from "next/link";
import { Button } from "../ui/button";
import { getServerSession } from "next-auth";
import { fetchUserByEmail } from "@/services/userServices";

const UserBanner = async () => {
  // Get the session
  const session = await getServerSession();
  // Get the user
  let user;
  if (session) {
    const data = await fetchUserByEmail(session?.user?.email);
    user = data?.user;
  }

  return (
    <>
      {/* Show the user name if logged in */}
      {session ? (
        <>
          <div className="font-bold text-[#444746] mb-6 mt-8">
            <h1 className="text-4xl md:text-5xl py-1 bg-gradient-to-r from-blue-500  via-red-500 to-pink-500 bg-clip-text text-transparent">
              Hello, {user?.name.split(" ")[0]}
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
            <h1 className="text-3xl md:text-4xl my-2">Want to create notes?</h1>
            <Link href={`/signin`}>
              <Button className={`text-base font-bold mt-1`}>Sign in</Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default UserBanner;
