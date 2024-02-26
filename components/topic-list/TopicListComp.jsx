import Link from "next/link";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { BASE_URL } from "@/utils/constants";
import { getServerSession } from "next-auth";
import RemoveButtonComp from "../remove-button/RemoveBtnComp";

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

  return (
    <>
      {/* Map through the topics and display them */}
      {topics?.map((topic, index) => {
        return (
          <div
            className="border flex flex-col justify-between gap-1 mb-3 rounded px-4 py-2 shadow cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out"
            key={index}
          >
            <div className="flex justify-between items-start gap-1">
              <h2 className="text-lg font-bold underline">{topic?.title}</h2>
              {/* Add the edit button */}
              {user && (
                <div className="min-w-20">
                  <Link href={`/edit-topic/${topic?._id}`}>
                    <Button variant="outline" size="icon" className="mr-2">
                      <Pencil className="w-4" />
                    </Button>
                  </Link>

                  {/* Add the RemoveBtn component here based on the user session */}
                  <RemoveButtonComp id={topic?._id} />
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              <h2 className="font-bold mt-2">{topic?.description}</h2>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TopicList;
