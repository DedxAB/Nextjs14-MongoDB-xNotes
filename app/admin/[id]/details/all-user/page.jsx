import UserCard from "@/components/UserCard/UserCard";
import { BASE_URL } from "@/utils/constants";

const fetchAllUser = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/user`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to get User");
    }
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const page = async () => {
  const { users } = await fetchAllUser();
  return (
    <div className="min-h-[85vh]">
      <h1 className="font-bold text-lg mb-3">All Users</h1>
      {users?.length > 0 &&
        users?.map((user) => {
          return (
            <div className="w-full relative" key={user?._id}>
              <UserCard user={user} />
              <div className="border mb-3 rounded px-3 md:px-4 py-2 absolute right-0 top-0">
                Admin: {user?.isAdmin}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default page;
