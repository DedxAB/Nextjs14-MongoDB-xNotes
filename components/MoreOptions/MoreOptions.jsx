import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import RemoveButton from "../RemoveButton/RemoveButton";
import Link from "next/link";
import { Pencil } from "lucide-react";

export default function MoreOptions({ noteData }) {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div className="cursor-pointer transition-all duration-300 ease-in-out border rounded-full p-[.63rem] hover:border-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-1">
            <Link
              href={`/edit-note/${noteData?._id}`}
              className="flex items-center justify-start gap-2 hover:bg-slate-200 px-2 rounded-md py-1"
            >
              <Pencil className="w-4 h-4" />
              <span>Edit</span>
            </Link>
            <div className="hover:bg-slate-200 px-2 rounded-md py-1">
              <RemoveButton id={noteData?._id} title={noteData?.title} />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
