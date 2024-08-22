import { fetchAllNotes } from "@/services/noteServices";
import { fetchAllUser } from "@/services/userServices";
import { BASE_URL } from "@/utils/constants";
import { generateSlug } from "@/utils/slugGenerator";

export default async function sitemap() {
  const { data: notes = [] } = (await fetchAllNotes()) ?? { data: [] };
  const allNotes = notes
    .filter((note) => note?.visibility === "public")
    .map((note) => ({
      url: `${BASE_URL}/note/${generateSlug(note?.title)}/${note?._id}`,
      lastModified: note?.contentUpdatedAt,
    }));

  const { allUsers = [] } = await fetchAllUser();
  const allUsersUrl = allUsers.map((user) => ({
    url: `${BASE_URL}/user/${generateSlug(user?.username)}/${user?._id}`,
    lastModified: user?.updatedAt,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
    },
    ...allNotes,
    ...allUsersUrl,
  ];
}