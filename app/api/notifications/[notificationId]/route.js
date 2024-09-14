import connectDB from "@/db/mongodb";
import Notification from "@/models/notification.model";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { notificationId } = params;
  const { isRead } = await req.json();
  try {
    await connectDB();
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead },
      { new: true }
    );
    if (!notification) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Notification updated", data: notification },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
