import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AllNotification from "@/components/Notification/AllNotification";
import WelcomeBanner from "@/components/WelcomeBanner/WelcomeBanner";
import { fetchNotificationsByUserId } from "@/services/notification/server/notification.service";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession(authOptions);
  const { data: notifications = [] } = (await fetchNotificationsByUserId(
    session?.user?.id
  )) ?? { data: [] };

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
