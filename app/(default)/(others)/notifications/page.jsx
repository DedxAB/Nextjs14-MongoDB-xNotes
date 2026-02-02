import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AllNotification from '@/components/Notification/AllNotification';
import WelcomeBanner from '@/components/WelcomeBanner/WelcomeBanner';
import { fetchNotificationsByUserId } from '@/services/notification/server/notification.service';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect('/signin');
  }
  const { data: notifications = [] } = (await fetchNotificationsByUserId(
    session?.user?.id
  )) ?? { data: [] };

  const countUnreadNotification = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <>
      <section id="banner-notification">
        <WelcomeBanner
          title="Notifications"
          description={
            notifications.length === 0
              ? "Welcome! You don't have any notifications yet."
              : countUnreadNotification > 0
              ? `You have ${countUnreadNotification} unread ${
                  countUnreadNotification === 1
                    ? 'notification'
                    : 'notifications'
                }. Check ${countUnreadNotification === 1 ? 'it' : 'them'} out!`
              : "You're all caught up! No new notifications at the moment."
          }
        />
      </section>

      <section id="all-notification">
        <AllNotification />
      </section>
    </>
  );
}
