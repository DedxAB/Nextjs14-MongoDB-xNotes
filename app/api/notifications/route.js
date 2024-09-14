import connectDB from "@/db/mongodb";
import Notification from "@/models/notification.model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { type, noteOwnerId, senderId, noteId, message } = await req.json();
  try {
    await connectDB();
    let notification;
    if (type === "like" || type === "comment") {
      notification = await Notification.create({
        type,
        noteOwnerId,
        senderId,
        noteId,
      });
    } else if (type === admin) {
      notification = await Notification.create({
        type,
        message,
      });
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    if (!notification) {
      return NextResponse.json(
        { error: "Failed to create notification" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Notification created", data: Notification },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
