import connectDB from "@/db/mongodb";
import Note from "@/models/note.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const GET = async (_req, { params }) => {
  const { q } = params;
  try {
    await connectDB();
    // Use a regex for case-insensitive searching
    const regex = new RegExp(q, "i");

    const users = await User.find({ username: regex })
      .populate("notes")
      .sort({ createdAt: -1 });
    if (!users) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: error.message }, 500);
  }
};
