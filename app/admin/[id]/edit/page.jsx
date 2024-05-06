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

const page = async ({ params }) => {
  const { id } = params;
  const session = await getServerSession();

  const { user } = await fetchUserById(id);

  const { bio, socialLinks, _id: userId } = user;

  if (session?.user?.email !== user?.email) {
    redirect("/");
  }

  return (
    <div className="min-h-full">
      <div className="mt-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href={`${BASE_URL}`}>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href={`${BASE_URL}/admin/${id}/details`}>
                Admin Profile
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Edit</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <EditProfileForm userId={userId} bio={bio} socialLinks={socialLinks} />
    </div>
  );
};

export default page;
