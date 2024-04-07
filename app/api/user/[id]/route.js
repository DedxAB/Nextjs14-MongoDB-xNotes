import connectDB from "@/helper/mongodb";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const GET = async (_req, { params }) => {
  // Connect to the database
  await connectDB();

  // Destructure the user id from the params object and find the user by id
  const { id } = params;
  try {
    const user = await User.findById(id).populate({
      path: "notes",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "author",
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch user" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req, { params }) => {
  await connectDB();
  const { id } = params;
  const { bio, socialLinks } = await req.json();
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { bio, socialLinks },
      { new: true }
    );
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Bio updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to connect to the server" },
      { status: 500 }
    );
  }
};
