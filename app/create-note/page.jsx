import AddNote from "@/components/AddNote/AddNote";

export const metadata = {
  title: "Create Note",
};

const page = () => {
  return (
    <div className="min-h-[85vh]">
      <AddNote />
    </div>
  );
};

export default page;