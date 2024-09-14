import { fetchAllNotes } from "@/services/note/server/note.service";

import { NotesFeedClient } from "../NotesFeedClient/NotesFeedClient";

const NotesFeed = async () => {
  const { data: notes = [] } = (await fetchAllNotes(1, 10)) ?? {
    data: [],
  };

  if (notes.length === 0)
    return <h1 className="text-2xl font-bold">No notes found!</h1>;

  return (
    <>
      <NotesFeedClient initialNotes={notes} />
    </>
  );
};

export default NotesFeed;
