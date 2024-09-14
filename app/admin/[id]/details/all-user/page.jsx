import AllUserDetails from "@/components/AllUserDetails/AllUserDetails";
import WelcomeBanner from "@/components/WelcomeBanner/WelcomeBanner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  fetchAllUser,
  fetchUserByEmail,
} from "@/services/user/server/user.service";
import { BASE_URL } from "@/utils/constants";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "All User",
};

const page = async ({ params }) => {
  const { id } = params;
  const session = await getServerSession();
  const { allUsers } = await fetchAllUser();
  const { user: currentUser } = await fetchUserByEmail(session?.user?.email);

  if (!currentUser?.isAdmin) {
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
            <BreadcrumbItem>All User</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* Banner Section */}
      <WelcomeBanner
        title={`Welcome Admin`}
        description={`Here you can see all the users and toggle their admin status.`}
      />

      {/* All Users details  */}
      <AllUserDetails allUsers={allUsers} session={session} />
    </div>
  );
};

export default page;
