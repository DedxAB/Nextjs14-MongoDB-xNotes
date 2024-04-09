import EditProfileForm from "@/components/EditProfileForm/EditProfileForm";
import { BASE_URL } from "@/utils/constants";

export const metadata = {
  title: "Edit Profile",
};

const fetchUserById = async (id) => {
  // console.log(id);
  try {
    const res = await fetch(`${BASE_URL}/api/user/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to get User");
    }
    return await res.json();
  } catch (error) {
    console.error(error.message);
  }
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
