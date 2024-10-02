"use client"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signup, State } from "@/lib/signup.action";
import { useActionState } from "react";

const initialState: State = {
  errors: {},
  message: null,
  type: null,
};
const Page = () => {
  const [state, formAction, isPending] = useActionState(signup, initialState);
  return (
    <div className="flex justify-center items-center h-screen bg-gray-600 ">
      <Card className="min-w-[400px] max-w-[400px]">
        <CardHeader className="flex justify-center items-center">
          <CardTitle>Signup</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form action={formAction} className="flex flex-col gap-4">
            <Input type="text" placeholder="Username" name="name" />
            {state?.errors?.name && (
              <span id="name-error" className="text-red-600 text-sm">
                {state.errors.name.join(",")}
              </span>
            )}
            <Input type="email" placeholder="Email" name="email" />
            {state?.errors?.email && (
              <span id="name-error" className="text-red-600 text-sm">
                {state.errors.email.join(",")}
              </span>
            )}
            <Input type="password" placeholder="password" name="password" />
            {state?.errors?.password && (
              <span id="name-error" className="text-red-600 text-sm">
                {state.errors.password.join(",")}
              </span>
            )}
            <Button type="submit" aria-disabled={isPending}>
              Signup
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 items-center ">
          <span>Or</span>
          <form action="">
            <Button type="submit" variant={"outline"}>
              Login with Google
            </Button>
          </form>
          <Link href="/login" className="mt-2 font-medium hover:underline">
            <p>Already have an account? Signin</p>
          </Link>
          {/* {state?.type=="error" && <p className="text-red-600 text-sm">{state.message}</p>} */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
