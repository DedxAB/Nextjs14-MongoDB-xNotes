"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Link from "next/link";
import { MessageSquareX, Save } from "lucide-react";
import { Label } from "../ui/label";

const EditTopic = ({ id, title, description, author, tags, websiteLink }) => {
  const route = useRouter();
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newTags, setNewTags] = useState(tags.join(", "));
  const [newWebsiteLink, setNewWebsiteLink] = useState(websiteLink);

  const handelOnSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDescription) {
      toast.warning("Please fill all the fields");
      return;
    }

    const tagArray = newTags ? newTags.split(/[\s,]+/) : ["untagged"];

    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          newTitle,
          newDescription,
          newTags: tagArray,
          newWebsiteLink,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to Edit topic");
      }
      toast.success("Note Updated Successfully.");
      route.back();
      route.refresh();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {/* Create Note banner  */}
      <div className="font-bold text-[#444746] mb-6 mt-8">
        <h1 className="text-4xl md:text-5xl py-1 bg-gradient-to-r from-blue-500  via-red-500 to-pink-500 bg-clip-text text-transparent">
          Any Changes?
        </h1>
        <h1 className="text-xl md:text-2xl my-2">
          Dont worry! You are at right place.
        </h1>
      </div>
      <form onSubmit={handelOnSubmit} className="flex flex-col gap-3">
        {/* Title input field */}
        <Input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          type="text"
          name="topic"
          id="topic"
          placeholder="Topic name"
          className="border shadow w-full px-4 py-6 text-lg font-bold rounded"
        />

        {/* Website Link input field */}
        <Input
          onChange={(e) => {
            setNewWebsiteLink(e.target.value);
          }}
          value={newWebsiteLink}
          type="text"
          name="websiteLike"
          id="websiteLike"
          placeholder="https://attach website link if any (Optional)"
          className="border shadow outline-none w-full px-4 py-5 text-base font-bold rounded"
        />

        {/* Description text area */}
        <Textarea
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
          placeholder={`Please fill the Details about the topic`}
          className={`border shadow w-full px-4 py-3 font-bold rounded`}
        />

        {/* Tags text area */}
        <Label htmlFor="tags" className="font-bold md:text-base pl-1 mt-1">
          Tags: #tag1, #tag2, ...sepereated by comma or space for multiple tags
        </Label>

        <Input
          onChange={(e) => {
            setNewTags(e.target.value);
          }}
          value={newTags}
          type="text"
          name="tags"
          id="tags"
          placeholder="#tag1, #tag2 - Optional"
          className="border shadow outline-none w-full px-4 py-5 text-base font-bold rounded"
        />

        {/* Buttons */}
        <div className="ml-auto">
          {/* Cancel Button */}
          <Link href={`/profile/${author?._id}`}>
            <Button variant={`outline`} className="font-bold w-fit mr-3">
              <MessageSquareX className="w-4 mr-1" />
              {/* <X className="w-4 mr-1" /> */}
              Cancel
            </Button>
          </Link>

          {/* Save Button */}
          <Button
            type={`submit`}
            variant={`outline`}
            className="font-bold w-fit"
          >
            <Save className="w-4 mr-1" />
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditTopic;
