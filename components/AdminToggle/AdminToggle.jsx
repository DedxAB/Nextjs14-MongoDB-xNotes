import { BASE_URL } from "@/utils/constants";
import UserCard from "../UserCard/UserCard";

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

const AdminToggle = async () => {
  const { users } = await fetchAllUser();
  return (
    <div>
      <h1 className="font-bold text-lg mb-3">All Users</h1>
      {users?.length > 0 &&
        users?.map((user) => {
          return <UserCard key={user?._id} user={user} />;
        })}
    </div>
  );
};

export default AdminToggle;
