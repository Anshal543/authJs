import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string | undefined;
          password: string | undefined;
        };
        if (!email || !password) {
          throw new CredentialsSignin({
            cause: "Invalid credentials provided",
          });
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          throw new CredentialsSignin({ cause: "No user found" });
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
          throw new CredentialsSignin({ cause: "Invalid password" });
        }
        return { email: user.email, id: user.id, name: user.name };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // handle a user which comes from Google auth
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const { email, name, id } = user;
          if (!email) {
            throw new AuthError("Email is required");
          }

          const alreadyUser = await prisma.user.findUnique({
            where: { email },
          });

          if (!alreadyUser) {
            await prisma.user.create({
              data: {
                email,
                name,
                password: "google",
                googleId: id,
              },
            });
          }

          return true;
        } catch (error) {
          console.error("Error during sign-in:", error);
          throw new AuthError("Failed to create user");
        }
      }
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});
