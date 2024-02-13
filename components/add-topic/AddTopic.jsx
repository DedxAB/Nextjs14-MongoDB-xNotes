"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Input } from "../ui/input";

const AddTopic = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.warning("Please fill all the fields")
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
      toast.success("Topic added successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <form onSubmit={handelSubmit} className="flex flex-col gap-3">
        <Input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          type="text"
          name="topic"
          id="topic"
          placeholder="Topic name"
          className="border shadow outline-none w-full px-4 py-6 text-lg font-bold rounded"
        />
        <Input
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
          type="text"
          name="desc"
          id="desc"
          placeholder="Description"
          className="border shadow outline-none w-full px-4 py-6 font-bold rounded"
        />
        <Button
          type={`submit`}
          variant={`outline`}
          className="font-bold w-fit rounded"
        >
          Add Topic
        </Button>
      </form>
    </>
  );
};

export default AddTopic;
