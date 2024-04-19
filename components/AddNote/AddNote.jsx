"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useSession } from "next-auth/react";
import { ArrowUpToLine, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Label } from "../ui/label";
import { Avatar, AvatarImage } from "../ui/avatar";
import dayjs from "dayjs";
import {
  inter_font,
  josefin_sans_font,
  opensans_font,
  playfair_font,
} from "@/utils/fonts";

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

  const router = useRouter();
  const { data: session } = useSession();

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
      localStorage.removeItem("title");
      localStorage.removeItem("description");
      localStorage.removeItem("tags");
      localStorage.removeItem("websiteLink");
    } catch (error) {
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
          className="shadow px-4 py-6 text-lg font-bold"
        />

        {/* Description text area */}
        <Textarea
          ref={textareaRef}
          onChange={handelDescriptionChange}
          value={description}
          placeholder={`Please fill the Details about the note`}
          className={`shadow px-4 py-3 font-bold min-h-32 overflow-hidden`}
        />
        <p className="text-right font-bold text-sm text-gray-500">
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
          className="font-bold md:text-base pl-1 mt-2 text-gray-500"
        >
          Keyword: sepereated by comma or space for multiple keyword (search
          purpose).
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
        <div className="flex justify-between items-center gap-1">
          <div className="font-bold text-base text-gray-500 w-max">
            Want to Preview?
          </div>
          <div className="flex justify-end gap-3 md:gap-4">
            {/* Publish Button */}
            <Button type={`submit`} variant={`outline`} className="font-bold">
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
          className="font-bold w-fit mt-2"
        >
          {preview ? "Hide Preview" : "Preview"}
        </Button>
        {preview && (
          <>
            <div className="border flex justify-start gap-1 my-3 rounded px-3 md:px-4 py-3">
              {/* Show the author image */}
              <div className="mr-2 pt-[5px]">
                <Avatar>
                  <AvatarImage src={"/logo.png"} referrerPolicy="no-referrer" />
                </Avatar>
              </div>
              <div className="w-full">
                {/* Show the author name, username */}
                <div
                  className={`flex flex-wrap items-center text-xs mr-2 py-1 ${josefin_sans_font}`}
                >
                  {/* name  */}
                  <p className={`font-bold mr-1`}>DedxNotes</p>

                  {/* username */}
                  <p className={`text-[#6b6e6e]`}>@dedxnotes</p>
                </div>

                {/* Title and Date div  */}
                <div className="flex justify-between items-start gap-1">
                  {/* Show the title and date */}
                  <div>
                    {/* title  */}
                    <h2
                      className={`text-lg md:text-xl font-bold hover:underline`}
                    >
                      {title}
                    </h2>

                    {/* date */}
                    <div
                      className={`md:pt-1 flex text-xs flex-wrap justify-start items-center text-[#6b6e6e] ${josefin_sans_font}`}
                    >
                      {
                        dayjs(Date.now()).format("MMM D, YYYY | hh : mm A") // Mar 27, 2024
                      }
                    </div>
                  </div>
                </div>

                {/* Show the description */}
                {/* <div className="flex justify-between items-cente mt-1"> */}
                {description && (
                  <div
                    className={`text-sm md:text-base mt-1 py-1 whitespace-pre-line ${inter_font}`}
                  >
                    {description}
                  </div>
                )}
                {/* </div> */}
                {/* Show the tags */}

                {tags && (
                  <div className="pt-1">
                    {tags.split(/[\s,]+/).map((tag, index) => (
                      <Link
                        href={`/result?q=${tag}`}
                        key={index}
                        className={`text-sm md:text-base ${playfair_font} mr-2 cursor-pointer border px-2 py-[0.16rem] rounded inline-block my-1 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 ease-in-out`}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Show the likes and comments and weblink */}
                {(title || description || websiteLink) && (
                  <div className="flex gap-5 mt-2 pt-1 items-center">
                    <div className="flex gap-1 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-red-500 cursor-pointer"
                      >
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                      </svg>
                      <span className="text-sm font-bold">0 Likes</span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                        />
                      </svg>
                      <span className="text-sm font-bold">0 Comments</span>
                    </div>
                    {websiteLink && (
                      <>
                        <Link href={websiteLink} target="_blank">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AddNote;
