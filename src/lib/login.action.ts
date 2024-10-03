import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";
import { toast } from "sonner";

export async function authenticate(
  prevState: string|undefined,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: "/",
    });
  } catch (error) {
    toast.error("Invalid credentials");
    const err = error as CredentialsSignin;
    return "invalid credentials";
  }
}
