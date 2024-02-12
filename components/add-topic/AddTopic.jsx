"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

const AddTopic = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        throw new Error("Failed to save topic");
      }
      alert("Topic saved successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <form onSubmit={handelSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          type="text"
          name="topic"
          id="topic"
          placeholder="Topic name"
          className="border shadow outline-none w-full p-4 text-lg rounded"
        />
        <input
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
          type="text"
          name="desc"
          id="desc"
          placeholder="Description"
          className="border shadow outline-none w-full p-4 text-lg rounded"
        />
        <Button
          type={`submit`}
          variant="outline"
          className="text-lg font-bold w-[109px] rounded"
        >
          Save Topic
        </Button>
      </form>
    </>
  );
};

export default AddTopic;
