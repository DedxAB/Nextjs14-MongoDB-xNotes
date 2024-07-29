import EditProfileForm from "@/components/EditProfileForm/EditProfileForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fetchUserById } from "@/services/userServices";
import { BASE_URL } from "@/utils/constants";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Edit Profile",
};

const ProfileEditPage = async ({ params }) => {
  const { id } = params;
  const session = await getServerSession();
  // console.log(id);

  const { data: { bio, socialLinks, _id: userId, username, name, email } = {} } = await fetchUserById(id);

  // console.log(bio);

  if (session?.user?.email === email) {
    return (
      <div className="min-h-full">
        {/* Breadcrumb */}
        <div className="mt-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href={`${BASE_URL}`}>Home</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href={`${BASE_URL}/profile/${id}/details`}>Profile</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>Edit</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Edit Profile Form Here */}
        <EditProfileForm
          userId={userId}
          bio={bio}
          socialLinks={socialLinks}
          name={name}
          username={username}
        />
      </div>
    );
  } else {
    redirect("/");
  }
};

export default ProfileEditPage;
