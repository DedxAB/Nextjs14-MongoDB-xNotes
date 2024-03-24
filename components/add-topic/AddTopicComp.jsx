"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useSession } from "next-auth/react";
import { ArrowUpToLine, MessageSquareX } from "lucide-react";
import Link from "next/link";

const AddTopic = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.warning("Please fill all the fields");
      return;
    }
    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ title, description, author: session?.user?.id }),
      });

      if (!res.ok) {
        throw new Error("Failed to save Note");
      }
      toast.success("Note Added Successfully.");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {/* Create Note banner  */}
      <div className="font-bold text-[#444746] mb-6 mt-8">
        <h1 className="text-4xl md:text-5xl py-1 bg-gradient-to-r from-blue-500  via-red-500 to-pink-500 bg-clip-text text-transparent">
          Write Note
        </h1>
        <h1 className="text-xl md:text-2xl my-2">
          Write and share your notes with us.
        </h1>
      </div>

      {/* Form to add the Note */}
      <form onSubmit={handelSubmit} className="flex flex-col gap-3">
        {/* Title input field */}
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

        {/* Description text area */}
        <Textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder={`Please fill the Details about the topic`}
          className={`border shadow w-full px-4 py-3 font-bold rounded`}
        />

        {/* Tags text area */}
        <Input
          // onChange={(e) => {
          //   setTitle(e.target.value);
          // }}
          // value={title}
          type="text"
          name="tags"
          id="tags"
          placeholder="#tag - #nextjs14"
          className="border shadow outline-none w-full px-4 py-5 text-base font-bold rounded"
        />

        {/* Buttons */}
        <div className="ml-auto">
          {/* Cancel Button */}
          <Link href={`/`}>
            <Button variant={`outline`} className="font-bold w-fit mr-3">
              <MessageSquareX className="w-4 mr-1" />
              {/* <X className="w-4 mr-1" /> */}
              Cancel
            </Button>
          </Link>

          {/* Publish Button */}
          <Button
            type={`submit`}
            variant={`outline`}
            className="font-bold w-fit"
          >
            <ArrowUpToLine className="w-4 mr-1" />
            Publish
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddTopic;
