import Link from "next/link";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import RemoveBtn from "../removebtn/RemoveBtn";
import { BASE_URL } from "@/utils/constants";

const getTopics = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/topics`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Error fetching topics");
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const TopicList = async () => {
  const { topics } = await getTopics();
  // console.log(topics);
  return (
    <>
      {topics?.map((topic, index) => {
        return (
          <div
            className="border flex justify-between gap-3 mb-2 rounded px-4 py-2 shadow"
            key={index}
          >
            <div>
              <h2 className="text-lg font-bold">{topic?.title}</h2>
              <h2>{topic?.description}</h2>
            </div>
            <div className="flex justify-between items-center">
              <Link href={`/edit-topic/${topic?._id}`}>
                <Button variant="outline" size="icon" className="mr-2">
                  <Pencil className="w-4 text-orange-500" />
                </Button>
              </Link>
              <RemoveBtn id={topic?._id} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TopicList;
