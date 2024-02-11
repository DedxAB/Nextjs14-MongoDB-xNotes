import Link from "next/link";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
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
  return (
    <>
      {topics.map((topic, index) => {
        return (
          <div
            className="border border-slate-600 px-2 flex justify-between gap-3 mb-2 py-5"
            key={index}
          >
            <div>
              <h2 className="text-lg font-bold">{topic.title}</h2>
              <h2>{topic.description}</h2>
            </div>
            <div className="flex justify-between items-center">
              <Link href={`/edit-topic/${topic._id}`}>
                <Button variant="outline" size="icon" className="mr-2">
                  <Pencil className="w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="icon">
                <Trash2 className="w-4 text-red-500" />
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TopicList;
