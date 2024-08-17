"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ThemeToggle";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/custom-dropdown-menu";
import {
  CircleUserRound,
  LogIn,
  LogOut,
  NotebookPen,
  Search,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { playfair_font } from "@/utils/fonts";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import NotificationIcon from "../Notification/NotificationIcon";
import { AboutIcon, BookmarkIcon } from "@/app/assets/svgs/GeneralIcons";

const Navbar = () => {
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

  const name = session?.user?.name;
  let shortName = name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <nav className="max-w-3xl relative mx-auto px-4 flex justify-between items-center py-4">
      <Link href={`/`}>
        <h1 className={`font-bold text-2xl md:text-3xl ${playfair_font}`}>
          Dedx
          <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Notes
          </span>
        </h1>
      </Link>
      {status === "loading" ? (
        <>
          <div className="flex space-x-2 h-9 items-center mr-6">
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-ping"></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-ping"></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-ping"></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-ping"></div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {status === "authenticated" && <NotificationIcon />}
          <Button
            title="Search"
            size="icon"
            variant="outline"
            className={`hidden sm:flex`}
            onClick={() => setOpenSearch(!openSearch)}
          >
            <Search className="w-5 h-5" />
          </Button>
          {/* Theme changing component  */}
          <ThemeToggle />
          {status === "authenticated" && (
            <Link
              title="Write a note"
              href={`/create-note`}
              className="hidden sm:font-bold sm:flex sm:gap-1 md:items-center"
            >
              <Button>
                <NotebookPen className="w-4 h-4 mr-1" />
                <span>Write</span>
              </Button>
              {/* <Button className="font-bold md:hidden" size="icon">
                <NotebookPen className="w-4 h-4" />
              </Button> */}
            </Link>
          )}

          {/* Dropdown menu for user profile */}
          {status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={session?.user?.image || "/logo.png"}
                    alt={`Profile image of ${session?.user?.name}` || "DedxNotes"}
                  />
                  <AvatarFallback>{shortName}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={`font-bold`}>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session?.user?.isAdmin ? (
                  <DropdownMenuItem
                    className={`cursor-pointer`}
                    onClick={() =>
                      router.push(`/admin/${session?.user?.id}/details`)
                    }
                  >
                    <CircleUserRound className="w-4 h-4 mr-2" />
                    <span>Admin</span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    className={`cursor-pointer flex items-center space-x-2`}
                    onClick={() =>
                      router.push(`/user/${session?.user?.username}/${session?.user?.id}`)
                    }
                  >
                    <CircleUserRound className="w-4 h-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className={`cursor-pointer flex items-center space-x-2`}
                  onClick={() => router.push(`/saved-notes`)}
                >
                  <BookmarkIcon className="w-4 h-4" />
                  <span>Saved</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`cursor-pointer flex items-center space-x-2`}
                  onClick={() => router.push(`/about`)}
                >
                  <AboutIcon className="w-4 h-4" />
                  <span>About</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`cursor-pointer flex items-center space-x-2`}
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="w-4 h-4 text-primary" />
                  <span className="text-primary">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-4">
              <Link href={`/signin`}>
                <Button size="icon">
                  <LogIn className="w-4" />
                </Button>
              </Link>
              <Button
                variant={`outline`}
                size="icon"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="w-4 text-red-500" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Search bar component */}
      {openSearch && (
        <div className="w-full px-4 absolute top-[.83rem] left-0">
          {/* Content */}
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
      )}
    </nav>
  );
};

export default Navbar;
