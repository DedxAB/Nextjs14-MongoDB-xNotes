"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function AllNotification({ notifications }) {
  const router = useRouter();
  // console.log(notifications);

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
              "text-sm md:text-base border mb-3 rounded-lg px-3 md:px-4 py-2 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100",
              notification.isRead ? "opacity-50" : "opacity-100"
            )}
            onClick={() => handleNotificationClick(notification)}
          >
            {notification.type === "like" && (
              <div className="flex items-center gap-3">
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
                <p>
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
                <p>
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
        <div className="bg-gray-100 p-4 my-2 rounded-md text-sm md:text-base">
          No notifications yet
        </div>
      )}
    </section>
  );
}

/*
[
  {
    _id: '6691698d2e18ed2483a1875f',
    type: 'comment',
    noteOwnerId: {
      _id: '661142d7299202d2bdee6366',
      name: 'Arnab Bhoumik',
      username: 'arnab.dedx09'
    },
    senderId: {
      _id: '661142d7299202d2bdee6366',
      name: 'Arnab Bhoumik',
      username: 'arnab.dedx09'
    },
    noteId: {
      _id: '668e94503f6a4579431c3df9',
      title: 'Play ev.io - the play to earn blockchain FPS'
    },
    isRead: false,
    createdAt: '2024-07-12T17:36:13.045Z',
    updatedAt: '2024-07-12T17:36:13.045Z',
    __v: 0
  },
  {
    _id: '669169232e18ed2483a18752',
    type: 'like',
    noteOwnerId: {
      _id: '661142d7299202d2bdee6366',
      name: 'Arnab Bhoumik',
      username: 'arnab.dedx09'
    },
    senderId: {
      _id: '661142d7299202d2bdee6366',
      name: 'Arnab Bhoumik',
      username: 'arnab.dedx09'
    },
    noteId: {
      _id: '668e94503f6a4579431c3df9',
      title: 'Play ev.io - the play to earn blockchain FPS'
    },
    isRead: false,
    createdAt: '2024-07-12T17:34:27.340Z',
    updatedAt: '2024-07-12T17:34:27.340Z',
    __v: 0
  },
  {
    _id: '669166e12e18ed2483a186f9',
    type: 'like',
    noteOwnerId: {
      _id: '661142d7299202d2bdee6366',
      name: 'Arnab Bhoumik',
      username: 'arnab.dedx09'
    },
    senderId: {
      _id: '661142d7299202d2bdee6366',
      name: 'Arnab Bhoumik',
      username: 'arnab.dedx09'
    },
    noteId: {
      _id: '668e94503f6a4579431c3df9',
      title: 'Play ev.io - the play to earn blockchain FPS'
    },
    isRead: false,
    createdAt: '2024-07-12T17:24:49.005Z',
    updatedAt: '2024-07-12T17:24:49.005Z',
    __v: 0
  },
  {
    _id: '669166df2e18ed2483a186f3',
    type: 'like',
    noteOwnerId: {
      _id: '661142d7299202d2bdee6366',
      name: 'Arnab Bhoumik',
      username: 'arnab.dedx09'
    },
    senderId: {
      _id: '661142d7299202d2bdee6366',
      name: 'Arnab Bhoumik',
      username: 'arnab.dedx09'
    },
    noteId: { _id: '668e99c5b04811b9af60ee90', title: 'Super Logout' },
    isRead: false,
    createdAt: '2024-07-12T17:24:47.121Z',
    updatedAt: '2024-07-12T17:24:47.121Z',
    __v: 0
  }
]
  */
