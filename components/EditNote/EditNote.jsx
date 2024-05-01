"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Link from "next/link";
import { MessageSquareX, Save } from "lucide-react";
import { Label } from "../ui/label";
import { source_code_pro_font } from "@/utils/fonts";
import WelcomeBanner from "../WelcomeBanner/WelcomeBanner";

// Validate URL function
const isValidUrl = (url) => {
  const urlRegex =
    /^(https?:\/\/)?([a-z\d-]+\.)*[a-z\d-]+\.[a-z]{2,}(\/[^\s]*)?$/i;
  return urlRegex.test(url);
};

const EditNote = ({ id, title, description, author, tags, websiteLink }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newTags, setNewTags] = useState(tags.join(", "));
  const [newWebsiteLink, setNewWebsiteLink] = useState(websiteLink);
  const [charCount, setCharCount] = useState(0);

  const route = useRouter();

  // resize textarea
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newDescription]);

  // Max character count for description
  const maxCharCount = 350;
  const handelDescriptionChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxCharCount) {
      setNewDescription(text);
      setCharCount(text.length);
    }
  };

  const handelOnSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDescription) {
      toast.warning("Please fill all the fields");
      return;
    }

    // validate URL if provided
    if (newWebsiteLink && !isValidUrl(newWebsiteLink)) {
      toast.warning("Please enter a valid website link (if provided).");
      return;
    }

    const tagArray =
      newTags && newTags.trim() !== ""
        ? newTags
            .trim()
            .split(/[\s,]+/)
            .filter(Boolean)
        : [];

    const toastId = toast.loading("Updating Note...");
    try {
      const res = await fetch(`/api/notes/${id}`, {
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
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to Edit note.");
      }
      toast.success("Note Updated Successfully.", {
        id: toastId,
      });
      route.back();
      route.refresh();
    } catch (error) {
      toast.error(error.message, {
        id: toastId,
      });
      console.log(error.message);
    }
  };

  return (
    <>
      {/* Create Note banner  */}
      <WelcomeBanner
        title="Any Changes?"
        description={`Dont worry! You are at right place.`}
      />

      <form onSubmit={handelOnSubmit} className="flex flex-col gap-3">
        {/* Title input field */}
        <Label
          htmlFor="title"
          className={`font-bold md:text-base pl-1 text-[#444746] ${source_code_pro_font}`}
        >
          Title:
        </Label>
        <Input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          type="text"
          name="title"
          id="title"
          placeholder="Title of the Note..."
          className="shadow px-4 py-6 text-lg font-bold"
        />

        {/* Description text area */}
        <Label
          htmlFor="description"
          className={`font-bold md:text-base pl-1 text-[#444746] ${source_code_pro_font}`}
        >
          Description:
        </Label>
        <Textarea
          id="description"
          ref={textareaRef}
          onChange={handelDescriptionChange}
          value={newDescription}
          placeholder={`Please fill the Details about the note`}
          className={`shadow px-4 py-3 font-bold min-h-32 overflow-hidden`}
        />
        <p className="font-bold text-right text-sm text-[#444746]">
          {charCount}/{maxCharCount}
        </p>
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
          className="shadow px-4 py-5 font-bold"
        />

        {/* Tags text area */}
        <Label
          htmlFor="tags"
          className={`font-bold md:text-base pl-1 text-[#444746] ${source_code_pro_font}`}
        >
          Keyword: (for better search results)
        </Label>

        <Input
          onChange={(e) => {
            setNewTags(e.target.value);
          }}
          value={newTags}
          type="text"
          name="tags"
          id="tags"
          placeholder="development, tech, ... (Optional)"
          className="shadow px-4 py-5 font-bold"
        />

        {/* Buttons */}
        <div className="ml-auto">
          {/* Cancel Button */}
          <Link href={`/profile/${author?._id}/details`}>
            <Button variant={`outline`} className="font-bold w-fit mr-3">
              <MessageSquareX className="w-4 h-4 mr-1" />
              Cancel
            </Button>
          </Link>

          {/* Save Button */}
          <Button className="font-bold w-fit">
            <Save className="w-4 h-4 mr-1" />
            Update
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditNote;
