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
  noteId = "",
  note
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
          {description && (
            <NoteDescription description={description} noteId={noteId} note={note} />
          )}

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
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-foreground"
                      color={"#000000"}
                      fill={"none"}
                    >
                      <path
                        d="M10 13.229C10.1416 13.4609 10.3097 13.6804 10.5042 13.8828C11.7117 15.1395 13.5522 15.336 14.9576 14.4722C15.218 14.3121 15.4634 14.1157 15.6872 13.8828L18.9266 10.5114C20.3578 9.02184 20.3578 6.60676 18.9266 5.11718C17.4953 3.6276 15.1748 3.62761 13.7435 5.11718L13.03 5.85978"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10.9703 18.14L10.2565 18.8828C8.82526 20.3724 6.50471 20.3724 5.07345 18.8828C3.64218 17.3932 3.64218 14.9782 5.07345 13.4886L8.31287 10.1172C9.74413 8.62761 12.0647 8.6276 13.4959 10.1172C13.6904 10.3195 13.8584 10.539 14 10.7708"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M21 16H18.9211M16 21L16 18.9211"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 8H5.07889M8 3L8 5.07889"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg> */}
                  </Link>
                </>
              )}

              {/* Share */}
              <div className="mr-1 cursor-pointer transition-all duration-300 ease-in-out border rounded-full p-[.63rem] hover:border-primary">
                <Share2 className="w-4 h-4 " />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-foreground"
                  color={"#000000"}
                  fill={"none"}
                >
                  <path
                    d="M20.3927 8.03168L18.6457 6.51461C17.3871 5.42153 16.8937 4.83352 16.2121 5.04139C15.3622 5.30059 15.642 6.93609 15.642 7.48824C14.3206 7.48824 12.9468 7.38661 11.6443 7.59836C7.34453 8.29742 6 11.3566 6 14.6525C7.21697 13.9065 8.43274 13.0746 9.8954 12.7289C11.7212 12.2973 13.7603 12.5032 15.642 12.5032C15.642 13.0554 15.3622 14.6909 16.2121 14.9501C16.9844 15.1856 17.3871 14.5699 18.6457 13.4769L20.3927 11.9598C21.4642 11.0293 22 10.564 22 9.99574C22 9.4275 21.4642 8.96223 20.3927 8.03168Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.5676 3C6.70735 3.00694 4.68594 3.10152 3.39411 4.39073C2 5.78202 2 8.02125 2 12.4997C2 16.9782 2 19.2174 3.3941 20.6087C4.78821 22 7.03198 22 11.5195 22C16.0071 22 18.2509 22 19.645 20.6087C20.6156 19.64 20.9104 18.2603 21 16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
