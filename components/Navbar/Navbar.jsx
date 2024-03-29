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
import { CircleUserRound, LogOut, NotebookPen } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const name = session?.user?.name;

  let shortName = name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <nav className="max-w-3xl mx-auto px-4 flex justify-between items-center py-3">
      <Link href={`/`}>
        <h1 className="font-bold text-2xl md:text-3xl">
          Dedx
          <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Notes
          </span>
        </h1>
      </Link>
      <div className="flex items-center justify-between gap-4">
        {/* Theme changing component  */}
        <ThemeToggle />

        {status === "authenticated" && (
          <Link href={`/add-note`}>
            <Button
              variant={`outline`}
              className="hidden md:font-bold md:flex md:gap-1"
            >
              <NotebookPen className="w-4" />
              <span>Write</span>
            </Button>
            <Button
              variant={`outline`}
              className="font-bold md:hidden"
              size="icon"
            >
              <NotebookPen className="w-4" />
            </Button>
          </Link>
        )}

        {status === "authenticated" ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={`${session?.user?.image}`} />
                <AvatarFallback>{shortName}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={`cursor-pointer`}
                onClick={() => router.push(`/profile/${session?.user?.id}`)}
              >
                <CircleUserRound className="w-4 mr-2" />
                <span className="font-bold">Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={`cursor-pointer`}
                onClick={() => signOut()}
              >
                <LogOut className="w-4 mr-2" />
                <span className="font-bold">Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={`/signin`}>
            <Button variant={`outline`} className="font-bold text-base">
              Sign in
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
