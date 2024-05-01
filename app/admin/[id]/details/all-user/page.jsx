import AllUserDetails from "@/components/AllUserDetails/AllUserDetails";
import WelcomeBanner from "@/components/WelcomeBanner/WelcomeBanner";
import { fetchAllUser, fetchUserByEmail } from "@/services/userServices";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "All User",
};

const page = async () => {
  const session = await getServerSession();
  const { allUsers } = await fetchAllUser();
  const { user: currentUser } = await fetchUserByEmail(session?.user?.email);

  if (!currentUser?.isAdmin) {
    redirect("/");
  }

  return (
    <div className="min-h-[85vh]">
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
