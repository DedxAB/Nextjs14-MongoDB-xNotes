"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { NotebookPen, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ShowSearch from "../ShowSearch/ShowSearch";
import { cn } from "@/lib/utils";

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
    <div className="max-w-3xl px-4 py-3">
      <div className="flex justify-between items-center gap-3">
        <Link
          href={`/`}
          className={cn(
            `flex items-center justify-between gap-1 transition-all duration-300 ease-in-out border hover:border-primary rounded-full py-3 px-3 h-9`,
            pathName === "/" && "border-primary"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill={"none"}
          >
            <path
              d="M9.06165 4.82633L3.23911 9.92134C2.7398 10.3583 3.07458 11.1343 3.76238 11.1343C4.18259 11.1343 4.52324 11.4489 4.52324 11.8371V15.0806C4.52324 17.871 4.52324 19.2662 5.46176 20.1331C6.40029 21 7.91082 21 10.9319 21H13.0681C16.0892 21 17.5997 21 18.5382 20.1331C19.4768 19.2662 19.4768 17.871 19.4768 15.0806V11.8371C19.4768 11.4489 19.8174 11.1343 20.2376 11.1343C20.9254 11.1343 21.2602 10.3583 20.7609 9.92134L14.9383 4.82633C13.5469 3.60878 12.8512 3 12 3C11.1488 3 10.4531 3.60878 9.06165 4.82633Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16H12.009"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Home</span>
        </Link>
        <div className="flex items-center justify-between gap-2">
          <div
            className={`flex items-center justify-between gap-1 transition-all duration-300 ease-in-out border hover:border-primary rounded-full py-2 px-3 h-9 cursor-pointer`}
            onClick={() => setOpenSearch(!openSearch)}
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </div>
          {status === "authenticated" && (
            <Link href={`/create-note`}>
              <Button className="font-bold flex items-center justify-between gap-1 rounded-full">
                <NotebookPen className="w-4 h-4" />
                <span>Write</span>
              </Button>
            </Link>
          )}
        </div>
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
