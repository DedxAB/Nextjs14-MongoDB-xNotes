"use client";
import { inter_font } from "@/utils/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ReactLinkify from "react-linkify";

const NoteDescription = ({ description, noteId = "" }) => {
  const pathName = usePathname();

  //   const highlightLink = () => {
  //     const regex =
  //       /https?:\/\/[-a-zA-Z0-9@:%._\+~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

  //     // Split the description by space to check each word individually
  //     return description.split(" ").map((word, index) => {
  //       // If the word matches the URL regex, render it as a link
  //       if (word.match(regex)) {
  //         return (
  //           <a
  //             key={index}
  //             href={word}
  //             target="_blank"
  //             rel="noopener noreferrer"
  //             style={{ color: "blue", textDecoration: "underline" }}
  //           >
  //             {word}
  //           </a>
  //         );
  //       } else {
  //         // If it's not a URL, return the word as is
  //         return word + " ";
  //       }
  //     });
  //   };

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
          {pathName === `/note/${noteId}/details` || pathName === "/create-note"
            ? description
            : truncateString(description, 140)}
        </ReactLinkify>
      </div>
    </>
  );
};

export default NoteDescription;
