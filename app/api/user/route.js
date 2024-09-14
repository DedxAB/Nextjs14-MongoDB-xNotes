import connectDB from "@/db/mongodb";
import Note from "@/models/note.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, name, image, username } = await req.json();
  try {
    await connectDB();
    const isExistUser = await User.findOne({ email });
    if (isExistUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const newUser = await User.create({ email, name, image, username });
    if (!newUser) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 400 }
      );
    }
    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to connect to server" },
      { status: 500 }
    );
  }
}

// Get all users
export const GET = async (_req, _res) => {
  try {
    await connectDB();
    const allUsers = await User.find()
      .populate("notes")
      .sort({ createdAt: -1 });
    if (!allUsers || allUsers.length === 0) {
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }
    return NextResponse.json({ allUsers });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
};
