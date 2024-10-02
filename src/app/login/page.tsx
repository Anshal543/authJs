"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authenticate } from "@/lib/login.action";
import Link from "next/link";
import { useActionState } from "react";

const initialState = {
  message : null,
  type : null,
}

const Page = () => {
  const [state, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  return (
    <div className="flex justify-center items-center h-screen bg-gray-600 ">
      <Card className="min-w-[400px] max-w-[400px]">
        <CardHeader className="flex justify-center items-center">
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form action={formAction} className="flex flex-col gap-4 ">
            <Input type="email" placeholder="Email" required name="email" />
            <Input type="password" placeholder="password" required  name="password"/>
            <Button type="submit" disabled={isPending}>
              Login
            </Button>
          </form>
          {state && (
            <p className="text-red-600 text-sm">{state}</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2 items-center ">
          <span>Or</span>
          <form action="">
            <Button type="submit" variant={"outline"}>
              Login with Google
            </Button>
          </form>
          <Link href="/signup" className="mt-2 font-medium hover:underline">
            <p>Don&apos;t have an account? Signup</p>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
