import AllNotification from "@/components/Notification/AllNotification";
import WelcomeBanner from "@/components/WelcomeBanner/WelcomeBanner";
import { fetchNotificationsByUserId } from "@/services/notificationServices";
import { fetchUserByEmail } from "@/services/userServices";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession();
  const currentUser = await fetchUserByEmail(session?.user?.email);
  const data = await fetchNotificationsByUserId(currentUser?.user?._id);
  const notifications = data?.data ? data?.data : [];
  // console.log(notifications);
  return (
    <>
      <section id="banner-notification">
        <WelcomeBanner
          title="Notifications"
          description="Here you will see all the notifications"
        />
      </section>

      <section id="all-notification">
        <AllNotification notifications={notifications} />
      </section>
    </>
  );
}
