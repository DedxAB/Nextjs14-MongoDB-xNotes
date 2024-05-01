import NoteCard from "@/components/NoteCard/NoteCard";
import ProfileSection from "@/components/ProfileSection/ProfileSection";
import { fetchUserById } from "@/services/userServices";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const { user } = await fetchUserById(id);
  return {
    title: `${user?.name || "Profile"}`,
  };
};

const UserFeed = ({ notes, user }) => {
  return (
    <>
      {notes && notes.length > 0 && (
        <>
          <hr className="my-6" />
          <section>
            <h1 className="font-bold text-lg mb-3">All Notes</h1>
          </section>
        </>
      )}
      {notes?.length > 0 &&
        notes?.map((note) => {
          return <NoteCard key={note?._id} note={note} user={user} />;
        })}
    </>
  );
};

const Profile = async ({ params }) => {
  const { id } = params;
  const { user } = await fetchUserById(id);

  return (
    <div className="min-h-[85vh]">
      <ProfileSection user={user} />
      <UserFeed notes={user?.notes} user={user} />
    </div>
  );
};

export default Profile;
