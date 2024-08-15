"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
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
import { cn } from "@/lib/utils";
import { generateSlug } from "@/utils/slugGenerator";

// Validate URL function
const isValidUrl = (url) => {
  const urlRegex =
    /^(https?:\/\/)?([a-z\d-]+\.)*[a-z\d-]+\.[a-z]{2,}(\/[^\s]*)?$/i;
  return urlRegex.test(url);
};

const EditNote = ({
  id,
  title,
  description,
  author,
  tags,
  websiteLink,
  visibility,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newTags, setNewTags] = useState(tags.join(", "));
  const [newWebsiteLink, setNewWebsiteLink] = useState(websiteLink);
  const [charCount, setCharCount] = useState(0);
  const [preview, setPreview] = useState(false);
  const [selectNewVisibility, setSelectNewVisibility] = useState(
    visibility || "public"
  );

  const route = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  // resize textarea
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newDescription]);

  // Max character count for description
  const maxCharCount = 550;
  const handelDescriptionChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxCharCount) {
      setNewDescription(text);
      setCharCount(text.length);
    }
  };

  // Clear all data function
  const clearAllData = () => {
    setNewTitle("");
    setNewDescription("");
    setNewTags("");
    setNewWebsiteLink("");
    setSelectNewVisibility("public");
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
          selectNewVisibility,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to Edit note.");
      }

      if (from === "details") {
        route.push(`/note/${generateSlug(newTitle)}/${id}`);
      } else if (from === "profile") {
        route.push(`/user/${author?.username}/${author?._id}`);
      } else {
        route.push(`/`);
      }

      route.refresh();

      toast.success("Note Updated Successfully.", {
        id: toastId,
      });
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

      <div className="flex flex-col gap-3">
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
        <div className="flex items-center justify-between gap-1">
          <p
            className={cn(
              "text-sm font-bold text-[#444746] pl-1",
              source_code_pro_font
            )}
          >
            Saved automatically as you type.
          </p>
          <p className="text-right font-bold text-sm text-[#444746]">
            {charCount}/{maxCharCount}
          </p>
        </div>
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

        <div className="flex justify-end md:justify-between items-center gap-1 mt-3">
          <div
            className={`font-bold hidden md:block md:text-base pl-1 text-[#444746] ${source_code_pro_font}`}
          >
            Want to preview the note before publishing?
          </div>
          <div className="flex gap-3 items-center justify-end">
            <Button
              onClick={() => setPreview(!preview)}
              variant={`outline`}
              className="font-bold w-fit px-3"
            >
              {preview ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 mr-1 text-foreground"
                    color={"#000000"}
                    fill={"none"}
                  >
                    <path
                      d="M5.75 5L19.75 19"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.75 12C22.75 6.47715 18.2728 2 12.75 2C7.22715 2 2.75 6.47715 2.75 12C2.75 17.5228 7.22715 22 12.75 22C18.2728 22 22.75 17.5228 22.75 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 mr-1 text-foreground"
                    color={"#000000"}
                    fill={"none"}
                  >
                    <path
                      d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </>
              )}
              {preview ? "Hide Preview" : "Preview"}
            </Button>
            <Button className={`font-bold`} onClick={clearAllData}>
              Clear all
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Component  */}
      {preview && (
        <PreviewNoteCard
          title={newTitle}
          description={newDescription}
          tags={newTags}
          websiteLink={newWebsiteLink}
          selectVisibility={selectNewVisibility}
          noteId={id}
        />
      )}

      <div className="flex items-center justify-end md:justify-end gap-3 mt-5 mb-32">
        <div>
          <Select
            onValueChange={(newValue) => setSelectNewVisibility(newValue)}
            defaultValue={selectNewVisibility}
          >
            <SelectTrigger className="w-[116px]">
              <SelectValue placeholder="Share with" />
            </SelectTrigger>
            <SelectContent>
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
        <Button onClick={handelOnSubmit} className="font-bold">
          {/* <ArrowUpToLine className="w-4 h-4 mr-1" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-4 h-4 mr-1 text-white"
            color={"#000000"}
            fill={"none"}
          >
            <path
              d="M17.4776 9.01106C17.485 9.01102 17.4925 9.01101 17.5 9.01101C19.9853 9.01101 22 11.0294 22 13.5193C22 15.8398 20.25 17.7508 18 18M17.4776 9.01106C17.4924 8.84606 17.5 8.67896 17.5 8.51009C17.5 5.46695 15.0376 3 12 3C9.12324 3 6.76233 5.21267 6.52042 8.03192M17.4776 9.01106C17.3753 10.1476 16.9286 11.1846 16.2428 12.0165M6.52042 8.03192C3.98398 8.27373 2 10.4139 2 13.0183C2 15.4417 3.71776 17.4632 6 17.9273M6.52042 8.03192C6.67826 8.01687 6.83823 8.00917 7 8.00917C8.12582 8.00917 9.16474 8.38194 10.0005 9.01101"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 13L12 21M12 13C11.2998 13 9.99153 14.9943 9.5 15.5M12 13C12.7002 13 14.0085 14.9943 14.5 15.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Update
        </Button>

        {/* Cancel Button */}
        {/* <Link href={`/profile/${author?._id}/details`}> */}
        <Button
          variant={`outline`}
          className="font-bold w-fit"
          onClick={() => route.back()}
        >
          {/* <MessageSquareX className="w-4 h-4 mr-1" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            className="w-4 h-4 mr-1"
            viewBox="0 0 48 48"
          >
            <linearGradient
              id="wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1"
              x1="9.858"
              x2="38.142"
              y1="9.858"
              y2="38.142"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#f44f5a"></stop>
              <stop offset=".443" stopColor="#ee3d4a"></stop>
              <stop offset="1" stopColor="#e52030"></stop>
            </linearGradient>
            <path
              fill="url(#wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1)"
              d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
            ></path>
            <path
              d="M33.192,28.95L28.243,24l4.95-4.95c0.781-0.781,0.781-2.047,0-2.828l-1.414-1.414	c-0.781-0.781-2.047-0.781-2.828,0L24,19.757l-4.95-4.95c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l4.95,4.95l-4.95,4.95c-0.781,0.781-0.781,2.047,0,2.828l1.414,1.414	c0.781,0.781,2.047,0.781,2.828,0l4.95-4.95l4.95,4.95c0.781,0.781,2.047,0.781,2.828,0l1.414-1.414	C33.973,30.997,33.973,29.731,33.192,28.95z"
              opacity=".05"
            ></path>
            <path
              d="M32.839,29.303L27.536,24l5.303-5.303c0.586-0.586,0.586-1.536,0-2.121l-1.414-1.414	c-0.586-0.586-1.536-0.586-2.121,0L24,20.464l-5.303-5.303c-0.586-0.586-1.536-0.586-2.121,0l-1.414,1.414	c-0.586,0.586-0.586,1.536,0,2.121L20.464,24l-5.303,5.303c-0.586,0.586-0.586,1.536,0,2.121l1.414,1.414	c0.586,0.586,1.536,0.586,2.121,0L24,27.536l5.303,5.303c0.586,0.586,1.536,0.586,2.121,0l1.414-1.414	C33.425,30.839,33.425,29.889,32.839,29.303z"
              opacity=".07"
            ></path>
            <path
              fill="#fff"
              d="M31.071,15.515l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414L18.343,32.485	c-0.391,0.391-1.024,0.391-1.414,0l-1.414-1.414c-0.391-0.391-0.391-1.024,0-1.414l14.142-14.142	C30.047,15.124,30.681,15.124,31.071,15.515z"
            ></path>
            <path
              fill="#fff"
              d="M32.485,31.071l-1.414,1.414c-0.391,0.391-1.024,0.391-1.414,0L15.515,18.343	c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0l14.142,14.142	C32.876,30.047,32.876,30.681,32.485,31.071z"
            ></path>
          </svg>
          Cancel
        </Button>
        {/* </Link> */}
      </div>
    </>
  );
};

export default EditNote;
