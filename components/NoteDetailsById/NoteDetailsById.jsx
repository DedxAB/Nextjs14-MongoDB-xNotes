import NoteCard from "../NoteCard/NoteCard";
import NoteCommentCard from "../NoteCommentCard/NoteCommentCard";
import NoteCommentForm from "../NoteCommentForm/NoteCommentForm";

const NoteDetailsById = ({ note }) => {
  // console.log(note);
  const noteId = note._id;
  const user = note.author;
  return (
    <>
      {/* Create Note banner  */}
      <div className="font-bold text-[#444746] mb-6 mt-8">
        <h1 className="text-4xl md:text-5xl py-1 bg-gradient-to-r from-blue-500  via-red-500 to-pink-500 bg-clip-text text-transparent">
          Note Details
        </h1>
        <h1 className="text-xl md:text-2xl my-2">
          Here is the details of the Note. Feel free to comment.
        </h1>
      </div>
      <NoteCard noteId={noteId} note={note} user={user} />
      <NoteCommentForm />
      <NoteCommentCard />
    </>
  );
};

export default NoteDetailsById;
