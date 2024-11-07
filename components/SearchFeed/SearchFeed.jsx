import NoteCard from '../NoteCard/NoteCard';
import UserCard from '../UserCard/UserCard';

const SearchFeed = ({ notes, users }) => {
  // console.log("notes", notes);
  // console.log("users", users);
  return (
    <div className="mt-10">
      {users &&
        users.length > 0 &&
        users.map((user) => <UserCard key={user?._id} user={user} />)}
      {notes &&
        notes.length > 0 &&
        notes.map((note) => (
          <NoteCard key={note?._id} note={note} noteAuthor={note?.author} />
        ))}
      {users.length === 0 && notes.length === 0 && (
        <h1 className="font-bold text-base">
          No results found. Please try again with a different search term.
        </h1>
      )}
    </div>
  );
};

export default SearchFeed;
