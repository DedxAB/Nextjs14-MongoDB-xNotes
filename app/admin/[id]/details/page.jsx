import NoteCard from "@/components/NoteCard/NoteCard";
import ProfileSection from "@/components/ProfileSection/ProfileSection";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/constants";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Profile",
};

const fetchUser = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/user/${id}`, {
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

const UserFeed = ({ notes, user }) => {
  return (
    <>
      {notes && notes.length > 0 && (
        <>
          <hr className="my-6" />
          <section>
            <h1 className="font-bold text-lg mb-3">All Notes</h1>
          </section>
        </>
      )}
      {notes?.length > 0 &&
        notes?.map((note) => {
          return <NoteCard key={note?._id} note={note} user={user} />;
        })}
    </>
  );
};

const page = async ({ params }) => {
  const { id } = params;
  const { user } = await fetchUser(id);

  if (!user?.isAdmin) {
    redirect("/");
  }
  
  return (
    <div className="min-h-[85vh]">
      <ProfileSection user={user} />
      {/* <ShowAllUser /> */}
      <Link href={`/admin/${id}/details/all-user`}>
        <Button variant={`outline`} className={`text-sm font-semibold mb-3`}>
          Fetch All User
        </Button>
      </Link>
      <UserFeed notes={user?.notes} user={user} />
    </div>
  );
};

export default page;
