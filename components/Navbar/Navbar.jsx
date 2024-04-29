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
} from "../ui/dropdown-menu";
import { CircleUserRound, LogIn, LogOut, NotebookPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { playfair_font } from "@/utils/fonts";

const Navbar = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const name = session?.user?.name;
  let shortName = name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <nav className="max-w-3xl mx-auto px-4 flex justify-between items-center py-4">
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
        <div className="flex items-center justify-between gap-4">
          {/* Theme changing component  */}
          <ThemeToggle />
          {status === "authenticated" && (
            <Link href={`/create-note`}>
              <Button
                className="hidden md:font-bold md:flex md:gap-1 md:items-center"
              >
                <NotebookPen className="w-4 h-4" />
                <span>Write</span>
              </Button>
              <Button
                className="font-bold md:hidden"
                size="icon"
              >
                <NotebookPen className="w-4 h-4" />
              </Button>
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
              <DropdownMenuContent>
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
                    <span className="font-bold">Admin</span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    className={`cursor-pointer flex items-center space-x-2`}
                    onClick={() =>
                      router.push(`/profile/${session?.user?.id}/details`)
                    }
                  >
                    <CircleUserRound className="w-4 h-4" />
                    <span className="font-bold">Profile</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className={`cursor-pointer flex items-center space-x-2`}
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="w-4 h-4 text-primary" />
                  <span className="font-bold text-primary">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-4">
              <Link href={`/signin`}>
                <Button className="font-bold text-base" size="icon">
                  <LogIn className="w-4" />
                </Button>
              </Link>
              <Button variant={`outline`} size="icon" onClick={() => signOut()}>
                <LogOut className="w-4 text-red-500" />
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
