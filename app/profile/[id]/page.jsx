import { BASE_URL } from "@/utils/constants";
import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

export const metadata = {
  title: "Profile | DedxNotes",
  description: "Created by DedxAB, This is a note-taking app.",
};

const fetchUser = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/user/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Error fetching User");
    return res.json();
  } catch (error) {
    console.log(error.message);
  }
};

const ProfileComponent = ({ name, username }) => {
  return (
    <section>
      <div className="font-bold text-[#444746] mb-6 mt-8">
        <h1 className="text-4xl md:text-5xl py-1 bg-gradient-to-r from-blue-500  via-red-500 to-pink-500 bg-clip-text text-transparent">
          Profile
        </h1>
        <div className="flex flex-wrap">
          <p className="text-xl md:text-2xl my-2 mr-2">{name}</p>
          <p className="text-xl md:text-2xl my-2">@{username}</p>
        </div>
      </div>
    </section>
  );
};

const Feed = () => {
  return (
    <>
      <section>
        <h1 className="font-bold text-lg">All Notes</h1>
      </section>
      {/* <NotesFeed /> */}
    </>
  );
};

const Profile = async ({ params }) => {
  const session = await getServerSession();
  console.log(session);
  const { id } = params;
  const { user } = await fetchUser(id);

  // if (!user && !session) {
  //   redirect("/");
  //   return;
  // }
  // console.log(user);
  return (
    <>
      <ProfileComponent name={user?.name} username={user?.username} />
      <Feed />
    </>
  );
};

export default Profile;
