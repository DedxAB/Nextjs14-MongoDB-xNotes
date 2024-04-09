"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const [search, setSearch] = useState("");

  const router = useRouter();
  const handelSubmit = (e) => {
    e.preventDefault();
    router.push(`/result?q=${search}`);
  };
  return (
    <>
      <div className="mt-6 mb-8">
        <form onSubmit={handelSubmit}>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            type="text"
            placeholder="Search notes, tags, or username..."
            className="w-full md:w-1/2 font-bold px-4 py-5"
          />
        </form>
      </div>
    </>
  );
};

export default SearchInput;
