/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { fetchNoteById } from "@/services/noteServices";
import { BASE_URL } from "@/utils/constants";

export const runtime = "edge";

export const alt = "Note Details";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

export default async function Image({ params }) {
  const { id } = params;
  const { data: note = {} } = (await fetchNoteById(id)) ?? {};
  const filteredNote = note.visibility === "public" ? note : {};

  const noteTitle = filteredNote?.title
    ? truncateText(filteredNote.title, 60)
    : "Private Note";

  const noteDescription = filteredNote?.description
    ? truncateText(filteredNote.description, 100)
    : "This note is private. Contact the author for access.";

  const fontData = await fetch(
    new URL(`${BASE_URL}/fonts/Poppins-Bold.ttf`, import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        tw="bg-cover bg-center flex flex-col items-center justify-center h-full w-full text-white p-5"
        style={{
          backgroundImage: `url(${BASE_URL}/opengraph-image-bg.jpg)`,
          fontFamily: "Poppins",
          gap: "1rem",
        }}
      >
        <div tw="text-center w-3/5 flex justify-center">
          <h1 tw="text-5xl font-bold">{noteTitle}</h1>
        </div>
        <div tw="flex flex-col items-center">
          <img
            src={filteredNote?.author?.image}
            width="50"
            height="50"
            tw="rounded-full"
            alt={filteredNote?.author?.name}
          />
          <p tw="text-2xl font-bold">{`@${filteredNote?.author?.username}`}</p>
        </div>
        <div tw="text-center flex flex-col w-[60%] items-center">
          <p tw="text-2xl font-bold">{noteDescription}</p>
        </div>
        <div tw="flex rounded-md shadow">
          <a tw="flex items-center justify-center rounded-md border border-transparent bg-[#E11D48] px-5 py-1 text-base font-medium text-white text-xl">
            Click to read more!
          </a>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Poppins",
          data: fontData,
          style: "normal",
          weight: "bold",
        },
      ],
    }
  );
}
