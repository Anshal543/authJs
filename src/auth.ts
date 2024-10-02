import NextAuth, { CredentialsSignin } from "next-auth";
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
        const { email, password } = credentials as { email: string|undefined; password: string|undefined };
        if(!email || !password) {
          throw new CredentialsSignin("Invalid credentials provided"); 
        }
        const user = await prisma.user.findUnique({ where: { email }});
        if (!user) {
          throw new CredentialsSignin("No user found");
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
          throw new CredentialsSignin("Invalid password");
        }
        return { email: user.email, id: user.id, name: user.name };
      },
    }),
  ],
  pages:{
    signIn:"/login"
  }
});
