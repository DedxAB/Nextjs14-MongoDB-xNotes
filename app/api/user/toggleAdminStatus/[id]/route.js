import connectDB from "@/helper/mongodb";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  const { id } = params;
  const { isAdmin } = await req.json();
  try {
    await connectDB();
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isAdmin },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json(
        { message: "Failed to update user" },
        { status: 400 }
      );
    }
    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to connect to server" },
      { status: 500 }
    );
  }
};
