import { getServerSession } from 'next-auth';

import { fetchNoteById } from '@/services/note/server/note.service';
import NoteDetailsById from '@/components/NoteDetailsById/NoteDetailsById';
import UserCard from '@/components/UserCard/UserCard';
import WelcomeBanner from '@/components/WelcomeBanner/WelcomeBanner';

const NoteDetailsComponent = async ({ id }) => {
  const session = await getServerSession();
  const currentUserEmail = session?.user?.email;
  const { data: note = {} } = (await fetchNoteById(id)) ?? {};
  const isPrivateNote =
    currentUserEmail !== note?.author?.email && note?.visibility !== 'public';

  if (isPrivateNote) {
    return (
      <>
        <WelcomeBanner
          title="Note Details"
          description="This note is private and can only be viewed by the author."
        />
        <UserCard user={note?.author} />
      </>
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
