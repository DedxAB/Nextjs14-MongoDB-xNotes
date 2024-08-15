import ProfileSection from "@/components/ProfileSection/ProfileSection";
import UserFeed from "@/components/UserNotesFeed/UserNotesFeed";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fetchUserById } from "@/services/userServices";
import { BASE_URL } from "@/utils/constants";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const { data: user = {} } = (await fetchUserById(id)) ?? {};
  return {
    title: `${user?.name || "Profile"}`,
  };
};

const Profile = async ({ params }) => {
  const { id } = params;
  const session = await getServerSession();

  const { data: user = {} } = (await fetchUserById(id)) ?? {};

  const isCurrentUserPrifile = session?.user?.email === user?.email;
  const filteredNotes = user?.notes.filter((note) => {
    return isCurrentUserPrifile || note?.visibility === "public";
  });

  return (
    <div className="min-h-full">
      <div className="mt-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href={`${BASE_URL}`}>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Profile</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ProfileSection user={user} />
      <hr className="my-6" />
      <UserFeed notes={filteredNotes} user={user} />
    </div>
  );
};

export default Profile;
