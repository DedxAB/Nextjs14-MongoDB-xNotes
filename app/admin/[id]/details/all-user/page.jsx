import AdminToggle from "@/components/AdminToggle/AdminToggle";
import UserCard from "@/components/UserCard/UserCard";
import { BASE_URL } from "@/utils/constants";
import { josefin_sans_font } from "@/utils/fonts";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const fetchAllUser = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/user`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to get all Users");
    }
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const page = async () => {
  const session = await getServerSession();
  const { allUsers } = await fetchAllUser();

  // if (!session?.user?.isAdmin) {
  //   redirect("/");
  // }

  return (
    <div className="min-h-[85vh]">
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
