'use client';

import Link from 'next/link';

import { NotificationIcon } from '@/app/assets/svgs/GeneralIcons';
import { useNotifications } from '@/context/NotificationContext';
import { cn } from '@/lib/utils';

export default function NotificationButton() {
  const { notifications } = useNotifications();

  const unreadNotificationsCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const noOfDigits = unreadNotificationsCount.toString().length;

  return (
    <Link
      title="Notifications"
      href="/notifications"
      className="p-[.63rem] border rounded-full cursor-pointer bg-background relative"
    >
      <NotificationIcon className="w-4 h-4" />

      {unreadNotificationsCount > 0 && (
        <span
          className={cn(
            'absolute min-h-4 min-w-4 flex rounded-full items-center justify-center bg-primary top-[-0.3rem] right-0',
            noOfDigits > 1 ? 'px-[2px]' : ''
          )}
        >
          <span className="relative inline-flex text-white text-xs font-bold">
            {unreadNotificationsCount}
          </span>
        </span>
      )}
    </Link>
  );
}
