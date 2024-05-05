import ProfileSection from "@/components/ProfileSection/ProfileSection";
import UserFeed from "@/components/UserNotesFeed/UserNotesFeed";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { fetchUserById } from "@/services/userServices";
import { BASE_URL } from "@/utils/constants";
import Link from "next/link";
import { redirect } from "next/navigation";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const { user } = await fetchUserById(id);
  return {
    title: `${user?.name || "Profile"}`,
  };
};

const page = async ({ params }) => {
  const { id } = params;
  const { user } = await fetchUserById(id);

  if (!user?.isAdmin) {
    redirect("/");
  }

  return (
    <div className="min-h-[85vh]">
      <div className="mt-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href={`${BASE_URL}`}>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Admin Profile</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ProfileSection user={user} />
      {/* <ShowAllUser /> */}
      <Link href={`/admin/${id}/details/all-user`}>
        <Button className={`text-sm font-semibold mb-1`}>Fetch All User</Button>
      </Link>
      <hr className="my-6" />
      <UserFeed notes={user?.notes} user={user} />
    </div>
  );
};

export default page;
