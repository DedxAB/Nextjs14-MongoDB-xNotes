import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import dayjs from "dayjs";

const ProfileSection = ({ user }) => {
  let shortName = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section>
      <div className="mb-6 mt-8">
        {/* Profile Heading */}
        <h1 className="text-4xl md:text-5xl mb-5 py-1 bg-gradient-to-r from-blue-500  via-red-500 to-pink-500 bg-clip-text text-transparent font-bold">
          Profile
        </h1>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          {/* User Avatar */}
          <Avatar className={`w-16 h-16`}>
            <AvatarImage src={user?.image} alt={user?.name} />
            <AvatarFallback>{shortName}</AvatarFallback>
          </Avatar>
          <div>
            {/* User name and username */}
            <div className="flex items-center flex-wrap font-bold">
              <p className="text-lg md:text-2xl mr-2">{user?.name}</p>
              <p className="text-base md:text-xl text-gray-500">
                @{user?.username}
              </p>
            </div>

            {/* User Notes count */}
            <div>
              <p className="text-sm md:text-base text-gray-500 font-bold">
                <span>
                  {user?.notes.length === 0
                    ? "No note"
                    : user?.notes.length === 1
                    ? "1 note published"
                    : `${user?.notes.length} notes published`}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* User Bio */}
        <div>
          <p className="font-bold">
            Love to travel and explore new places. I am a full-stack developer
            and love to code. I am a foodie and love to eat different types of
            food. I am a fitness freak and love to workout.
          </p>
        </div>

        {/* User Social Links */}
        <div></div>

        {/* User Joined date */}
        <div className="my-3 flex flex-wrap justify-between items-center">
          <p className="text-sm font-bold text-gray-500">
            Joined on {dayjs(user?.createdAt).format("DD MMM YYYY")}
          </p>
          <Link href={`/profile/${user?._id}/edit`}>
            <Button variant={`outline`} className={`font-bold`}>
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
