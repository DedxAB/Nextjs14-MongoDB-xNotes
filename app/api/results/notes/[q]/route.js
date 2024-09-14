import { NextResponse } from "next/server";

import connectDB from "@/db/mongodb";
import Note from "@/models/note.model";
import User from "@/models/user.model";

export const GET = async (_req, { params }) => {
  const { q } = params;
  // console.log("query=", q);
  try {
    await connectDB();
    // Use a regex for case-insensitive searching
    const regex = new RegExp(q, "i");

    const notes = await Note.find({
      $or: [{ title: regex }, { tags: regex }, { description: regex }],
    })
      .populate("author")
      .sort({ createdAt: -1 });

    if (!notes) {
      return NextResponse.json({ error: "No notes found" }, { status: 404 });
    }

    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
