"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";

export default function UserSearchInput({ allUsers, setFilteredUsers }) {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchText.trim() === "") {
        setFilteredUsers(allUsers);
      } else {
        const filtered = allUsers.filter(
          (user) =>
            user?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            user?.username?.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredUsers(filtered);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [allUsers, searchText, setFilteredUsers]);

  return (
    <>
      <Input
        placeholder={`Search user by name or username`}
        className={`font-bold px-4 py-5 text-base w-full md:w-1/2`}
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
    </>
  );
}
