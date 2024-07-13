"use client";
import { fetchNotificationsByUserId } from "@/services/notificationServices";
import { fetchUserByEmail } from "@/services/userServices";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotificationIcon() {
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
      href="/notifications"
      className="p-[.63rem] border rounded-full cursor-pointer bg-background relative"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-4 h-4"
        fill={"none"}
      >
        <path
          d="M2.52992 14.7696C2.31727 16.1636 3.268 17.1312 4.43205 17.6134C8.89481 19.4622 15.1052 19.4622 19.5679 17.6134C20.732 17.1312 21.6827 16.1636 21.4701 14.7696C21.3394 13.9129 20.6932 13.1995 20.2144 12.5029C19.5873 11.5793 19.525 10.5718 19.5249 9.5C19.5249 5.35786 16.1559 2 12 2C7.84413 2 4.47513 5.35786 4.47513 9.5C4.47503 10.5718 4.41272 11.5793 3.78561 12.5029C3.30684 13.1995 2.66061 13.9129 2.52992 14.7696Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 19C8.45849 20.7252 10.0755 22 12 22C13.9245 22 15.5415 20.7252 16 19"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {notifications.length > 0 && (
        <div className="absolute top-[.48rem] right-[.59rem] w-2 h-2 bg-primary rounded-full"></div>
      )}
    </Link>
  );
}
