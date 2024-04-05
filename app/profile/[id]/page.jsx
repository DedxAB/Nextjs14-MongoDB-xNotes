import NoteCard from "@/components/NoteCard/NoteCard";
import ProfileSection from "@/components/ProfileSection/ProfileSection";
import { BASE_URL } from "@/utils/constants";

export const metadata = {
  title: "Profile | DedxNotes",
  description: "Created by DedxAB | A Note sharing WebApp.",
};

const fetchUser = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/user/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to get User");
    }
    return res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const UserFeed = ({ notes, user }) => {
  // console.log(notes);
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
  let user = {};
  try {
    const response = await fetchUser(id);
    user = response.user;
  } catch (error) {
    console.log(error.message);
  }
  return (
    <div className="min-h-[85vh]">
      <ProfileSection user={user} />
      <UserFeed notes={user?.notes} user={user} />
    </div>
  );
};

export default Profile;
