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
  
  const Page = () => {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-600 ">
        <Card className="min-w-[400px] max-w-[400px]">
          <CardHeader className="flex justify-center items-center">
            <CardTitle>Signup</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <form action="" className="flex flex-col gap-4">
              <Input type="text" placeholder="Username" />
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="password" />
              <Button type="submit">Signup</Button>
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
          </CardFooter>
        </Card>
      </div>
    );
  };
  
  export default Page;