import NoteCard from "../NoteCard/NoteCard";
import NoteCommentCard from "../NoteCommentCard/NoteCommentCard";
import NoteCommentForm from "../NoteCommentForm/NoteCommentForm";
import WelcomeBanner from "../WelcomeBanner/WelcomeBanner";

const NoteDetailsById = ({ note }) => {
  const user = note?.author;

  return (
    <>
      {/* Create Note banner  */}
      <WelcomeBanner
        title={`Note Details`}
        description={`Feel free to comment.`}
      />

      <NoteCard note={note} user={user} />
      <NoteCommentForm note={note} />

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
