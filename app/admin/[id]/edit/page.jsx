import EditProfileForm from "@/components/EditProfileForm/EditProfileForm";
import { fetchUserById } from "@/services/userServices";

export const metadata = {
  title: "Edit Profile",
};

const page = async ({ params }) => {
  const { id } = params;

  const { user } = await fetchUserById(id);

  const { bio, socialLinks, _id: userId } = user;

  return (
    <div className="min-h-[85vh]">
      <EditProfileForm userId={userId} bio={bio} socialLinks={socialLinks} />
    </div>
  );
};

export default page;
