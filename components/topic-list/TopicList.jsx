import Link from "next/link";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";

const TopicList = () => {
  return (
    <div className="border border-slate-600 px-2 flex justify-between gap-3 mb-2 py-5">
      <div>
        <h2 className="text-lg font-bold">Topic Title</h2>
        <h2>Topic Description</h2>
      </div>
      <div className="flex justify-between items-center">
        <Link href={`/edit-topic/123`}>
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
};

export default TopicList;
