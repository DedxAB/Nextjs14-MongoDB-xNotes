"use client";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const RemoveBtn = ({ id }) => {
  const router = useRouter();
  const removeTopic = async () => {
    const conformationMessage = confirm(
      "Are you sure you want to delete this topic?"
    );
    if (conformationMessage) {
      try {
        const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Error deleting topic");
        router.refresh();
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  return (
    <>
      <Button onClick={removeTopic} variant="outline" size="icon">
        <Trash2 className="w-4 text-red-500" />
      </Button>
    </>
  );
};

export default RemoveBtn;
