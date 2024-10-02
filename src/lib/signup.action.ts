"use server";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
  type?: string | null;
};

export async function signup(prevState: State, formData: FormData) {
  console.log({ prevState });
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return {
      errors: {
        name: !name ? ["Username is required"] : [],
        email: !email ? ["Email is required"] : [],
        password: !password ? ["Password is required"] : [],
      },
      message: "please fill all fields",
      type: "error",
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    if (!user) {
      return {
        errors: {
          email: ["Email already exists "],
        },
        message: "error",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      errors: {
        email: ["Email already exists"],
      },
      message: "error",
      type: "error",
    };
  }
  redirect("/login");
}
