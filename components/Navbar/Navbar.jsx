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
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <Button
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
            <Link href={`/create-note`}>
              <Button className="hidden sm:font-bold sm:flex sm:gap-1 md:items-center">
                <NotebookPen className="w-4 h-4" />
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
                    alt={`Profile image of ${session?.user?.name}`}
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
                      router.push(`/profile/${session?.user?.id}/details`)
                    }
                  >
                    <CircleUserRound className="w-4 h-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className={`cursor-pointer flex items-center space-x-2`}
                  onClick={() => router.push(`/about`)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-foreground"
                    fill={"none"}
                  >
                    <path
                      d="M2.5 19.6581V15.0065C2.5 14.2973 2.5 13.9426 2.6313 13.9033C2.76259 13.8639 2.9637 14.1693 3.36592 14.7799C4.75816 16.8937 7.10621 19.2417 9.21998 20.634C9.83065 21.0362 10.136 21.2373 10.0966 21.3686C10.0573 21.4999 9.70263 21.4999 8.99336 21.4999H4.34177C3.47355 21.4999 3.03944 21.4999 2.76972 21.2302C2.5 20.9605 2.5 20.5264 2.5 19.6581Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.5004 4.34177V8.99336C21.5004 9.70263 21.5004 10.0573 21.3691 10.0966C21.2378 10.136 21.0367 9.83065 20.6345 9.21998C19.2422 7.10621 16.8942 4.75816 14.7804 3.36592C14.1697 2.9637 13.8644 2.76259 13.9038 2.6313C13.9431 2.5 14.2978 2.5 15.007 2.5H19.6586C20.5268 2.5 20.9609 2.5 21.2307 2.76972C21.5004 3.03944 21.5004 3.47355 21.5004 4.34177Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.5 4.4V6.62599C2.5 7.40261 2.5 7.79093 2.64463 8.14009C2.78926 8.48926 3.06384 8.76384 3.61299 9.31299L14.687 20.387C15.2362 20.9362 15.5107 21.2107 15.8599 21.3554C16.2091 21.5 16.5974 21.5 17.374 21.5H19.6C20.4957 21.5 20.9435 21.5 21.2218 21.2218C21.5 20.9435 21.5 20.4957 21.5 19.6V17.374C21.5 16.5974 21.5 16.2091 21.3554 15.8599C21.2107 15.5107 20.9362 15.2362 20.387 14.687L9.31299 3.61299C8.76384 3.06384 8.48926 2.78926 8.14009 2.64463C7.79093 2.5 7.40261 2.5 6.62599 2.5H4.4C3.50433 2.5 3.0565 2.5 2.77825 2.77825C2.5 3.0565 2.5 3.50433 2.5 4.4Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
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
