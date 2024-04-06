import AddNote from "@/components/AddNote/AddNote";

export const metadata = {
  title: "Add Note | DedxNotes",
  description: "Created by DedxAB | A Note sharing WebApp.",
};

const page = () => {
  return (
    <div className="min-h-[85vh]">
      <AddNote />
    </div>
  );
};

export default page;
