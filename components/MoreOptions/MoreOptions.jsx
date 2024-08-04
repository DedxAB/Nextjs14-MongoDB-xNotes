import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import RemoveButton from "../RemoveButton/RemoveButton";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { MoreOptionIcon } from "@/app/assets/svgs/GeneralIcons";

export default function MoreOptions({ noteData }) {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div className="cursor-pointer">
            <MoreOptionIcon className="w-4 h-4" />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-1">
            <Link
              href={`/edit-note/${noteData?._id}`}
              className="flex items-center justify-start gap-2 hover:bg-accent px-2 rounded-md py-1"
            >
              <Pencil className="w-4 h-4" />
              <span>Edit</span>
            </Link>
            <div className="hover:bg-accent px-2 rounded-md py-1">
              <RemoveButton id={noteData?._id} title={noteData?.title} />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
