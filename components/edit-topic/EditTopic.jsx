import { Button } from "../ui/button";

const EditTopic = () => {
  return (
      <form className="flex flex-col gap-3">
        <input
          type="text"
          name="topic"
          id="topic"
          placeholder="Topic name"
          className="border border-slate-600 outline-none w-full p-4 text-lg rounded"
        />
        <input
          type="text"
          name="desc"
          id="desc"
          placeholder="Description"
          className="border border-slate-600 outline-none w-full p-4 text-lg rounded"
        />
        <Button variant="outline" className="text-lg font-bold w-fit">
          Edit topic
        </Button>
      </form>
  );
};

export default EditTopic;
