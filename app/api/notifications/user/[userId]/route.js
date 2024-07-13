import connectDB from "@/db/mongodb";
import Note from "@/models/note.model";
import Notification from "@/models/notification.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const GET = async (_req, { params }) => {
  const { userId } = params;
  try {
    await connectDB();
    const notifications = await Notification.find({
      $or: [{ noteOwnerId: userId }, { type: "admin" }],
    })
      .sort({ createdAt: -1 })
      .populate("noteOwnerId", "username name") // Populate noteOwnerId with username and name
      .populate("senderId", "username name image") // Populate senderId with username and name
      .populate("noteId", "title"); // Populate noteId with title

    if (!notifications) {
      return NextResponse.json(
        { message: "Notifications not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { data: notifications, message: "Notifications fetched successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to connect to the database" },
      { status: 500 }
    );
  }
};
