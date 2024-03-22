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
import { LogOut, PlusCircle } from "lucide-react";

const NavbarComp = () => {
  const { status, data: session } = useSession();
  const name = session?.user?.name;
  const email = session?.user?.email;
  // console.log(status);

  let shortName = name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <nav className="flex justify-between items-center py-3">
      <Link href={`/`}>
        <h1 className="font-bold text-2xl">
          Dedx<span className="text-orange-500">Notes</span>
        </h1>
      </Link>
      <div className="flex items-center justify-between gap-4">
        {/* Theme changing component  */}
        <ThemeToggle />

        <Link href={`/add-topic`}>
          <Button
            variant={`outline`}
            className="hidden md:block md:font-bold md:rounded"
          >
            Add Topic
          </Button>
          <Button
            variant={`outline`}
            className="font-bold md:hidden"
            size="icon"
          >
            <PlusCircle className="w-[1.2rem]" />
          </Button>
        </Link>

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
              <p className="px-2 py-1 text-xs font-bold">{name}</p>
              <p className="px-2 py-1 text-xs font-bold">{email}</p>
              <DropdownMenuItem
                className={`cursor-pointer`}
                onClick={() => signOut()}
              >
                <LogOut className="w-4 mr-1" />
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

export default NavbarComp;
