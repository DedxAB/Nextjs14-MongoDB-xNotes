import Link from "next/link";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { BASE_URL } from "@/utils/constants";
import { getServerSession } from "next-auth";
import RemoveButtonComp from "../remove-button/RemoveBtnComp";
import { Avatar, AvatarImage } from "../ui/avatar";

const getTopics = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/topics`, {
      cache: "no-store", // Disable cache
    });
    if (!res.ok) throw new Error("Error fetching topics");
    return res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const TopicList = async () => {
  const { topics } = await getTopics();
  const session = await getServerSession();
  const user = session?.user;
  // console.log(topics);
  // console.log(session);
  return (
    <>
      {/* User Name Welcome */}
      {/* Show the user name if logged in */}
      {session ? (
        <>
          <div className="font-bold text-gray-800 mb-8 mt-3">
            <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-blue-500  via-red-500 to-pink-500 bg-clip-text text-transparent">
              Hello, {session?.user?.name.split(" ")[0]}
            </h1>
            <h1 className="text-3xl md:text-4xl">Welcome to xNotes</h1>
          </div>
        </>
      ) : (
        <>
          <div className="font-bold text-gray-800 mb-8 mt-3">
            <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-blue-500  via-red-500 to-pink-500 bg-clip-text text-transparent">
              Hello, Guest
            </h1>
            <h1 className="text-3xl md:text-4xl">Wants to create notes?</h1>
            <Link href={`/signin`}>
              <Button
                variant={`outline`}
                className={`text-base font-bold mt-2`}
              >
                Sign in
              </Button>
            </Link>
          </div>
        </>
      )}

      {/* Map through the topics and display them */}
      {topics?.map((topic, index) => {
        return (
          <div
            className="border flex justify-start gap-1 mb-4 rounded px-3 md:px-4 py-3 shadow cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out"
            key={index}
          >
            {/* Show the author image */}
            <div className="my-1 mr-2">
              <Avatar>
                <AvatarImage src={`${topic?.author?.image}`} />
              </Avatar>
            </div>
            <div className="w-full">
              {/* Show the author name, username */}
              <div className="flex gap-1 text-xs pb-1">
                {/* name  */}
                <h2 className="font-bold">{topic?.author?.name}</h2>

                {/* username */}
                <span className="text-gray-500">
                  @{topic?.author?.username}
                </span>
              </div>
              <div className="flex justify-between items-start gap-1">
                {/* Show the title and date */}
                <div>
                  {/* title  */}
                  <h2 className="text-base md:text-lg font-bold underline">
                    {topic?.title}
                  </h2>

                  {/* date */}
                  <span className="text-xs">
                    {new Date(topic?.createdAt).toLocaleString("en-US", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </span>
                </div>

                {/* Show Edit and remove button based on user */}
                {user && (
                  <div className="min-w-20">
                    {/* Add the edit button */}
                    <Link href={`/edit-topic/${topic?._id}`}>
                      <Button variant="outline" size="icon" className="mr-2">
                        <Pencil className="w-4" />
                      </Button>
                    </Link>
                    {/* Add the remove button */}
                    <RemoveButtonComp id={topic?._id} />
                  </div>
                )}
              </div>

              {/* Show the description */}
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-bold mt-2">{topic?.description}</h2>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TopicList;
