"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Pencil } from "lucide-react";

import { MoreOptionIcon } from "@/app/assets/svgs/GeneralIcons";
import { generateSlug } from "@/utils/slugGenerator";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import RemoveButton from "../RemoveButton/RemoveButton";

export default function MoreOptions({ noteData }) {
  const [currentPath, setCurrentPath] = useState("");
  const pathName = usePathname();

  // Memoize the slug and paths to avoid recalculating them on every render
  const noteSlug = generateSlug(noteData?.title);
  const notePath = `/note/${noteSlug}/${noteData?._id}`;
  const userPath = `/user/${noteData?.author?.username}/${noteData?.author?._id}`;

  useEffect(() => {
    switch (true) {
      case pathName === notePath:
        setCurrentPath("01-n");
        break;
      case pathName === userPath:
        setCurrentPath("02-u");
        break;
      default:
        setCurrentPath("03-o");
    }
  }, [pathName, notePath, userPath]);

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div className="cursor-pointer">
            <MoreOptionIcon className="w-4 h-4" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="transform -translate-x-[30%] md:-translate-x-[45%] -translate-y-5">
          <div className="flex flex-col gap-1">
            <Link
              href={`/note/${noteSlug}/${noteData?._id}/edit?from=${currentPath}`}
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
