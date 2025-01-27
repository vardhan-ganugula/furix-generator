"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { loginSchema } from "@/lib/schema/user";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

const LoginPage = () => {
  const router = useRouter();
  const [isPending, setPending] = React.useState<boolean>(false);
  const { setDetails } = useAuthStore();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    setPending(true);
    try {
      const response = await axios.post("/api/v1/login", data);
      const responseData = response.data;
      if (responseData.status === "error") {
        toast.error(responseData.message);
      }

      if (responseData.status === "success") {
        toast.success(responseData.message);
        setDetails(responseData.data.user);
        router.push("/profile");
      }

      if (responseData.status === "unverified") {
        toast.error(responseData.message);
        router.push("/send-verification-email");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setPending(false);
    }
  };
  return (
    <div>
      <Card className="w-[350px] bg-white rounded-none p-0">
        <CardHeader className="p-0 ">
          <CardTitle className="text-3xl bg-black text-white py-5 text-center">
            Welcome back!
          </CardTitle>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="py-5 space-y-4"
                autoComplete="off"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="email"
                          className="rounded-none py-5 block"
                          autoComplete="off"
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
                      <FormLabel className="text-sm">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="password"
                          type="password"
                          className="rounded-none py-5 block"
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="rounded-none md:translate-y-1 mr-1 scale-75 "
                          />
                        </FormControl>
                        <FormLabel className="text-sm">Remember Me</FormLabel>
                      </FormItem>
                    )}
                  />
                  <Link
                    href="/forgot-password"
                    className="text-sm text-black cursor-pointer decoration-wavy underline underline-offset-4"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-black text-white py-5 rounded-none"
                >
                  <LoaderCircle
                    size={25}
                    className={`${
                      isPending ? "animate animate-spin block" : "hidden"
                    }`}
                  />
                  Login
                </Button>
                <div className="text-center text-sm text-black">
                  Don&#39;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="decoration-wavy underline underline-offset-4"
                  >
                    Register
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default LoginPage;
