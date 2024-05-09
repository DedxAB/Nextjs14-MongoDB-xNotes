"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { NotebookPen, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ShowSearch from "../ShowSearch/ShowSearch";

export default function BottomNavbar() {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const { status, data: session } = useSession();

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
        <Link href={`/`}>
          <Button className={`rounded-full`} variant={`outline`}>
            Home
          </Button>
        </Link>
        <div className="flex items-center justify-between gap-2">
          <Button
            className={`flex items-center gap-1 rounded-full`}
            variant="outline"
            onClick={() => setOpenSearch(!openSearch)}
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </Button>
          {status === "authenticated" && (
            <Link href={`/create-note`}>
              <Button className="font-bold md:hidden flex items-center justify-between rounded-full gap-1">
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
