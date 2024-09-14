import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/db/mongodb";
import Note from "@/models/note.model";
import Notification from "@/models/notification.model";
import User from "@/models/user.model";

export const GET = async (_req, { params }) => {
  try {
    const { userId } = params;

    // check if the user is the current logged in user or not
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "You need to login first" },
        { status: 401 }
      );
    }

    // check if the user is the current logged in user or not
    if (userId !== session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
        { error: "Notifications not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Success", data: notifications },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
