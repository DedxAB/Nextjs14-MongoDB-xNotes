"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { NotebookPen, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ShowSearch from "../ShowSearch/ShowSearch";
import { cn } from "@/lib/utils";
import {
  BookmarkIcon,
  HomeIcon,
  ProfileIcon,
} from "@/app/assets/svgs/GeneralIcons";

export default function BottomNavbar() {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const { status, data: session } = useSession();
  const pathName = usePathname();

  useEffect(() => {
    let timeoutId;

    if (openSearch) {
      timeoutId = setTimeout(() => {
        if (searchText.length === 0) {
          setOpenSearch(false);
        }
      }, 6000); // Close search after 6 seconds of inactivity
    }

    return () => clearTimeout(timeoutId);
  }, [openSearch, searchText]);

  const hadleSearchInput = (e) => {
    e.preventDefault();
    if (searchText.length > 0) {
      router.push(`/result?q=${searchText}`);
    }
    setTimeout(() => {
      setOpenSearch(!openSearch);
      setSearchText("");
    }, 300);
  };

  return (
    <div className="max-w-3xl py-0.5 px-4 bg-background">
      <div className="flex justify-between items-center gap-1">
        <Link
          href={`/`}
          className={cn(`flex flex-col items-center justify-center py-1 group`)}
        >
          <div className="border p-1.5 rounded-full">
            <HomeIcon className="w-6 h-6" />
          </div>
          <span
            className={cn(
              pathName === "/" && "text-primary",
              "group-hover:text-primary"
            )}
          >
            Home
          </span>
        </Link>
        {status === "authenticated" && (
          <Link
            className={`flex flex-col items-center justify-center py-1 cursor-pointer group`}
            href={`/saved-notes`}
          >
            <div className="border rounded-full p-1.5">
              <BookmarkIcon className="w-6 h-6" />
            </div>
            <span
              className={cn(
                "group-hover:text-primary",
                pathName === "/saved-notes" && "text-primary"
              )}
            >
              Saved
            </span>
          </Link>
        )}
        <div
          className={`flex flex-col items-center justify-center py-1 cursor-pointer group`}
          onClick={() => setOpenSearch(!openSearch)}
        >
          <div className="border rounded-full p-1.5">
            <Search strokeWidth={1.5} className="w-6 h-6" />
          </div>
          <span className="group-hover:text-primary">Search</span>
        </div>
        {status === "authenticated" && (
          <>
            <Link
              href={`/create-note`}
              className="flex flex-col items-center justify-center group py-1"
            >
              <div className="border p-1.5 rounded-full">
                <NotebookPen
                  strokeWidth={1.5}
                  className="w-[1.5rem] h-[1.5rem]"
                />
              </div>
              <span
                className={cn(
                  pathName === "/create-note" && "text-primary",
                  "group-hover:text-primary"
                )}
              >
                Write
              </span>
            </Link>
            <Link
              href={`/user/${session?.user?.username}/${session?.user?.id}`}
              className="flex flex-col items-center justify-center group py-1"
            >
              <div className="border p-1.5 rounded-full">
                <ProfileIcon className="w-[1.5rem] h-[1.5rem]" />
              </div>
              <span
                className={cn(
                  pathName ===
                    `/user/${session?.user?.username}/${session?.user?.id}` &&
                    "text-primary",
                  "group-hover:text-primary"
                )}
              >
                Profile
              </span>
            </Link>
          </>
        )}
      </div>
      {/* Search bar component */}
      {openSearch && (
        <ShowSearch
          searchText={searchText}
          setSearchText={setSearchText}
          hadleSearchInput={hadleSearchInput}
          setOpenSearch={setOpenSearch}
          openSearch={openSearch}
        />
      )}
    </div>
  );
}

/*
* <div className="fixed top-0 left-0 w-full">
          <div className="w-full flex items-center z-20">
            <form onSubmit={hadleSearchInput} className="w-full">
              <Input
                ref={(input) => input && input.focus()}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                name="search"
                type="text"
                placeholder={`Search user, notes, keywords...`}
                className={`font-bold px-4 py-5 rounded-lg text-base bg-background`}
              />
            </form>
            <Button
              size="icon"
              className={`h-[2.69rem] w-12 ml-2 rounded-lg`}
              onClick={() => {
                setOpenSearch(!openSearch);
                setSearchText("");
              }}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div> 
*/
