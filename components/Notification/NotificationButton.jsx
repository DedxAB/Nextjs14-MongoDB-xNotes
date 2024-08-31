"use client";
import { NotificationIcon } from "@/app/assets/svgs/GeneralIcons";
import { fetchNotificationsByUserId } from "@/services/notificationServices";
import { fetchUserByEmail } from "@/services/userServices";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotificationButton() {
  const [notifications, setNotifications] = useState([]); // [1]
  const [currentUser, setCurrentUser] = useState(null); // [2]
  const { data: session } = useSession();

  useEffect(() => {
    const fetchCurrentUserAndNotifications = async () => {
      if (session?.user?.email) {
        const user = await fetchUserByEmail(session.user.email);
        setCurrentUser(user);
      }
    };

    fetchCurrentUserAndNotifications();
  }, [session?.user?.email]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser?.user?._id) {
        const data = await fetchNotificationsByUserId(currentUser.user._id);
        setNotifications(data?.data ? data?.data : []);
      }
    };

    fetchNotifications();
  }, [currentUser]);

  return (
    <Link
      title="Notifications"
      href="/notifications"
      className="p-[.63rem] border rounded-full cursor-pointer bg-background relative"
    >
      <NotificationIcon className="w-5 h-5" />
      {notifications.length > 0 && (
        <span className="absolute flex h-2 w-2 top-[.48rem] right-[.59rem]">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
      )}
    </Link>
  );
}
