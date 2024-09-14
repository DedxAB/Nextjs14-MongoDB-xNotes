import { getServerSession } from "next-auth";
import NoteCard from "../NoteCard/NoteCard";
import NoteCommentCard from "../NoteCommentCard/NoteCommentCard";
import NoteCommentForm from "../NoteCommentForm/NoteCommentForm";
import { fetchUserByEmail } from "@/services/user/server/user.service";

const NoteDetailsById = async ({ note }) => {
  const user = note?.author;
  const session = await getServerSession();

  let currentUser;
  if (session) {
    const currentUserEmail = session?.user?.email;
    const data = await fetchUserByEmail(currentUserEmail);
    currentUser = data?.user;
  }
  return (
    <>
      <NoteCard note={note} noteAuthor={user} />
      <NoteCommentForm note={note} currentUser={currentUser} />

      {note?.comments?.length > 0 ? (
        <>
          <h1 className="text-lg md:text-xl font-bold text-[#444746] my-5">
            Comments
          </h1>
          {note?.comments?.map((comment) => (
            <NoteCommentCard key={comment?._id} comment={comment} note={note} />
          ))}
        </>
      ) : (
        <div className="my-10">
          <h1 className="text-base md:text-2xl font-bold text-[#444746]">
            No comments yet. Be the first to comment.
          </h1>
        </div>
      )}
    </>
  );
};

export default NoteDetailsById;
