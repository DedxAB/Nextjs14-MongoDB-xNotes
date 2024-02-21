import connectDB from "@/helper/mongodb";
import User from "@/models/user.models";
import { BASE_URL } from "@/utils/constants";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, profile, account }) {
      // console.log("user:", user);
      // console.log("profile:", profile);
      // console.log("account:", account);
      if (account.provider === "google") {
        const { email, name } = user;
        try {
          await connectDB();
          const existUser = await User.findOne({ email });
          if (!existUser) {
            const res = await fetch(`${BASE_URL}/api/user`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ email, name }),
            });
            if (!res) throw new Error("Failed to register user");
          }
        } catch (error) {
          console.log(error);
        }
      }
      return user;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
