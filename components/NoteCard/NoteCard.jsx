"use client";
import { FilePenLine, Pencil } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import RemoveButtonComp from "../Remove-Button/RemoveBtnComp";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const NoteCard = ({ key, note, user }) => {
  const { data: session } = useSession();
  const pathName = usePathname();

  /* Destructure the note object 
    {
  _id: '65fda3f22f7ede6787e9f5af',
  email: 'arnab.iguniverse@gmail.com',
  name: 'Arnab Bhoumik',
  image: 'https://lh3.googleusercontent.com/a/ACg8ocI1XTigSLw4VGEwGPKzRgn7G0h94GUPOupylNyMa9nBrA=s96-c',
  username: 'arnab.iguniverse',
  createdAt: '2024-03-22T15:29:54.498Z',
  updatedAt: '2024-03-27T10:04:57.356Z',
  __v: 0,
  notes: [
    {
      _id: '6603ef492123d9a648fbd1f1',
      title: 'Topic profile  note',
      description: 'profile description',
      author: '65fda3f22f7ede6787e9f5af',
      createdAt: '2024-03-27T10:04:57.267Z',
      updatedAt: '2024-03-27T10:04:57.267Z',
      __v: 0
    }
  ]
}
    */
  return (
    <>
      <div
        className="border flex justify-start gap-1 mb-3 rounded px-3 md:px-4 py-3 shadow cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out"
        key={key}
      >
        {/* Show the author image */}
        <Link href={`/profile/${user?._id}`} className="my-1 mr-2">
          <Avatar>
            <AvatarImage src={user?.image} />
          </Avatar>
        </Link>
        <div className="w-full">
          {/* Show the author name, username */}
          <div className="flex flex-wrap text-xs mb-1">
            {/* name  */}
            <h2 className="font-bold mr-1">{user?.name}</h2>

            {/* username */}
            <span className="text-gray-500">@{user?.username}</span>
          </div>
          <div className="flex justify-between items-start gap-1">
            {/* Show the title and date */}
            <div>
              {/* title  */}
              <h2 className="text-base md:text-lg font-bold underline">
                {note?.title}
              </h2>

              {/* date */}
              <div className="flex flex-wrap justify-start items-center text-[#6b6e6e]">
                <div className="text-xs mr-2">
                  {new Date(note?.createdAt).toLocaleString("en-US", {
                    timeZone: "Asia/Kolkata",
                  })}
                </div>

                {/* Show the edited date if updated */}
                {note?.updatedAt !== note?.createdAt && (
                  <div className="flex items-center gap-1">
                    <FilePenLine className="w-3" />
                    <div className="text-xs">edited</div>
                  </div>
                )}
              </div>
            </div>

            {/* Show Edit and remove button based on user who created this note */}
            {/* {alert(session?.user?.id)} */}
            {session?.user?.id === note?.author &&
              pathName === `/profile/${user?._id}` && (
                <div className="min-w-20">
                  {/* Add the edit button */}
                  <Link href={`/edit-note/${note?._id}`}>
                    <Button variant="outline" size="icon" className="mr-2">
                      <Pencil className="w-4" />
                    </Button>
                  </Link>
                  {/* Add the remove button */}
                  <RemoveButtonComp id={note?._id} />
                </div>
              )}
          </div>
 
          {/* Show the description */}
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold mt-2">{note?.description}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
