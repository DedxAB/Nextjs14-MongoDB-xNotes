import AdminToggle from "@/components/AdminToggle/AdminToggle";
import UserCard from "@/components/UserCard/UserCard";
import WelcomeBanner from "@/components/WelcomeBanner/WelcomeBanner";
import { Input } from "@/components/ui/input";
import { fetchAllUser, fetchUserByEmail } from "@/services/userServices";
import { josefin_sans_font } from "@/utils/fonts";
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
      {/* Search the user by name */}
      <form className="my-5 w-full md:w-1/2">
        <Input placeholder={`Search by name`} className={`font-bold`}></Input>
      </form>
      <h1 className="font-bold text-lg my-5">All Users</h1>
      {allUsers?.length > 0 &&
        allUsers?.map((user) => {
          return (
            <div className="w-full relative" key={user?._id}>
              <UserCard user={user} />
              <div
                className={`px-3 md:px-4 py-1 absolute right-0 bottom-1 ${josefin_sans_font} text-xs`}
              >
                <AdminToggle
                  user={user}
                  currentUserEmail={session?.user?.email}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default page;
