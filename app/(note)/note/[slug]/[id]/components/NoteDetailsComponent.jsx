import NoteDetailsById from "@/components/NoteDetailsById/NoteDetailsById";
import UserCard from "@/components/UserCard/UserCard";
import WelcomeBanner from "@/components/WelcomeBanner/WelcomeBanner";
import { fetchNoteById } from "@/services/noteServices";
import { getServerSession } from "next-auth";

const NoteDetailsComponent = async ({ id }) => {
  const session = await getServerSession();
  const currentUserEmail = session?.user?.email;
  const { data: note = {} } = (await fetchNoteById(id)) ?? {};

  const isPrivateNote =
    currentUserEmail !== note?.author?.email && note?.visibility !== "public";

  if (isPrivateNote) {
    return (
      <div>
        <WelcomeBanner
          title="Note Details"
          description="This note is private and can only be viewed by the author."
        />
        <UserCard user={note?.author} />
      </div>
    );
  }

  return (
    <>
      <WelcomeBanner title="Note Details" description="Feel free to comment." />
      <NoteDetailsById note={note} />
    </>
  );
};

export default NoteDetailsComponent;
