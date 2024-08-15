import EditNote from "@/components/EditNote/EditNote";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fetchNoteById } from "@/services/noteServices";
import { BASE_URL } from "@/utils/constants";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Edit Note",
};

const page = async ({ params }) => {
  const { id } = params;
  const session = await getServerSession();

  const data = await fetchNoteById(id);

  const {
    data: { title, description, author, tags, websiteLink, visibility } = {},
  } = data ?? {};

  // Check if the current user is the author of the note, if not redirect to the home page
  if (session?.user?.email !== author?.email) {
    redirect("/");
  }

  // if the current user is the author of the note, render the edit note page
  return (
    <div className="min-h-full">
      <div className="mt-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`${BASE_URL}`}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Edit Note</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <EditNote
        id={id}
        title={title}
        websiteLink={websiteLink}
        description={description}
        author={author}
        tags={tags}
        visibility={visibility}
        note={data?.data}
      />
    </div>
  );
};

export default page;
