import { NextResponse } from "next/server";

import connectDB from "@/db/mongodb";
import Note from "@/models/note.model";
import User from "@/models/user.model";

export const GET = async (_req, { params }) => {
  const { q } = params;
  try {
    await connectDB();
    // Use a regex for case-insensitive searching
    const regex = new RegExp(q, "i");

    const users = await User.find({
      $or: [{ name: regex }, { username: regex }],
    })
      .populate("notes")
      .sort({ createdAt: -1 });
    if (!users) {
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
