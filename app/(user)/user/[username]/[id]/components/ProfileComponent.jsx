import { getServerSession } from "next-auth";

import ProfileSection from "@/components/ProfileSection/ProfileSection";
import UserFeed from "@/components/UserNotesFeed/UserNotesFeed";

import { fetchUserById } from "@/services/user/server/user.service";

const ProfileComponent = async ({ id }) => {
  const session = await getServerSession();

  const { data: user = {} } = (await fetchUserById(id)) ?? {};

  const isCurrentUserProfile = session?.user?.email === user?.email;
  const filteredNotes = user?.notes.filter((note) => {
    return isCurrentUserProfile || note?.visibility === "public";
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
