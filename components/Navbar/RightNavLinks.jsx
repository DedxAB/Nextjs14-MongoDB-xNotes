'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { AboutIcon, BookmarkIcon } from '@/app/assets/svgs/GeneralIcons';
import {
  CircleUserRound,
  LogIn,
  LogOut,
  Newspaper,
  NotebookPen,
  Search,
  X,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import NotificationButton from '../Notification/NotificationButton';
import { ThemeToggle } from '../ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/custom-dropdown-menu';

const RightNavLinks = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
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

  const handleSearchInput = (e) => {
    e.preventDefault();
    if (searchText.length > 0) {
      router.push(`/result?q=${searchText}`);
    }
    setTimeout(() => {
      setOpenSearch(!openSearch);
      setSearchText('');
    }, 300);
  };

  const name = session?.user?.name;
  let shortName = name
    ?.split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <>
      {status === 'loading' ? (
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
          {status === 'authenticated' && <NotificationButton />}
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
          {status === 'authenticated' && (
            <Link
              title="Write a note"
              href={`/create-note`}
              className="hidden sm:font-bold sm:flex sm:gap-1 md:items-center"
            >
              <Button>
                <NotebookPen className="w-4 h-4 mr-1" />
                <span>Write</span>
              </Button>
            </Link>
          )}

          {/* Dropdown menu for user profile */}
          {status === 'authenticated' ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={session?.user?.image || '/logo.png'}
                    alt={
                      `Profile image of ${session?.user?.name}` || 'DedxNotes'
                    }
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
                    className="cursor-pointer flex items-center space-x-2"
                    onClick={() =>
                      router.push(
                        `/user/${session?.user?.username}/${session?.user?.id}`
                      )
                    }
                  >
                    <CircleUserRound className="w-4 h-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="cursor-pointer flex items-center space-x-2"
                  onClick={() => router.push(`/saved-notes`)}
                >
                  <BookmarkIcon className="w-4 h-4" />
                  <span>Saved</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer flex items-center space-x-2 lg:hidden"
                  onClick={() => router.push(`/news`)}
                >
                  <Newspaper className="w-4 h-4"/>
                  <span>News</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer flex items-center space-x-2"
                  onClick={() => router.push(`/about`)}
                >
                  <AboutIcon className="w-4 h-4" />
                  <span>About</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer flex items-center space-x-2"
                  onClick={() => signOut({ callbackUrl: '/' })}
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
                onClick={() => signOut({ callbackUrl: '/' })}
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
          <div className="w-full flex items-center z-20">
            <form onSubmit={handleSearchInput} className="w-full">
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
                setSearchText('');
              }}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default RightNavLinks;
