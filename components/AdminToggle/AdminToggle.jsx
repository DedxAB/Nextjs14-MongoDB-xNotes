"use client";

import { useState } from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AdminToggle = ({ user, currentUserEmail }) => {
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);
  const router = useRouter();
  const { data: session } = useSession();

  const toggleAdminStatus = async () => {
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
        throw new Error(errorData.message || "Failed to update user");
      }

      const { updatedUser } = await res.json();
      setIsAdmin(updatedUser?.isAdmin);

      toast.success(
        `${user?.name} is now ${updatedUser?.isAdmin ? "Admin" : "User"}`
      );
      router.refresh();
    } catch (error) {
      toast.error(error.message);
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
