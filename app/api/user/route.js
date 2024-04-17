import connectDB from "@/helper/mongodb";
import Note from "@/models/note.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, name, image, username } = await req.json();
  try {
    await connectDB();
    const isExist = await User.findOne({ email });
    if (isExist) {
      throw new Error("Email already exists");
    }
    const user = await User.create({ email, name, image, username });
    if (!user) {
      return NextResponse.json(
        { message: "Failed to create user" },
        { status: 400 }
      );
    }
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to connect to server" },
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
    if (!allUsers) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }
    return NextResponse.json({ allUsers });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
};
