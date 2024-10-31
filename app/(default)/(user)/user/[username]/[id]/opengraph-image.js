/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { BASE_URL } from "@/utils/constants";
import { fetchUserById } from "@/services/user/server/user.service";

export const runtime = "edge";

export const alt = "Note Details";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }) {
  const { id } = params;
  const { data: user = {} } = (await fetchUserById(id)) ?? {};

  const name = user?.name ?? "User";
  const username = user?.username ?? "username";

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
          <h1 tw="text-5xl font-bold">{`Hi There! I am ${name}`}</h1>
        </div>
        <div tw="flex flex-col items-center">
          <img
            src={user?.image}
            width="50"
            height="50"
            tw="rounded-full"
            alt={user?.name}
          />
          <p tw="text-2xl font-bold">{`@${username}`}</p>
        </div>
        <div tw="text-center flex flex-col w-[60%] items-center">
          <p tw="text-2xl font-bold">{`Want to catch up with my notes on DedxNotes? Feel free to explore!`}</p>
        </div>
        <div tw="flex rounded-md shadow">
          <a tw="flex items-center justify-center rounded-md border border-transparent bg-[#E11D48] px-5 py-1 text-base font-medium text-white text-xl">
            Click to explore!
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
