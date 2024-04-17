import UserCard from "@/components/UserCard/UserCard";
import { BASE_URL } from "@/utils/constants";
import { josefin_sans_font } from "@/utils/fonts";

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
  const { allUsers } = await fetchAllUser();
  return (
    <div className="min-h-[85vh]">
      <h1 className="font-bold text-lg mb-3">All Users</h1>
      {allUsers?.length > 0 &&
        allUsers?.map((user) => {
          return (
            <div className="w-full relative" key={user?._id}>
              <UserCard user={user} />
              <div
                className={`px-3 md:px-4 py-1 absolute right-0 bottom-1 ${josefin_sans_font} text-xs`}
              >
                Admin: {user?.isAdmin ? "Yes" : "No"}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default page;
