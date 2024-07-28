"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import dayjs from "dayjs";
import { josefin_sans_font } from "@/utils/fonts";

// Reusable Avatar Component
const UserAvatar = ({ user }) => (
  <Avatar>
    <AvatarImage src={user.image} alt={user.username} />
    <AvatarFallback>
      {user.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")}
    </AvatarFallback>
  </Avatar>
);

// Reusable NotificationItem Component
const NotificationItem = ({ notification, onClick }) => {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push(`/profile/${notification.senderId._id}/details`);
  };

  return (
    <div
      key={notification._id}
      className={cn(
        "text-sm md:text-base border mb-3 rounded-lg px-3 md:px-4 py-2 cursor-pointer",
        notification.isRead ? "opacity-50" : "opacity-100"
      )}
    >
      <div className="flex items-center gap-3">
        <div onClick={handleProfileClick}>
          <UserAvatar user={notification.senderId} />
        </div>
        {notification.type === "admin" ? (
          <p>Admin: {notification.message}</p>
        ) : (
          <div onClick={onClick} className="flex items-start flex-col">
            <p>
              <span className="font-bold">
                {notification.senderId.username}
              </span>{" "}
              {notification.type === "like" ? "liked" : "commented on"} your
              note {" "}
              <span className="font-bold">{notification.noteId.title}</span>
            </p>
            <span className={`${josefin_sans_font} text-xs`}>
              {dayjs(notification?.createdAt).format("MMM D, YYYY • hh : mm A")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function AllNotification({ notifications }) {
  const router = useRouter();

  const handleNotificationClick = async (notification) => {
    try {
      if (notification.type === "like" || notification.type === "comment") {
        router.push(`/note/${notification?.noteId?._id}/details`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section id="notification-section">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationItem
            key={notification._id}
            notification={notification}
            onClick={() => handleNotificationClick(notification)}
          />
        ))
      ) : (
        <div className="border px-3 md:px-4 py-3 my-2 rounded-lg text-sm md:text-base">
          No notifications yet
        </div>
      )}
    </section>
  );
}
