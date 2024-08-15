import AllNotification from "@/components/Notification/AllNotification";
import WelcomeBanner from "@/components/WelcomeBanner/WelcomeBanner";
import { fetchNotificationsByUserId } from "@/services/notificationServices";
import { fetchUserByEmail } from "@/services/userServices";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession();
  const currentUser = await fetchUserByEmail(session?.user?.email);
  const { data: notifications = [] } = await fetchNotificationsByUserId(
    currentUser?.user?._id
  );

  // console.log(notifications);
  return (
    <>
      <section id="banner-notification">
        <WelcomeBanner
          title="Notifications"
          description={`Here you will see all notifications (${notifications.length})`}
        />
      </section>

      <section id="all-notification">
        <AllNotification notifications={notifications} />
      </section>
    </>
  );
}
