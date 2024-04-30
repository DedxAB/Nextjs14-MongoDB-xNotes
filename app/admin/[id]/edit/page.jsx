import EditProfileForm from "@/components/EditProfileForm/EditProfileForm";
import { fetchUserById } from "@/services/userServices";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Edit Profile",
};

const page = async ({ params }) => {
  const { id } = params;
  const session = await getServerSession();

  const { user } = await fetchUserById(id);

  const { bio, socialLinks, _id: userId } = user;

  if (session?.user?.email !== user?.email) {
    redirect("/");
  }

  return (
    <div className="min-h-[85vh]">
      <EditProfileForm userId={userId} bio={bio} socialLinks={socialLinks} />
    </div>
  );
};

export default page;
