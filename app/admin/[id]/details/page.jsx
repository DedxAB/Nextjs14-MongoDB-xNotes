import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import ProfileSection from "@/components/ProfileSection/ProfileSection";
import UserFeed from "@/components/UserNotesFeed/UserNotesFeed";

import { BASE_URL } from "@/utils/constants";
import { fetchUserById } from "@/services/user/server/user.service";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const { user } = await fetchUserById(id);
  return {
    title: `${user?.name || "Profile"}`,
  };
};

const page = async ({ params }) => {
  const { id } = params;
  const userData = await fetchUserById(id);
  const { data: user = {} } = userData ?? {};

  const session = await getServerSession();
  const userSession = session?.user;

  const currentUserMail = userSession?.email;

  if (user?.isAdmin && currentUserMail !== user?.email) {
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
