"use client";
import { josefin_sans_font } from "@/utils/fonts";
import AdminToggle from "../AdminToggle/AdminToggle";
import UserCard from "../UserCard/UserCard";
import UserSearchInput from "../UserSearchInput/UserSearchInput";
import { useState } from "react";

export default function AllUserDetails({ allUsers, session }) {
  const [filteredUsers, setFilteredUsers] = useState(allUsers || []);

  return (
    <>
      {/* Search the user by name */}
      <UserSearchInput
        allUsers={allUsers}
        setFilteredUsers={setFilteredUsers}
      />

      <h1 className="font-bold text-lg my-5">
        All Users ({filteredUsers?.length})
      </h1>
      {filteredUsers?.length > 0 &&
        filteredUsers?.map((user) => {
          return (
            <div className="w-full relative" key={user?._id}>
              <UserCard user={user} />
              <div
                className={`px-3 md:px-4 py-1 absolute right-0 bottom-1 ${josefin_sans_font} text-xs`}
              >
                <AdminToggle
                  user={user}
                  currentUserEmail={session?.user?.email}
                />
              </div>
            </div>
          );
        })}
    </>
  );
}
