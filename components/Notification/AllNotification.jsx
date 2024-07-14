"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function AllNotification({ notifications }) {
  const router = useRouter();

  const handleNotificationClick = async (notification) => {
    try {
      // if (!notification.isRead) {
      //   const response = await fetch(
      //     `/api/notifications/${notification?._id}`,
      //     {
      //       method: "PATCH",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({ isRead: true }),
      //     }
      //   );

      //   if (!response.ok) {
      //     const errorData = await response.json();
      //     throw new Error(errorData);
      //   }
      // }

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
          <div
            key={notification._id}
            className={cn(
              "text-sm md:text-base border mb-3 rounded-lg px-3 md:px-4 py-2 cursor-pointer",
              notification.isRead ? "opacity-50" : "opacity-100"
            )}
          >
            {notification.type === "like" && (
              <div className="flex items-center gap-3">
                <div
                  onClick={() =>
                    router.push(`/profile/${notification.senderId._id}/details`)
                  }
                >
                  <Avatar>
                    <AvatarImage
                      src={notification.senderId.image}
                      alt={notification.senderId.username}
                    />
                    <AvatarFallback>
                      {notification.senderId.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <p onClick={() => handleNotificationClick(notification)}>
                  <span className="font-bold">
                    {notification.senderId.username}
                  </span>{" "}
                  liked your note titled{" "}
                  <span className="font-bold">{notification.noteId.title}</span>
                </p>
              </div>
            )}
            {notification.type === "comment" && (
              <div className="flex items-center gap-3">
                <div
                  onClick={() =>
                    router.push(`/profile/${notification.senderId._id}/details`)
                  }
                >
                  <Avatar>
                    <AvatarImage
                      src={notification.senderId.image}
                      alt={notification.senderId.username}
                    />
                    <AvatarFallback>
                      {notification.senderId.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <p onClick={() => handleNotificationClick(notification)}>
                  <span className="font-bold">
                    {notification.senderId.username}
                  </span>{" "}
                  commented on your note titled{" "}
                  <span className="font-bold">{notification.noteId.title}</span>
                </p>
              </div>
            )}
            {notification.type === "admin" && (
              <p>Admin: {notification.message}</p>
            )}
          </div>
        ))
      ) : (
        <div className="border px-3 md:px-4 py-3 my-2 rounded-lg text-sm md:text-base">
          No notifications yet
        </div>
      )}
    </section>
  );
}
