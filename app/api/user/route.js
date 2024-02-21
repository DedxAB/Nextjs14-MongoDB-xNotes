import connectDB from "@/libs/mongodb";
import User from "@/models/user.models";
import { NextResponse } from "next/server";

const POST = async (req, _res) => {
  const { email, name } = await req.json();
  await connectDB();
  await User.create({ email, name });
  return NextResponse.json({ message: "user registered" }, { status: 201 });
};

export { POST };
