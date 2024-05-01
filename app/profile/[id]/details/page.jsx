import ProfileSection from "@/components/ProfileSection/ProfileSection";
import UserFeed from "@/components/UserNotesFeed/UserNotesFeed";
import { fetchUserById } from "@/services/userServices";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const { user } = await fetchUserById(id);
  return {
    title: `${user?.name || "Profile"}`,
  };
};

const Profile = async ({ params }) => {
  const { id } = params;
  const { user } = await fetchUserById(id);

  return (
    <div className="min-h-[85vh]">
      <ProfileSection user={user} />
      <hr className="my-6" />
      <UserFeed notes={user?.notes} user={user} />
    </div>
  );
};

export default Profile;
