import EditProfileForm from "@/components/EditProfileForm/EditProfileForm";
import { fetchUserById } from "@/services/userServices";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Edit Profile",
};

const ProfileEditPage = async ({ params }) => {
  const { id } = params;
  const session = await getServerSession();
  // console.log(id);

  const { user } = await fetchUserById(id);

  const { bio, socialLinks, _id: userId } = user;
  // console.log(bio);

  if (session?.user?.email === user?.email) {
    return (
      <div className="min-h-[85vh]">
        <EditProfileForm userId={userId} bio={bio} socialLinks={socialLinks} />
      </div>
    );
  } else {
    redirect("/");
  }
};

export default ProfileEditPage;
