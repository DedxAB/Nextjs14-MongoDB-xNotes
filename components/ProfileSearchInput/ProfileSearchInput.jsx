"use client";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";

export default function ProfileSearchInput({
  allNotes,
  setFilteredNotes,
  user,
}) {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // console.log("useEffect called");
      if (searchText.trim() === "") {
        setFilteredNotes(allNotes);
      } else {
        // Filter notes based on search text
        const filtered = allNotes.filter((note) =>
          note?.title?.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredNotes(filtered);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [allNotes, searchText, setFilteredNotes]);

  return (
    <>
      <Input
        placeholder={`Search ${
          user?.name?.split(" ")[0].toLowerCase() || "User"
        }'s notes by title...`}
        className={`font-bold px-4 py-5 text-base w-full md:w-1/2 my-5`}
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
    </>
  );
}
