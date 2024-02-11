"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const EditTopic = ({ id, title, description }) => {
  const route = useRouter();
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handelOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });
      if (!res.ok) {
        throw new Error("Failed to Edit topic");
      }
      alert("Updated successfully");
      route.push("/");
      route.refresh();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handelOnSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        type="text"
        name="topic"
        id="topic"
        placeholder="Topic name"
        className="border border-slate-600 outline-none w-full p-4 text-lg rounded"
      />
      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        type="text"
        name="desc"
        id="desc"
        placeholder="Description"
        className="border border-slate-600 outline-none w-full p-4 text-lg rounded"
      />
      <Button type={`submit`} variant="outline" className="text-lg font-bold w-fit">
        Edit topic
      </Button>
    </form>
  );
};

export default EditTopic;
