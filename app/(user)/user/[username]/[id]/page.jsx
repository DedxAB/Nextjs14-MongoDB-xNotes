import { Suspense } from "react";

import { BreadcrumbComponent } from "./components/BreadcrumbComponent";
import ProfileComponent from "./components/ProfileComponent";
import UserProfileSkeleton from "@/components/Skeleton/UserProfileSkeleton";

import { generateSlug } from "@/utils/slugGenerator";
import { fetchUserById } from "@/services/user/server/user.service";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const { data: user = {} } = (await fetchUserById(id)) ?? {};
  return {
    title: `${user?.name || "Profile"}${
      user?.username && ` (@${user?.username})`
    }`,
    description: `Welcome to ${user?.name}'s profile.`,
    openGraph: {
      type: "profile",
      locale: "en_US",
      url: `/user/${generateSlug(user?.username)}/${id}`,
      siteName: "DedxNotes",
    },
  };
};

const Profile = ({ params }) => {
  const { id } = params;

  return (
    <div className="min-h-full">
      <div className="mt-3">
        <BreadcrumbComponent />
      </div>

      <Suspense fallback={<UserProfileSkeleton />}>
        <ProfileComponent id={id} />
      </Suspense>
    </div>
  );
};

export default Profile;
