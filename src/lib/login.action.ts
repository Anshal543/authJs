import { AuthError, CredentialsSignin } from "next-auth";
import { signIn } from "next-auth/react";

export async function authenticate(
  prevState: String | undefined,
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
  }  catch (error) {
    if (error instanceof CredentialsSignin) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
