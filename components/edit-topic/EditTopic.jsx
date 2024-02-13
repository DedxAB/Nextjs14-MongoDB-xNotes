"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "../ui/input";

const EditTopic = ({ id, title, description }) => {
  // const { toast } = useToast();
  const route = useRouter();
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handelOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });
      if (!res.ok) {
        throw new Error("Failed to Edit topic");
      }
      toast.success("Topic updated successfully");
      route.push("/");
      route.refresh();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handelOnSubmit} className="flex flex-col gap-3">
      <Input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        type="text"
        name="topic"
        id="topic"
        placeholder="Topic name"
        className="border shadow w-full px-4 py-6 text-lg font-bold rounded"
      />
      <Input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        type="text"
        name="desc"
        id="desc"
        placeholder="Description"
        className="border shadow w-full px-4 py-6 font-bold rounded"
      />
      <Button
        type={`submit`}
        variant="outline"
        className="font-bold w-fit rounded"
      >
        Save Topic
      </Button>
    </form>
  );
};

export default EditTopic;
