'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { NotificationIcon } from '@/app/assets/svgs/GeneralIcons';
import { fetchNotificationsByUserIdForClient } from '@/services/notification/client/notification.service';

export default function NotificationButton() {
  const [notifications, setNotifications] = useState([]); // [1]
  const { data: session } = useSession();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (session?.user?.id) {
        const data = await fetchNotificationsByUserIdForClient(
          session?.user?.id
        );
        setNotifications(data?.data ? data?.data : []);
      }
    };

    fetchNotifications();
  }, [session?.user?.id]);

  return (
    <Link
      title="Notifications"
      href="/notifications"
      className="p-[.63rem] border rounded-full cursor-pointer bg-background relative"
    >
      <NotificationIcon className="w-4 h-4" />
      {notifications.length > 0 && (
        <span className="absolute flex h-2 w-2 top-[.48rem] right-[.59rem]">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
      )}
    </Link>
  );
}
