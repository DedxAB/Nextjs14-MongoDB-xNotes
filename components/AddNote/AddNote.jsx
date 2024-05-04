"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useSession } from "next-auth/react";
import { ArrowUpToLine } from "lucide-react";
import { Label } from "../ui/label";
import { source_code_pro_font } from "@/utils/fonts";
import WelcomeBanner from "../WelcomeBanner/WelcomeBanner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PreviewNoteCard from "../PreviewNoteCard/PreviewNoteCard";

// Validate URL function
const isValidUrl = (url) => {
  const urlRegex =
    /^(https?:\/\/)?([a-z\d-]+\.)*[a-z\d-]+\.[a-z]{2,}(\/[^\s]*)?$/i;
  return urlRegex.test(url);
};

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [preview, setPreview] = useState(false);
  const [selectVisibility, setSelectVisibility] = useState("public");

  const router = useRouter();
  const { data: session } = useSession();

  // Clear all the data from the form
  const clearAllData = () => {
    setTitle("");
    setDescription("");
    setTags("");
    setWebsiteLink("");
  };

  const textareaRef = useRef(null);
  // Auto resize the textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [description]);

  useEffect(() => {
    const title = JSON.parse(localStorage.getItem("title"));
    const description = JSON.parse(localStorage.getItem("description"));
    const tags = JSON.parse(localStorage.getItem("tags"));
    const websiteLink = JSON.parse(localStorage.getItem("websiteLink"));

    if (title) setTitle(title);
    if (description) setDescription(description);
    if (tags) setTags(tags);
    if (websiteLink) setWebsiteLink(websiteLink);
  }, []);

  useEffect(() => {
    localStorage.setItem("title", JSON.stringify(title));
    localStorage.setItem("description", JSON.stringify(description));
    localStorage.setItem("tags", JSON.stringify(tags));
    localStorage.setItem("websiteLink", JSON.stringify(websiteLink));
  }, [title, description, tags, websiteLink]);

  // Max character count for the description
  const maxCharCount = 350;
  const handelDescriptionChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxCharCount) {
      setDescription(text);
      setCharCount(text.length);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.warning("Please fill all the fields");
      return;
    }

    // validate URL if provided
    if (websiteLink && !isValidUrl(websiteLink)) {
      toast.warning("Please enter a valid website link (if provided).");
      return;
    }

    const tagArray =
      tags && tags.trim() !== ""
        ? tags
            .trim()
            .split(/[\s,]+/)
            .filter(Boolean)
        : [];

    const toastId = toast.loading("Publishing Note...");
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
          visibility: selectVisibility,
        }),
      });

      // Check if the response is ok
      if (!res.ok) {
        // Get the error message from the response
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save Note");
      }

      toast.success("Note Published Sucessfully.", {
        id: toastId,
      });
      router.back();
      router.refresh();
      localStorage.removeItem("title");
      localStorage.removeItem("description");
      localStorage.removeItem("tags");
      localStorage.removeItem("websiteLink");
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
        title={`Write Note`}
        description={`Write and share your notes with us.`}
      />

      {/* Form to add the Note */}
      <form onSubmit={handelSubmit} className="flex flex-col gap-3">
        {/* Title input field */}
        <Label
          htmlFor="title"
          className={`font-bold md:text-base pl-1 text-[#444746] ${source_code_pro_font}`}
        >
          Title:
        </Label>

        <Input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
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
          value={description}
          placeholder={`Please fill the Details about the note`}
          className={`shadow px-4 py-3 font-bold min-h-32 overflow-hidden`}
        />
        <p className="text-right font-bold text-sm text-[#444746]">
          {charCount}/{maxCharCount}
        </p>
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
          className="shadow px-4 py-5  font-bold"
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
            setTags(e.target.value);
          }}
          value={tags}
          type="text"
          name="tags"
          id="tags"
          placeholder="development, tech, ... (Optional)"
          className="shadow px-4 py-5 font-bold"
        />

        {/* Buttons */}
        <div className="flex justify-between items-end gap-1">
          <div
            className={`font-bold md:text-base pl-1 text-[#444746] ${source_code_pro_font}`}
          >
            Want to Preview?
          </div>
          <div className="flex items-center flex-wrap justify-end gap-3 md:gap-4">
            <div>
              <Select
                onValueChange={(newValue) => setSelectVisibility(newValue)}
                defaultValue={selectVisibility}
              >
                <SelectTrigger className="w-[116px]">
                  <SelectValue placeholder="Share with" />
                </SelectTrigger>
                <SelectContent className="w-[124px]">
                  <SelectGroup>
                    <SelectLabel>Visibility</SelectLabel>
                    <SelectItem value="private" className={`cursor-pointer`}>
                      👨‍🎤&nbsp;Only me
                    </SelectItem>
                    <SelectItem value="public" className={`cursor-pointer`}>
                      🌏&nbsp;Public
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* Publish Button */}
            <Button type={`submit`} className="font-bold">
              <ArrowUpToLine className="w-4 h-4 mr-1" />
              Publish
            </Button>
          </div>
        </div>
      </form>

      {/* Preview Note */}
      <div>
        <Button
          onClick={() => setPreview(!preview)}
          variant={`outline`}
          className="font-bold w-fit mt-2 mr-2"
        >
          {preview ? "Hide Preview" : "Preview"}
        </Button>
        <Button className={`font-bold`} onClick={clearAllData}>
          Clear all
        </Button>

        {/* Preview Component  */}
        {preview && (
          <PreviewNoteCard
            title={title}
            description={description}
            tags={tags}
            websiteLink={websiteLink}
            selectVisibility={selectVisibility}
          />
        )}
      </div>
    </>
  );
};

export default AddNote;
