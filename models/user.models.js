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
    image: {
      type: String,
      required: false,
    },
    // username: {
    //   type: String,
    //   require: true,
    //   mach: [

    //   ]
    // }
    // ,
    topic: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userShema);
export default User;
