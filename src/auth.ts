import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { getUserFromDb } from "@/lib/data_access";
import { User } from "@/types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user: User = await getUserFromDb(
          credentials.email as string,
          credentials.password as string,
        );

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.createdAt = user.createdAt;
        token.active = user.active;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      const newSession = {
        ...session,
        user: {
          ...session.user,
          email: session.user.email,
          address: session.user.address || "",
          createdAt: new Date(token.createdAt as Date),
          active: Boolean(token.active),
          userId: String(token.id),
        },
      };
      return newSession;
    },
  },
  pages: {
    signIn: "/",
  },
});
