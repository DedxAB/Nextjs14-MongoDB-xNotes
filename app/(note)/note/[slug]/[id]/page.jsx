import NoteDetailsById from "@/components/NoteDetailsById/NoteDetailsById";
import UserCard from "@/components/UserCard/UserCard";
import WelcomeBanner from "@/components/WelcomeBanner/WelcomeBanner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fetchNoteById } from "@/services/noteServices";
import { BASE_URL } from "@/utils/constants";
import { generateSlug } from "@/utils/slugGenerator";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const { data: note = {} } = (await fetchNoteById(id)) ?? {};
  const session = await getServerSession();
  const currentUserEmail = session?.user?.email;

  return {
    title: `${
      currentUserEmail !== note?.author?.email && note?.visibility !== "public"
        ? "Note Details (Private)"
        : note?.title
    }`,
    description: `${
      currentUserEmail !== note?.author?.email && note?.visibility !== "public"
        ? "Create notes for quick recall and reference. Share your notes globally, making note-taking and idea sharing a breeze. Start organizing your thoughts today!"
        : note?.description
    }`,
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `${BASE_URL}/note/${generateSlug(
        note?.title
      )}/${id}`,
      siteName: "DedxNotes",
    },
  };
};

const page = async ({ params }) => {
  const { id } = params;
  const session = await getServerSession();
  const currentUserEmail = session?.user?.email;

  const { data: note = {} } = (await fetchNoteById(id)) ?? {};
  // console.log(note);

  if (
    currentUserEmail !== note?.author?.email &&
    note?.visibility !== "public"
  ) {
    return (
      <div className="min-h-[85vh]">
        <div className="mt-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={`${BASE_URL}`}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`${BASE_URL}/note/${id}/details`}>
                  Notes
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <WelcomeBanner
          title={`Note Details`}
          description={`This note is private and can only be viewed by the author. If you want
          to view this note, please ask the author to change the visibility to
          public.`}
        />
        <UserCard user={note?.author} />
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="mt-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href={`${BASE_URL}`}>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Notes</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <NoteDetailsById note={note} />
    </div>
  );
};

export default page;

/* 
{
  _id: '6606a276202bdb6dea67ea3c',
  title: 'Heroicons',
  description: 'Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.',
  author: '65fd5ea0650dea0c24bd28c8',
  createdAt: '2024-03-29T11:13:58.993Z',
  updatedAt: '2024-03-29T11:13:58.993Z',
  __v: 0
}
*/
