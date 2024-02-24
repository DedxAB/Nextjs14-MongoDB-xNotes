import connectDB from "@/helper/mongodb";
import User from "@/models/user.models";
import { NextResponse } from "next/server";

const POST = async (req, _res) => {
  const { email, name, image } = await req.json();
  await connectDB();
  await User.create({ email, name, image });
  return NextResponse.json({ message: "user registered" }, { status: 201 });
};

export { POST };