import ProfileSection from "@/components/ProfileSection/ProfileSection";
import UserFeed from "@/components/UserNotesFeed/UserNotesFeed";
import { getServerSession } from "next-auth";
import { fetchUserById } from "@/services/userServices";


const ProfileComponent = async ({ id }) => {
  const session = await getServerSession();

  const { data: user = {} } = (await fetchUserById(id)) ?? {};

  const isCurrentUserPrifile = session?.user?.email === user?.email;
  const filteredNotes = user?.notes.filter((note) => {
    return isCurrentUserPrifile || note?.visibility === "public";
  });
  return (
    <div>
      <ProfileSection user={user} />
      <hr className="my-6" />
      <UserFeed notes={filteredNotes} user={user} />
    </div>
  );
};

export default ProfileComponent;
