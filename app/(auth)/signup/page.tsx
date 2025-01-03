"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { signupSchema } from "@/lib/schema/user";
import { toast } from "sonner"
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";


const SignupPage = () => {
  const [isPending, setPending] = React.useState<boolean>();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    setPending(true);
    try{
      const response = await axios.post("/api/v1/signup", data);
      const responseData = response.data;
      if (responseData.status === "error") {
        toast(responseData.message);
      }
      if (responseData.status === "success") {
        toast(responseData.message);
        form.reset();
        router.push("/login");
      }
    }catch(error){
      console.error(error);
      toast.error("Something went wrong ");
    }
    finally{
      setPending(false);
    }
  };

  return (
    <section className="font-poppins flex flex-col items-center justify-center h-[91vh] md:h-[89.45vh] w-full inset-0 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] md:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]">
      <div>
        <Card className="w-[350px] bg-white rounded-none p-0">
          <CardHeader className="p-0 ">
            <CardTitle className="text-3xl bg-black text-white py-5 text-center">
              Register
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 py-3"
                autoComplete="off"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="username"
                          {...field}
                          className="rounded-none py-5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email"
                          {...field}
                          className="rounded-none py-5"
                          autoComplete="new-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="password"
                          {...field}
                          className="rounded-none py-5"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="py-2 text-xs">
                  already have an account? login{" "}
                  <Link
                    href="/login"
                    className="underline text-blue-600 decoration-blue-500 underline-offset-4 "
                  >
                    here
                  </Link>
                </p>
                <Button
                  type="submit"
                  className="w-full rounded-none py-5  flex items-center bg-black hover:bg-zinc-800"
                  disabled={isPending}
                >
                  {" "}
                  <LoaderCircle size={25} className={`${isPending ? 'animate animate-spin block': 'hidden' }`} />
                  Sign Up{" "}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SignupPage;
