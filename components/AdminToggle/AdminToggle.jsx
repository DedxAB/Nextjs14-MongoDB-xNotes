"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

const AdminToggle = ({ user, currentUserEmail }) => {
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);
  const router = useRouter();
  const { data: session } = useSession();

  const toggleAdminStatus = async () => {
    const toastId = toast.loading("Updating user status...");
    try {
      const res = await fetch(`/api/user/toggleAdminStatus/${user?._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ isAdmin: !isAdmin }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update user");
      }

      const { updatedUser } = await res.json();
      setIsAdmin(updatedUser?.isAdmin);

      toast.success(
        `${user?.name} is now ${updatedUser?.isAdmin ? "Admin" : "User"}`,
        {
          id: toastId,
        }
      );
      router.refresh();
    } catch (error) {
      toast.error(error.message, { id: toastId });
      console.log(error.message);
    }
  };

  return session?.user?.isAdmin ? (
    <div className="flex items-center space-x-2">
      <Label>Admin : {isAdmin ? "Yes" : "No"}</Label>
      <Switch
        checked={isAdmin}
        onCheckedChange={toggleAdminStatus}
        disabled={currentUserEmail === user?.email}
      />
    </div>
  ) : null;
};

export default AdminToggle;
