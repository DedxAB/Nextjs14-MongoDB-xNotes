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

  return (
    <>
      <section id="banner-notification">
        <WelcomeBanner
          title="Notifications"
          description={
            notifications.length > 0
              ? `You have ${notifications.length} new ${
                  notifications.length === 1 ? "notification" : "notifications"
                }. Check ${notifications.length === 1 ? "it" : "them"} out!`
              : "You're all caught up! No new notifications at the moment."
          }
        />
      </section>

      <section id="all-notification">
        <AllNotification notifications={notifications} />
      </section>
    </>
  );
}
