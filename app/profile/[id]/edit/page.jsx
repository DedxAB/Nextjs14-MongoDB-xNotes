import EditProfileForm from "@/components/EditProfileForm/EditProfileForm";
import { fetchUserById } from "@/services/userServices";

export const metadata = {
  title: "Edit Profile",
};

const ProfileEditPage = async ({ params }) => {
  const { id } = params;
  // console.log(id);

  const { user } = await fetchUserById(id);

  const { bio, socialLinks, _id: userId } = user;
  // console.log(bio);
  return (
    <div className="min-h-[85vh]">
      <EditProfileForm userId={userId} bio={bio} socialLinks={socialLinks} />
    </div>
  );
};

export default ProfileEditPage;
