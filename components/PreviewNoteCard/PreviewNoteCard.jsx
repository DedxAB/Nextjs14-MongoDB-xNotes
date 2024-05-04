import { ExternalLink, Share2 } from "lucide-react";
import Link from "next/link";
import NoteDescription from "../NoteDescription/NoteDescription";
import { Avatar, AvatarImage } from "../ui/avatar";
import { josefin_sans_font } from "@/utils/fonts";
import dayjs from "dayjs";

export default function PreviewNoteCard({
  title,
  description,
  tags,
  websiteLink,
  selectVisibility,
}) {
  return (
    <>
      <div className="border rounded-xl flex justify-start gap-1 my-3 px-3 md:px-4 py-3">
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
              <h2 className={`text-lg md:text-xl font-bold`}>{title}</h2>

              {/* date */}
              <div
                className={`pt-[.19rem] md:pt-1 flex text-xs flex-wrap justify-start items-center text-[#6b6e6e] ${josefin_sans_font}`}
              >
                <p className="mr-1">
                  {
                    dayjs(Date.now()).format("MMM D, YYYY • hh : mm A") // Mar 27, 2024
                  }
                </p>
                <div>
                  •&nbsp;
                  <span>
                    {selectVisibility === "private" ? "Only me" : "Public"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Show the description */}
          {description && <NoteDescription description={description} />}

          {/* Show the tags */}
          {tags && (
            <div className="pt-1">
              {tags.split(/[\s,]+/).map((tag, index) => (
                <Link
                  href={`/result?q=${tag}`}
                  key={index}
                  className={`text-sm md:text-base mr-2 cursor-pointer border px-2 py-[0.16rem] rounded inline-block my-1 hover:bg-primary hover:text-white transition-all duration-300 ease-in-out`}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Show the likes and comments and weblink */}
          {(title || description || websiteLink) && (
            <div className={`flex gap-3 mt-2 pt-1 items-center`}>
              {/* Likes  */}
              <div className="flex gap-1 items-center transition-all duration-300 ease-in-out border hover:border-primary rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-primary cursor-pointer"
                >
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
                <span className="text-sm font-bold">0</span>
              </div>

              {/* Comments */}
              <div className="flex gap-1 items-center transition-all duration-300 ease-in-out border hover:border-primary rounded-full p-2">
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
                <span className="text-sm font-bold">0</span>
              </div>

              {/* Website Link */}
              {websiteLink && (
                <>
                  <Link
                    href={websiteLink}
                    target="_blank"
                    className="border rounded-full p-[.63rem] hover:border-primary transition-all duration-300 ease-in-out"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </>
              )}

              {/* Share */}
              <div className="mr-1 cursor-pointer transition-all duration-300 ease-in-out border rounded-full p-[.63rem] hover:border-primary">
                <Share2 className="w-4 h-4 " />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
