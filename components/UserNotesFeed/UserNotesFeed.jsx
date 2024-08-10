"use client";
import { useEffect, useState } from "react";
import NoteCard from "../NoteCard/NoteCard";
import ProfileSearchInput from "../ProfileSearchInput/ProfileSearchInput";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

const UserNotesFeed = ({ notes, user }) => {
  const [filteredNotes, setFilteredNotes] = useState(notes || []);
  const [activeTab, setActiveTab] = useState("All");
  const { data: session } = useSession();

  useEffect(() => {
    const handleTabChange = () => {
      if (activeTab === "Public") {
        setFilteredNotes(notes.filter((note) => note?.visibility === "public"));
      } else if (activeTab === "Private") {
        setFilteredNotes(
          notes.filter((note) => note?.visibility === "private")
        );
      } else {
        setFilteredNotes(notes);
      }
    };
    handleTabChange();
  }, [activeTab, notes]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {notes?.length > 0 && (
        <ProfileSearchInput
          allNotes={notes}
          user={user}
          activeTab={activeTab}
          setFilteredNotes={setFilteredNotes}
        />
      )}

      {notes.length > 0 ? (
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-base my-5">
            {`${activeTab} Notes (${filteredNotes?.length})`}
          </h1>

          {session?.user?.id === user?._id && (
            <div className="space-x-2">
              <Button
                variant={cn(activeTab === "All" ? "default" : "secondary")}
                onClick={() => handleTabSwitch("All")}
                className="font-bold"
              >
                All
              </Button>
              <Button
                variant={cn(activeTab === "Public" ? "default" : "secondary")}
                onClick={() => handleTabSwitch("Public")}
                className="font-bold"
              >
                Public
              </Button>
              <Button
                variant={cn(activeTab === "Private" ? "default" : "secondary")}
                onClick={() => handleTabSwitch("Private")}
                className="font-bold"
              >
                Private
              </Button>
            </div>
          )}
        </div>
      ) : (
        <h1 className="font-bold text-lg mb-3">
          {session?.user?.id === user?._id
            ? "You haven't created any notes yet."
            : "User hasn't shared any notes yet."}
        </h1>
      )}
      {notes.length > 0 && filteredNotes.length < 1 && (
        <h1 className="font-bold text-lg mb-3">No notes found.</h1>
      )}
      {filteredNotes.length > 0 &&
        filteredNotes.map((note) => (
          <NoteCard key={note?._id} note={note} noteAuthor={user} />
        ))}
    </>
  );
};

export default UserNotesFeed;
