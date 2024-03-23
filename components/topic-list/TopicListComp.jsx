import Link from "next/link";
import { Button } from "../ui/button";
import { FilePenLine, Pencil } from "lucide-react";
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
  // Fetch the topics
  const { topics } = await getTopics();

  // Get the session
  const session = await getServerSession();
  const user = session?.user;
  // console.log(topics);
  console.log(user);
  return (
    <>
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
              <div className="flex flex-wrap text-xs mb-1">
                {/* name  */}
                <h2 className="font-bold mr-1">{topic?.author?.name}</h2>

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
                  <div className="flex flex-wrap justify-start items-center text-[#6b6e6e]">
                    <div className="text-xs mr-2">
                      {new Date(topic?.createdAt).toLocaleString("en-US", {
                        timeZone: "Asia/Kolkata",
                      })}
                    </div>

                    {/* Show the edited date if updated */}
                    {topic?.updatedAt !== topic?.createdAt && (
                      <div className="flex items-center gap-1">
                        <FilePenLine className="w-3" />
                        <div className="text-xs">edited</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Show Edit and remove button based on user who created this note */}
                {user && user?.email === topic?.author?.email && (
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
