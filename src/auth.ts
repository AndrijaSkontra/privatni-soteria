import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/index";
import { User } from "@/types/user";

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

        console.log(user, "user 😀");

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
    async jwt({ token, user }: any) {
      if (user) {
        token.email = user.email;
        token.createdAt = user.createdAt;
        token.active = user.active;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      const newSesion = {
        user: {
          email: session.user.email,
          createdAt: token.createdAt,
          active: token.active,
          userId: token.id,
        },
        expires: session.expires,
      };
      return newSesion;
    },
  },
  pages: {
    signIn: "/",
  },
});

async function getUserFromDb(email: string, password: string): Promise<User> {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
      password: password,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
      active: true,
    },
  });

  if (!user) {
    throw Error("No user");
  }

  const newUser: User = { ...user, userId: user.id };
  return newUser;
}