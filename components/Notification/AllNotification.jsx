import { fetchNotificationsByUserId } from "@/services/notificationServices";
import { fetchUserByEmail } from "@/services/userServices";
import { getServerSession } from "next-auth";

export default async function AllNotification() {
  const session = await getServerSession();
  const currentUser = await fetchUserByEmail(session?.user?.email);
  //   console.log(currentUser.user._id);
  const { data: notifications } = await fetchNotificationsByUserId(
    currentUser?.user?._id
  );
  return <div>AllNotification</div>;
}
