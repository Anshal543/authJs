import { auth, signIn } from "@/auth";
import LoginForm from "@/components/login-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import Link from "next/link";

const Page = async() => {
  const session = await auth()
  if(session?.user) redirect('/')
  return (
    <div className="flex justify-center items-center h-screen bg-gray-600 ">
      <Card className="min-w-[400px] max-w-[400px]">
        <CardHeader className="flex justify-center items-center">
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-2 items-center ">
          <span>Or</span>
          <form action={async()=>{
            "use server"
            await signIn("google")
          }}>
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
