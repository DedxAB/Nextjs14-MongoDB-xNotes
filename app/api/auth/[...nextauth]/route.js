import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import connectDB from "@/db/mongodb";
import User from "@/models/user.model";

import { BASE_URL } from "@/utils/constants";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        await connectDB();
        const user = await User.findOne({ email: session.user.email });
        session.user.id = user._id.toString();
        session.user.username = user.username;
        session.user.isAdmin = user.isAdmin;
        session.user.name = user.name;
        return session;
      } catch (error) {
        return new Error("Failed to get session");
      }
    },

    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { email, name, image } = user;
        const username = email.split("@")[0];
        try {
          await connectDB();
          const res = await fetch(`${BASE_URL}/api/user`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ email, name, image, username }),
          });
          if (!res) {
            const { error } = await res.json();
            throw new Error(error || "Failed to create user");
          }
          return true;
        } catch (error) {
          console.log(error.message);
          return false;
        }
      }
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
