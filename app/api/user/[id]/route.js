import connectDB from "@/helper/mongodb";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const GET = async (_req, { params }) => {
  // Connect to the database
  await connectDB();

  // Destructure the user id from the params object and find the user by id
  const { id } = params;
  try {
    const user = await User.findById(id).populate("notes");
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

export const PATCH = async (req, { params }) => {
  await connectDB();
  const { id } = params;
  const { bio } = await req.json();
  try {
    await User.findByIdAndUpdate(id, { bio });
    return NextResponse.json({ message: "Bio updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
