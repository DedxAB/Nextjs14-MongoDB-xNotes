"use client";
import { inter_font } from "@/utils/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ReactLinkify from "react-linkify";

const NoteDescription = ({ description, noteId = "" }) => {
  const pathName = usePathname();

  const truncateString = (str, num) => {
    return (
      <>
        {str?.length > num ? str.slice(0, num) : str}
        {str?.length > num && (
          <>
            <span>... </span>
            <Link
              href={`/note/${noteId}/details`}
              className="text-primary hover:underline"
            >
              see more
            </Link>
          </>
        )}
      </>
    );
  };

  const customLink = (href, text, key) => (
    <a
      href={href}
      key={key}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline"
    >
      {text}
    </a>
  );

  return (
    <>
      <div
        className={`text-sm md:text-base mt-[0.28rem] py-1 whitespace-pre-line ${inter_font}`}
      >
        <ReactLinkify componentDecorator={customLink}>
          {pathName === `/note/${noteId}/details` ||
          pathName === "/create-note" ||
          pathName === `/edit-note/${noteId}`
            ? description
            : truncateString(description, 140)}
        </ReactLinkify>
      </div>
    </>
  );
};

export default NoteDescription;
