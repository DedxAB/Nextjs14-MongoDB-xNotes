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
        <ThemeToggle />

        <Link href={`/add-topic`}>
          <Button className="hidden md:block md:font-bold md:rounded">
            Add Topic
          </Button>
          <Button
            variant={`outline`}
            className="font-bold md:hidden"
            size="icon"
          >
            <PlusCircle className="w-4" />
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
              <p className="px-2 py-1">{name}</p>
              <p className="px-2 py-1">{email}</p>
              <DropdownMenuItem
                className={`cursor-pointer`}
                onClick={() => signOut()}
              >
                <LogOut className="w-4 mr-1" /><span className="font-bold">Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={`/signin`}>
            <Button variant={`outline`} className="font-bold rounded">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavbarComp;
