import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/db";
import User, { UserRole } from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await dbConnect();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // Create new member on first login
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            googleId: profile?.sub,
            role: UserRole.MEMBER,
          });
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        await dbConnect();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          (session.user as any).id = dbUser._id;
          (session.user as any).role = dbUser.role;
          (session.user as any).points = dbUser.points;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
