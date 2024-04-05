import NoteCard from "../NoteCard/NoteCard";
import NoteCommentCard from "../NoteCommentCard/NoteCommentCard";
import NoteCommentForm from "../NoteCommentForm/NoteCommentForm";

const NoteDetailsById = ({ note }) => {
  const user = note?.author;
  // console.log(note);
  return (
    <>
      {/* Create Note banner  */}
      <div className="font-bold text-[#444746] mb-6 mt-8">
        <h1 className="text-4xl md:text-5xl py-1 bg-gradient-to-r from-blue-500  via-red-500 to-pink-500 bg-clip-text text-transparent">
          Note Details
        </h1>
        <h1 className="text-xl md:text-2xl my-2">Feel free to comment.</h1>
      </div>
      <NoteCard note={note} user={user} />
      <NoteCommentForm note={note} />
      {note?.comments?.length > 0 && (
        <h1 className="text-lg md:text-xl font-bold text-[#444746] my-5">
          Comments
        </h1>
      )}
      {note?.comments?.length > 0 ? (
        note?.comments?.map((comment) => (
          <NoteCommentCard key={comment?._id} comment={comment} />
        ))
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
