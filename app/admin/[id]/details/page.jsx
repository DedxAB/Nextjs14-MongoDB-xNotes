import NoteCard from "@/components/NoteCard/NoteCard";
import ProfileSection from "@/components/ProfileSection/ProfileSection";
import { Button } from "@/components/ui/button";
import { fetchUserById } from "@/services/userServices";
import Link from "next/link";
import { redirect } from "next/navigation";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const { user } = await fetchUserById(id);
  return {
    title: `${user?.name || "Profile"}`,
  };
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
  const { user } = await fetchUserById(id);

  if (!user?.isAdmin) {
    redirect("/");
  }

  return (
    <div className="min-h-[85vh]">
      <ProfileSection user={user} />
      {/* <ShowAllUser /> */}
      <Link href={`/admin/${id}/details/all-user`}>
        <Button className={`text-sm font-semibold mb-3`}>Fetch All User</Button>
      </Link>
      <UserFeed notes={user?.notes} user={user} />
    </div>
  );
};

export default page;
