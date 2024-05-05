import connectDB from "@/db/mongodb";
import Note from "@/models/note.model";
import User from "@/models/user.model";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";

// Get a single user by id
export const GET = async (_req, { params }) => {
  const { id } = params;
  try {
    await connectDB();
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
      { message: "Failed to connect to the server" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req, { params }) => {
  try {
    await connectDB();
    const { id } = params;
    const { bio, socialLinks, name, username } = await req.json();
    const session = await getServerSession();

    // Find the user by ID and check if the session email matches the user's email
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    if (user.email !== session?.user?.email) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action" },
        { status: 401 }
      );
    }

    const isUsernameExist = await User.findOne({ username });
    if (isUsernameExist) {
      return NextResponse.json(
        { message: "Username already exists. Try different one." },
        { status: 400 }
      );
    }

    // Update the user's bio and social links
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { bio, socialLinks, name, username },
      { new: true }
    );
    return NextResponse.json({ message: "Bio updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to connect to the server" },
      { status: 500 }
    );
  }
};

/*
  {
  user: {
    name: 'Arnab Bhoumik',
    email: 'arnab.iguniverse@gmail.com',
    image: 'https://lh3.googleusercontent.com/a/ACg8ocLW2fMMYawjqifhsIMXH-w_XuvKJ2AnbCrfjmDyXNG3NTKL3cE=s96-c'
  }
}
*/
