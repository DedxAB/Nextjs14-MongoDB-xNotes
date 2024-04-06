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
import { Label } from "../ui/label";

const AddNote = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.warning("Please fill all the fields");
      return;
    }
    const tagArray =
      tags && tags.trim() !== ""
        ? tags
            .trim()
            .split(/[\s,]+/)
            .filter(Boolean)
        : [];

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          websiteLink,
          author: session?.user?.id,
          tags: tagArray,
        }),
      });

      // Check if the response is ok
      if (!res.ok) {
        // Get the error message from the response
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save Note");
      }

      toast.success("Note Published Sucessfully.");
      router.back();
      router.refresh();
    } catch (error) {
      // Display the error message
      toast.error(error.message);
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
          name="title"
          id="title"
          placeholder="Title of the Note..."
          className="border shadow outline-none w-full px-4 py-6 text-lg font-bold rounded"
        />

        {/* Website Link input field */}
        <Input
          onChange={(e) => {
            setWebsiteLink(e.target.value);
          }}
          value={websiteLink}
          type="text"
          name="websiteLike"
          id="websiteLike"
          placeholder="https://attach website link if any (Optional)"
          className="border shadow outline-none w-full px-4 py-5 text-base font-bold rounded"
        />

        {/* Description text area */}
        <Textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder={`Please fill the Details about the note`}
          className={`border shadow w-full px-4 py-3 font-bold rounded`}
        />

        {/* Tags text area */}
        <Label
          htmlFor="tags"
          className="font-bold md:text-base pl-1 mt-2 text-gray-500"
        >
          Tag: sepereated by comma or space for multiple tags
        </Label>

        <Input
          onChange={(e) => {
            setTags(e.target.value);
          }}
          value={tags}
          type="text"
          name="tags"
          id="tags"
          placeholder="tag1, tag2 - Optional"
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

export default AddNote;