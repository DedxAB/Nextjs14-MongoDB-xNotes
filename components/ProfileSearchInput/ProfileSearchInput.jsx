"use client";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";

export default function ProfileSearchInput({ allNotes, setFilteredNotes }) {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("useEffect called");
      if (searchText.trim() === "") {
        setFilteredNotes(allNotes);
      } else {
        // Filter notes based on search text
        const filtered = allNotes.filter((note) =>
          note?.title?.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredNotes(filtered);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [allNotes, searchText, setFilteredNotes]);

  return (
    <Input
      placeholder={`Search notes by title`}
      className={`font-bold my-5 w-full md:w-1/2`}
      onChange={(e) => setSearchText(e.target.value)}
      value={searchText}
    />
  );
}
