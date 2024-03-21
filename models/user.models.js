import mongoose from "mongoose";
const userShema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userShema);
export default User;
