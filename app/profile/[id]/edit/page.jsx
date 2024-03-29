import EditProfileForm from "@/components/EditProfileForm/EditProfileForm";
import { BASE_URL } from "@/utils/constants";

const fetchUserById = async (id) => {
  // console.log(id);
  try {
    const res = await fetch(`${BASE_URL}/api/user/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to get User data");
    }
    return await res.json();
  } catch (error) {
    console.error(error.message);
  }
};

const ProfileEditPage = async ({ params }) => {
  const { id } = params;
  // console.log(id);
  let user = {};
  try {
    const response = await fetchUserById(id);
    user = response.user;
    // console.log(user);
  } catch (error) {
    console.log(error.message);
  }
  const { bio, socailLinks, _id: userId } = user;
  return (
    <div className="min-h-screen">
      <EditProfileForm authorId={userId} bio={bio} socailLinks={socailLinks} />
    </div>
  );
};

export default ProfileEditPage;
